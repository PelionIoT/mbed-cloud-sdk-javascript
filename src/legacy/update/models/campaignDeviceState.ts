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

import { CampaignDeviceStateEnum } from "../types";

/**
 * Campaign Device State
 */
export class CampaignDeviceState {
    /**
     * The id of the metadata record
     */
    public readonly id?: string;
    /**
     * The id of the device
     */
    public readonly deviceId?: string;
    /**
     * The id of the campaign the device is in
     */
    public readonly campaignId?: string;
    /**
     * The state of the update campaign on the device
     */
    public readonly state?: CampaignDeviceStateEnum;
    /**
     * The name of the device
     */
    public readonly name?: string;
    /**
     * Description of the device
     */
    public readonly description?: string;
    /**
     * The timestamp of when this record was created in the database
     */
    public readonly createdAt?: Date;
    /**
     * The timestamp of when this record was modified in the database
     */
    public readonly updatedAt?: Date;
    /**
     * The mechanism used to deliver the firmware (connector or direct)
     */
    public readonly mechanism?: string;
    /**
     * The URL of cloud connect used
     */
    public readonly mechanismUrl?: string;

    constructor(init?: Partial<CampaignDeviceState>) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }
}
