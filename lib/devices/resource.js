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
 * Resource
 */
var Resource = (function (_super) {
    __extends(Resource, _super);
    function Resource(_deviceId, options) {
        var _this = _super.call(this) || this;
        _this._deviceId = _deviceId;
        for (var key in options) {
            _this[key] = options[key];
        }
        _this.on("newListener", function (eventName, listener) {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                _this.addSubscription(function (error, asyncID) {
                    if (index_1.DevicesApi.polling) {
                        // record this resource at this path for notifications
                        index_1.DevicesApi.resourceSubs[_this._deviceId + _this.path] = _this;
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
                    delete index_1.DevicesApi.resourceSubs[_this._deviceId + _this.path];
                    _this.deleteSubscription();
                }
            }
        });
        return _this;
    }
    Resource.map = function (from, deviceId) {
        var type = {
            contentType: from.type,
            observable: from.obs,
            type: from.rt,
            path: from.uri
        };
        return new Resource(deviceId, type);
    };
    Resource.prototype.getValue = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var cacheOnly = options.cacheOnly, noResponse = options.noResponse;
        return pg(function (done) {
            index_1.DevicesApi._endpoints.resources.v2EndpointsEndpointNameResourcePathGet(_this._deviceId, _this.path, cacheOnly, noResponse, function (error, data) {
                if (error)
                    return done(error);
                var asyncID = data["async-response-id"];
                if (index_1.DevicesApi.polling && asyncID) {
                    index_1.DevicesApi.asyncFns[asyncID] = done;
                    return;
                }
                done(null, asyncID);
            });
        }, callback);
    };
    Resource.prototype.setValue = function (options, callback) {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPut
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    Resource.prototype.execute = function (options, callback) {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPost
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    Resource.prototype.getSubscription = function (callback) {
        var _this = this;
        return pg(function (done) {
            if (!_this.observable)
                done(null, null);
            index_1.DevicesApi._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathGet(_this._deviceId, _this.path, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    Resource.prototype.addSubscription = function (callback) {
        var _this = this;
        return pg(function (done) {
            index_1.DevicesApi._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathPut(_this._deviceId, _this.path, function (error, data) {
                if (error)
                    return done(error);
                var asyncID = data["async-response-id"];
                if (asyncID) {
                }
                done(null, asyncID || data);
            });
        }, callback);
    };
    Resource.prototype.deleteSubscription = function (callback) {
        var _this = this;
        return pg(function (done) {
            index_1.DevicesApi._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathDelete(_this._deviceId, _this.path, done);
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
