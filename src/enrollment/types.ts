/*
 * Mbed Cloud JavaScript SDK
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

export interface AddEnrollmentClaimObject {
    /**
     * Enrollment identity.
     */
    claimId: string;
}

export interface EnrollmentClaimObject {
    /**
     * Enrollment identity internal id.
     */
    id: string;
    /**
     * muid
     */
    accountId: string;
    /**
     * Enrollment identity.
     */
    claimId?: string;
    /**
     * The time of the enrollment identity creation.
     */
    createdAt: Date;
    /**
     * The time of claiming the device to be assigned to the account.
     */
    claimedAt?: Date;
    /**
     * Enrolled device internal ID.
     */
    deviceId?: string;
    /**
     * The enrollment claim expiration time. If the device does not connect to Mbed Cloud before the expiration, the claim is removed without a separate notice.
     */
    expiresAt: Date;
}
