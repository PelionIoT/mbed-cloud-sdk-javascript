import { Entity } from "../../../common/entity";
import { CertificateEnrollmentEnrollResult, CertificateEnrollmentEnrollStatus } from "./types";
/**
 *CertificateEnrollment
 */
export interface CertificateEnrollment extends Entity {
    /**
     *The certificate name.
     *@example customer.dlms
     */
    readonly certificateName?: string;

    /**
     *Creation UTC time RFC3339.
     *@example 2017-01-01T00:00:00Z
     */
    readonly createdAt?: Date;

    /**
     *The device ID.
     *@example 01625daa23230a580a0100bd00000000
     */
    readonly deviceId?: string;

    /**
     *enrollResult
     */
    readonly enrollResult?: CertificateEnrollmentEnrollResult;

    /**
     *enrollResultDetail
     */
    readonly enrollResultDetail?: string;

    /**
     *enrollStatus
     */
    readonly enrollStatus?: CertificateEnrollmentEnrollStatus;

    /**
     *Update UTC time RFC3339.
     *@example 2017-01-01T00:00:00Z
     */
    readonly updatedAt?: Date;
}
