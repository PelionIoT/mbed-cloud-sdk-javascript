"use strict";
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var listResponse_1 = require("../common/listResponse");
var functions_1 = require("../common/functions");
var sdkError_1 = require("../common/sdkError");
var endpoints_1 = require("./endpoints");
var webhookAdapter_1 = require("./models/webhookAdapter");
var presubscriptionAdapter_1 = require("./models/presubscriptionAdapter");
var resourceAdapter_1 = require("./models/resourceAdapter");
var connectedDevice_1 = require("./models/connectedDevice");
var deviceEventAdapter_1 = require("./models/deviceEventAdapter");
var metricAdapter_1 = require("./models/metricAdapter");
var deviceDirectoryApi_1 = require("../deviceDirectory/deviceDirectoryApi");
var idGenerator_1 = require("../common/idGenerator");
var pagination_1 = require("../../common/pagination");
var subscribe_1 = require("../../primary/subscribe/subscribe");
var websocket_1 = require("websocket");
var logger_1 = require("../../common/logger");
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
var ConnectApi = /** @class */ (function (_super) {
    __extends(ConnectApi, _super);
    /**
     * @param options connection objects
     */
    function ConnectApi(options) {
        var _this = _super.call(this) || this;
        _this._websockerUrl = "";
        _this._asyncFns = {};
        _this._notifyFns = {};
        options = options || {};
        _this._instanceId = idGenerator_1.generateId();
        _this._connectOptions = options;
        _this._endpoints = new endpoints_1.Endpoints(options);
        _this._deviceDirectory = new deviceDirectoryApi_1.DeviceDirectoryApi(options);
        _this._log = logger_1.loggerFactory("connectApi" + _this._instanceId, options.logLevel).getLogger("ConnectApi");
        _this._restartCount = 0;
        _this._websockerUrl = options.host
            ? options.host.replace("https", "wss") + "/v2/notification/websocket-connect"
            : "wss://api.us-east-1.mbedcloud.com/v2/notification/websocket-connect";
        // make sure handle notifications keeps working
        if (options.handleNotifications) {
            options.autostartNotifications = false;
            _this._deliveryMethod = "SERVER_INITIATED";
        }
        // default force clear and autostart to false;
        _this.forceClear = options.forceClear === true;
        _this.autostartNotifications = options.autostartNotifications === true;
        if (_this.autostartNotifications === true) {
            _this._deliveryMethod = "CLIENT_INITIATED";
        }
        _this.subscribe = new subscribe_1.Subscribe(_this);
        return _this;
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
    Object.defineProperty(ConnectApi.prototype, "deliveryMethod", {
        get: function () {
            return this._deliveryMethod;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectApi.prototype, "instanceId", {
        get: function () {
            return this._instanceId;
        },
        enumerable: true,
        configurable: true
    });
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
    ConnectApi.prototype.notify = function (data) {
        var _this = this;
        // Data can be null
        if (!data) {
            return;
        }
        if (data.notifications) {
            data.notifications.forEach(function (notification) {
                var body = notification.payload ? functions_1.decodeBase64(notification.payload, notification.ct) : null;
                var path = "" + notification.ep + notification.path;
                var fn = _this._notifyFns[path];
                if (fn) {
                    fn(body);
                }
                _this.emit(ConnectApi.EVENT_NOTIFICATION, {
                    id: notification.ep,
                    path: notification.path,
                    payload: body,
                });
                _this.subscribe.notifyResourceValues({
                    deviceId: notification.ep,
                    path: notification.path,
                    payload: body,
                    maxAge: notification["max-age"],
                    contentType: notification.ct,
                });
            });
        }
        if (data.registrations) {
            data.registrations.forEach(function (device) {
                var map = deviceEventAdapter_1.DeviceEventAdapter.map(device, _this, "registration");
                _this.subscribe.notifyDeviceEvents(map);
                _this.emit(ConnectApi.EVENT_REGISTRATION, map);
            });
        }
        if (data["reg-updates"]) {
            data["reg-updates"].forEach(function (device) {
                var map = deviceEventAdapter_1.DeviceEventAdapter.map(device, _this, "reregistration");
                _this.subscribe.notifyDeviceEvents(map);
                _this.emit(ConnectApi.EVENT_REREGISTRATION, map);
            });
        }
        if (data["de-registrations"]) {
            data["de-registrations"].forEach(function (deviceId) {
                var map = deviceEventAdapter_1.DeviceEventAdapter.mapId(deviceId, "deregistration");
                _this.subscribe.notifyDeviceEvents(map);
                _this.emit(ConnectApi.EVENT_DEREGISTRATION, deviceId);
            });
        }
        if (data["registrations-expired"]) {
            data["registrations-expired"].forEach(function (deviceId) {
                var map = deviceEventAdapter_1.DeviceEventAdapter.mapId(deviceId, "expired");
                _this.subscribe.notifyDeviceEvents(map);
                _this.emit(ConnectApi.EVENT_EXPIRED, deviceId);
            });
        }
        if (data["async-responses"]) {
            data["async-responses"].forEach(function (response) {
                var asyncID = response.id;
                var fn = _this._asyncFns[asyncID];
                if (fn) {
                    if (response.status >= 400) {
                        var error = new sdkError_1.SDKError(response.error || response.status, null, null, response.status);
                        fn(error, null);
                    }
                    else {
                        var body = response.payload ? functions_1.decodeBase64(response.payload, response.ct) : null;
                        // if body is null, might be more useful to return the whole response
                        if (body) {
                            fn(null, body);
                        }
                        else {
                            fn(null, response);
                        }
                    }
                    delete _this._asyncFns[asyncID];
                }
            });
        }
    };
    ConnectApi.prototype.startNotifications = function (options, callback) {
        var _this = this;
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
        return functions_1.asyncStyle(function (done) { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // cannot call start notifications if using webhooks
                        if (this._deliveryMethod === "SERVER_INITIATED") {
                            return [2 /*return*/, done(new sdkError_1.SDKError("cannot call start notifications if delivery method is server initiated"), null)];
                        }
                        this._log.debug("starting notifications...");
                        // websocket has been initalised and opened
                        if (this._webSocketClient && this._webSocketClient.OPEN) {
                            this._log.debug("notifications already started");
                            return [2 /*return*/, done(null, null)];
                        }
                        if (!this.forceClear) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.forceClearWebhook()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getWebhook()];
                    case 3:
                        if (_a.sent()) {
                            return [2 /*return*/, done(new sdkError_1.SDKError("cannot call start notifications as a webhook already exists"), null)];
                        }
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.initiateWebSocket()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        return [2 /*return*/, done(e_1, null)];
                    case 7: return [2 /*return*/, done(null, null)];
                }
            });
        }); }, callback);
    };
    ConnectApi.prototype.stopNotifications = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // cannot call stop notifications if using webhooks
                        if (this._deliveryMethod === "SERVER_INITIATED") {
                            this._log.warn("should not call stop notifications if delivery method is server initiated");
                            return [2 /*return*/, done(null, null)];
                        }
                        this._log.debug("stopping notifications...");
                        // websocket is null or has been closed
                        if (!this._webSocketClient || (this._webSocketClient && this._webSocketClient._connection.state !== "open")) {
                            this._log.debug("nothing to stop");
                            return [2 /*return*/, done(null, null)];
                        }
                        return [4 /*yield*/, this.stopWebSocket()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, done(null, null)];
                }
            });
        }); }, callback);
    };
    ConnectApi.prototype.getWebhook = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.notifications.getWebhook(function (error, data) {
                if (error) {
                    if (error.code === 404) {
                        // No webhook
                        return done(null, null);
                    }
                    return done(error);
                }
                var webhook = webhookAdapter_1.WebhookAdapter.map(data);
                done(null, webhook);
            });
        }, callback);
    };
    ConnectApi.prototype.updateWebhook = function (url, headers, forceClear, callback) {
        var _this = this;
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
        return functions_1.asyncStyle(function (done) {
            if (_this._deliveryMethod === "CLIENT_INITIATED") {
                return done(new sdkError_1.SDKError("cannot update webhook if delivery method is client initiated"), null);
            }
            function update() {
                this._endpoints.notifications.registerWebhook({
                    url: url,
                    headers: headers,
                }, function (error) {
                    if (error) {
                        return done(error);
                    }
                    done(null, null);
                });
            }
            if (_this.forceClear || forceClear) {
                _this.stopNotifications(update.bind(_this));
            }
            else {
                update.call(_this);
            }
        }, callback);
    };
    ConnectApi.prototype.deleteWebhook = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.notifications.deregisterWebhook(function () {
                done(null, null);
            });
        }, callback);
    };
    ConnectApi.prototype.listPresubscriptions = function (callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.subscriptions.getPreSubscriptions(resultsFn);
        }, function (data, done) {
            var presubs = data.map(presubscriptionAdapter_1.PresubscriptionAdapter.map);
            done(null, presubs);
        }, callback);
    };
    ConnectApi.prototype.updatePresubscriptions = function (subscriptions, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            var presubs = subscriptions.map(presubscriptionAdapter_1.PresubscriptionAdapter.reverseMap);
            _this._endpoints.subscriptions.updatePreSubscriptions(presubs, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    ConnectApi.prototype.deletePresubscriptions = function (callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.subscriptions.deletePreSubscriptions(resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    ConnectApi.prototype.deleteSubscriptions = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            pagination_1.executeForAll(_this.listConnectedDevices.bind(_this), _this.deleteDeviceSubscriptions.bind(_this))
                .then(function () { return done(null); }, done);
        }, callback);
    };
    ConnectApi.prototype.listConnectedDevices = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        // Grab all connected devices
        options.filter = options.filter || {};
        options.filter.state = "registered";
        return functions_1.apiWrapper(function (resultsFn) {
            _this._deviceDirectory.listDevices(options, resultsFn);
        }, function (data, done) {
            var devices = data.data.map(function (device) {
                return new connectedDevice_1.ConnectedDevice(device, _this);
            });
            done(null, new listResponse_1.ListResponse(data, devices));
        }, callback);
    };
    ConnectApi.prototype.listDeviceSubscriptions = function (deviceId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.subscriptions.getEndpointSubscriptions(deviceId, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    ConnectApi.prototype.deleteDeviceSubscriptions = function (deviceId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.subscriptions.deleteEndpointSubscriptions(deviceId, resultsFn);
        }, function (data, done) {
            Object.keys(_this._notifyFns).forEach(function (key) {
                if (key.indexOf(deviceId + "/") === 0) {
                    delete _this._notifyFns[key];
                }
            });
            done(null, data);
        }, callback);
    };
    ConnectApi.prototype.listResources = function (deviceId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.endpoints.getEndpointResources(deviceId, resultsFn);
        }, function (data, done) {
            var resources = data.map(function (resource) {
                return resourceAdapter_1.ResourceAdapter.map(resource, deviceId, _this);
            });
            done(null, resources);
        }, callback);
    };
    ConnectApi.prototype.getResource = function (deviceId, resourcePath, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.endpoints.getEndpointResources(deviceId, resultsFn);
        }, function (data, done) {
            var found = data.find(function (resource) {
                return _this.normalizePath(resource.uri) === resourcePath;
            });
            if (!found) {
                return done(new sdkError_1.SDKError("Resource not found"), null);
            }
            done(null, resourceAdapter_1.ResourceAdapter.map(found, deviceId, _this));
        }, callback);
    };
    ConnectApi.prototype.getResourceValue = function (deviceId, resourcePath, timeout, mimeType, callback) {
        var _this = this;
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        resourcePath = this.reverseNormalizePath(resourcePath);
        var asyncId = idGenerator_1.generateId();
        return functions_1.apiWrapper(function (resultsFn) { return __awaiter(_this, void 0, void 0, function () {
            var handleError;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWebhook()];
                    case 1:
                        if ((_a.sent()) && !this.forceClear) {
                            return [2 /*return*/, resultsFn(new sdkError_1.SDKError("webhook in use"), null)];
                        }
                        this._asyncFns[asyncId] = resultsFn;
                        if (callback) {
                            setTimeout(function () {
                                if (_this._asyncFns[asyncId]) {
                                    resultsFn(new sdkError_1.SDKError("Timeout getting async value. Timeout " + timeout + "ms"), null);
                                    delete _this._asyncFns[asyncId];
                                }
                            }, timeout);
                        }
                        handleError = function (error) {
                            if (error) {
                                delete _this._asyncFns[asyncId];
                                resultsFn(error, null);
                            }
                        };
                        if (this.autostartNotifications) {
                            this.startNotifications(null, function (error) {
                                if (error)
                                    return handleError(error);
                                _this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
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
                        return [2 /*return*/];
                }
            });
        }); }, null, callback, false, timeout);
    };
    ConnectApi.prototype.setResourceValue = function (deviceId, resourcePath, value, timeout, mimeType, callback) {
        var _this = this;
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        resourcePath = this.reverseNormalizePath(resourcePath);
        var asyncId = idGenerator_1.generateId();
        var payload = functions_1.encodeBase64(value);
        return functions_1.apiWrapper(function (resultsFn) { return __awaiter(_this, void 0, void 0, function () {
            var handleError;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWebhook()];
                    case 1:
                        if ((_a.sent()) && !this.forceClear) {
                            return [2 /*return*/, resultsFn(new sdkError_1.SDKError("webhook in use"), null)];
                        }
                        this._asyncFns[asyncId] = resultsFn;
                        if (callback) {
                            setTimeout(function () {
                                if (_this._asyncFns[asyncId]) {
                                    resultsFn(new sdkError_1.SDKError("Timeout getting async value. Timeout " + timeout + "ms"), null);
                                    delete _this._asyncFns[asyncId];
                                }
                            }, timeout);
                        }
                        handleError = function (error) {
                            if (error) {
                                delete _this._asyncFns[asyncId];
                                return resultsFn(error, null);
                            }
                        };
                        if (this.autostartNotifications) {
                            this.startNotifications(null, function (error) {
                                if (error)
                                    return handleError(error);
                                _this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
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
                        return [2 /*return*/];
                }
            });
        }); }, null, callback, false, timeout);
    };
    ConnectApi.prototype.executeResource = function (deviceId, resourcePath, payload, timeout, mimeType, accepts, callback) {
        var _this = this;
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
        var asyncId = idGenerator_1.generateId();
        return functions_1.apiWrapper(function (resultsFn) { return __awaiter(_this, void 0, void 0, function () {
            var handleError;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWebhook()];
                    case 1:
                        if ((_a.sent()) && !this.forceClear) {
                            return [2 /*return*/, resultsFn(new sdkError_1.SDKError("webhook in use"), null)];
                        }
                        this._asyncFns[asyncId] = resultsFn;
                        if (callback) {
                            setTimeout(function () {
                                if (_this._asyncFns[asyncId]) {
                                    resultsFn(new sdkError_1.SDKError("Timeout getting async value. Timeout " + timeout + "ms"), null);
                                    delete _this._asyncFns[asyncId];
                                }
                            }, timeout);
                        }
                        handleError = function (error) {
                            if (error) {
                                delete _this._asyncFns[asyncId];
                                return resultsFn(error, null);
                            }
                        };
                        if (this.autostartNotifications) {
                            this.startNotifications(null, function (error) {
                                if (error)
                                    return handleError(error);
                                _this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                                    "method": "POST",
                                    "uri": resourcePath,
                                    "content-type": mimeType,
                                    "accept": accepts,
                                    "payload-b64": functions_1.encodeBase64(payload)
                                }, handleError);
                            });
                        }
                        else {
                            this._endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                                "method": "POST",
                                "uri": resourcePath,
                                "content-type": mimeType,
                                "accept": accepts,
                                "payload-b64": functions_1.encodeBase64(payload)
                            }, handleError);
                        }
                        return [2 /*return*/];
                }
            });
        }); }, null, callback, false, timeout);
    };
    ConnectApi.prototype.getResourceSubscription = function (deviceId, resourcePath, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.subscriptions.checkResourceSubscription(deviceId, resourcePath, function (error) {
                return done(null, !error);
            });
        }, callback);
    };
    ConnectApi.prototype.addResourceSubscription = function (deviceId, resourcePath, notifyFn, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        return functions_1.apiWrapper(function (resultsFn) {
            _this.startNotifications(null, function (error) {
                if (error) {
                    return resultsFn(error, null);
                }
                _this._endpoints.subscriptions.addResourceSubscription(deviceId, resourcePath, resultsFn);
            });
        }, function (data, done) {
            if (notifyFn) {
                // Record the function at this path for notifications
                _this._notifyFns[deviceId + "/" + resourcePath] = notifyFn;
            }
            _this.handleAsync(data, done);
        }, callback);
    };
    ConnectApi.prototype.deleteResourceSubscription = function (deviceId, resourcePath, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        return functions_1.apiWrapper(function (resultsFn) {
            _this.startNotifications(null, function (error) {
                if (error) {
                    return resultsFn(error, null);
                }
                _this._endpoints.subscriptions.deleteResourceSubscription(deviceId, resourcePath, resultsFn);
            });
        }, function (_data, done) {
            // no-one is listening :'(
            delete _this._notifyFns[deviceId + "/" + resourcePath];
            done(null, null);
        }, callback);
    };
    ConnectApi.prototype.listMetrics = function (options, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            function isPeriod(test) {
                return test.period !== undefined;
            }
            var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include, interval = _a.interval;
            var start = null;
            var end = null;
            var period = null;
            if (isPeriod(options)) {
                period = metricAdapter_1.MetricAdapter.mapTimePeriod(options.period);
            }
            else {
                start = options.start;
                end = options.end;
            }
            _this._endpoints.statistics.v3MetricsGet(metricAdapter_1.MetricAdapter.mapIncludes(include), metricAdapter_1.MetricAdapter.mapTimePeriod(interval), start, end, period, limit, after, order, resultsFn);
        }, function (data, done) {
            var metrics = [];
            if (data.data && data.data.length) {
                metrics = data.data.map(function (metric) {
                    return metricAdapter_1.MetricAdapter.map(metric);
                });
            }
            done(null, new listResponse_1.ListResponse(data, metrics));
        }, callback);
    };
    ConnectApi.prototype.getWebsocket = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.notifications.getWebsocket(function (error, data) {
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
    };
    ConnectApi.prototype.registerWebsocket = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.notifications.registerWebsocket(function (error, data) {
                if (error) {
                    return done(error);
                }
                // TODO map properly here
                done(null, data);
            });
        }, callback);
    };
    ConnectApi.prototype.deleteWebsocket = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.notifications.deleteWebsocket(function (error, _data) {
                if (error) {
                    return done(error);
                }
                done(null, null);
            });
        }, callback);
    };
    ConnectApi.prototype.getLastApiMetadata = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            done(null, _this._endpoints.getLastMeta());
        }, callback);
    };
    // private async terminate() {
    //     // teardown operations for when node process quits
    //     await this.stopNotifications();
    //     // some other jobs may come here
    // }
    ConnectApi.prototype.normalizePath = function (path) {
        if (path && path.charAt(0) === "/") {
            return path.substr(1);
        }
        return path;
    };
    ConnectApi.prototype.reverseNormalizePath = function (path) {
        if (path && path.charAt(0) !== "/") {
            return "/" + path;
        }
        return path;
    };
    ConnectApi.prototype.handleAsync = function (data, done) {
        if (data && data[ConnectApi.ASYNC_KEY]) {
            this._asyncFns[data[ConnectApi.ASYNC_KEY]] = done;
            return;
        }
        // Cached value may be returned
        done(null, data);
    };
    ConnectApi.prototype.initiateWebSocket = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._endpoints.notifications.getWebsocket(function (error, _data) { return __awaiter(_this, void 0, void 0, function () {
                var e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._log.debug("check if channel has been registered");
                            if (!error) return [3 /*break*/, 6];
                            if (!(error.code === 404)) return [3 /*break*/, 5];
                            this._log.debug("no channel found so need to register a websocket");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.registerWebSocket()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_2 = _a.sent();
                            return [2 /*return*/, reject(e_2)];
                        case 4: return [3 /*break*/, 6];
                        case 5: return [2 /*return*/, reject(error)];
                        case 6:
                            this._log.debug("we have a channel so start websocket");
                            try {
                                this.startWebSocket();
                                return [2 /*return*/, resolve()];
                            }
                            catch (e) {
                                return [2 /*return*/, reject(e)];
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    ConnectApi.prototype.registerWebSocket = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._endpoints.notifications.registerWebsocket(function (error, _data) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!error) return [3 /*break*/, 4];
                            if (!(error.code === 400)) return [3 /*break*/, 3];
                            this._log.debug("another channel already exists so force clear and re register websocket");
                            return [4 /*yield*/, this.forceClearWebhook()];
                        case 1:
                            _b.sent();
                            _a = resolve;
                            return [4 /*yield*/, this.registerWebSocket()];
                        case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                        case 3: return [2 /*return*/, reject(error)];
                        case 4:
                            this._log.debug("registered websocket successfully");
                            return [2 /*return*/, resolve()];
                    }
                });
            }); });
        });
    };
    ConnectApi.prototype.forceClearWebhook = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._log.warn("deleting any existing webhook connection");
                        return [4 /*yield*/, this.deleteWebhook()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConnectApi.prototype.startWebSocket = function () {
        var _this = this;
        // start the websocket
        this._webSocketClient = new websocket_1.w3cwebsocket(this._websockerUrl, [
            "pelion_" + this._connectOptions.apiKey,
            "wss"
        ]);
        this._webSocketClient.onerror = function (error) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._log.error("error from websocket", error);
                        return [4 /*yield*/, this.stopNotifications()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this._webSocketClient.onopen = function () {
            _this._log.info("notifications started...");
        };
        this._webSocketClient.onclose = function () { return __awaiter(_this, void 0, void 0, function () {
            var connectionInfo, closeStatus, closeDescription;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connectionInfo = this._webSocketClient._connection;
                        closeStatus = connectionInfo.closeReasonCode;
                        closeDescription = connectionInfo.closeDescription;
                        this._log.debug("received close message - " + closeStatus + " - " + closeDescription);
                        if (!(closeStatus === 1000)) return [3 /*break*/, 4];
                        if (!this._isClosing) return [3 /*break*/, 1];
                        this._log.debug("we are closing so this is expected - do nothing");
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(this._restartCount > ConnectApi.MAXIMUM_NUMBER_OF_RETRIES)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.stopNotifications()];
                    case 2:
                        _a.sent();
                        throw new sdkError_1.SDKError("exceeded the limit of restart attempts");
                    case 3:
                        this.restartWebsocket();
                        _a.label = 4;
                    case 4:
                        if (!(closeStatus === 1001 || closeStatus === 1011)) return [3 /*break*/, 8];
                        if (!(this._restartCount > ConnectApi.MAXIMUM_NUMBER_OF_RETRIES)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.stopNotifications()];
                    case 5:
                        _a.sent();
                        throw new sdkError_1.SDKError("exceeded the limit of restart attempts");
                    case 6:
                        this.restartWebsocket(true);
                        _a.label = 7;
                    case 7: return [3 /*break*/, 10];
                    case 8: 
                    // an error we cannot recover from so just stop!
                    return [4 /*yield*/, this.stopNotifications()];
                    case 9:
                        // an error we cannot recover from so just stop!
                        _a.sent();
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this._webSocketClient.onmessage = function (message) {
            // reset restart count, we're recieving messages now so things should be ok
            _this._restartCount = 0;
            var data = JSON.parse(message.data);
            _this.notify(data);
            if (_this._requestCallback && data["async-responses"]) {
                _this._requestCallback(null, data["async-responses"]);
            }
        };
    };
    ConnectApi.prototype.restartWebsocket = function (register) {
        var _this = this;
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._log.warn("attempting to restart " + register ? "and re-register " : "" + "websocket");
                        return [4 /*yield*/, this.stopWebSocket()];
                    case 1:
                        _a.sent();
                        if (!register) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.registerWebSocket()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.startWebSocket()];
                    case 4:
                        _a.sent();
                        this._restartCount++;
                        return [2 /*return*/];
                }
            });
        }); }, ConnectApi.DELAY_BETWEEN_RETRIES * this._restartCount);
    };
    ConnectApi.prototype.stopWebSocket = function () {
        var _this = this;
        this._isClosing = true;
        this._log.debug("closing the websocket with 1000 - normal closure");
        this._webSocketClient.close(1000, "");
        // delete the channel
        this._log.debug("deleting the websocket channel");
        return new Promise(function (resolve, reject) {
            _this._endpoints.notifications.deleteWebsocket(function (error, _data) {
                if (error && error.code !== 404) {
                    return reject(error);
                }
                _this._isClosing = false;
                return resolve();
            });
        });
    };
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
    return ConnectApi;
}(events_1.EventEmitter));
exports.ConnectApi = ConnectApi;
//# sourceMappingURL=connectApi.js.map