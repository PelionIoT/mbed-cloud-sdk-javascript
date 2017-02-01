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

import { asyncStyle } from "../common/functions";
import { AccountType } from "./types";
import {
    AccountUpdateReq as apiAccountRequest,
    AccountInfo as apiAccount
} from "../_api/iam";
import { AccessApi } from "./index";

/*
 * Account
 */
export class Account {

    constructor(options: AccountType, private _api?: AccessApi) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiAccount, api: AccessApi): Account {
        let type:AccountType = {
            addressLine1:           from.address_line1,
            addressLine2:           from.address_line2,
            aliases:                from.aliases,
            city:                   from.city,
            company:                from.company,
            contact:                from.contact,
            country:                from.country,
            createdAt:              from.created_at,
            displayName:            from.display_name,
            email:                  from.email,
            id:                     from.id,
            limits:                 from.limits,
            parentId:               from.parentID,
            phoneNumber:            from.phone_number,
            postcode:               from.postal_code,
            provisioningAllowed:    from.is_provisioning_allowed,
            state:                  from.state,
            status:                 from.status,
            templateId:             from.template_id,
            tier:                   from.tier,
            upgradedAt:             from.upgraded_at
        };

        return new Account(type, api);
    }

    static reverseMap(from: any): apiAccountRequest {
        return {
            address_line2:    from.addressLine2,
            city:             from.city,
            address_line1:    from.addressLine1,
            display_name:     from.displayName,
            country:          from.country,
            company:          from.company,
            state:            from.state,
            contact:          from.contact,
            postal_code:      from.postcode,
            parentID:         from.parentId,
            phone_number:     from.phoneNumber,
            email:            from.email,
            aliases:          from.aliases
        };
    }

    /**
     * Update details of the account
     * @param options.displayName The display name for the account
     * @param options.parentId The ID of the parent account, if it has any
     * @param options.aliases An array of aliases
     * @param options.company The name of the company
     * @param options.contact The name of the contact person for this account
     * @param options.email The company email address for this account
     * @param options.phoneNumber The phone number of the company
     * @param options.addressLine1 Postal address line 1
     * @param options.addressLine2 Postal address line 2
     * @param options.city The city part of the postal address
     * @param options.state The state part of the postal address
     * @param options.postcode The postal code part of the postal address
     * @param options.country The country part of the postal address
     * @returns Promise of account
     */
    public update(options: { displayName?: string, parentId?: string, aliases?: string[], company?: string, contact?: string, email?: string, phoneNumber?: string, addressLine1?: string, addressLine2?: string, city?: string, state?: string, postcode?: string, country?: string }): Promise<Account>;
    /**
     * Update details of the account
     * @param options.displayName The display name for the account
     * @param options.parentId The ID of the parent account, if it has any
     * @param options.aliases An array of aliases
     * @param options.company The name of the company
     * @param options.contact The name of the contact person for this account
     * @param options.email The company email address for this account
     * @param options.phoneNumber The phone number of the company
     * @param options.addressLine1 Postal address line 1
     * @param options.addressLine2 Postal address line 2
     * @param options.city The city part of the postal address
     * @param options.state The state part of the postal address
     * @param options.postcode The postal code part of the postal address
     * @param options.country The country part of the postal address
     * @param callback A function that is passed the return arguments (error, account)
     */
    public update(options: { displayName?: string, parentId?: string, aliases?: string[], company?: string, contact?: string, email?: string, phoneNumber?: string, addressLine1?: string, addressLine2?: string, city?: string, state?: string, postcode?: string, country?: string }, callback?: (err: any, data?: Account) => any);
    public update(options: { displayName?: string, parentId?: string, aliases?: string[], company?: string, contact?: string, email?: string, phoneNumber?: string, addressLine1?: string, addressLine2?: string, city?: string, state?: string, postcode?: string, country?: string }, callback?: (err: any, data?: Account) => any): Promise<Account> {
        return asyncStyle(done => {
            this._api.updateAccountDetails(options, done);
        }, callback);
    }
}
export interface Account extends AccountType {}
