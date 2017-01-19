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
var pg = require("polygoat");
var endpoints_1 = require("./endpoints");
var developerCertificate_1 = require("./developerCertificate");
/**
 * Root Development API
 */
var DevelopmentApi = (function () {
    /**
     * @param options connection options
     */
    function DevelopmentApi(options) {
        DevelopmentApi._endpoints = new endpoints_1.Endpoints(options);
    }
    DevelopmentApi.prototype.addCertificate = function (options, callback) {
        var body = {
            pub_key: options.publicKey
        };
        return pg(function (done) {
            DevelopmentApi._endpoints.development.v3DeveloperCertificatePost("", body, function (error, data) {
                if (error)
                    return done(error);
                var cert = developerCertificate_1.DeveloperCertificate.map(data);
                done(null, cert);
            });
        }, callback);
    };
    DevelopmentApi.prototype.getCertificate = function (callback) {
        return pg(function (done) {
            DevelopmentApi._endpoints.development.v3DeveloperCertificateGet("", function (error, data) {
                if (error)
                    return done(error);
                var cert = developerCertificate_1.DeveloperCertificate.map(data);
                done(null, cert);
            });
        }, callback);
    };
    DevelopmentApi.prototype.deleteCertificate = function (callback) {
        return pg(function (done) {
            DevelopmentApi._endpoints.development.v3DeveloperCertificateDelete("", function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    return DevelopmentApi;
}());
exports.DevelopmentApi = DevelopmentApi;
