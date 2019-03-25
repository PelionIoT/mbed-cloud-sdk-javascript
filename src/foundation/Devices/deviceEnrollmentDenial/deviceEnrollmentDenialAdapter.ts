import { Adapter } from "../../../common/adapter";
import { DeviceEnrollmentDenial } from "./deviceEnrollmentDenial";
/**
 *DeviceEnrollmentDenial adapter
 */
export class DeviceEnrollmentDenialAdapter extends Adapter {
    public static fromApi(data: any, instance?: any): DeviceEnrollmentDenial {
        if (!data) {
            return null;
        }
        const mappedEntity = DeviceEnrollmentDenialAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE_ENROLLMENT_DENIAL",
            accountId: data.account_id,
            createdAt: data.created_at,
            endpointName: data.endpoint_name,
            id: data.id,
            trustedCertificateId: data.trusted_certificate_id,
        });
        return mappedEntity;
    }
}
