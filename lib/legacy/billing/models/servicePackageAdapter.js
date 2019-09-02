"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var servicePackage_1 = require("./servicePackage");
/**
 * Internal
 * @ignore
 */
exports.mapActive = function (from) {
    var common = mapCommon(from);
    common.nextId = from.id;
    common.gracePeriod = from.grace_period;
    common.state = "active";
    return new servicePackage_1.ServicePackage(common);
};
/**
 * Internal
 * @ignore
 */
exports.mapPending = function (from) {
    var common = mapCommon(from);
    common.state = "pending";
    return new servicePackage_1.ServicePackage(common);
};
/**
 * Internal
 * @ignore
 */
exports.mapPrevious = function (from) {
    var common = mapCommon(from);
    common.endsAt = from.end_time;
    common.nextId = from.next_id;
    common.reason = from.reason;
    common.state = "previous";
    return new servicePackage_1.ServicePackage(common);
};
/**
 * Internal
 * @ignore
 */
exports.mapQuotaHistoryServicePackage = function (from) {
    return new servicePackage_1.ServicePackage({
        expiresAt: from.expires,
        firmwareUpdateCount: from.firmware_update_count,
        id: from.id,
        previousId: from.previous_id,
        startsAt: from.start_time,
    });
};
/**
 * Internal
 * @ignore
 */
var mapCommon = function (from) {
    return new servicePackage_1.ServicePackage({
        createdAt: from.created,
        expiresAt: from.expires,
        endsAt: null,
        gracePeriod: null,
        nextId: null,
        reason: null,
        firmwareUpdateCount: from.firmware_update_count,
        id: from.id,
        modifiedAt: from.modified,
        previousId: from.previous_id,
        startsAt: from.start_time,
    });
};
//# sourceMappingURL=servicePackageAdapter.js.map