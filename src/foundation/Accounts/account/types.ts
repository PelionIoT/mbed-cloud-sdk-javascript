import { ListOptions } from "../../../legacy/common/interfaces";
import { PasswordPolicy } from "../passwordPolicy/passwordPolicy";
export type AccountMfaStatus = "enforced" | "optional";
export type AccountStatus = "ENROLLING" | "ACTIVE" | "RESTRICTED" | "SUSPENDED";
/**
 *AccountCreateRequest
 */
export interface AccountCreateRequest {
    /**
     *Postal address line 1.
     *@example 110 Fulbourn Rd
     */
    readonly addressLine1?: string;

    /**
     *Postal address line 2.
     *@example
     */
    readonly addressLine2?: string;

    /**
     *The email address of the admin user created for this account. Present only in the response for the account creation.
     *@example admin@arm.com
     */
    readonly adminEmail?: string;

    /**
     *The full name of the admin user created for this account. Present only in the response for the account creation.
     *@example Admin Doe
     */
    readonly adminFullName?: string;

    /**
     *The username of the admin user created for this account. Present only in the response for the account creation.
     *@example admin
     */
    readonly adminName?: string;

    /**
     *The password of the admin user created for this account. Present only in the response for the account creation.
     *@example PZf9eEUH43DAPE9ULINFeuj
     */
    readonly adminPassword?: string;

    /**
     *aliases
     */
    readonly aliases?: Array<string>;

    /**
     *The city part of the postal address.
     *@example Cambridge
     */
    readonly city?: string;

    /**
     *The name of the company.
     *@example ARM Holdings Plc
     */
    readonly company?: string;

    /**
     *The name of the contact person for this account.
     *@example J. Doe
     */
    readonly contact?: string;

    /**
     *Contract number of the customer.
     *@example 1NX25_0001
     */
    readonly contractNumber?: string;

    /**
     *The country part of the postal address.
     *@example United Kingdom
     */
    readonly country?: string;

    /**
     *Customer number of the customer.
     *@example 1NC25_0001
     */
    readonly customerNumber?: string;

    /**
     *The display name for the account.
     *@example ARM
     */
    readonly displayName?: string;

    /**
     *The company email address for this account.
     *@example info@arm.com
     */
    readonly email?: string;

    /**
     *Account end market.
     *@example IT
     */
    readonly endMarket?: string;

    /**
     *The phone number of a representative of the company.
     *@example +44 (1223) 400 400
     */
    readonly phoneNumber?: string;

    /**
     *The postal code part of the postal address.
     *@example CB1 9NJ
     */
    readonly postalCode?: string;

    /**
     *The state part of the postal address.
     *@example
     */
    readonly state?: string;
}
/**
 *AccountUpdateRequest
 */
export interface AccountUpdateRequest {
    /**
     *Postal address line 1.
     *@example 110 Fulbourn Rd
     */
    readonly addressLine1?: string;

    /**
     *Postal address line 2.
     *@example
     */
    readonly addressLine2?: string;

    /**
     *aliases
     */
    readonly aliases?: Array<string>;

    /**
     *The city part of the postal address.
     *@example Cambridge
     */
    readonly city?: string;

    /**
     *The name of the company.
     *@example ARM Holdings Plc
     */
    readonly company?: string;

    /**
     *The name of the contact person for this account.
     *@example J. Doe
     */
    readonly contact?: string;

    /**
     *Contract number of the customer.
     *@example 1NX25_0001
     */
    readonly contractNumber?: string;

    /**
     *The country part of the postal address.
     *@example United Kingdom
     */
    readonly country?: string;

    /**
     *Account's custom properties as key-value pairs.
     */
    readonly customFields?: { [key: string]: string };

    /**
     *Customer number of the customer.
     *@example 1NC25_0001
     */
    readonly customerNumber?: string;

    /**
     *The display name for the account.
     *@example ARM
     */
    readonly displayName?: string;

    /**
     *The company email address for this account.
     *@example info@arm.com
     */
    readonly email?: string;

    /**
     *Account end market.
     *@example IT
     */
    readonly endMarket?: string;

    /**
     *Indicates how many days (1-180) before account expiration a notification email should be sent.
     *@example 180
     */
    readonly expirationWarningThreshold?: string;

    /**
     *The reference token expiration time in minutes for this account.
     *@example 30
     */
    readonly idleTimeout?: string;

    /**
     *The enforcement status of the multi-factor authentication, either 'enforced' or 'optional'.
     */
    readonly mfaStatus?: AccountMfaStatus;

    /**
     *notificationEmails
     */
    readonly notificationEmails?: Array<string>;

    /**
     *passwordPolicy
     */
    readonly passwordPolicy?: PasswordPolicy;

    /**
     *Indicates how many minutes a password recovery email for users of this account is valid for. Valid range is: 1-45.
     */
    readonly passwordRecoveryExpiration?: number;

    /**
     *The phone number of a representative of the company.
     *@example +44 (1223) 400 400
     */
    readonly phoneNumber?: string;

    /**
     *The postal code part of the postal address.
     *@example CB1 9NJ
     */
    readonly postalCode?: string;

    /**
     *Email address of the sales contact.
     *@example sales@arm.com
     */
    readonly salesContact?: string;

    /**
     *The state part of the postal address.
     *@example
     */
    readonly state?: string;
}
/**
 *AccountStatusFilter
 */
export interface AccountStatusFilter {
    /**
     *eq
     */
    eq?: AccountStatus;

    /**
     *in
     */
    in?: Array<AccountStatus>;

    /**
     *nin
     */
    nin?: Array<AccountStatus>;
}
/**
 *AccountTierFilter
 */
export interface AccountTierFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *AccountParentFilter
 */
export interface AccountParentFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *AccountEndMarketFilter
 */
export interface AccountEndMarketFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *AccountCountryFilter
 */
export interface AccountCountryFilter {
    /**
     *like
     */
    like?: string;
}
/**
 *AccountFilter
 */
export interface AccountFilter {
    /**
     *status
     */
    status?: AccountStatus | AccountStatusFilter;

    /**
     *tier
     */
    tier?: string | AccountTierFilter;

    /**
     *parent
     */
    parent?: string | AccountParentFilter;

    /**
     *endMarket
     */
    endMarket?: string | AccountEndMarketFilter;

    /**
     *country
     */
    country?: AccountCountryFilter;
}
/**
 *AccountListOptions
 */
export interface AccountListOptions extends ListOptions {
    /**
     *Format information for the response to the query, supported: format=breakdown.
     */
    format?: string;

    /**
     *Property name to be returned from account specific properties.
     */
    properties?: string;

    /**
     *filter
     */
    filter?: AccountFilter;
}
/**
 *SubtenantTrustedCertificateNameFilter
 */
export interface SubtenantTrustedCertificateNameFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *SubtenantTrustedCertificateServiceFilter
 */
export interface SubtenantTrustedCertificateServiceFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *SubtenantTrustedCertificateExpireFilter
 */
export interface SubtenantTrustedCertificateExpireFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *SubtenantTrustedCertificateDeviceExecutionModeFilter
 */
export interface SubtenantTrustedCertificateDeviceExecutionModeFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;
}
/**
 *SubtenantTrustedCertificateOwnerFilter
 */
export interface SubtenantTrustedCertificateOwnerFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *SubtenantTrustedCertificateEnrollmentModeFilter
 */
export interface SubtenantTrustedCertificateEnrollmentModeFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *SubtenantTrustedCertificateStatusFilter
 */
export interface SubtenantTrustedCertificateStatusFilter {
    /**
     *eq
     */
    eq?: AccountStatus;
}
/**
 *SubtenantTrustedCertificateIssuerFilter
 */
export interface SubtenantTrustedCertificateIssuerFilter {
    /**
     *like
     */
    like?: string;
}
/**
 *SubtenantTrustedCertificateSubjectFilter
 */
export interface SubtenantTrustedCertificateSubjectFilter {
    /**
     *like
     */
    like?: string;
}
/**
 *SubtenantTrustedCertificateValidFilter
 */
export interface SubtenantTrustedCertificateValidFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *SubtenantTrustedCertificateFilter
 */
export interface SubtenantTrustedCertificateFilter {
    /**
     *name
     */
    name?: string | SubtenantTrustedCertificateNameFilter;

    /**
     *service
     */
    service?: string | SubtenantTrustedCertificateServiceFilter;

    /**
     *expire
     */
    expire?: string | SubtenantTrustedCertificateExpireFilter;

    /**
     *deviceExecutionMode
     */
    deviceExecutionMode?: string | SubtenantTrustedCertificateDeviceExecutionModeFilter;

    /**
     *owner
     */
    owner?: string | SubtenantTrustedCertificateOwnerFilter;

    /**
     *enrollmentMode
     */
    enrollmentMode?: string | SubtenantTrustedCertificateEnrollmentModeFilter;

    /**
     *status
     */
    status?: AccountStatus | SubtenantTrustedCertificateStatusFilter;

    /**
     *issuer
     */
    issuer?: SubtenantTrustedCertificateIssuerFilter;

    /**
     *subject
     */
    subject?: SubtenantTrustedCertificateSubjectFilter;

    /**
     *valid
     */
    valid?: string | SubtenantTrustedCertificateValidFilter;
}
/**
 *SubtenantTrustedCertificateListOptions
 */
export interface SubtenantTrustedCertificateListOptions extends ListOptions {
    /**
     *filter
     */
    filter?: SubtenantTrustedCertificateFilter;
}
/**
 *SubtenantUserInvitationLoginProfileFilter
 */
export interface SubtenantUserInvitationLoginProfileFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *SubtenantUserInvitationFilter
 */
export interface SubtenantUserInvitationFilter {
    /**
     *loginProfile
     */
    loginProfile?: string | SubtenantUserInvitationLoginProfileFilter;
}
/**
 *SubtenantUserInvitationListOptions
 */
export interface SubtenantUserInvitationListOptions extends ListOptions {
    /**
     *filter
     */
    filter?: SubtenantUserInvitationFilter;
}
/**
 *SubtenantUserEmailFilter
 */
export interface SubtenantUserEmailFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *SubtenantUserStatusFilter
 */
export interface SubtenantUserStatusFilter {
    /**
     *eq
     */
    eq?: AccountStatus;

    /**
     *in
     */
    in?: Array<AccountStatus>;

    /**
     *nin
     */
    nin?: Array<AccountStatus>;
}
/**
 *SubtenantUserLoginProfileFilter
 */
export interface SubtenantUserLoginProfileFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *SubtenantUserFilter
 */
export interface SubtenantUserFilter {
    /**
     *email
     */
    email?: string | SubtenantUserEmailFilter;

    /**
     *status
     */
    status?: AccountStatus | SubtenantUserStatusFilter;

    /**
     *loginProfile
     */
    loginProfile?: string | SubtenantUserLoginProfileFilter;
}
/**
 *SubtenantUserListOptions
 */
export interface SubtenantUserListOptions extends ListOptions {
    /**
     *filter
     */
    filter?: SubtenantUserFilter;
}
