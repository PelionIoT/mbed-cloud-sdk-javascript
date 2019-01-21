import { ListOptions } from "../../../../common/interfaces";
import { PasswordPolicy } from "../passwordPolicy/passwordPolicy";
export type AccountMfaStatusEnum = "enforced" | "optional";
export type AccountStatusEnum = "ENROLLING" | "ACTIVE" | "RESTRICTED" | "SUSPENDED";
/**
 *AccountCreateRequest
 */
export interface AccountCreateRequest {
    /**
     *addressLine1
     */
    readonly addressLine1?: string;

    /**
     *addressLine2
     */
    readonly addressLine2?: string;

    /**
     *adminEmail
     */
    readonly adminEmail?: string;

    /**
     *adminFullName
     */
    readonly adminFullName?: string;

    /**
     *adminName
     */
    readonly adminName?: string;

    /**
     *adminPassword
     */
    readonly adminPassword?: string;

    /**
     *aliases
     */
    readonly aliases?: Array<string>;

    /**
     *city
     */
    readonly city?: string;

    /**
     *company
     */
    readonly company?: string;

    /**
     *contact
     */
    readonly contact?: string;

    /**
     *contractNumber
     */
    readonly contractNumber?: string;

    /**
     *country
     */
    readonly country?: string;

    /**
     *customerNumber
     */
    readonly customerNumber?: string;

    /**
     *displayName
     */
    readonly displayName?: string;

    /**
     *email
     */
    readonly email?: string;

    /**
     *endMarket
     */
    readonly endMarket: string;

    /**
     *phoneNumber
     */
    readonly phoneNumber?: string;

    /**
     *postalCode
     */
    readonly postalCode?: string;

    /**
     *state
     */
    readonly state?: string;
}
/**
 *AccountUpdateRequest
 */
export interface AccountUpdateRequest {
    /**
     *addressLine1
     */
    readonly addressLine1?: string;

    /**
     *addressLine2
     */
    readonly addressLine2?: string;

    /**
     *aliases
     */
    readonly aliases?: Array<string>;

    /**
     *city
     */
    readonly city?: string;

    /**
     *company
     */
    readonly company?: string;

    /**
     *contact
     */
    readonly contact?: string;

    /**
     *contractNumber
     */
    readonly contractNumber?: string;

    /**
     *country
     */
    readonly country?: string;

    /**
     *customFields
     */
    readonly customFields?: { [key: string]: string };

    /**
     *customerNumber
     */
    readonly customerNumber?: string;

    /**
     *displayName
     */
    readonly displayName?: string;

    /**
     *email
     */
    readonly email?: string;

    /**
     *endMarket
     */
    readonly endMarket?: string;

    /**
     *expirationWarningThreshold
     */
    readonly expirationWarningThreshold?: string;

    /**
     *idleTimeout
     */
    readonly idleTimeout?: string;

    /**
     *mfaStatus
     */
    readonly mfaStatus?: AccountMfaStatusEnum;

    /**
     *notificationEmails
     */
    readonly notificationEmails?: Array<string>;

    /**
     *passwordPolicy
     */
    readonly passwordPolicy?: PasswordPolicy;

    /**
     *phoneNumber
     */
    readonly phoneNumber?: string;

    /**
     *postalCode
     */
    readonly postalCode?: string;

    /**
     *salesContact
     */
    readonly salesContact?: string;

    /**
     *state
     */
    readonly state?: string;
}
/**
 *AccountListOptions
 */
export interface AccountListOptions extends ListOptions {
    /**
     *format
     */
    format?: string;

    /**
     *properties
     */
    properties?: string;
}
