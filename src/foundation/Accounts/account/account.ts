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
     *addressLine1
     */
    addressLine1?: string;

    /**
     *addressLine2
     */
    addressLine2?: string;

    /**
     *adminEmail
     */
    adminEmail?: string;

    /**
     *adminFullName
     */
    adminFullName?: string;

    /**
     *adminId
     */
    readonly adminId?: string;

    /**
     *adminKey
     */
    readonly adminKey?: string;

    /**
     *adminName
     */
    adminName?: string;

    /**
     *adminPassword
     */
    adminPassword?: string;

    /**
     *aliases
     */
    aliases?: Array<string>;

    /**
     *city
     */
    city?: string;

    /**
     *company
     */
    company?: string;

    /**
     *contact
     */
    contact?: string;

    /**
     *contractNumber
     */
    contractNumber?: string;

    /**
     *country
     */
    country?: string;

    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *customFields
     */
    customFields?: { [key: string]: string };

    /**
     *customerNumber
     */
    customerNumber?: string;

    /**
     *displayName
     */
    displayName?: string;

    /**
     *email
     */
    email?: string;

    /**
     *endMarket
     */
    endMarket: string;

    /**
     *expiration
     */
    readonly expiration?: Date;

    /**
     *expirationWarningThreshold
     */
    expirationWarningThreshold?: string;

    /**
     *idleTimeout
     */
    idleTimeout?: string;

    /**
     *limits
     */
    readonly limits?: { [key: string]: string };

    /**
     *mfaStatus
     */
    mfaStatus?: AccountMfaStatus;

    /**
     *notificationEmails
     */
    notificationEmails?: Array<string>;

    /**
     *parentAccount
     */
    readonly parentAccount?: ParentAccount;

    /**
     *parentId
     */
    readonly parentId?: string;

    /**
     *passwordPolicy
     */
    passwordPolicy?: PasswordPolicy;

    /**
     *passwordRecoveryExpiration
     */
    passwordRecoveryExpiration?: number;

    /**
     *phoneNumber
     */
    phoneNumber?: string;

    /**
     *policies
     */
    readonly policies?: Array<Policy>;

    /**
     *postalCode
     */
    postalCode?: string;

    /**
     *reason
     */
    readonly reason?: string;

    /**
     *referenceNote
     */
    readonly referenceNote?: string;

    /**
     *salesContact
     */
    salesContact?: string;

    /**
     *state
     */
    state?: string;

    /**
     *status
     */
    readonly status?: AccountStatus;

    /**
     *templateId
     */
    readonly templateId?: string;

    /**
     *tier
     */
    readonly tier?: string;

    /**
     *updatedAt
     */
    readonly updatedAt?: Date;

    /**
     *upgradedAt
     */
    readonly upgradedAt?: Date;
}
