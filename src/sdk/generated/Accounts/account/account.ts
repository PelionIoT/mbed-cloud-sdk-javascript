import { Entity } from "../../../common/entity";
import { AccountMfaStatusEnum, AccountStatusEnum } from "./types";
import { PasswordPolicy } from "../passwordPolicy/passwordPolicy";
import { Policy } from "../policy/policy";

/**
 * Account
 */
export interface Account extends Entity {
    /**
     * Postal address line 1.
     */
    readonly addressLine1?: string;

    /**
     * Postal address line 2.
     */
    readonly addressLine2?: string;

    /**
     * The email address of the account admin, not longer than 254 characters.
     */
    readonly adminEmail?: string;

    /**
     * The full name of the admin user to be created.
     */
    readonly adminFullName?: string;

    /**
     * The ID of the admin user created.
     */
    readonly adminId?: string;

    /**
     * The admin API key created for the account.
     */
    readonly adminKey?: string;

    /**
     * The username of the admin user to be created, containing alphanumerical letters and -,._@+= characters. It must be at least 4 but not more than 30 character long.
     */
    readonly adminName?: string;

    /**
     * The password when creating a new user. It will be generated when not present in the request.
     */
    readonly adminPassword?: string;

    /**
     * An array of aliases.
     */
    readonly aliases?: Array<string>;

    /**
     * The city part of the postal address.
     */
    readonly city?: string;

    /**
     * The name of the company.
     */
    readonly company?: string;

    /**
     * The name of the contact person for this account.
     */
    readonly contact?: string;

    /**
     * Contract number of the customer.
     */
    readonly contractNumber?: string;

    /**
     * The country part of the postal address.
     */
    readonly country?: string;

    /**
     * Creation UTC time RFC3339.
     */
    readonly createdAt?: Date;

    /**
     * Account&#39;s custom properties as key-value pairs.
     */
    readonly customFields?: { [key: string]: string };

    /**
     * Customer number of the customer.
     */
    readonly customerNumber?: string;

    /**
     * The display name for the account.
     */
    readonly displayName?: string;

    /**
     * The company email address for this account.
     */
    readonly email?: string;

    /**
     * Account end market.
     */
    readonly endMarket?: string;

    /**
     * Indicates how many days (1-180) before account expiration a notification email should be sent.
     */
    readonly expirationWarningThreshold?: string;

    /**
     * The reference token expiration time in minutes for this account.
     */
    readonly idleTimeout?: string;

    /**
     * List of limits as key-value pairs if requested.
     */
    readonly limits?: { [key: string]: string };

    /**
     * The enforcement status of the multi-factor authentication, either &#39;enforced&#39; or &#39;optional&#39;.
     */
    readonly mfaStatus?: AccountMfaStatusEnum;

    /**
     * A list of notification email addresses.
     */
    readonly notificationEmails?: Array<string>;

    /**
     * This object represents parent account contact details in responses.
     */
    readonly parentAccount?: any;

    /**
     * The ID of the parent account, if it has any.
     */
    readonly parentId?: string;

    /**
     * password_policy
     */
    readonly passwordPolicy?: PasswordPolicy;

    /**
     * The phone number of a representative of the company.
     */
    readonly phoneNumber?: string;

    /**
     * List of policies if requested.
     */
    readonly policies?: Array<Policy>;

    /**
     * The postal code part of the postal address.
     */
    readonly postalCode?: string;

    /**
     * A reason note for updating the status of the account
     */
    readonly reason?: string;

    /**
     * A reference note for updating the status of the account
     */
    readonly referenceNote?: string;

    /**
     * Email address of the sales contact.
     */
    readonly salesContact?: string;

    /**
     * The state part of the postal address.
     */
    readonly state?: string;

    /**
     * The status of the account.
     */
    readonly status?: AccountStatusEnum;

    /**
     * Account template ID.
     */
    readonly templateId?: string;

    /**
     * The tier level of the account; &#39;0&#39;: free tier, &#39;1&#39;: commercial account, &#39;2&#39;: partner tier. Other values are reserved for the future.
     */
    readonly tier?: string;

    /**
     * Last update UTC time RFC3339.
     */
    readonly updatedAt?: Date;

    /**
     * Time when upgraded to commercial account in UTC format RFC3339.
     */
    readonly upgradedAt?: Date;
}
