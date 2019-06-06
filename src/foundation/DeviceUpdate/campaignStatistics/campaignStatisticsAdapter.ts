import { Adapter } from "../../../common/adapter";
import { CampaignStatistics } from "./campaignStatistics";
/**
 *CampaignStatistics adapter
 */
export class CampaignStatisticsAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): CampaignStatistics {
        if (!data) {
            return null;
        }
        const mappedEntity = CampaignStatisticsAdapter.assignDefined(instance || {}, {
            _discriminator: "CAMPAIGN_STATISTICS",
            campaignId: data.campaign_id,
            count: data.count || 0,
            createdAt: data.created_at,
            id: data.id,
            summaryStatus: data.summary_status,
        });
        return mappedEntity;
    }
}
