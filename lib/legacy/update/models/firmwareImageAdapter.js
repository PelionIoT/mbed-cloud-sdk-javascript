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
var firmwareImage_1 = require("./firmwareImage");
/**
 * Firmware Image Adapter
 */
var FirmwareImageAdapter = /** @class */ (function () {
    function FirmwareImageAdapter() {
    }
    FirmwareImageAdapter.map = function (from, api) {
        return new firmwareImage_1.FirmwareImage({
            createdAt: from.created_at,
            url: from.datafile,
            datafileChecksum: from.datafile_checksum,
            datafileSize: from.datafile_size,
            description: from.description,
            id: from.id,
            name: from.name,
            updatedAt: from.updated_at,
        }, api);
    };
    return FirmwareImageAdapter;
}());
exports.FirmwareImageAdapter = FirmwareImageAdapter;
//# sourceMappingURL=firmwareImageAdapter.js.map