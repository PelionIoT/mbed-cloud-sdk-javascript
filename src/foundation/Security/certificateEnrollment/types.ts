import { ListOptions } from "../../../common";
export type CertificateEnrollmentEnrollResult = "success" | "failure";
export type CertificateEnrollmentEnrollStatus = "new" | "completed";
/**
 *CertificateEnrollmentDeviceIdFilter
 */
export interface CertificateEnrollmentDeviceIdFilter {
    /**
     *deviceId equal to
     */
    eq?: string;
}
/**
 *CertificateEnrollmentCertificateNameFilter
 */
export interface CertificateEnrollmentCertificateNameFilter {
    /**
     *certificateName equal to
     */
    eq?: string;
}
/**
 *CertificateEnrollmentEnrollStatusFilter
 */
export interface CertificateEnrollmentEnrollStatusFilter {
    /**
     *enrollStatus not equal to
     */
    neq?: CertificateEnrollmentEnrollStatus;

    /**
     *enrollStatus equal to
     */
    eq?: CertificateEnrollmentEnrollStatus;
}
/**
 *CertificateEnrollmentEnrollResultFilter
 */
export interface CertificateEnrollmentEnrollResultFilter {
    /**
     *enrollResult not equal to
     */
    neq?: CertificateEnrollmentEnrollResult;

    /**
     *enrollResult equal to
     */
    eq?: CertificateEnrollmentEnrollResult;
}
/**
 *CertificateEnrollmentCreatedAtFilter
 */
export interface CertificateEnrollmentCreatedAtFilter {
    /**
     *createdAt less than
     */
    lte?: Date;

    /**
     *createdAt greater than
     */
    gte?: Date;
}
/**
 *CertificateEnrollmentUpdatedAtFilter
 */
export interface CertificateEnrollmentUpdatedAtFilter {
    /**
     *updatedAt less than
     */
    lte?: Date;

    /**
     *updatedAt greater than
     */
    gte?: Date;
}
/**
 *CertificateEnrollmentFilter
 */
export interface CertificateEnrollmentFilter {
    /**
     *Filter by deviceId on CertificateEnrollment
     */
    deviceId?: string | CertificateEnrollmentDeviceIdFilter;

    /**
     *Filter by certificateName on CertificateEnrollment
     */
    certificateName?: string | CertificateEnrollmentCertificateNameFilter;

    /**
     *Filter by enrollStatus on CertificateEnrollment
     */
    enrollStatus?: CertificateEnrollmentEnrollStatus | CertificateEnrollmentEnrollStatusFilter;

    /**
     *Filter by enrollResult on CertificateEnrollment
     */
    enrollResult?: CertificateEnrollmentEnrollResult | CertificateEnrollmentEnrollResultFilter;

    /**
     *Filter by createdAt on CertificateEnrollment
     */
    createdAt?: CertificateEnrollmentCreatedAtFilter;

    /**
     *Filter by updatedAt on CertificateEnrollment
     */
    updatedAt?: CertificateEnrollmentUpdatedAtFilter;
}
/**
 *CertificateEnrollmentListOptions
 */
export interface CertificateEnrollmentListOptions extends ListOptions {
    /**
     *Filter for CertificateEnrollment
     */
    filter?: CertificateEnrollmentFilter;
}
