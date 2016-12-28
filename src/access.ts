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
import { AccountAdminApi, AccountAdminApiApiKeys } from "./_api/iam";

export interface AccessOptions {
    /**
    * Access Key for your mbed Device Connector account
    */
    accessKey: string;
    /**
    * URL for mbed Device Connector API
    */
    host?: string;
}

export interface UserOptions {
    account_id: string;
    status: string;
    username: string;
    full_name: string;
    id: string;
}

/**
* Root Account object
*/
export class Access {

    private api: AccountAdminApi;

    /**
    * @param options Options object
    */
    constructor(options: AccessOptions) {
        this.api = new AccountAdminApi();
//        if (options.host) this.client.basePath = options.host;
        if (options.accessKey) this.api.setApiKey(AccountAdminApiApiKeys.Bearer, "Bearer " + options.accessKey);
    }

    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    public getUsers(limit?: number, after?: string, order?: string, include?: string, filter?: string, callback?: (err: any, data?: User[]) => void): Promise<User[]> {
        return pg(done => {
            this.api.getAllUsers(limit, after, order, include, filter, (error, response) => {
                if (error) return done(error);
                /*
                { object: 'list',
                 limit: 50,
                 order: 'ASC',
                 total_count: 23,
                 has_more: false,
                 data:
                 */
                var users = response.body.data.map(user => {
                    return new User(this.api, user);
                });
                done(null, users);
            });
        }, callback);
    }
}

export class User {
    constructor(private api: AccountAdminApi, options: UserOptions) {
        for(var key in options) {
            this[key] = options[key];
        }
        this.api = null;
    }
}
export interface User extends UserOptions {}
