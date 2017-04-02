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
    UserInfoReq as apiUserAdd,
    UserUpdateReq as apiUserUpdate,
    UserInfoResp as apiUser
} from "../../_api/iam";
import { AddUserObject, UpdateUserObject } from "../types";
import { AccessApi } from "../index";
import { User } from "./user";

/*
 * User Adapter
 */
export class UserAdapter {

    static map(from: apiUser, api: AccessApi): User {

        let user = new User(api);

        user.fullName               = from.full_name;
        user.username               = from.username;
        user.password               = from.password;
        user.email                  = from.email;
        user.phoneNumber            = from.phone_number;
        user.address                = from.address;
        user.termsAccepted          = from.is_gtc_accepted;
        user.marketingAccepted      = from.is_marketing_accepted;
        user.groups                 = from.groups;
        user.id                     = from.id;
        user.status                 = from.status;
        user.accountId              = from.account_id;
        user.emailVerified          = from.email_verified;
        user.createdAt              = from.created_at;
        user.creationTime           = from.creation_time;
        user.passwordChangedTime    = from.password_changed_time;
        user.lastLoginTime          = from.last_login_time;

        return user;
    }

    static addMap(from: AddUserObject): apiUserAdd {
        return {
            full_name:                from.fullName,
            username:                 from.username,
            password:                 from.password,
            email:                    from.email,
            phone_number:             from.phoneNumber,
            address:                  from.address,
            is_gtc_accepted:          from.termsAccepted,
            is_marketing_accepted:    from.marketingAccepted
        };
    }

    static updateMap(from: UpdateUserObject): apiUserUpdate {
        return {
            full_name:                from.fullName,
            username:                 from.username,
            password:                 from.password,
            email:                    from.email,
            phone_number:             from.phoneNumber,
            address:                  from.address,
            is_gtc_accepted:          from.termsAccepted,
            is_marketing_accepted:    from.marketingAccepted
        };
    }
}
