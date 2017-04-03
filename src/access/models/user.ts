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
import { ListOptions } from "../../common/interfaces";
import { UpdateUserObject, UserStatusEnum } from "../types";
import { AccessApi } from "../index";
import { ApiKey } from "./apiKey";

/*
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

    constructor(private _api?: AccessApi, init?: Partial<User>) {
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
    public update(callback: CallbackFn<User>);
    public update(callback?: CallbackFn<User>): Promise<User> {
        return asyncStyle(done => {
            this._api.updateUser({
                id:                   this.id,
                fullName:             this.fullName,
                username:             this.username,
                password:             this.password,
                email:                this.email,
                phoneNumber:          this.phoneNumber,
                address:              this.address,
                termsAccepted:        this.termsAccepted,
                marketingAccepted:    this.marketingAccepted
            }, done);
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
    public listApiKeys(options?: ListOptions, callback?: CallbackFn<ApiKey[]>);
    public listApiKeys(options?: any, callback?: CallbackFn<ApiKey[]>): Promise<ApiKey[]> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let attributes = options.attributes || {};
        attributes["owner"] = this.id;
        options.attributes = attributes;

        return asyncStyle(done => {
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
    public delete(callback: CallbackFn<void>);
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteUser(this.id, done);
        }, callback);
    }
}
export interface User extends UpdateUserObject {}
