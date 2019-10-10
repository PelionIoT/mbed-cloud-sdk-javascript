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
 *CampaignDeviceMetadata adapter
 */
var CampaignDeviceMetadataAdapter = /** @class */ (function (_super) {
    __extends(CampaignDeviceMetadataAdapter, _super);
    function CampaignDeviceMetadataAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    CampaignDeviceMetadataAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = CampaignDeviceMetadataAdapter.assignDefined(instance || {}, {
            _discriminator: "CAMPAIGN_DEVICE_METADATA",
            campaignId: data.campaign,
            createdAt: data.created_at,
            deploymentState: data.deployment_state,
            description: data.description,
            deviceId: data.device_id,
            id: data.id,
            mechanism: data.mechanism,
            mechanismUrl: data.mechanism_url,
            name: data.name,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    };
    return CampaignDeviceMetadataAdapter;
}(adapter_1.Adapter));
exports.CampaignDeviceMetadataAdapter = CampaignDeviceMetadataAdapter;
//# sourceMappingURL=campaignDeviceMetadataAdapter.js.map