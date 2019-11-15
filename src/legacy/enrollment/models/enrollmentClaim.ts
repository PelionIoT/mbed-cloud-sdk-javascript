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

import { asyncStyle } from "../../common/functions";
import { CallbackFn } from "../../common/interfaces";
import { EnrollmentApi } from "../enrollmentApi";
import { AddEnrollmentClaim } from "../types";

export class EnrollmentClaim {
    /**
     * Enrollment internal id.
     */
    public readonly id: string;
    /**
     * muid
     */
    public readonly accountId: string;
    /**
     * The time of the enrollment identity creation.
     */
    public readonly createdAt: Date;
    /**
     * The time of claiming the device to the account
     */
    public readonly claimedAt?: Date;
    /**
     * The id of the device in the device directory once it has been registered
     */
    public readonly deviceId?: string;
    /**
     * The enrollment claim expiration time. If the device does not connect to Pelion Device Management before the expiration, the claim is removed without a separate notice.
     */
    public readonly expiresAt: Date;

    constructor(init: Partial<EnrollmentClaim>, private readonly _api: EnrollmentApi) {
        Object.keys(init).forEach(key => {
            this[key] = init[key];
        });
    }

    /**
     * Delete this enrollment claim.
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Delete this enrollment claim.
     * @param callback A function that is passed any error
     */
    public delete(callback: CallbackFn<void>): void;
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteEnrollmentClaim(this.id, done);
        }, callback);
    }
}

export interface EnrollmentClaim extends AddEnrollmentClaim {}
