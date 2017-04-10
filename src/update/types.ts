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

export interface AddFirmwareImageObject {
    /**
     * The name of the object
     */
    name: string;
    /**
     * The description of the object
     */
    description?: string;
    /**
     * The binary file of firmware image
     */
    datafile: string;
}

export interface AddFirmwareManifestObject {
    /**
     * The name of the object
     */
    name: string;
    /**
     * The description of the object
     */
    description?: string;
    /**
     * The file of the manifest
     */
    datafile: string;
}

export type CampaignStateEnum = "draft" | "scheduled" | "devicefetch" | "devicecopy" | "devicecopycomplete" | "publishing" | "deploying" | "deployed" | "manifestremoved" | "expired";
export interface CampaignObject {
    /**
     * A name for this campaign
     */
    name?: string;
    /**
     * The device filter to use
     */
    deviceFilter?: string;
    /**
     * An optional description of the campaign
     */
    description?: string;
    /**
     * ID of the manifest to use for update
     */
    manifestId?: string;
    /**
     * The state of the campaign
     */
    state?: CampaignStateEnum;
    /**
     * The timestamp at which update campaign scheduled to start
     */
    scheduledAt?: Date;
}

export interface AddCampaignObject extends CampaignObject{
    /**
     * A name for this campaign
     */
    name: string;
    /**
     * The device filter to use
     */
    deviceFilter: string;
}

export interface UpdateCampaignObject extends CampaignObject{
    /**
     * The ID of the campaign
     */
    id: string;
}
