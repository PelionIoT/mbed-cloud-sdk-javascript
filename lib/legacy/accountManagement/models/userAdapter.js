"use strict";
/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
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
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var loginHistoryAdapter_1 = require("./loginHistoryAdapter");
/**
 * User Adapter
 */
var UserAdapter = /** @class */ (function () {
    function UserAdapter() {
    }
    UserAdapter.map = function (from, api) {
        var logins = [];
        if (from.login_history) {
            logins = from.login_history.map(function (login) {
                return loginHistoryAdapter_1.LoginHistoryAdapter.map(login);
            });
        }
        return new user_1.User({
            fullName: from.full_name,
            username: from.username,
            password: from.password,
            email: from.email,
            phoneNumber: from.phone_number,
            address: from.address,
            termsAccepted: from.is_gtc_accepted,
            marketingAccepted: from.is_marketing_accepted,
            groups: from.groups,
            id: from.id,
            status: from.status,
            accountId: from.account_id,
            emailVerified: from.email_verified,
            createdAt: from.created_at,
            creationTime: from.creation_time,
            passwordChangedTime: from.password_changed_time,
            twoFactorAuthentication: from.is_totp_enabled,
            lastLoginTime: from.last_login_time,
            loginHistory: logins,
        }, api);
    };
    UserAdapter.addMap = function (from) {
        return {
            full_name: from.fullName,
            username: from.username,
            password: from.password,
            email: from.email,
            phone_number: from.phoneNumber,
            address: from.address,
            is_gtc_accepted: from.termsAccepted,
            is_marketing_accepted: from.marketingAccepted,
            groups: from.groups,
        };
    };
    UserAdapter.updateMap = function (from) {
        return {
            full_name: from.fullName,
            username: from.username,
            email: from.email,
            phone_number: from.phoneNumber,
            address: from.address,
            is_gtc_accepted: from.termsAccepted,
            is_marketing_accepted: from.marketingAccepted,
            groups: from.groups,
        };
    };
    return UserAdapter;
}());
exports.UserAdapter = UserAdapter;
//# sourceMappingURL=userAdapter.js.map