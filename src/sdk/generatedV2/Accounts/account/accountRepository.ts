import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { Account } from "./account";
import { AccountCreateRequest } from "./types";
import { AccountUpdateRequest } from "./types";
/**
 *Account repository
 */
export class AccountRepository extends Repository {
    public create(request: AccountCreateRequest, action?: string): Promise<Account> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts",
                        method: "POST",
                        query: {
                            action: action,
                        },
                        body: {
                            address_line1: request.addressLine1,
                            address_line2: request.addressLine2,
                            admin_email: request.adminEmail,
                            admin_full_name: request.adminFullName,
                            admin_name: request.adminName,
                            admin_password: request.adminPassword,
                            aliases: request.aliases,
                            city: request.city,
                            company: request.company,
                            contact: request.contact,
                            contract_number: request.contractNumber,
                            country: request.country,
                            customer_number: request.customerNumber,
                            display_name: request.displayName,
                            email: request.email,
                            end_market: request.endMarket,
                            phone_number: request.phoneNumber,
                            postal_code: request.postalCode,
                            state: request.state,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public get(id: string, options?: { include?: string; properties?: string }): Promise<Account> {
        options = options || {};
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}",
                        method: "GET",
                        query: {
                            include: options.include,
                            properties: options.properties,
                        },
                        pathParams: {
                            account_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public me(options?: { include?: string; properties?: string }): Promise<Account> {
        options = options || {};
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/me",
                        method: "GET",
                        query: {
                            include: options.include,
                            properties: options.properties,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public update(request: AccountUpdateRequest, id: string): Promise<Account> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}",
                        method: "PUT",
                        pathParams: {
                            account_id: id,
                        },
                        body: {
                            address_line1: request.addressLine1,
                            address_line2: request.addressLine2,
                            aliases: request.aliases,
                            city: request.city,
                            company: request.company,
                            contact: request.contact,
                            contract_number: request.contractNumber,
                            country: request.country,
                            custom_fields: request.customFields,
                            customer_number: request.customerNumber,
                            display_name: request.displayName,
                            email: request.email,
                            end_market: request.endMarket,
                            expiration_warning_threshold: request.expirationWarningThreshold,
                            idle_timeout: request.idleTimeout,
                            mfa_status: request.mfaStatus,
                            notification_emails: request.notificationEmails,
                            password_policy: request.passwordPolicy,
                            phone_number: request.phoneNumber,
                            postal_code: request.postalCode,
                            sales_contact: request.salesContact,
                            state: request.state,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
}
