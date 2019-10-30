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

import { ServicePackage } from "./servicePackage";

export class QuotaHistory {
    /**
     * Id
     */
    public readonly id: string;

    /**
     * Date service package was created
     */
    public readonly createdAt?: Date;

    /**
     * Remaining firmware updates
     */
    public readonly delta?: number;

    /**
     * Account Id
     */
    public readonly accountId?: string;

    /**
     * Name of linked campaign
     */
    public readonly campaignName?: string;

    /**
     * The service package
     */
    public readonly servicePackage?: ServicePackage;

    /**
     * Reason
     */
    public readonly reason?: string;

    constructor(init: Partial<QuotaHistory>) {
        Object.keys(init).forEach(key => {
            this[key] = init[key];
        });
    }
}
