import { FirmwareImage as apiFirmwareImage } from "../../_api/update_service";
import { UpdateApi } from "../updateApi";
import { FirmwareImage } from "./firmwareImage";
/**
 * Firmware Image Adapter
 */
export declare class FirmwareImageAdapter {
    static map(from: apiFirmwareImage, api: UpdateApi): FirmwareImage;
}
