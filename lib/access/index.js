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
var data_1 = require("../helpers/data");
var endpoints_1 = require("./endpoints");
var account_1 = require("./account");
var certificate_1 = require("./certificate");
var user_1 = require("./user");
/**
* Root Access API
*/
var AccessApi = (function () {
    /**
    * @param options connection options
    */
    function AccessApi(options) {
        AccessApi._endpoints = new endpoints_1.Endpoints(options);
    }
    AccessApi.prototype.getAccount = function (callback) {
        return pg(function (done) {
            AccessApi._endpoints.developer.getMyAccountInfo(null, function (error, data) {
                if (error)
                    return done(error);
                done(null, account_1.Account.map(data));
            });
        }, callback);
    };
    AccessApi.prototype.listUsers = function (options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var limit = options.limit, after = options.after, order = options.order, include = options.include, filter = options.filter;
        return pg(function (done) {
            AccessApi._endpoints.admin.getAllUsers(limit, after, order, data_1.encodeInclude(include), filter, function (error, data) {
                if (error)
                    return done(error);
                var users = data.data.map(function (user) {
                    return user_1.User.map(user);
                });
                done(null, data_1.mapListResponse(data, users));
            });
        }, callback);
    };
    AccessApi.prototype.listCertificates = function (options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var limit = options.limit, after = options.after, order = options.order, include = options.include, filter = options.filter;
        return pg(function (done) {
            AccessApi._endpoints.admin.getAllCertificates(limit, after, order, data_1.encodeInclude(include), filter, function (error, data) {
                if (error)
                    return done(error);
                var certificates = data.data.map(function (certificate) {
                    return certificate_1.Certificate.map(certificate);
                });
                done(null, data_1.mapListResponse(data, certificates));
            });
        }, callback);
    };
    return AccessApi;
}());
exports.AccessApi = AccessApi;
