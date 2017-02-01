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

import pg = require("polygoat");
import { ApiKeyType } from "./types";
import { ApiKeyInfoResp as apiApiKey } from "../_api/iam";
import { AccessApi } from "./index";
import { Group } from "./group";

/*
 * API Key
 */
export class ApiKey {

    constructor(options: ApiKeyType, private _api?: AccessApi) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiApiKey, api: AccessApi): ApiKey {
        let type:ApiKeyType = {
            createdAt:        from.created_at,
            groups:           from.groups,
            id:               from.id,
            key:              from.key,
            lastLoginTime:    from.last_login_time,
            name:             from.name,
            owner:            from.owner,
            status:           from.status
        };

        return new ApiKey(type, api);
    }

    /**
     * List the groups this API key belongs to
     * @returns Promise containing groups
     */
    public listGroups(): Promise<Group[]>;
    /**
     * List the groups this API key belongs to
     * @param callback A function that is passed the return arguments (error, groups)
     */
    public listGroups(callback: (err: any, data?: Group[]) => any);
    public listGroups(callback?: (err: any, data?: Group[]) => any): Promise<Group[]> {
        return pg(done => {
            // AccessApi.listGroups should accept a filter which would be less intense to use
            this.groups.forEach(groupId => {
                this._api.listGroups((error, groups) => {
                    if (error) return done(error);

                    let userGroups = groups.filter(group => {
                        return this.groups.indexOf(group.id) > -1;
                    });

                    done(null, userGroups);
                });
            });
        }, callback);
    }

    /**
     * Updates an API key
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @returns Promise containing API key
     */
    public update(options: { name: string, owner?: string }): Promise<ApiKey>;
    /**
     * Updates an API key
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @param callback A function that is passed the return arguments (error, API key)
     */
    public update(options: { name: string, owner?: string }, callback: (err: any, data?: ApiKey) => any);
    public update(options: { name: string, owner?: string }, callback?: (err: any, data?: ApiKey) => any): Promise<ApiKey> {
        options["id"] = this.id;
        return pg(done => {
            this._api.updateApiKey(options, done);
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
    public delete(callback?: (err: any, data?: void) => any);
    public delete(callback?: (err: any, data?: void) => any): Promise<void> {
        return pg(done => {
            this._api.deleteApiKey(this, done);
        }, callback);
    }
}
export interface ApiKey extends ApiKeyType {}
