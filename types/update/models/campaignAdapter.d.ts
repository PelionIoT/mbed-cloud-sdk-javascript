import { UpdateCampaign as apiCampaign, UpdateCampaignPostRequest as apiCampaignAdd, UpdateCampaignPutRequest as apiCampaignUpdate } from "../../_api/update_service";
import { AddCampaignObject, UpdateCampaignObject } from "../types";
import { UpdateApi } from "../updateApi";
import { Campaign } from "./campaign";
/**
 * Campaign Adapter
 */
export declare class CampaignAdapter {
    static map(from: apiCampaign, api: UpdateApi): Campaign;
    static addMap(from: AddCampaignObject): apiCampaignAdd;
    static updateMap(from: UpdateCampaignObject): apiCampaignUpdate;
}
