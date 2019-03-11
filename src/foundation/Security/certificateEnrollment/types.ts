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
    neq?: CertificateEnrollmentEnrollStatusEnum;

    /**
     *eq
     */
    eq?: CertificateEnrollmentEnrollStatusEnum;
}
/**
 *CertificateEnrollmentEnrollResultFilter
 */
export interface CertificateEnrollmentEnrollResultFilter {
    /**
     *neq
     */
    neq?: CertificateEnrollmentEnrollResultEnum;

    /**
     *eq
     */
    eq?: CertificateEnrollmentEnrollResultEnum;
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
    deviceId?: CertificateEnrollmentDeviceIdFilter;

    /**
     *certificateName
     */
    certificateName?: CertificateEnrollmentCertificateNameFilter;

    /**
     *enrollStatus
     */
    enrollStatus?: CertificateEnrollmentEnrollStatusFilter;

    /**
     *enrollResult
     */
    enrollResult?: CertificateEnrollmentEnrollResultFilter;

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
