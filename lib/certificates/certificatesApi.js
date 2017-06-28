"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../common/functions");
var listResponse_1 = require("../common/listResponse");
var endpoints_1 = require("./endpoints");
var certificateAdapter_1 = require("./models/certificateAdapter");
/**
 * ## Certificates API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbedCloudSDK = require("mbed-cloud-sdk");
 *
 * var certificates = new mbedCloudSDK.CertificatesApi({
 *     apiKey: "<mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/certificates.min.js"></script>
 *
 * <script>
 *     var certificates = new mbedCloudSDK.CertificatesApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 */
var CertificatesApi = (function () {
    /**
     * @param options connection options
     */
    function CertificatesApi(options) {
        this._endpoints = new endpoints_1.Endpoints(options);
    }
    CertificatesApi.prototype.extendCertificate = function (iamCert, done) {
        var _this = this;
        var dataFn = null;
        if (iamCert.service === "bootstrap")
            dataFn = this._endpoints.server.v3ServerCredentialsBootstrapGet;
        if (iamCert.service === "lwm2m")
            dataFn = this._endpoints.server.v3ServerCredentialsLwm2mGet;
        if (dataFn) {
            dataFn.call(this._endpoints.server, "", function (error, data) {
                if (error)
                    return done(error);
                var certificate = certificateAdapter_1.CertificateAdapter.mapServerCertificate(iamCert, _this, data);
                done(null, certificate);
            });
        }
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
            _this._endpoints.accountDeveloper.getAllCertificates(limit, after, order, functions_1.encodeInclude(include), serviceEq, functions_1.extractFilter(filter, "expires"), executionMode, functions_1.extractFilter(filter, "ownerId"), resultsFn);
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
    CertificatesApi.prototype.addCertificate = function (certificate, callback) {
        var _this = this;
        function isCert(cert) {
            return cert.type !== undefined && cert.type !== "developer";
        }
        return functions_1.apiWrapper(function (resultsFn) {
            if (isCert(certificate))
                _this._endpoints.admin.addCertificate(certificateAdapter_1.CertificateAdapter.reverseMap(certificate), resultsFn);
            else
                _this._endpoints.certDeveloper.v3DeveloperCertificatesPost("", certificateAdapter_1.CertificateAdapter.reverseDeveloperMap(certificate), resultsFn);
        }, function (data, done) {
            if (isCert(certificate))
                _this.extendCertificate(data, done);
            else {
                _this._endpoints.accountDeveloper.getCertificate(data.id, function (error, certData) {
                    if (error)
                        return done(error, null);
                    var certificate = certificateAdapter_1.CertificateAdapter.mapDeveloperCertificate(certData, _this, data);
                    done(null, certificate);
                });
            }
        }, callback);
    };
    CertificatesApi.prototype.updateCertificate = function (certificate, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.accountDeveloper.updateCertificate(certificate.id, certificateAdapter_1.CertificateAdapter.reverseMap(certificate), resultsFn);
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
    return CertificatesApi;
}());
exports.CertificatesApi = CertificatesApi;
