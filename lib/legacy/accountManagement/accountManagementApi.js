"use strict";
/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
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
var accountAdapter_1 = require("./models/accountAdapter");
var apiKeyAdapter_1 = require("./models/apiKeyAdapter");
var userAdapter_1 = require("./models/userAdapter");
var groupAdapter_1 = require("./models/groupAdapter");
/**
 * ## Account Management API
 *
 * The API can be initalized with a .env file in the wroking directory with the following values
 *
 * MBED_CLOUD_SDK_API_KEY=<Pelion DM API Key>
 *
 * and optionally
 *
 * MBED_CLOUD_SDK_HOST=<your host> (defaults to https://api.us-east-1.mbedcloud.com)
 *
 * OR
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var PelionDMSDK = require("mbed-cloud-sdk");
 *
 * var accounts = new PelionDMSDK.AccountManagementApi();
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<pelion-dm-sdk>/bundles/account-management.min.js"></script>
 *
 * <script>
 *     var accounts = new MbedCloudSDK.AccountManagementApi({
 *         apiKey: "<Pelion DM API Key>"
 *     });
 * </script>
 * ```
 */
var AccountManagementApi = /** @class */ (function () {
    /**
     * @param options connection options
     */
    function AccountManagementApi(options) {
        this._endpoints = new endpoints_1.Endpoints(options);
    }
    AccountManagementApi.prototype.getAccount = function (callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.developer.getMyAccountInfo("limits, policies", "", resultsFn);
        }, function (data, done) {
            done(null, accountAdapter_1.AccountAdapter.map(data, _this));
        }, callback);
    };
    AccountManagementApi.prototype.updateAccount = function (account, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.admin.updateMyAccount(accountAdapter_1.AccountAdapter.reverseMap(account), resultsFn);
        }, function (data, done) {
            done(null, accountAdapter_1.AccountAdapter.map(data, _this));
        }, callback);
    };
    AccountManagementApi.prototype.listApiKeys = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include, filter = _a.filter;
            _this._endpoints.developer.getAllApiKeys(limit, after, order, functions_1.encodeInclude(include), functions_1.extractFilter(filter, "apiKey"), functions_1.extractFilter(filter, "ownerId"), resultsFn);
        }, function (data, done) {
            var keys;
            if (data && data.data && data.data.length) {
                keys = data.data.map(function (key) {
                    return apiKeyAdapter_1.ApiKeyAdapter.map(key, _this);
                });
            }
            done(null, new listResponse_1.ListResponse(data, keys));
        }, callback);
    };
    AccountManagementApi.prototype.getApiKey = function (apiKeyId, callback) {
        var _this = this;
        if (typeof apiKeyId === "function") {
            callback = apiKeyId;
            apiKeyId = null;
        }
        return functions_1.apiWrapper(function (resultsFn) {
            if (apiKeyId) {
                _this._endpoints.developer.getApiKey(apiKeyId, resultsFn);
            }
            else {
                _this._endpoints.developer.getMyApiKey(resultsFn);
            }
        }, function (data, done) {
            done(null, apiKeyAdapter_1.ApiKeyAdapter.map(data, _this));
        }, callback);
    };
    AccountManagementApi.prototype.addApiKey = function (apiKey, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.developer.createApiKey(apiKeyAdapter_1.ApiKeyAdapter.addMap(apiKey), resultsFn);
        }, function (data, done) {
            done(null, apiKeyAdapter_1.ApiKeyAdapter.map(data, _this));
        }, callback);
    };
    AccountManagementApi.prototype.updateApiKey = function (apiKey, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.developer.updateApiKey(apiKey.id, apiKeyAdapter_1.ApiKeyAdapter.updateMap(apiKey), resultsFn);
        }, function (data, done) {
            done(null, apiKeyAdapter_1.ApiKeyAdapter.map(data, _this));
        }, callback);
    };
    AccountManagementApi.prototype.deleteApiKey = function (apiKeyId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.developer.deleteApiKey(apiKeyId, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    AccountManagementApi.prototype.listUsers = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include, filter = _a.filter;
            _this._endpoints.admin.getAllUsers(limit, after, order, functions_1.encodeInclude(include), functions_1.extractFilter(filter, "email"), functions_1.extractFilter(filter, "status"), functions_1.extractFilter(filter, "status", "$in"), functions_1.extractFilter(filter, "status", "$nin"), resultsFn);
        }, function (data, done) {
            var users;
            if (data.data && data.data.length) {
                users = data.data.map(function (user) {
                    return userAdapter_1.UserAdapter.map(user, _this);
                });
            }
            done(null, new listResponse_1.ListResponse(data, users));
        }, callback);
    };
    AccountManagementApi.prototype.getUser = function (userId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.admin.getUser(userId, "", resultsFn);
        }, function (data, done) {
            done(null, userAdapter_1.UserAdapter.map(data, _this));
        }, callback);
    };
    AccountManagementApi.prototype.addUser = function (user, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.admin.createUser(userAdapter_1.UserAdapter.addMap(user), "create", resultsFn);
        }, function (data, done) {
            done(null, userAdapter_1.UserAdapter.map(data, _this));
        }, callback);
    };
    AccountManagementApi.prototype.updateUser = function (user, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.admin.updateUser(user.id, userAdapter_1.UserAdapter.updateMap(user), resultsFn);
        }, function (data, done) {
            done(null, userAdapter_1.UserAdapter.map(data, _this));
        }, callback);
    };
    AccountManagementApi.prototype.deleteUser = function (userId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.admin.deleteUser(userId, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    AccountManagementApi.prototype.listGroups = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include, filter = _a.filter;
            _this._endpoints.developer.getAllGroups(limit, after, order, functions_1.encodeInclude(include), functions_1.extractFilter(filter, "name"), resultsFn);
        }, function (data, done) {
            var groups;
            if (data.data && data.data.length) {
                groups = data.data.map(function (group) {
                    return groupAdapter_1.GroupAdapter.map(group, _this);
                });
            }
            done(null, new listResponse_1.ListResponse(data, groups));
        }, callback);
    };
    AccountManagementApi.prototype.getGroup = function (groupId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.developer.getGroupSummary(groupId, resultsFn);
        }, function (data, done) {
            done(null, groupAdapter_1.GroupAdapter.map(data, _this));
        }, callback);
    };
    AccountManagementApi.prototype.listGroupUsers = function (groupId, options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include, filter = _a.filter;
            _this._endpoints.admin.getUsersOfGroup(groupId, limit, after, order, functions_1.encodeInclude(include), functions_1.extractFilter(filter, "status"), functions_1.extractFilter(filter, "status", "$in"), functions_1.extractFilter(filter, "status", "$nin"), resultsFn);
        }, function (data, done) {
            var users;
            if (data.data && data.data.length) {
                users = data.data.map(function (user) {
                    return userAdapter_1.UserAdapter.map(user, _this);
                });
            }
            done(null, new listResponse_1.ListResponse(data, users));
        }, callback);
    };
    AccountManagementApi.prototype.listGroupApiKeys = function (groupId, options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include;
            _this._endpoints.developer.getApiKeysOfGroup(groupId, limit, after, order, functions_1.encodeInclude(include), resultsFn);
        }, function (data, done) {
            var keys;
            if (data.data && data.data.length) {
                keys = data.data.map(function (key) {
                    return apiKeyAdapter_1.ApiKeyAdapter.map(key, _this);
                });
            }
            done(null, new listResponse_1.ListResponse(data, keys));
        }, callback);
    };
    AccountManagementApi.prototype.getLastApiMetadata = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            done(null, _this._endpoints.getLastMeta());
        }, callback);
    };
    return AccountManagementApi;
}());
exports.AccountManagementApi = AccountManagementApi;
//# sourceMappingURL=accountManagementApi.js.map