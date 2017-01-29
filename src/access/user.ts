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
import { UserType } from "./types";
import {
    UserInfoResp as apiUser,
    UserInfoReq as apiUserRequest
} from "../_api/iam";
import { AccessApi } from "./index";
import { Group } from "./group";

/*
 * User
 */
export class User {

    constructor(options: UserType, private _api?: AccessApi) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiUser, api: AccessApi): User {
        let type:UserType = {
            accountId:            from.account_id,
            address:              from.address,
            createdAt:            from.created_at,
            creationTime:         from.creation_time,
            email:                from.email,
            emailVerified:        from.email_verified,
            fullName:             from.full_name,
            groups:               from.groups,
            termsAccepted:        from.is_gtc_accepted,
            id:                   from.id,
            lastLoginTime:        from.last_login_time,
            marketingAccepted:    from.is_marketing_accepted,
            password:             from.password,
            passwordChangedTime:  from.password_changed_time,
            phoneNumber:          from.phone_number,
            status:               from.status,
            username:             from.username
        };

        return new User(type, api);
    }

    static reverseMap(from: any): apiUserRequest {
        return {
            username:                 from.username,
            phone_number:             from.phoneNumber,
            is_marketing_accepted:    from.marketingAccepted,
            groups:                   from.groups,
            is_gtc_accepted:          from.termsAccepted,
            full_name:                from.fullName,
            address:                  from.address,
            password:                 from.password,
            email:                    from.email
        };
    }

    /**
     * List the groups this user belongs to
     * @returns Promise containing groups
     */
    public listGroups(): Promise<Group[]>;
    /**
     * List the groups this user belongs to
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
     * Delete the user
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Delete the user
     * @param callback A function that is passed any error
     */
    public delete(callback?: (err: any, data?: void) => any);
    public delete(callback?: (err: any, data?: void) => any): Promise<void> {
        return pg(done => {
            this._api.deleteUser({
                id:    this.id
            }, done);
        }, callback);
    }
}
export interface User extends UserType {}
