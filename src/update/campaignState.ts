/* 
* mbed Cloud JavaScript SDK
* Copyright ARM Limited 2017
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

import { CampaignStateType } from "./types";
import { UpdateCampaignStatusSerializer as apiCampaignState } from "../_api/deployment_service";
import { decodeAttributes } from "../common/functions";
import { Campaign } from "./campaign";
import { DeviceState } from "./deviceState";

/*
 * Campaign State
 */
export class CampaignState {

    constructor(options: CampaignStateType) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiCampaignState): CampaignState {
        let attributes = decodeAttributes(from.device_filter, Campaign.CUSTOM_PREFIX);
        let deviceStates = from.campaigndevicemetadata_set.map(DeviceState.map);
        let type:CampaignStateType = {
            accountId:           from.updating_account_id,
            apiKey:              from.updating_api_key,
            attributes:          attributes.noMatch,
            customAttributes:    attributes.match,
            createdAt:           from.created_at,
            description:         from.description,
            finishDate:          from.finished,
            manifestId:          null,
            manifestUrl:         from.root_manifest_url,
            name:                from.name,
            startDate:           from.when,
            state:               from.state,
            updatedAt:           from.updated_at,
            userId:              from.updating_user_id,
            connectorDevices:    from.connector_devices,
            deployedDevices:     from.deployed_devices,
            directDevices:       from.direct_devices,
            id:                  from.campaign_id,
            totalDevices:        from.total_devices,
            deviceStates:        deviceStates
        };

        return new CampaignState(type);
    }
}
export interface CampaignState extends CampaignStateType {}
