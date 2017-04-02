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

import {
    AccountUpdateReq as apiAccountRequest,
    AccountInfo as apiAccount
} from "../../_api/iam";
import { UpdateAccountObject } from "../types";
import { AccessApi } from "../index";
import { Account } from "./account";

/*
 * Account Adapter
 */
export class AccountAdapter {
    static map(from: apiAccount, api: AccessApi): Account {
        let account = new Account(api);

        //account.parentId           = from.parent_id;
        //account.subAccounts        = from.sub_accounts;
        account.displayName            = from.display_name;
        account.aliases                = from.aliases;
        account.company                = from.company;
        account.contact                = from.contact;
        account.email                  = from.email;
        account.phoneNumber            = from.phone_number;
        account.addressLine1           = from.address_line1;
        account.addressLine2           = from.address_line2;
        account.city                   = from.city;
        account.state                  = from.state;
        account.postcode               = from.postal_code;
        account.country                = from.country;
        account.id                     = from.id;
        account.status                 = from.status;
        account.tier                   = from.tier;
        account.limits                 = from.limits;
        account.policies               = from.policies;
        account.provisioningAllowed    = from.is_provisioning_allowed;
        account.createdAt              = from.created_at;
        account.upgradedAt             = from.upgraded_at;
        account.reason                 = from.reason;
        account.templateId             = from.template_id;

        return account;
    }

    static reverseMap(from: UpdateAccountObject): apiAccountRequest {
        return {
            display_name:     from.displayName,
            aliases:          from.aliases,
            company:          from.company,
            contact:          from.contact,
            email:            from.email,
            phone_number:     from.phoneNumber,
            address_line1:    from.addressLine1,
            address_line2:    from.addressLine2,
            city:             from.city,
            state:            from.state,
            postal_code:      from.postcode,
            country:          from.country
        };
    }
}
