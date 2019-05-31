import { ListOptions } from "../../../legacy/common/interfaces";
export type CertificateEnrollmentEnrollResult = "success" | "failure";
export type CertificateEnrollmentEnrollStatus = "new" | "completed";
/**
 *CertificateEnrollmentCertificateEnrollmentDeviceIdFilter
 */
export interface CertificateEnrollmentCertificateEnrollmentDeviceIdFilter {
    /**
     *deviceId equal to
     */
    eq?: string;
}
/**
 *CertificateEnrollmentCertificateEnrollmentCertificateNameFilter
 */
export interface CertificateEnrollmentCertificateEnrollmentCertificateNameFilter {
    /**
     *certificateName equal to
     */
    eq?: string;
}
/**
 *CertificateEnrollmentCertificateEnrollmentEnrollStatusFilter
 */
export interface CertificateEnrollmentCertificateEnrollmentEnrollStatusFilter {
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
 *CertificateEnrollmentCertificateEnrollmentEnrollResultFilter
 */
export interface CertificateEnrollmentCertificateEnrollmentEnrollResultFilter {
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
 *CertificateEnrollmentCertificateEnrollmentCreatedAtFilter
 */
export interface CertificateEnrollmentCertificateEnrollmentCreatedAtFilter {
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
 *CertificateEnrollmentCertificateEnrollmentUpdatedAtFilter
 */
export interface CertificateEnrollmentCertificateEnrollmentUpdatedAtFilter {
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
 *CertificateEnrollmentCertificateEnrollmentFilter
 */
export interface CertificateEnrollmentCertificateEnrollmentFilter {
    /**
     *Filter by deviceId on CertificateEnrollment
     */
    deviceId?: string | CertificateEnrollmentCertificateEnrollmentDeviceIdFilter;

    /**
     *Filter by certificateName on CertificateEnrollment
     */
    certificateName?: string | CertificateEnrollmentCertificateEnrollmentCertificateNameFilter;

    /**
     *Filter by enrollStatus on CertificateEnrollment
     */
    enrollStatus?: CertificateEnrollmentEnrollStatus | CertificateEnrollmentCertificateEnrollmentEnrollStatusFilter;

    /**
     *Filter by enrollResult on CertificateEnrollment
     */
    enrollResult?: CertificateEnrollmentEnrollResult | CertificateEnrollmentCertificateEnrollmentEnrollResultFilter;

    /**
     *Filter by createdAt on CertificateEnrollment
     */
    createdAt?: CertificateEnrollmentCertificateEnrollmentCreatedAtFilter;

    /**
     *Filter by updatedAt on CertificateEnrollment
     */
    updatedAt?: CertificateEnrollmentCertificateEnrollmentUpdatedAtFilter;
}
/**
 *CertificateEnrollmentCertificateEnrollmentListOptions
 */
export interface CertificateEnrollmentCertificateEnrollmentListOptions extends ListOptions {
    /**
     *Filter for CertificateEnrollment
     */
    filter?: CertificateEnrollmentCertificateEnrollmentFilter;
}
