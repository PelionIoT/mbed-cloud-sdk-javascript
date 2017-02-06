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
var functions_1 = require("../common/functions");
var endpoints_1 = require("./endpoints");
var developerCertificate_1 = require("./developerCertificate");
/**
 * ## Development API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbed = require("mbed-cloud-sdk");
 *
 * var development = new mbed.DevelopmentApi({
 *     apiKey: "<mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/devices.min.js"></script>
 *
 * <script>
 *     var development = new mbed.DevelopmentApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 */
var DevelopmentApi = (function () {
    /**
     * @param options connection options
     */
    function DevelopmentApi(options) {
        this._endpoints = new endpoints_1.Endpoints(options);
    }
    DevelopmentApi.prototype.addCertificate = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.development.v3DeveloperCertificatePost("", developerCertificate_1.DeveloperCertificate.reverseMap(options), function (error, data) {
                if (error)
                    return done(error);
                var cert = developerCertificate_1.DeveloperCertificate.map(data, _this);
                done(null, cert);
            });
        }, callback);
    };
    DevelopmentApi.prototype.getCertificate = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.development.v3DeveloperCertificateGet("", function (error, data) {
                if (error)
                    return done(error);
                var cert = developerCertificate_1.DeveloperCertificate.map(data, _this);
                done(null, cert);
            });
        }, callback);
    };
    DevelopmentApi.prototype.deleteCertificate = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.development.v3DeveloperCertificateDelete("", function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    return DevelopmentApi;
}());
exports.DevelopmentApi = DevelopmentApi;
