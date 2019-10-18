import { CallbackFn } from "../../common/interfaces";
import { FirmwareImageObject } from "../types";
import { UpdateApi } from "../updateApi";
/**
 * Firmware Image
 */
export declare class FirmwareImage {
    private _api?;
    /**
     * The ID of the firmware image
     */
    readonly id: string;
    /**
     * The URL of the firmware image
     */
    readonly url: string;
    /**
     * Checksum generated for the datafile
     */
    readonly datafileChecksum: string;
    /**
     * Size of the datafile (in bytes)
     */
    readonly datafileSize?: number;
    /**
     * The timestamp when the object was created
     */
    readonly createdAt: Date;
    /**
     * The timestamp when the object was updated
     */
    readonly updatedAt: Date;
    constructor(init?: Partial<FirmwareImage>, _api?: UpdateApi);
    /**
     * Delete the firmware image
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the firmware image
     * @param callback A function that is passed any error
     */
    delete(callback: CallbackFn<void>): void;
}
export interface FirmwareImage extends FirmwareImageObject {
}
