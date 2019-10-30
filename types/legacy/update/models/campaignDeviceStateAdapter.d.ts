import { CampaignDeviceMetadata as apiDeviceState } from "../../_api/update_service";
import { CampaignDeviceState } from "./campaignDeviceState";
/**
 * Campaign Device State Adapter
 */
export declare class CampaignDeviceStateAdapter {
    static map(from: apiDeviceState): CampaignDeviceState;
}
