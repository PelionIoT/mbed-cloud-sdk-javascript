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
import { AccessApi } from "../index";
import { Policy } from "./policy";

/*
 * Account
 */
export class Account {
    /**
     * List of sub accounts.
     */
//    subAccounts?: Array<Account>;
    /**
     * The ID of the parent account, if it has any.
     */
//    parentId?: string;
    /**
     * Account ID.
     */
    id: string;
    /**
     * An array of aliases.
     */
    aliases: string[];
    /**
     * The status of the account.
     */
    status: AccountStatusEnum;
    /**
     * The tier level of the account; '0': free tier, '1': commercial account. Other values are reserved for the future.
     */
    tier: string;
    /**
     * List of limits as key-value pairs if requested.
     */
    limits?: { [key: string]: string; };
    /**
     * List of policies if requested.
     */
    policies?: Array<Policy>;
    /**
     * Flag (true/false) indicating whether Factory Tool is allowed to download or not.
     */
    provisioningAllowed: boolean;
    /**
     * Creation UTC time RFC3339.
     */
    createdAt?: string;
    /**
     * Time when upgraded to commercial account in UTC format RFC3339.
     */
    upgradedAt?: string;
    /**
     * A reason note for updating the status of the account
     */
    reason?: string;
    /**
     * Account template ID.
     */
    templateId?: string;

    constructor(private _api?: AccessApi) {
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
    public update(callback: CallbackFn<Account>);
    public update(callback?: CallbackFn<Account>): Promise<Account> {
        return asyncStyle(done => {
            this._api.updateAccountDetails({
                displayName:     this.displayName,
                aliases:         this.aliases,
                company:         this.company,
                contact:         this.contact,
                email:           this.email,
                phoneNumber:     this.phoneNumber,
                addressLine1:    this.addressLine1,
                addressLine2:    this.addressLine2,
                city:            this.city,
                state:           this.state,
                postcode:        this.postcode,
                country:         this.country
            }, done);
        }, callback);
    }
}
export interface Account extends UpdateAccountObject {}
