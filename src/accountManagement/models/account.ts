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
import { UpdateAccountObject, AccountStatusEnum } from "../types";
import { AccountManagementApi } from "../accountManagementApi";
import { Policy } from "./policy";

/**
 * Account
 */
export class Account {

    /**
     * Account ID.
     */
    readonly id: string;
    /**
     * An array of aliases.
     */
    readonly aliases: string[];
    /**
     * The status of the account.
     */
    readonly status: AccountStatusEnum;
    /**
     * The tier level of the account; '0': free tier, '1': commercial account. Other values are reserved for the future.
     */
    readonly tier: string;
    /**
     * List of limits as key-value pairs if requested.
     */
    readonly limits?: { [key: string]: string; };
    /**
     * List of policies if requested.
     */
    readonly policies?: Array<Policy>;
    /**
     * Flag (true/false) indicating whether Factory Tool is allowed to download or not.
     */
    readonly provisioningAllowed: boolean;
    /**
     * Creation time.
     */
    readonly createdAt?: Date;
    /**
     * Time when upgraded to commercial account
     */
    readonly upgradedAt?: Date;
    /**
     * A reason note for updating the status of the account
     */
    readonly reason?: string;
    /**
     * Account template ID.
     */
    readonly templateId?: string;

    constructor(init: Partial<Account>, private _api?: AccountManagementApi) {
        for(var key in init) {
            this[key] = init[key];
        }
    }

    /**
     * Update details of the account
     * @returns Promise of account
     */
    public update(): Promise<Account>;
    /**
     * Update details of the account
     * @param callback A function that is passed the return arguments (error, account)
     */
    public update(callback: CallbackFn<Account>): void;
    public update(callback?: CallbackFn<Account>): Promise<Account> {
        return asyncStyle(done => {
            this._api.updateAccount(this, done);
        }, callback);
    }
}
export interface Account extends UpdateAccountObject {}
