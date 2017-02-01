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
var functions_1 = require("../common/functions");
var endpoints_1 = require("./endpoints");
var account_1 = require("./account");
var certificate_1 = require("./certificate");
var user_1 = require("./user");
var apiKey_1 = require("./apiKey");
var group_1 = require("./group");
/**
 * Root Access API:
 * ----------------
 * Available, not implemented
 * access.activateUser
 * access.applyPasswordRecovery
 * access.getInvitedUser
 * access.getSelfEnrollingUser
 * access.registerAccount
 * access.requestPasswordRecovery
 * access.signup
 * access.verifySelfEnrollment
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
        return pg(function (done) {
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
        return pg(function (done) {
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
        var filter = functions_1.encodeAttributes(attributes);
        return pg(function (done) {
            _this._endpoints.developer.getAllApiKeys(limit, after, order, functions_1.encodeInclude(include), filter, owner, function (error, data) {
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
        return pg(function (done) {
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
        return pg(function (done) {
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
        return pg(function (done) {
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
        return pg(function (done) {
            _this._endpoints.developer.deleteApiKey(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    AccessApi.prototype.listCertificates = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include, attributes = _a.attributes;
        var filter = functions_1.encodeAttributes(attributes);
        return pg(function (done) {
            _this._endpoints.admin.getAllCertificates(limit, after, order, functions_1.encodeInclude(include), filter, function (error, data) {
                if (error)
                    return done(error);
                var certificates = data.data.map(function (certificate) {
                    return certificate_1.Certificate.map(certificate, _this);
                });
                done(null, functions_1.mapListResponse(data, certificates));
            });
        }, callback);
    };
    AccessApi.prototype.getCertificate = function (options, callback) {
        var _this = this;
        return pg(function (done) {
            _this._endpoints.admin.getCertificate(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, certificate_1.Certificate.map(data, _this));
            });
        }, callback);
    };
    AccessApi.prototype.addCertificate = function (options, callback) {
        var _this = this;
        return pg(function (done) {
            _this._endpoints.admin.addCertificate(certificate_1.Certificate.reverseMap(options), function (error, data) {
                if (error)
                    return done(error);
                done(null, certificate_1.Certificate.map(data, _this));
            });
        }, callback);
    };
    AccessApi.prototype.updateCertificate = function (options, callback) {
        var _this = this;
        return pg(function (done) {
            _this._endpoints.admin.updateCertificate(options.id, certificate_1.Certificate.reverseMap(options), function (error, data) {
                if (error)
                    return done(error);
                done(null, certificate_1.Certificate.map(data, _this));
            });
        }, callback);
    };
    AccessApi.prototype.deleteCertificate = function (options, callback) {
        var _this = this;
        return pg(function (done) {
            _this._endpoints.admin.deleteCertificate(options.id, function (error, data) {
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
        return pg(function (done) {
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
        return pg(function (done) {
            _this._endpoints.admin.getUser(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, user_1.User.map(data, _this));
            });
        }, callback);
    };
    AccessApi.prototype.addUser = function (options, callback) {
        var _this = this;
        return pg(function (done) {
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
        return pg(function (done) {
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
        return pg(function (done) {
            _this._endpoints.admin.deleteUser(options.id, options.force, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    AccessApi.prototype.listGroups = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include;
        return pg(function (done) {
            _this._endpoints.developer.getAllGroups(limit, after, order, functions_1.encodeInclude(include), function (error, data) {
                if (error)
                    return done(error);
                var groups = data.data.map(function (user) {
                    return group_1.Group.map(user);
                });
                done(null, functions_1.mapListResponse(data, groups));
            });
        }, callback);
    };
    return AccessApi;
}());
exports.AccessApi = AccessApi;
