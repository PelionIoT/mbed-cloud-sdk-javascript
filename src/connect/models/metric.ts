/*
* Mbed Cloud JavaScript SDK
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
 * Metric
 */
export class Metric {
    /**
     * The ID of the metric
     */
    readonly id: string;
    /**
     * UTC time in RFC3339 format
     */
    readonly timestamp?: Date;
    /**
     * Number of transaction events from devices linked to the account.
     */
    readonly transactions?: number;
    /**
     * Number of successful bootstraps the account has used.
     */
    readonly successfulDeviceRegistrations?: number;
    /**
     * Number of pending bootstraps the account has used.
     */
    readonly pendingDeviceRegistrations?: number;
    /**
     * Number of failed bootstraps the account has used.
     */
    readonly failedDeviceRegistrations?: number;
    /**
     * Number of successful device server REST API requests the account has used.
     */
    readonly successfulApiCalls?: number;
    /**
     * Number of failed device server REST API requests the account has used.
     */
    readonly failedApiCalls?: number;
    /**
     * Number of successful handshakes the account has used.
     */
    readonly successfulHandshakes?: number;
    /**
     * Number of failed handshakes the account has used.
     */
    readonly failedHandshakes?: number;
    /**
     * Maximum number of registered devices linked to the account.
     */
    readonly registeredDevices?: number;

    constructor(init?: Partial<Metric>) {
        for(var key in init) {
            this[key] = init[key];
        }
    }
}
