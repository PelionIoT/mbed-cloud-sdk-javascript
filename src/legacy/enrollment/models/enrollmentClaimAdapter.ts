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
import { EnrollmentId as ApiEnrollmentId, EnrollmentIdentity as ApiEnrollmentIdentity } from "../../_api/enrollment";
import { EnrollmentApi } from "../enrollmentApi";
import { AddEnrollmentClaim } from "../types";
import { EnrollmentClaim } from "./enrollmentClaim";

/**
 * Internal
 * @ignore
 */
export const map = (from: ApiEnrollmentIdentity, api: EnrollmentApi): EnrollmentClaim => {
    return new EnrollmentClaim(
        {
            accountId: from.account_id,
            claimId: from.enrollment_identity,
            createdAt: from.created_at,
            deviceId: from.enrolled_device_id,
            expiresAt: from.expires_at,
            id: from.id,
        },
        api
    );
};

/**
 * Internal
 * @ignore
 */
export const addMap = ({ claimId }: AddEnrollmentClaim): ApiEnrollmentId => ({ enrollment_identity: claimId });
