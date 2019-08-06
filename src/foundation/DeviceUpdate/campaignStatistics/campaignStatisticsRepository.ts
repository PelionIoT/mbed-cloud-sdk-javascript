import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { CampaignStatistics } from "./campaignStatistics";
import { CampaignStatisticsEvents } from "../../index";
import { CampaignStatisticsEventsAdapter } from "../../index";
import { CampaignStatisticsAdapter } from "../../index";
import { Paginator, Page } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *CampaignStatistics repository
 */
export class CampaignStatisticsRepository extends Repository {
    /**
     * events
     * @param campaignId - The campaign ID
     * @param id - The summary status. For example, fail
     * @param options - options
     */
    public events(
        campaignId: string,
        id: string,
        options?: ListOptions
    ): Paginator<CampaignStatisticsEvents, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<Page<CampaignStatisticsEvents>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/update-campaigns/{campaign_id}/statistics/{summary_status_id}/event_types/",
                            method: "GET",
                            pathParams: {
                                campaign_id: campaignId,
                                summary_status_id: id,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<CampaignStatisticsEvents>, done) => {
                    done(null, new Page(data, data.data, CampaignStatisticsEventsAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * list
     * @param campaignId - The campaign ID
     * @param options - options
     */
    public list(campaignId: string, options?: ListOptions): Paginator<CampaignStatistics, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<Page<CampaignStatistics>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/update-campaigns/{campaign_id}/statistics/",
                            method: "GET",
                            pathParams: {
                                campaign_id: campaignId,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<CampaignStatistics>, done) => {
                    done(null, new Page(data, data.data, CampaignStatisticsAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param campaignId - ID of the associated campaign.
     * @param id - ID of the event type description
     */
    public read(campaignId: string, id: string): Promise<CampaignStatistics> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/update-campaigns/{campaign_id}/statistics/{summary_status_id}",
                        method: "GET",
                        pathParams: {
                            campaign_id: campaignId,
                            summary_status_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, CampaignStatisticsAdapter.fromApi(data));
            }
        );
    }
}
