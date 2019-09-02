/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
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

import * as superagent from "superagent";
import { EventEmitter } from "events";
import { ListResponse } from "../common/listResponse";
import { asyncStyle, apiWrapper, decodeBase64, encodeBase64 } from "../common/functions";
import { CallbackFn } from "../common/interfaces";
import { SDKError } from "../common/sdkError";
import { Endpoints } from "./endpoints";
import { ConnectOptions, NotificationObject, NotificationOptions, PresubscriptionObject, AsyncResponse, DeliveryMethod } from "./types";
import { Webhook } from "./models/webhook";
import { WebhookAdapter } from "./models/webhookAdapter";
import { PresubscriptionAdapter } from "./models/presubscriptionAdapter";
import { Resource } from "./models/resource";
import { ResourceAdapter } from "./models/resourceAdapter";
import { ConnectedDevice } from "./models/connectedDevice";
import { DeviceEventAdapter } from "./models/deviceEventAdapter";
import { MetricsListOptions, MetricsStartEndListOptions, MetricsPeriodListOptions } from "./types";
import { Metric } from "./models/metric";
import { MetricAdapter } from "./models/metricAdapter";
import { ApiMetadata } from "../common/apiMetadata";
import { DeviceListOptions } from "../deviceDirectory/types";
import { DeviceDirectoryApi } from "../deviceDirectory/deviceDirectoryApi";
import { generateId } from "../common/idGenerator";
import { executeForAll } from "../common/legacyPaginator";
import { Subscribe } from "../../primary/subscribe/subscribe";
import { loggerFactory } from "../../common/logger";
import { Logger } from "typescript-logging";
import { isJwt } from "../../common/utils";

/**
 * ## Connect API
 *
 * The API can be initalized with a .env file in the working directory with the following values
 *
 * MBED_CLOUD_SDK_API_KEY=<Pelion DM API Key>
 *
 * and optionally
 *
 * MBED_CLOUD_SDK_HOST=<your host> (defaults to https://api.us-east-1.mbedcloud.com)
 *
 * OR
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var PelionDMSDK = require("mbed-cloud-sdk");
 *
 * var connect = new PelionDMSDK.ConnectApi({
 *     apiKey: "<Pelion DM API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<pelion-dm-sdk>/bundles/connect.min.js"></script>
 *
 * <script>
 *     var connect = new MbedCloudSDK.ConnectApi({
 *         apiKey: "<Pelion DM API Key>"
 *     });
 * </script>
 * ```
 *
 * ### Notification channels
 *
 * Some methods on connected device resources (e.g. `resource.getValue()`) and most events (e.g. `resource.on("notification")`) require a notification channel to be set up before they will work.
 *
 * There are two options for setting up a notification channel:
 *  * Use pull notifications by using `startNotifications()` (the default which starts automatically)
 *  * Register a callback server or _webhook_ using `updateWebhook()`
 *
 * The `webhook` and `pull-notifications` examples show how this can be done.
 */
export class ConnectApi extends EventEmitter {
    /**
     * Resource notification event
     * @event
     */
    public static readonly EVENT_NOTIFICATION: string = "notification";

    /**
     * List of new devices that have registered (with resources)
     * @event
     */
    public static readonly EVENT_REGISTRATION: string = "registration";

    /**
     * List of devices that have updated registration
     * @event
     */
    public static readonly EVENT_REREGISTRATION: string = "reregistration";

    /**
     * List of devices that were removed in a controlled manner
     * @event
     */
    public static readonly EVENT_DEREGISTRATION: string = "deregistration";

    /**
     * List of devices that were removed because the registration has expired
     * @event
     */
    public static readonly EVENT_EXPIRED: string = "expired";

    private static readonly ASYNC_KEY = "async-response-id";
    private static readonly DELAY_BETWEEN_RETRIES = 1000;
    private static readonly MAXIMUM_NUMBER_OF_RETRIES = 3;

    /**
     * Gives you access to the subscribe interface
     */
    public readonly subscribe: Subscribe;

    /**
     * Clear any existing channels before receiving notifications
     */
    public readonly forceClear: boolean;

    /**
     * Start receiving notifications on the client without calling start notifications
     */
    public readonly autostartNotifications?: boolean;

    /**
     * @deprecated webhook will work if updateWebhook is called or if startNotifications is not called
     */
    public readonly handleNotifications?: boolean;

    private _config: ConnectOptions;
    private _pollRequest: superagent.SuperAgentRequest | boolean;
    // private readonly _websockerUrl: string = "";
    private _instanceId: string;
    private _deviceDirectory: DeviceDirectoryApi;
    private _endpoints: Endpoints;
    private _asyncFns: { [key: string]: (error: any, data: any) => any; } = {};
    private _notifyFns: { [key: string]: (data: any) => any; } = {};
    // private _connectOptions: ConnectOptions;
    // private _requestCallback: CallbackFn<Array<AsyncResponse>>;
    private _deliveryMethod?: DeliveryMethod;
    // private _isClosing: boolean;
    // private _restartCount: number;
    private _log: Logger;

    public get deliveryMethod(): DeliveryMethod {
        return this._deliveryMethod;
    }

    public get instanceId(): string {
        return this._instanceId;
    }

    /**
     * @param options connection objects
     */
    constructor(options?: ConnectOptions) {
        super();
        options = options || {};
        this._config = options;
        this._instanceId = generateId();
        // this._connectOptions = options;
        this._endpoints = new Endpoints(options);
        this._deviceDirectory = new DeviceDirectoryApi(options);
        this._log = loggerFactory(`connectApi${this._instanceId}`, options.logLevel).getLogger("ConnectApi");
        // this._restartCount = 0;
        // this._websockerUrl = `${options.host.replace("https", "wss")}/v2/notification/websocket-connect`;

        // make sure handle notifications keeps working
        if (options.handleNotifications) {
            options.autostartNotifications = false;
            this._deliveryMethod = "SERVER_INITIATED";
        }

        // default force clear and autostart to false;
        this.forceClear = options.forceClear === true;
        this.autostartNotifications = options.autostartNotifications === true;

        if (this.autostartNotifications === true) {
            this._deliveryMethod = "CLIENT_INITIATED";
        }

        this.subscribe = new Subscribe(this);

        // // by default, sdk will teardown channel on exit (node only)
        // if (isThisNode() && !options.skipCleanup) {
        //     [ "SIGHUP", "SIGINT", "SIGQUIT", "SIGILL", "SIGTRAP", "SIGABRT", "SIGBUS", "SIGFPE", "SIGUSR1", "SIGSEGV", "SIGUSR2", "SIGTERM" ]
        //         .forEach(sig => {
        //             process.on(sig, async () => {
        //                 this._log.debug(`received ${sig} - tearing down connectApi...`);
        //                 await this.terminate();
        //                 process.exit(1);
        //             });
        //         });
        // }
    }

    /**
     * Allows a notification to be injected into the notifications system
     *
     * `handleNotifications` needs to be set to true for this to work with web hook async responses
     *
     * Example: (The following pushes a notification to the event emitter, which can be read back by using the `.on` function.
     * Note that the payload is encoded in Base64)
     *
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "/3200/0/5500";
     * var payload = "Q2hhbmdlIG1lIQ==";
     *
     * var notification = {notifications: [{ep: deviceID, path: resourceURI, payload: payload}]};
     * connectApi.notify(notification);
     *
     * connectApi.on(ConnectApi.EVENT_NOTIFICATION, function(notification) {
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
    public notify(data: NotificationObject) {
        // Data can be null
        if (!data) { return; }

        this.subscribe.notifyAllNotifications(data);
        if (data.notifications) {
            data.notifications.forEach(notification => {
                const body = notification.payload ? decodeBase64(notification.payload, notification.ct) : null;
                const path = `${notification.ep}${notification.path}`;
                const fn = this._notifyFns[path];
                if (fn) { fn(body); }

                this.emit(ConnectApi.EVENT_NOTIFICATION, {
                    id: notification.ep,
                    path: notification.path,
                    payload: body,
                });

                this.subscribe.notifyResourceValues({
                    deviceId: notification.ep,
                    path: notification.path,
                    payload: body,
                    maxAge: notification["max-age"],
                    contentType: notification.ct,
                });
            });
        }

        if (data.registrations) {
            data.registrations.forEach(device => {
                const map = DeviceEventAdapter.map(device, this, "registration");
                this.subscribe.notifyDeviceEvents(map);
                this.emit(ConnectApi.EVENT_REGISTRATION, map);
            });
        }

        if (data["reg-updates"]) {
            data["reg-updates"].forEach(device => {
                const map = DeviceEventAdapter.map(device, this, "reregistration");
                this.subscribe.notifyDeviceEvents(map);
                this.emit(ConnectApi.EVENT_REREGISTRATION, map);
            });
        }

        if (data["de-registrations"]) {
            data["de-registrations"].forEach(deviceId => {
                const map = DeviceEventAdapter.mapId(deviceId, "deregistration");
                this.subscribe.notifyDeviceEvents(map);
                this.emit(ConnectApi.EVENT_DEREGISTRATION, deviceId);
            });
        }

        if (data["registrations-expired"]) {
            data["registrations-expired"].forEach(deviceId => {
                const map = DeviceEventAdapter.mapId(deviceId, "expired");
                this.subscribe.notifyDeviceEvents(map);
                this.emit(ConnectApi.EVENT_EXPIRED, deviceId);
            });
        }

        if (data["async-responses"]) {
            data["async-responses"].forEach(response => {
                const asyncID = response.id;
                const fn = this._asyncFns[asyncID];
                if (fn) {
                    if (response.status >= 400) {
                        const error = new SDKError(response.error || response.status, null, null, response.status);
                        fn(error, null);
                    } else {
                        const body = response.payload ? decodeBase64(response.payload, response.ct) : null;
                        // if body is null, might be more useful to return the whole response
                        if (body) {
                            fn(null, body);
                        } else {
                            fn(null, response);
                        }
                    }
                    delete this._asyncFns[asyncID];
                }
            });
        }
    }

    /**
     * Begins pull notifications
     *
     * If an external callback is not setup (using update_webhook), then calling this function is mandatory.
     *
     * Example:
     * ```JavaScript
     * connect.startNotifications()
     * .then(() => {
     *     console.log('Pelion Device Management SDK listening for notifications');
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
     * Begins pull notifications
     *
     * If an external callback is not setup (using update_webhook), then calling this function is mandatory.
     *
     * Example:
     * ```JavaScript
     * connect.startNotifications(function(error) {
     *     if (error) return console.log(error);
     *     console.log('Pelion Device Management SDK listening for notifications');
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

        // if (options.requestCallback) {
        //     this._requestCallback = options.requestCallback;
        // }

        if (!this._deliveryMethod) {
            this._deliveryMethod = "CLIENT_INITIATED";
        }

        return asyncStyle(async done => {
            // cannot call start notifications if using webhooks
            if (this._deliveryMethod === "SERVER_INITIATED") {
                return done(new SDKError("cannot call start notifications if delivery method is server initiated"), null);
            }

            this._log.debug("starting notifications...");

            // websocket has been initalised and opened
            if (this._pollRequest) {
                this._log.debug("notifications already started");
                return done(null, null);
            }

            // websocket hasn't been started so lets set it up
            if (this.forceClear) {
                await this.forceClearWebhook();
            } else {
                if (await this.getWebhook()) {
                    return done(new SDKError("cannot call start notifications as a webhook already exists"), null);
                }
            }

            this._pollRequest = true;
            const { interval, requestCallback } = options;

            let serverErrorCount = 0;
            let networkErrorCount = 0;
            const poll = () => {
                this._pollRequest = this._endpoints.notifications.longPollNotifications((error, data) => {
                    // If there is an error here it might be a connectivity error (for example ERR_NETWORK_CHANGED
                    // may happen when switching between different networks, say between 4G and WiFi). We cannot
                    // determine (in a portable way) the exact error then we retry a few times for all of them.
                    if (error) {
                        ++networkErrorCount;

                        if (networkErrorCount <= ConnectApi.MAXIMUM_NUMBER_OF_RETRIES) {
                            setTimeout(poll, ConnectApi.DELAY_BETWEEN_RETRIES);
                        }

                        return;
                    }

                    // Check for server errors, 4xx errors raise an exception (see notify()) but we want to give
                    // a chance to 5xx errors because they might be caused by a temporary condition. Note that
                    // delay is "progressive", T for the first attempt, 2T for the second and so on.
                    if (data["async-responses"]) {
                        const errors = data["async-responses"].filter(response => response.status >= 400);
                        const onlyServerErrors = errors.every(response => response.status >= 500);

                        if (errors.length > 0 && onlyServerErrors) {
                            ++serverErrorCount;

                            if (serverErrorCount <= ConnectApi.MAXIMUM_NUMBER_OF_RETRIES) {
                                setTimeout(poll, ConnectApi.DELAY_BETWEEN_RETRIES * serverErrorCount);
                                return;
                            }
                        }
                        // We already reached the maximum number of retries or it's a 4xx error, notify()
                        // will throw the appropriate exception.
                    }
                    this.notify(data);
                    if (requestCallback && data["async-responses"]) { requestCallback(error, data["async-responses"]); }
                    // Each successful request resets these counters. TODO: we may want to keep track of them to stop trying
                    // if they occurr to often but decision is arbitrary, we may expose an ErrorHandler object (which will also
                    // include all the relevant stats) to let the caller decide what to do.
                    serverErrorCount = 0;
                    networkErrorCount = 0;
                    setTimeout(poll, interval || 500);
                });
            };

            function start() {
                poll();
                done(null, null);
            }

            start();
        }, callback);
    }

    /**
     * Stops pull notifications
     *
     * Example:
     * ```JavaScript
     * connect.stopNotifications()
     * .then(() => {
     *     console.log('Pelion Device Management SDK stopped listening for notifications');
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
     * Stops pull notifications
     *
     * Example:
     * ```JavaScript
     * connect.stopNotifications(function(error) {
     *     if (error) throw error;
     *     console.log('Pelion Device Management SDK stopped listening for notifications');
     * });
     * ```
     *
     * @param callback A function that is passed any error
     */
    public stopNotifications(callback: CallbackFn<void>): void;
    public stopNotifications(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(async done => {
            // cannot call stop notifications if using webhooks
            if (this._deliveryMethod === "SERVER_INITIATED") {
                this._log.warn("should not call stop notifications if delivery method is server initiated");
                return done(null, null);
            }

            this._log.debug("stopping notifications...");

            // websocket is null or has been closed
            if (this._pollRequest) {
                this._log.debug("nothing to stop");
                return done(null, null);
            }

            this._endpoints.notifications.deleteLongPollChannel(() => {
                if (this._pollRequest) {
                    // tslint:disable-next-line:no-string-literal
                    if (this._pollRequest["abort"]) { this._pollRequest["abort"](); }
                    this._pollRequest = null;
                }
                done(null, null);
            });
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
     * @returns Promise containing the webhook data
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
            if (isJwt(this._config.apiKey)) {
                done(null, null);
            } else {
                this._endpoints.notifications.getWebhook((error, data) => {

                    if (error) {
                        if (error.code === 404) {
                            // No webhook
                            return done(null, null);
                        }
                        return done(error);
                    }

                    const webhook = WebhookAdapter.map(data);
                    done(null, webhook);
                });
            }
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
     * @param forceClear Whether to clear any existing notification channel
     * @returns Promise containing any error
     */
    public updateWebhook(url: string, headers?: { [key: string]: string; }, forceClear?: boolean): Promise<void>;
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
     * @param forceClear @deprecated please use force clear on initalisation instead
     * @param callback A function that is passed any error
     */
    public updateWebhook(url: string, headers?: { [key: string]: string; }, forceClear?: boolean, callback?: CallbackFn<void>): void;
    public updateWebhook(url: string, headers?: any, forceClear?: any, callback?: CallbackFn<void>): Promise<void> {
        headers = headers || {};
        forceClear = forceClear || false;
        if (typeof forceClear === "function") {
            callback = forceClear;
            forceClear = false;
        }
        if (typeof headers === "function") {
            callback = headers;
            headers = {};
        }

        if (!this._deliveryMethod) {
            this._deliveryMethod = "SERVER_INITIATED";
        }

        return asyncStyle(done => {

            if (this._deliveryMethod === "CLIENT_INITIATED") {
                return done(new SDKError("cannot update webhook if delivery method is client initiated"), null);
            }

            function update() {
                this._endpoints.notifications.registerWebhook({
                    url: url,
                    headers: headers,
                }, error => {
                    if (error) { return done(error); }
                    done(null, null);
                });
            }

            if (this.forceClear || forceClear) {
                this.stopNotifications(update.bind(this));
            } else {
                update.call(this);
            }
        }, callback);
    }

    /**
     * Deletes the callback data
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
     * Deletes the callback data
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
            this._endpoints.notifications.deregisterWebhook(() => {
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
            this._endpoints.subscriptions.getPreSubscriptions(resultsFn);
        }, (data, done) => {
            const presubs = data.map(PresubscriptionAdapter.map);
            done(null, presubs);
        }, callback);
    }

    /**
     * Update pre-subscription data
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
     * @param subscriptions The pre-subscription data array. If you send an empty array, the pre-subscription data will be removed
     * @returns Promise containing any error
     */
    public updatePresubscriptions(subscriptions: Array<PresubscriptionObject>): Promise<void>;
    /**
     * Update pre-subscription data
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
     * @param subscriptions The pre-subscription data array. If you send an empty array, the pre-subscription data will be removed
     * @param callback A function that is passed any error
     */
    public updatePresubscriptions(subscriptions: Array<PresubscriptionObject>, callback: CallbackFn<void>): void;
    public updatePresubscriptions(subscriptions: Array<PresubscriptionObject>, callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper(resultsFn => {
            const presubs = subscriptions.map(PresubscriptionAdapter.reverseMap);
            this._endpoints.subscriptions.updatePreSubscriptions(presubs, resultsFn);
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
            this._endpoints.subscriptions.deletePreSubscriptions(resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * Removes all subscriptions for all devices.
     *
     * Warning: This could be slow for large numbers of connected devices.
     * If possible, explicitly delete subscriptions known to have been created.
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
     * Removes all subscriptions for all devices.
     *
     * Warning: This could be slow for large numbers of connected devices.
     * If possible, explicitly delete subscriptions known to have been created.
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
        return asyncStyle(done => {
            executeForAll(this.listConnectedDevices.bind(this), this.deleteDeviceSubscriptions.bind(this))
                .then(() => done(null), done);
        }, callback);
    }

    /**
     * List connected devices
     *
     * Example:
     * ```JavaScript
     * connect.listConnectedDevices({
     *     filter: {
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * })
     * .then(devices => {
     *     // Utilize devices here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options list options
     * @returns Promise of connected devices
     */
    public listConnectedDevices(options?: DeviceListOptions): Promise<ListResponse<ConnectedDevice>>;
    /**
     * List connected devices
     *
     * Example:
     * ```JavaScript
     * connect.listConnectedDevices({
     *     filter: {
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * }, function(error, devices) {
     *     if (error) throw error;
     *     // Utilize devices here
     * });
     * ```
     *
     * @param options list options
     * @param callback A function that is passed the arguments (error, devices)
     */
    public listConnectedDevices(options?: DeviceListOptions, callback?: CallbackFn<ListResponse<ConnectedDevice>>): void;
    public listConnectedDevices(options?: any, callback?: CallbackFn<ListResponse<ConnectedDevice>>): Promise<ListResponse<ConnectedDevice>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        // Grab all connected devices
        options.filter = options.filter || {};
        options.filter.state = "registered";

        return apiWrapper(resultsFn => {
            this._deviceDirectory.listDevices(options, resultsFn);
        }, (data, done) => {
            const devices = data.data.map(device => {
                return new ConnectedDevice(device, this);
            });

            done(null, new ListResponse<ConnectedDevice>(data, devices));
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
    public listDeviceSubscriptions(deviceId: string): Promise<string>;
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
    public listDeviceSubscriptions(deviceId: string, callback: CallbackFn<string>): void;
    public listDeviceSubscriptions(deviceId: string, callback?: CallbackFn<string>): Promise<string> {
        return apiWrapper(resultsFn => {
            this._endpoints.subscriptions.getEndpointSubscriptions(deviceId, resultsFn);
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
            this._endpoints.subscriptions.deleteEndpointSubscriptions(deviceId, resultsFn);
        }, (data, done) => {
            Object.keys(this._notifyFns).forEach(key => {
                if (key.indexOf(`${deviceId}/`) === 0) {
                    delete this._notifyFns[key];
                }
            });

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
            this._endpoints.endpoints.getEndpointResources(deviceId, resultsFn);
        }, (data, done) => {
            const resources = data.map(resource => {
                return ResourceAdapter.map(resource, deviceId, this);
            });

            done(null, resources);
        }, callback);
    }

    /**
     * Get a resource
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "/3200/0/5500";
     * connect.getResource(deviceId, resourceURI)
     * .then(resource => {
     *     // Utilize resource here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Path of the resource to get
     * @returns Promise of device resource
     */
    public getResource(deviceId: string, resourcePath: string): Promise<Resource>;
    /**
     * Get a resource
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "/3200/0/5500";
     * connect.getResource(deviceId, resourceURI, function(error, resource) {
     *     if (error) throw error;
     *     // Utilize resource here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Path of the resource to get
     * @param callback A function that is passed the arguments (error, resource)
     */
    public getResource(deviceId: string, resourcePath: string, callback?: CallbackFn<Resource>): void;
    public getResource(deviceId: string, resourcePath: string, callback?: CallbackFn<Resource>): Promise<Resource> {
        resourcePath = this.normalizePath(resourcePath);

        return apiWrapper(resultsFn => {
            this._endpoints.endpoints.getEndpointResources(deviceId, resultsFn);
        }, (data, done) => {
            const found = data.find(resource => {
                return this.normalizePath(resource.uri) === resourcePath;
            });

            if (!found) {
                return done(new SDKError("Resource not found"), null);
            }

            done(null, ResourceAdapter.map(found, deviceId, this));
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
     * var resourceURI = "/3200/0/5500";
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
     * @param resourcePath Resource path
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The requested mime type format of the value
     * @returns Promise of resource value
     */
    public getResourceValue(deviceId: string, resourcePath: string, timeout?: number, mimeType?: string): Promise<string | number | void>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "/3200/0/5500";
     * connect.getResourceValue(deviceId, resourceURI, function(error, data) {
     *     if (error) throw error;
     *     // Utilize data here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param mimeType The requested mime type format of the value
     * @param timeout async request will timeout after given number of milliseconds
     * @param callback A function that is passed the arguments (error, value)
     */
    public getResourceValue(deviceId: string, resourcePath: string, timeout?: number, mimeType?: string, callback?: CallbackFn<string | number | void>): void;
    public getResourceValue(deviceId: string, resourcePath: string, timeout?: number, mimeType?: any, callback?: CallbackFn<string | number | void>): Promise<string | number | void> {
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }

        resourcePath = this.reverseNormalizePath(resourcePath);
        const asyncId = generateId();

        return apiWrapper(async resultsFn => {
            if (await this.getWebhook() && !this.forceClear) {
                return resultsFn(new SDKError("webhook in use"), null);
            }

            this._asyncFns[asyncId] = resultsFn;

            if (callback) {
                setTimeout(() => {
                    if (this._asyncFns[asyncId]) {
                        resultsFn(new SDKError(`Timeout getting async value. Timeout ${timeout}ms`), null);
                        delete this._asyncFns[asyncId];
                    }
                }, timeout);
            }

            const handleError = error => {
                if (error) {
                    delete this._asyncFns[asyncId];
                    resultsFn(error, null);
                }
            };

            if (this.autostartNotifications) {
                this.startNotifications(null, error => {
                    if (error) return handleError(error);

                    this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                        method: "GET",
                        uri: resourcePath,
                        accept: mimeType,
                    }, handleError);
                });
            } else {
                this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                    method: "GET",
                    uri: resourcePath,
                    accept: mimeType,
                }, handleError);
            }
        }, null, callback, false, timeout);
    }

    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "/3200/0/5500";
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
     * @param resourcePath Resource path
     * @param value The value of the resource
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The mime type format of the value
     * @returns the AsyncResponse
     */
    public setResourceValue(deviceId: string, resourcePath: string, value: string | number, timeout?: number, mimeType?: string): Promise<AsyncResponse>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "/3200/0/5500";
     * var payload = "ChangeMe!";
     * connect.setResourceValue(deviceId, resourceURI, payload, function(error, response) {
     *     if (error) throw error;
     *     // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param value The value of the resource
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The mime type format of the value
     * @param callback A function that is passed any error
     */
    public setResourceValue(deviceId: string, resourcePath: string, value: string | number, timeout?: number, mimeType?: string, callback?: CallbackFn<AsyncResponse>): void;
    public setResourceValue(deviceId: string, resourcePath: string, value: string | number, timeout?: number, mimeType?: any, callback?: CallbackFn<AsyncResponse>): Promise<AsyncResponse> {
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }

        resourcePath = this.reverseNormalizePath(resourcePath);
        const asyncId = generateId();
        const payload = encodeBase64(value);

        return apiWrapper(async resultsFn => {
            if (await this.getWebhook() && !this.forceClear) {
                return resultsFn(new SDKError("webhook in use"), null);
            }

            this._asyncFns[asyncId] = resultsFn;

            if (callback) {
                setTimeout(() => {
                    if (this._asyncFns[asyncId]) {
                        resultsFn(new SDKError(`Timeout getting async value. Timeout ${timeout}ms`), null);
                        delete this._asyncFns[asyncId];
                    }
                }, timeout);
            }

            const handleError = error => {
                if (error) {
                    delete this._asyncFns[asyncId];
                    return resultsFn(error, null);
                }
            };

            if (this.autostartNotifications) {
                this.startNotifications(null, error => {
                    if (error) return handleError(error);

                    this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                        "method": "PUT",
                        "uri": resourcePath,
                        "content-type": mimeType,
                        "payload-b64": payload,
                    }, handleError);
                });
            } else {
                this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                    "method": "PUT",
                    "uri": resourcePath,
                    "content-type": mimeType,
                    "payload-b64": payload,
                }, handleError);
            }
        }, null, callback, false, timeout);
    }

    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "/3200/0/5500";
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
     * @param resourcePath Resource path
     * @param mimeType The mime type format of the value
     * @param payload The payload to be sent to the device.
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The content type of the payload
     * @param accepts The content type of an accepted response
     * @returns the AsyncResponse
     */
    public executeResource(deviceId: string, resourcePath: string, payload?: any, timeout?: number, mimeType?: string, accepts?: string): Promise<AsyncResponse>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "/3200/0/5500";
     * connect.executeResource(deviceId, resourceURI, function(error, response) {
     *     if (error) throw error;
     *     // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param mimeType The mime type format of the value
     * @param payload The payload to be sent to the device.
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The content type of the payload
     * @param accepts The content type of an accepted response
     * @param callback A function that is passed any error
     */
    public executeResource(deviceId: string, resourcePath: string, payload?: any, timeout?: number, mimeType?: string, accepts?: string, callback?: CallbackFn<AsyncResponse>): void;
    public executeResource(deviceId: string, resourcePath: string, payload?: any, timeout?: number, mimeType?: any, accepts?: string, callback?: CallbackFn<AsyncResponse>): Promise<AsyncResponse> {
        if (typeof payload === "function") {
            callback = payload;
            payload = null;
        }
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof accepts === "function") {
            callback = accepts;
            accepts = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }

        resourcePath = this.reverseNormalizePath(resourcePath);
        const asyncId = generateId();

        return apiWrapper(async resultsFn => {
            if (await this.getWebhook() && !this.forceClear) {
                return resultsFn(new SDKError("webhook in use"), null);
            }

            this._asyncFns[asyncId] = resultsFn;

            if (callback) {
                setTimeout(() => {
                    if (this._asyncFns[asyncId]) {
                        resultsFn(new SDKError(`Timeout getting async value. Timeout ${timeout}ms`), null);
                        delete this._asyncFns[asyncId];
                    }
                }, timeout);
            }

            const handleError = error => {
                if (error) {
                    delete this._asyncFns[asyncId];
                    return resultsFn(error, null);
                }
            };

            if (this.autostartNotifications) {
                this.startNotifications(null, error => {
                    if (error) return handleError(error);

                    this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                        "method": "POST",
                        "uri": resourcePath,
                        "content-type": mimeType,
                        "accept": accepts,
                        "payload-b64": encodeBase64(payload)
                    }, handleError);
                });
            } else {
                this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                    "method": "POST",
                    "uri": resourcePath,
                    "content-type": mimeType,
                    "accept": accepts,
                    "payload-b64": encodeBase64(payload)
                }, handleError);
            }
        }, null, callback, false, timeout);
    }

    /**
     * Gets the status of a resource's subscription
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "/3200/0/5500";
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
     * @param resourcePath Resource path
     * @returns Promise containing resource subscription status
     */
    public getResourceSubscription(deviceId: string, resourcePath: string): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "/3200/0/5500";
     * connect.getResourceSubscription(deviceId, resourceURI, function(error, res_exists) {
     *     if (error) throw error;
     *     // Utilize res_exists here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    public getResourceSubscription(deviceId: string, resourcePath: string, callback: CallbackFn<boolean>): void;
    public getResourceSubscription(deviceId: string, resourcePath: string, callback?: CallbackFn<boolean>): Promise<boolean> {
        resourcePath = this.normalizePath(resourcePath);

        return asyncStyle(done => {
            this._endpoints.subscriptions.checkResourceSubscription(deviceId, resourcePath, error => {
                return done(null, !error);
            });
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
     * var resourceURI = "/3200/0/5500";
     * connect.addResourceSubscription(deviceId, resourceURI, data => {
     *     // Utilize data here - which is the updated value in resourceURI
     * })
     * .then(asyncId => {
     *     // Utilize asyncId here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param notifyFn Function to call with notification
     * @returns empty Promise
     */
    public addResourceSubscription(deviceId: string, resourcePath: string, notifyFn?: (data: any) => any): Promise<void>;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "/3200/0/5500";
     * connect.addResourceSubscription(deviceId, resourceURI, function(data) {
     *      // Utilize data here - which is the updated value in resourceURI
     * }, function(error, asyncId) {
     *     if (error) throw error;
     *     // Utilize asyncId here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed any error
     */
    public addResourceSubscription(deviceId: string, resourcePath: string, notifyFn?: (data: any) => any, callback?: CallbackFn<void>): void;
    public addResourceSubscription(deviceId: string, resourcePath: string, notifyFn?: (data: any) => any, callback?: CallbackFn<void>): Promise<void> {
        resourcePath = this.normalizePath(resourcePath);

        return apiWrapper(resultsFn => {
            this.startNotifications(null, error => {
                if (error) { return resultsFn(error, null); }
                this._endpoints.subscriptions.addResourceSubscription(deviceId, resourcePath, resultsFn);
            });
        }, (data, done) => {
            if (notifyFn) {
                // Record the function at this path for notifications
                this._notifyFns[`${deviceId}/${resourcePath}`] = notifyFn;
            }
            this.handleAsync(data, done);
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
     * var resourceURI = "/3200/0/5500";
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
     * @param resourcePath Resource path
     * @returns empty Promise
     */
    public deleteResourceSubscription(deviceId: string, resourcePath: string): Promise<void>;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "/3200/0/5500";
     * connect.deleteResourceSubscription(deviceId, resourceURI, function(error, response) {
     *     if (error) throw error;
     *     // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param callback A function that is passed any error
     */
    public deleteResourceSubscription(deviceId: string, resourcePath: string, callback: CallbackFn<void>): void;
    public deleteResourceSubscription(deviceId: string, resourcePath: string, callback?: CallbackFn<void>): Promise<void> {
        resourcePath = this.normalizePath(resourcePath);

        return apiWrapper(resultsFn => {
            this.startNotifications(null, error => {
                if (error) { return resultsFn(error, null); }
                this._endpoints.subscriptions.deleteResourceSubscription(deviceId, resourcePath, resultsFn);
            });
        }, (_data, done) => {
            // no-one is listening :'(
            delete this._notifyFns[`${deviceId}/${resourcePath}`];
            done(null, null);
        }, callback);
    }

    /**
     * List metrics
     *
     * Example: (The following will retrieve metrics regarding pending and failed device registrations in the last day)
     * ```JavaScript
     * var today = new Date();
     * var yesterday = new Date();
     * yesterday.setDate(yesterday.getDate() - 1);
     * var options = {start: yesterday, end: today, include: ["pendingBootstraps", "failedBootstraps"]};
     * connect.listMetrics(options)
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
    public listMetrics(options: MetricsStartEndListOptions | MetricsPeriodListOptions): Promise<ListResponse<Metric>>;
    /**
     * List metrics
     *
     * Example: (The following will retrieve metrics regarding pending and failed device registrations in the last day)
     * ```JavaScript
     * var today = new Date();
     * var yesterday = new Date();
     * yesterday.setDate(yesterday.getDate() - 1);
     * var options = {start: yesterday, end: today, include: ["pendingBootstraps", "failedBootstraps"]};
     * connect.listMetrics(options, function(error, metrics) {
     *     if (error) throw error;
     *     // Utilize metrics here
     * });
     * ```
     *
     * @param options metrics options
     * @param callback A function that is passed the return arguments (error, metrics)
     */
    public listMetrics(options: MetricsStartEndListOptions | MetricsPeriodListOptions, callback: CallbackFn<ListResponse<Metric>>): void;
    public listMetrics(options: MetricsStartEndListOptions | MetricsPeriodListOptions, callback?: CallbackFn<ListResponse<Metric>>): Promise<ListResponse<Metric>> {
        return apiWrapper(resultsFn => {
            function isPeriod(test: MetricsStartEndListOptions | MetricsPeriodListOptions): test is MetricsPeriodListOptions {
                return (test as MetricsPeriodListOptions).period !== undefined;
            }

            const { limit, after, order, include, interval } = options as MetricsListOptions;

            let start = null;
            let end = null;
            let period = null;

            if (isPeriod(options)) {
                period = MetricAdapter.mapTimePeriod(options.period);
            } else {
                start = options.start;
                end = options.end;
            }

            this._endpoints.statistics.v3MetricsGet(MetricAdapter.mapIncludes(include), MetricAdapter.mapTimePeriod(interval), start, end, period, limit, after, order, resultsFn);
        }, (data, done) => {
            let metrics: Array<Metric> = [];

            if (data.data && data.data.length) {
                metrics = data.data.map(metric => {
                    return MetricAdapter.map(metric);
                });
            }

            done(null, new ListResponse<Metric>(data, metrics));
        }, callback);
    }

    /**
     * Get meta data for the last Pelion Device Management API call
     * @returns Promise of meta data
     */
    public getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the lastPelion Device Management API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    public getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
    public getLastApiMetadata(callback?: CallbackFn<ApiMetadata>): Promise<ApiMetadata> {
        return asyncStyle(done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }

    // private async terminate() {
    //     // teardown operations for when node process quits
    //     await this.stopNotifications();
    //     // some other jobs may come here
    // }

    private normalizePath(path?: string): string {
        if (path && path.charAt(0) === "/") {
            return path.substr(1);
        }

        return path;
    }

    private reverseNormalizePath(path?: string): string {
        if (path && path.charAt(0) !== "/") {
            return `/${path}`;
        }

        return path;
    }

    private handleAsync<T>(data: any, done: (error: SDKError, result: T) => void): void {
        if (data && data[ConnectApi.ASYNC_KEY]) {
            this._asyncFns[data[ConnectApi.ASYNC_KEY]] = done;
            return;
        }

        // Cached value may be returned
        done(null, data);
    }

    private async forceClearWebhook(): Promise<void> {
        this._log.warn("deleting any existing webhook connection");
        await this.deleteWebhook();
    }
}
