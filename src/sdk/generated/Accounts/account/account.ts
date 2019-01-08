import { Entity } from "../../../common/entity";
import { ParentAccount } from "../parentAccount/parentAccount";
import { PasswordPolicy } from "../passwordPolicy/passwordPolicy";
import { Policy } from "../policy/policy";
import { AccountMfaStatusEnum, AccountStatusEnum } from "./types";
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
    adminId?: string;

    /**
     *adminKey
     */
    adminKey?: string;

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
    createdAt?: Date;

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
    endMarket?: string;

    /**
     *expirationWarningThreshold
     */
    expirationWarningThreshold?: string;

    /**
     *id
     */
    id?: string;

    /**
     *idleTimeout
     */
    idleTimeout?: string;

    /**
     *limits
     */
    limits?: { [key: string]: string };

    /**
     *mfaStatus
     */
    mfaStatus?: AccountMfaStatusEnum;

    /**
     *notificationEmails
     */
    notificationEmails?: Array<string>;

    /**
     *parentAccount
     */
    parentAccount?: ParentAccount;

    /**
     *parentId
     */
    parentId?: string;

    /**
     *passwordPolicy
     */
    passwordPolicy?: PasswordPolicy;

    /**
     *phoneNumber
     */
    phoneNumber?: string;

    /**
     *policies
     */
    policies?: Array<Policy>;

    /**
     *postalCode
     */
    postalCode?: string;

    /**
     *reason
     */
    reason?: string;

    /**
     *referenceNote
     */
    referenceNote?: string;

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
    status?: AccountStatusEnum;

    /**
     *templateId
     */
    templateId?: string;

    /**
     *tier
     */
    tier?: string;

    /**
     *updatedAt
     */
    updatedAt?: Date;

    /**
     *upgradedAt
     */
    upgradedAt?: Date;
}
