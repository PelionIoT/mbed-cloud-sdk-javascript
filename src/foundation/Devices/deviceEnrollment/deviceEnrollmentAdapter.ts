import { Adapter } from "../../../common/adapter";
import { DeviceEnrollment } from "./deviceEnrollment";
/**
 *DeviceEnrollment adapter
 */
export class DeviceEnrollmentAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): DeviceEnrollment {
        if (!data) {
            return null;
        }
        const mappedEntity = DeviceEnrollmentAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE_ENROLLMENT",
            accountId: data.account_id,
            claimedAt: data.claimed_at,
            createdAt: data.created_at,
            enrolledDeviceId: data.enrolled_device_id,
            enrollmentIdentity: data.enrollment_identity,
            expiresAt: data.expires_at,
            id: data.id,
        });
        return mappedEntity;
    }
}
