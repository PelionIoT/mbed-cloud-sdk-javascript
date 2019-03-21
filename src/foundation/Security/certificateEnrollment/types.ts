import { ListOptions } from "../../../legacy/common/interfaces";
export type CertificateEnrollmentEnrollResult = "success" | "not_found" | "forbidden" | "failure";
export type CertificateEnrollmentEnrollStatus = "new" | "completed";
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
    neq?: CertificateEnrollmentEnrollStatus;

    /**
     *eq
     */
    eq?: CertificateEnrollmentEnrollStatus;
}
/**
 *CertificateEnrollmentEnrollResultFilter
 */
export interface CertificateEnrollmentEnrollResultFilter {
    /**
     *neq
     */
    neq?: CertificateEnrollmentEnrollResult;

    /**
     *eq
     */
    eq?: CertificateEnrollmentEnrollResult;
}
/**
 *CertificateEnrollmentCreatedAtFilter
 */
export interface CertificateEnrollmentCreatedAtFilter {
    /**
     *lte
     */
    lte?: Date;

    /**
     *gte
     */
    gte?: Date;
}
/**
 *CertificateEnrollmentUpdatedAtFilter
 */
export interface CertificateEnrollmentUpdatedAtFilter {
    /**
     *lte
     */
    lte?: Date;

    /**
     *gte
     */
    gte?: Date;
}
/**
 *CertificateEnrollmentFilter
 */
export interface CertificateEnrollmentFilter {
    /**
     *deviceId
     */
    deviceId?: string | CertificateEnrollmentDeviceIdFilter;

    /**
     *certificateName
     */
    certificateName?: string | CertificateEnrollmentCertificateNameFilter;

    /**
     *enrollStatus
     */
    enrollStatus?: CertificateEnrollmentEnrollStatus | CertificateEnrollmentEnrollStatusFilter;

    /**
     *enrollResult
     */
    enrollResult?: CertificateEnrollmentEnrollResult | CertificateEnrollmentEnrollResultFilter;

    /**
     *createdAt
     */
    createdAt?: CertificateEnrollmentCreatedAtFilter;

    /**
     *updatedAt
     */
    updatedAt?: CertificateEnrollmentUpdatedAtFilter;
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
