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
* Root Account object
*/
var Development = (function () {
    /**
    * @param options Options object
    */
    function Development(options) {
        this._api = new api_1.Api(options);
    }
    /**
    * Adds a developer certificate to the account (only one per account allowed).
    * @param callback
    * @returns Optional Promise
    */
    Development.prototype.postCertificate = function (options, callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.default.v3DeveloperCertificatePost("authorization", options, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    /**
    * Gets the developer certificate of the account.
    * @param callback
    * @returns Optional Promise
    */
    Development.prototype.getCertificate = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.default.v3DeveloperCertificateGet("options.authorization", function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    /**
    * Deletes the account's developer certificate (only one per account allowed).
    * @param callback
    * @returns Optional Promise
    */
    Development.prototype.deleteCertificate = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.default.v3DeveloperCertificateDelete("options.authorization", function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    return Development;
}());
exports.Development = Development;
