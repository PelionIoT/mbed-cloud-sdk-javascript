import { Entity } from "../../../common/entity";
import { CertificateEnrollmentEnrollResultEnum, CertificateEnrollmentEnrollStatusEnum } from "./types";
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
    readonly enrollResult?: CertificateEnrollmentEnrollResultEnum;

    /**
     *enrollResultDetail
     */
    readonly enrollResultDetail?: string;

    /**
     *enrollStatus
     */
    readonly enrollStatus?: CertificateEnrollmentEnrollStatusEnum;

    /**
     *updatedAt
     */
    readonly updatedAt?: Date;
}
