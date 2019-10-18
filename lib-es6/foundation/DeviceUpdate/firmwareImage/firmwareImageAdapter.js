import { Adapter } from "../../../common/adapter";
/**
 *FirmwareImage adapter
 */
export class FirmwareImageAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = FirmwareImageAdapter.assignDefined(instance || {}, {
            _discriminator: "FIRMWARE_IMAGE",
            createdAt: data.created_at,
            datafileChecksum: data.datafile_checksum,
            datafileSize: data.datafile_size || 0,
            datafileUrl: data.datafile,
            description: data.description,
            id: data.id,
            name: data.name,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=firmwareImageAdapter.js.map