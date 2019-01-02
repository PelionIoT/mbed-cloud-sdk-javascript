import { CertificateEnrollmentEnrollResultEnum, CertificateEnrollmentEnrollStatusEnum } from "./types";
/**
 *CertificateEnrollment
 */
export interface CertificateEnrollment {
    /**
     *certificateName
     */
    certificateName: string;

    /**
     *createdAt
     */
    createdAt: Date;

    /**
     *deviceId
     */
    deviceId: string;

    /**
     *enrollResult
     */
    enrollResult: CertificateEnrollmentEnrollResultEnum;

    /**
     *enrollStatus
     */
    enrollStatus: CertificateEnrollmentEnrollStatusEnum;

    /**
     *id
     */
    id: string;

    /**
     *updatedAt
     */
    updatedAt: Date;
}
