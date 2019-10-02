"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var firmwareManifest_1 = require("./firmwareManifest");
/**
 * Firmware Manifest Adapter
 */
var FirmwareManifestAdapter = /** @class */ (function () {
    function FirmwareManifestAdapter() {
    }
    FirmwareManifestAdapter.map = function (from, api) {
        return new firmwareManifest_1.FirmwareManifest({
            createdAt: from.created_at,
            url: from.datafile,
            datafileSize: from.datafile_size,
            keyTableUrl: from.key_table,
            description: from.description,
            deviceClass: from.device_class,
            id: from.id,
            name: from.name,
            timestamp: from.timestamp,
            updatedAt: from.updated_at,
        }, api);
    };
    return FirmwareManifestAdapter;
}());
exports.FirmwareManifestAdapter = FirmwareManifestAdapter;
//# sourceMappingURL=firmwareManifestAdapter.js.map