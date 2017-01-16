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

export type MechanismEnum = "connector" | "direct";
export type DeviceStateEnum = "unenrolled" | "cloud_enrolling" | "bootstrapped" | "registered";
export type DeploymentEnum = "development" | "production";

export interface DeviceType {
    /**
    * The key used to provision the device
    */
    provisionKey?: string;
    /**
    * The ID of the channel used to communicate with the device
    */
    mechanism?: MechanismEnum;
    /**
    * The current state of the device
    */
    state?: DeviceStateEnum;
    /**
    * The state of the device's deployment
    */
    deployedState?: DeploymentEnum;
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
    bootstrappedTimestamp?: string;
    /**
    * The time the object was updated
    */
    updatedAt?: Date;
    /**
    * Up to 5 custom JSON attributes
    */
    customAttributes?: {};
    /**
    * The device class
    */
    deviceClass?: string;
    /**
    * Mark this device for auto firmware update
    */
    autoUpdate?: boolean;
    /**
    * The serial number of the device
    */
    serialNumber?: string;
    /**
    * The device vendor ID
    */
    vendorId?: string;
    /**
    * The owning IAM account ID
    */
    accountId?: string;
    /**
    * The device trust level
    */
    trustLevel?: number;
    /**
    * The device trust class
    */
    trustClass?: number;
    /**
    * The last deployment used on the device
    */
    deployment?: string;
    /**
    * The address of the connector to use
    */
    mechanismUrl?: string;
    /**
    * The time the object was created
    */
    createdAt?: Date;
    /**
    * URL for the current device manifest
    */
    manifest?: string;
}

export interface ResourceType {
    /**
    * Whether you can subscribe to changes for this resource
    */
    observable: boolean;
    /**
    * Resource's type
    */
    type: string;
    /**
    * The content type of the resource
    */
    contentType: string;
    /**
    * Resource's url
    */
    path: string;
}

export interface QueryType {
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
    createdAt: Date;
    /**
    * The time the object was updated
    */
    updatedAt: Date;
}

export interface WebhookType {
    /**
    * The URL to which the notifications must be sent
    */
    url?: string;
    /**
    * Headers (key/value) that must be sent with the request
    */
    headers?: {};
}
