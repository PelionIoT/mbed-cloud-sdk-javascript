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

export interface FirmwareImageType {
    /**
     * The binary file of firmware image
     */
    datafile: string;
    /**
     * The description of the object
     */
    description: string;
    /**
     * The time the object was created
     */
    createdAt: Date;
    /**
     * The time the object was updated
     */
    updatedAt: Date;
    /**
     * Checksum generated for the datafile
     */
    datafileChecksum: string;
    /**
     * The ID of the firmware image
     */
    id: string;
    /**
     * The name of the object
     */
    name: string;
}

export interface FirmwareManifestType {
    /**
     * The file of the manifest
     */
    datafile: string;
    /**
     * The description of the object
     */
    description?: string;
    /**
     * The version of the firmware manifest (as a timestamp)
     */
    timestamp?: Date;
    /**
     * The time the object was created
     */
    createdAt?: Date;
    /**
     * The time the object was updated
     */
    updatedAt?: Date;
    /**
     * The contents of the manifest
     */
    manifestContents?: any;
    /**
     * The class of device
     */
    deviceClass?: string;
    /**
     * The ID of the firmware manifest
     */
    id?: string;
    /**
     * The name of the object
     */
    name?: string;
}

export type CampaignStateEnum = "draft" | "scheduled" | "devicefetch" | "devicecopy" | "devicecopycomplete" | "publishing" | "deploying" | "deployed" | "manifestremoved" | "expired";

export interface CampaignType {
    /**
     * An optional description of the campaign
     */
    description: string;
    /**
     * The state of the campaign
     */
    state: CampaignStateEnum;
    /**
     * The updating IAM user ID
     */
    userId: string;
    /**
     * The time the object was created
     */
    createdAt: Date;
    /**
     * ???
     */
    manifestId: string;
    /**
     * The updating account ID
     */
    accountId: string;
    /**
     * The time the object was updated
     */
    updatedAt: Date;
    /**
     * The timestamp at which update campaign scheduled to start
     */
    startDate?: Date;
    /**
     * The timestamp when the update campaign finished
     */
    finishDate?: Date;
    /**
     * ???
     */
    manifestUrl: string;
    /**
     * The gateway client API key
     */
    apiKey: string;
    /**
     * The ID of the campaign
     */
    id: string;
    /**
     * The attributes of the filter
     */
    attributes?: { [key: string]: string };
    /**
     * The custom attributes of the filter
     */
    customAttributes?: { [key: string]: string };
    /**
     * A name for this campaign
     */
    name: string;
}

export interface CampaignStateType extends CampaignType {
    directDevices: number;
    connectorDevices: number;
    deployedDevices: number;
    totalDevices: number;
    deviceStates?: DeviceStateType[];
}

export type DeviceStateEnum = "pending" | "updated_device_catalog" | "updated_connector_channel" | "deployed" | "manifestremoved";

export interface DeviceStateType {
    /**
     * The description of the object
     */
    description: string;
    /**
     * The update campaign to which this device belongs
     */
    campaign: string;
    /**
     * The time the object was created
     */
    createdAt: Date;
    /**
     * The time the object was updated
     */
    updatedAt: Date;
    /**
     * The ID of the channel used to communicated with the device
     */
    mechanism: string;
    /**
     * The name of the object
     */
    name: string;
    /**
     * The address of the Connector to use
     */
    mechanismUrl: string;
    /**
     * The state of the deployment
     */
    state: DeviceStateEnum;
    /**
     * The ID of the metadata concerning this device/campaign
     */
    id: string;
    /**
     * The ID of the device to deploy
     */
    deviceId: string;
}
