import { Entity } from "../../../common/entity";
/**
 *DeviceEnrollment
 */
export interface DeviceEnrollment extends Entity {
    /**
     *ID
     *@example 00005a4e027f0a580a01081c00000000
     */
    readonly accountId?: string;
    /**
     *The time the device was claimed.
     */
    readonly claimedAt?: Date;
    /**
     *The time of the enrollment identity creation.
     */
    readonly createdAt?: Date;
    /**
     *The ID of the device in the Device Directory once it is registered.
     *@example 00005a4e027f0a580a01081c00000000
     */
    readonly enrolledDeviceId?: string;
    /**
     *Enrollment identity.
     *@example A-35:e7:72:8a:07:50:3b:3d:75:96:57:52:72:41:0d:78:cc:c6:e5:53:48:c6:65:58:5b:fa:af:4d:2d:73:95:c5
     */
    enrollmentIdentity: string;
    /**
     *The enrollment claim expiration time. If the device does not connect to Device Management before expiration, the claim is removed without separate notice.
     */
    readonly expiresAt?: Date;
}
