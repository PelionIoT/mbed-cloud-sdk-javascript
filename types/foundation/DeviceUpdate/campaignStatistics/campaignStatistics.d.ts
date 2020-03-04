import { Entity } from "../../../common/entity";
import { CampaignStatisticsSummaryStatus } from "./types";
/**
 *CampaignStatistics
 */
export interface CampaignStatistics extends Entity {
    /**
     *ID of the associated campaign.
     *@example 016e652be6710000000000010010013d
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
