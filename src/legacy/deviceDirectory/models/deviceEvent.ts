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

/**
 * Device Event
 */
export class DeviceEvent {
    /**
     * ID of the event
     */
    public readonly id: string;
    /**
     * Date and time of the event
     */
    public readonly eventDate: Date;
    /**
     * ID of device the event is for
     */
    public readonly deviceId?: string;
    /**
     * Whether the event changed state
     */
    public readonly stateChanged?: boolean;
    /**
     * Description of the event
     */
    public readonly description?: string;
    /**
     * Changes made
     */
    public readonly changes?: {};
    /**
     * Description of the event type
     */
    public readonly typeDescription?: string;
    /**
     * Type of the event
     */
    public readonly type?: string;
    /**
     * Data pertaining to the event
     */
    public readonly data?: {};

    constructor(init?: Partial<DeviceEvent>) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }
}
