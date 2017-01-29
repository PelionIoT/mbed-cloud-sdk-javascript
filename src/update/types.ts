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
