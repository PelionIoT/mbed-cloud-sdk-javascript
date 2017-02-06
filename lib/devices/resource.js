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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var functions_1 = require("../common/functions");
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
        _this.on("newListener", function (eventName) {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                _this.addSubscription({
                    fn: function (data) { return _this.emit(Resource.EVENT_NOTIFICATION, data); }
                }, function (error, asyncID) {
                    if (!error && !_this._api.handleNotifications) {
                        // return the asyncID for use with web hooks
                        _this.emit(Resource.EVENT_NOTIFICATION, asyncID);
                    }
                });
            }
        });
        _this.on("removeListener", function (eventName) {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                if (_this.listenerCount(Resource.EVENT_NOTIFICATION) === 0) {
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
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var cacheOnly = options.cacheOnly, noResponse = options.noResponse;
        return functions_1.asyncStyle(function (done) {
            _this._api.getResourceValue({
                id: _this.deviceId,
                path: _this.path,
                cacheOnly: cacheOnly,
                noResponse: noResponse
            }, done);
        }, callback);
    };
    Resource.prototype.setValue = function (options, callback) {
        var _this = this;
        var value = options.value, noResponse = options.noResponse;
        return functions_1.asyncStyle(function (done) {
            _this._api.setResourceValue({
                id: _this.deviceId,
                path: _this.path,
                value: value,
                noResponse: noResponse
            }, done);
        }, callback);
    };
    Resource.prototype.execute = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var fn = options.fn, noResponse = options.noResponse;
        return functions_1.asyncStyle(function (done) {
            _this._api.executeResource({
                id: _this.deviceId,
                path: _this.path,
                fn: fn,
                noResponse: noResponse
            }, done);
        }, callback);
    };
    Resource.prototype.getSubscription = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            if (!_this.observable)
                return done(null, false);
            _this._api.getResourceSubscription({
                id: _this.deviceId,
                path: _this.path
            }, done);
        }, callback);
    };
    Resource.prototype.addSubscription = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var fn = options.fn;
        return functions_1.asyncStyle(function (done) {
            if (!_this.observable)
                return done(null, null);
            _this._api.addResourceSubscription({
                id: _this.deviceId,
                path: _this.path,
                fn: fn
            }, done);
        }, callback);
    };
    Resource.prototype.deleteSubscription = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.deleteResourceSubscription({
                id: _this.deviceId,
                path: _this.path
            }, done);
        }, callback);
    };
    Resource.prototype.delete = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var noResponse = options.noResponse;
        return functions_1.asyncStyle(function (done) {
            _this._api.deleteDeviceResource({
                id: _this.deviceId,
                path: _this.path,
                noResponse: noResponse
            }, done);
        }, callback);
    };
    return Resource;
}(events_1.EventEmitter));
/**
 * Resource notification event which returns the notification when handling notifications, otherwise an asyncId
 * @event
 */
Resource.EVENT_NOTIFICATION = "notification";
exports.Resource = Resource;
