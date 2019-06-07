import { ListOptions } from "../../../legacy/common/interfaces";
export declare type TrustedCertificateService = "lwm2m" | "bootstrap";
export declare type TrustedCertificateStatus = "ACTIVE" | "INACTIVE";
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
 *TrustedCertificateNameFilter
 */
export interface TrustedCertificateNameFilter {
    /**
     *name equal to
     */
    eq?: string;
}
/**
 *TrustedCertificateServiceFilter
 */
export interface TrustedCertificateServiceFilter {
    /**
     *service equal to
     */
    eq?: TrustedCertificateService;
}
/**
 *TrustedCertificateExpireFilter
 */
export interface TrustedCertificateExpireFilter {
    /**
     *expire equal to
     */
    eq?: string;
}
/**
 *TrustedCertificateDeviceExecutionModeFilter
 */
export interface TrustedCertificateDeviceExecutionModeFilter {
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
 *TrustedCertificateOwnerFilter
 */
export interface TrustedCertificateOwnerFilter {
    /**
     *owner equal to
     */
    eq?: string;
}
/**
 *TrustedCertificateEnrollmentModeFilter
 */
export interface TrustedCertificateEnrollmentModeFilter {
    /**
     *enrollmentMode equal to
     */
    eq?: boolean;
}
/**
 *TrustedCertificateStatusFilter
 */
export interface TrustedCertificateStatusFilter {
    /**
     *status equal to
     */
    eq?: TrustedCertificateStatus;
}
/**
 *TrustedCertificateIssuerFilter
 */
export interface TrustedCertificateIssuerFilter {
    /**
     *issuer like
     */
    like?: string;
}
/**
 *TrustedCertificateSubjectFilter
 */
export interface TrustedCertificateSubjectFilter {
    /**
     *subject like
     */
    like?: string;
}
/**
 *TrustedCertificateValidFilter
 */
export interface TrustedCertificateValidFilter {
    /**
     *valid equal to
     */
    eq?: boolean;
}
/**
 *TrustedCertificateFilter
 */
export interface TrustedCertificateFilter {
    /**
     *Filter by name on TrustedCertificate
     */
    name?: string | TrustedCertificateNameFilter;
    /**
     *Filter by service on TrustedCertificate
     */
    service?: TrustedCertificateService | TrustedCertificateServiceFilter;
    /**
     *Filter by expire on TrustedCertificate
     */
    expire?: string | TrustedCertificateExpireFilter;
    /**
     *Filter by deviceExecutionMode on TrustedCertificate
     */
    deviceExecutionMode?: number | TrustedCertificateDeviceExecutionModeFilter;
    /**
     *Filter by owner on TrustedCertificate
     */
    owner?: string | TrustedCertificateOwnerFilter;
    /**
     *Filter by enrollmentMode on TrustedCertificate
     */
    enrollmentMode?: boolean | TrustedCertificateEnrollmentModeFilter;
    /**
     *Filter by status on TrustedCertificate
     */
    status?: TrustedCertificateStatus | TrustedCertificateStatusFilter;
    /**
     *Filter by issuer on TrustedCertificate
     */
    issuer?: TrustedCertificateIssuerFilter;
    /**
     *Filter by subject on TrustedCertificate
     */
    subject?: TrustedCertificateSubjectFilter;
    /**
     *Filter by valid on TrustedCertificate
     */
    valid?: boolean | TrustedCertificateValidFilter;
}
/**
 *TrustedCertificateListOptions
 */
export interface TrustedCertificateListOptions extends ListOptions {
    /**
     *Filter for TrustedCertificate
     */
    filter?: TrustedCertificateFilter;
}
