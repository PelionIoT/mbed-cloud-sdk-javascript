"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var adapter_1 = require("../../../common/adapter");
var __1 = require("../..");
var __2 = require("../..");
var __3 = require("../..");
/**
 *Account adapter
 */
var AccountAdapter = /** @class */ (function (_super) {
    __extends(AccountAdapter, _super);
    function AccountAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    AccountAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var policies = [];
        if (data.policies) {
            policies = data.policies.map(function (i) { return __3.PolicyAdapter.fromApi(i); });
        }
        var mappedEntity = AccountAdapter.assignDefined(instance || {}, {
            _discriminator: "ACCOUNT",
            addressLine1: data.address_line1,
            addressLine2: data.address_line2,
            adminEmail: data.admin_email,
            adminFullName: data.admin_full_name,
            adminId: data.admin_id,
            adminKey: data.admin_key,
            adminName: data.admin_name,
            adminPassword: data.admin_password,
            aliases: data.aliases,
            city: data.city,
            company: data.company,
            contact: data.contact,
            contractNumber: data.contract_number,
            country: data.country,
            createdAt: data.created_at,
            customFields: data.custom_fields,
            customerNumber: data.customer_number,
            displayName: data.display_name,
            email: data.email,
            endMarket: data.end_market,
            expiration: data.expiration,
            expirationWarningThreshold: data.expiration_warning_threshold || 1,
            id: data.id,
            idleTimeout: data.idle_timeout || 1,
            limits: data.limits,
            mfaStatus: data.mfa_status,
            notificationEmails: data.notification_emails,
            parentAccount: __1.ParentAccountAdapter.fromApi(data.parent_account),
            parentId: data.parent_id,
            passwordPolicy: __2.PasswordPolicyAdapter.fromApi(data.password_policy),
            passwordRecoveryExpiration: data.password_recovery_expiration || 1,
            phoneNumber: data.phone_number,
            policies: policies,
            postalCode: data.postal_code,
            reason: data.reason,
            referenceNote: data.reference_note,
            salesContact: data.sales_contact,
            state: data.state,
            status: data.status,
            templateId: data.template_id,
            tier: data.tier,
            updatedAt: data.updated_at,
            upgradedAt: data.upgraded_at,
        });
        return mappedEntity;
    };
    return AccountAdapter;
}(adapter_1.Adapter));
exports.AccountAdapter = AccountAdapter;
//# sourceMappingURL=accountAdapter.js.map