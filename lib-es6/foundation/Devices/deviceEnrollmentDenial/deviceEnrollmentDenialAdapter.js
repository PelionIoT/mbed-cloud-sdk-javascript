import { Adapter } from "../../../common/adapter";
/**
 *DeviceEnrollmentDenial adapter
 */
export class DeviceEnrollmentDenialAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
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
//# sourceMappingURL=deviceEnrollmentDenialAdapter.js.map