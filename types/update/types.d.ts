import { ListOptions, ComparisonObject } from "../common/interfaces";
export interface FirmwareImageObject {
    /**
     * The name of the object
     */
    name: string;
    /**
     * The description of the object
     */
    description?: string;
}
export interface AddFirmwareImageObject extends FirmwareImageObject {
    /**
     * The binary file of firmware image
     */
    dataFile: ReadableStream | File | Blob;
}
export interface FirmwareManifestObject {
    /**
     * The name of the object
     */
    name: string;
    /**
     * The description of the object
     */
    description?: string;
}
export interface AddFirmwareManifestObject extends FirmwareManifestObject {
    /**
     * The binary file of the manifest
     */
    dataFile: ReadableStream | File | Blob;
}
export declare type ManifestEncryptionModeEnum = "none-ecc-secp256r1-sha256" | "aes-128-ctr-ecc-secp256r1-sha256" | "none-none-sha256";
export declare type ManifestPayloadFormatEnum = "raw-binary" | "cbor" | "hex-location-length-data" | "elf";
export interface ManifestContents {
    /**
     * Hex representation of the 128-bit RFC4122 GUID that represents the device class that the update targets.
     */
    classId?: string;
    /**
     * Hex representation of the 128-bit RFC4122 GUID that represents the vendor.
     */
    vendorId?: string;
    /**
     * Manifest version.
     */
    version?: number;
    /**
     * A short description of the update.
     */
    description?: string;
    /**
     * A 128-bit random field
     */
    nonce?: string;
    /**
     * The date the manifest was created.
     */
    createdAt?: Date;
    /**
     * The encryption mode describing the kind of hashing, signing and, encryption in use. The following modes are available: 1: none-ecc-secp256r1-sha256: SHA-256 hashing, ECDSA signatures, using the secp256r1 curve. No payload encryption is used. 2: aes-128-ctr-ecc-secp256r1-sha256: SHA-256 hashing, ECDSA signatures, using the secp256r1 curve. The payload is encrypted with AES-128 in CTR-mode. 3: none-none-sha256: SHA-256 hashing. No signature is used. No payload encryption is used. This mode is not recommended except over existing, trusted connections.
     */
    encryptionMode?: ManifestEncryptionModeEnum;
    /**
     * A flag that indicates that the update described by the manifest should be applied as soon as possible.
     */
    applyImmediately?: boolean;
    /**
     * Hex representation of the 128-bit RFC4122 GUID that uniquely identifies the device. Only applies to a manifest targeted at a specific device.
     */
    deviceId?: string;
    /**
     * Format of the manifest payload. Can be: 1: raw-binary 2: cbor 3: hex-location-length-data 4: elf
     */
    payloadFormat?: ManifestPayloadFormatEnum;
    /**
     * An identifier for where the payload is to be located.
     */
    payloadStorageIdentifier?: string;
    /**
     * Hex representation of the SHA-256 hash of the payload
     */
    payloadHash?: string;
    /**
     * The URI of the payload.
     */
    payloadUri?: string;
    /**
     * Size of the payload in bytes
     */
    payloadSize?: number;
}
export declare type CampaignStateEnum = "draft" | "scheduled" | "devicefetch" | "devicecopy" | "publishing" | "deploying" | "deployed" | "manifestremoved" | "expired";
export interface CampaignObject {
    /**
     * A name for this campaign
     */
    name?: string;
    /**
     * An optional description of the campaign
     */
    description?: string;
    /**
     * ID of the manifest to use for update
     */
    manifestId?: string;
    /**
     * The state of the campaign
     */
    state?: CampaignStateEnum;
    /**
     * The timestamp at which update campaign scheduled to start
     */
    scheduledAt?: Date;
    /**
     * The device filter to use
     *
     * Constructed like so:
     *  ```JavaScript
     *  deviceFilter: {
     *    state: { $eq: "bootstrapped" },
     *    createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    customAttributes: {
     *      <custom_name_1>: { $eq: "custom_value_1" },
     *      <custom_name_2>: { $ne: "custom_value_2" }
     *    }
     *  }
     *  ```
     */
    deviceFilter?: {
        accountId?: ComparisonObject<string>;
        bootstrapCertificateExpiration?: ComparisonObject<Date>;
        bootstrappedTimestamp?: ComparisonObject<Date>;
        certificateIssuerId?: ComparisonObject<string>;
        connectorCertificateExpiration?: ComparisonObject<Date>;
        createdAt?: ComparisonObject<Date>;
        deployedState?: ComparisonObject<string>;
        lastDeployment?: ComparisonObject<Date>;
        description?: ComparisonObject<string>;
        deviceClass?: ComparisonObject<string>;
        certificateFingerprint?: ComparisonObject<string>;
        alias?: ComparisonObject<string>;
        firmwareChecksum?: ComparisonObject<string>;
        manifestUrl?: ComparisonObject<string>;
        manifestTimestamp?: ComparisonObject<Date>;
        mechanism?: ComparisonObject<string>;
        mechanismUrl?: ComparisonObject<string>;
        name?: ComparisonObject<string>;
        serialNumber?: ComparisonObject<string>;
        state?: ComparisonObject<string>;
        trustLevel?: ComparisonObject<string>;
        updatedAt?: ComparisonObject<Date>;
        vendorId?: ComparisonObject<string>;
        customAttributes?: {
            [key: string]: ComparisonObject<string>;
        };
    };
}
export interface AddCampaignObject extends CampaignObject {
    /**
     * A name for this campaign
     */
    name: string;
}
export interface UpdateCampaignObject extends CampaignObject {
    /**
     * The ID of the campaign
     */
    id: string;
}
/**
 * Options to use when listing firmware images
 */
export interface FirmwareImageListOptions extends ListOptions {
    /**
     * The firmware image filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    name: { $eq: "test" },
     *    createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *  }
     *  ```
     */
    filter?: {
        name?: ComparisonObject<string>;
        createdAt?: ComparisonObject<Date>;
        updatedAt?: ComparisonObject<Date>;
        datafileChecksum?: ComparisonObject<string>;
    };
}
/**
 * Options to use when listing firmware manifests
 */
export interface FirmwareManifestListOptions extends ListOptions {
    /**
     * The firmware manifest filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    name: { $eq: "test" },
     *    timestamp: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *  }
     *  ```
     */
    filter?: {
        name: ComparisonObject<string>;
        deviceClass: ComparisonObject<string>;
        timestamp: ComparisonObject<Date>;
        createdAt: ComparisonObject<Date>;
        updatedAt: ComparisonObject<Date>;
    };
}
/**
 * Options to use when listing update campaigns
 */
export interface CampaignListOptions extends ListOptions {
    /**
     * The campaign filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    state: { $eq: "scheduled" },
     *    scheduledAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *  }
     *  ```
     */
    filter?: {
        name: ComparisonObject<string>;
        state: ComparisonObject<string>;
        manifestId: ComparisonObject<string>;
        manifestUrl: ComparisonObject<string>;
        startedAt: ComparisonObject<Date>;
        scheduledAt: ComparisonObject<Date>;
        createdAt: ComparisonObject<Date>;
        finishedAt: ComparisonObject<Date>;
    };
}
