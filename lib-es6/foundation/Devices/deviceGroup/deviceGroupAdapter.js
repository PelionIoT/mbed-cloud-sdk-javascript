import { Adapter } from "../../../common/adapter";
/**
 *DeviceGroup adapter
 */
export class DeviceGroupAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = DeviceGroupAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE_GROUP",
            createdAt: data.created_at,
            customAttributes: data.custom_attributes,
            description: data.description,
            devicesCount: data.devices_count || 0,
            id: data.id,
            name: data.name,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=deviceGroupAdapter.js.map