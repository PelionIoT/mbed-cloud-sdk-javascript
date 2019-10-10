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
 *CampaignDeviceMetadata repository
 */
var CampaignDeviceMetadataRepository = /** @class */ (function (_super) {
    __extends(CampaignDeviceMetadataRepository, _super);
    function CampaignDeviceMetadataRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * read
     * @param campaignId - The device's campaign ID
     * @param id - The metadata record ID
     */
    CampaignDeviceMetadataRepository.prototype.read = function (campaignId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/update-campaigns/{campaign_id}/campaign-device-metadata/{campaign_device_metadata_id}/",
                method: "GET",
                pathParams: {
                    campaign_id: campaignId,
                    campaign_device_metadata_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.CampaignDeviceMetadataAdapter.fromApi(data));
        });
    };
    return CampaignDeviceMetadataRepository;
}(repository_1.Repository));
exports.CampaignDeviceMetadataRepository = CampaignDeviceMetadataRepository;
//# sourceMappingURL=campaignDeviceMetadataRepository.js.map