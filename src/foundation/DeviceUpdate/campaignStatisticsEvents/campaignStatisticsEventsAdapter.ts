import { Adapter } from "../../../common/adapter";
import { CampaignStatisticsEvents } from "./campaignStatisticsEvents";
/**
 *CampaignStatisticsEvents adapter
 */
export class CampaignStatisticsEventsAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): CampaignStatisticsEvents {
        if (!data) {
            return null;
        }
        const mappedEntity = CampaignStatisticsEventsAdapter.assignDefined(instance || {}, {
            _discriminator: "CAMPAIGN_STATISTICS_EVENTS",
            campaignId: data.campaign_id,
            count: data.count || 0,
            createdAt: data.created_at,
            description: data.description,
            eventType: data.event_type,
            id: data.id,
            summaryStatus: data.summary_status,
            summaryStatusId: data.summary_status_id,
        });
        return mappedEntity;
    }
}
