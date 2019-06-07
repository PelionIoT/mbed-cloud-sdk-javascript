"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var repository_1 = require("../../../common/repository");
var functions_1 = require("../../../legacy/common/functions");
var index_1 = require("../../index");
var index_2 = require("../../index");
var pagination_1 = require("../../../common/pagination");
var listResponse_1 = require("../../../legacy/common/listResponse");
/**
 *CampaignStatistics repository
 */
var CampaignStatisticsRepository = /** @class */ (function (_super) {
    __extends(CampaignStatisticsRepository, _super);
    function CampaignStatisticsRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * events
     * @param campaignId - The campaign ID
     * @param id - The summary status. For example, fail
     * @param options - options
     */
    CampaignStatisticsRepository.prototype.events = function (campaignId, id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/update-campaigns/{campaign_id}/statistics/{summary_status_id}/event_types/",
                    method: "GET",
                    pathParams: {
                        campaign_id: campaignId,
                        summary_status_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.CampaignStatisticsEventsAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * list
     * @param campaignId - The campaign ID
     * @param options - options
     */
    CampaignStatisticsRepository.prototype.list = function (campaignId, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/update-campaigns/{campaign_id}/statistics/",
                    method: "GET",
                    pathParams: {
                        campaign_id: campaignId,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_2.CampaignStatisticsAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param campaignId - ID of the associated campaign.
     * @param id - ID of the event type description
     */
    CampaignStatisticsRepository.prototype.read = function (campaignId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/update-campaigns/{campaign_id}/statistics/{summary_status_id}",
                method: "GET",
                pathParams: {
                    campaign_id: campaignId,
                    summary_status_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.CampaignStatisticsAdapter.fromApi(data));
        });
    };
    return CampaignStatisticsRepository;
}(repository_1.Repository));
exports.CampaignStatisticsRepository = CampaignStatisticsRepository;
//# sourceMappingURL=campaignStatisticsRepository.js.map