import { Entity } from "../../../common/entity";
/**
 *CampaignStatisticsEvents
 */
export interface CampaignStatisticsEvents extends Entity {
    /**
     *ID of the associated campaign.
     *@example 016e652be671000000000001001001e5
     */
    campaignId: string;
    /**
     *count
     *@example 10
     */
    readonly count?: number;
    /**
     *createdAt
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly createdAt?: Date;
    /**
     *description
     *@example Update error, nonspecific network error
     */
    readonly description?: string;
    /**
     *eventType
     *@example UPD4_FAIL_101
     */
    readonly eventType?: string;
    /**
     *summaryStatus
     *@example FAIL
     */
    readonly summaryStatus?: string;
    /**
     *summaryStatusId
     *@example fail
     */
    summaryStatusId: string;
}
