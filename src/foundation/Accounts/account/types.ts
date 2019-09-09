import { ListOptions } from "../../../common";
import { PasswordPolicy } from "../passwordPolicy/passwordPolicy";
export type AccountBusinessModel = "active_device_business_model" | "api_calls_1_business_model";
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
     *Business model for this account. Manageable by the root admin only.
     *@example api_calls_1_business_model
     */
    readonly businessModel?: AccountBusinessModel;

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
     *Business model for this account. Manageable by the root admin only.
     *@example api_calls_1_business_model
     */
    readonly businessModel?: AccountBusinessModel;

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
    readonly expirationWarningThreshold?: number;

    /**
     *The reference token expiration time, in minutes, for this account.
     *@example 30
     */
    readonly idleTimeout?: number;

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
     *Indicates for how many minutes a password recovery email is valid.
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
 *AccountSubtenantApiKeyKeyFilter
 */
export interface AccountSubtenantApiKeyKeyFilter {
    /**
     *key equal to
     */
    eq?: string;
}
/**
 *AccountSubtenantApiKeyOwnerFilter
 */
export interface AccountSubtenantApiKeyOwnerFilter {
    /**
     *owner equal to
     */
    eq?: string;
}
/**
 *AccountSubtenantApiKeyFilter
 */
export interface AccountSubtenantApiKeyFilter {
    /**
     *Filter by key on SubtenantApiKey
     */
    key?: string | AccountSubtenantApiKeyKeyFilter;

    /**
     *Filter by owner on SubtenantApiKey
     */
    owner?: string | AccountSubtenantApiKeyOwnerFilter;
}
/**
 *AccountSubtenantApiKeyListOptions
 */
export interface AccountSubtenantApiKeyListOptions extends ListOptions {
    /**
     *Filter for SubtenantApiKey
     */
    filter?: AccountSubtenantApiKeyFilter;
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
 *AccountSubtenantTrustedCertificateNameFilter
 */
export interface AccountSubtenantTrustedCertificateNameFilter {
    /**
     *name equal to
     */
    eq?: string;
}
/**
 *AccountSubtenantTrustedCertificateServiceFilter
 */
export interface AccountSubtenantTrustedCertificateServiceFilter {
    /**
     *service equal to
     */
    eq?: string;
}
/**
 *AccountSubtenantTrustedCertificateExpireFilter
 */
export interface AccountSubtenantTrustedCertificateExpireFilter {
    /**
     *expire equal to
     */
    eq?: string;
}
/**
 *AccountSubtenantTrustedCertificateDeviceExecutionModeFilter
 */
export interface AccountSubtenantTrustedCertificateDeviceExecutionModeFilter {
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
 *AccountSubtenantTrustedCertificateOwnerFilter
 */
export interface AccountSubtenantTrustedCertificateOwnerFilter {
    /**
     *owner equal to
     */
    eq?: string;
}
/**
 *AccountSubtenantTrustedCertificateEnrollmentModeFilter
 */
export interface AccountSubtenantTrustedCertificateEnrollmentModeFilter {
    /**
     *enrollmentMode equal to
     */
    eq?: string;
}
/**
 *AccountSubtenantTrustedCertificateStatusFilter
 */
export interface AccountSubtenantTrustedCertificateStatusFilter {
    /**
     *status equal to
     */
    eq?: AccountStatus;
}
/**
 *AccountSubtenantTrustedCertificateIssuerFilter
 */
export interface AccountSubtenantTrustedCertificateIssuerFilter {
    /**
     *issuer like
     */
    like?: string;
}
/**
 *AccountSubtenantTrustedCertificateSubjectFilter
 */
export interface AccountSubtenantTrustedCertificateSubjectFilter {
    /**
     *subject like
     */
    like?: string;
}
/**
 *AccountSubtenantTrustedCertificateValidFilter
 */
export interface AccountSubtenantTrustedCertificateValidFilter {
    /**
     *valid equal to
     */
    eq?: string;
}
/**
 *AccountSubtenantTrustedCertificateFilter
 */
export interface AccountSubtenantTrustedCertificateFilter {
    /**
     *Filter by name on SubtenantTrustedCertificate
     */
    name?: string | AccountSubtenantTrustedCertificateNameFilter;

    /**
     *Filter by service on SubtenantTrustedCertificate
     */
    service?: string | AccountSubtenantTrustedCertificateServiceFilter;

    /**
     *Filter by expire on SubtenantTrustedCertificate
     */
    expire?: string | AccountSubtenantTrustedCertificateExpireFilter;

    /**
     *Filter by deviceExecutionMode on SubtenantTrustedCertificate
     */
    deviceExecutionMode?: string | AccountSubtenantTrustedCertificateDeviceExecutionModeFilter;

    /**
     *Filter by owner on SubtenantTrustedCertificate
     */
    owner?: string | AccountSubtenantTrustedCertificateOwnerFilter;

    /**
     *Filter by enrollmentMode on SubtenantTrustedCertificate
     */
    enrollmentMode?: string | AccountSubtenantTrustedCertificateEnrollmentModeFilter;

    /**
     *Filter by status on SubtenantTrustedCertificate
     */
    status?: AccountStatus | AccountSubtenantTrustedCertificateStatusFilter;

    /**
     *Filter by issuer on SubtenantTrustedCertificate
     */
    issuer?: AccountSubtenantTrustedCertificateIssuerFilter;

    /**
     *Filter by subject on SubtenantTrustedCertificate
     */
    subject?: AccountSubtenantTrustedCertificateSubjectFilter;

    /**
     *Filter by valid on SubtenantTrustedCertificate
     */
    valid?: string | AccountSubtenantTrustedCertificateValidFilter;
}
/**
 *AccountSubtenantTrustedCertificateListOptions
 */
export interface AccountSubtenantTrustedCertificateListOptions extends ListOptions {
    /**
     *Filter for SubtenantTrustedCertificate
     */
    filter?: AccountSubtenantTrustedCertificateFilter;
}
/**
 *AccountSubtenantUserInvitationLoginProfilesFilter
 */
export interface AccountSubtenantUserInvitationLoginProfilesFilter {
    /**
     *loginProfiles equal to
     */
    eq?: string;
}
/**
 *AccountSubtenantUserInvitationFilter
 */
export interface AccountSubtenantUserInvitationFilter {
    /**
     *Filter by loginProfiles on SubtenantUserInvitation
     */
    loginProfiles?: string | AccountSubtenantUserInvitationLoginProfilesFilter;
}
/**
 *AccountSubtenantUserInvitationListOptions
 */
export interface AccountSubtenantUserInvitationListOptions extends ListOptions {
    /**
     *Filter for SubtenantUserInvitation
     */
    filter?: AccountSubtenantUserInvitationFilter;
}
/**
 *AccountSubtenantUserEmailFilter
 */
export interface AccountSubtenantUserEmailFilter {
    /**
     *email equal to
     */
    eq?: string;
}
/**
 *AccountSubtenantUserStatusFilter
 */
export interface AccountSubtenantUserStatusFilter {
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
 *AccountSubtenantUserLoginProfilesFilter
 */
export interface AccountSubtenantUserLoginProfilesFilter {
    /**
     *loginProfiles equal to
     */
    eq?: string;
}
/**
 *AccountSubtenantUserFilter
 */
export interface AccountSubtenantUserFilter {
    /**
     *Filter by email on SubtenantUser
     */
    email?: string | AccountSubtenantUserEmailFilter;

    /**
     *Filter by status on SubtenantUser
     */
    status?: AccountStatus | AccountSubtenantUserStatusFilter;

    /**
     *Filter by loginProfiles on SubtenantUser
     */
    loginProfiles?: string | AccountSubtenantUserLoginProfilesFilter;
}
/**
 *AccountSubtenantUserListOptions
 */
export interface AccountSubtenantUserListOptions extends ListOptions {
    /**
     *Filter for SubtenantUser
     */
    filter?: AccountSubtenantUserFilter;
}
