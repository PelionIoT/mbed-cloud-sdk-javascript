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

import { asyncStyle } from "../../common/functions";
import { CallbackFn, ListOptions } from "../../common/interfaces";
import { ListResponse } from "../../common/listResponse";
import { AccountManagementApi } from "../accountManagementApi";
import { ApiKey } from "./apiKey";
import { User } from "./user";

/**
 * Group
 */
export class Group {
    /**
     * The UUID of the group.
     */
    public readonly id: string;
    /**
     * The UUID of the account this group belongs to.
     */
    public readonly accountId: string;
    /**
     * The name of the group.
     */
    public readonly name: string;
    /**
     * The number of users in this group.
     */
    public readonly userCount: number;
    /**
     * The number of API keys in this group.
     */
    public readonly apiKeyCount: number;
    /**
     * Creation time.
     */
    public readonly createdAt?: Date;

    constructor(init: Partial<Group>, private _api?: AccountManagementApi) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }

    /**
     * List users of this group
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listUsers(options?: ListOptions): Promise<ListResponse<User>>;
    /**
     * List users of this group
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public listUsers(options?: ListOptions, callback?: CallbackFn<ListResponse<User>>): void;
    public listUsers(options?: ListOptions, callback?: CallbackFn<ListResponse<User>>): Promise<ListResponse<User>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return asyncStyle(done => {
            this._api.listGroupUsers(this.id, options, done);
        }, callback);
    }

    /**
     * List API keys of this group
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listApiKeys(options?: ListOptions): Promise<ListResponse<ApiKey>>;
    /**
     * List API keys of this group
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public listApiKeys(options?: ListOptions, callback?: CallbackFn<ListResponse<ApiKey>>): void;
    public listApiKeys(
        options?: ListOptions,
        callback?: CallbackFn<ListResponse<ApiKey>>
    ): Promise<ListResponse<ApiKey>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return asyncStyle(done => {
            this._api.listGroupApiKeys(this.id, options, done);
        }, callback);
    }
}
