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
     *The email address of the admin user created for this account. Present only in the response for account creation.
     *@example admin@arm.com
     */
    readonly adminEmail?: string;

    /**
     *The full name of the admin user created for this account. Present only in the response for account creation.
     *@example Admin Doe
     */
    readonly adminFullName?: string;

    /**
     *The username of the admin user created for this account. Present only in the response for account creation.
     *@example admin
     */
    readonly adminName?: string;

    /**
     *The password of the admin user created for this account. Present only in the response for account creation.
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
     *The phone number of a company representative.
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
     *Indicates how many days (1-180) before account expiration a notification email is sent.
     *@example 180
     */
    readonly expirationWarningThreshold?: string;

    /**
     *The reference token expiration time, in minutes, for this account.
     *@example 30
     */
    readonly idleTimeout?: string;

    /**
     *The enforcement status of multi-factor authentication, either `enforced` or `optional`.
     */
    readonly mfaStatus?: AccountMfaStatus;

    /**
     *notificationEmails
     */
    readonly notificationEmails?: Array<string>;

    /**
     *The password policy for this account.
     */
    readonly passwordPolicy?: PasswordPolicy;

    /**
     *Indicates for how many minutes a password recovery email is valid (1-45).
     */
    readonly passwordRecoveryExpiration?: number;

    /**
     *The phone number of a company representative.
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
     *status equal to
     */
    eq?: AccountStatus;

    /**
     *status in
     */
    in?: Array<AccountStatus>;

    /**
     *status not in
     */
    nin?: Array<AccountStatus>;
}
/**
 *AccountTierFilter
 */
export interface AccountTierFilter {
    /**
     *tier equal to
     */
    eq?: string;
}
/**
 *AccountParentFilter
 */
export interface AccountParentFilter {
    /**
     *parent equal to
     */
    eq?: string;
}
/**
 *AccountEndMarketFilter
 */
export interface AccountEndMarketFilter {
    /**
     *endMarket equal to
     */
    eq?: string;
}
/**
 *AccountCountryFilter
 */
export interface AccountCountryFilter {
    /**
     *country like
     */
    like?: string;
}
/**
 *AccountFilter
 */
export interface AccountFilter {
    /**
     *Filter by status on Account
     */
    status?: AccountStatus | AccountStatusFilter;

    /**
     *Filter by tier on Account
     */
    tier?: string | AccountTierFilter;

    /**
     *Filter by parent on Account
     */
    parent?: string | AccountParentFilter;

    /**
     *Filter by endMarket on Account
     */
    endMarket?: string | AccountEndMarketFilter;

    /**
     *Filter by country on Account
     */
    country?: AccountCountryFilter;
}
/**
 *AccountListOptions
 */
export interface AccountListOptions extends ListOptions {
    /**
     *Format information for the query response. Supported: format=breakdown.
     */
    format?: string;

    /**
     *Property name returned from account-specific properties.
     */
    properties?: string;

    /**
     *Filter for Account
     */
    filter?: AccountFilter;
}
/**
 *SubtenantTrustedCertificateNameFilter
 */
export interface SubtenantTrustedCertificateNameFilter {
    /**
     *name equal to
     */
    eq?: string;
}
/**
 *SubtenantTrustedCertificateServiceFilter
 */
export interface SubtenantTrustedCertificateServiceFilter {
    /**
     *service equal to
     */
    eq?: string;
}
/**
 *SubtenantTrustedCertificateExpireFilter
 */
export interface SubtenantTrustedCertificateExpireFilter {
    /**
     *expire equal to
     */
    eq?: string;
}
/**
 *SubtenantTrustedCertificateDeviceExecutionModeFilter
 */
export interface SubtenantTrustedCertificateDeviceExecutionModeFilter {
    /**
     *deviceExecutionMode equal to
     */
    eq?: string;

    /**
     *deviceExecutionMode not equal to
     */
    neq?: string;
}
/**
 *SubtenantTrustedCertificateOwnerFilter
 */
export interface SubtenantTrustedCertificateOwnerFilter {
    /**
     *owner equal to
     */
    eq?: string;
}
/**
 *SubtenantTrustedCertificateEnrollmentModeFilter
 */
export interface SubtenantTrustedCertificateEnrollmentModeFilter {
    /**
     *enrollmentMode equal to
     */
    eq?: string;
}
/**
 *SubtenantTrustedCertificateStatusFilter
 */
export interface SubtenantTrustedCertificateStatusFilter {
    /**
     *status equal to
     */
    eq?: AccountStatus;
}
/**
 *SubtenantTrustedCertificateIssuerFilter
 */
export interface SubtenantTrustedCertificateIssuerFilter {
    /**
     *issuer like
     */
    like?: string;
}
/**
 *SubtenantTrustedCertificateSubjectFilter
 */
export interface SubtenantTrustedCertificateSubjectFilter {
    /**
     *subject like
     */
    like?: string;
}
/**
 *SubtenantTrustedCertificateValidFilter
 */
export interface SubtenantTrustedCertificateValidFilter {
    /**
     *valid equal to
     */
    eq?: string;
}
/**
 *SubtenantTrustedCertificateFilter
 */
export interface SubtenantTrustedCertificateFilter {
    /**
     *Filter by name on SubtenantTrustedCertificate
     */
    name?: string | SubtenantTrustedCertificateNameFilter;

    /**
     *Filter by service on SubtenantTrustedCertificate
     */
    service?: string | SubtenantTrustedCertificateServiceFilter;

    /**
     *Filter by expire on SubtenantTrustedCertificate
     */
    expire?: string | SubtenantTrustedCertificateExpireFilter;

    /**
     *Filter by deviceExecutionMode on SubtenantTrustedCertificate
     */
    deviceExecutionMode?: string | SubtenantTrustedCertificateDeviceExecutionModeFilter;

    /**
     *Filter by owner on SubtenantTrustedCertificate
     */
    owner?: string | SubtenantTrustedCertificateOwnerFilter;

    /**
     *Filter by enrollmentMode on SubtenantTrustedCertificate
     */
    enrollmentMode?: string | SubtenantTrustedCertificateEnrollmentModeFilter;

    /**
     *Filter by status on SubtenantTrustedCertificate
     */
    status?: AccountStatus | SubtenantTrustedCertificateStatusFilter;

    /**
     *Filter by issuer on SubtenantTrustedCertificate
     */
    issuer?: SubtenantTrustedCertificateIssuerFilter;

    /**
     *Filter by subject on SubtenantTrustedCertificate
     */
    subject?: SubtenantTrustedCertificateSubjectFilter;

    /**
     *Filter by valid on SubtenantTrustedCertificate
     */
    valid?: string | SubtenantTrustedCertificateValidFilter;
}
/**
 *SubtenantTrustedCertificateListOptions
 */
export interface SubtenantTrustedCertificateListOptions extends ListOptions {
    /**
     *Filter for SubtenantTrustedCertificate
     */
    filter?: SubtenantTrustedCertificateFilter;
}
/**
 *SubtenantUserInvitationLoginProfilesFilter
 */
export interface SubtenantUserInvitationLoginProfilesFilter {
    /**
     *loginProfiles equal to
     */
    eq?: string;
}
/**
 *SubtenantUserInvitationFilter
 */
export interface SubtenantUserInvitationFilter {
    /**
     *Filter by loginProfiles on SubtenantUserInvitation
     */
    loginProfiles?: string | SubtenantUserInvitationLoginProfilesFilter;
}
/**
 *SubtenantUserInvitationListOptions
 */
export interface SubtenantUserInvitationListOptions extends ListOptions {
    /**
     *Filter for SubtenantUserInvitation
     */
    filter?: SubtenantUserInvitationFilter;
}
/**
 *SubtenantUserEmailFilter
 */
export interface SubtenantUserEmailFilter {
    /**
     *email equal to
     */
    eq?: string;
}
/**
 *SubtenantUserStatusFilter
 */
export interface SubtenantUserStatusFilter {
    /**
     *status equal to
     */
    eq?: AccountStatus;

    /**
     *status in
     */
    in?: Array<AccountStatus>;

    /**
     *status not in
     */
    nin?: Array<AccountStatus>;
}
/**
 *SubtenantUserLoginProfilesFilter
 */
export interface SubtenantUserLoginProfilesFilter {
    /**
     *loginProfiles equal to
     */
    eq?: string;
}
/**
 *SubtenantUserFilter
 */
export interface SubtenantUserFilter {
    /**
     *Filter by email on SubtenantUser
     */
    email?: string | SubtenantUserEmailFilter;

    /**
     *Filter by status on SubtenantUser
     */
    status?: AccountStatus | SubtenantUserStatusFilter;

    /**
     *Filter by loginProfiles on SubtenantUser
     */
    loginProfiles?: string | SubtenantUserLoginProfilesFilter;
}
/**
 *SubtenantUserListOptions
 */
export interface SubtenantUserListOptions extends ListOptions {
    /**
     *Filter for SubtenantUser
     */
    filter?: SubtenantUserFilter;
}
