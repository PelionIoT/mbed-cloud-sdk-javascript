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

/*
 * Device Log
 */
export class DeviceLog {

    /**
     * ID of the event
     */
    readonly id: string;
    /**
     * Date and time of the event
     */
    readonly eventDate: Date;
    /**
     * Whether the event changed state
     */
    readonly stateChanged?: boolean;
    /**
     * Description of the event
     */
    readonly description?: string;
    /**
     * Changes made
     */
    readonly changes?: string;
    /**
     * Description of the event type
     */
    readonly eventTypeDescription?: string;
    /**
     * ID of the event log entry
     */
    readonly logId?: string;
    /**
     * Type of the event
     */
    readonly eventType?: string;
    /**
     * Data pertaining to the event
     */
    readonly data?: string;
    /**
     * Device ID related to the event
     */
    readonly deviceId?: string;

    constructor(init?: Partial<DeviceLog>) {
        for(var key in init) {
            this[key] = init[key];
        }
    }
}
