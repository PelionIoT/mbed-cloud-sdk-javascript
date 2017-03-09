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
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../common/functions");
var endpoints_1 = require("./endpoints");
var certificate_1 = require("./certificate");
/**
 * ## Certificates API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbed = require("mbed-cloud-sdk");
 *
 * var certificates = new mbed.CertificatesApi({
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
 *     var certificates = new mbed.CertificatesApi({
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
        var certificate = certificate_1.Certificate.map(iamCert, this);
        switch (certificate.type) {
            case "developer":
                this._endpoints.developer.v3DeveloperCertificatesIdGet(certificate.id, "", function (error, data) {
                    if (error)
                        return done(error);
                    certificate_1.Certificate.mapDeveloperExtension(certificate, data);
                });
                break;
            case "bootstrap":
                this._endpoints.server.v3ServerCredentialsBootstrapGet("", function (error, data) {
                    if (error)
                        return done(error);
                    certificate_1.Certificate.mapExtension(certificate, data);
                });
                break;
            case "lwm2m":
                this._endpoints.server.v3ServerCredentialsLwm2mGet("", function (error, data) {
                    if (error)
                        return done(error);
                    certificate_1.Certificate.mapExtension(certificate, data);
                });
                break;
        }
        done(null, certificate);
    };
    CertificatesApi.prototype.listCertificates = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include, attributes = _a.attributes;
        var type = attributes ? attributes["type"] : "developer";
        var serviceEq = type === "developer" ? "bootstrap" : type;
        var executionMode = type === "developer" ? 1 : 0;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.admin.getAllCertificates(limit, after, order, functions_1.encodeInclude(include), serviceEq, 0, executionMode, function (error, data) {
                if (error)
                    return done(error);
                var certificates = data.data.map(function (certificate) {
                    return certificate_1.Certificate.map(certificate, _this);
                });
                done(null, functions_1.mapListResponse(data, certificates));
            });
        }, callback);
    };
    CertificatesApi.prototype.getCertificate = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.admin.getCertificate(options.id, function (error, data) {
                if (error)
                    return done(error);
                _this.extendCertificate(data, done);
            });
        }, callback);
    };
    CertificatesApi.prototype.addCertificate = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            function isCert(cert) {
                return cert.type !== undefined;
            }
            if (isCert(options)) {
                _this._endpoints.admin.addCertificate(certificate_1.Certificate.reverseIamMap(options), function (error, data) {
                    if (error)
                        return done(error);
                    _this.extendCertificate(data, done);
                });
            }
            else {
                _this._endpoints.developer.v3DeveloperCertificatesPost("", certificate_1.Certificate.reverseCaMap(options), function (error, caData) {
                    if (error)
                        return done(error);
                    _this._endpoints.admin.getCertificate(caData.id, function (error, data) {
                        if (error)
                            return done(error);
                        var certificate = certificate_1.Certificate.map(data, _this);
                        certificate_1.Certificate.mapDeveloperExtension(certificate, caData);
                        done(null, certificate);
                    });
                });
            }
        }, callback);
    };
    CertificatesApi.prototype.updateCertificate = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.admin.updateCertificate(options.id, certificate_1.Certificate.reverseIamMap(options), function (error, data) {
                if (error)
                    return done(error);
                _this.extendCertificate(data, done);
            });
        }, callback);
    };
    CertificatesApi.prototype.deleteCertificate = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.admin.deleteCertificate(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    return CertificatesApi;
}());
exports.CertificatesApi = CertificatesApi;
