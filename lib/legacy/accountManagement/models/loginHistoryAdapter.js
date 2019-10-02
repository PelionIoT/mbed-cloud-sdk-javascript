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
var loginHistory_1 = require("./loginHistory");
/**
 * Login History Adapter
 */
var LoginHistoryAdapter = /** @class */ (function () {
    function LoginHistoryAdapter() {
    }
    LoginHistoryAdapter.map = function (from) {
        return new loginHistory_1.LoginHistory({
            date: from.date,
            userAgent: from.user_agent,
            ipAddress: from.ip_address,
            success: from.success,
        });
    };
    return LoginHistoryAdapter;
}());
exports.LoginHistoryAdapter = LoginHistoryAdapter;
//# sourceMappingURL=loginHistoryAdapter.js.map