/* 
* mbed Cloud JavaScript SDK
* Copyright ARM Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import superagent = require("superagent");
import { EventEmitter } from "events";
import { asyncStyle, apiWrapper, decodeBase64 } from "../common/functions";
import { ConnectionOptions, CallbackFn } from "../common/interfaces";
import { Endpoints } from "./endpoints";
import { NotificationObject, NotificationOptions, PresubscriptionObject } from "./types";
import { Webhook } from "./models/webhook";
import { WebhookAdapter } from "./models/webhookAdapter";
import { PresubscriptionAdapter } from "./models/presubscriptionAdapter";
import { Resource } from "./models/resource";
import { ResourceAdapter } from "./models/resourceAdapter";
import { ConnectedDevice } from "./models/connectedDevice";
import { ConnectedDeviceAdapter } from "./models/connectedDeviceAdapter";
import { DeviceEventAdapter } from "./models/deviceEventAdapter";
import { MetricsStartEndOptions, MetricsPeriodOptions } from "./types";
import { Metric } from "./models/metric";
import { MetricAdapter } from "./models/metricAdapter";

/**
 * ## Connect API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbedCloudSDK = require("mbed-cloud-sdk");
 *
 * var connect = new mbedCloudSDK.ConnectApi({
 *     apiKey: "<mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/connect.min.js"></script>
 *
 * <script>
 *     var connect = new mbedCloudSDK.ConnectApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 *
 * ### Notification channels
 *
 * Some methods on connected device resources (e.g. `resource.getValue()`) and most events (e.g. `resource.on("notification")`) require a notification channel to be set up before they will work.
 *
 * There are two options for setting up a notification channel:
 *  * Register a callback server or _webhook_ using `updateWebhook()`
 *  * Use long-polling by using `startNotifications()`
 *
 * The `webhook` and `long-polling` examples show how this can be done.
 */
export class ConnectApi extends EventEmitter {

    private readonly ASYNC_KEY = "async-response-id";

    private _endpoints: Endpoints;
    private _pollRequest: superagent.SuperAgentRequest;
    private _asyncFns: { [key: string]: Function; } = {};
    private _notifyFns: { [key: string]: Function; } = {};

    /**
     * Whether async callbacks are handled by the API.
     * Long polling will set this automatically, but it can also be used alongside the `notify` function with webhooks
     */
    handleNotifications: boolean;

    /**
     * Resource notification event
     * @event
     */
    static EVENT_NOTIFICATION: string = "notification";

    /**
     * List of new devices that have registered (with resources)
     * @event
     */
    static EVENT_REGISTRATION: string = "registration";

    /**
     * List of devices that have updated registration
     * @event
     */
    static EVENT_REREGISTRATION: string = "reregistration";

    /**
     * List of devices that were removed in a controlled manner
     * @event
     */
    static EVENT_DEREGISTRATION: string = "deregistration";

    /**
     * List of devices that were removed because the registration has expired
     * @event
     */
    static EVENT_EXPIRED: string = "expired";

    /**
     * @param options connection objects
     */
    constructor(options: ConnectionOptions) {
        super();
        this._endpoints = new Endpoints(options);
    }

    /**
     * Allows a notification to be injected into the notifications system
     *
     * `handleNotifications` needs to be set to true for this to work with web hook async responses
     *
     * Example: (The following pushes a notification to the event emitter, which can be read back by using the `.on` function.
     * Note that the payload is encoded in Base64)
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var payload = "Q2hhbmdlIG1lIQ==";
     * 
     * var notification = {notifications: [{ep: deviceID, path: resourceURI, payload: payload}]};
     * connectApi.notify(notification);
     *
     * connectApi.on(mbed.ConnectApi.EVENT_NOTIFICATION, function(notification) {
     *     // Do something with the notification
     *     console.log(notification);
     * });
     * ```
     * Console log:
     * ```json
     * { id: '015bb66a92a30000000000010010006d', path: '3200/0/5500', payload: 'Change me!'}
     * ```
     *
     * @param data The notification data to inject
    */
    public notify(notification: NotificationObject) {

        // Notification can be null
        if (!notification) return;

        if (notification["notifications"]) {
            notification["notifications"].forEach(notification => {
                var body = notification.payload ? decodeBase64(notification.payload, notification.ct) : null;
                var path = notification.ep + notification.path;
                var fn = this._notifyFns[path];
                if (fn) fn(body);

                this.emit(ConnectApi.EVENT_NOTIFICATION, {
                    id: notification.ep,
                    path: notification.path,
                    payload: body
                });
            });
        }

        if (notification["registrations"]) {
            notification["registrations"].forEach(device => {
                this.emit(ConnectApi.EVENT_REGISTRATION, DeviceEventAdapter.map(device, this));
            });
        }

        if (notification["reg-updates"]) {
            notification["reg-updates"].forEach(device => {
                this.emit(ConnectApi.EVENT_REREGISTRATION, DeviceEventAdapter.map(device, this));
            });
        }

        if (notification["de-registrations"]) {
            notification["de-registrations"].forEach(deviceId => {
                this.emit(ConnectApi.EVENT_DEREGISTRATION, deviceId);
            });
        }

        if (notification["registrations-expired"]) {
            notification["registrations-expired"].forEach(deviceId => {
                this.emit(ConnectApi.EVENT_EXPIRED, deviceId);
            });
        }

        if (notification["async-responses"]) {
            notification["async-responses"].forEach(response => {
                var asyncID = response.id;
                var fn = this._asyncFns[asyncID];
                if (fn) {
                    if (response.status >= 400) {
                        fn(response.error || response.status, null);
                    } else {
                        var body = response.payload ? decodeBase64(response.payload, response.ct) : null;
                        fn(null, body);
                    }
                    delete this._asyncFns[asyncID];
                }
            });
        }
    }

    /**
     * Begins long polling constantly for notifications
     *
     * If an external callback is not setup (using update_webhook), then calling this function is mandatory.
     *
     * Example:
     * ```JavaScript
     * connect.startNotifications()
     * .then(() => {
     *     console.log('mbed Cloud SDK listening for notifications');
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options notification options
     * @returns Promise containing any error
     */
    public startNotifications(options?: NotificationOptions): Promise<void>;
    /**
     * Begins long polling constantly for notifications
     *
     * If an external callback is not setup (using update_webhook), then calling this function is mandatory.
     *
     * Example:
     * ```JavaScript
     * connect.startNotifications(function(error) {
     *     if (error) return console.log(error);
     *     console.log('mbed Cloud SDK listening for notifications');
     * });
     * ```
     *
     * @param options notification options
     * @param callback A function that is passed any error
     */
    public startNotifications(options?: NotificationOptions, callback?: CallbackFn<void>): void;
    public startNotifications(options?: any, callback?: CallbackFn<void>): Promise<void> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return asyncStyle(done => {
            let { interval, requestCallback } = options;

            function poll() {
                this._pollRequest = this._endpoints.notifications.v2NotificationPullGet((error, data) => {

                    if (!this.handleNotifications) return;

                    this.notify(data);

                    if (requestCallback && data["async-responses"]) requestCallback(error, data["async-responses"]);

                    if (error) {
                        this.handleNotifications = false;
                        return;
                    }

                    setTimeout(poll.bind(this), interval || 500);
                });
            }

            poll.call(this);
            this.handleNotifications = true;

            done(null, null);
        }, callback);
    }

    /**
     * Stops long polling for notifications
     *
     * Example:
     * ```JavaScript
     * connect.stopNotifications()
     * .then(() => {
     *     console.log('mbed Cloud SDK stopped listening for notifications');
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @returns Promise containing any error
     */
    public stopNotifications(): Promise<void>;
    /**
     * Stops long polling for notifications
     *
     * Example:
     * ```JavaScript
     * connect.stopNotifications(function(error) {
     *     if (error) throw error;
     *     console.log('mbed Cloud SDK stopped listening for notifications');
     * });
     * ```
     *
     * @param callback A function that is passed any error
     */
    public stopNotifications(callback: CallbackFn<void>): void;
    public stopNotifications(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            if (this._pollRequest) {
                this._pollRequest.abort();
                this._pollRequest = null;
            }

            this.handleNotifications = false;

            done(null, null);
        }, callback);
    }

    /**
     * Get the current callback URL if it exists
     *
     * Example:
     * ```JavaScript
     * connect.getWebhook()
     * .then(webhook => {
     *     // Utilize webhook here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @returns Promise containing the webhhok data
     */
    public getWebhook(): Promise<Webhook>;
    /**
     * Get the current callback URL if it exists
     *
     * Example:
     * ```JavaScript
     * connect.getWebhook(function(error, webhook) {
     *     if (error) throw error;
     *     // Utilize webhook here
     * });
     * ```
     *
     * @param callback A function that is passed the arguments (error, webhook)
     */
    public getWebhook(callback: CallbackFn<Webhook>): void;
    public getWebhook(callback?: CallbackFn<Webhook>): Promise<Webhook> {
        return asyncStyle(done => {
            this._endpoints.webhooks.v2NotificationCallbackGet((error, data) => {

                if (error) {
                    if (error.code === 404) {
                        // No webhook
                        return done(null, null);
                    }
                    return done(error);
                }

                let webhook = WebhookAdapter.map(data);
                done(null, webhook);
            });
        }, callback);
    }

    /**
     * Register new webhook for incoming subscriptions.
     *
     * If a webhook is already set, this will do an overwrite.
     *
     * Example:
     * ```JavaScript
     * connect.updateWebhook(url)
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param url The URL to which the notifications must be sent
     * @param headers Any headers (key/value) that must be sent with the request
     * @returns Promise containing any error
     */
    public updateWebhook(url: string, headers?: { [key: string]: string; }): Promise<void>;
    /**
     * Register new webhook for incoming subscriptions.
     *
     * If a webhook is already set, this will do an overwrite.
     *
     * Example:
     * ```JavaScript
     * connect.updateWebhook(url, function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param url The URL to which the notifications must be sent
     * @param headers Any headers (key/value) that must be sent with the request
     * @param callback A function that is passed any error
     */
    public updateWebhook(url: string, headers?: { [key: string]: string; }, callback?: CallbackFn<void>): void;
    public updateWebhook(url: string, headers?: any, callback?: CallbackFn<void>): Promise<void> {
        headers = headers || {};
        if (typeof headers === "function") {
            callback = headers;
            headers = {};
        }

        return asyncStyle(done => {
            this.deleteWebhook(() => {
                this._endpoints.notifications.v2NotificationCallbackPut({
                    url: url,
                    headers: headers
                }, error => {
                    if (error) return done(error);
                    done(null, null);
                });
            });
        }, callback);
    }

    /**
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
     *
     * If no webhook is registered, an exception (404) will be raised.
     *
     * Note that every registered subscription will be deleted as part of deregistering a webhook.
     *
     * Example:
     * ```JavaScript
     * connect.deleteWebhook()
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @returns Promise containing any error
     */
    public deleteWebhook(): Promise<void>;
    /**
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
     *
     * If no webhook is registered, an exception (404) will be raised.
     *
     * Note that every registered subscription will be deleted as part of deregistering a webhook.
     *
     * Example:
     * ```JavaScript
     * connect.deleteWebhook(function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param callback A function that is passed any error
     */
    public deleteWebhook(callback: CallbackFn<void>): void;
    public deleteWebhook(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.webhooks.v2NotificationCallbackDelete(() => {
                done(null, null);
            });
        }, callback);
    }

    /**
     * Gets a list of pre-subscription data
     *
     * Example:
     * ```JavaScript
     * connect.listPresubscriptions()
     * .then(presubscriptions => {
     *     // Utilize presubscriptions here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @returns Promise containing pre-subscriptions
     */
    public listPresubscriptions(): Promise<Array<PresubscriptionObject>>;
    /**
     * Gets a list of pre-subscription data
     *
     * Example:
     * ```JavaScript
     * connect.listPresubscriptions(function(error, presubscriptions) {
     *     if (error) throw error;
     *     // Utilize presubscriptions here
     * });
     * ```
     *
     * @param callback A function that is passed (error, pre-subscriptions)
     */
    public listPresubscriptions(callback: CallbackFn<Array<PresubscriptionObject>>): void;
    public listPresubscriptions(callback?: CallbackFn<Array<PresubscriptionObject>>): Promise<Array<PresubscriptionObject>> {
        return apiWrapper(resultsFn => {
            this._endpoints.subscriptions.v2SubscriptionsGet(resultsFn);
        }, (data, done) => {
            let presubs = data.map(PresubscriptionAdapter.map);
            done(null, presubs);
        }, callback);
    }

    /**
     * Updates pre-subscription data. If you send an empty array, the pre-subscription data will be removed
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var subscriptions = [{deviceId: deviceID}];
     * connect.updatePresubscriptions(subscriptions)
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param subscriptions The pre-subscription data array
     * @returns Promise containing any error
     */
    public updatePresubscriptions(subscriptions: Array<PresubscriptionObject>): Promise<void>;
    /**
     * Updates pre-subscription data. If you send an empty array, the pre-subscription data will be removed
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var subscriptions = [{deviceId: deviceID}];
     * connect.updatePresubscriptions(subscriptions, function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param subscriptions The pre-subscription data array
     * @param callback A function that is passed any error
     */
    public updatePresubscriptions(subscriptions: Array<PresubscriptionObject>, callback: CallbackFn<void>): void;
    public updatePresubscriptions(subscriptions: Array<PresubscriptionObject>, callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper(resultsFn => {
            let presubs = subscriptions.map(PresubscriptionAdapter.reverseMap);
            this._endpoints.subscriptions.v2SubscriptionsPut(presubs, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * Deletes pre-subscription data
     *
     * Example:
     * ```JavaScript
     * connect.deletePresubscriptions()
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @returns Promise containing any error
     */
    public deletePresubscriptions(): Promise<void>;
    /**
     * Deletes pre-subscription data
     *
     * Example:
     * ```JavaScript
     * connect.deletePresubscriptions(function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param callback A function that is passed any error
     */
    public deletePresubscriptions(callback: CallbackFn<void>): void;
    public deletePresubscriptions(callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper(resultsFn => {
            this._endpoints.subscriptions.v2SubscriptionsPut([], resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * Removes all subscriptions
     *
     * Example:
     * ```JavaScript
     * connect.deleteSubscriptions()
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @returns Promise containing any error
     */
    public deleteSubscriptions(): Promise<void>;
    /**
     * Removes all subscriptions
     *
     * Example:
     * ```JavaScript
     * connect.deleteSubscriptions(function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param callback A function that is passed any error
     */
    public deleteSubscriptions(callback: CallbackFn<void>): void;
    public deleteSubscriptions(callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper(resultsFn => {
            this._endpoints.subscriptions.v2SubscriptionsDelete(resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * List connected devices
     *
     * Example: (The following filters all connected devices to those with custom device type `QuickstartDevice`):
     * ```JavaScript
     * connect.listConnectedDevices("QuickstartDevice")
     * .then(devices => {
     *     // Utilize devices here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param type Filter devices by device type
     * @returns Promise of connected devices
     */
    public listConnectedDevices(type?: string): Promise<Array<ConnectedDevice>>;
    /**
     * List connected devices
     *
     * Example: (The following filters all connected devices to those with custom device type `QuickstartDevice`):
     * ```JavaScript
     * connect.listConnectedDevices("QuickstartDevice", function(error, devices) {
     *     if (error) throw error;
     *     // Utilize devices here
     * });
     * ```
     *
     * @param options.type Filter devices by device type
     * @param callback A function that is passed the arguments (error, devices)
     */
    public listConnectedDevices(type?: string, callback?: CallbackFn<Array<ConnectedDevice>>): void;
    public listConnectedDevices(type?: any, callback?: CallbackFn<Array<ConnectedDevice>>): Promise<Array<ConnectedDevice>> {
        if (typeof type === "function") {
            callback = type;
            type = null;
        }

        return apiWrapper(resultsFn => {
            this._endpoints.endpoints.v2EndpointsGet(type, resultsFn);
        }, (data, done) => {
            let devices = data.map(device => {
                return ConnectedDeviceAdapter.map(device, this);
            });

            done(null, devices);
        }, callback);
    }

    /**
     * List a device's subscriptions
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * connect.listDeviceSubscriptions(deviceId)
     * .then(subscriptions => {
     *     // Utilize subscriptions here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @returns Promise containing the subscriptions
     */
    public listDeviceSubscriptions(deviceId: string): Promise<any>;
    /**
     * List a device's subscriptions
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * connect.listDeviceSubscriptions(deviceId, function(error, subscriptions) {
     *     if (error) throw error;
     *     // Utilize subscriptions here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param callback A function that is passed (error, subscriptions)
     */
    public listDeviceSubscriptions(deviceId: string, callback: CallbackFn<any>): void;
    public listDeviceSubscriptions(deviceId: string, callback?: CallbackFn<any>): Promise<any> {
        return apiWrapper(resultsFn => {
            this._endpoints.subscriptions.v2SubscriptionsDeviceIdGet(deviceId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * Removes a device's subscriptions
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * connect.deleteDeviceSubscriptions(deviceId)
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @returns Promise containing any error
     */
    public deleteDeviceSubscriptions(deviceId: string): Promise<void>;
    /**
     * Removes a device's subscriptions
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * connect.deleteDeviceSubscriptions(deviceId, function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param callback A function that is passed any error
     */
    public deleteDeviceSubscriptions(deviceId: string, callback: CallbackFn<void>): void;
    public deleteDeviceSubscriptions(deviceId: string, callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper(resultsFn => {
            this._endpoints.subscriptions.v2SubscriptionsDeviceIdDelete(deviceId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * List device's resources
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * connect.listResources(deviceId)
     * .then(resources => {
     *     for (var resource in resources) {
     *         // Utilize resource here
     *         console.log(resources[resource]);
     *     }
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @returns Promise of device resources
     */
    public listResources(deviceId: string): Promise<Array<Resource>>;
    /**
     * List device's resources
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * connect.listResources(deviceId, function(error, resources) {
     *     if (error) throw error;
     *     for (var resource in resources) {
     *         // Utilize resource here
     *         console.log(resources[resource]);
     *     }
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param callback A function that is passed the arguments (error, resources)
     */
    public listResources(deviceId: string, callback: CallbackFn<Array<Resource>>): void;
    public listResources(deviceId: string, callback?: CallbackFn<Array<Resource>>): Promise<Array<Resource>> {
        return apiWrapper(resultsFn => {
            this._endpoints.endpoints.v2EndpointsDeviceIdGet(deviceId, resultsFn);
        }, (data, done) => {
            var resources = data.map(resource => {
                return ResourceAdapter.map(resource, deviceId, this);
            });

            done(null, resources);
        }, callback);
    }

    /**
     * Deletes a resource
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.deleteResource(deviceId, resourceURI)
     * .then(response => {
     *     // Utilize response here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    public deleteResource(deviceId: string, path: string, noResponse?: boolean): Promise<string>;
    /**
     * Deletes a resource
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.deleteResource(deviceId, resourceURI, function(error, response) {
     *     if (error) throw error;
     *     // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    public deleteResource(deviceId: string, path: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
    public deleteResource(deviceId: string, path: string, noResponse?: boolean, callback?: CallbackFn<string>): Promise<string> {
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }

        return apiWrapper(resultsFn => {
            this._endpoints.resources.v2EndpointsDeviceIdResourcePathDelete(deviceId, path, noResponse, resultsFn);
        }, (data, done) => {
            done(null, data[this.ASYNC_KEY]);
        }, callback);
    }

    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.getResourceValue(deviceId, resourceURI)
     * .then(data => {
     *     // Utilize data here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise of resource value when handling notifications or an asyncId
     */
    public getResourceValue(deviceId: string, path: string, cacheOnly?: boolean, noResponse?: boolean): Promise<string>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.getResourceValue(deviceId, resourceURI, function(error, data) {
     *     if (error) throw error;
     *     // Utilize data here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when handling notifications or an asyncId
     */
    public getResourceValue(deviceId: string, path: string, cacheOnly?: boolean, noResponse?: boolean, callback?: CallbackFn<string>): void;
    public getResourceValue(deviceId: string, path: string, cacheOnly?: boolean, noResponse?: boolean, callback?: CallbackFn<string>): Promise<string> {
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        if (typeof cacheOnly === "function") {
            callback = cacheOnly;
            cacheOnly = false;
            noResponse = false;
        }

        return apiWrapper(resultsFn => {
            this._endpoints.resources.v2EndpointsDeviceIdResourcePathGet(deviceId, path, cacheOnly, noResponse, resultsFn);
        }, (data, done) => {
            var asyncID = data[this.ASYNC_KEY];
            if (this.handleNotifications && asyncID) {
                this._asyncFns[asyncID] = done;
                return;
            }

            done(null, asyncID);
        }, callback);
    }

    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var payload = "ChangeMe!";
     * connect.setResourceValue(deviceId, resourceURI, payload)
     * .then(response => {
     *     // Utilize response here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param value The value of the resource
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    public setResourceValue(deviceId: string, path: string, value: string, noResponse?: boolean): Promise<string>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var payload = "ChangeMe!";
     * connect.setResourceValue(deviceId, resourceURI, payload, function(error, response) {
     *     if (error) throw error;
     *     // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param value The value of the resource
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    public setResourceValue(deviceId: string, path: string, value: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
    public setResourceValue(deviceId: string, path: string, value: string, noResponse?: boolean, callback?: CallbackFn<string>): Promise<string> {
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }

        return apiWrapper(resultsFn => {
            this._endpoints.resources.v2EndpointsDeviceIdResourcePathPut(deviceId, path.substr(1), value, noResponse, resultsFn);
        }, (data, done) => {
            var asyncID = data[this.ASYNC_KEY];
            if (this.handleNotifications && asyncID) {
                this._asyncFns[asyncID] = done;
                return;
            }

            done(null, asyncID);
        }, callback);
    }

    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.executeResource(deviceId, resourceURI)
     * .then(response => {
     *     // Utilize response here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    public executeResource(deviceId: string, path: string, functionName?: string, noResponse?: boolean): Promise<string>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.executeResource(deviceId, resourceURI, function(error, response) {
     *     if (error) throw error;
     *     // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    public executeResource(deviceId: string, path: string, functionName?: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
    public executeResource(deviceId: string, path: string, functionName?: string, noResponse?: boolean, callback?: CallbackFn<string>): Promise<string> {
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        if (typeof functionName === "function") {
            callback = functionName;
            functionName = null;
            noResponse = false;
        }

        return apiWrapper(resultsFn => {
            this._endpoints.resources.v2EndpointsDeviceIdResourcePathPost(deviceId, path, functionName, noResponse, resultsFn);
        }, (data, done) => {
            var asyncID = data[this.ASYNC_KEY];
            if (this.handleNotifications && asyncID) {
                this._asyncFns[asyncID] = done;
                return;
            }

            done(null, asyncID);
        }, callback);
    }

    /**
     * Gets the status of a resource's subscription
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.getResourceSubscription(deviceId, resourceURI)
     * .then(res_exists => {
     *     // Utilize res_exists here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @returns Promise containing resource subscription status
     */
    public getResourceSubscription(deviceId: string, path: string): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.getResourceSubscription(deviceId, resourceURI, function(error, res_exists) {
     *     if (error) throw error;
     *     // Utilize res_exists here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    public getResourceSubscription(deviceId: string, path: string, callback: CallbackFn<boolean>): void;
    public getResourceSubscription(deviceId: string, path: string, callback?: CallbackFn<boolean>): Promise<boolean> {
        return apiWrapper(resultsFn => {
            this._endpoints.subscriptions.v2SubscriptionsDeviceIdResourcePathGet(deviceId, path, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.addResourceSubscription(deviceId, resourceURI, function calllback(data) {
     *     // Utilize data here - which is the updated value in resourceURI
     * })
     * .then(response => {
     *     // Utilize response here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param notifyFn Function to call with notification
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    public addResourceSubscription(deviceId: string, path: string, notifyFn?: Function): Promise<string>;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.addResourceSubscription(deviceId, resourceURI, function callback(data) {
     *      // Utilize data here - which is the updated value in resourceURI
     * }, function(error, response) {
     *     if (error) throw error;
     *     // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    public addResourceSubscription(deviceId: string, path: string, callback?: CallbackFn<string>, notifyFn?: Function): void;
    public addResourceSubscription(deviceId: string, path: string, callback?: CallbackFn<string>, notifyFn?: Function): Promise<string> {
        return apiWrapper(resultsFn => {
            this._endpoints.subscriptions.v2SubscriptionsDeviceIdResourcePathPut(deviceId, path, resultsFn);
        }, (data, done) => {
            if (notifyFn) {
                // Record the function at this path for notifications
                this._notifyFns[deviceId + path] = notifyFn;
            }

            var asyncID = data[this.ASYNC_KEY];
            if (this.handleNotifications && asyncID) {
                this._asyncFns[asyncID] = done;
                return;
            }

            done(null, asyncID);
        }, callback);
    }

    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.deleteResourceSubscription(deviceId, resourceURI)
     * .then(response => {
     *     // Utilize response here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    public deleteResourceSubscription(deviceId: string, path: string): Promise<string>;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.deleteResourceSubscription(deviceId, resourceURI, function(error, response) {
     *     if (error) throw error;
     *     // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    public deleteResourceSubscription(deviceId: string, path: string, callback: CallbackFn<string>): void;
    public deleteResourceSubscription(deviceId: string, path: string, callback?: CallbackFn<string>): Promise<string> {
        return apiWrapper(resultsFn => {
            this._endpoints.subscriptions.v2SubscriptionsDeviceIdResourcePathDelete(deviceId, path, resultsFn);
        }, (data, done) => {
            // no-one is listening :(
            delete this._notifyFns[deviceId + path];

            var asyncID = data[this.ASYNC_KEY];
            if (this.handleNotifications && asyncID) {
                this._asyncFns[asyncID] = done;
                return;
            }

            done(null, asyncID);
        }, callback);
    }

    /**
     * Get account-specific metrics
     *
     * Example: (The following will retrieve metrics regarding pending and failed device registrations in the last day)
     * ```JavaScript
     * var today = new Date();
     * var yesterday = new Date();
     * yesterday.setDate(yesterday.getDate() - 1);
     * var options = {start: yesterday, end: today, include: ["pendingDeviceRegistrations", "failedDeviceRegistrations"]};
     * connect.getAccountMetrics(options)
     * .then(metrics => {
     *     // Utilize metrics here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options metrics options
     * @returns Promise of metrics
     */
    public getAccountMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions): Promise<Array<Metric>>;
    /**
     * Get account-specific metrics
     *
     * Example: (The following will retrieve metrics regarding pending and failed device registrations in the last day)
     * ```JavaScript
     * var today = new Date();
     * var yesterday = new Date();
     * yesterday.setDate(yesterday.getDate() - 1);
     * var options = {start: yesterday, end: today, include: ["pendingDeviceRegistrations", "failedDeviceRegistrations"]};
     * connect.getAccountMetrics(options, function(error, metrics) {
     *     if (error) throw error;
     *     // Utilize metrics here
     * });
     * ```
     *
     * @param options metrics options
     * @param callback A function that is passed the return arguments (error, metrics)
     */
    public getAccountMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions, callback: CallbackFn<Array<Metric>>): void;
    public getAccountMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions, callback?: CallbackFn<Array<Metric>>): Promise<Array<Metric>> {
        return apiWrapper(resultsFn => {
            function isPeriod(options: MetricsStartEndOptions | MetricsPeriodOptions): options is MetricsPeriodOptions {
                return (<MetricsPeriodOptions>options).period !== undefined;
            }

            let include = MetricAdapter.mapIncludes(options.include);
            let interval = MetricAdapter.mapTimePeriod(options.interval);
            let start = null;
            let end = null;
            let period = null;

            if (isPeriod(options)) {
                period = MetricAdapter.mapTimePeriod(options.period);
            } else {
                start = options.start.toISOString();
                end = options.end.toISOString();
            }

            this._endpoints.account.v3MetricsGet(include, interval, "", start, end, period, resultsFn);
        }, (data, done) => {
            let list: Metric[];

            if (data.data && data.data.length) {
                list = data.data.map(metric => {
                    return MetricAdapter.map(metric);
                });
            }

            done(null, list);
        }, callback);
    }

    /**
     * Get metrics
     *
     * Example: (The following will retrieve metrics regarding pending and failed device registrations in the last day)
     * ```JavaScript
     * var today = new Date();
     * var yesterday = new Date();
     * yesterday.setDate(yesterday.getDate() - 1);
     * var options = {start: yesterday, end: today, include: ["pendingDeviceRegistrations", "failedDeviceRegistrations"]};
     * connect.getMetrics(options)
     * .then(metrics => {
     *     // Utilize metrics here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options metrics options
     * @returns Promise of metrics
     */
    public getMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions): Promise<Array<Metric>>;
    /**
     * Get metrics
     *
     * Example: (The following will retrieve metrics regarding pending and failed device registrations in the last day)
     * ```JavaScript
     * var today = new Date();
     * var yesterday = new Date();
     * yesterday.setDate(yesterday.getDate() - 1);
     * var options = {start: yesterday, end: today, include: ["pendingDeviceRegistrations", "failedDeviceRegistrations"]};
     * connect.getMetrics(options, function(error, metrics) {
     *     if (error) throw error;
     *     // Utilize metrics here
     * });
     * ```
     *
     * @param options metrics options
     * @param callback A function that is passed the return arguments (error, metrics)
     */
    public getMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions, callback: CallbackFn<Array<Metric>>): void;
    public getMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions, callback?: CallbackFn<Array<Metric>>): Promise<Array<Metric>> {
        return apiWrapper(resultsFn => {
            function isPeriod(options: MetricsStartEndOptions | MetricsPeriodOptions): options is MetricsPeriodOptions {
                return (<MetricsPeriodOptions>options).period !== undefined;
            }

            let include = MetricAdapter.mapIncludes(options.include);
            let interval = MetricAdapter.mapTimePeriod(options.interval);
            let start = null;
            let end = null;
            let period = null;

            if (isPeriod(options)) {
                period = MetricAdapter.mapTimePeriod(options.period);
            } else {
                start = options.start.toISOString();
                end = options.end.toISOString();
            }

            this._endpoints.statistics.v3MetricsGet(include, interval, "", start, end, period, resultsFn);
        }, (data, done) => {
            let list: Metric[];

            if (data.data && data.data.length) {
                list = data.data.map(metric => {
                    return MetricAdapter.map(metric);
                });
            }

            done(null, list);
        }, callback);
    }
}
