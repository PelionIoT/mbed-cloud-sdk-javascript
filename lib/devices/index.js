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
var query_1 = require("./query");
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
        DevicesApi._endpoints = new endpoints_1.Endpoints(options);
        return _this;
    }
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
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var id = options.id;
        return pg(function (done) {
            DevicesApi._endpoints.catalog.deviceDestroy(id, function (error, data) {
                if (error)
                    return done(error);
                done(null, null);
            });
        }, callback);
    };
    DevicesApi.prototype.listDevices = function (options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var limit = options.limit, after = options.after, order = options.order, include = options.include, filter = options.filter;
        return pg(function (done) {
            DevicesApi._endpoints.catalog.deviceList(limit, order, after, filter, data_1.encodeInclude(include), function (error, data) {
                if (error)
                    return done(error);
                var devices = data.data.map(device_1.Device.map);
                var response = data_1.mapListResponse(data, devices);
                done(null, response);
            });
        }, callback);
    };
    DevicesApi.prototype.listConnectedDevices = function (options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var type = options.type;
        return pg(function (done) {
            DevicesApi._endpoints.endpoints.v2EndpointsGet(type, function (error, data) {
                if (error)
                    return done(error);
                var response = {
                    data: data.map(function (device) {
                        return device_1.Device.map({
                            id: device.name
                        });
                    })
                };
                done(null, response);
            });
        }, callback);
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
                if (!DevicesApi.polling)
                    return;
                //payload, path, ep(endpoint name), ct(content type)
                if (data["notifications"]) {
                    data["notifications"].forEach(function (notification) {
                        var path = notification.ep + notification.path;
                        var resource = DevicesApi.resourceSubs[path];
                        if (resource) {
                            resource.emit(DevicesApi.EVENT_NOTIFICATION, data_1.decodeBase64(notification));
                        }
                    });
                }
                //q(queue mode), ept(endpoint type), ep(endpont name), resources[][path, rf(resource type, ct, obs, _if(interface description)]
                if (data["registrations"]) {
                    data["registrations"].forEach(function (device) {
                        _this.emit(DevicesApi.EVENT_REGISTRATION, device);
                    });
                }
                //q(queue mode), ept(endpoint type), ep(endpont name), resources[][path, rf(resource type, ct, obs, _if(interface description)]
                if (data["reg-updates"]) {
                    data["reg-updates"].forEach(function (update) {
                        _this.emit(DevicesApi.EVENT_UPDATE, update);
                    });
                }
                //string
                if (data["de-registrations"]) {
                    data["de-registrations"].forEach(function (device) {
                        _this.emit(DevicesApi.EVENT_DEREGISTRATION, device);
                    });
                }
                //string
                if (data["registrations-expired"]) {
                    data["registrations-expired"].forEach(function (expired) {
                        _this.emit(DevicesApi.EVENT_EXPIRED, expired);
                    });
                }
                //status,payload,maxage,error,id,ct
                if (data["async-responses"]) {
                    data["async-responses"].forEach(function (response) {
                        var asyncID = response.id;
                        var fn = DevicesApi.asyncFns[asyncID];
                        if (fn) {
                            if (response.status >= 400) {
                                fn(response.error || response.status, response);
                            }
                            else {
                                if (response.payload) {
                                    fn(null, data_1.decodeBase64(response));
                                    return;
                                }
                                fn(null, response);
                            }
                            delete DevicesApi.asyncFns[asyncID];
                        }
                    });
                }
                if (requestCallback)
                    requestCallback(error, data);
                if (error) {
                    DevicesApi.polling = false;
                    return;
                }
                setTimeout(poll.bind(_this), 500);
            });
        }
        poll.call(this);
        DevicesApi.polling = true;
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    /**
     * Stops long polling for notifications
     * @param callback A function that is passed any error
     * @returns Promise containing any error
     */
    DevicesApi.prototype.stopNotifications = function (callback) {
        if (this._pollRequest) {
            this._pollRequest.abort();
            this._pollRequest = null;
        }
        DevicesApi.polling = false;
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    DevicesApi.prototype.getWebhook = function (callback) {
        //mds.DefaultApi.v2NotificationCallbackGet
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    DevicesApi.prototype.updateWebhook = function (options, callback) {
        //mds.NotificationsApi.v2NotificationCallbackPut
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    DevicesApi.prototype.deleteWebhook = function (callback) {
        //mds.DefaultApi.v2NotificationCallbackDelete
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    DevicesApi.prototype.getPreSubscription = function (callback) {
        //mds.SubscriptionsApi.v2SubscriptionsGet
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    DevicesApi.prototype.updatePreSubscription = function (options, callback) {
        //mds.SubscriptionsApi.v2SubscriptionsPut
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    DevicesApi.prototype.deleteSubscriptions = function (callback) {
        //mds.SubscriptionsApi.v2SubscriptionsDelete
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    DevicesApi.prototype.addQuery = function (options, callback) {
        var name = options.name, query = options.query, description = options.description;
        return pg(function (done) {
            DevicesApi._endpoints.query.deviceQueryCreate(name, query, description, null, null, function (error, data) {
                if (error)
                    return done(error);
                var query = query_1.Query.map(data);
                done(null, query);
            });
        }, callback);
    };
    DevicesApi.prototype.deleteQuery = function (options, callback) {
        var id = options.id;
        return pg(function (done) {
            DevicesApi._endpoints.query.deviceQueryDestroy(id, function (error, data) {
                if (error)
                    return done(error);
                done(null, null);
            });
        }, callback);
    };
    DevicesApi.prototype.listQueries = function (options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var limit = options.limit, order = options.order, after = options.after, include = options.include;
        return pg(function (done) {
            DevicesApi._endpoints.query.deviceQueryList(limit, order, after, data_1.encodeInclude(include), function (error, data) {
                if (error)
                    return done(error);
                var queries = data.data.map(query_1.Query.map);
                var response = data_1.mapListResponse(data, queries);
                done(null, response);
            });
        }, callback);
    };
    DevicesApi.prototype.getQuery = function (options, callback) {
        var id = options.id;
        return pg(function (done) {
            DevicesApi._endpoints.query.deviceQueryRetrieve(id, function (error, data) {
                if (error)
                    return done(error);
                var query = query_1.Query.map(data);
                done(null, query);
            });
        }, callback);
    };
    DevicesApi.prototype.updateQuery = function (options, callback) {
        var id = options.id, name = options.name, query = options.query, description = options.description;
        if (name && query) {
            // Full update
            return pg(function (done) {
                DevicesApi._endpoints.query.deviceQueryUpdate(id, {
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
                DevicesApi._endpoints.query.deviceQueryPartialUpdate(id, description, name, null, query, null, function (error, data) {
                    if (error)
                        return done(error);
                    var query = query_1.Query.map(data);
                    done(null, query);
                });
            }, callback);
        }
    };
    return DevicesApi;
}(events_1.EventEmitter));
exports.DevicesApi = DevicesApi;
DevicesApi.polling = false;
DevicesApi.asyncFns = {};
DevicesApi.resourceSubs = {};
/**
 * Resource notification event
 * @event
 */
DevicesApi.EVENT_NOTIFICATION = "notification";
/**
 * Device registration event
 * @event
 */
DevicesApi.EVENT_REGISTRATION = "registration";
/**
 * Device registration update event
 * @event
 */
DevicesApi.EVENT_UPDATE = "reg-update";
/**
 * Device de-registration event
 * @event
 */
DevicesApi.EVENT_DEREGISTRATION = "de-registration";
/**
 * Device registration expiration event
 * @event
 */
DevicesApi.EVENT_EXPIRED = "registration-expired";
