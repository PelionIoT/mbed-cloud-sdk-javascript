/*
 * Pelion Device Management JavaScript SDK
 * Copyright Arm Limited 2018
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

export class ServicePackage {
    /**
     * Id
     */
    public readonly id: string;

    /**
     * Created At
     */
    public readonly createdAt?: Date;

    /**
     * ExpiresAt
     */
    public readonly expiresAt?: Date;

    /**
     * EndsAt
     */
    public readonly endsAt?: Date;

    /**
     * ModifiedAt
     */
    public readonly modifiedAt?: Date;

    /**
     * StartsAt
     */
    public readonly startsAt?: Date;

    /**
     * Firmware Update Count
     */
    public readonly firmwareUpdateCount?: number;

    /**
     * Grace Period
     */
    public readonly gracePeriod?: boolean;

    /**
     * Next Id
     */
    public readonly nextId?: string;

    /**
     * PreviousId
     */
    public readonly previousId?: string;

    /**
     * Reason
     */
    public readonly reason?: string;

    /**
     * State
     */
    public readonly state?: string;

    constructor(init: Partial<ServicePackage>) {
        Object.keys(init).forEach(key => {
            this[key] = init[key];
        });
    }
}
