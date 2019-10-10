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
var adapter_1 = require("../../../common/adapter");
/**
 *CampaignStatistics adapter
 */
var CampaignStatisticsAdapter = /** @class */ (function (_super) {
    __extends(CampaignStatisticsAdapter, _super);
    function CampaignStatisticsAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    CampaignStatisticsAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = CampaignStatisticsAdapter.assignDefined(instance || {}, {
            _discriminator: "CAMPAIGN_STATISTICS",
            campaignId: data.campaign_id,
            count: data.count || 0,
            createdAt: data.created_at,
            id: data.id,
            summaryStatus: data.summary_status,
        });
        return mappedEntity;
    };
    return CampaignStatisticsAdapter;
}(adapter_1.Adapter));
exports.CampaignStatisticsAdapter = CampaignStatisticsAdapter;
//# sourceMappingURL=campaignStatisticsAdapter.js.map