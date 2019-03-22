import { ListOptions } from "../../../legacy/common/interfaces";
export type TrustedCertificateService = "lwm2m" | "bootstrap";
export type TrustedCertificateStatus = "ACTIVE" | "INACTIVE";
/**
 *TrustedCertificateCreateRequest
 */
export interface TrustedCertificateCreateRequest {
    /**
     *X509.v3 trusted certificate in PEM format.
     *@example -----BEGIN CERTIFICATE----- ... -----END CERTIFICATE-----
     */
    readonly certificate?: string;

    /**
     *Human readable description of this certificate.
     *@example Certificate created by me.
     */
    readonly description?: string;

    /**
     *If true, signature is not required. Default value false.
     */
    readonly enrollmentMode?: boolean;

    /**
     *Certificate name.
     *@example My certificate
     */
    readonly name?: string;

    /**
     *Service name where the certificate is to be used.
     */
    readonly service?: TrustedCertificateService;

    /**
     *Status of the certificate.
     *@example ACTIVE
     */
    readonly status?: TrustedCertificateStatus;
}
/**
 *TrustedCertificateUpdateRequest
 */
export interface TrustedCertificateUpdateRequest {
    /**
     *X509.v3 trusted certificate in PEM format.
     *@example -----BEGIN CERTIFICATE----- ... -----END CERTIFICATE-----
     */
    readonly certificate?: string;

    /**
     *Human readable description of this certificate.
     *@example Certificate created by me.
     */
    readonly description?: string;

    /**
     *If true, signature is not required. Default value false.
     */
    readonly enrollmentMode?: boolean;

    /**
     *Certificate name.
     *@example My certificate
     */
    readonly name?: string;

    /**
     *Service name where the certificate is to be used.
     */
    readonly service?: TrustedCertificateService;

    /**
     *Status of the certificate.
     *@example ACTIVE
     */
    readonly status?: TrustedCertificateStatus;
}
/**
 *TrustedCertificateNameFilter
 */
export interface TrustedCertificateNameFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *TrustedCertificateServiceFilter
 */
export interface TrustedCertificateServiceFilter {
    /**
     *eq
     */
    eq?: TrustedCertificateService;
}
/**
 *TrustedCertificateExpireFilter
 */
export interface TrustedCertificateExpireFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *TrustedCertificateDeviceExecutionModeFilter
 */
export interface TrustedCertificateDeviceExecutionModeFilter {
    /**
     *eq
     */
    eq?: number;

    /**
     *neq
     */
    neq?: number;
}
/**
 *TrustedCertificateOwnerFilter
 */
export interface TrustedCertificateOwnerFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *TrustedCertificateEnrollmentModeFilter
 */
export interface TrustedCertificateEnrollmentModeFilter {
    /**
     *eq
     */
    eq?: boolean;
}
/**
 *TrustedCertificateStatusFilter
 */
export interface TrustedCertificateStatusFilter {
    /**
     *eq
     */
    eq?: TrustedCertificateStatus;
}
/**
 *TrustedCertificateIssuerFilter
 */
export interface TrustedCertificateIssuerFilter {
    /**
     *like
     */
    like?: string;
}
/**
 *TrustedCertificateSubjectFilter
 */
export interface TrustedCertificateSubjectFilter {
    /**
     *like
     */
    like?: string;
}
/**
 *TrustedCertificateValidFilter
 */
export interface TrustedCertificateValidFilter {
    /**
     *eq
     */
    eq?: boolean;
}
/**
 *TrustedCertificateFilter
 */
export interface TrustedCertificateFilter {
    /**
     *name
     */
    name?: string | TrustedCertificateNameFilter;

    /**
     *service
     */
    service?: TrustedCertificateService | TrustedCertificateServiceFilter;

    /**
     *expire
     */
    expire?: string | TrustedCertificateExpireFilter;

    /**
     *deviceExecutionMode
     */
    deviceExecutionMode?: number | TrustedCertificateDeviceExecutionModeFilter;

    /**
     *owner
     */
    owner?: string | TrustedCertificateOwnerFilter;

    /**
     *enrollmentMode
     */
    enrollmentMode?: boolean | TrustedCertificateEnrollmentModeFilter;

    /**
     *status
     */
    status?: TrustedCertificateStatus | TrustedCertificateStatusFilter;

    /**
     *issuer
     */
    issuer?: TrustedCertificateIssuerFilter;

    /**
     *subject
     */
    subject?: TrustedCertificateSubjectFilter;

    /**
     *valid
     */
    valid?: boolean | TrustedCertificateValidFilter;
}
/**
 *TrustedCertificateListOptions
 */
export interface TrustedCertificateListOptions extends ListOptions {
    /**
     *filter
     */
    filter?: TrustedCertificateFilter;
}
