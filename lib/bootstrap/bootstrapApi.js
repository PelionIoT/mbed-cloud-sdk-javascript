"use strict";
/*
 * Mbed Cloud JavaScript SDK
 * Copyright Arm Limited 2018
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
var functions_1 = require("../common/functions");
var endpoints_1 = require("./endpoints");
var preSharedKeyAdapter_1 = require("./models/preSharedKeyAdapter");
var BootstrapApi = /** @class */ (function () {
    /**
     * @param options Connection objects
     */
    function BootstrapApi(options) {
        this._endpoints = new endpoints_1.Endpoints(options);
    }
    BootstrapApi.prototype.addPsk = function (preSharedKey, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.bootstrap.uploadPreSharedKey(preSharedKeyAdapter_1.mapToSpec(preSharedKey), resultsFn);
        }, function (_data, done) {
            done(null, preSharedKeyAdapter_1.stripToken(preSharedKey, _this));
        }, callback);
    };
    BootstrapApi.prototype.getPsk = function (preSharedKey, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.bootstrap.getPreSharedKey(preSharedKey, resultsFn);
        }, function (data, done) {
            done(null, preSharedKeyAdapter_1.mapToSDK(data, _this));
        }, callback);
    };
    BootstrapApi.prototype.deletePsk = function (preSharedKey, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.bootstrap.deletePreSharedKey(preSharedKey, resultsFn);
        }, function (_data, done) {
            done(null, null);
        }, callback);
    };
    BootstrapApi.prototype.getLastApiMetadata = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            done(null, _this._endpoints.getLastMeta());
        }, callback);
    };
    return BootstrapApi;
}());
exports.BootstrapApi = BootstrapApi;

//# sourceMappingURL=bootstrapApi.js.map
