import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { SubtenantTrustedCertificate } from "../../index";
import { SubtenantUserInvitation } from "../../index";
import { SubtenantUser } from "../../index";
import { PasswordPolicy } from "../../index";
import { Policy } from "../../index";
import { AccountMfaStatusEnum } from "../../enums";
import { AccountStatusEnum } from "../../enums";

/**
 * Account
 */
export class Account extends EntityBase {
    public readonly _foreignKeys: { [key: string]: { [key: string]: any } } = {
        passwordPolicy: {
            type: PasswordPolicy,
            array: false,
        },
        policy: {
            type: Policy,
            array: true,
        },
    };

    /**
     * Postal address line 1.
     */
    public addressLine1?: string;

    /**
     * Postal address line 2.
     */
    public addressLine2?: string;

    /**
     * The email address of the account admin, not longer than 254 characters.
     */
    public adminEmail?: string;

    /**
     * The full name of the admin user to be created.
     */
    public adminFullName?: string;

    /**
     * The ID of the admin user created.
     */
    public adminId?: string;

    /**
     * The admin API key created for the account.
     */
    public adminKey?: string;

    /**
     * The username of the admin user to be created, containing alphanumerical letters and -,._@+= characters. It must be at least 4 but not more than 30 character long.
     */
    public adminName?: string;

    /**
     * The password when creating a new user. It will be generated when not present in the request.
     */
    public adminPassword?: string;

    /**
     * An array of aliases.
     */
    public aliases?: Array<string>;

    /**
     * The city part of the postal address.
     */
    public city?: string;

    /**
     * The name of the company.
     */
    public company?: string;

    /**
     * The name of the contact person for this account.
     */
    public contact?: string;

    /**
     * Contract number of the customer.
     */
    public contractNumber?: string;

    /**
     * The country part of the postal address.
     */
    public country?: string;

    /**
     * Creation UTC time RFC3339.
     */
    public createdAt?: Date;

    /**
     * Account&#39;s custom properties as key-value pairs.
     */
    public customFields?: { [key: string]: string };

    /**
     * Customer number of the customer.
     */
    public customerNumber?: string;

    /**
     * The display name for the account.
     */
    public displayName?: string;

    /**
     * The company email address for this account.
     */
    public email?: string;

    /**
     * Account end market.
     */
    public endMarket?: string;

    /**
     * Indicates how many days (1-180) before account expiration a notification email should be sent.
     */
    public expirationWarningThreshold?: string;

    /**
     * The reference token expiration time in minutes for this account.
     */
    public idleTimeout?: string;

    /**
     * List of limits as key-value pairs if requested.
     */
    public limits?: { [key: string]: string };

    /**
     * The enforcement status of the multi-factor authentication, either &#39;enforced&#39; or &#39;optional&#39;.
     */
    public mfaStatus?: AccountMfaStatusEnum;

    /**
     * A list of notification email addresses.
     */
    public notificationEmails?: Array<string>;

    /**
     * The ID of the parent account, if it has any.
     */
    public parentId?: string;

    /**
     * password_policy
     */
    public passwordPolicy?: PasswordPolicy;

    /**
     * The phone number of a representative of the company.
     */
    public phoneNumber?: string;

    /**
     * List of policies if requested.
     */
    public policies?: Array<Policy>;

    /**
     * The postal code part of the postal address.
     */
    public postalCode?: string;

    /**
     * A reason note for updating the status of the account
     */
    public reason?: string;

    /**
     * A reference note for updating the status of the account
     */
    public referenceNote?: string;

    /**
     * Email address of the sales contact.
     */
    public salesContact?: string;

    /**
     * The state part of the postal address.
     */
    public state?: string;

    /**
     * The status of the account.
     */
    public status?: AccountStatusEnum;

    /**
     * Account template ID.
     */
    public templateId?: string;

    /**
     * The tier level of the account; &#39;0&#39;: free tier, &#39;1&#39;: commercial account, &#39;2&#39;: partner tier. Other values are reserved for the future.
     */
    public tier?: string;

    /**
     * Last update UTC time RFC3339.
     */
    public updatedAt?: Date;

    /**
     * Time when upgraded to commercial account in UTC format RFC3339.
     */
    public upgradedAt?: Date;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * creates a Account.
     * @returns Promise containing Account.
     */
    public create(action?: string): Promise<Account> {
        const body = {
            address_line1: this.addressLine1,
            address_line2: this.addressLine2,
            admin_email: this.adminEmail,
            admin_full_name: this.adminFullName,
            admin_name: this.adminName,
            admin_password: this.adminPassword,
            aliases: this.aliases,
            city: this.city,
            company: this.company,
            contact: this.contact,
            contract_number: this.contractNumber,
            country: this.country,
            customer_number: this.customerNumber,
            display_name: this.displayName,
            email: this.email,
            end_market: this.endMarket,
            phone_number: this.phoneNumber,
            postal_code: this.postalCode,
            state: this.state,
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
                    this,
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
    public get(include?: string, properties?: string): Promise<Account> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Account>(
                    {
                        url: "/v3/accounts/{accountID}",
                        method: "GET",
                        query: {
                            include: include,
                            properties: properties,
                        },
                        pathParams: {
                            accountID: this.id,
                        },
                    },
                    this,
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
                        Account,
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
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * List SubtenantTrustedCertificates
     * @param options filter options
     */
    public trustedCertificates(options?: ListOptions): Paginator<SubtenantTrustedCertificate, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<SubtenantTrustedCertificate>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<SubtenantTrustedCertificate>(
                        {
                            url: "/v3/accounts/{accountID}/trusted-certificates",
                            method: "GET",
                            query: { after, include, order, limit },
                            pathParams: {
                                accountID: this.id,
                            },
                            paginated: true,
                        },
                        SubtenantTrustedCertificate,
                        resultsFn
                    );
                },
                (data: ListResponse<SubtenantTrustedCertificate>, done) => {
                    done(null, new ListResponse(data, data.data));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * updates a Account.
     * @returns Promise containing Account.
     */
    public update(): Promise<Account> {
        const body = {
            address_line1: this.addressLine1,
            address_line2: this.addressLine2,
            aliases: this.aliases,
            city: this.city,
            company: this.company,
            contact: this.contact,
            contract_number: this.contractNumber,
            country: this.country,
            custom_fields: this.customFields,
            customer_number: this.customerNumber,
            display_name: this.displayName,
            email: this.email,
            end_market: this.endMarket,
            expiration_warning_threshold: this.expirationWarningThreshold,
            idle_timeout: this.idleTimeout,
            mfa_status: this.mfaStatus,
            notification_emails: this.notificationEmails,
            password_policy: this.passwordPolicy,
            phone_number: this.phoneNumber,
            postal_code: this.postalCode,
            sales_contact: this.salesContact,
            state: this.state,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Account>(
                    {
                        url: "/v3/accounts/{accountID}",
                        method: "PUT",
                        pathParams: {
                            accountID: this.id,
                        },
                        body: body,
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * List SubtenantUserInvitations
     * @param options filter options
     */
    public userInvitations(options?: ListOptions): Paginator<SubtenantUserInvitation, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<SubtenantUserInvitation>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<SubtenantUserInvitation>(
                        {
                            url: "/v3/accounts/{account-id}/user-invitations",
                            method: "GET",
                            query: { after, include, order, limit },
                            pathParams: {
                                "account-id": this.id,
                            },
                            paginated: true,
                        },
                        SubtenantUserInvitation,
                        resultsFn
                    );
                },
                (data: ListResponse<SubtenantUserInvitation>, done) => {
                    done(null, new ListResponse(data, data.data));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * List SubtenantUsers
     * @param options filter options
     */
    public users(options?: ListOptions): Paginator<SubtenantUser, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<SubtenantUser>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<SubtenantUser>(
                        {
                            url: "/v3/accounts/{accountID}/users",
                            method: "GET",
                            query: { after, include, order, limit },
                            pathParams: {
                                accountID: this.id,
                            },
                            paginated: true,
                        },
                        SubtenantUser,
                        resultsFn
                    );
                },
                (data: ListResponse<SubtenantUser>, done) => {
                    done(null, new ListResponse(data, data.data));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
}
