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
     *The result of certificate enrollment request.
     *@example success
     */
    readonly enrollResult?: CertificateEnrollmentEnrollResult;
    /**
     *Additional information in case of failure.
     *@example The device is currently processing too many certificate renewals.
     */
    readonly enrollResultDetail?: string;
    /**
     *The status of certificate enrollment request.
     */
    readonly enrollStatus?: CertificateEnrollmentEnrollStatus;
    /**
     *Update UTC time RFC3339.
     *@example 2017-01-01T00:00:00Z
     */
    readonly updatedAt?: Date;
}
