import { ListOptions } from "../../../legacy/common/interfaces";
export type CertificateEnrollmentEnrollResultEnum = "success" | "not_found" | "forbidden" | "failure";
export type CertificateEnrollmentEnrollStatusEnum = "new" | "completed";
/**
 *CertificateEnrollmentDeviceIdFilter
 */
export interface CertificateEnrollmentDeviceIdFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *CertificateEnrollmentCertificateNameFilter
 */
export interface CertificateEnrollmentCertificateNameFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *CertificateEnrollmentEnrollStatusFilter
 */
export interface CertificateEnrollmentEnrollStatusFilter {
    /**
     *neq
     */
    neq?: string;

    /**
     *eq
     */
    eq?: string;
}
/**
 *CertificateEnrollmentEnrollResultFilter
 */
export interface CertificateEnrollmentEnrollResultFilter {
    /**
     *neq
     */
    neq?: string;

    /**
     *eq
     */
    eq?: string;
}
/**
 *CertificateEnrollmentCreatedAtFilter
 */
export interface CertificateEnrollmentCreatedAtFilter {
    /**
     *lte
     */
    lte?: string;

    /**
     *gte
     */
    gte?: string;
}
/**
 *CertificateEnrollmentUpdatedAtFilter
 */
export interface CertificateEnrollmentUpdatedAtFilter {
    /**
     *lte
     */
    lte?: string;

    /**
     *gte
     */
    gte?: string;
}
/**
 *CertificateEnrollmentFilter
 */
export interface CertificateEnrollmentFilter {
    /**
     *device_id
     */
    device_id?: CertificateEnrollmentDeviceIdFilter;

    /**
     *certificate_name
     */
    certificate_name?: CertificateEnrollmentCertificateNameFilter;

    /**
     *enroll_status
     */
    enroll_status?: CertificateEnrollmentEnrollStatusFilter;

    /**
     *enroll_result
     */
    enroll_result?: CertificateEnrollmentEnrollResultFilter;

    /**
     *created_at
     */
    created_at?: CertificateEnrollmentCreatedAtFilter;

    /**
     *updated_at
     */
    updated_at?: CertificateEnrollmentUpdatedAtFilter;
}
/**
 *CertificateEnrollmentListOptions
 */
export interface CertificateEnrollmentListOptions extends ListOptions {
    /**
     *filter
     */
    filter?: CertificateEnrollmentFilter;
}
