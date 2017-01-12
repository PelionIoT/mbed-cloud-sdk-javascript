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

/**
 * Possible types of the event log
 */
export type EventTypeEnum = "update.device.device-created" | "update.device.device-updated" | "update.deployment.campaign-device-metadata-created" | "update.deployment.campaign-device-metadata-updated" | "update.deployment.campaign-device-metadata-removed" | "update.connector.connector-device.firmware-update.state" | "update.connector.connector-device.firmware-update.result";

/**
 * Device log data structure
 */
export interface DeviceLog {
	/**
	 * Date and time of the event
	 */
    eventDate: Date;
	/**
	 * Whether the event changed state
	 */
    stateChanged?: boolean;
	/**
	 * Description of the event
	 */
    description?: string;
	/**
	 * Changes made
	 */
    changes?: string;
	/**
	 * Description of the event type
	 */
    eventTypeDescription?: string;
	/**
	 * ID of the event log entry
	 */
    logId?: string;
	/**
	 * Type of the event
	 */
    eventType?: EventTypeEnum;
	/**
	 * Data pertaining to the event
	 */
    data?: string;
	/**
	 * Device ID related to the event
	 */
    deviceId?: string;
}
