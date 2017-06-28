import { FirmwareManifest as apiFirmwareManifest, ManifestContents as apiManifestContents } from "../../_api/update_service";
import { ManifestContents } from "../types";
import { UpdateApi } from "../updateApi";
import { FirmwareManifest } from "./firmwareManifest";
/**
 * Firmware Manifest Adapter
 */
export declare class FirmwareManifestAdapter {
    static mapContents(from: apiManifestContents): ManifestContents;
    static map(from: apiFirmwareManifest, api: UpdateApi): FirmwareManifest;
}
