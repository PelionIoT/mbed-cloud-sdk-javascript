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
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../common/functions");
/*
 * User
 */
var User = (function () {
    function User(options, _api) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    User.map = function (from, api) {
        var type = {
            accountId: from.account_id,
            address: from.address,
            createdAt: from.created_at,
            creationTime: from.creation_time,
            email: from.email,
            emailVerified: from.email_verified,
            fullName: from.full_name,
            termsAccepted: from.is_gtc_accepted,
            id: from.id,
            lastLoginTime: from.last_login_time,
            marketingAccepted: from.is_marketing_accepted,
            password: from.password,
            passwordChangedTime: from.password_changed_time,
            phoneNumber: from.phone_number,
            status: from.status,
            username: from.username
        };
        return new User(type, api);
    };
    User.reverseMap = function (from) {
        return {
            id: null,
            username: from.username,
            phone_number: from.phoneNumber,
            is_marketing_accepted: from.marketingAccepted,
            is_gtc_accepted: from.termsAccepted,
            full_name: from.fullName,
            address: from.address,
            password: from.password,
            email: from.email
        };
    };
    User.prototype.update = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.updateUser({
                id: _this.id,
                address: options.address,
                email: options.email,
                fullName: options.fullName,
                marketingAccepted: options.marketingAccepted,
                password: options.password,
                phoneNumber: options.phoneNumber,
                termsAccepted: options.termsAccepted,
                username: options.username
            }, done);
        }, callback);
    };
    User.prototype.listApiKeys = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var attributes = options.attributes || {};
        attributes["owner"] = this.id;
        options.attributes = attributes;
        return functions_1.asyncStyle(function (done) {
            _this._api.listApiKeys(options, done);
        }, callback);
    };
    User.prototype.delete = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.deleteUser(_this, done);
        }, callback);
    };
    return User;
}());
exports.User = User;
