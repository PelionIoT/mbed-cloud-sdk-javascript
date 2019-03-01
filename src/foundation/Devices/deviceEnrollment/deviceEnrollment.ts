import { Entity } from "common/entity";
/**
 *DeviceEnrollment
 */
export interface DeviceEnrollment extends Entity {
    /**
     *accountId
     */
    readonly accountId?: string;

    /**
     *claimedAt
     */
    readonly claimedAt?: Date;

    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *enrolledDeviceId
     */
    readonly enrolledDeviceId?: string;

    /**
     *enrollmentIdentity
     */
    enrollmentIdentity: string;

    /**
     *expiresAt
     */
    readonly expiresAt?: Date;
}
