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
var events_1 = require("events");
var polygoat_1 = require("./helpers/polygoat");
var mds_1 = require("./_api/mds");
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
        _this.api = new mds_1.EndpointsApi();
        //        if (options.host) this.client.basePath = options.host;
        if (options.accessKey)
            _this.api.setApiKey(mds_1.EndpointsApiApiKeys.Bearer, "Bearer " + options.accessKey);
        return _this;
    }
    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    Devices.prototype.getEndpoints = function (type, callback) {
        var api = this.api;
        return polygoat_1.polygoat(function (done) {
            api.v2EndpointsGet(type, function (error, response) {
                if (error)
                    return done(error);
                var endpoints = response.body.map(function (endpoint) {
                    return new Endpoint(api, endpoint);
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
    Devices.prototype.startNotifications = function (callback) {
        //mds.NotificationsApi.v2NotificationPullGet
        return polygoat_1.polygoat(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Stops long polling for notifications
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Devices.prototype.stopNotifications = function (callback) {
        return polygoat_1.polygoat(function (done) {
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
        return polygoat_1.polygoat(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Puts callback data
    * @param data callback data
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Devices.prototype.putCallback = function (data, callback) {
        //mds.NotificationsApi.v2NotificationCallbackPut
        return polygoat_1.polygoat(function (done) {
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
        return polygoat_1.polygoat(function (done) {
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
        return polygoat_1.polygoat(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Puts pre-subscription data
    * @param data The pre-subscription data
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Devices.prototype.putSubscriptionData = function (data, callback) {
        //mds.SubscriptionsApi.v2SubscriptionsPut
        return polygoat_1.polygoat(function (done) {
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
        return polygoat_1.polygoat(function (done) {
            done(null, null);
        }, callback);
    };
    return Devices;
}(events_1.EventEmitter));
exports.Devices = Devices;
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
/**
* Endpoint object
*/
var Endpoint = (function () {
    function Endpoint(api, options) {
        this.api = api;
        this.name = options.name;
        this.status = options.status;
        this.type = options.type;
    }
    /**
    * Gets a list of an endpoint's resources
    * @param callback A function that is passed the arguments (error, resources)
    * @returns Optional Promise of endpoint resources
    */
    Endpoint.prototype.getResources = function (callback) {
        var name = this.name;
        var api = this.api;
        return polygoat_1.polygoat(function (done) {
            api.v2EndpointsEndpointNameGet(name, function (error, response) {
                if (error)
                    return done(error);
                var resources = response.body.map(function (resource) {
                    return new Resource(api, resource);
                });
                done(null, resources);
            });
        }, callback);
    };
    /**
    * Adds a new resource
    * @param path The path of the resource
    * @param value The value of the resource
    * @param options Options object
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Endpoint.prototype.postResource = function (path, value, options, callback) {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPost
        return polygoat_1.polygoat(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Deletes a resource
    * @param path Path of the resource to delete
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Endpoint.prototype.deleteResource = function (path, callback) {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathDelete
        return polygoat_1.polygoat(function (done) {
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
        return polygoat_1.polygoat(function (done) {
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
        return polygoat_1.polygoat(function (done) {
            done(null, null);
        }, callback);
    };
    return Endpoint;
}());
exports.Endpoint = Endpoint;
/**
* Resource object
*/
var Resource = (function () {
    function Resource(api, options) {
        this.api = api;
        this.obs = options.obs;
        this.rt = options.rt;
        this.type = options.type;
        this.uri = options.uri;
    }
    /**
    * Gets the value of a resource
    * @param options Options object
    * @param callback A function that is passed the arguments (error, value) where value is the value of the resource formatted as a string
    * @returns Optional Promise of resource value
    */
    Resource.prototype.getValue = function (options, callback) {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathGet
        var uri = this.uri;
        return polygoat_1.polygoat(function (done) {
            done(null, "value - " + uri);
        }, callback);
    };
    /**
    * Puts the value of a resource
    * @param value The value of the resource
    * @param options Options object
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Resource.prototype.putValue = function (value, options, callback) {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPut
        return polygoat_1.polygoat(function (done) {
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
        return polygoat_1.polygoat(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Puts a subscription to a resource
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Resource.prototype.putSubscription = function (callback) {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameResourcePathPut
        return polygoat_1.polygoat(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Deletes a resource's subscription
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Resource.prototype.deleteSubscription = function (callback) {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameResourcePathDelete
        return polygoat_1.polygoat(function (done) {
            done(null, null);
        }, callback);
    };
    return Resource;
}());
exports.Resource = Resource;
