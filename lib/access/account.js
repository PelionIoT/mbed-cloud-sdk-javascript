"use strict";
/*
 * Account
 */
var Account = (function () {
    function Account(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Account.map = function (from) {
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
        return new Account(type);
    };
    return Account;
}());
exports.Account = Account;
