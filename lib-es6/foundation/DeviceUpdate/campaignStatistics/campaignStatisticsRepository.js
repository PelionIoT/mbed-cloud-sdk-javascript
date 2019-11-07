import { Repository } from "../../../common/repository";
import { Page, Paginator } from "../../../index";
import { apiWrapper } from "../../../legacy/common/functions";
import { CampaignStatisticsEventsAdapter } from "../../index";
import { CampaignStatisticsAdapter } from "../../index";
/**
 *CampaignStatistics repository
 */
export class CampaignStatisticsRepository extends Repository {
    /**
     * events
     * @param campaignId - The campaign ID.
     * @param id - The summary status. For example, fail.
     * @param options - options
     */
    events(campaignId, id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/update-campaigns/{campaign_id}/statistics/{summary_status_id}/event_types",
                    method: "GET",
                    pathParams: {
                        campaign_id: campaignId,
                        summary_status_id: id,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new Page(data, data.data, CampaignStatisticsEventsAdapter.fromApi, pageOptions));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * list
     * @param campaignId - The campaign ID.
     * @param options - options
     */
    list(campaignId, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/update-campaigns/{campaign_id}/statistics",
                    method: "GET",
                    pathParams: {
                        campaign_id: campaignId,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new Page(data, data.data, CampaignStatisticsAdapter.fromApi, pageOptions));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param campaignId - ID of the associated campaign.
     * @param id - ID of the event type description.
     */
    read(campaignId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/update-campaigns/{campaign_id}/statistics/{summary_status_id}",
                method: "GET",
                pathParams: {
                    campaign_id: campaignId,
                    summary_status_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, CampaignStatisticsAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=campaignStatisticsRepository.js.map