import { Entity } from "../../../common/entity";
/**
 *FirmwareManifest
 */
export interface FirmwareManifest extends Entity {
    /**
     *The time the object was created
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly createdAt?: Date;
    /**
     *The size of the datafile in bytes
     */
    readonly datafileSize?: number;
    /**
     *The URL of the firmware manifest binary
     *@example http://example.com/00000000000000000000000000000000
     */
    readonly datafileUrl?: string;
    /**
     *The description of the firmware manifest
     */
    description?: string;
    /**
     *The class of the device
     *@example 00000000-0000-0000-0000-000000000000
     */
    readonly deviceClass?: string;
    /**
     *The key table of pre-shared keys for devices
     *@example http://example.com
     */
    readonly keyTableUrl?: string;
    /**
     *The name of the object
     */
    name?: string;
    /**
     *The firmware manifest version as a timestamp
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly timestamp?: Date;
    /**
     *The time the object was updated
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly updatedAt?: Date;
}
