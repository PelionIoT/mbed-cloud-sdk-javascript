import { ListOptions } from "../../../legacy/common/interfaces";
export type TrustedCertificateServiceEnum = "lwm2m" | "bootstrap";
export type TrustedCertificateStatusEnum = "ACTIVE" | "INACTIVE";
/**
 *TrustedCertificateCreateRequest
 */
export interface TrustedCertificateCreateRequest {
    /**
     *certificate
     */
    readonly certificate?: string;

    /**
     *description
     */
    readonly description?: string;

    /**
     *enrollmentMode
     */
    readonly enrollmentMode?: boolean;

    /**
     *name
     */
    readonly name?: string;

    /**
     *service
     */
    readonly service?: TrustedCertificateServiceEnum;

    /**
     *status
     */
    readonly status?: TrustedCertificateStatusEnum;
}
/**
 *TrustedCertificateUpdateRequest
 */
export interface TrustedCertificateUpdateRequest {
    /**
     *certificate
     */
    readonly certificate?: string;

    /**
     *description
     */
    readonly description?: string;

    /**
     *enrollmentMode
     */
    readonly enrollmentMode?: boolean;

    /**
     *name
     */
    readonly name?: string;

    /**
     *service
     */
    readonly service?: TrustedCertificateServiceEnum;

    /**
     *status
     */
    readonly status?: TrustedCertificateStatusEnum;
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
    eq?: TrustedCertificateServiceEnum;
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
    eq?: TrustedCertificateStatusEnum;
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
    service?: TrustedCertificateServiceEnum | TrustedCertificateServiceFilter;

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
    status?: TrustedCertificateStatusEnum | TrustedCertificateStatusFilter;

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
