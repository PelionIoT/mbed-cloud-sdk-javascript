import { Adapter } from "../../../common/adapter";
import { Account } from "./account";

export class AccountAdapter extends Adapter {
    public static fromApi(data: any, instance?: Account): Account {
        return AccountAdapter.assignDefined<Account>(instance || {},
            {
                discriminator: "ACCOUNT",
                displayName: data.display_name,
                aliases: data.aliases,
                company: data.company,
                contact: data.contact,
                email: data.email,
                phoneNumber: data.phone_number,
                addressLine1: data.address_line1,
                addressLine2: data.address_line2,
                city: data.city,
                state: data.state,
                postalCode: data.postal_code,
                country: data.country,
                id: data.id,
                status: data.status,
                tier: data.tier,
                limits: data.limits,
                // policies: policies,
                createdAt: data.created_at,
                upgradedAt: data.upgraded_at,
                reason: data.reason,
                templateId: data.template_id,
                customerNumber: data.customer_number,
                expirationWarningThreshold: data.expiration_warning_threshold,
                salesContact: data.sales_contact,
                mfaStatus: data.mfa_status,
                notificationEmails: data.notification_emails,
                referenceNote: data.reference_note,
                updatedAt: data.updated_at,
                contractNumber: data.contract_number,
            });
    }
}
