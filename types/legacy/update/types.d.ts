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
    /**
     * The binary file of the key table
     */
    keyTableFile: ReadableStream | File | Blob;
}
export declare type CampaignStateEnum = "draft" | "scheduled" | "allocatingquota" | "allocatedquota" | "quotaallocationfailed" | "checkingmanifest" | "checkedmanifest" | "devicefetch" | "devicecopy" | "devicecheck" | "publishing" | "deploying" | "deployed" | "manifestremoved" | "expired" | "stopping" | "autostopped" | "userstopped" | "conflict";
export declare type CampaignDeviceStateEnum = "pending" | "updated_connector_channel" | "failed_connector_channel_update" | "deployed" | "manifestremoved" | "deregistered";
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
     * The API resource entity
     */
    object?: string;
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
        deviceType?: ComparisonObject<string>;
        hostGateway?: ComparisonObject<string>;
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
