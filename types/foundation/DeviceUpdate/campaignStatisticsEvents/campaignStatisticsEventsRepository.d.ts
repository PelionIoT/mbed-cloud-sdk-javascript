import { Repository } from "../../../common/repository";
import { CampaignStatisticsEvents } from "./campaignStatisticsEvents";
/**
 *CampaignStatisticsEvents repository
 */
export declare class CampaignStatisticsEventsRepository extends Repository {
    /**
     * read
     * @param campaignId - ID of the associated campaign.
     * @param id - id
     * @param summaryStatusId - summaryStatusId
     */
    read(campaignId: string, id: string, summaryStatusId: string): Promise<CampaignStatisticsEvents>;
}
