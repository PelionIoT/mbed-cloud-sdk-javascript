import { CampaignStateType } from "./types";
import { UpdateCampaignStatusSerializer as apiCampaignState } from "../_api/deployment_service";
export declare class CampaignState {
    constructor(options: CampaignStateType);
    static map(from: apiCampaignState): CampaignState;
}
export interface CampaignState extends CampaignStateType {
}
