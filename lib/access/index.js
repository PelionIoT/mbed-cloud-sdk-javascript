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
var account_1 = require("./account");
var user_1 = require("./user");
var apiKey_1 = require("./apiKey");
/**
 * ## Access API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbed = require("mbed-cloud-sdk");
 *
 * var access = new mbed.AccessApi({
 *     apiKey: "<mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/access.min.js"></script>
 *
 * <script>
 *     var access = new mbed.AccessApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 */
var AccessApi = (function () {
    /**
    * @param options connection options
    */
    function AccessApi(options) {
        this._endpoints = new endpoints_1.Endpoints(options);
    }
    AccessApi.prototype.getAccountDetails = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.developer.getMyAccountInfo("limits", function (error, data) {
                if (error)
                    return done(error);
                done(null, account_1.Account.map(data, _this));
            });
        }, callback);
    };
    AccessApi.prototype.updateAccountDetails = function (options, callback) {
        var _this = this;
        var account = account_1.Account.reverseMap(options);
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.admin.updateMyAccount(account, function (error, data) {
                if (error)
                    return done(error);
                done(null, account_1.Account.map(data, _this));
            });
        }, callback);
    };
    AccessApi.prototype.listApiKeys = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include, attributes = _a.attributes;
        var owner = attributes ? attributes["owner"] : null;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.developer.getAllApiKeys(limit, after, order, functions_1.encodeInclude(include), owner, function (error, data) {
                if (error)
                    return done(error);
                var keys = data.data.map(function (key) {
                    return apiKey_1.ApiKey.map(key, _this);
                });
                done(null, functions_1.mapListResponse(data, keys));
            });
        }, callback);
    };
    AccessApi.prototype.getApiKey = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.asyncStyle(function (done) {
            if (options.id) {
                _this._endpoints.developer.getApiKey(options.id, function (error, data) {
                    if (error)
                        return done(error);
                    done(null, apiKey_1.ApiKey.map(data, _this));
                });
            }
            else {
                _this._endpoints.developer.getMyApiKey(function (error, data) {
                    if (error)
                        return done(error);
                    done(null, apiKey_1.ApiKey.map(data, _this));
                });
            }
        }, callback);
    };
    AccessApi.prototype.addApiKey = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.developer.createApiKey(options, function (error, data) {
                if (error)
                    return done(error);
                var key = apiKey_1.ApiKey.map(data, _this);
                done(null, key);
            });
        }, callback);
    };
    AccessApi.prototype.updateApiKey = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            if (options.id) {
                _this._endpoints.developer.updateApiKey(options.id, options, function (error, data) {
                    if (error)
                        return done(error);
                    done(null, apiKey_1.ApiKey.map(data, _this));
                });
            }
            else {
                _this._endpoints.developer.updateMyApiKey(options, function (error, data) {
                    if (error)
                        return done(error);
                    done(null, apiKey_1.ApiKey.map(data, _this));
                });
            }
        }, callback);
    };
    AccessApi.prototype.deleteApiKey = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.developer.deleteApiKey(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    AccessApi.prototype.listUsers = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include, attributes = _a.attributes;
        var filter = functions_1.encodeAttributes(attributes);
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.admin.getAllUsers(limit, after, order, functions_1.encodeInclude(include), filter, function (error, data) {
                if (error)
                    return done(error);
                var users = data.data.map(function (user) {
                    return user_1.User.map(user, _this);
                });
                done(null, functions_1.mapListResponse(data, users));
            });
        }, callback);
    };
    AccessApi.prototype.getUser = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.admin.getUser(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, user_1.User.map(data, _this));
            });
        }, callback);
    };
    AccessApi.prototype.addUser = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            var apiUser = user_1.User.reverseMap(options);
            _this._endpoints.admin.createUser(apiUser, "create", function (error, data) {
                if (error)
                    return done(error);
                done(null, user_1.User.map(data, _this));
            });
        }, callback);
    };
    AccessApi.prototype.updateUser = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            var apiUser = user_1.User.reverseMap(options);
            _this._endpoints.admin.updateUser(options.id, apiUser, function (error, data) {
                if (error)
                    return done(error);
                done(null, user_1.User.map(data, _this));
            });
        }, callback);
    };
    AccessApi.prototype.deleteUser = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.admin.deleteUser(options.id, options.force, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    return AccessApi;
}());
exports.AccessApi = AccessApi;
