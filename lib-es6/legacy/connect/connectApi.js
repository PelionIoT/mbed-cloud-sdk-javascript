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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EventEmitter } from "events";
import { ListResponse } from "../common/listResponse";
import { asyncStyle, apiWrapper, decodeBase64, encodeBase64 } from "../common/functions";
import { SDKError } from "../common/sdkError";
import { Endpoints } from "./endpoints";
import { WebhookAdapter } from "./models/webhookAdapter";
import { PresubscriptionAdapter } from "./models/presubscriptionAdapter";
import { ResourceAdapter } from "./models/resourceAdapter";
import { ConnectedDevice } from "./models/connectedDevice";
import { DeviceEventAdapter } from "./models/deviceEventAdapter";
import { MetricAdapter } from "./models/metricAdapter";
import { DeviceDirectoryApi } from "../deviceDirectory/deviceDirectoryApi";
import { generateId } from "../common/idGenerator";
import { executeForAll } from "../../common/pagination";
import { Subscribe } from "../../primary/subscribe/subscribe";
import { w3cwebsocket as WebsocketClient } from "websocket";
import { loggerFactory } from "../../common/logger";
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
     * @param options connection objects
     */
    constructor(options) {
        super();
        this._websockerUrl = "";
        this._asyncFns = {};
        this._notifyFns = {};
        options = options || {};
        this._instanceId = generateId();
        this._connectOptions = options;
        this._endpoints = new Endpoints(options);
        this._deviceDirectory = new DeviceDirectoryApi(options);
        this._log = loggerFactory(`connectApi${this._instanceId}`, options.logLevel).getLogger("ConnectApi");
        this._restartCount = 0;
        this._websockerUrl = options.host
            ? `${options.host.replace("https", "wss")}/v2/notification/websocket-connect`
            : "wss://api.us-east-1.mbedcloud.com/v2/notification/websocket-connect";
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
    get deliveryMethod() {
        return this._deliveryMethod;
    }
    get instanceId() {
        return this._instanceId;
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
    notify(data) {
        // Data can be null
        if (!data) {
            return;
        }
        if (data.notifications) {
            data.notifications.forEach(notification => {
                const body = notification.payload ? decodeBase64(notification.payload, notification.ct) : null;
                const path = `${notification.ep}${notification.path}`;
                const fn = this._notifyFns[path];
                if (fn) {
                    fn(body);
                }
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
                    }
                    else {
                        const body = response.payload ? decodeBase64(response.payload, response.ct) : null;
                        // if body is null, might be more useful to return the whole response
                        if (body) {
                            fn(null, body);
                        }
                        else {
                            fn(null, response);
                        }
                    }
                    delete this._asyncFns[asyncID];
                }
            });
        }
    }
    startNotifications(options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        if (options.requestCallback) {
            this._requestCallback = options.requestCallback;
        }
        if (!this._deliveryMethod) {
            this._deliveryMethod = "CLIENT_INITIATED";
        }
        return asyncStyle((done) => __awaiter(this, void 0, void 0, function* () {
            // cannot call start notifications if using webhooks
            if (this._deliveryMethod === "SERVER_INITIATED") {
                return done(new SDKError("cannot call start notifications if delivery method is server initiated"), null);
            }
            this._log.debug("starting notifications...");
            // websocket has been initalised and opened
            if (this._webSocketClient && this._webSocketClient.OPEN) {
                this._log.debug("notifications already started");
                return done(null, null);
            }
            // websocket hasn't been started so lets set it up
            if (this.forceClear) {
                yield this.forceClearWebhook();
            }
            else {
                if (yield this.getWebhook()) {
                    return done(new SDKError("cannot call start notifications as a webhook already exists"), null);
                }
            }
            // start websocket
            try {
                yield this.initiateWebSocket();
            }
            catch (e) {
                return done(e, null);
            }
            return done(null, null);
        }), callback);
    }
    stopNotifications(callback) {
        return asyncStyle((done) => __awaiter(this, void 0, void 0, function* () {
            // cannot call stop notifications if using webhooks
            if (this._deliveryMethod === "SERVER_INITIATED") {
                this._log.warn("should not call stop notifications if delivery method is server initiated");
                return done(null, null);
            }
            this._log.debug("stopping notifications...");
            // websocket is null or has been closed
            if (!this._webSocketClient || (this._webSocketClient && this._webSocketClient._connection.state !== "open")) {
                this._log.debug("nothing to stop");
                return done(null, null);
            }
            yield this.stopWebSocket();
            return done(null, null);
        }), callback);
    }
    getWebhook(callback) {
        return asyncStyle(done => {
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
        }, callback);
    }
    updateWebhook(url, headers, forceClear, callback) {
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
                    if (error) {
                        return done(error);
                    }
                    done(null, null);
                });
            }
            if (this.forceClear || forceClear) {
                this.stopNotifications(update.bind(this));
            }
            else {
                update.call(this);
            }
        }, callback);
    }
    deleteWebhook(callback) {
        return asyncStyle(done => {
            this._endpoints.notifications.deregisterWebhook(() => {
                done(null, null);
            });
        }, callback);
    }
    listPresubscriptions(callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.subscriptions.getPreSubscriptions(resultsFn);
        }, (data, done) => {
            const presubs = data.map(PresubscriptionAdapter.map);
            done(null, presubs);
        }, callback);
    }
    updatePresubscriptions(subscriptions, callback) {
        return apiWrapper(resultsFn => {
            const presubs = subscriptions.map(PresubscriptionAdapter.reverseMap);
            this._endpoints.subscriptions.updatePreSubscriptions(presubs, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    deletePresubscriptions(callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.subscriptions.deletePreSubscriptions(resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    deleteSubscriptions(callback) {
        return asyncStyle(done => {
            executeForAll(this.listConnectedDevices.bind(this), this.deleteDeviceSubscriptions.bind(this))
                .then(() => done(null), done);
        }, callback);
    }
    listConnectedDevices(options, callback) {
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
            done(null, new ListResponse(data, devices));
        }, callback);
    }
    listDeviceSubscriptions(deviceId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.subscriptions.getEndpointSubscriptions(deviceId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    deleteDeviceSubscriptions(deviceId, callback) {
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
    listResources(deviceId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.endpoints.getEndpointResources(deviceId, resultsFn);
        }, (data, done) => {
            const resources = data.map(resource => {
                return ResourceAdapter.map(resource, deviceId, this);
            });
            done(null, resources);
        }, callback);
    }
    getResource(deviceId, resourcePath, callback) {
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
    getResourceValue(deviceId, resourcePath, timeout, mimeType, callback) {
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
        return apiWrapper((resultsFn) => __awaiter(this, void 0, void 0, function* () {
            if ((yield this.getWebhook()) && !this.forceClear) {
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
                    if (error)
                        return handleError(error);
                    this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                        method: "GET",
                        uri: resourcePath,
                        accept: mimeType,
                    }, handleError);
                });
            }
            else {
                this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                    method: "GET",
                    uri: resourcePath,
                    accept: mimeType,
                }, handleError);
            }
        }), null, callback, false, timeout);
    }
    setResourceValue(deviceId, resourcePath, value, timeout, mimeType, callback) {
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
        return apiWrapper((resultsFn) => __awaiter(this, void 0, void 0, function* () {
            if ((yield this.getWebhook()) && !this.forceClear) {
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
                    if (error)
                        return handleError(error);
                    this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                        "method": "PUT",
                        "uri": resourcePath,
                        "content-type": mimeType,
                        "payload-b64": payload,
                    }, handleError);
                });
            }
            else {
                this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                    "method": "PUT",
                    "uri": resourcePath,
                    "content-type": mimeType,
                    "payload-b64": payload,
                }, handleError);
            }
        }), null, callback, false, timeout);
    }
    executeResource(deviceId, resourcePath, payload, timeout, mimeType, accepts, callback) {
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
        return apiWrapper((resultsFn) => __awaiter(this, void 0, void 0, function* () {
            if ((yield this.getWebhook()) && !this.forceClear) {
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
                    if (error)
                        return handleError(error);
                    this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                        "method": "POST",
                        "uri": resourcePath,
                        "content-type": mimeType,
                        "accept": accepts,
                        "payload-b64": encodeBase64(payload)
                    }, handleError);
                });
            }
            else {
                this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                    "method": "POST",
                    "uri": resourcePath,
                    "content-type": mimeType,
                    "accept": accepts,
                    "payload-b64": encodeBase64(payload)
                }, handleError);
            }
        }), null, callback, false, timeout);
    }
    getResourceSubscription(deviceId, resourcePath, callback) {
        resourcePath = this.normalizePath(resourcePath);
        return asyncStyle(done => {
            this._endpoints.subscriptions.checkResourceSubscription(deviceId, resourcePath, error => {
                return done(null, !error);
            });
        }, callback);
    }
    addResourceSubscription(deviceId, resourcePath, notifyFn, callback) {
        resourcePath = this.normalizePath(resourcePath);
        return apiWrapper(resultsFn => {
            this.startNotifications(null, error => {
                if (error) {
                    return resultsFn(error, null);
                }
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
    deleteResourceSubscription(deviceId, resourcePath, callback) {
        resourcePath = this.normalizePath(resourcePath);
        return apiWrapper(resultsFn => {
            this.startNotifications(null, error => {
                if (error) {
                    return resultsFn(error, null);
                }
                this._endpoints.subscriptions.deleteResourceSubscription(deviceId, resourcePath, resultsFn);
            });
        }, (_data, done) => {
            // no-one is listening :'(
            delete this._notifyFns[`${deviceId}/${resourcePath}`];
            done(null, null);
        }, callback);
    }
    listMetrics(options, callback) {
        return apiWrapper(resultsFn => {
            function isPeriod(test) {
                return test.period !== undefined;
            }
            const { limit, after, order, include, interval } = options;
            let start = null;
            let end = null;
            let period = null;
            if (isPeriod(options)) {
                period = MetricAdapter.mapTimePeriod(options.period);
            }
            else {
                start = options.start;
                end = options.end;
            }
            this._endpoints.statistics.v3MetricsGet(MetricAdapter.mapIncludes(include), MetricAdapter.mapTimePeriod(interval), start, end, period, limit, after, order, resultsFn);
        }, (data, done) => {
            let metrics = [];
            if (data.data && data.data.length) {
                metrics = data.data.map(metric => {
                    return MetricAdapter.map(metric);
                });
            }
            done(null, new ListResponse(data, metrics));
        }, callback);
    }
    getWebsocket(callback) {
        return asyncStyle(done => {
            this._endpoints.notifications.getWebsocket((error, data) => {
                if (error) {
                    if (error.code === 404) {
                        // No websocket
                        return done(null, null);
                    }
                    return done(error);
                }
                // TODO map properly here
                done(null, data);
            });
        }, callback);
    }
    registerWebsocket(callback) {
        return asyncStyle(done => {
            this._endpoints.notifications.registerWebsocket((error, data) => {
                if (error) {
                    return done(error);
                }
                // TODO map properly here
                done(null, data);
            });
        }, callback);
    }
    deleteWebsocket(callback) {
        return asyncStyle(done => {
            this._endpoints.notifications.deleteWebsocket((error, _data) => {
                if (error) {
                    return done(error);
                }
                done(null, null);
            });
        }, callback);
    }
    getLastApiMetadata(callback) {
        return asyncStyle(done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
    // private async terminate() {
    //     // teardown operations for when node process quits
    //     await this.stopNotifications();
    //     // some other jobs may come here
    // }
    normalizePath(path) {
        if (path && path.charAt(0) === "/") {
            return path.substr(1);
        }
        return path;
    }
    reverseNormalizePath(path) {
        if (path && path.charAt(0) !== "/") {
            return `/${path}`;
        }
        return path;
    }
    handleAsync(data, done) {
        if (data && data[ConnectApi.ASYNC_KEY]) {
            this._asyncFns[data[ConnectApi.ASYNC_KEY]] = done;
            return;
        }
        // Cached value may be returned
        done(null, data);
    }
    initiateWebSocket() {
        return new Promise((resolve, reject) => {
            this._endpoints.notifications.getWebsocket((error, _data) => __awaiter(this, void 0, void 0, function* () {
                this._log.debug("check if channel has been registered");
                if (error) {
                    if (error.code === 404) {
                        this._log.debug("no channel found so need to register a websocket");
                        try {
                            yield this.registerWebSocket();
                        }
                        catch (e) {
                            return reject(e);
                        }
                    }
                    else {
                        return reject(error);
                    }
                }
                this._log.debug("we have a channel so start websocket");
                try {
                    this.startWebSocket();
                    return resolve();
                }
                catch (e) {
                    return reject(e);
                }
            }));
        });
    }
    registerWebSocket() {
        return new Promise((resolve, reject) => {
            this._endpoints.notifications.registerWebsocket((error, _data) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    if (error.code === 400) {
                        this._log.debug("another channel already exists so force clear and re register websocket");
                        yield this.forceClearWebhook();
                        return resolve(yield this.registerWebSocket());
                    }
                    else {
                        return reject(error);
                    }
                }
                this._log.debug("registered websocket successfully");
                return resolve();
            }));
        });
    }
    forceClearWebhook() {
        return __awaiter(this, void 0, void 0, function* () {
            this._log.warn("deleting any existing webhook connection");
            yield this.deleteWebhook();
        });
    }
    startWebSocket() {
        // start the websocket
        this._webSocketClient = new WebsocketClient(this._websockerUrl, [
            `pelion_${this._connectOptions.apiKey}`,
            `wss`
        ]);
        this._webSocketClient.onerror = (error) => __awaiter(this, void 0, void 0, function* () {
            this._log.error("error from websocket", error);
            yield this.stopNotifications();
        });
        this._webSocketClient.onopen = () => {
            this._log.info("notifications started...");
        };
        this._webSocketClient.onclose = () => __awaiter(this, void 0, void 0, function* () {
            const connectionInfo = this._webSocketClient._connection;
            const closeStatus = connectionInfo.closeReasonCode;
            const closeDescription = connectionInfo.closeDescription;
            this._log.debug(`received close message - ${closeStatus} - ${closeDescription}`);
            if (closeStatus === 1000) {
                if (this._isClosing) {
                    this._log.debug("we are closing so this is expected - do nothing");
                }
                else {
                    if (this._restartCount > ConnectApi.MAXIMUM_NUMBER_OF_RETRIES) {
                        yield this.stopNotifications();
                        throw new SDKError("exceeded the limit of restart attempts");
                    }
                    else {
                        this.restartWebsocket();
                    }
                }
            }
            if (closeStatus === 1001 || closeStatus === 1011) {
                if (this._restartCount > ConnectApi.MAXIMUM_NUMBER_OF_RETRIES) {
                    yield this.stopNotifications();
                    throw new SDKError("exceeded the limit of restart attempts");
                }
                else {
                    this.restartWebsocket(true);
                }
            }
            else {
                // an error we cannot recover from so just stop!
                yield this.stopNotifications();
            }
        });
        this._webSocketClient.onmessage = message => {
            // reset restart count, we're recieving messages now so things should be ok
            this._restartCount = 0;
            const data = JSON.parse(message.data);
            this.notify(data);
            if (this._requestCallback && data["async-responses"]) {
                this._requestCallback(null, data["async-responses"]);
            }
        };
    }
    restartWebsocket(register) {
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            this._log.warn("attempting to restart " + register ? "and re-register " : "" + "websocket");
            yield this.stopWebSocket();
            if (register) {
                yield this.registerWebSocket();
            }
            yield this.startWebSocket();
            this._restartCount++;
        }), ConnectApi.DELAY_BETWEEN_RETRIES * this._restartCount);
    }
    stopWebSocket() {
        this._isClosing = true;
        this._log.debug("closing the websocket with 1000 - normal closure");
        this._webSocketClient.close(1000, "");
        // delete the channel
        this._log.debug("deleting the websocket channel");
        return new Promise((resolve, reject) => {
            this._endpoints.notifications.deleteWebsocket((error, _data) => {
                if (error && error.code !== 404) {
                    return reject(error);
                }
                this._isClosing = false;
                return resolve();
            });
        });
    }
}
/**
 * Resource notification event
 * @event
 */
ConnectApi.EVENT_NOTIFICATION = "notification";
/**
 * List of new devices that have registered (with resources)
 * @event
 */
ConnectApi.EVENT_REGISTRATION = "registration";
/**
 * List of devices that have updated registration
 * @event
 */
ConnectApi.EVENT_REREGISTRATION = "reregistration";
/**
 * List of devices that were removed in a controlled manner
 * @event
 */
ConnectApi.EVENT_DEREGISTRATION = "deregistration";
/**
 * List of devices that were removed because the registration has expired
 * @event
 */
ConnectApi.EVENT_EXPIRED = "expired";
ConnectApi.ASYNC_KEY = "async-response-id";
ConnectApi.DELAY_BETWEEN_RETRIES = 1000;
ConnectApi.MAXIMUM_NUMBER_OF_RETRIES = 3;
//# sourceMappingURL=connectApi.js.map