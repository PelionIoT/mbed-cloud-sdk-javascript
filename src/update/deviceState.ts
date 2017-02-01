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

import { DeviceStateType } from "./types";
import { CampaignDeviceMetadataSerializer as apiDeviceState } from "../_api/deployment_service";

/*
 * Device State
 */
export class DeviceState {

    constructor(options: DeviceStateType) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiDeviceState): DeviceState {
        let type:DeviceStateType = {
            campaign:       from.campaign,
            createdAt:      from.created_at,
            description:    from.description,
            deviceId:       from.device_id,
            id:             from.id,
            mechanism:      from.mechanism,
            mechanismUrl:   from.mechanism_url,
            name:           from.name,
            state:          from.deployment_state,
            updatedAt:      from.updated_at
        };

        return new DeviceState(type);
    }
}
export interface DeviceState extends DeviceStateType {}
