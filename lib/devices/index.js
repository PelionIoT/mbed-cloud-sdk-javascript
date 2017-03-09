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
"use strict";
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
var functions_1 = require("../common/functions");
var endpoints_1 = require("./endpoints");
var device_1 = require("./device");
var resource_1 = require("./resource");
var query_1 = require("./query");
var webhook_1 = require("./webhook");
var presubscription_1 = require("./presubscription");
var DEFAULT_POLLING_INTERVAL = 500;
/**
 * ## Devices API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbed = require("mbed-cloud-sdk");
 *
 * var devices = new mbed.DevicesApi({
 *     apiKey: "<mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/devices.min.js"></script>
 *
 * <script>
 *     var devices = new mbed.DevicesApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 */
var DevicesApi = (function (_super) {
    __extends(DevicesApi, _super);
    /**
     * @param options connection objects
     */
    function DevicesApi(options) {
        var _this = _super.call(this) || this;
        _this.asyncKey = "async-response-id";
        _this._asyncFns = {};
        _this._notifyFns = {};
        _this._endpoints = new endpoints_1.Endpoints(options);
        return _this;
    }
    /**
     * Allows a notification to be injected into the notifications system
     * `handleNotifications` needs to be set to true for this to work with web hook async responses
     * @param data The notification data to inject
     */
    DevicesApi.prototype.notify = function (data) {
        var _this = this;
        function mapDevice(from) {
            var device = {
                id: from.ep,
                type: from.ept,
                queueMode: from.q,
                resources: from.resources.map(function (resource) {
                    return {
                        observable: resource.obs,
                        type: resource.rf,
                        contentType: resource.ct,
                        path: resource.path
                    };
                })
            };
            return device;
        }
        if (data["notifications"]) {
            data["notifications"].forEach(function (notification) {
                var path = notification.ep + notification.path;
                var fn = _this._notifyFns[path];
                if (fn) {
                    fn(functions_1.decodeBase64(notification.payload, notification.ct));
                }
            });
        }
        if (data["registrations"]) {
            data["registrations"].forEach(function (device) {
                _this.emit(DevicesApi.EVENT_REGISTRATION, mapDevice(device));
            });
        }
        if (data["reg-updates"]) {
            data["reg-updates"].forEach(function (device) {
                _this.emit(DevicesApi.EVENT_REREGISTRATION, mapDevice(device));
            });
        }
        if (data["de-registrations"]) {
            data["de-registrations"].forEach(function (deviceId) {
                _this.emit(DevicesApi.EVENT_DEREGISTRATION, deviceId);
            });
        }
        if (data["registrations-expired"]) {
            data["registrations-expired"].forEach(function (deviceId) {
                _this.emit(DevicesApi.EVENT_EXPIRED, deviceId);
            });
        }
        if (data["async-responses"]) {
            data["async-responses"].forEach(function (response) {
                var asyncID = response.id;
                var fn = _this._asyncFns[asyncID];
                if (fn) {
                    if (response.status >= 400) {
                        fn(response.error || response.status, null);
                    }
                    else {
                        fn(null, functions_1.decodeBase64(response.payload, response.ct));
                    }
                    delete _this._asyncFns[asyncID];
                }
            });
        }
    };
    DevicesApi.prototype.startNotifications = function (options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var interval = options.interval, requestCallback = options.requestCallback;
        function poll() {
            var _this = this;
            this._pollRequest = this._endpoints.notifications.v2NotificationPullGet(function (error, data) {
                if (!_this.handleNotifications)
                    return;
                _this.notify(data);
                if (requestCallback)
                    requestCallback(error, data);
                if (error) {
                    _this.handleNotifications = false;
                    return;
                }
                setTimeout(poll.bind(_this), interval || DEFAULT_POLLING_INTERVAL);
            });
        }
        poll.call(this);
        this.handleNotifications = true;
        return functions_1.asyncStyle(function (done) {
            done(null, null);
        }, callback);
    };
    DevicesApi.prototype.stopNotifications = function (callback) {
        if (this._pollRequest) {
            this._pollRequest.abort();
            this._pollRequest = null;
        }
        this.handleNotifications = false;
        return functions_1.asyncStyle(function (done) {
            done(null, null);
        }, callback);
    };
    DevicesApi.prototype.getWebhook = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.webhooks.v2NotificationCallbackGet(function (error, data) {
                if (error) {
                    if (error.status === 404) {
                        // No webhook
                        return done(null, null);
                    }
                    return done(error);
                }
                var webhook = webhook_1.Webhook.map(data, _this);
                done(null, webhook);
            });
        }, callback);
    };
    DevicesApi.prototype.updateWebhook = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.notifications.v2NotificationCallbackPut(webhook_1.Webhook.reverseMap(options), function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.deleteWebhook = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.webhooks.v2NotificationCallbackDelete(function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.getPresubscription = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsGet(function (error, data) {
                if (error)
                    return done(error);
                var presubs = data.map(presubscription_1.Presubscription.map);
                done(null, presubs);
            });
        }, callback);
    };
    DevicesApi.prototype.updatePresubscription = function (options, callback) {
        var _this = this;
        var presubs = options.map(presubscription_1.Presubscription.reverseMap);
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsPut(presubs, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.deletePresubscription = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsPut([], function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.deleteSubscriptions = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsDelete(function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.listDevices = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include;
        var filter = functions_1.encodeFilter(options, query_1.Query.CUSTOM_PREFIX);
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.catalog.deviceList(limit, order, after, filter, functions_1.encodeInclude(include), function (error, data) {
                if (error)
                    return done(error);
                var devices = data.data.map(function (device) {
                    return device_1.Device.map(device, _this);
                });
                var response = functions_1.mapListResponse(data, devices);
                done(null, response);
            });
        }, callback);
    };
    DevicesApi.prototype.listConnectedDevices = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var type = options.type;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.endpoints.v2EndpointsGet(type, function (error, data) {
                if (error)
                    return done(error);
                var response = {
                    data: data.map(function (device) {
                        return device_1.Device.map({
                            id: device.name
                        }, _this);
                    })
                };
                done(null, response);
            });
        }, callback);
    };
    DevicesApi.prototype.getDevice = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.catalog.deviceRetrieve(options.id, function (error, data) {
                if (error)
                    return done(error);
                var device = device_1.Device.map(data, _this);
                done(null, device);
            });
        }, callback);
    };
    DevicesApi.prototype.addDevice = function (options, callback) {
        var _this = this;
        var mechanism = options.mechanism, provisionKey = options.provisionKey, accountId = options.accountId, autoUpdate = options.autoUpdate, bootstrappedTimestamp = options.bootstrappedTimestamp, createdAt = options.createdAt, customAttributes = options.customAttributes, deployedState = options.deployedState, deployment = options.deployment, description = options.description, deviceClass = options.deviceClass, id = options.id, manifest = options.manifest, mechanismUrl = options.mechanismUrl, name = options.name, serialNumber = options.serialNumber, state = options.state, trustClass = options.trustClass, trustLevel = options.trustLevel, updatedAt = options.updatedAt, vendorId = options.vendorId;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.catalog.deviceCreate(mechanism, provisionKey, accountId, autoUpdate, bootstrappedTimestamp, createdAt, customAttributes, deployedState, deployment, description, deviceClass, null, null, id, manifest, mechanismUrl, name, null, serialNumber, state, trustClass, trustLevel, updatedAt, vendorId, function (error, data) {
                if (error)
                    return done(error);
                done(null, device_1.Device.map(data, _this));
            });
        }, callback);
    };
    DevicesApi.prototype.updateDevice = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            var apiDevice = device_1.Device.reverseMap(options);
            _this._endpoints.catalog.deviceUpdate(options.id, apiDevice, function (error, data) {
                if (error)
                    return done(error);
                var device = device_1.Device.map(data, _this);
                done(null, device);
            });
        }, callback);
    };
    DevicesApi.prototype.deleteDevice = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var id = options.id;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.catalog.deviceDestroy(id, function (error) {
                if (error)
                    return done(error);
                done(null, null);
            });
        }, callback);
    };
    DevicesApi.prototype.listDeviceSubscriptions = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsEndpointNameGet(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.deleteDeviceSubscriptions = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsEndpointNameDelete(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.listDeviceResources = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.endpoints.v2EndpointsEndpointNameGet(options.id, function (error, data) {
                if (error)
                    return done(error);
                var resources = data.map(function (resource) {
                    return resource_1.Resource.map(resource, options.id, _this);
                });
                done(null, resources);
            });
        }, callback);
    };
    DevicesApi.prototype.deleteDeviceResource = function (options, callback) {
        var _this = this;
        var id = options.id, path = options.path, noResponse = options.noResponse;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.resources.v2EndpointsEndpointNameResourcePathDelete(id, path, noResponse, function (error, data) {
                if (error)
                    return done(error);
                done(null, data[_this.asyncKey]);
            });
        }, callback);
    };
    DevicesApi.prototype.getResourceValue = function (options, callback) {
        var _this = this;
        var id = options.id, path = options.path, cacheOnly = options.cacheOnly, noResponse = options.noResponse;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.resources.v2EndpointsEndpointNameResourcePathGet(id, path, cacheOnly, noResponse, function (error, data) {
                if (error)
                    return done(error);
                var asyncID = data[_this.asyncKey];
                if (_this.handleNotifications && asyncID) {
                    _this._asyncFns[asyncID] = done;
                    return;
                }
                done(null, asyncID);
            });
        }, callback);
    };
    DevicesApi.prototype.setResourceValue = function (options, callback) {
        var _this = this;
        var id = options.id, path = options.path, value = options.value, noResponse = options.noResponse;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.resources.v2EndpointsEndpointNameResourcePathPut(id, path.substr(1), value, noResponse, function (error, data) {
                if (error)
                    return done(error);
                var asyncID = data[_this.asyncKey];
                if (_this.handleNotifications && asyncID) {
                    _this._asyncFns[asyncID] = done;
                    return;
                }
                done(null, asyncID);
            });
        }, callback);
    };
    DevicesApi.prototype.executeResource = function (options, callback) {
        var _this = this;
        var id = options.id, path = options.path, fn = options.fn, noResponse = options.noResponse;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.resources.v2EndpointsEndpointNameResourcePathPost(id, path, fn, noResponse, function (error, data) {
                if (error)
                    return done(error);
                var asyncID = data[_this.asyncKey];
                if (_this.handleNotifications && asyncID) {
                    _this._asyncFns[asyncID] = done;
                    return;
                }
                done(null, asyncID);
            });
        }, callback);
    };
    DevicesApi.prototype.getResourceSubscription = function (options, callback) {
        var _this = this;
        var id = options.id, path = options.path;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathGet(id, path, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.addResourceSubscription = function (options, callback) {
        var _this = this;
        var id = options.id, path = options.path, fn = options.fn;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathPut(id, path, function (error, data) {
                if (error)
                    return done(error);
                if (fn) {
                    // Record the function at this path for notifications
                    _this._notifyFns[id + path] = fn;
                }
                var asyncID = data[_this.asyncKey];
                if (_this.handleNotifications && asyncID) {
                    _this._asyncFns[asyncID] = done;
                    return;
                }
                done(null, asyncID);
            });
        }, callback);
    };
    DevicesApi.prototype.deleteResourceSubscription = function (options, callback) {
        var _this = this;
        var id = options.id, path = options.path;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathDelete(id, path, function (error, data) {
                if (error)
                    return done(error);
                // no-one is listening :(
                delete _this._notifyFns[id + path];
                var asyncID = data[_this.asyncKey];
                if (_this.handleNotifications && asyncID) {
                    _this._asyncFns[asyncID] = done;
                    return;
                }
                done(null, asyncID);
            });
        }, callback);
    };
    DevicesApi.prototype.listQueries = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var _a = options, limit = _a.limit, order = _a.order, after = _a.after, include = _a.include;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.query.deviceQueryList(limit, order, after, functions_1.encodeInclude(include), function (error, data) {
                if (error)
                    return done(error);
                var queries = data.data.map(function (query) {
                    return query_1.Query.map(query, _this);
                });
                var response = functions_1.mapListResponse(data, queries);
                done(null, response);
            });
        }, callback);
    };
    DevicesApi.prototype.getQuery = function (options, callback) {
        var _this = this;
        var id = options.id;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.query.deviceQueryRetrieve(id, function (error, data) {
                if (error)
                    return done(error);
                var query = query_1.Query.map(data, _this);
                done(null, query);
            });
        }, callback);
    };
    DevicesApi.prototype.addQuery = function (options, callback) {
        var _this = this;
        var apiQuery = query_1.Query.reverseMap(options);
        var name = apiQuery.name, description = apiQuery.description, query = apiQuery.query;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.query.deviceQueryCreate(name, query, description, null, null, function (error, data) {
                if (error)
                    return done(error);
                var query = query_1.Query.map(data, _this);
                done(null, query);
            });
        }, callback);
    };
    DevicesApi.prototype.updateQuery = function (options, callback) {
        var _this = this;
        var apiQuery = query_1.Query.reverseMap(options);
        if (apiQuery.name && apiQuery.query) {
            // Full update
            return functions_1.asyncStyle(function (done) {
                _this._endpoints.query.deviceQueryUpdate(options.id, apiQuery, function (error, data) {
                    if (error)
                        return done(error);
                    var query = query_1.Query.map(data, _this);
                    done(null, query);
                });
            }, callback);
        }
        else {
            // Partial update
            return functions_1.asyncStyle(function (done) {
                _this._endpoints.query.deviceQueryPartialUpdate(options.id, apiQuery.description, apiQuery.name, null, apiQuery.query, null, function (error, data) {
                    if (error)
                        return done(error);
                    var query = query_1.Query.map(data, _this);
                    done(null, query);
                });
            }, callback);
        }
    };
    DevicesApi.prototype.deleteQuery = function (options, callback) {
        var _this = this;
        var id = options.id;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.query.deviceQueryDestroy(id, function (error) {
                if (error)
                    return done(error);
                done(null, null);
            });
        }, callback);
    };
    return DevicesApi;
}(events_1.EventEmitter));
/**
 * Resource notification event
 * @event
 */
DevicesApi.EVENT_NOTIFICATION = "notification";
/**
 * List of new devices that have registered (with resources)
 * @event
 */
DevicesApi.EVENT_REGISTRATION = "registration";
/**
 * List of devices that have updated registration
 * @event
 */
DevicesApi.EVENT_REREGISTRATION = "reregistration";
/**
 * List of devices that were removed in a controlled manner
 * @event
 */
DevicesApi.EVENT_DEREGISTRATION = "deregistration";
/**
 * List of devices that were removed because the registration has expired
 * @event
 */
DevicesApi.EVENT_EXPIRED = "expired";
exports.DevicesApi = DevicesApi;
