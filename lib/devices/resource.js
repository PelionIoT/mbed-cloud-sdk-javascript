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
var index_1 = require("./index");
/**
* Resource object
*/
var Resource = (function (_super) {
    __extends(Resource, _super);
    function Resource(_api, options) {
        var _this = _super.call(this) || this;
        _this._api = _api;
        for (var key in options) {
            _this[key] = options[key];
        }
        _this.on("newListener", function (eventName, listener) {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                _this.createSubscription(function (error, asyncID) {
                    if (index_1.Devices.polling) {
                        // record this resource at this path for notifications
                        index_1.Devices.resourceSubs[_this.device.id + _this.uri] = _this;
                    }
                    else {
                        // return the asyncID for use with webhooks
                        _this.emit(Resource.EVENT_NOTIFICATION, asyncID);
                    }
                });
            }
        });
        _this.on("removeListener", function (eventName, listener) {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                if (_this.listenerCount(Resource.EVENT_NOTIFICATION) === 0) {
                    // no-one is listening :(
                    delete index_1.Devices.resourceSubs[_this.device.id + _this.uri];
                    _this.deleteSubscription();
                }
            }
        });
        return _this;
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
            _this._api.resources.v2EndpointsEndpointNameResourcePathGet(_this.device.id, _this.uri, cacheOnly, noResp, function (error, data) {
                if (error)
                    return done(error);
                var asyncID = data["async-response-id"];
                if (index_1.Devices.polling && asyncID) {
                    index_1.Devices.asyncFns[asyncID] = done;
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
        var _this = this;
        return pg(function (done) {
            if (!_this.obs)
                done(null, null);
            _this._api.subscriptions.v2SubscriptionsEndpointNameResourcePathGet(_this.device.id, _this.uri, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    /**
    * Subscribe to a resource
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Resource.prototype.createSubscription = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.subscriptions.v2SubscriptionsEndpointNameResourcePathPut(_this.device.id, _this.uri, function (error, data) {
                if (error)
                    return done(error);
                var asyncID = data["async-response-id"];
                if (asyncID) {
                }
                done(null, asyncID || data);
            });
        }, callback);
    };
    /**
    * Deletes a resource's subscription
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Resource.prototype.deleteSubscription = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.subscriptions.v2SubscriptionsEndpointNameResourcePathDelete(_this.device.id, _this.uri, done);
        }, callback);
    };
    return Resource;
}(events_1.EventEmitter));
exports.Resource = Resource;
/**
* Resource notification event
* @event
*/
Resource.EVENT_NOTIFICATION = "notification";
