import { FirmwareManifestType } from "./types";
import { FirmwareManifestSerializerData as apiFirmwareManifest } from "../_api/firmware_catalog";
import { UpdateApi } from "./index";
export declare class FirmwareManifest {
    private _api;
    constructor(options: FirmwareManifestType, _api?: UpdateApi);
    static map(from: apiFirmwareManifest, api: UpdateApi): FirmwareManifest;
    /**
     * Delete the firmware manifest
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the firmware manifest
     * @param callback A function that is passed any error
     */
    delete(callback?: (err: any, data?: void) => any): any;
}
export interface FirmwareManifest extends FirmwareManifestType {
}
