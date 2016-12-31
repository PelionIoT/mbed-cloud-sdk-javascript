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
var developer_certificate_1 = require("../_api/developer_certificate");
/**
* Root Account object
*/
var Development = (function () {
    /**
    * @param options Options object
    */
    function Development(options) {
        this._api = new developer_certificate_1.DefaultApi();
        //        if (options.host) this.client.basePath = options.host;
        if (options.accessKey)
            this._api.setApiKey(developer_certificate_1.DefaultApiApiKeys.Bearer, "Bearer " + options.accessKey);
    }
    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    Development.prototype.postCertificate = function (options, callback) {
        var _this = this;
        var authorization = options.authorization, body = options.body;
        return pg(function (done) {
            _this._api.v3DeveloperCertificatePost(authorization, body, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    Development.prototype.getCertificate = function (options, callback) {
        var _this = this;
        var authorization = options.authorization;
        return pg(function (done) {
            _this._api.v3DeveloperCertificateGet(authorization, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    Development.prototype.deleteCertificate = function (options, callback) {
        var _this = this;
        var authorization = options.authorization;
        return pg(function (done) {
            _this._api.v3DeveloperCertificateDelete(authorization, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    return Development;
}());
exports.Development = Development;
