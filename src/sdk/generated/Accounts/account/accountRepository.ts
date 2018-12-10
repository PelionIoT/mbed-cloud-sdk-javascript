import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { ListOptions } from "../../../../common/interfaces";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { User } from "../user/user";
import { AccountCreateRequest, AccountUpdateRequest } from "./types";

export class AccountRepository extends Repository {
    /**
     * creates a Account.
     * @returns Promise containing Account.
     */
    public create(request: AccountCreateRequest, action?: string): Promise<Account> {
        const body = {
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
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Account>(
                    {
                        url: "/v3/accounts",
                        method: "POST",
                        query: {
                            action: action,
                        },
                        body: body,
                    },
                    undefined,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * gets a Account.
     * @returns Promise containing Account.
     */
    public get(id: string, include?: string, properties?: string): Promise<Account> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Account>(
                    {
                        url: "/v3/accounts/{account_id}",
                        method: "GET",
                        query: {
                            include: include,
                            properties: properties,
                        },
                        pathParams: {
                            account_id: id,
                        },
                    },
                    undefined,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * List Accounts
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<Account, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<Account>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<Account>(
                        {
                            url: "/v3/accounts",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        undefined,
                        resultsFn
                    );
                },
                (data: ListResponse<Account>, done) => {
                    done(null, new ListResponse(data, data.data));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * mes a Account.
     * @returns Promise containing Account.
     */
    public me(include?: string, properties?: string): Promise<Account> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Account>(
                    {
                        url: "/v3/accounts/me",
                        method: "GET",
                        query: {
                            include: include,
                            properties: properties,
                        },
                    },
                    undefined,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * updates a Account.
     * @returns Promise containing Account.
     */
    public update(id: string, request: AccountUpdateRequest): Promise<Account> {
        const body = {
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
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Account>(
                    {
                        url: "/v3/accounts/{account_id}",
                        method: "PUT",
                        pathParams: {
                            account_id: id,
                        },
                        body: body,
                    },
                    undefined,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * List Users
     * @param options filter options
     */
    public users(id: string, options?: ListOptions): Paginator<User, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<User>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<User>(
                        {
                            url: "/v3/accounts/{account_id}/users",
                            method: "GET",
                            query: { after, include, order, limit },
                            pathParams: {
                                account_id: id,
                            },
                            paginated: true,
                        },
                        undefined,
                        resultsFn
                    );
                },
                (data: ListResponse<User>, done) => {
                    done(null, new ListResponse(data, data.data));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
}
