"use strict";
var functions_1 = require("../common/functions");
var campaign_1 = require("./campaign");
var deviceState_1 = require("./deviceState");
/*
 * Campaign State
 */
var CampaignState = (function () {
    function CampaignState(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    CampaignState.map = function (from) {
        var attributes = functions_1.decodeAttributes(from.device_filter, campaign_1.Campaign.CUSTOM_PREFIX);
        var deviceStates = from.campaigndevicemetadata_set.map(deviceState_1.DeviceState.map);
        var type = {
            accountId: from.updating_account_id,
            apiKey: from.updating_api_key,
            attributes: attributes.noMatch,
            customAttributes: attributes.match,
            createdAt: from.created_at,
            description: from.description,
            finishDate: from.finished,
            manifestId: null,
            manifestUrl: from.root_manifest_url,
            name: from.name,
            startDate: from.when,
            state: from.state,
            updatedAt: from.updated_at,
            userId: from.updating_user_id,
            connectorDevices: from.connector_devices,
            deployedDevices: from.deployed_devices,
            directDevices: from.direct_devices,
            id: from.campaign_id,
            totalDevices: from.total_devices,
            deviceStates: deviceStates
        };
        return new CampaignState(type);
    };
    return CampaignState;
}());
exports.CampaignState = CampaignState;
