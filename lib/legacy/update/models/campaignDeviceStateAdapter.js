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
var campaignDeviceState_1 = require("./campaignDeviceState");
/**
 * Campaign Device State Adapter
 */
var CampaignDeviceStateAdapter = /** @class */ (function () {
    function CampaignDeviceStateAdapter() {
    }
    CampaignDeviceStateAdapter.map = function (from) {
        return new campaignDeviceState_1.CampaignDeviceState({
            id: from.id,
            deviceId: from.device_id,
            campaignId: from.campaign,
            state: from.deployment_state,
            name: from.name,
            description: from.description,
            createdAt: from.created_at,
            updatedAt: from.updated_at,
            mechanism: from.mechanism,
            mechanismUrl: from.mechanism_url,
        });
    };
    return CampaignDeviceStateAdapter;
}());
exports.CampaignDeviceStateAdapter = CampaignDeviceStateAdapter;
//# sourceMappingURL=campaignDeviceStateAdapter.js.map