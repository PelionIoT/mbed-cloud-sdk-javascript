"use strict";
/*
 * User
 */
var User = (function () {
    function User(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    User.map = function (from) {
        var type = {
            accountId: from.account_id,
            address: from.address,
            createdAt: from.created_at,
            creationTime: from.creation_time,
            email: from.email,
            emailVerified: from.email_verified,
            fullName: from.full_name,
            groups: from.groups,
            gtcAccepted: from.is_gtc_accepted,
            id: from.id,
            lastLoginTime: from.last_login_time,
            marketingAccepted: from.is_marketing_accepted,
            password: from.password,
            passwordChangedTime: from.password_changed_time,
            phoneNumber: from.phone_number,
            status: from.status,
            username: from.username
        };
        return new User(type);
    };
    return User;
}());
exports.User = User;
