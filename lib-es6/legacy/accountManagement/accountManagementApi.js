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
import { asyncStyle, apiWrapper, encodeInclude, extractFilter } from "../common/functions";
import { ListResponse } from "../common/listResponse";
import { Endpoints } from "./endpoints";
import { AccountAdapter } from "./models/accountAdapter";
import { ApiKeyAdapter } from "./models/apiKeyAdapter";
import { UserAdapter } from "./models/userAdapter";
import { GroupAdapter } from "./models/groupAdapter";
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
export class AccountManagementApi {
    /**
     * @param options connection options
     */
    constructor(options) {
        this._endpoints = new Endpoints(options);
    }
    getAccount(callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.developer.getMyAccountInfo("limits, policies", "", resultsFn);
        }, (data, done) => {
            done(null, AccountAdapter.map(data, this));
        }, callback);
    }
    updateAccount(account, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.admin.updateMyAccount(AccountAdapter.reverseMap(account), resultsFn);
        }, (data, done) => {
            done(null, AccountAdapter.map(data, this));
        }, callback);
    }
    listApiKeys(options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, after, order, include, filter } = options;
            this._endpoints.developer.getAllApiKeys(limit, after, order, encodeInclude(include), extractFilter(filter, "apiKey"), extractFilter(filter, "ownerId"), resultsFn);
        }, (data, done) => {
            let keys;
            if (data && data.data && data.data.length) {
                keys = data.data.map(key => {
                    return ApiKeyAdapter.map(key, this);
                });
            }
            done(null, new ListResponse(data, keys));
        }, callback);
    }
    getApiKey(apiKeyId, callback) {
        if (typeof apiKeyId === "function") {
            callback = apiKeyId;
            apiKeyId = null;
        }
        return apiWrapper(resultsFn => {
            if (apiKeyId) {
                this._endpoints.developer.getApiKey(apiKeyId, resultsFn);
            }
            else {
                this._endpoints.developer.getMyApiKey(resultsFn);
            }
        }, (data, done) => {
            done(null, ApiKeyAdapter.map(data, this));
        }, callback);
    }
    addApiKey(apiKey, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.developer.createApiKey(ApiKeyAdapter.addMap(apiKey), resultsFn);
        }, (data, done) => {
            done(null, ApiKeyAdapter.map(data, this));
        }, callback);
    }
    updateApiKey(apiKey, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.developer.updateApiKey(apiKey.id, ApiKeyAdapter.updateMap(apiKey), resultsFn);
        }, (data, done) => {
            done(null, ApiKeyAdapter.map(data, this));
        }, callback);
    }
    deleteApiKey(apiKeyId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.developer.deleteApiKey(apiKeyId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    listUsers(options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, after, order, include, filter } = options;
            this._endpoints.admin.getAllUsers(limit, after, order, encodeInclude(include), extractFilter(filter, "email"), extractFilter(filter, "status"), extractFilter(filter, "status", "$in"), extractFilter(filter, "status", "$nin"), resultsFn);
        }, (data, done) => {
            let users;
            if (data.data && data.data.length) {
                users = data.data.map(user => {
                    return UserAdapter.map(user, this);
                });
            }
            done(null, new ListResponse(data, users));
        }, callback);
    }
    getUser(userId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.admin.getUser(userId, "", resultsFn);
        }, (data, done) => {
            done(null, UserAdapter.map(data, this));
        }, callback);
    }
    addUser(user, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.admin.createUser(UserAdapter.addMap(user), "create", resultsFn);
        }, (data, done) => {
            done(null, UserAdapter.map(data, this));
        }, callback);
    }
    updateUser(user, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.admin.updateUser(user.id, UserAdapter.updateMap(user), resultsFn);
        }, (data, done) => {
            done(null, UserAdapter.map(data, this));
        }, callback);
    }
    deleteUser(userId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.admin.deleteUser(userId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    listGroups(options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, after, order, include, filter } = options;
            this._endpoints.developer.getAllGroups(limit, after, order, encodeInclude(include), extractFilter(filter, "name"), resultsFn);
        }, (data, done) => {
            let groups;
            if (data.data && data.data.length) {
                groups = data.data.map(group => {
                    return GroupAdapter.map(group, this);
                });
            }
            done(null, new ListResponse(data, groups));
        }, callback);
    }
    getGroup(groupId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.developer.getGroupSummary(groupId, resultsFn);
        }, (data, done) => {
            done(null, GroupAdapter.map(data, this));
        }, callback);
    }
    listGroupUsers(groupId, options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, after, order, include, filter } = options;
            this._endpoints.admin.getUsersOfGroup(groupId, limit, after, order, encodeInclude(include), extractFilter(filter, "status"), extractFilter(filter, "status", "$in"), extractFilter(filter, "status", "$nin"), resultsFn);
        }, (data, done) => {
            let users;
            if (data.data && data.data.length) {
                users = data.data.map(user => {
                    return UserAdapter.map(user, this);
                });
            }
            done(null, new ListResponse(data, users));
        }, callback);
    }
    listGroupApiKeys(groupId, options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, after, order, include } = options;
            this._endpoints.developer.getApiKeysOfGroup(groupId, limit, after, order, encodeInclude(include), resultsFn);
        }, (data, done) => {
            let keys;
            if (data.data && data.data.length) {
                keys = data.data.map(key => {
                    return ApiKeyAdapter.map(key, this);
                });
            }
            done(null, new ListResponse(data, keys));
        }, callback);
    }
    getLastApiMetadata(callback) {
        return asyncStyle(done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
//# sourceMappingURL=accountManagementApi.js.map