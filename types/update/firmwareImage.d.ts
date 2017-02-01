import { FirmwareImageType } from "./types";
import { FirmwareImageSerializerData as apiFirmwareImage } from "../_api/firmware_catalog";
import { UpdateApi } from "./index";
export declare class FirmwareImage {
    private _api;
    constructor(options: FirmwareImageType, _api?: UpdateApi);
    static map(from: apiFirmwareImage, api: UpdateApi): FirmwareImage;
    /**
     * Delete the firmware image
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the firmware image
     * @param callback A function that is passed any error
     */
    delete(callback?: (err: any, data?: void) => any): any;
}
export interface FirmwareImage extends FirmwareImageType {
}
