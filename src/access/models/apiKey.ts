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

import { asyncStyle } from "../../common/functions";
import { CallbackFn } from "../../common/interfaces";
import { UpdateApiKeyObject, ApiKeyStatusEnum } from "../types";
import { AccessApi } from "../index";
import { User } from "./user";
import { Group } from "./group";

/*
 * API Key
 */
export class ApiKey {

    /**
     * A list of group IDs this API key belongs to.
     */
    readonly groups?: string[];
    /**
     * The status of the API key.
     */
    readonly status?: ApiKeyStatusEnum;
    /**
     * The API key.
     */
    readonly key: string;
    /**
     * Creation UTC time RFC3339.
     */
    readonly createdAt?: string;
    /**
     * The timestamp of the API key creation in the storage, in milliseconds.
     */
    readonly creationTime?: number;
    /**
     * The timestamp of the latest API key usage, in milliseconds.
     */
    readonly lastLoginTime?: number;

    constructor(init: Partial<ApiKey>, private _api?: AccessApi) {
        for(var key in init) {
            this[key] = init[key];
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
    public listGroups(callback: CallbackFn<Array<Group>>);
    public listGroups(callback?: CallbackFn<Array<Group>>): Promise<Array<Group>> {
        return asyncStyle(done => {
            this._api.listGroups((error, groups) => {
                if (error) return done(error);

                let keyGroups = groups.filter(group => {
                    return this.groups.indexOf(group.id) > -1;
                });

                done(null, keyGroups);
            });
        }, callback);
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
    public getOwner(callback: CallbackFn<User>);
    public getOwner(callback?: CallbackFn<User>): Promise<User> {
        return asyncStyle(done => {
            if (!this.owner) return done(null, null);
            this._api.getUser(this.owner, done);
        }, callback);
    }

    /**
     * Updates an API key
     * @returns Promise containing API key
     */
    public update(): Promise<ApiKey>;
    /**
     * Updates an API key
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @param callback A function that is passed the return arguments (error, API key)
     */
    public update(callback: CallbackFn<ApiKey>);
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
    public delete(callback: CallbackFn<void>);
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteApiKey(this.id, done);
        }, callback);
    }
}
export interface ApiKey extends UpdateApiKeyObject {}
