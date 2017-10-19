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
 *  * Register a callback server or _webhook_ using `updateWebhook()`
 *  * Use pull notifications by using `startNotifications()`
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
        _this._asyncFns = {};
        _this._notifyFns = {};
        _this._endpoints = new endpoints_1.Endpoints(options);
        _this._deviceDirectory = new deviceDirectoryApi_1.DeviceDirectoryApi(options);
        return _this;
    }
    ConnectApi.prototype.normalizePath = function (path) {
        if (path && path.charAt(0) === "/") {
            return path.substr(1);
        }
        return path;
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
                _this.emit(ConnectApi.EVENT_REGISTRATION, deviceEventAdapter_1.DeviceEventAdapter.map(device, _this));
            });
        }
        if (data["reg-updates"]) {
            data["reg-updates"].forEach(function (device) {
                _this.emit(ConnectApi.EVENT_REREGISTRATION, deviceEventAdapter_1.DeviceEventAdapter.map(device, _this));
            });
        }
        if (data["de-registrations"]) {
            data["de-registrations"].forEach(function (deviceId) {
                _this.emit(ConnectApi.EVENT_DEREGISTRATION, deviceId);
            });
        }
        if (data["registrations-expired"]) {
            data["registrations-expired"].forEach(function (deviceId) {
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
            var interval = options.interval, requestCallback = options.requestCallback;
            function poll() {
                var _this = this;
                this._pollRequest = this._endpoints.notifications.v2NotificationPullGet(function (error, data) {
                    if (!_this.handleNotifications)
                        return;
                    _this.notify(data);
                    if (requestCallback && data["async-responses"])
                        requestCallback(error, data["async-responses"]);
                    if (error) {
                        _this.handleNotifications = false;
                        return;
                    }
                    setTimeout(poll.bind(_this), interval || 500);
                });
            }
            _this.deleteWebhook(function () {
                poll.call(_this);
                _this.handleNotifications = true;
                done(null, null);
            });
        }, callback);
    };
    ConnectApi.prototype.stopNotifications = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.notifications.v2NotificationPullDelete(function () {
                if (_this._pollRequest) {
                    _this._pollRequest.abort();
                    _this._pollRequest = null;
                }
                _this.handleNotifications = false;
                done(null, null);
            });
        }, callback);
    };
    ConnectApi.prototype.getWebhook = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.webhooks.v2NotificationCallbackGet(function (error, data) {
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
    ConnectApi.prototype.updateWebhook = function (url, headers, callback) {
        var _this = this;
        headers = headers || {};
        if (typeof headers === "function") {
            callback = headers;
            headers = {};
        }
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.notifications.v2NotificationPullDelete(function () {
                _this._endpoints.notifications.v2NotificationCallbackPut({
                    url: url,
                    headers: headers
                }, function (error) {
                    if (error)
                        return done(error);
                    done(null, null);
                });
            });
        }, callback);
    };
    ConnectApi.prototype.deleteWebhook = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.webhooks.v2NotificationCallbackDelete(function () {
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
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.subscriptions.v2SubscriptionsDelete(resultsFn);
        }, function (data, done) {
            done(null, data);
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
    ConnectApi.prototype.deleteResource = function (deviceId, resourcePath, noResponse, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        noResponse = noResponse || false;
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.resources.v2EndpointsDeviceIdResourcePathDelete(deviceId, resourcePath, noResponse, resultsFn);
        }, function (data, done) {
            done(null, data[_this.ASYNC_KEY]);
        }, callback);
    };
    ConnectApi.prototype.getResourceValue = function (deviceId, resourcePath, cacheOnly, noResponse, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        cacheOnly = cacheOnly || false;
        noResponse = noResponse || false;
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        if (typeof cacheOnly === "function") {
            callback = cacheOnly;
            cacheOnly = false;
        }
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.resources.v2EndpointsDeviceIdResourcePathGet(deviceId, resourcePath, cacheOnly, noResponse, resultsFn);
        }, function (data, done) {
            var asyncID = data[_this.ASYNC_KEY];
            if (_this.handleNotifications && asyncID) {
                _this._asyncFns[asyncID] = done;
                return;
            }
            done(null, asyncID);
        }, callback);
    };
    ConnectApi.prototype.setResourceValue = function (deviceId, resourcePath, value, noResponse, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        noResponse = noResponse || false;
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.resources.v2EndpointsDeviceIdResourcePathPut(deviceId, resourcePath, value, noResponse, resultsFn);
        }, function (data, done) {
            var asyncID = data[_this.ASYNC_KEY];
            if (_this.handleNotifications && asyncID) {
                _this._asyncFns[asyncID] = done;
                return;
            }
            done(null, asyncID);
        }, callback);
    };
    ConnectApi.prototype.executeResource = function (deviceId, resourcePath, functionName, noResponse, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        noResponse = noResponse || false;
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        if (typeof functionName === "function") {
            callback = functionName;
            functionName = null;
        }
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.resources.v2EndpointsDeviceIdResourcePathPost(deviceId, resourcePath, functionName, noResponse, resultsFn);
        }, function (data, done) {
            var asyncID = data[_this.ASYNC_KEY];
            if (_this.handleNotifications && asyncID) {
                _this._asyncFns[asyncID] = done;
                return;
            }
            done(null, asyncID);
        }, callback);
    };
    ConnectApi.prototype.getResourceSubscription = function (deviceId, resourcePath, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.subscriptions.v2SubscriptionsDeviceIdResourcePathGet(deviceId, resourcePath, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    ConnectApi.prototype.addResourceSubscription = function (deviceId, resourcePath, notifyFn, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.subscriptions.v2SubscriptionsDeviceIdResourcePathPut(deviceId, resourcePath, resultsFn);
        }, function (data, done) {
            if (notifyFn) {
                // Record the function at this path for notifications
                _this._notifyFns[deviceId + "/" + resourcePath] = notifyFn;
            }
            var asyncID = data[_this.ASYNC_KEY];
            if (_this.handleNotifications && asyncID) {
                _this._asyncFns[asyncID] = done;
                return;
            }
            done(null, asyncID);
        }, callback);
    };
    ConnectApi.prototype.deleteResourceSubscription = function (deviceId, resourcePath, callback) {
        var _this = this;
        resourcePath = this.normalizePath(resourcePath);
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.subscriptions.v2SubscriptionsDeviceIdResourcePathDelete(deviceId, resourcePath, resultsFn);
        }, function (data, done) {
            // no-one is listening :(
            delete _this._notifyFns[deviceId + "/" + resourcePath];
            var asyncID = data[_this.ASYNC_KEY];
            if (_this.handleNotifications && asyncID) {
                _this._asyncFns[asyncID] = done;
                return;
            }
            done(null, asyncID);
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
            var list;
            if (data.data && data.data.length) {
                list = data.data.map(function (metric) {
                    return metricAdapter_1.MetricAdapter.map(metric);
                });
            }
            done(null, list);
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
