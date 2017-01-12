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
var user_1 = require("./user");
var certificate_1 = require("./certificate");
/**
* Root Account object
*/
var Access = (function () {
    /**
    * @param options Options object
    */
    function Access(options) {
        this._api = new api_1.Api(options);
    }
    Access.prototype.getAccountDetails = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.developer.getMyAccountInfo(null, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    /**
    * Gets a list of currently registered endpoints
    * @param options Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    Access.prototype.listUsers = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var limit = options.limit, after = options.after, order = options.order, include = options.include, filter = options.filter;
        return pg(function (done) {
            _this._api.admin.getAllUsers(limit, after, order, include, filter, function (error, data) {
                if (error)
                    return done(error);
                /*
                { object: 'list',
                 limit: 50,
                 order: 'ASC',
                 total_count: 23,
                 has_more: false,
                 data:
                 */
                var users = data.data.map(function (user) {
                    return new user_1.User(_this._api, user);
                });
                done(null, users);
            });
        }, callback);
    };
    /**
    * Gets a list of certificates
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    Access.prototype.listCertificates = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var limit = options.limit, after = options.after, order = options.order, include = options.include, filter = options.filter;
        return pg(function (done) {
            _this._api.admin.getAllCertificates(limit, after, order, include, filter, function (error, data) {
                if (error)
                    return done(error);
                var certificates = data.data.map(function (certificate) {
                    return new certificate_1.Certificate(_this._api, certificate);
                });
                done(null, certificates);
            });
        }, callback);
    };
    return Access;
}());
exports.Access = Access;
