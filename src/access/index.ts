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
import { connectionOptions } from "../helpers/connectionOptions";
import { AccountAdminApi, AccountAdminApiApiKeys } from "../_api/iam";

/**
* Root Account object
*/
export class Access {

    private _apis: Access.APIContainer;

    /**
    * @param options Options object
    */
    constructor(options: connectionOptions) {
        this._apis = new Access.APIContainer(options);
    }

    public getUsers(options?: Access.UsersOptions): Promise<Access.User[]>;
    public getUsers(options?: Access.UsersOptions, callback?: (err: any, data?: Access.User[]) => void);
    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    public getUsers(options?: any, callback?: (err: any, data?: Access.User[]) => void): Promise<Access.User[]> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let {limit, after, order, include, filter} = options;
        return pg(done => {
            this._apis.adAPI.getAllUsers(limit, after, order, include, filter, (error, data) => {
                if (error) return done(error);
                /*
                { object: 'list',
                 limit: 50,
                 order: 'ASC',
                 total_count: 23,
                 has_more: false,
                 data:
                 */
                var users = data.data.map(user => {
                    return new Access.User(this._apis, user);
                });
                done(null, users);
            });
        }, callback);
    }
}

export namespace Access {

    export class APIContainer {

        adAPI: AccountAdminApi;

        constructor(options: connectionOptions) {
            this.adAPI = new AccountAdminApi(options.host);
            this.adAPI.setApiKey(AccountAdminApiApiKeys.Bearer, "Bearer " + options.accessKey);
        }
    }

    export interface UsersOptions {
        limit?: number;
        order?: string;
        after?: string;
        include?: string;
        filter?: string;
    }

    export interface UserOptions {
        account_id: string;
        status: string;
        username: string;
        full_name: string;
        id: string;
    }

    export class User {
        constructor(private _apis: APIContainer, options: UserOptions) {
            for(var key in options) {
                this[key] = options[key];
            }
            this._apis = null //deleteme
        }
    }
    export interface User extends UserOptions {}
}
