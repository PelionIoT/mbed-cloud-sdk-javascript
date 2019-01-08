import { Entity } from "../../../common/entity";
/**
 *DeviceEnrollment
 */
export interface DeviceEnrollment extends Entity {
    /**
     *accountId
     */
    accountId?: string;

    /**
     *claimedAt
     */
    claimedAt?: Date;

    /**
     *createdAt
     */
    createdAt?: Date;

    /**
     *enrolledDeviceId
     */
    enrolledDeviceId?: string;

    /**
     *enrollmentIdentity
     */
    enrollmentIdentity?: string;

    /**
     *expiresAt
     */
    expiresAt?: Date;

    /**
     *id
     */
    id?: string;
}
