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
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../../common/functions");
/**
 * Connected Device
 */
var ConnectedDevice = /** @class */ (function () {
    function ConnectedDevice(init, _api) {
        this._api = _api;
        for (var key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }
    ConnectedDevice.prototype.listResources = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.listResources(_this.id, done);
        }, callback);
    };
    ConnectedDevice.prototype.listSubscriptions = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.listDeviceSubscriptions(_this.id, done);
        }, callback);
    };
    ConnectedDevice.prototype.deleteSubscriptions = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.deleteDeviceSubscriptions(_this.id, done);
        }, callback);
    };
    ConnectedDevice.prototype.getResourceValue = function (path, cacheOnly, noResponse, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.getResourceValue(_this.id, path, cacheOnly, noResponse, done);
        }, callback);
    };
    ConnectedDevice.prototype.setResourceValue = function (path, value, noResponse, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.setResourceValue(_this.id, path, value, noResponse, done);
        }, callback);
    };
    ConnectedDevice.prototype.executeResource = function (path, functionName, noResponse, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.executeResource(_this.id, path, functionName, noResponse, done);
        }, callback);
    };
    ConnectedDevice.prototype.getResourceSubscription = function (path, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.getResourceSubscription(_this.id, path, done);
        }, callback);
    };
    ConnectedDevice.prototype.addResourceSubscription = function (path, notifyFn, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.addResourceSubscription(_this.id, path, notifyFn, done);
        }, callback);
    };
    ConnectedDevice.prototype.deleteResourceSubscription = function (path, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.deleteResourceSubscription(_this.id, path, done);
        }, callback);
    };
    ConnectedDevice.prototype.deleteResource = function (path, noResponse, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.deleteResource(_this.id, path, noResponse, done);
        }, callback);
    };
    return ConnectedDevice;
}());
exports.ConnectedDevice = ConnectedDevice;
