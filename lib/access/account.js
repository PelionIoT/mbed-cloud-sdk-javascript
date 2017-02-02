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
"use strict";
var functions_1 = require("../common/functions");
/*
 * Account
 */
var Account = (function () {
    function Account(options, _api) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Account.map = function (from, api) {
        var type = {
            addressLine1: from.address_line1,
            addressLine2: from.address_line2,
            aliases: from.aliases,
            city: from.city,
            company: from.company,
            contact: from.contact,
            country: from.country,
            createdAt: from.created_at,
            displayName: from.display_name,
            email: from.email,
            id: from.id,
            limits: from.limits,
            parentId: from.parentID,
            phoneNumber: from.phone_number,
            postcode: from.postal_code,
            provisioningAllowed: from.is_provisioning_allowed,
            state: from.state,
            status: from.status,
            templateId: from.template_id,
            tier: from.tier,
            upgradedAt: from.upgraded_at
        };
        return new Account(type, api);
    };
    Account.reverseMap = function (from) {
        return {
            address_line2: from.addressLine2,
            city: from.city,
            address_line1: from.addressLine1,
            display_name: from.displayName,
            country: from.country,
            company: from.company,
            state: from.state,
            contact: from.contact,
            postal_code: from.postcode,
            parentID: from.parentId,
            phone_number: from.phoneNumber,
            email: from.email,
            aliases: from.aliases
        };
    };
    Account.prototype.update = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.updateAccountDetails(options, done);
        }, callback);
    };
    return Account;
}());
exports.Account = Account;
