import { Repository } from "../../../common/repository";
import { CampaignDeviceMetadata } from "./campaignDeviceMetadata";
/**
 *CampaignDeviceMetadata repository
 */
export declare class CampaignDeviceMetadataRepository extends Repository {
    /**
     * read
     * @param campaignId - The device's campaign ID
     * @param id - The metadata record ID
     */
    read(campaignId: string, id: string): Promise<CampaignDeviceMetadata>;
}
