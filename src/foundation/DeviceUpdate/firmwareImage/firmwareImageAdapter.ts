import { Adapter } from "../../../common/adapter";
import { FirmwareImage } from "./firmwareImage";
/**
 *FirmwareImage adapter
 */
export class FirmwareImageAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): FirmwareImage {
        if (!data) {
            return null;
        }
        const mappedEntity = FirmwareImageAdapter.assignDefined(instance || {}, {
            _discriminator: "FIRMWARE_IMAGE",
            createdAt: data.created_at,
            datafileChecksum: data.datafile_checksum,
            datafileSize: data.datafile_size || undefined,
            datafileUrl: data.datafile,
            description: data.description,
            id: data.id,
            name: data.name,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
