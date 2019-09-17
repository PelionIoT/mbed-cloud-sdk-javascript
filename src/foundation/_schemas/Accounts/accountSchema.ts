import { Schema } from "../../../schema/schema";

export const accountSchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "Account",
        fields: [
            {
                name: "addressLine1",
                apiName: "address_line1",
                type: "string",
            },
            {
                name: "addressLine2",
                apiName: "address_line2",
                type: "string",
            },
            {
                name: "adminEmail",
                apiName: "admin_email",
                type: "string",
            },
            {
                name: "adminFullName",
                apiName: "admin_full_name",
                type: "string",
            },
            {
                name: "adminId",
                apiName: "admin_id",
                type: "string",
            },
            {
                name: "adminKey",
                apiName: "admin_key",
                type: "string",
            },
            {
                name: "adminName",
                apiName: "admin_name",
                type: "string",
            },
            {
                name: "adminPassword",
                apiName: "admin_password",
                type: "string",
            },
            {
                name: "aliases",
                apiName: "aliases",
                type: "Array<string>",
            },
            {
                name: "businessModel",
                apiName: "business_model",
                type: "AccountBusinessModel",
            },
            {
                name: "businessModelHistory",
                apiName: "business_model_history",
                type: "Array<any>",
            },
            {
                name: "city",
                apiName: "city",
                type: "string",
            },
            {
                name: "company",
                apiName: "company",
                type: "string",
            },
            {
                name: "contact",
                apiName: "contact",
                type: "string",
            },
            {
                name: "contractNumber",
                apiName: "contract_number",
                type: "string",
            },
            {
                name: "country",
                apiName: "country",
                type: "string",
            },
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "customFields",
                apiName: "custom_fields",
                type: "{ [key: string]: string }",
            },
            {
                name: "customerNumber",
                apiName: "customer_number",
                type: "string",
            },
            {
                name: "displayName",
                apiName: "display_name",
                type: "string",
            },
            {
                name: "email",
                apiName: "email",
                type: "string",
            },
            {
                name: "endMarket",
                apiName: "end_market",
                type: "string",
            },
            {
                name: "expiration",
                apiName: "expiration",
                type: "Date",
            },
            {
                name: "expirationWarningThreshold",
                apiName: "expiration_warning_threshold",
                type: "number",
            },
            {
                name: "idleTimeout",
                apiName: "idle_timeout",
                type: "number",
            },
            {
                name: "limitations",
                apiName: "limitations",
                type: "Array<any>",
            },
            {
                name: "limits",
                apiName: "limits",
                type: "{ [key: string]: string }",
            },
            {
                name: "mfaStatus",
                apiName: "mfa_status",
                type: "AccountMfaStatus",
            },
            {
                name: "notificationEmails",
                apiName: "notification_emails",
                type: "Array<string>",
            },
            {
                name: "parentAccount",
                apiName: "parent_account",
                type: "ParentAccount",
            },
            {
                name: "parentId",
                apiName: "parent_id",
                type: "string",
            },
            {
                name: "passwordPolicy",
                apiName: "password_policy",
                type: "PasswordPolicy",
            },
            {
                name: "passwordRecoveryExpiration",
                apiName: "password_recovery_expiration",
                type: "number",
            },
            {
                name: "phoneNumber",
                apiName: "phone_number",
                type: "string",
            },
            {
                name: "policies",
                apiName: "policies",
                type: "Array<Policy>",
            },
            {
                name: "postalCode",
                apiName: "postal_code",
                type: "string",
            },
            {
                name: "reason",
                apiName: "reason",
                type: "string",
            },
            {
                name: "referenceNote",
                apiName: "reference_note",
                type: "string",
            },
            {
                name: "salesContact",
                apiName: "sales_contact",
                type: "string",
            },
            {
                name: "state",
                apiName: "state",
                type: "string",
            },
            {
                name: "status",
                apiName: "status",
                type: "AccountStatus",
            },
            {
                name: "templateId",
                apiName: "template_id",
                type: "string",
            },
            {
                name: "tier",
                apiName: "tier",
                type: "string",
            },
            {
                name: "updatedAt",
                apiName: "updated_at",
                type: "Date",
            },
            {
                name: "upgradedAt",
                apiName: "upgraded_at",
                type: "Date",
            },
        ],

        methods: [
            {
                name: "apiKeys",
                returnType: "Paginator<SubtenantApiKey, ListOptions>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "options",
                        position: 1,
                        type: "Object",
                        subParams: [
                            {
                                name: "after",
                                type: "string",
                            },
                            {
                                name: "limit",
                                type: "number",
                            },
                            {
                                name: "order",
                                type: "string",
                            },
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "maxResults",
                                type: "string",
                            },
                            {
                                name: "filter",
                                type: "AccountSubtenantUserFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "create",
                returnType: "Promise<Account>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "addressLine1",
                                type: "string",
                            },
                            {
                                name: "addressLine2",
                                type: "string",
                            },
                            {
                                name: "adminEmail",
                                type: "string",
                            },
                            {
                                name: "adminFullName",
                                type: "string",
                            },
                            {
                                name: "adminName",
                                type: "string",
                            },
                            {
                                name: "adminPassword",
                                type: "string",
                            },
                            {
                                name: "aliases",
                                type: "Array<string>",
                            },
                            {
                                name: "businessModel",
                                type: "AccountBusinessModel",
                            },
                            {
                                name: "city",
                                type: "string",
                            },
                            {
                                name: "company",
                                type: "string",
                            },
                            {
                                name: "contact",
                                type: "string",
                            },
                            {
                                name: "contractNumber",
                                type: "string",
                            },
                            {
                                name: "country",
                                type: "string",
                            },
                            {
                                name: "customerNumber",
                                type: "string",
                            },
                            {
                                name: "displayName",
                                type: "string",
                            },
                            {
                                name: "email",
                                type: "string",
                            },
                            {
                                name: "endMarket",
                                type: "string",
                            },
                            {
                                name: "phoneNumber",
                                type: "string",
                            },
                            {
                                name: "postalCode",
                                type: "string",
                            },
                            {
                                name: "state",
                                type: "string",
                            },
                        ],
                    },
                    {
                        name: "action",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "darkThemeBrandingColors",
                returnType: "Paginator<SubtenantDarkThemeColor, ListOptions>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "options",
                        position: 1,
                        type: "Object",
                        subParams: [
                            {
                                name: "after",
                                type: "string",
                            },
                            {
                                name: "limit",
                                type: "number",
                            },
                            {
                                name: "order",
                                type: "string",
                            },
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "maxResults",
                                type: "string",
                            },
                        ],
                    },
                ],
            },
            {
                name: "darkThemeBrandingImages",
                returnType: "Paginator<SubtenantDarkThemeImage, ListOptions>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "options",
                        position: 1,
                        type: "Object",
                        subParams: [
                            {
                                name: "after",
                                type: "string",
                            },
                            {
                                name: "limit",
                                type: "number",
                            },
                            {
                                name: "order",
                                type: "string",
                            },
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "maxResults",
                                type: "string",
                            },
                        ],
                    },
                ],
            },
            {
                name: "lightThemeBrandingColors",
                returnType: "Paginator<SubtenantLightThemeColor, ListOptions>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "options",
                        position: 1,
                        type: "Object",
                        subParams: [
                            {
                                name: "after",
                                type: "string",
                            },
                            {
                                name: "limit",
                                type: "number",
                            },
                            {
                                name: "order",
                                type: "string",
                            },
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "maxResults",
                                type: "string",
                            },
                        ],
                    },
                ],
            },
            {
                name: "lightThemeBrandingImages",
                returnType: "Paginator<SubtenantLightThemeImage, ListOptions>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "options",
                        position: 1,
                        type: "Object",
                        subParams: [
                            {
                                name: "after",
                                type: "string",
                            },
                            {
                                name: "limit",
                                type: "number",
                            },
                            {
                                name: "order",
                                type: "string",
                            },
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "maxResults",
                                type: "string",
                            },
                        ],
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<Account, ListOptions>",
                parameters: [
                    {
                        name: "options",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "after",
                                type: "string",
                            },
                            {
                                name: "limit",
                                type: "number",
                            },
                            {
                                name: "order",
                                type: "string",
                            },
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "maxResults",
                                type: "string",
                            },
                            {
                                name: "filter",
                                type: "AccountSubtenantUserFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "me",
                returnType: "Promise<Account>",
                parameters: [
                    {
                        name: "options",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "properties",
                                type: "string",
                            },
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<Account>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "options",
                        position: 1,
                        type: "Object",
                        subParams: [
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "properties",
                                type: "string",
                            },
                        ],
                    },
                ],
            },
            {
                name: "trustedCertificates",
                returnType: "Paginator<SubtenantTrustedCertificate, ListOptions>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "options",
                        position: 1,
                        type: "Object",
                        subParams: [
                            {
                                name: "after",
                                type: "string",
                            },
                            {
                                name: "limit",
                                type: "number",
                            },
                            {
                                name: "order",
                                type: "string",
                            },
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "maxResults",
                                type: "string",
                            },
                            {
                                name: "filter",
                                type: "AccountSubtenantUserFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<Account>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "addressLine1",
                                type: "string",
                            },
                            {
                                name: "addressLine2",
                                type: "string",
                            },
                            {
                                name: "aliases",
                                type: "Array<string>",
                            },
                            {
                                name: "businessModel",
                                type: "AccountBusinessModel",
                            },
                            {
                                name: "city",
                                type: "string",
                            },
                            {
                                name: "company",
                                type: "string",
                            },
                            {
                                name: "contact",
                                type: "string",
                            },
                            {
                                name: "contractNumber",
                                type: "string",
                            },
                            {
                                name: "country",
                                type: "string",
                            },
                            {
                                name: "customFields",
                                type: "{ [key: string]: string }",
                            },
                            {
                                name: "customerNumber",
                                type: "string",
                            },
                            {
                                name: "displayName",
                                type: "string",
                            },
                            {
                                name: "email",
                                type: "string",
                            },
                            {
                                name: "endMarket",
                                type: "string",
                            },
                            {
                                name: "expirationWarningThreshold",
                                type: "number",
                            },
                            {
                                name: "idleTimeout",
                                type: "number",
                            },
                            {
                                name: "mfaStatus",
                                type: "AccountMfaStatus",
                            },
                            {
                                name: "notificationEmails",
                                type: "Array<string>",
                            },
                            {
                                name: "passwordPolicy",
                                type: "PasswordPolicy",
                            },
                            {
                                name: "passwordRecoveryExpiration",
                                type: "number",
                            },
                            {
                                name: "phoneNumber",
                                type: "string",
                            },
                            {
                                name: "postalCode",
                                type: "string",
                            },
                            {
                                name: "salesContact",
                                type: "string",
                            },
                            {
                                name: "state",
                                type: "string",
                            },
                        ],
                    },
                    {
                        name: "accountId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "userInvitations",
                returnType: "Paginator<SubtenantUserInvitation, ListOptions>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "options",
                        position: 1,
                        type: "Object",
                        subParams: [
                            {
                                name: "after",
                                type: "string",
                            },
                            {
                                name: "limit",
                                type: "number",
                            },
                            {
                                name: "order",
                                type: "string",
                            },
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "maxResults",
                                type: "string",
                            },
                            {
                                name: "filter",
                                type: "AccountSubtenantUserFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "users",
                returnType: "Paginator<SubtenantUser, ListOptions>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "options",
                        position: 1,
                        type: "Object",
                        subParams: [
                            {
                                name: "after",
                                type: "string",
                            },
                            {
                                name: "limit",
                                type: "number",
                            },
                            {
                                name: "order",
                                type: "string",
                            },
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "maxResults",
                                type: "string",
                            },
                            {
                                name: "filter",
                                type: "AccountSubtenantUserFilter",
                            },
                        ],
                    },
                ],
            },
        ],
    });
};
