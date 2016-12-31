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
var mds_1 = require("../_api/mds");
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
        _this._apis = new Devices.APIContainer(options);
        return _this;
    }
    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    Devices.prototype.getEndpoints = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var type = options.type;
        return pg(function (done) {
            _this._apis.epAPI.v2EndpointsGet(type, function (error, data) {
                if (error)
                    return done(error);
                var endpoints = data.map(function (endpoint) {
                    return new Devices.Endpoint(_this._apis, endpoint);
                });
                done(null, endpoints);
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
            this._pollRequest = this._apis.notAPI.v2NotificationPullGet(function (error, data) {
                if (!Devices.polling)
                    return;
                //payload, path, ep(endpoint name), ct(content type)
                if (data["notifications"]) {
                    data["notifications"].forEach(function (notification) {
                        _this.emit(Devices.EVENT_NOTIFICATION, notification);
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
                                    fn(null, Devices.decode(response));
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
    Devices.prototype.getCallback = function (callback) {
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
    Devices.prototype.putCallback = function (options, callback) {
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
    Devices.prototype.deleteCallback = function (callback) {
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
    Devices.prototype.putSubscriptionData = function (options, callback) {
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
    return Devices;
}(events_1.EventEmitter));
exports.Devices = Devices;
Devices.polling = false;
Devices.asyncFns = {};
/**
* Resource notification event
* @event
*/
Devices.EVENT_NOTIFICATION = "notification";
/**
* Endpoint registration event
* @event
*/
Devices.EVENT_REGISTRATION = "registration";
/**
* Endpoint registration update event
* @event
*/
Devices.EVENT_UPDATE = "reg-update";
/**
* Endpoint de-registration event
* @event
*/
Devices.EVENT_DEREGISTRATION = "de-registration";
/**
* Endpoint registration expiration event
* @event
*/
Devices.EVENT_EXPIRED = "registration-expired";
(function (Devices) {
    function decode(data) {
        var result = "";
        if (typeof atob === "function") {
            result = atob(data.payload);
        }
        else {
            result = new Buffer(data.payload, "base64").toString("utf8");
        }
        if (data.ct.indexOf("json") > -1) {
            result = JSON.parse(result);
        }
        return result;
    }
    Devices.decode = decode;
    var APIContainer = (function () {
        function APIContainer(options) {
            this.epAPI = new mds_1.EndpointsApi(options.host);
            this.notAPI = new mds_1.NotificationsApi(options.host);
            this.resAPI = new mds_1.ResourcesApi(options.host);
            this.subAPI = new mds_1.SubscriptionsApi(options.host);
            this.epAPI.setApiKey(mds_1.EndpointsApiApiKeys.Bearer, "Bearer " + options.accessKey);
            this.notAPI.setApiKey(mds_1.NotificationsApiApiKeys.Bearer, "Bearer " + options.accessKey);
            this.resAPI.setApiKey(mds_1.ResourcesApiApiKeys.Bearer, "Bearer " + options.accessKey);
            this.subAPI.setApiKey(mds_1.SubscriptionsApiApiKeys.Bearer, "Bearer " + options.accessKey);
        }
        return APIContainer;
    }());
    Devices.APIContainer = APIContainer;
    /**
    * Endpoint object
    */
    var Endpoint = (function () {
        function Endpoint(_apis, options) {
            this._apis = _apis;
            for (var key in options) {
                this[key] = options[key];
            }
        }
        /**
        * Gets a list of an endpoint's resources
        * @param callback A function that is passed the arguments (error, resources)
        * @returns Optional Promise of endpoint resources
        */
        Endpoint.prototype.getResources = function (callback) {
            var _this = this;
            return pg(function (done) {
                _this._apis.epAPI.v2EndpointsEndpointNameGet(_this.name, function (error, data) {
                    if (error)
                        return done(error);
                    var resources = data.map(function (resource) {
                        resource.endpoint = _this;
                        return new Resource(_this._apis, resource);
                    });
                    done(null, resources);
                });
            }, callback);
        };
        /**
        * Deletes a resource
        * @param path Path of the resource to delete
        * @param noResp Whether to make a non-confirmable request to the device
        * @param callback A function that is passed any error
        * @returns Optional Promise containing any error
        */
        Endpoint.prototype.deleteResource = function (options, callback) {
            //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathDelete
            return pg(function (done) {
                done(null, null);
            }, callback);
        };
        /**
        * Gets a list of an endpoint's subscriptions
        * @param callback A function that is passed (error, subscriptions)
        * @returns Optional Promise containing the subscriptions
        */
        Endpoint.prototype.getSubscriptions = function (callback) {
            //mds.SubscriptionsApi.v2SubscriptionsEndpointNameGet
            return pg(function (done) {
                done(null, null);
            }, callback);
        };
        /**
        * Removes an endpoint's subscriptions
        * @param callback A function that is passed any error
        * @returns Optional Promise containing any error
        */
        Endpoint.prototype.deleteSubscriptions = function (callback) {
            //mds.SubscriptionsApi.v2SubscriptionsEndpointNameDelete
            return pg(function (done) {
                done(null, null);
            }, callback);
        };
        return Endpoint;
    }());
    Devices.Endpoint = Endpoint;
    /**
    * Resource object
    */
    var Resource = (function () {
        function Resource(_apis, options) {
            this._apis = _apis;
            for (var key in options) {
                this[key] = options[key];
            }
        }
        /**
        * Gets the value of a resource
        * @param options Options object
        * @param callback A function that is passed the arguments (error, value) where value is the value of the resource formatted as a string
        * @returns Optional Promise of resource value
        */
        Resource.prototype.getValue = function (options, callback) {
            var _this = this;
            options = options || {};
            if (typeof options === "function") {
                callback = options;
                options = {};
            }
            var cacheOnly = options.cacheOnly, noResp = options.noResp;
            return pg(function (done) {
                _this._apis.resAPI.v2EndpointsEndpointNameResourcePathGet(_this.endpoint.name, _this.uri.substr(1), cacheOnly, noResp, function (error, data) {
                    if (error)
                        return done(error);
                    var asyncID = data["async-response-id"];
                    if (Devices.polling && asyncID) {
                        Devices.asyncFns[asyncID] = done;
                        return;
                    }
                    done(null, asyncID || data);
                });
            }, callback);
        };
        /**
        * Puts the value of a resource
        * @param value The value of the resource
        * @param noResp If true, mbed Device Connector will not wait for a response
        * @param callback A function that is passed any error
        * @returns Optional Promise containing any error
        */
        Resource.prototype.putValue = function (options, callback) {
            //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPut
            return pg(function (done) {
                done(null, null);
            }, callback);
        };
        /**
        * Execute a function on a resource
        * @param function The function to trigger
        * @param noResp If true, mbed Device Connector will not wait for a response
        * @param callback A function that is passed any error
        * @returns Optional Promise containing any error
        */
        Resource.prototype.execute = function (options, callback) {
            //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPost
            return pg(function (done) {
                done(null, null);
            }, callback);
        };
        /**
        * Gets the status of a resource's subscription
        * @param callback A function that is passed (error, subscribed) where subscribed is true or false
        * @returns Optional Promise containing resource subscription status
        */
        Resource.prototype.getSubscription = function (callback) {
            //mds.SubscriptionsApi.v2SubscriptionsEndpointNameResourcePathGet
            return pg(function (done) {
                done(null, null);
            }, callback);
        };
        /**
        * Subscribe to a resource
        * @param callback A function that is passed any error
        * @returns Optional Promise containing any error
        */
        Resource.prototype.putSubscription = function (callback) {
            var _this = this;
            return pg(function (done) {
                _this._apis.subAPI.v2SubscriptionsEndpointNameResourcePathPut(_this.endpoint.name, _this.uri, function (error, data) {
                    if (error)
                        return done(error);
                    done(null, data);
                });
            }, callback);
        };
        /**
        * Deletes a resource's subscription
        * @param callback A function that is passed any error
        * @returns Optional Promise containing any error
        */
        Resource.prototype.deleteSubscription = function (callback) {
            //mds.SubscriptionsApi.v2SubscriptionsEndpointNameResourcePathDelete
            return pg(function (done) {
                done(null, null);
            }, callback);
        };
        return Resource;
    }());
    Devices.Resource = Resource;
})(Devices = exports.Devices || (exports.Devices = {}));
