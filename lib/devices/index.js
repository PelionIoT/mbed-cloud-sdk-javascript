"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var pg = require("polygoat");
var events_1 = require("events");
var data_1 = require("../helpers/data");
var endpoints_1 = require("./endpoints");
var device_1 = require("./device");
var resource_1 = require("./resource");
var query_1 = require("./query");
var webhook_1 = require("./webhook");
var presubscription_1 = require("./presubscription");
/**
 * Root Devices API
 */
var DevicesApi = (function (_super) {
    __extends(DevicesApi, _super);
    /**
     * @param options connection objects
     */
    function DevicesApi(options) {
        var _this = _super.call(this) || this;
        _this._asyncFns = {};
        _this._resourceSubs = {};
        _this._endpoints = new endpoints_1.Endpoints(options);
        return _this;
    }
    /**
     * Allows a notification to be injected into the polling system
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
                var resource = _this._resourceSubs[path];
                if (resource) {
                    resource.emit(DevicesApi.EVENT_NOTIFICATION, data_1.decodeBase64(notification.payload, notification.ct));
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
                        fn(null, data_1.decodeBase64(response.payload, response.ct));
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
        var requestCallback = options.requestCallback;
        function poll() {
            var _this = this;
            this._pollRequest = this._api.notifications.v2NotificationPullGet(function (error, data) {
                if (!_this.polling)
                    return;
                _this.notify(data);
                if (requestCallback)
                    requestCallback(error, data);
                if (error) {
                    _this.polling = false;
                    return;
                }
                setTimeout(poll.bind(_this), 500);
            });
        }
        poll.call(this);
        this.polling = true;
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    DevicesApi.prototype.stopNotifications = function (callback) {
        if (this._pollRequest) {
            this._pollRequest.abort();
            this._pollRequest = null;
        }
        this.polling = false;
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    DevicesApi.prototype.getWebhook = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._endpoints.webhooks.v2NotificationCallbackGet(function (error, data) {
                if (error)
                    return done(error);
                var webhook = webhook_1.Webhook.map(data);
                done(null, webhook);
            });
        }, callback);
    };
    DevicesApi.prototype.updateWebhook = function (options, callback) {
        var _this = this;
        return pg(function (done) {
            _this._endpoints.notifications.v2NotificationCallbackPut({
                headers: options.headers,
                url: options.url
            }, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.deleteWebhook = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._endpoints.webhooks.v2NotificationCallbackDelete(function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.getPreSubscription = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsGet(function (error, data) {
                if (error)
                    return done(error);
                var presubs = data.map(presubscription_1.Presubscription.map);
                done(null, presubs);
            });
        }, callback);
    };
    DevicesApi.prototype.updatePreSubscription = function (options, callback) {
        var _this = this;
        var presubs = options.map(presubscription_1.Presubscription.reverseMap);
        return pg(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsPut(presubs, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.deleteSubscriptions = function (callback) {
        var _this = this;
        return pg(function (done) {
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
        var limit = options.limit, after = options.after, order = options.order, include = options.include, filter = options.filter;
        return pg(function (done) {
            _this._endpoints.catalog.deviceList(limit, order, after, filter, data_1.encodeInclude(include), function (error, data) {
                if (error)
                    return done(error);
                var devices = data.data.map(function (device) {
                    return device_1.Device.map(device, _this);
                });
                var response = data_1.mapListResponse(data, devices);
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
        return pg(function (done) {
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
        return pg(function (done) {
            _this._endpoints.catalog.deviceRetrieve(options.id, function (error, data) {
                if (error)
                    return done(error);
                var device = device_1.Device.map(data, _this);
                done(null, device);
            });
        }, callback);
    };
    DevicesApi.prototype.addDevice = function (options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return pg(function (done) {
            /*
            this._api.catalog.deviceCreate(xxx, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
            */
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
        return pg(function (done) {
            _this._endpoints.catalog.deviceDestroy(id, function (error, data) {
                if (error)
                    return done(error);
                done(null, null);
            });
        }, callback);
    };
    DevicesApi.prototype.listDeviceSubscriptions = function (options, callback) {
        var _this = this;
        return pg(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsEndpointNameGet(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.deleteDeviceSubscriptions = function (options, callback) {
        var _this = this;
        return pg(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsEndpointNameDelete(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.listDeviceResources = function (options, callback) {
        var _this = this;
        return pg(function (done) {
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
        return pg(function (done) {
            _this._endpoints.resources.v2EndpointsEndpointNameResourcePathDelete(id, path, noResponse, function (error, data) {
                if (error)
                    return done(error);
                done(null, data["async-response-id"]);
            });
        }, callback);
    };
    DevicesApi.prototype.getResourceValue = function (options, callback) {
        var _this = this;
        var id = options.id, path = options.path, cacheOnly = options.cacheOnly, noResponse = options.noResponse;
        return pg(function (done) {
            _this._endpoints.resources.v2EndpointsEndpointNameResourcePathGet(id, path, cacheOnly, noResponse, function (error, data) {
                if (error)
                    return done(error);
                var asyncID = data["async-response-id"];
                if (_this.polling && asyncID) {
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
        return pg(function (done) {
            _this._endpoints.resources.v2EndpointsEndpointNameResourcePathPut(id, path, value, noResponse, function (error, data) {
                if (error)
                    return done(error);
                var asyncID = data["async-response-id"];
                if (_this.polling && asyncID) {
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
        return pg(function (done) {
            _this._endpoints.resources.v2EndpointsEndpointNameResourcePathPost(id, path, fn, noResponse, function (error, data) {
                if (error)
                    return done(error);
                var asyncID = data["async-response-id"];
                if (_this.polling && asyncID) {
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
        return pg(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathGet(id, path, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    DevicesApi.prototype.addResourceSubscription = function (options, callback) {
        var _this = this;
        var id = options.id, path = options.path;
        return pg(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathPut(id, path, function (error, data) {
                if (error)
                    return done(error);
                var asyncID = data["async-response-id"];
                done(null, asyncID);
            });
        }, callback);
    };
    DevicesApi.prototype.deleteResourceSubscription = function (options, callback) {
        var _this = this;
        var id = options.id, path = options.path;
        return pg(function (done) {
            _this._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathDelete(id, path, done);
        }, callback);
    };
    DevicesApi.prototype.listQueries = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var limit = options.limit, order = options.order, after = options.after, include = options.include;
        return pg(function (done) {
            _this._endpoints.query.deviceQueryList(limit, order, after, data_1.encodeInclude(include), function (error, data) {
                if (error)
                    return done(error);
                var queries = data.data.map(query_1.Query.map);
                var response = data_1.mapListResponse(data, queries);
                done(null, response);
            });
        }, callback);
    };
    DevicesApi.prototype.getQuery = function (options, callback) {
        var _this = this;
        var id = options.id;
        return pg(function (done) {
            _this._endpoints.query.deviceQueryRetrieve(id, function (error, data) {
                if (error)
                    return done(error);
                var query = query_1.Query.map(data);
                done(null, query);
            });
        }, callback);
    };
    DevicesApi.prototype.addQuery = function (options, callback) {
        var _this = this;
        var name = options.name, query = options.query, description = options.description;
        return pg(function (done) {
            _this._endpoints.query.deviceQueryCreate(name, query, description, null, null, function (error, data) {
                if (error)
                    return done(error);
                var query = query_1.Query.map(data);
                done(null, query);
            });
        }, callback);
    };
    DevicesApi.prototype.updateQuery = function (options, callback) {
        var _this = this;
        var id = options.id, name = options.name, query = options.query, description = options.description;
        if (name && query) {
            // Full update
            return pg(function (done) {
                _this._endpoints.query.deviceQueryUpdate(id, {
                    description: description,
                    name: name,
                    query: query
                }, function (error, data) {
                    if (error)
                        return done(error);
                    var query = query_1.Query.map(data);
                    done(null, query);
                });
            }, callback);
        }
        else {
            // Partial update
            return pg(function (done) {
                _this._endpoints.query.deviceQueryPartialUpdate(id, description, name, null, query, null, function (error, data) {
                    if (error)
                        return done(error);
                    var query = query_1.Query.map(data);
                    done(null, query);
                });
            }, callback);
        }
    };
    DevicesApi.prototype.deleteQuery = function (options, callback) {
        var _this = this;
        var id = options.id;
        return pg(function (done) {
            _this._endpoints.query.deviceQueryDestroy(id, function (error, data) {
                if (error)
                    return done(error);
                done(null, null);
            });
        }, callback);
    };
    return DevicesApi;
}(events_1.EventEmitter));
exports.DevicesApi = DevicesApi;
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
