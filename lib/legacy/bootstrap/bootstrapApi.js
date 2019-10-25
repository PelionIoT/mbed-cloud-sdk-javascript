"use strict";
/*
 * Pelion Device Management JavaScript SDK
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
var listResponse_1 = require("../common/listResponse");
var BootstrapApi = /** @class */ (function () {
    /**
     * The API can be initalized with a .env file in the wroking directory with the following values
     *
     * MBED_CLOUD_SDK_API_KEY=<Pelion DM API Key>
     *
     * and optionally
     *
     * MBED_CLOUD_SDK_HOST=<your host> (defaults to https://api.us-east-1.mbedcloud.com)
     *
     * OR
     * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
     *
     * To create an instance of this API in [Node.js](https://nodejs.org):
     *
     * ```JavaScript
     * var PelionDMSDK = require("mbed-cloud-sdk");
     *
     * var bootstrap = new PelionDMSDK.BootstrapApi({
     *     apiKey: "<Pelion DM API Key>"
     * });
     * ```
     *
     * To create an instance of this API in the browser:
     *
     * ```html
     * <script src="<pelion-dm-sdk>/bundles/update.min.js"></script>
     *
     * <script>
     *     var bootstrap = new MbedCloudSDK.BootstrapApi({
     *         apiKey: "<Pelion DM API Key>"
     *     });
     * </script>
     * ```
     * @param options Connection objects
     */
    function BootstrapApi(options) {
        this._endpoints = new endpoints_1.Endpoints(options);
    }
    BootstrapApi.prototype.listPsks = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var _a = options, limit = _a.limit, after = _a.after;
            _this._endpoints.bootstrap.listPreSharedKeys(limit, after, resultsFn);
        }, function (data, done) {
            var keys;
            if (data && data.data && data.data.length) {
                keys = data.data.map(function (key) {
                    return preSharedKeyAdapter_1.mapToSDK(key, _this);
                });
            }
            done(null, new listResponse_1.ListResponse(data, keys));
        }, callback);
    };
    BootstrapApi.prototype.addPsk = function (preSharedKey, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.bootstrap.uploadPreSharedKey(preSharedKeyAdapter_1.mapToSpec(preSharedKey), resultsFn);
        }, function (_data, done) {
            done(null, preSharedKeyAdapter_1.mapFrom(preSharedKey, _this));
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