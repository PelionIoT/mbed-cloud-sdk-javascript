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
/**
 * Resource
 */
var Resource = (function (_super) {
    __extends(Resource, _super);
    function Resource(options, _api) {
        var _this = _super.call(this) || this;
        _this._api = _api;
        for (var key in options) {
            _this[key] = options[key];
        }
        _this.on("newListener", function (eventName, listener) {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                _this.addSubscription(function (error, asyncID) {
                    if (_this._api.polling) {
                        // record this resource at this path for notifications
                        _this._api._resourceSubs[_this.deviceId + _this.path] = _this;
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
                    delete _this._api._resourceSubs[_this.deviceId + _this.path];
                    _this.deleteSubscription();
                }
            }
        });
        return _this;
    }
    Resource.map = function (from, deviceId, api) {
        var type = {
            contentType: from.type,
            observable: from.obs,
            type: from.rt,
            path: from.uri,
            deviceId: deviceId
        };
        return new Resource(type, api);
    };
    Resource.prototype.getValue = function (options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var cacheOnly = options.cacheOnly, noResponse = options.noResponse;
        return this._api.getResourceValue({
            id: this.deviceId,
            path: this.path,
            cacheOnly: cacheOnly,
            noResponse: noResponse
        }, callback);
    };
    Resource.prototype.setValue = function (options, callback) {
        var value = options.value, noResponse = options.noResponse;
        return this._api.setResourceValue({
            id: this.deviceId,
            path: this.path,
            value: value,
            noResponse: noResponse
        }, callback);
    };
    Resource.prototype.execute = function (options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var fn = options.fn, noResponse = options.noResponse;
        return this._api.executeResource({
            id: this.deviceId,
            path: this.path,
            fn: fn,
            noResponse: noResponse
        }, callback);
    };
    Resource.prototype.getSubscription = function (callback) {
        var _this = this;
        return pg(function (done) {
            if (!_this.observable)
                done(null, null);
            _this._api.getResourceSubscription({
                id: _this.deviceId,
                path: _this.path
            }, done);
        }, callback);
    };
    Resource.prototype.addSubscription = function (callback) {
        return this._api.addResourceSubscription({
            id: this.deviceId,
            path: this.path
        }, callback);
    };
    Resource.prototype.deleteSubscription = function (callback) {
        return this._api.deleteResourceSubscription({
            id: this.deviceId,
            path: this.path
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
