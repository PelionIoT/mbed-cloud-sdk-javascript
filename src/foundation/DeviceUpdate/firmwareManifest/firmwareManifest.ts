import { Entity } from "../../../common/entity";
import { FirmwareManifestDeliveredPayloadType, FirmwareManifestSchemaVersion } from "./types";
/**
 *FirmwareManifest
 */
export interface FirmwareManifest extends Entity {
    /**
     *The time the entity was created.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly createdAt?: Date;

    /**
     *The size of the firmware manifest in bytes.
     */
    readonly datafileSize?: number;

    /**
     *The URL of the ASN.1 DER-encoded firmware manifest binary.
     *@example http://bucket.com/mymanifest.manifest
     */
    readonly datafileUrl?: string;

    /**
     *Digest (SHA256, hex-encoded) of the payload to deliver to the device.
     *@example c520fc771c0482ad39e983d27cf725a7c724fe58c616129a34a420d1941068bc
     */
    readonly deliveredPayloadDigest?: string;

    /**
     *The size in bytes of the payload to deliver to the device.
     */
    readonly deliveredPayloadSize?: number;

    /**
     *Type of the payload to deliver to the device (full or delta image).
     */
    readonly deliveredPayloadType?: FirmwareManifestDeliveredPayloadType;

    /**
     *The URL of the payload to deliver to the device.
     *@example http://bucket.com/myimage.elf
     */
    readonly deliveredPayloadUrl?: string;

    /**
     *The description of the firmware manifest.
     */
    description?: string;

    /**
     *The device class ID.
     *@example 42c4d8de-704d-546e-b9d3-1ce1eb316167
     */
    readonly deviceClass?: string;

    /**
     *The device vendor ID.
     *@example 5d645eae-c231-5a89-9764-2e655cd94fa8
     */
    readonly deviceVendor?: string;

    /**
     *The key table of pre-shared keys for devices.
     *@example http://example.com/key-table
     */
    readonly keyTableUrl?: string;

    /**
     *Version of the manifest schema (1 or 3).
     */
    readonly manifestSchemaVersion?: FirmwareManifestSchemaVersion;

    /**
     *The name of the manifest.
     *@example manifest_name
     */
    name: string;

    /**
*Raw manifest in JSON format, parsed from ASN.1 DER encoding.
Fields may change. Backwards compatibility is not guaranteed.
Recommended for debugging only.

*/
    readonly parsedRawManifest?: any;

    /**
     *Digest (SHA256, hex-encoded) of the currently installed payload.
     *@example 54d640fcd687c9b13420b9be66a265494899002aad1b7370cfb3dbfd7fbec42f
     */
    readonly precursorPayloadDigest?: string;

    /**
     *The firmware manifest version as a timestamp.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly timestamp?: Date;

    /**
     *Update priority, passed to the application callback when an update is performed. Allows the application to make application-specific decisions.
     */
    readonly updatePriority?: number;

    /**
     *The time the entity was updated.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly updatedAt?: Date;
}
