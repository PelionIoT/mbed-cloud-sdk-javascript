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

import { apiWrapper, asyncStyle } from "../../common/functions";
import { CallbackFn } from "../../common/interfaces";
import { AccountManagementApi } from "../accountManagementApi";
import { AddApiKeyObject } from "../types";
import { Group } from "./group";
import { User } from "./user";

/**
 * API Key
 */
export class ApiKey {
    /**
     * The UUID of the API key.
     */
    public readonly id: string;
    /**
     * The API key.
     */
    public readonly key: string;
    /**
     * Creation time.
     */
    public readonly createdAt?: Date;
    /**
     * The timestamp of the API key creation in the storage, in milliseconds.
     */
    public readonly creationTime?: number;
    /**
     * The timestamp of the latest API key usage, in milliseconds.
     */
    public readonly lastLoginTime?: number;

    constructor(init: Partial<ApiKey>, private _api?: AccountManagementApi) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }

    /**
     * List the groups this API key belongs to
     * @returns Promise containing groups
     */
    public listGroups(): Promise<Array<Group>>;
    /**
     * List the groups this API key belongs to
     * @param callback A function that is passed the return arguments (error, groups)
     */
    public listGroups(callback: CallbackFn<Array<Group>>): void;
    public listGroups(callback?: CallbackFn<Array<Group>>): Promise<Array<Group>> {
        return apiWrapper(
            resultsFn => {
                this._api.listGroups(null, resultsFn);
            },
            (data, done) => {
                let groups = [];
                if (data.data && data.data.length) {
                    groups = data.data.filter(group => {
                        return this.groups.indexOf(group.id) > -1;
                    });
                }

                done(null, groups);
            },
            callback
        );
    }

    /**
     * Get details of the key owner
     * @returns Promise containing the user
     */
    public getOwner(): Promise<User>;
    /**
     * Get details of the key owner
     * @param callback A function that is passed the return arguments (error, user)
     */
    public getOwner(callback: CallbackFn<User>): void;
    public getOwner(callback?: CallbackFn<User>): Promise<User> {
        return asyncStyle(done => {
            if (!this.ownerId) {
                return done(null, null);
            }
            this._api.getUser(this.ownerId, done);
        }, callback);
    }

    /**
     * Updates an API key
     * @returns Promise containing API key
     */
    public update(): Promise<ApiKey>;
    /**
     * Updates an API key
     * @param callback A function that is passed the return arguments (error, API key)
     */
    public update(callback: CallbackFn<ApiKey>): void;
    public update(callback?: CallbackFn<ApiKey>): Promise<ApiKey> {
        return asyncStyle(done => {
            this._api.updateApiKey(this, done);
        }, callback);
    }

    /**
     * Delete the API key
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Delete the API key
     * @param callback A function that is passed any error
     */
    public delete(callback: CallbackFn<void>): void;
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteApiKey(this.id, done);
        }, callback);
    }
}
export interface ApiKey extends AddApiKeyObject {}
