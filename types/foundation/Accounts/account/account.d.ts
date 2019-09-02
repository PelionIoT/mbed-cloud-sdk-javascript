import { Entity } from "../../../common/entity";
import { ParentAccount } from "../parentAccount/parentAccount";
import { PasswordPolicy } from "../passwordPolicy/passwordPolicy";
import { Policy } from "../policy/policy";
import { AccountMfaStatus, AccountStatus } from "./types";
/**
 *Account
 */
export interface Account extends Entity {
    /**
     *Postal address line 1.
     *@example 110 Fulbourn Rd
     */
    addressLine1?: string;
    /**
     *Postal address line 2.
     *@example
     */
    addressLine2?: string;
    /**
     *The email address of the admin user created for this account. Present only in the response for account creation.
     *@example admin@arm.com
     */
    adminEmail?: string;
    /**
     *The full name of the admin user created for this account. Present only in the response for account creation.
     *@example Admin Doe
     */
    adminFullName?: string;
    /**
     *The ID of the admin user created for this account.
     *@example 01619571e2e89242ac12000600000000
     */
    readonly adminId?: string;
    /**
     *The admin API key created for this account. Present only in the response for account creation.
     *@example ak_1MDE2MTk1NzFmNmU4MDI0MmFjMTIwMDA2MDAwMDAwMDA01619571f7020242ac12000600000000B40IkJADMANmAscAj0Ot0n2yeQnyt9tT
     */
    readonly adminKey?: string;
    /**
     *The username of the admin user created for this account. Present only in the response for account creation.
     *@example admin
     */
    adminName?: string;
    /**
     *The password of the admin user created for this account. Present only in the response for account creation.
     *@example PZf9eEUH43DAPE9ULINFeuj
     */
    adminPassword?: string;
    /**
     *aliases
     */
    aliases?: Array<string>;
    /**
     *The city part of the postal address.
     *@example Cambridge
     */
    city?: string;
    /**
     *The name of the company.
     *@example ARM Holdings Plc
     */
    company?: string;
    /**
     *The name of the contact person for this account.
     *@example J. Doe
     */
    contact?: string;
    /**
     *Contract number of the customer.
     *@example 1NX25_0001
     */
    contractNumber?: string;
    /**
     *The country part of the postal address.
     *@example United Kingdom
     */
    country?: string;
    /**
     *Creation UTC time RFC3339.
     *@example 2018-02-13T09:35:20Z
     */
    readonly createdAt?: Date;
    /**
     *Account's custom properties as key-value pairs.
     */
    customFields?: {
        [key: string]: string;
    };
    /**
     *Customer number of the customer.
     *@example 1NC25_0001
     */
    customerNumber?: string;
    /**
     *The display name for the account.
     *@example ARM
     */
    displayName?: string;
    /**
     *The company email address for this account.
     *@example info@arm.com
     */
    email?: string;
    /**
     *Account end market.
     *@example IT
     */
    endMarket: string;
    /**
     *Expiration time of the account, as UTC time RFC3339.
     */
    readonly expiration?: Date;
    /**
     *Indicates how many days (1-180) before account expiration a notification email is sent.
     *@example 180
     */
    expirationWarningThreshold?: number;
    /**
     *The reference token expiration time, in minutes, for this account.
     *@example 30
     */
    idleTimeout?: number;
    /**
     *List of limits as key-value pairs if requested.
     */
    readonly limits?: {
        [key: string]: string;
    };
    /**
     *The enforcement status of multi-factor authentication, either `enforced` or `optional`.
     */
    mfaStatus?: AccountMfaStatus;
    /**
     *notificationEmails
     */
    notificationEmails?: Array<string>;
    /**
     *Represents parent account contact details in responses.
     */
    readonly parentAccount?: ParentAccount;
    /**
     *The ID of the parent account, if any.
     *@example 01619571dad80242ac12000600000000
     */
    readonly parentId?: string;
    /**
     *The password policy for this account.
     */
    passwordPolicy?: PasswordPolicy;
    /**
     *Indicates for how many minutes a password recovery email is valid.
     */
    passwordRecoveryExpiration?: number;
    /**
     *The phone number of a company representative.
     *@example +44 (1223) 400 400
     */
    phoneNumber?: string;
    /**
     *Represents a feature policy. Either the feature or the resource must be specified.
     */
    readonly policies?: Array<Policy>;
    /**
     *The postal code part of the postal address.
     *@example CB1 9NJ
     */
    postalCode?: string;
    /**
     *A note with the reason for account status update.
     *@example Subscription paid.
     */
    readonly reason?: string;
    /**
     *A reference note for updating the status of the account.
     *@example ARM-INT-0001
     */
    readonly referenceNote?: string;
    /**
     *Email address of the sales contact.
     *@example sales@arm.com
     */
    salesContact?: string;
    /**
     *The state part of the postal address.
     *@example
     */
    state?: string;
    /**
     *The status of the account.
     *@example ACTIVE
     */
    readonly status?: AccountStatus;
    /**
     *Account template ID.
     *@example 01619571e7160242ac12000600000000
     */
    readonly templateId?: string;
    /**
     *The tier level of the account; `0`: free tier, `1`: commercial account, `2`: partner tier. Other values are reserved for the future.
     *@example 1
     */
    readonly tier?: string;
    /**
     *Last update UTC time RFC3339.
     *@example 2018-02-14T15:24:14Z
     */
    readonly updatedAt?: Date;
    /**
     *Time when upgraded to commercial account in UTC format RFC3339.
     *@example 2018-02-14T15:24:14Z
     */
    readonly upgradedAt?: Date;
}
