import { Entity } from "../../../common/entity";
import { CertificateEnrollmentEnrollResult, CertificateEnrollmentEnrollStatus } from "./types";
/**
 *CertificateEnrollment
 */
export interface CertificateEnrollment extends Entity {
    /**
     *certificateName
     */
    readonly certificateName?: string;

    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *deviceId
     */
    readonly deviceId?: string;

    /**
     *enrollResult
     */
    readonly enrollResult?: CertificateEnrollmentEnrollResult;

    /**
     *enrollStatus
     */
    readonly enrollStatus?: CertificateEnrollmentEnrollStatus;

    /**
     *updatedAt
     */
    readonly updatedAt?: Date;
}
