export interface FirmwareImageType {
    /**
     * The binary file of firmware image
     */
    "datafile": string;
    /**
     * The description of the object
     */
    "description": string;
    /**
     * The time the object was created
     */
    "createdAt": Date;
    /**
     * The time the object was updated
     */
    "updatedAt": Date;
    /**
     * Checksum generated for the datafile
     */
    "datafileChecksum": string;
    /**
     * The ID of the firmware image
     */
    "id": string;
    /**
     * The name of the object
     */
    "name": string;
}
export interface FirmwareManifestType {
    /**
     * The description of the object
     */
    "description"?: string;
    /**
     * The version of the firmware manifest (as a timestamp)
     */
    "timestamp"?: Date;
    /**
     * The time the object was created
     */
    "createdAt"?: Date;
    /**
     * The time the object was updated
     */
    "updatedAt"?: Date;
    /**
     * The contents of the manifest
     */
    "manifestContents"?: any;
    /**
     * The class of device
     */
    "deviceClass"?: string;
    /**
     * The ID of the firmware manifest
     */
    "id"?: string;
    /**
     * The name of the object
     */
    "name"?: string;
}
