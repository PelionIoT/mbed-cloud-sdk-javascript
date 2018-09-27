import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { ApiKey } from "../../index";
import { User } from "../../index";
import { PolicyGroup } from "../../index";

/**
 * SubtenantAccount
 */
export class SubtenantAccount extends EntityBase {
    public readonly _foreignKeys: { [key: string]: { [key: string]: any } } = {
        subtenantAccount: {
            type: SubtenantAccount,
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
    public customFields?: any;

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
    public limits?: any;

    /**
     * The enforcement status of the multi-factor authentication, either &#39;enforced&#39; or &#39;optional&#39;.
     */
    public mfaStatus?: string;

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
    public passwordPolicy?: any;

    /**
     * The phone number of a representative of the company.
     */
    public phoneNumber?: string;

    /**
     * List of policies if requested.
     */
    public policies?: Array<any>;

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
    public status?: string;

    /**
     * List of sub accounts. Not available for developer users.
     */
    public subAccounts?: Array<SubtenantAccount>;

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
     * List ApiKeys
     * @param options filter options
     */
    public apiKeys(options?: ListOptions): Paginator<ApiKey, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<ApiKey>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<ApiKey>(
                        {
                            url: "/v3/accounts/{accountID}/api-keys",
                            method: "GET",
                            query: { after, include, order, limit },
                            pathParams: {
                                accountID: this.id,
                            },
                            paginated: true,
                        },
                        new ApiKey(),
                        resultsFn
                    );
                },
                (data: ListResponse<ApiKey>, done) => {
                    done(null, new ListResponse(data, data.data));
                }
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * creates a SubtenantAccount.
     * @returns Promise containing SubtenantAccount.
     */
    public create(action?: string): Promise<SubtenantAccount> {
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
                this.client._CallApi<SubtenantAccount>(
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
     * createUser a User.
     */
    public createUser(user: User): Promise<User> {
        user.accountId = this.id;
        return user.create();
    }

    /**
     * gets a SubtenantAccount.
     * @returns Promise containing SubtenantAccount.
     */
    public get(include?: string, properties?: string): Promise<SubtenantAccount> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<SubtenantAccount>(
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
     * List PolicyGroups
     * @param options filter options
     */
    public groups(options?: ListOptions): Paginator<PolicyGroup, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<PolicyGroup>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<PolicyGroup>(
                        {
                            url: "/v3/accounts/{accountID}/policy-groups",
                            method: "GET",
                            query: { after, include, order, limit },
                            pathParams: {
                                accountID: this.id,
                            },
                            paginated: true,
                        },
                        new PolicyGroup(),
                        resultsFn
                    );
                },
                (data: ListResponse<PolicyGroup>, done) => {
                    done(null, new ListResponse(data, data.data));
                }
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * List SubtenantAccounts
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<SubtenantAccount, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<SubtenantAccount>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<SubtenantAccount>(
                        {
                            url: "/v3/accounts",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        new SubtenantAccount(),
                        resultsFn
                    );
                },
                (data: ListResponse<SubtenantAccount>, done) => {
                    done(null, new ListResponse(data, data.data));
                }
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * updates a SubtenantAccount.
     * @returns Promise containing SubtenantAccount.
     */
    public update(): Promise<SubtenantAccount> {
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
                this.client._CallApi<SubtenantAccount>(
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
     * List Users
     * @param options filter options
     */
    public users(options?: ListOptions): Paginator<User, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<User>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<User>(
                        {
                            url: "/v3/accounts/{accountID}/users",
                            method: "GET",
                            query: { after, include, order, limit },
                            pathParams: {
                                accountID: this.id,
                            },
                            paginated: true,
                        },
                        new User(),
                        resultsFn
                    );
                },
                (data: ListResponse<User>, done) => {
                    done(null, new ListResponse(data, data.data));
                }
            );
        };
        return new Paginator(pageFunc, options);
    }
}
