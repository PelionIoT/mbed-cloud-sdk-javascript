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

import { asyncStyle, mapListResponse, encodeInclude } from "../common/functions";
import { ConnectionOptions, CallbackFn, ListOptions, ListResponse } from "../common/interfaces";
import { Endpoints } from "./endpoints";
import { UpdateAccountObject, AddApiKeyObject, UpdateApiKeyObject, AddUserObject, UpdateUserObject } from "./types";
import { Account } from "./models/account";
import { AccountAdapter } from "./models/accountAdapter"
import { ApiKey } from "./models/apiKey";
import { ApiKeyAdapter } from "./models/apiKeyAdapter";
import { User } from "./models/user";
import { UserAdapter } from "./models/userAdapter";
import { Group } from "./models/group";
import { GroupAdapter } from "./models/groupAdapter";

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
export class AccessApi {

    private _endpoints: Endpoints;

    /**
    * @param options connection options
    */
    constructor(options: ConnectionOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * Get details of account associated with current API key
     * @returns Promise of account
     */
    public getAccount(): Promise<Account>;
    /**
     * Get details of account associated with current API key
     * @param callback A function that is passed the return arguments (error, account)
     */
    public getAccount(callback: CallbackFn<Account>);
    public getAccount(callback?: CallbackFn<Account>): Promise<Account> {
        return asyncStyle(done => {
            this._endpoints.developer.getMyAccountInfo("limits, policies", (error, data) => {
                if (error) return done(error);
                done(null, AccountAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Update details of account associated with current API key
     * @param account The account object to update
     * @returns Promise of account
     */
    public updateAccount(account: UpdateAccountObject): Promise<Account>;
    /**
     * Update details of account associated with current API key
     * @param account The account object to update
     * @param callback A function that is passed the return arguments (error, account)
     */
    public updateAccount(account: UpdateAccountObject, callback?: CallbackFn<Account>);
    public updateAccount(account: UpdateAccountObject, callback?: CallbackFn<Account>): Promise<Account> {
        return asyncStyle(done => {
            this._endpoints.admin.updateMyAccount(AccountAdapter.reverseMap(account), (error, data) => {
                if (error) return done(error);
                done(null, AccountAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * List API keys
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listApiKeys(options?: ListOptions): Promise<ListResponse<ApiKey>>;
    /**
     * List API keys
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public listApiKeys(options?: ListOptions, callback?: CallbackFn<ListResponse<ApiKey>>);
    public listApiKeys(options?: any, callback?: CallbackFn<ListResponse<ApiKey>>): Promise<ListResponse<ApiKey>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let { limit, after, order, include, filter } = options as ListOptions;
        let owner = filter ? filter["owner"] : null;

        return asyncStyle(done => {
            this._endpoints.developer.getAllApiKeys(limit, after, order, encodeInclude(include), owner, (error, data) => {
                if (error) return done(error);

                var keys = data.data.map(key => {
                    return ApiKeyAdapter.map(key, this);
                });
                done(null, mapListResponse(data, keys));
            });
        }, callback);
    }

    /**
     * Get details of an API key
     * @param apiKeyId The API key ID (if not specified, returns current API key)
     * @returns Promise containing the API key
     */
    public getApiKey(apiKeyId?: string): Promise<ApiKey>;
    /**
     * Get details of an API key
     * @param apiKeyId The API key ID (if not specified, returns current API key)
     * @param callback A function that is passed the return arguments (error, API key)
     */
    public getApiKey(apiKeyId?: string, callback?: CallbackFn<ApiKey>);
    public getApiKey(apiKeyId?: any, callback?: CallbackFn<ApiKey>): Promise<ApiKey> {
        if (typeof apiKeyId === "function") {
            callback = apiKeyId;
            apiKeyId = null;
        }
        return asyncStyle(done => {
            if (apiKeyId) {
                this._endpoints.developer.getApiKey(apiKeyId, (error, data) => {
                    if (error) return done(error);
                    done(null, ApiKeyAdapter.map(data, this));
                });
            } else {
                this._endpoints.developer.getMyApiKey((error, data) => {
                    if (error) return done(error);
                    done(null, ApiKeyAdapter.map(data, this));
                });
            }
        }, callback);
    }

    /**
     * Adds an API key
     * @param apiKey The API key to add
     * @returns Promise containing API key
     */
    public addApiKey(apiKey: AddApiKeyObject): Promise<ApiKey>;
    /**
     * Adds an API key
     * @param apiKey The API key to add
     * @param callback A function that is passed the return arguments (error, API key)
     */
    public addApiKey(apiKey: AddApiKeyObject, callback: CallbackFn<ApiKey>);
    public addApiKey(apiKey: AddApiKeyObject, callback?: CallbackFn<ApiKey>): Promise<ApiKey> {
        return asyncStyle(done => {
            this._endpoints.developer.createApiKey(ApiKeyAdapter.addMap(apiKey), (error, data) => {
                if (error) return done(error);

                let key = ApiKeyAdapter.map(data, this);
                done(null, key);
            });
        }, callback);
    }

    /**
     * Updates an API key
     * @param apiKey The API key to add
     * @returns Promise containing API key
     */
    public updateApiKey(apiKey: UpdateApiKeyObject): Promise<ApiKey>;
    /**
     * Updates an API key
     * @param apiKey The API key to add
     * @param callback A function that is passed the return arguments (error, API key)
     */
    public updateApiKey(apiKey: UpdateApiKeyObject, callback: CallbackFn<ApiKey>);
    public updateApiKey(apiKey: UpdateApiKeyObject, callback?: CallbackFn<ApiKey>): Promise<ApiKey> {
        return asyncStyle(done => {
            this._endpoints.developer.updateApiKey(apiKey.id, ApiKeyAdapter.updateMap(apiKey), (error, data) => {
                if (error) return done(error);
                done(null, ApiKeyAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Deletes an API key
     * @param apiKeyId The API key ID
     * @returns Promise containing any error
     */
    public deleteApiKey(apiKeyId: string): Promise<void>;
    /**
     * Deletes an API key
     * @param apiKeyId The API key ID
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteApiKey(apiKeyId: string, callback: CallbackFn<void>);
    public deleteApiKey(apiKeyId: string, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.developer.deleteApiKey(apiKeyId, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * List users
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listUsers(options?: ListOptions): Promise<ListResponse<User>>;
    /**
     * List users
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public listUsers(options?: ListOptions, callback?: CallbackFn<ListResponse<User>>);
    public listUsers(options?: any, callback?: CallbackFn<ListResponse<User>>): Promise<ListResponse<User>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let { limit, after, order, include, filter } = options as ListOptions;
        let status = filter ? filter["status"] : null;

        return asyncStyle(done => {
            this._endpoints.admin.getAllUsers(limit, after, order, encodeInclude(include), status, (error, data) => {
                if (error) return done(error);

                let users = data.data.map(user => {
                    return UserAdapter.map(user, this);
                });

                done(null, mapListResponse(data, users));
            });
        }, callback);
    }

    /**
     * Get details of a user
     * @param userId The user ID
     * @returns Promise containing the user
     */
    public getUser(userId: string): Promise<User>;
    /**
     * Get details of a user
     * @param userId The user ID
     * @param callback A function that is passed the return arguments (error, user)
     */
    public getUser(userId: string, callback: CallbackFn<User>);
    public getUser(userId: string, callback?: CallbackFn<User>): Promise<User> {
        return asyncStyle(done => {
            this._endpoints.admin.getUser(userId, (error, data) => {
                if (error) return done(error);
                done(null, UserAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Adds a user
     * @param user User to add
     * @returns Promise containing user
     */
    public addUser(user: AddUserObject): Promise<User>;
    /**
     * Adds a user
     * @param user User to add
     * @param callback A function that is passed the return arguments (error, user)
     */
    public addUser(user: AddUserObject, callback: CallbackFn<User>);
    public addUser(user: AddUserObject, callback?: CallbackFn<User>): Promise<User> {
        return asyncStyle(done => {
            this._endpoints.admin.createUser(UserAdapter.addMap(user), "create", (error, data) => {
                if (error) return done(error);
                done(null, UserAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Updates a user
     * @param user User to update
     * @returns Promise containing user
     */
    public updateUser(user: UpdateUserObject): Promise<User>;
    /**
     * Updates a user
     * @param user User to update
     * @param callback A function that is passed the return arguments (error, user)
     */
    public updateUser(user: UpdateUserObject, callback: CallbackFn<User>);
    public updateUser(user: UpdateUserObject, callback?: CallbackFn<User>): Promise<User> {
        return asyncStyle(done => {
            this._endpoints.admin.updateUser(user.id, UserAdapter.updateMap(user), (error, data) => {
                if (error) return done(error);
                done(null, UserAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Deletes a user
     * @param userId The user ID
     * @returns Promise containing any error
     */
    public deleteUser(userId: string): Promise<void>;
    /**
     * Deletes a user
     * @param userId The user ID
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteUser(userId: string, callback: CallbackFn<void>);
    public deleteUser(userId: string, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.admin.deleteUser(userId, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * List groups
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listGroups(options?: ListOptions): Promise<ListResponse<Group>>;
    /**
     * List groups
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public listGroups(options?: ListOptions, callback?: CallbackFn<ListResponse<Group>>);
    public listGroups(options?: any, callback?: CallbackFn<ListResponse<Group>>): Promise<ListResponse<Group>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let { limit, after, order, include } = options as ListOptions;

        return asyncStyle(done => {
            this._endpoints.developer.getAllGroups(limit, after, order, encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let groups = data.data.map(group => {
                    return GroupAdapter.map(group, this);
                });

                done(null, mapListResponse(data, groups));
            });
        }, callback);
    }

    /**
     * Get details of a group
     * @param groupId The group ID
     * @returns Promise containing the group
     */
    public getGroup(groupId: string): Promise<Group>;
    /**
     * Get details of a group
     * @param groupId The group ID
     * @param callback A function that is passed the arguments (error, group)
     */
    public getGroup(groupId: string, callback: CallbackFn<Group>);
    public getGroup(groupId: string, callback?: CallbackFn<Group>): Promise<Group> {
        return asyncStyle(done => {
            this._endpoints.developer.getGroupSummary(groupId, (error, data) => {
                if (error) return done(error);
                done(null, GroupAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * List users of a group
     * @param groupId The group ID
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listGroupUsers(groupId: string, options?: ListOptions): Promise<ListResponse<User>>;
    /**
     * List users of a group
     * @param groupId The group ID
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public listGroupUsers(groupId: string, options?: ListOptions, callback?: CallbackFn<ListResponse<User>>);
    public listGroupUsers(groupId: string, options?: ListOptions, callback?: CallbackFn<ListResponse<User>>): Promise<ListResponse<User>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let { limit, after, order, include } = options as ListOptions;

        return asyncStyle(done => {
            this._endpoints.admin.getUsersOfGroup(groupId, limit, after, order, encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let users = data.data.map(user => {
                    return UserAdapter.map(user, this);
                });

                done(null, mapListResponse(data, users));
            });
        }, callback);
    }

    /**
     * List API keys of a group
     * @param groupId The group ID
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listGroupApiKeys(groupId: string, options?: ListOptions): Promise<ListResponse<ApiKey>>;
    /**
     * List API keys of a group
     * @param groupId The group ID
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public listGroupApiKeys(groupId: string, options?: ListOptions, callback?: CallbackFn<ListResponse<ApiKey>>);
    public listGroupApiKeys(groupId: string, options?: ListOptions, callback?: CallbackFn<ListResponse<ApiKey>>): Promise<ListResponse<ApiKey>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let { limit, after, order, include } = options as ListOptions;

        return asyncStyle(done => {
            this._endpoints.developer.getApiKeysOfGroup(groupId, limit, after, order, encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let users = data.data.map(user => {
                    return ApiKeyAdapter.map(user, this);
                });

                done(null, mapListResponse(data, users));
            });
        }, callback);
    }
}
