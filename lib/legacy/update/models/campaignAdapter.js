"use strict";
/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../../common/functions");
var filters_1 = require("../../deviceDirectory/filters");
var campaign_1 = require("./campaign");
/**
 * Campaign Adapter
 */
var CampaignAdapter = /** @class */ (function () {
    function CampaignAdapter() {
    }
    CampaignAdapter.map = function (from, api) {
        return new campaign_1.Campaign({
            deviceFilter: functions_1.decodeFilter(from.device_filter, filters_1.Filters.DEVICE_FILTER_MAP, filters_1.Filters.NESTED_FILTERS),
            createdAt: from.created_at,
            description: from.description,
            finishedAt: from.finished,
            id: from.id,
            manifestId: from.root_manifest_id,
            manifestUrl: from.root_manifest_url,
            name: from.name,
            startedAt: from.started_at,
            state: from.state,
            phase: from.phase,
            scheduledAt: from.when,
            updatedAt: from.updated_at,
        }, api);
    };
    CampaignAdapter.addMap = function (from) {
        return {
            description: from.description,
            device_filter: functions_1.encodeFilter(from.deviceFilter, filters_1.Filters.DEVICE_FILTER_MAP, filters_1.Filters.NESTED_FILTERS) || null,
            name: from.name,
            root_manifest_id: from.manifestId,
            state: from.state,
            when: from.scheduledAt,
            object: from.object,
        };
    };
    CampaignAdapter.updateMap = function (from) {
        return {
            description: from.description,
            device_filter: functions_1.encodeFilter(from.deviceFilter, filters_1.Filters.DEVICE_FILTER_MAP, filters_1.Filters.NESTED_FILTERS) || null,
            name: from.name,
            root_manifest_id: from.manifestId,
            state: from.state,
            when: from.scheduledAt,
            object: from.object,
        };
    };
    return CampaignAdapter;
}());
exports.CampaignAdapter = CampaignAdapter;
//# sourceMappingURL=campaignAdapter.js.map