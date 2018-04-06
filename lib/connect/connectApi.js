"use strict";
/*
* Mbed Cloud JavaScript SDK
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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var pagination_1 = require("../common/pagination");
var subscribe_1 = require("./subscribe/subscribe");
/**
 * ## Connect API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var MbedCloudSDK = require("mbed-cloud-sdk");
 *
 * var connect = new MbedCloudSDK.ConnectApi({
 *     apiKey: "<Mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/connect.min.js"></script>
 *
 * <script>
 *     var connect = new MbedCloudSDK.ConnectApi({
 *         apiKey: "<Mbed Cloud API Key>"
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
        _this.ASYNC_KEY = "async-response-id";
        _this._handleNotifications = false;
        _this._asyncFns = {};
        _this._notifyFns = {};
        _this._endpoints = new endpoints_1.Endpoints(options);
        _this._deviceDirectory = new deviceDirectoryApi_1.DeviceDirectoryApi(options);
        _this._handleNotifications = options.handleNotifications;
        _this.subscribe = new subscribe_1.Subscribe(_this);
        return _this;
    }
    Object.defineProperty(ConnectApi.prototype, "handleNotifications", {
        /**
         * Whether the user will handle notifications
         * This suppresses pull notifications for when another method is being used (such as webhooks)
         */
        get: function () {
            return this._handleNotifications;
        },
        set: function (value) {
            if (value === true) {
                this.stopNotifications();
            }
            this._handleNotifications = value;
        },
        enumerable: true,
        configurable: true
    });
    ConnectApi.prototype.normalizePath = function (path) {
        if (path && path.charAt(0) === "/") {
            return path.substr(1);
        }
        return path;
    };
    ConnectApi.prototype.handleAsync = function (data, done) {
        try {
            var asyncID = data[this.ASYNC_KEY];
            if (asyncID) {
                this._asyncFns[asyncID] = done;
                return;
            }
            // tslint:disable-next-line:no-empty
        }
        catch (_e) { }
        // Cached value may be returned
        done(null, data);
    };
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
    ConnectApi.prototype.notify = function (data) {
        var _this = this;
        // Data can be null
        if (!data)
            return;
        if (data.notifications) {
            data.notifications.forEach(function (notification) {
                var body = notification.payload ? functions_1.decodeBase64(notification.payload, notification.ct) : null;
                var path = "" + notification.ep + notification.path;
                var fn = _this._notifyFns[path];
                if (fn)
                    fn(body);
                _this.emit(ConnectApi.EVENT_NOTIFICATION, {
                    id: notification.ep,
                    path: notification.path,
                    payload: body
                });
            });
        }
        if (data.registrations) {
            data.registrations.forEach(function (device) {
                var map = deviceEventAdapter_1.DeviceEventAdapter.map(device, _this, "registration");
                _this.subscribe.notify(map);
                _this.emit(ConnectApi.EVENT_REGISTRATION, map);
            });
        }
        if (data["reg-updates"]) {
            data["reg-updates"].forEach(function (device) {
                var map = deviceEventAdapter_1.DeviceEventAdapter.map(device, _this, "reregistration");
                _this.subscribe.notify(map);
                _this.emit(ConnectApi.EVENT_REREGISTRATION, map);
            });
        }
        if (data["de-registrations"]) {
            data["de-registrations"].forEach(function (deviceId) {
                var map = deviceEventAdapter_1.DeviceEventAdapter.mapId(deviceId, "deregistration");
                _this.subscribe.notify(map);
                _this.emit(ConnectApi.EVENT_DEREGISTRATION, deviceId);
            });
        }
        if (data["registrations-expired"]) {
            data["registrations-expired"].forEach(function (deviceId) {
                var map = deviceEventAdapter_1.DeviceEventAdapter.mapId(deviceId, "expired");
                _this.subscribe.notify(map);
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
                        fn(null, body);
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
        return functions_1.asyncStyle(function (done) {
            // Don't start notifications if they are handled elsewhere or already running
            if (_this._handleNotifications || _this._pollRequest)
                return done(null, null);
            _this._pollRequest = true;
            var interval = options.interval, requestCallback = options.requestCallback, forceClear = options.forceClear;
            function poll() {
                var _this = this;
                this._pollRequest = this._endpoints.notifications.v2NotificationPullGet(function (error, data) {
                    if (error)
                        return;
                    _this.notify(data);
                    if (requestCallback && data["async-responses"])
                        requestCallback(error, data["async-responses"]);
                    setTimeout(poll.bind(_this), interval || 500);
                });
            }
            function start() {
                poll.call(this);
                done(null, null);
            }
            if (forceClear)
                return _this.deleteWebhook(start.bind(_this));
            _this.getWebhook(function (error, webhook) {
                if (error)
                    return done(error, null);
                if (webhook)
                    return done(new sdkError_1.SDKError("Webhook already exists at " + webhook.url), null);
                start.call(_this);
            });
        }, callback);
    };
    ConnectApi.prototype.stopNotifications = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.notifications.v2NotificationPullDelete(function () {
                if (_this._pollRequest) {
                    // tslint:disable-next-line:no-string-literal
                    if (_this._pollRequest["abort"])
                        _this._pollRequest["abort"]();
                    _this._pollRequest = null;
                }
                done(null, null);
            });
        }, callback);
    };
    ConnectApi.prototype.getWebhook = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.notifications.v2NotificationCallbackGet(function (error, data) {
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
        return functions_1.asyncStyle(function (done) {
            function update() {
                this._endpoints.notifications.v2NotificationCallbackPut({
                    url: url,
                    headers: headers
                }, function (error) {
                    if (error)
                        return done(error);
                    done(null, null);
                });
            }
            if (forceClear) {
                _this._handleNotifications = true;
                _this.stopNotifications(update.bind(_this));
                // } else if (this._pollRequest) {
                //    return done(new SDKError("Pull notifications are already running"), null);
            }
            else {
                update.call(_this);
            }
        }, callback);
    };
    ConnectApi.prototype.deleteWebhook = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.notifications.v2NotificationCallbackDelete(function () {
                done(null, null);
            });
        }, callback);
    };
    ConnectApi.prototype.listPresubscriptions = function (callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.subscriptions.v2SubscriptionsGet(resultsFn);
        }, function (data, done) {
            var presubs = data.map(presubscriptionAdapter_1.PresubscriptionAdapter.map);
            done(null, presubs);
        }, callback);
    };
    ConnectApi.prototype.updatePresubscriptions = function (subscriptions, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            var presubs = subscriptions.map(presubscriptionAdapter_1.PresubscriptionAdapter.reverseMap);
            _this._endpoints.subscriptions.v2SubscriptionsPut(presubs, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    ConnectApi.prototype.deletePresubscriptions = function (callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.subscriptions.v2SubscriptionsPut([], resultsFn);
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
            _this._endpoints.subscriptions.v2SubscriptionsDeviceIdGet(deviceId, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    ConnectApi.prototype.deleteDeviceSubscriptions = function (deviceId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.subscriptions.v2SubscriptionsDeviceIdDelete(deviceId, resultsFn);
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
            _this._endpoints.endpoints.v2EndpointsDeviceIdGet(deviceId, resultsFn);
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
            _this._endpoints.endpoints.v2EndpointsDeviceIdGet(deviceId, resultsFn);
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
    ConnectApi.prototype.getResourceValue = function (deviceId, resourcePath, cacheOnly, noResponse, mimeType, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        cacheOnly = cacheOnly || false;
        noResponse = noResponse || false;
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        if (typeof cacheOnly === "function") {
            callback = cacheOnly;
            cacheOnly = false;
        }
        return functions_1.apiWrapper(function (resultsFn) {
            _this.startNotifications(null, function (error) {
                if (error)
                    return resultsFn(error, null);
                _this._endpoints.resources.v2EndpointsDeviceIdResourcePathGet(deviceId, resourcePath, cacheOnly, noResponse, resultsFn, {
                    acceptHeader: mimeType
                });
            });
        }, this.handleAsync.bind(this), callback);
    };
    ConnectApi.prototype.setResourceValue = function (deviceId, resourcePath, value, noResponse, mimeType, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        noResponse = noResponse || false;
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        return functions_1.apiWrapper(function (resultsFn) {
            _this.startNotifications(null, function (error) {
                if (error)
                    return resultsFn(error, null);
                _this._endpoints.resources.v2EndpointsDeviceIdResourcePathPut(deviceId, resourcePath, value, noResponse, resultsFn, {
                    contentType: mimeType
                });
            });
        }, this.handleAsync.bind(this), callback);
    };
    ConnectApi.prototype.executeResource = function (deviceId, resourcePath, functionName, noResponse, mimeType, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        noResponse = noResponse || false;
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        if (typeof functionName === "function") {
            callback = functionName;
            functionName = null;
        }
        return functions_1.apiWrapper(function (resultsFn) {
            _this.startNotifications(null, function (error) {
                if (error)
                    return resultsFn(error, null);
                _this._endpoints.resources.v2EndpointsDeviceIdResourcePathPost(deviceId, resourcePath, functionName, noResponse, resultsFn, {
                    contentType: mimeType
                });
            });
        }, this.handleAsync.bind(this), callback);
    };
    ConnectApi.prototype.getResourceSubscription = function (deviceId, resourcePath, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsDeviceIdResourcePathGet(deviceId, resourcePath, function (error) {
                return done(null, !error);
            });
        }, callback);
    };
    ConnectApi.prototype.addResourceSubscription = function (deviceId, resourcePath, notifyFn, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        return functions_1.apiWrapper(function (resultsFn) {
            _this.startNotifications(null, function (error) {
                if (error)
                    return resultsFn(error, null);
                _this._endpoints.subscriptions.v2SubscriptionsDeviceIdResourcePathPut(deviceId, resourcePath, resultsFn);
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
                if (error)
                    return resultsFn(error, null);
                _this._endpoints.subscriptions.v2SubscriptionsDeviceIdResourcePathDelete(deviceId, resourcePath, resultsFn);
            });
        }, function (data, done) {
            // no-one is listening :(
            delete _this._notifyFns[deviceId + "/" + resourcePath];
            _this.handleAsync(data, done);
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
    ConnectApi.prototype.getLastApiMetadata = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            done(null, _this._endpoints.getLastMeta());
        }, callback);
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
    return ConnectApi;
}(events_1.EventEmitter));
exports.ConnectApi = ConnectApi;

//# sourceMappingURL=connectApi.js.map
