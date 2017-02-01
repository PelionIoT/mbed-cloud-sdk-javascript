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
import { ListOptions } from "../common/interfaces";
import { UserType } from "./types";
import {
    UserInfoReq as apiUserRequest,
    UserInfoResp as apiUser
} from "../_api/iam";
import { AccessApi } from "./index";
import { Group } from "./group";
import { ApiKey } from "./apiKey";

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
     * Updates the user
     * @param options.username A username containing alphanumerical letters and -,._@+= characters
     * @param options.phoneNumber Phone number
     * @param options.marketingAccepted A flag indicating that receiving marketing information has been accepted
     * @param options.termsAccepted A flag indicating that the General Terms and Conditions has been accepted
     * @param options.fullName The full name of the user
     * @param options.address Address
     * @param options.password The password when creating a new user. It will will generated when not present in the request
     * @param options.email The email address
     * @returns Promise containing user
     */
    public update(options: { username: string, phoneNumber?: string, marketingAccepted?: boolean, termsAccepted?: boolean,
        fullName?: string, address?: string, password?: string, email: string }): Promise<User>;
    /**
     * Updates the user
     * @param options.username A username containing alphanumerical letters and -,._@+= characters
     * @param options.phoneNumber Phone number
     * @param options.marketingAccepted A flag indicating that receiving marketing information has been accepted
     * @param options.termsAccepted A flag indicating that the General Terms and Conditions has been accepted
     * @param options.fullName The full name of the user
     * @param options.address Address
     * @param options.password The password when creating a new user. It will will generated when not present in the request
     * @param options.email The email address
     * @param callback A function that is passed the return arguments (error, user)
     */
    public update(options: { username: string, phoneNumber?: string, marketingAccepted?: boolean, termsAccepted?: boolean,
        fullName?: string, address?: string, password?: string, email: string }, callback: (err: any, data?: User) => any);
    public update(options: { username: string, phoneNumber?: string, marketingAccepted?: boolean, termsAccepted?: boolean,
        fullName?: string, address?: string, password?: string, email: string }, callback?: (err: any, data?: User) => any): Promise<User> {
        return pg(done => {
            this._api.updateUser({
                id: this.id,
                address:              options.address,
                email:                options.email,
                fullName:             options.fullName,
                marketingAccepted:    options.marketingAccepted,
                password:             options.password,
                phoneNumber:          options.phoneNumber,
                termsAccepted:        options.termsAccepted,
                username:             options.username
            }, done);
        }, callback);
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
            this._api.listGroups((error, groups) => {
                if (error) return done(error);

                let userGroups = groups.filter(group => {
                    return this.groups.indexOf(group.id) > -1;
                });

                done(null, userGroups);
            });
        }, callback);
    }

    /**
     * List the API keys for this user
     * @returns Promise containing API keys
     */
    public listApiKeys(options?: ListOptions): Promise<ApiKey[]>;
    /**
     * List the API keys for this user
     * @param callback A function that is passed the return arguments (error, API keys)
     */
    public listApiKeys(options?: ListOptions, callback?: (err: any, data?: ApiKey[]) => any);
    public listApiKeys(options?: any, callback?: (err: any, data?: ApiKey[]) => any): Promise<ApiKey[]> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let attributes = options.attributes || {};
        attributes["owner"] = this.id;
        options.attributes = attributes;

        return pg(done => {
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
    public delete(callback?: (err: any, data?: void) => any);
    public delete(callback?: (err: any, data?: void) => any): Promise<void> {
        return pg(done => {
            this._api.deleteUser(this, done);
        }, callback);
    }
}
export interface User extends UserType {}
