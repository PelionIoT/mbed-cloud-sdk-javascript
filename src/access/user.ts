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

import { UserType } from "./types";
import { UserInfoResp as apiUser } from "../_api/iam";

/*
 * User
 */
export class User {

    constructor(options: UserType) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiUser): User {
        let type:UserType = {
            accountId:            from.account_id,
            address:              from.address,
            createdAt:            from.created_at,
            creationTime:         from.creation_time,
            email:                from.email,
            emailVerified:        from.email_verified,
            fullName:             from.full_name,
            groups:               from.groups,
            gtcAccepted:          from.is_gtc_accepted,
            id:                   from.id,
            lastLoginTime:        from.last_login_time,
            marketingAccepted:    from.is_marketing_accepted,
            password:             from.password,
            passwordChangedTime:  from.password_changed_time,
            phoneNumber:          from.phone_number,
            status:               from.status,
            username:             from.username
        };

        return new User(type);
    }
}
export interface User extends UserType {}
