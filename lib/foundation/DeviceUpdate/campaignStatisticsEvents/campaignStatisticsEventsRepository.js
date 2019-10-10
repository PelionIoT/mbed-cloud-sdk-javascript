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
/**
 *CampaignStatisticsEvents repository
 */
var CampaignStatisticsEventsRepository = /** @class */ (function (_super) {
    __extends(CampaignStatisticsEventsRepository, _super);
    function CampaignStatisticsEventsRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * read
     * @param campaignId - ID of the associated campaign.
     * @param id - id
     * @param summaryStatusId - summaryStatusId
     */
    CampaignStatisticsEventsRepository.prototype.read = function (campaignId, id, summaryStatusId) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/update-campaigns/{campaign_id}/statistics/{summary_status_id}/event_types/{event_type_id}",
                method: "GET",
                pathParams: {
                    campaign_id: campaignId,
                    event_type_id: id,
                    summary_status_id: summaryStatusId,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.CampaignStatisticsEventsAdapter.fromApi(data));
        });
    };
    return CampaignStatisticsEventsRepository;
}(repository_1.Repository));
exports.CampaignStatisticsEventsRepository = CampaignStatisticsEventsRepository;
//# sourceMappingURL=campaignStatisticsEventsRepository.js.map