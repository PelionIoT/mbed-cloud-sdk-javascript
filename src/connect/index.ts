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

const DEFAULT_POLLING_INTERVAL = 500;
const ASYNC_KEY = "async-response-id";

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
 * var connect = new mbed.ConnectApi({
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
 *     var connect = new mbed.ConnectApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 */
export class ConnectApi extends EventEmitter {

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
     * `handleNotifications` needs to be set to true for this to work with web hook async responses
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
     * @param options notification options
     * @returns Promise containing any error
     */
    public startNotifications(options?: NotificationOptions): Promise<void>;
    /**
     * Begins long polling constantly for notifications
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

                setTimeout(poll.bind(this), interval || DEFAULT_POLLING_INTERVAL);
            });
        }

        poll.call(this);
        this.handleNotifications = true;

        return asyncStyle(done => {
            done(null, null);
        }, callback);
    }

    /**
     * Stops long polling for notifications
     * @returns Promise containing any error
     */
    public stopNotifications(): Promise<void>;
    /**
     * Stops long polling for notifications
     * @param callback A function that is passed any error
     */
    public stopNotifications(callback: CallbackFn<void>);
    public stopNotifications(callback?: CallbackFn<void>): Promise<void> {
        if (this._pollRequest) {
            this._pollRequest.abort();
            this._pollRequest = null;
        }

        this.handleNotifications = false;

        return asyncStyle(done => {
            done(null, null);
        }, callback);
    }

    /**
     * Gets the current webhook data
     * @returns Promise containing the webhhok data
     */
    public getWebhook(): Promise<Webhook>;
    /**
     * Gets the current webhook data
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
     * Updates the webhook
     * @param url The URL to which the notifications must be sent
     * @param headers Any headers (key/value) that must be sent with the request
     * @returns Promise containing any error
     */
    public updateWebhook(url: string, headers?: { [key: string]: string; }): Promise<void>;
    /**
     * Updates the webhook
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
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
     * @returns Promise containing any error
     */
    public deleteWebhook(): Promise<void>;
    /**
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
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
     * @returns Promise containing pre-subscriptions
     */
    public listPresubscriptions(): Promise<Array<PresubscriptionObject>>;
    /**
     * Gets a list of pre-subscription data
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
     * @param subscriptions The pre-subscription data array
     * @returns Promise containing any error
     */
    public updatePresubscriptions(subscriptions: Array<PresubscriptionObject>): Promise<void>;
    /**
     * Updates pre-subscription data. If you send an empty array, the pre-subscription data will be removed
     * @param subscriptions The pre-subscription data array
     * @param callback A function that is passed any error
     */
    public updatePresubscriptions(subscriptions: Array<PresubscriptionObject>, callback: CallbackFn<void>);
    public updatePresubscriptions(subscriptions: Array<PresubscriptionObject>, callback?: CallbackFn<void>): Promise<void> {
        let presubs = subscriptions.map(PresubscriptionAdapter.reverseMap);
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsPut(presubs, error => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * Deletes pre-subscription data
     * @returns Promise containing any error
     */
    public deletePresubscriptions(): Promise<void>;
    /**
     * Deletes pre-subscription data
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
     * @returns Promise containing any error
     */
    public deleteSubscriptions(): Promise<void>;
    /**
     * Removes all subscriptions
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
     * @param type Filter devices by device type
     * @returns Promise of connected devices
     */
    public listConnectedDevices(type?: string): Promise<Array<ConnectedDevice>>;
    /**
     * List connected devices
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
     * @param deviceId Device ID
     * @returns Promise containing the subscriptions
     */
    public listDeviceSubscriptions(deviceId: string): Promise<any>;
    /**
     * List a device's subscriptions
     * @param deviceId Device ID
     * @param callback A function that is passed (error, subscriptions)
     */
    public listDeviceSubscriptions(deviceId: string, callback: CallbackFn<any>);
    public listDeviceSubscriptions(deviceId: string, callback?: CallbackFn<any>): Promise<any> {
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsIdGet(deviceId, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * Removes a device's subscriptions
     * @param deviceId Device ID
     * @returns Promise containing any error
     */
    public deleteDeviceSubscriptions(deviceId: string): Promise<void>;
    /**
     * Removes a device's subscriptions
     * @param deviceId Device ID
     * @param callback A function that is passed any error
     */
    public deleteDeviceSubscriptions(deviceId: string, callback: CallbackFn<void>);
    public deleteDeviceSubscriptions(deviceId: string, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsIdDelete(deviceId, error => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * List device's resources
     * @param deviceId Device ID
     * @returns Promise of device resources
     */
    public listResources(deviceId: string): Promise<Array<Resource>>;
    /**
     * List device's resources
     * @param deviceId Device ID
     * @param callback A function that is passed the arguments (error, resources)
     */
    public listResources(deviceId: string, callback: CallbackFn<Array<Resource>>);
    public listResources(deviceId: string, callback?: CallbackFn<Array<Resource>>): Promise<Array<Resource>> {
        return asyncStyle(done => {
            this._endpoints.endpoints.v2EndpointsIdGet(deviceId, (error, data) => {
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
     * @param deviceId Device ID
     * @param path Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    public deleteResource(deviceId: string, path: string, noResponse?: boolean): Promise<string>;
    /**
     * Deletes a resource
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
            this._endpoints.resources.v2EndpointsIdResourcePathDelete(deviceId, path, noResponse, (error, data) => {
                if (error) return done(error);
                done(null, data[ASYNC_KEY]);
            });
        }, callback);
    }

    /**
     * Gets the value of a resource
     * @param deviceId Device ID
     * @param path Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise of resource value when handling notifications or an asyncId
     */
    public getResourceValue(deviceId: string, path: string, cacheOnly?: boolean, noResponse?: boolean): Promise<string>;
    /**
     * Gets the value of a resource
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
            this._endpoints.resources.v2EndpointsIdResourcePathGet(deviceId, path, cacheOnly, noResponse, (error, data) => {
                if (error) return done(error);

                var asyncID = data[ASYNC_KEY];
                if (this.handleNotifications && asyncID) {
                    this._asyncFns[asyncID] = done;
                    return;
                }

                done(null, asyncID);
            });
        }, callback);
    }

    /**
     * Sets the value of a resource
     * @param deviceId Device ID
     * @param path Resource path
     * @param value The value of the resource
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    public setResourceValue(deviceId: string, path: string, value: string, noResponse?: boolean): Promise<string>;
    /**
     * Sets the value of a resource
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
            this._endpoints.resources.v2EndpointsIdResourcePathPut(deviceId, path.substr(1), value, noResponse, (error, data) => {
                if (error) return done(error);

                var asyncID = data[ASYNC_KEY];
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
     * @param deviceId Device ID
     * @param path Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    public executeResource(deviceId: string, path: string, functionName?: string, noResponse?: boolean): Promise<string>;
    /**
     * Execute a function on a resource
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
            this._endpoints.resources.v2EndpointsIdResourcePathPost(deviceId, path, functionName, noResponse, (error, data) => {
                if (error) return done(error);

                var asyncID = data[ASYNC_KEY];
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
     * @param deviceId Device ID
     * @param path Resource path
     * @returns Promise containing resource subscription status
     */
    public getResourceSubscription(deviceId: string, path: string): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     * @param deviceId Device ID
     * @param path Resource path
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    public getResourceSubscription(deviceId: string, path: string, callback: CallbackFn<boolean>);
    public getResourceSubscription(deviceId: string, path: string, callback?: CallbackFn<boolean>): Promise<boolean> {
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsIdResourcePathGet(deviceId, path, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * Subscribe to a resource
     * @param deviceId Device ID
     * @param path Resource path
     * @param notifyFn Function to call with notification
     * @returns Promise containing any error
     */
    public addResourceSubscription(deviceId: string, path: string, notifyFn?: Function): Promise<void>;
    /**
     * Subscribe to a resource
     * @param deviceId Device ID
     * @param path Resource path
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed any error
     */
    public addResourceSubscription(deviceId: string, path: string, callback?: CallbackFn<void>, notifyFn?: Function);
    public addResourceSubscription(deviceId: string, path: string, callback?: CallbackFn<void>, notifyFn?: Function): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsIdResourcePathPut(deviceId, path, (error, data) => {
                if (error) return done(error);

                if (notifyFn) {
                    // Record the function at this path for notifications
                    this._notifyFns[deviceId + path] = notifyFn;
                }

                var asyncID = data[ASYNC_KEY];
                if (this.handleNotifications && asyncID) {
                    this._asyncFns[asyncID] = done;
                    return;
                }

                done(null, asyncID);
            });
        }, callback);
    }

    /**
     * Deletes a resource's subscription
     * @param deviceId Device ID
     * @param path Resource path
     * @returns Promise containing any error
     */
    public deleteResourceSubscription(deviceId: string, path: string): Promise<void>;
    /**
     * Deletes a resource's subscription
     * @param deviceId Device ID
     * @param path Resource path
     * @param callback A function that is passed any error
     */
    public deleteResourceSubscription(deviceId: string, path: string, callback: CallbackFn<void>);
    public deleteResourceSubscription(deviceId: string, path: string, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.subscriptions.v2SubscriptionsIdResourcePathDelete(deviceId, path, (error, data) => {
                if (error) return done(error);

                // no-one is listening :(
                delete this._notifyFns[deviceId + path];

                var asyncID = data[ASYNC_KEY];
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
     * @param options metrics options
     * @returns Promise of metrics
     */
    public getAccountMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions): Promise<Array<Metric>>;
    /**
     * Get account-specific metrics
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
     * @param options metrics options
     * @returns Promise of metrics
     */
    public getMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions): Promise<Array<Metric>>;
    /**
     * Get metrics
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
