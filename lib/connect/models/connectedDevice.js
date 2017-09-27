"use strict";
/*
* Mbed Cloud JavaScript SDK
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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../../common/functions");
var device_1 = require("../../deviceDirectory/models/device");
/**
 * Connected Device
 */
var ConnectedDevice = /** @class */ (function (_super) {
    __extends(ConnectedDevice, _super);
    function ConnectedDevice(init, _connectApi) {
        var _this = _super.call(this) || this;
        _this._connectApi = _connectApi;
        for (var key in init) {
            if (init.hasOwnProperty(key)) {
                _this[key] = init[key];
            }
        }
        return _this;
    }
    ConnectedDevice.prototype.listResources = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._connectApi.listResources(_this.id, done);
        }, callback);
    };
    ConnectedDevice.prototype.listSubscriptions = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._connectApi.listDeviceSubscriptions(_this.id, done);
        }, callback);
    };
    ConnectedDevice.prototype.deleteSubscriptions = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._connectApi.deleteDeviceSubscriptions(_this.id, done);
        }, callback);
    };
    ConnectedDevice.prototype.getResourceValue = function (path, cacheOnly, noResponse, callback) {
        var _this = this;
        cacheOnly = cacheOnly || false;
        noResponse = noResponse || false;
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        if (typeof cacheOnly === "function") {
            callback = cacheOnly;
            cacheOnly = false;
        }
        return functions_1.asyncStyle(function (done) {
            _this._connectApi.getResourceValue(_this.id, path, cacheOnly, noResponse, done);
        }, callback);
    };
    ConnectedDevice.prototype.setResourceValue = function (path, value, noResponse, callback) {
        var _this = this;
        noResponse = noResponse || false;
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        return functions_1.asyncStyle(function (done) {
            _this._connectApi.setResourceValue(_this.id, path, value, noResponse, done);
        }, callback);
    };
    ConnectedDevice.prototype.executeResource = function (path, functionName, noResponse, callback) {
        var _this = this;
        noResponse = noResponse || false;
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        if (typeof functionName === "function") {
            callback = functionName;
            functionName = null;
        }
        return functions_1.asyncStyle(function (done) {
            _this._connectApi.executeResource(_this.id, path, functionName, noResponse, done);
        }, callback);
    };
    ConnectedDevice.prototype.getResourceSubscription = function (path, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._connectApi.getResourceSubscription(_this.id, path, done);
        }, callback);
    };
    ConnectedDevice.prototype.addResourceSubscription = function (path, notifyFn, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._connectApi.addResourceSubscription(_this.id, path, notifyFn, done);
        }, callback);
    };
    ConnectedDevice.prototype.deleteResourceSubscription = function (path, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._connectApi.deleteResourceSubscription(_this.id, path, done);
        }, callback);
    };
    ConnectedDevice.prototype.deleteResource = function (path, noResponse, callback) {
        var _this = this;
        noResponse = noResponse || false;
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        return functions_1.asyncStyle(function (done) {
            _this._connectApi.deleteResource(_this.id, path, noResponse, done);
        }, callback);
    };
    return ConnectedDevice;
}(device_1.Device));
exports.ConnectedDevice = ConnectedDevice;
