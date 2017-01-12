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
var api_1 = require("./api");
var data_1 = require("../helpers/data");
var device_1 = require("./device");
/**
* Root Devices object
*/
var Devices = (function (_super) {
    __extends(Devices, _super);
    /**
    * @param options Options object
    */
    function Devices(options) {
        var _this = _super.call(this) || this;
        _this._api = new api_1.Api(options);
        return _this;
    }
    /**
    * Create a device
    * @param options device details
    * @param callback A function that is passed the arguments (error, device)
    * @returns Optional Promise of device
    */
    Devices.prototype.createDevice = function (options, callback) {
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
    /**
    * Delete a device
    * @param options device ID
    * @param callback A function that is passed any error
    * @returns Optional Promise
    */
    Devices.prototype.deleteDevice = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var id = options.id;
        return pg(function (done) {
            _this._api.catalog.deviceDestroy(id, function (error, data) {
                if (error)
                    return done(error);
                done(null, null);
            });
        }, callback);
    };
    /**
    * Gets a list of known devices
    * @param options Filters devices
    * @param callback A function that is passed the arguments (error, devices)
    * @returns Optional Promise of devices
    */
    Devices.prototype.listKnownDevices = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var limit = options.limit, after = options.after, order = options.order, include = options.include, filter = options.filter;
        return pg(function (done) {
            _this._api.catalog.deviceList(limit, order, after, filter, include, function (error, data) {
                if (error)
                    return done(error);
                var devices = data.data.map(function (device) {
                    return new device_1.Device(_this._api, device.id);
                });
                done(null, devices);
            });
        }, callback);
    };
    /**
    * Gets a list of currently connected device
    * @param type Filters devices by device type
    * @param callback A function that is passed the arguments (error, devices)
    * @returns Optional Promise of currently connected devices
    */
    Devices.prototype.listConnectedDevices = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var type = options.type;
        return pg(function (done) {
            _this._api.endpoints.v2EndpointsGet(type, function (error, data) {
                if (error)
                    return done(error);
                var devices = data.map(function (device) {
                    return new device_1.Device(_this._api, device.name);
                });
                done(null, devices);
            });
        }, callback);
    };
    /**
    * Begins long polling constantly for notifications
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Devices.prototype.startNotifications = function (options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var requestCallback = options.requestCallback;
        function poll() {
            var _this = this;
            this._pollRequest = this._api.notifications.v2NotificationPullGet(function (error, data) {
                if (!Devices.polling)
                    return;
                //payload, path, ep(endpoint name), ct(content type)
                if (data["notifications"]) {
                    data["notifications"].forEach(function (notification) {
                        var path = notification.ep + notification.path;
                        var resource = Devices.resourceSubs[path];
                        if (resource) {
                            resource.emit(Devices.EVENT_NOTIFICATION, data_1.decodeBase64(notification));
                        }
                    });
                }
                //q(queue mode), ept(endpoint type), ep(endpont name), resources[][path, rf(resource type, ct, obs, _if(interface description)]
                if (data["registrations"]) {
                    data["registrations"].forEach(function (device) {
                        _this.emit(Devices.EVENT_REGISTRATION, device);
                    });
                }
                //q(queue mode), ept(endpoint type), ep(endpont name), resources[][path, rf(resource type, ct, obs, _if(interface description)]
                if (data["reg-updates"]) {
                    data["reg-updates"].forEach(function (update) {
                        _this.emit(Devices.EVENT_UPDATE, update);
                    });
                }
                //string
                if (data["de-registrations"]) {
                    data["de-registrations"].forEach(function (device) {
                        _this.emit(Devices.EVENT_DEREGISTRATION, device);
                    });
                }
                //string
                if (data["registrations-expired"]) {
                    data["registrations-expired"].forEach(function (expired) {
                        _this.emit(Devices.EVENT_EXPIRED, expired);
                    });
                }
                //status,payload,maxage,error,id,ct
                if (data["async-responses"]) {
                    data["async-responses"].forEach(function (response) {
                        var asyncID = response.id;
                        var fn = Devices.asyncFns[asyncID];
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
                            delete Devices.asyncFns[asyncID];
                        }
                    });
                }
                if (requestCallback)
                    requestCallback(error, data);
                if (error) {
                    Devices.polling = false;
                    return;
                }
                setTimeout(poll.bind(_this), 500);
            });
        }
        poll.call(this);
        Devices.polling = true;
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Stops long polling for notifications
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Devices.prototype.stopNotifications = function (callback) {
        if (this._pollRequest) {
            this._pollRequest.abort();
            this._pollRequest = null;
        }
        Devices.polling = false;
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Gets the current callback data
    * @param callback A function that is passed the arguments (error, callbackData)
    * @returns Optional Promise containing the callback data
    */
    Devices.prototype.getWebhookData = function (callback) {
        //mds.DefaultApi.v2NotificationCallbackGet
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Puts callback data
    * @param data callback data
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Devices.prototype.updateWebhookData = function (options, callback) {
        //mds.NotificationsApi.v2NotificationCallbackPut
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Devices.prototype.deleteWebhookData = function (callback) {
        //mds.DefaultApi.v2NotificationCallbackDelete
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Gets pre-subscription data
    * @param callback A function that is passed (error, data)
    * @returns Optional Promise containing data
    */
    Devices.prototype.getSubscriptionData = function (callback) {
        //mds.SubscriptionsApi.v2SubscriptionsGet
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Puts pre-subscription data
    * @param data The pre-subscription data
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Devices.prototype.updateSubscriptionData = function (options, callback) {
        //mds.SubscriptionsApi.v2SubscriptionsPut
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Removes all subscriptions
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Devices.prototype.deleteSubscriptions = function (callback) {
        //mds.SubscriptionsApi.v2SubscriptionsDelete
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Create a device
    * @param options device details
    * @param callback A function that is passed the arguments (error, device)
    * @returns Optional Promise of device
    */
    Devices.prototype.createQuery = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var name = options.name, query = options.query, description = options.description;
        return pg(function (done) {
            _this._api.query.deviceQueryCreate(name, query, description, null, null, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    /**
    * Delete a device
    * @param options device ID
    * @param callback A function that is passed any error
    * @returns Optional Promise
    */
    Devices.prototype.deleteQuery = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var id = options.id;
        return pg(function (done) {
            _this._api.query.deviceQueryDestroy(id, function (error, data) {
                if (error)
                    return done(error);
                done(null, null);
            });
        }, callback);
    };
    /**
    * Delete a device
    * @param options device ID
    * @param callback A function that is passed any error
    * @returns Optional Promise
    */
    Devices.prototype.listQueries = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var limit = options.limit, order = options.order, after = options.after;
        return pg(function (done) {
            _this._api.query.deviceQueryList(limit, order, after, function (error, data) {
                if (error)
                    return done(error);
                done(null, null);
            });
        }, callback);
    };
    /**
    * Delete a device
    * @param options device ID
    * @param callback A function that is passed any error
    * @returns Optional Promise
    */
    Devices.prototype.getQuery = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var id = options.id;
        return pg(function (done) {
            _this._api.query.deviceQueryRetrieve(id, function (error, data) {
                if (error)
                    return done(error);
                done(null, null);
            });
        }, callback);
    };
    /**
    * Delete a device
    * @param options device ID
    * @param callback A function that is passed any error
    * @returns Optional Promise
    */
    Devices.prototype.updateQuery = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var id = options.id, name = options.name, query = options.query, description = options.description;
        if (name && query) {
            // Full update
            return pg(function (done) {
                _this._api.query.deviceQueryUpdate(id, name, query, description, null, null, function (error, data) {
                    if (error)
                        return done(error);
                    done(null, null);
                });
            }, callback);
        }
        else {
            // Partial update
            return pg(function (done) {
                _this._api.query.deviceQueryPartialUpdate(id, description, name, null, query, null, function (error, data) {
                    if (error)
                        return done(error);
                    done(null, null);
                });
            }, callback);
        }
    };
    return Devices;
}(events_1.EventEmitter));
exports.Devices = Devices;
Devices.polling = false;
Devices.asyncFns = {};
Devices.resourceSubs = {};
/**
* Resource notification event
* @event
*/
Devices.EVENT_NOTIFICATION = "notification";
/**
* Device registration event
* @event
*/
Devices.EVENT_REGISTRATION = "registration";
/**
* Device registration update event
* @event
*/
Devices.EVENT_UPDATE = "reg-update";
/**
* Device de-registration event
* @event
*/
Devices.EVENT_DEREGISTRATION = "de-registration";
/**
* Device registration expiration event
* @event
*/
Devices.EVENT_EXPIRED = "registration-expired";
