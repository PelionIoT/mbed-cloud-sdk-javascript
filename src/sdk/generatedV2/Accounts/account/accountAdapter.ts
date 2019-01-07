import { Adapter } from "../../../common/adapter";
import { Account } from "./account";
import { PasswordPolicyAdapter } from "../..";
import { PolicyAdapter } from "../..";
/**
 *Account adapter
 */
export class AccountAdapter extends Adapter {
    public static fromApi(data: any, instance?: Account): Account {
        let policies = [];
        if (data.policies) {
            policies = data.policies.map(i => PolicyAdapter.fromApi(i));
        }
        return AccountAdapter.assignDefined<Account>(instance || {}, {
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
            expirationWarningThreshold: data.expiration_warning_threshold,
            id: data.id,
            idleTimeout: data.idle_timeout,
            limits: data.limits,
            mfaStatus: data.mfa_status,
            notificationEmails: data.notification_emails,
            parentAccount: data.parent_account,
            parentId: data.parent_id,
            passwordPolicy: PasswordPolicyAdapter.fromApi(data.password_policy),
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
    }
}
