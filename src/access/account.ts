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

import { AccountType } from "./types";
import { AccountInfo as apiAccount } from "../_api/iam";

/*
 * Account
 */
export class Account {

    constructor(options: AccountType) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiAccount): Account {
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

        return new Account(type);
    }
}
export interface Account extends AccountType {}
