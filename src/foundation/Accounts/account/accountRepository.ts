import { Repository } from "common/repository";
import { apiWrapper } from "common/functions";
import { Account } from "./account";
import { AccountAdapter } from "../../index";
import { AccountCreateRequest } from "./types";
import { AccountListOptions } from "./types";
import { SubtenantTrustedCertificate } from "../../index";
import { SubtenantTrustedCertificateAdapter } from "../../index";
import { AccountUpdateRequest } from "./types";
import { SubtenantUserInvitation } from "../../index";
import { SubtenantUserInvitationAdapter } from "../../index";
import { SubtenantUser } from "../../index";
import { SubtenantUserAdapter } from "../../index";
import { Paginator } from "common/pagination";
import { ListResponse } from "common/listResponse";
import { ListOptions } from "common/interfaces";
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
            (data, done) => {
                done(null, AccountAdapter.fromApi(data, request));
            }
        );
    }
    public list(options?: AccountListOptions): Paginator<Account, ListOptions> {
        const pageFunc = (pageOptions: AccountListOptions): Promise<ListResponse<Account>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/accounts",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                format: pageOptions.format,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                                properties: pageOptions.properties,
                            },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<Account>, done) => {
                    done(null, new ListResponse(data, data.data, AccountAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
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
            (data, done) => {
                done(null, AccountAdapter.fromApi(data));
            }
        );
    }
    public read(id: string, options?: { include?: string; properties?: string }): Promise<Account> {
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
            (data, done) => {
                done(null, AccountAdapter.fromApi(data));
            }
        );
    }
    public trustedCertificates(id: string, options?: ListOptions): Paginator<SubtenantTrustedCertificate, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<SubtenantTrustedCertificate>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/accounts/{account_id}/trusted-certificates",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                            pathParams: {
                                account_id: id,
                            },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<SubtenantTrustedCertificate>, done) => {
                    done(null, new ListResponse(data, data.data, SubtenantTrustedCertificateAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
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
                            password_recovery_expiration: request.passwordRecoveryExpiration,
                            phone_number: request.phoneNumber,
                            postal_code: request.postalCode,
                            sales_contact: request.salesContact,
                            state: request.state,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, AccountAdapter.fromApi(data, request));
            }
        );
    }
    public userInvitations(id: string, options?: ListOptions): Paginator<SubtenantUserInvitation, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<SubtenantUserInvitation>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/accounts/{account_id}/user-invitations",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                            pathParams: {
                                account_id: id,
                            },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<SubtenantUserInvitation>, done) => {
                    done(null, new ListResponse(data, data.data, SubtenantUserInvitationAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    public users(id: string, options?: ListOptions): Paginator<SubtenantUser, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<SubtenantUser>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/accounts/{account_id}/users",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                            pathParams: {
                                account_id: id,
                            },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<SubtenantUser>, done) => {
                    done(null, new ListResponse(data, data.data, SubtenantUserAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
}
