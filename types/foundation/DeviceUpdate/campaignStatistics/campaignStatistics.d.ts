import { Entity } from "../../../common/entity";
import { CampaignStatisticsSummaryStatus } from "./types";
/**
 *CampaignStatistics
 */
export interface CampaignStatistics extends Entity {
    /**
     *ID of the associated campaign.
     *@example 00000000000000000000000000000000
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
     *The event type description.
     *@example FAIL
     */
    readonly summaryStatus?: CampaignStatisticsSummaryStatus;
}
