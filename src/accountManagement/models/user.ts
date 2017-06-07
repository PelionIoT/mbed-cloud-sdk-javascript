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

import { asyncStyle, apiWrapper } from "../../common/functions";
import { CallbackFn, ListOptions } from "../../common/interfaces";
import { UpdateUserObject, UserStatusEnum } from "../types";
import { AccountManagementApi } from "../accountManagementApi";
import { ApiKey } from "./apiKey";
import { Group } from "./group";

/**
 * User
 */
export class User {

    /**
     * A list of group IDs this user belongs to.
     */
    readonly groups?: string[];
    /**
     * A username containing alphanumerical letters and -,._@+= characters.
     */
    readonly username: string;
    /**
     * The status of the user. INVITED means that the user has not accepted the invitation request. RESET means that the password must be changed immediately.
     */
    readonly status: UserStatusEnum;
    /**
     * The UUID of the account.
     */
    readonly accountId: string;
    /**
     * A flag indicating whether the user's email address has been verified or not.
     */
    readonly emailVerified?: boolean;
    /**
     * Creation UTC time RFC3339.
     */
    readonly createdAt?: string;
    /**
     * A timestamp of the user creation in the storage, in milliseconds.
     */
    readonly creationTime?: number;
    /**
     * A timestamp of the latest change of the user password, in milliseconds.
     */
    readonly passwordChangedTime?: number;
    /**
     * A timestamp of the latest login of the user, in milliseconds.
     */
    readonly lastLoginTime?: number;

    constructor(init: Partial<User>, private _api?: AccountManagementApi) {
        for(var key in init) {
            this[key] = init[key];
        }
    }

    /**
     * Updates the user
     * @returns Promise containing user
     */
    public update(): Promise<User>;
    /**
     * Updates the user
     * @param callback A function that is passed the return arguments (error, user)
     */
    public update(callback: CallbackFn<User>): void;
    public update(callback?: CallbackFn<User>): Promise<User> {
        return asyncStyle(done => {
            this._api.updateUser(this, done);
        }, callback);
    }

    /**
     * List the groups this user belongs to
     * @returns Promise containing groups
     */
    public listGroups(): Promise<Array<Group>>;
    /**
     * List the groups this user belongs to
     * @param callback A function that is passed the return arguments (error, groups)
     */
    public listGroups(callback: CallbackFn<Array<Group>>): void;
    public listGroups(callback?: CallbackFn<Array<Group>>): Promise<Array<Group>> {
        return apiWrapper(resultsFn => {
            this._api.listGroups(resultsFn);
        }, (data, done) => {
            let groups = [];
            if (data.data && data.data.length) {
                groups = data.data.filter(group => {
                    return this.groups.indexOf(group.id) > -1;
                });
            }

            done(null, groups);
        }, callback);
    }

    /**
     * List the API keys for this user
     * @returns Promise containing API keys
     */
    public listApiKeys(options?: ListOptions): Promise<Array<ApiKey>>;
    /**
     * List the API keys for this user
     * @param callback A function that is passed the return arguments (error, API keys)
     */
    public listApiKeys(options?: ListOptions, callback?: CallbackFn<Array<ApiKey>>): void;
    public listApiKeys(options?: any, callback?: CallbackFn<Array<ApiKey>>): Promise<Array<ApiKey>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return asyncStyle(done => {
            let attributes = options.attributes || {};
            attributes["owner"] = this.id;
            options.attributes = attributes;

            this._api.listApiKeys(options, done);
        }, callback);
    }

    /**
     * Delete the user
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Delete the user
     * @param callback A function that is passed any error
     */
    public delete(callback: CallbackFn<void>): void;
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteUser(this.id, done);
        }, callback);
    }
}
export interface User extends UpdateUserObject {}
