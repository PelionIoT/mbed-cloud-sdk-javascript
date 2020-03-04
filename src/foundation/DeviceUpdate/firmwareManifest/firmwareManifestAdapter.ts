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
            datafileSize: data.datafile_size,
            datafileUrl: data.datafile,
            deliveredPayloadDigest: data.delivered_payload_digest,
            deliveredPayloadSize: data.delivered_payload_size,
            deliveredPayloadType: data.delivered_payload_type,
            deliveredPayloadUrl: data.delivered_payload_url,
            description: data.description,
            deviceClass: data.device_class,
            deviceVendor: data.device_vendor,
            id: data.id,
            keyTableUrl: data.key_table,
            manifestSchemaVersion: data.manifest_schema_version,
            name: data.name,
            parsedRawManifest: data.parsed_raw_manifest,
            precursorPayloadDigest: data.precursor_payload_digest,
            timestamp: data.timestamp,
            updatePriority: data.update_priority,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
