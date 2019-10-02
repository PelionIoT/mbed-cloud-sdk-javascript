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
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../common/functions");
var listResponse_1 = require("../common/listResponse");
var endpoints_1 = require("./endpoints");
var certificateAdapter_1 = require("./models/certificateAdapter");
/**
 * ## Certificates API
 * The API can be initalized with a .env file in the working directory with the following values
 *
 * MBED_CLOUD_SDK_API_KEY=<Pelion DM API Key>
 *
 * and optionally
 *
 * MBED_CLOUD_SDK_HOST=<your host> (defaults to https://api.us-east-1.mbedcloud.com)
 *
 * OR
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var PelionDMSDK = require("mbed-cloud-sdk");
 *
 * var certificates = new PelionDMSDK.CertificatesApi({
 *     apiKey: "<Pelion DM API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<pelion-dm-sdk>/bundles/certificates.min.js"></script>
 *
 * <script>
 *     var certificates = new MbedCloudSDK.CertificatesApi({
 *         apiKey: "<Pelion DM API Key>"
 *     });
 * </script>
 * ```
 */
var CertificatesApi = /** @class */ (function () {
    /**
     * @param options connection options
     */
    function CertificatesApi(options) {
        this._endpoints = new endpoints_1.Endpoints(options);
    }
    CertificatesApi.prototype.extendCertificate = function (iamCert, done) {
        var _this = this;
        if (iamCert.device_execution_mode === 1) {
            // Developer certificate
            this._endpoints.connector.getDeveloperCertificate(iamCert.id, "", function (error, data) {
                if (error) {
                    return done(error, null);
                }
                var certificate = certificateAdapter_1.CertificateAdapter.mapDeveloperCertificate(iamCert, _this, data);
                done(null, certificate);
            });
            return;
        }
        var credentials = null;
        this._endpoints.serverCredentials.getAllServerCredentials("", function (error, data) {
            if (error) {
                return done(error, null);
            }
            if (iamCert.service === "bootstrap") {
                credentials = data.bootstrap;
            }
            if (iamCert.service === "lwm2m") {
                credentials = data.lwm2m;
            }
            var certificate = certificateAdapter_1.CertificateAdapter.mapServerCertificate(iamCert, _this, credentials);
            done(null, certificate);
        });
    };
    CertificatesApi.prototype.listCertificates = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include, filter = _a.filter;
            var type = functions_1.extractFilter(filter, "type");
            var serviceEq = type === "developer" ? "bootstrap" : type;
            var executionMode = type === "developer" ? 1 : null;
            var typeNeq = functions_1.extractFilter(filter, "typeNeq");
            var executionModeNeq = typeNeq === "developer" ? 0 : 1;
            _this._endpoints.accountDeveloper.getAllCertificates(limit, after, order, functions_1.encodeInclude(include), functions_1.extractFilter(filter, "name"), serviceEq, functions_1.extractFilter(filter, "expires"), executionMode, executionModeNeq, functions_1.extractFilter(filter, "ownerId"), functions_1.extractFilter(filter, "enrollmentMode"), functions_1.extractFilter(filter, "issuer"), functions_1.extractFilter(filter, "subject"), resultsFn);
        }, function (data, done) {
            var certificates;
            if (data.data && data.data.length) {
                certificates = data.data.map(function (certificate) {
                    return certificateAdapter_1.CertificateAdapter.mapCertificate(certificate, _this);
                });
            }
            done(null, new listResponse_1.ListResponse(data, certificates));
        }, callback);
    };
    CertificatesApi.prototype.getCertificate = function (certificateId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.accountDeveloper.getCertificate(certificateId, resultsFn);
        }, function (data, done) {
            _this.extendCertificate(data, done);
        }, callback);
    };
    CertificatesApi.prototype.addDeveloperCertificate = function (certificate, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.connector.createDeveloperCertificate("", certificateAdapter_1.CertificateAdapter.reverseDeveloperMap(certificate), resultsFn);
        }, function (data, done) {
            _this._endpoints.accountDeveloper.getCertificate(data.id, function (error, certData) {
                if (error) {
                    return done(error, null);
                }
                var cert = certificateAdapter_1.CertificateAdapter.mapDeveloperCertificate(certData, _this, data);
                done(null, cert);
            });
        }, callback);
    };
    CertificatesApi.prototype.addCertificate = function (certificate, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.admin.addCertificate(certificateAdapter_1.CertificateAdapter.reverseMap(certificate), resultsFn);
        }, function (data, done) {
            _this.extendCertificate(data, done);
        }, callback);
    };
    CertificatesApi.prototype.updateCertificate = function (certificate, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.accountDeveloper.updateCertificate(certificate.id, certificateAdapter_1.CertificateAdapter.reverseUpdateMap(certificate), resultsFn);
        }, function (data, done) {
            _this.extendCertificate(data, done);
        }, callback);
    };
    CertificatesApi.prototype.deleteCertificate = function (certificateId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.accountDeveloper.deleteCertificate(certificateId, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    CertificatesApi.prototype.getLastApiMetadata = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            done(null, _this._endpoints.getLastMeta());
        }, callback);
    };
    return CertificatesApi;
}());
exports.CertificatesApi = CertificatesApi;
//# sourceMappingURL=certificatesApi.js.map