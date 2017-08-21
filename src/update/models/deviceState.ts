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

//import { CampaignStateEnum } from "../types";

/**
 * Device State
 */
export class DeviceState {

    /**
     * The id of the metadata record
     */
    readonly id?: string;
    /**
     * The id of the device
     */
    readonly deviceId?: string;
    /**
     * The id of the campaign the device is in
     */
    readonly campaignId?: string;
    /**
     * The state of the update campaign on the device
     */
    readonly state?: string;//CampaignStateEnum;
    /**
     * The name of the device
     */
    readonly name?: string;
    /**
     * Description of the device
     */
    readonly description?: string;
    /**
     * This time the record was created in the database
     */
    readonly createdAt?: Date;
    /**
     * This time this record was modified in the database format: date-time
     */
    readonly updatedAt?: Date;
    /**
     * The mechanism used to deliver the firmware (connector or direct)
     */
    readonly mechanism?: string;
    /**
     * The url of cloud connect used
     */
    readonly mechanismUrl?: string;

    constructor(init?: Partial<DeviceState>) {
        for(var key in init) {
            this[key] = init[key];
        }
    }
}
