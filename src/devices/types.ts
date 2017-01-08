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

import { Device } from "./device";

export type MechanismEnum = "connector" | "direct";
export type DeviceStateEnum = "unenrolled" | "cloud_enrolling" | "bootstrapped" | "registered";
export type DeploymentEnum = "development" | "production";

export interface DeviceDetail {
    /**
    * The key used to provision the device
    */
    provision_key: string;
    /**
    * The ID of the channel used to communicate with the device
    */
    mechanism: MechanismEnum;
    /**
    * The current state of the device
    */
    state?: DeviceStateEnum;
    /**
    * The state of the device's deployment
    */
    deployed_state?: DeploymentEnum;
    /**
    * The ID of the device
    */
    id?: string;
    /**
    * The name of the object
    */
    name?: string;
    /**
    * The description of the object
    */
    description?: string;
    /**
    * The time the object was bootstrapped
    */
    bootstrapped_timestamp?: Date;
    /**
    * The time the object was updated
    */
    updated_at?: Date;
    /**
    * Up to 5 custom JSON attributes
    */
    custom_attributes?: {};
    /**
    * The device class
    */
    device_class?: string;
    /**
    * Mark this device for auto firmware update
    */
    auto_update?: boolean;
    /**
    * The entity instance signature
    */
    etag?: Date;
    /**
    * The serial number of the device
    */
    serial_number?: string;
    /**
    * The device vendor ID
    */
    vendor_id?: string;
    /**
    * The owning IAM account ID
    */
    account_id?: string;
    /**
    * The device trust level
    */
    trust_level?: number;
    /**
    * The device trust class
    */
    trust_class?: number;
    /**
    * The last deployment used on the device
    */
    deployment?: string;
    /**
    * The address of the connector to use
    */
    mechanism_url?: string;
    /**
    * The time the object was created
    */
    created_at?: Date;
    /**
    * URL for the current device manifest
    */
    manifest?: string;
}

export type DeviceStatuses = "ACTIVE" | "STALE";

export interface DeviceType {
    /**
    * Unique identifier representing the device
    */
    name?: string;
    /**
    * Type of device. (Free text)
    */
    type?: string;
    /**
    * Possible values ACTIVE, STALE
    */
    status?: DeviceStatuses;
    /**
    * Determines whether the device is in queue mode
    */
    queueMode?: boolean;
}

export interface ResourceType {
    /**
    * Whether you can subscribe to changes for this resource
    */
    obs: boolean;
    /**
    * Resource's type
    */
    rt: string;
    /**
    * The content type of the resource
    */
    type: string;
    /**
    * Resource's url
    */
    uri: string;
    /**
    * The device the resource belongs to
    */
    device: Device;
}

export interface QueryDetail {
    /**
    * The ID of the query
    */
    id: string;
    /**
    * The name of the query
    */
    name: string;
    /**
    * The device query
    */
    query: string;
    /**
    * The description of the object
    */
    description: string;
    /**
    * The time the object was created
    */
    created_at: Date;
    /**
    * The time the object was updated
    */
    updated_at: Date;
    /**
    * The entity instance signature
    */
    etag: Date;
}