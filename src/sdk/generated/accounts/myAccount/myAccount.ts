import { EntityBase } from "../../../common/entityBase";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { SubtenantAccount } from "../../index";

/**
 * MyAccount
 */
export class MyAccount extends EntityBase {
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
     * gets a MyAccount.
     * @returns Promise containing MyAccount.
     */
    public get(include?: string, properties?: string): Promise<MyAccount> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<MyAccount>(
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
     * updates a MyAccount.
     * @returns Promise containing MyAccount.
     */
    public update(): Promise<MyAccount> {
        const body = {
            address_line1: this.addressLine1,
            address_line2: this.addressLine2,
            aliases: this.aliases,
            city: this.city,
            company: this.company,
            contact: this.contact,
            country: this.country,
            custom_fields: this.customFields,
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
            state: this.state,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<MyAccount>(
                    {
                        url: "/v3/accounts/me",
                        method: "PUT",
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
}
