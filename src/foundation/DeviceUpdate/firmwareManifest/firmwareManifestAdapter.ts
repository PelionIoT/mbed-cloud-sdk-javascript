import { Adapter } from "../../../common/adapter";
import { FirmwareManifest } from "./firmwareManifest";
/**
 *FirmwareManifest adapter
 */
export class FirmwareManifestAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): FirmwareManifest {
        if (!data) {
            return null;
        }
        const mappedEntity = FirmwareManifestAdapter.assignDefined(instance || {}, {
            _discriminator: "FIRMWARE_MANIFEST",
            createdAt: data.created_at,
            datafileSize: data.datafile_size || 0,
            datafileUrl: data.datafile,
            description: data.description,
            deviceClass: data.device_class,
            id: data.id,
            keyTableUrl: data.key_table,
            name: data.name,
            timestamp: data.timestamp,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
