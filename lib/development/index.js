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
var api_1 = require("./api");
/**
 * Root Development object
 */
var Development = (function () {
    /**
     * @param options connection options
     */
    function Development(options) {
        this._api = new api_1.Api(options);
    }
    Development.prototype.map = function (from, to) {
        to = to || {};
        to.created_at = from.created_at;
        to.etag = from.etag;
        to.id = from.id;
        to.pub_key = from.pub_key;
        return to;
    };
    Development.prototype.addCertificate = function (options, callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.development.v3DeveloperCertificatePost("", options, function (error, data) {
                if (error)
                    return done(error);
                var cert = _this.map(data);
                done(null, cert);
            });
        }, callback);
    };
    Development.prototype.getCertificate = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.development.v3DeveloperCertificateGet("", function (error, data) {
                if (error)
                    return done(error);
                var cert = _this.map(data);
                done(null, cert);
            });
        }, callback);
    };
    Development.prototype.deleteCertificate = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.development.v3DeveloperCertificateDelete("", function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    return Development;
}());
exports.Development = Development;
