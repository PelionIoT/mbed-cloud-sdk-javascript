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
import { QuotaHistory } from "./quotaHistory";
import { mapQuotaHistoryServicePackage } from "./servicePackageAdapter";
/**
 * Internal
 * @ignore
 */
export const mapQuotaHistory = (from) => {
    return new QuotaHistory({
        id: from.id,
        createdAt: from.added,
        delta: from.amount,
        accountId: (from.reservation !== null) ? from.reservation.account_id : null,
        campaignName: (from.reservation !== null) ? from.reservation.campaign_name : null,
        servicePackage: mapQuotaHistoryServicePackage(from.service_package),
        reason: from.reason,
    });
};
//# sourceMappingURL=quotaHistoryAdapter.js.map