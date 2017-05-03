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
import { asyncStyle, decodeBase64 } from "../common/functions";
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
 * var mbed = require("mbed-cloud-sdk");
 *
 * var connectApi = new mbed.ConnectApi({
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
 *     var connectApi = new mbed.ConnectApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
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
     * Allows a notification to be injected into the notifications system.<br>
     * `handleNotifications` needs to be set to true for this to work with web hook async responses.
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
     *      // Do something with the notification
     *      console.log(notification);
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
     * Begins long polling constantly for notifications<p>
     * If an external callback is not setup (using update_webhook), then calling this function is mandatory.
     *
     * Example:
     * ```JavaScript
     * var promise = connectApi.startNotifications();
     * promise.then(function() {
     *      console.log('mbed Cloud SDK listening for notifications');
     * }, console.error);
     * ```
     *
     * @param options notification options
     * @returns Promise containing any error
     */
    public startNotifications(options?: NotificationOptions): Promise<void>;
    /**
     * Begins long polling constantly for notifications<p>
     * If an external callback is not setup (using update_webhook), then calling this function is mandatory.
     *
     * Example:
     * ```JavaScript
     * connectApi.startNotifications(function (error) {
     *      if (error) throw error;
     *      console.log('mbed Cloud SDK listening for notifications');
     * });
     * ```
     *
     * @param options notification options
     * @param callback A function that is passed any error
     */
    public startNotifications(options?: NotificationOptions, callback?: CallbackFn<void>);
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
     * var promise = connectApi.stopNotifications();
     * promise.then(function () {
     *      console.log('mbed Cloud SDK stopped listening for notifications');
     * }, console.error);
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
     * connectApi.stopNotifications(function (error) {
     *      if (error) throw error;
     *      console.log('mbed Cloud SDK stopped listening for notifications');
     * });
     * ```
     *
     * @param callback A function that is passed any error
     */
    public stopNotifications(callback: CallbackFn<void>);
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
     * var promise = connectApi.getWebhook();
     * promise.then(function (webhook) {
     *      // Utilize webhook here
     * }, console.error);
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
     * connectApi.getWebhook(function (error, webhook) {
     *      if (error) throw error;
     *      // Utilize webook here
     * });
     * ```
     * 
     * @param callback A function that is passed the arguments (error, webhook)
     */
    public getWebhook(callback: CallbackFn<Webhook>);
    public getWebhook(callback?: CallbackFn<Webhook>): Promise<Webhook> {
        return asyncStyle(done => {
            this._endpoints.webhooks.v2NotificationCallbackGet((error, data) => {

                if (error) {
                    if (error.status === 404) {
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
     * Register new webhook for incoming subscriptions.<p>
     * If a webhook is already set, this will do an overwrite.
     *
     * Example:
     * ```JavaScript
     * var url = "http://localhost:8080";
     * var promise = connectApi.updateWebhook(url);
     * promise.then(null, console.error);
     * ```
     *
     * @param url The URL to which the notifications must be sent
     * @param headers Any headers (key/value) that must be sent with the request
     * @returns Promise containing any error
     */
    public updateWebhook(url: string, headers?: { [key: string]: string; }): Promise<void>;
    /**
     * Register new webhook for incoming subscriptions.<p>
     * If a webhook is already set, this will do an overwrite.
     *
     * Example:
     * ```JavaScript
     * var url = "http://localhost:8080";
     * connectApi.updateWebhook(url, function (error) {
     *      if (error) throw error;
     * });
     * ```
     *
     * @param url The URL to which the notifications must be sent
     * @param headers Any headers (key/value) that must be sent with the request
     * @param callback A function that is passed any error
     */
    public updateWebhook(url: string, headers?: { [key: string]: string; }, callback?: CallbackFn<void>);
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
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)<p>
     * If no webhook is registered, an exception (404) will be raised.<br>
     * Note that every registered subscription will be deleted as part of deregistering a webhook.
     *
     * Example:
     * ```JavaScript
     * var promise = connectApi.deleteWebhook();
     * promise.then(null, console.error);
     * ```
     *
     * @returns Promise containing any error
     */
    public deleteWebhook(): Promise<void>;
    /**
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)<p>
     * If no webhook is registered, an exception (404) will be raised.<br>
     * Note that every registered subscription will be deleted as part of deregistering a webhook.
     *
     * Example:
     * ```JavaScript
     * connectApi.deleteWebhook(function (error) {
     *      // Error handling code here
     * });
     * ```
     *
     * @param callback A function that is passed any error
     */
    public deleteWebhook(callback: CallbackFn<void>);
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
     * var promise = connectApi.listPresubscriptions();
     * promise.then(function (presubscriptions) {
     *      // Utilize presubscriptions here
     * }, console.error);
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
     * connectApi.listPresubscriptions(function (error, presubscriptions) {
     *      if (error) throw error;
     *      // Utilize presubscriptions here
     * });
     * ```
     *
     * @param callback A function that is passed (error, pre-subscriptions)
     */
    public listPresubscriptions(callback: CallbackFn<Array<PresubscriptionObject>>);
    public listPresubscriptions(callback?: CallbackFn<Array<PresubscriptionObject>>): Promise<Array<PresubscriptionObject>> {
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsGet((error, data) => {
                if (error) return done(error);

                let presubs = data.map(PresubscriptionAdapter.map);
                done(null, presubs);
            });
        }, callback);
    }

    /**
     * Updates pre-subscription data. If you send an empty array, the pre-subscription data will be removed
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var subscriptions = [{deviceId: deviceID}];
     * var promise = connectApi.updatePresubscriptions(subscriptions);
     * promise.then(null, console.error);
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
     * connectApi.updatePresubscriptions(subscriptions, function (error) {
     *      if (error) throw error;
     * });
     * ```
     *
     * @param subscriptions The pre-subscription data array
     * @param callback A function that is passed any error
     */
    public updatePresubscriptions(subscriptions: Array<PresubscriptionObject>, callback: CallbackFn<void>);
    public updatePresubscriptions(subscriptions: Array<PresubscriptionObject>, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            let presubs = subscriptions.map(PresubscriptionAdapter.reverseMap);

            this._endpoints.subscriptions.v2SubscriptionsPut(presubs, error => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * Deletes pre-subscription data
     *
     * Example:
     * ```JavaScript
     * var promise = connectApi.deletePresubscriptions();
     * promise.then(null, console.error);
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
     * connectApi.deletePresubscriptions(function (error) {
     *      if (error) throw error;
     * });
     * ```
     *
     * @param callback A function that is passed any error
     */
    public deletePresubscriptions(callback: CallbackFn<void>);
    public deletePresubscriptions(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsPut([], error => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * Removes all subscriptions
     *
     * Example:
     * ```JavaScript
     * var promise = connectApi.deleteSubscriptions();
     * promise.then(null, console.error);
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
     * connectApi.deleteSubscriptions(function (error) {
     *      if (error) throw error;
     * });
     * ```
     *
     * @param callback A function that is passed any error
     */
    public deleteSubscriptions(callback: CallbackFn<void>);
    public deleteSubscriptions(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsDelete(error => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * List connected devices
     *
     * Example: (The following filters all connected devices to those with custom device type `QuickstartDevice`):
     * ```JavaScript
     * var promise = connectApi.listConnectedDevices("QuickstartDevice");
     * promise.then(function (devices) {
     *      // Utilize devices here
     * }, console.error);
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
     * connectApi.listConnectedDevices("QuickstartDevice", function (error, devices) {
     *      if (error) throw error;
     *      for (var device in devices.data) {
     *          // Utilize each device
     *          console.log(devices.data[device]);
     *      }
     * });
     * ```
     *
     * @param options.type Filter devices by device type
     * @param callback A function that is passed the arguments (error, devices)
     */
    public listConnectedDevices(type?: string, callback?: CallbackFn<Array<ConnectedDevice>>);
    public listConnectedDevices(type?: any, callback?: CallbackFn<Array<ConnectedDevice>>): Promise<Array<ConnectedDevice>> {
        if (typeof type === "function") {
            callback = type;
            type = null;
        }

        return asyncStyle(done => {
            this._endpoints.endpoints.v2EndpointsGet(type, (error, data) => {
                if (error) return done(error);

                let devices = data.map(device => {
                    return ConnectedDeviceAdapter.map(device, this);
                });
                done(null, devices);
            });
        }, callback);
    }

    /**
     * List a device's subscriptions
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var promise = connectApi.listDeviceSubscriptions(deviceID);
     * promise.then(function (subscriptions) {
     *      // Utilize subscriptions here
     * }, console.error);
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
     * var deviceID = "015bb66a92a30000000000010010006d";
     * connectApi.listPresubscriptions(deviceID, function (error, subscriptions) {
     *      if (error) throw error;
     *      // Utilize subscriptions here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param callback A function that is passed (error, subscriptions)
     */
    public listDeviceSubscriptions(deviceId: string, callback: CallbackFn<any>);
    public listDeviceSubscriptions(deviceId: string, callback?: CallbackFn<any>): Promise<any> {
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsDeviceIdGet(deviceId, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * Removes a device's subscriptions
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var promise = connectApi.deleteDeviceSubscriptions(deviceID);
     * promise.then(null, console.error);
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
     * var deviceID = "015bb66a92a30000000000010010006d";
     * connectApi.deleteDeviceSubscriptions(deviceID, function (error) {
     *      if (error) throw error;
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param callback A function that is passed any error
     */
    public deleteDeviceSubscriptions(deviceId: string, callback: CallbackFn<void>);
    public deleteDeviceSubscriptions(deviceId: string, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsDeviceIdDelete(deviceId, error => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * List all resources registered to a connected device.
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var promise = connectApi.listResources(deviceID);
     * promise.then(function (resources) {
     *      for (var resource in resources) {
     *          // Utilize resource here
     *          console.log(resources[resource]);
     *      }
     * }, console.error);
     * ```
     *
     * @param deviceId Device ID
     * @returns Promise of device resources
     */
    public listResources(deviceId: string): Promise<Array<Resource>>;
    /**
     * List all resources registered to a connected device.
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * connectApi.listResources(deviceID, function (error, resources) {
     *      if (error) throw error;
     *      for (var resource in resources) {
     *          // Utilize resource here
     *          console.log(resources[resource]);
     *      }
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param callback A function that is passed the arguments (error, resources)
     */
    public listResources(deviceId: string, callback: CallbackFn<Array<Resource>>);
    public listResources(deviceId: string, callback?: CallbackFn<Array<Resource>>): Promise<Array<Resource>> {
        return asyncStyle(done => {
            this._endpoints.endpoints.v2EndpointsDeviceIdGet(deviceId, (error, data) => {
                if (error) return done(error);

                var resources = data.map(resource => {
                    return ResourceAdapter.map(resource, deviceId, this);
                });
                done(null, resources);
            });
        }, callback);
    }

    /**
     * Deletes a resource
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var promise = connectApi.deleteResource(deviceID, resourceURI);
     * promise.then(function (response) {
     *      // Utilize response here
     * }, console.error);
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
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connectApi.deleteResource(deviceID, resourceURI, function (error, response) {
     *      if (error) throw error;
     *      // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    public deleteResource(deviceId: string, path: string, noResponse?: boolean, callback?: CallbackFn<string>);
    public deleteResource(deviceId: string, path: string, noResponse?: boolean, callback?: CallbackFn<string>): Promise<string> {
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }

        return asyncStyle(done => {
            this._endpoints.resources.v2EndpointsDeviceIdResourcePathDelete(deviceId, path, noResponse, (error, data) => {
                if (error) return done(error);
                done(null, data[this.ASYNC_KEY]);
            });
        }, callback);
    }

    /**
     * Get a resource value for a given device and resource path
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var promise = connectApi.getResourceValue(deviceID, resourceURI);
     * promise.then(function (data) {
     *      // Utilize data here
     * }, console.error);
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
     * Get a resource value for a given device and resource path
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5501";
     * connectApi.getResourceValue(deviceID, resourceURI, function (error, value) {
     *      if (error) throw error;
     *      // Utilize value here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when handling notifications or an asyncId
     */
    public getResourceValue(deviceId: string, path: string, cacheOnly?: boolean, noResponse?: boolean, callback?: CallbackFn<string>);
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

        return asyncStyle(done => {
            this._endpoints.resources.v2EndpointsDeviceIdResourcePathGet(deviceId, path, cacheOnly, noResponse, (error, data) => {
                if (error) return done(error);

                var asyncID = data[this.ASYNC_KEY];
                if (this.handleNotifications && asyncID) {
                    this._asyncFns[asyncID] = done;
                    return;
                }

                done(null, asyncID);
            });
        }, callback);
    }

    /**
     * Sets the resource value for a given resource path, on a specified device.
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var payload = "ChangeMe!";
     * var promise = connectApi.setResourceValue(deviceID, resourceURI, payload);
     * promise.then(function (response) {
     *      // Utilize response here
     * }, console.error);
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param value The value of the resource
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    public setResourceValue(deviceId: string, path: string, value: string, noResponse?: boolean): Promise<string>;
    /**
     * Sets the resource value for a given resource path, on a specified device.
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var payload = "Change me!";
     * connectApi.setResourceValue(deviceID, resourceURI, payload, function (error, response) {
     *      if (error) throw error;
     *      // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param value The value of the resource
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    public setResourceValue(deviceId: string, path: string, value: string, noResponse?: boolean, callback?: CallbackFn<string>);
    public setResourceValue(deviceId: string, path: string, value: string, noResponse?: boolean, callback?: CallbackFn<string>): Promise<string> {
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }

        return asyncStyle(done => {
            this._endpoints.resources.v2EndpointsDeviceIdResourcePathPut(deviceId, path.substr(1), value, noResponse, (error, data) => {
                if (error) return done(error);

                var asyncID = data[this.ASYNC_KEY];
                if (this.handleNotifications && asyncID) {
                    this._asyncFns[asyncID] = done;
                    return;
                }

                done(null, asyncID);
            });
        }, callback);
    }

    /**
     * Execute a function on a resource
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var promise = connectApi.executeResource(deviceID, resourceURI);
     * promise.then(function (response) {
     *      // Utilize response here
     * }, console.error);
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    public executeResource(deviceId: string, path: string, functionName?: string, noResponse?: boolean): Promise<string>;
    /**
     * Execute a function on a resource
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connectApi.executeResource(deviceID, resourceURI, function (error, response) {
     *      if (error) throw error;
     *      // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    public executeResource(deviceId: string, path: string, functionName?: string, noResponse?: boolean, callback?: CallbackFn<string>);
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

        return asyncStyle(done => {
            this._endpoints.resources.v2EndpointsDeviceIdResourcePathPost(deviceId, path, functionName, noResponse, (error, data) => {
                if (error) return done(error);

                var asyncID = data[this.ASYNC_KEY];
                if (this.handleNotifications && asyncID) {
                    this._asyncFns[asyncID] = done;
                    return;
                }

                done(null, asyncID);
            });
        }, callback);
    }

    /**
     * Gets the status of a resource's subscription
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var promise = connectApi.getResourceSubscription(deviceID, resourceURI);
     * promise.then(function (res_exists) {
     *      // Utilize res_exists here
     * }, console.error);
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
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connectApi.getResourceSubscription(deviceID, resourceURI, function (error, res_exists) {
     *      if (error) throw error;
     *      // Utilize res_exists here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    public getResourceSubscription(deviceId: string, path: string, callback: CallbackFn<boolean>);
    public getResourceSubscription(deviceId: string, path: string, callback?: CallbackFn<boolean>): Promise<boolean> {
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsDeviceIdResourcePathGet(deviceId, path, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * Subscribe to resource updates.<p>
     * When called on valid device and resource path a subscription is setup so that any update on the resource path value triggers a new element on the FIFO queue.
     *
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var promise = connectApi.addResourceSubscription(deviceID, resourceURI, function calllback(data) {
     *      // Utilize data here - which is the updated value in resourceURI
     * });
     * promise.then(null, console.error);
     * ```
     *
     * @param deviceId Device ID of the device to subscribe on
     * @param path Resource path on the device to observe
     * @param notifyFn Function to call when the notification occurs
     * @param callback A function that is passed on any error
     */
    public addResourceSubscription(deviceId: string, path: string, notifyFn?: Function): Promise<void>;
    /**
     * Subscribe to resource updates.<p>
     * When called on valid device and resource path a subscription is setup so that any update on the resource path value triggers a new element on the FIFO queue.
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connectApi.addResourceSubscription(deviceID, resourceURI, function callback(data) {
     *      // Utilize data here - which is the updated value in resourceURI
     * }, function (error) {
     *      if (error) throw error;
     * });
     * ```
     * 
     * @param deviceId Device ID
     * @param path Resource path
     * @param notifyFn Function to call with notification
     * @returns Promise containing any error
     */
    public addResourceSubscription(deviceId: string, path: string, callback?: CallbackFn<void>, notifyFn?: Function);
    public addResourceSubscription(deviceId: string, path: string, callback?: CallbackFn<void>, notifyFn?: Function): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsDeviceIdResourcePathPut(deviceId, path, (error, data) => {
                if (error) return done(error);

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
            });
        }, callback);
    }

    /**
     * Unsubscribe to resource updates.<p>
     * If deviceId or path is None, we remove every subscripton for them. I.e. calling this method without arguments removes all subscriptions, 
     * but calling it with only deviceId removes subscriptions for all resources on the given device.
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var promise = connectApi.deleteResourceSubscription(deviceID, resourceURI);
     * promise.then(null, console.error);
     * ```
     *
     * @param deviceId Device ID
     * @param path Resource path
     * @param callback A function that is passed any error
     */
    public deleteResourceSubscription(deviceId: string, path: string): Promise<void>;
    /**
     * Unsubscribe to resource updates.<p>
     * If deviceId or path is None, we remove every subscripton for them. I.e. calling this method without arguments removes all subscriptions, 
     * but calling it with only deviceId removes subscriptions for all resources on the given device.
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connectApi.deleteResourceSubscription(deviceID, resourceURI, function (error) {
     *      if (error) throw error;
     * });
     * ```
     * 
     * @param deviceId Device ID
     * @param path Resource path
     * @returns Promise containing any error
     */
    public deleteResourceSubscription(deviceId: string, path: string, callback: CallbackFn<void>);
    public deleteResourceSubscription(deviceId: string, path: string, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsDeviceIdResourcePathDelete(deviceId, path, (error, data) => {
                if (error) return done(error);

                // no-one is listening :(
                delete this._notifyFns[deviceId + path];

                var asyncID = data[this.ASYNC_KEY];
                if (this.handleNotifications && asyncID) {
                    this._asyncFns[asyncID] = done;
                    return;
                }

                done(null, asyncID);
            });
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
     * var promise = connectApi.getAccountMetrics(options);
     * promise.then(function (metrics) {
     *      // Utilize metrics here
     * }, console.error);
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
     * connectApi.getAccountMetrics(options, function (error, metrics) {
     *      if (error) throw error;
     *      // Handle metrics here
     * });
     * ```
     *
     * @param options metrics options
     * @param callback A function that is passed the return arguments (error, metrics)
     */
    public getAccountMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions, callback: CallbackFn<Array<Metric>>);
    public getAccountMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions, callback?: CallbackFn<Array<Metric>>): Promise<Array<Metric>> {
        return asyncStyle(done => {

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

            this._endpoints.account.v3MetricsGet(include, interval, "", start, end, period, (error, data) => {
                if (error) return done(error);

                let list = data.data.map(metric => {
                    return MetricAdapter.map(metric);
                });

                done(null, list);
            });
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
     * var promise = connectApi.getMetrics(options);
     * promise.then(function (metrics) {
     *      // Utilize metrics here
     * }, console.error);
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
     * connectApi.getMetrics(options, function (error, metrics) {
     *      if (error) throw error;
     *      // Handle metrics here
     * });
     * ```
     *
     * @param options metrics options
     * @param callback A function that is passed the return arguments (error, metrics)
     */
    public getMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions, callback: CallbackFn<Array<Metric>>);
    public getMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions, callback?: CallbackFn<Array<Metric>>): Promise<Array<Metric>> {
        return asyncStyle(done => {

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

            this._endpoints.statistics.v3MetricsGet(include, interval, "", start, end, period, (error, data) => {
                if (error) return done(error);

                let list = data.data.map(metric => {
                    return MetricAdapter.map(metric);
                });

                done(null, list);
            });
        }, callback);
    }
}
