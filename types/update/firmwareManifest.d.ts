import { FirmwareManifestType } from "./types";
import { FirmwareManifestSerializerData as apiFirmwareManifest } from "../_api/firmware_catalog";
export declare class FirmwareManifest {
    constructor(options: FirmwareManifestType);
    static map(from: apiFirmwareManifest): FirmwareManifest;
}
export interface FirmwareManifest extends FirmwareManifestType {
}
