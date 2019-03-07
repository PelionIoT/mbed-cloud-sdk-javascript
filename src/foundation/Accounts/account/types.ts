import { ListOptions } from "../../../legacy/common/interfaces";
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
    readonly endMarket?: string;

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
     *passwordRecoveryExpiration
     */
    readonly passwordRecoveryExpiration?: number;

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
 *AccountStatusFilter
 */
export interface AccountStatusFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *in
     */
    in?: string;

    /**
     *nin
     */
    nin?: string;
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
    status?: AccountStatusFilter;

    /**
     *tier
     */
    tier?: AccountTierFilter;

    /**
     *parent
     */
    parent?: AccountParentFilter;

    /**
     *end_market
     */
    end_market?: AccountEndMarketFilter;

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
     *format
     */
    format?: string;

    /**
     *properties
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
    eq?: string;
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
    name?: SubtenantTrustedCertificateNameFilter;

    /**
     *service
     */
    service?: SubtenantTrustedCertificateServiceFilter;

    /**
     *expire
     */
    expire?: SubtenantTrustedCertificateExpireFilter;

    /**
     *device_execution_mode
     */
    device_execution_mode?: SubtenantTrustedCertificateDeviceExecutionModeFilter;

    /**
     *owner
     */
    owner?: SubtenantTrustedCertificateOwnerFilter;

    /**
     *enrollment_mode
     */
    enrollment_mode?: SubtenantTrustedCertificateEnrollmentModeFilter;

    /**
     *status
     */
    status?: SubtenantTrustedCertificateStatusFilter;

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
    valid?: SubtenantTrustedCertificateValidFilter;
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
     *login_profile
     */
    login_profile?: SubtenantUserInvitationLoginProfileFilter;
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
    eq?: string;

    /**
     *in
     */
    in?: string;

    /**
     *nin
     */
    nin?: string;
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
    email?: SubtenantUserEmailFilter;

    /**
     *status
     */
    status?: SubtenantUserStatusFilter;

    /**
     *login_profile
     */
    login_profile?: SubtenantUserLoginProfileFilter;
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
