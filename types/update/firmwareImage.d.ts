import { FirmwareImageType } from "./types";
import { FirmwareImageSerializerData as apiFirmwareImage } from "../_api/firmware_catalog";
export declare class FirmwareImage {
    constructor(options: FirmwareImageType);
    static map(from: apiFirmwareImage): FirmwareImage;
}
export interface FirmwareImage extends FirmwareImageType {
}
