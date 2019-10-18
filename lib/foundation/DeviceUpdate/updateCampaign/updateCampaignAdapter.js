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
var privateFunctions_1 = require("../../../common/privateFunctions");
/**
 *UpdateCampaign adapter
 */
var UpdateCampaignAdapter = /** @class */ (function (_super) {
    __extends(UpdateCampaignAdapter, _super);
    function UpdateCampaignAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    UpdateCampaignAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = UpdateCampaignAdapter.assignDefined(instance || {}, {
            _discriminator: "UPDATE_CAMPAIGN",
            autostopReason: data.autostop_reason,
            createdAt: data.created_at,
            description: data.description,
            deviceFilter: data.device_filter,
            deviceFilterHelper: data.device_filter_helper,
            finished: data.finished,
            id: data.id,
            name: data.name,
            phase: data.phase,
            rootManifestId: data.root_manifest_id,
            rootManifestUrl: data.root_manifest_url,
            startedAt: data.started_at,
            updatedAt: data.updated_at,
            when: data.when,
        });
        privateFunctions_1.deviceFilterHelperSetter(mappedEntity);
        return mappedEntity;
    };
    return UpdateCampaignAdapter;
}(adapter_1.Adapter));
exports.UpdateCampaignAdapter = UpdateCampaignAdapter;
//# sourceMappingURL=updateCampaignAdapter.js.map