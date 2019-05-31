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
     *Service name where the certificate is used.
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
     *Service name where the certificate is used.
     */
    readonly service?: TrustedCertificateService;

    /**
     *Status of the certificate.
     *@example ACTIVE
     */
    readonly status?: TrustedCertificateStatus;
}
/**
 *TrustedCertificateTrustedCertificateNameFilter
 */
export interface TrustedCertificateTrustedCertificateNameFilter {
    /**
     *name equal to
     */
    eq?: string;
}
/**
 *TrustedCertificateTrustedCertificateServiceFilter
 */
export interface TrustedCertificateTrustedCertificateServiceFilter {
    /**
     *service equal to
     */
    eq?: TrustedCertificateService;
}
/**
 *TrustedCertificateTrustedCertificateExpireFilter
 */
export interface TrustedCertificateTrustedCertificateExpireFilter {
    /**
     *expire equal to
     */
    eq?: string;
}
/**
 *TrustedCertificateTrustedCertificateDeviceExecutionModeFilter
 */
export interface TrustedCertificateTrustedCertificateDeviceExecutionModeFilter {
    /**
     *deviceExecutionMode equal to
     */
    eq?: number;

    /**
     *deviceExecutionMode not equal to
     */
    neq?: number;
}
/**
 *TrustedCertificateTrustedCertificateOwnerFilter
 */
export interface TrustedCertificateTrustedCertificateOwnerFilter {
    /**
     *owner equal to
     */
    eq?: string;
}
/**
 *TrustedCertificateTrustedCertificateEnrollmentModeFilter
 */
export interface TrustedCertificateTrustedCertificateEnrollmentModeFilter {
    /**
     *enrollmentMode equal to
     */
    eq?: boolean;
}
/**
 *TrustedCertificateTrustedCertificateStatusFilter
 */
export interface TrustedCertificateTrustedCertificateStatusFilter {
    /**
     *status equal to
     */
    eq?: TrustedCertificateStatus;
}
/**
 *TrustedCertificateTrustedCertificateIssuerFilter
 */
export interface TrustedCertificateTrustedCertificateIssuerFilter {
    /**
     *issuer like
     */
    like?: string;
}
/**
 *TrustedCertificateTrustedCertificateSubjectFilter
 */
export interface TrustedCertificateTrustedCertificateSubjectFilter {
    /**
     *subject like
     */
    like?: string;
}
/**
 *TrustedCertificateTrustedCertificateValidFilter
 */
export interface TrustedCertificateTrustedCertificateValidFilter {
    /**
     *valid equal to
     */
    eq?: boolean;
}
/**
 *TrustedCertificateTrustedCertificateFilter
 */
export interface TrustedCertificateTrustedCertificateFilter {
    /**
     *Filter by name on TrustedCertificate
     */
    name?: string | TrustedCertificateTrustedCertificateNameFilter;

    /**
     *Filter by service on TrustedCertificate
     */
    service?: TrustedCertificateService | TrustedCertificateTrustedCertificateServiceFilter;

    /**
     *Filter by expire on TrustedCertificate
     */
    expire?: string | TrustedCertificateTrustedCertificateExpireFilter;

    /**
     *Filter by deviceExecutionMode on TrustedCertificate
     */
    deviceExecutionMode?: number | TrustedCertificateTrustedCertificateDeviceExecutionModeFilter;

    /**
     *Filter by owner on TrustedCertificate
     */
    owner?: string | TrustedCertificateTrustedCertificateOwnerFilter;

    /**
     *Filter by enrollmentMode on TrustedCertificate
     */
    enrollmentMode?: boolean | TrustedCertificateTrustedCertificateEnrollmentModeFilter;

    /**
     *Filter by status on TrustedCertificate
     */
    status?: TrustedCertificateStatus | TrustedCertificateTrustedCertificateStatusFilter;

    /**
     *Filter by issuer on TrustedCertificate
     */
    issuer?: TrustedCertificateTrustedCertificateIssuerFilter;

    /**
     *Filter by subject on TrustedCertificate
     */
    subject?: TrustedCertificateTrustedCertificateSubjectFilter;

    /**
     *Filter by valid on TrustedCertificate
     */
    valid?: boolean | TrustedCertificateTrustedCertificateValidFilter;
}
/**
 *TrustedCertificateTrustedCertificateListOptions
 */
export interface TrustedCertificateTrustedCertificateListOptions extends ListOptions {
    /**
     *Filter for TrustedCertificate
     */
    filter?: TrustedCertificateTrustedCertificateFilter;
}
