"use strict";
/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var functions_1 = require("../../common/functions");
/**
 * Resource
 */
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource(init, _api) {
        var _this = _super.call(this) || this;
        _this._api = _api;
        for (var key in init) {
            if (init.hasOwnProperty(key)) {
                _this[key] = init[key];
            }
        }
        _this.on("newListener", function (eventName) {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                _this.addSubscription(function (data) { return _this.emit(Resource.EVENT_NOTIFICATION, data); });
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
    Resource.prototype.addSubscription = function (notifyFn, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            if (!_this.observable) {
                return done(null, null);
            }
            _this._api.addResourceSubscription(_this.deviceId, _this.path, notifyFn, done);
        }, callback);
    };
    Resource.prototype.deleteSubscription = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.deleteResourceSubscription(_this.deviceId, _this.path, done);
        }, callback);
    };
    Resource.prototype.getValue = function (timeout, mimeType, callback) {
        var _this = this;
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        return functions_1.asyncStyle(function (done) {
            _this._api.getResourceValue(_this.deviceId, _this.path, timeout, mimeType, done);
        }, callback);
    };
    Resource.prototype.setValue = function (value, timeout, mimeType, callback) {
        var _this = this;
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        return functions_1.asyncStyle(function (done) {
            _this._api.setResourceValue(_this.deviceId, _this.path, value, timeout, mimeType, done);
        }, callback);
    };
    Resource.prototype.execute = function (payload, timeout, mimeType, accepts, callback) {
        var _this = this;
        if (typeof payload === "function") {
            callback = payload;
            payload = null;
        }
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof accepts === "function") {
            callback = accepts;
            accepts = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        return functions_1.asyncStyle(function (done) {
            _this._api.executeResource(_this.deviceId, _this.path, timeout, mimeType, accepts, payload, done);
        }, callback);
    };
    Resource.prototype.getSubscription = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            if (!_this.observable) {
                return done(null, false);
            }
            _this._api.getResourceSubscription(_this.deviceId, _this.path, done);
        }, callback);
    };
    /**
     * Resource notification event which returns the notification when handling notifications, otherwise an asyncId
     * @event
     */
    Resource.EVENT_NOTIFICATION = "notification";
    return Resource;
}(events_1.EventEmitter));
exports.Resource = Resource;
//# sourceMappingURL=resource.js.map