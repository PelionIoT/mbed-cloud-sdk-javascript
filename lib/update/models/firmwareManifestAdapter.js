"use strict";
/*
* mbed Cloud JavaScript SDK
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
Object.defineProperty(exports, "__esModule", { value: true });
var firmwareManifest_1 = require("./firmwareManifest");
/**
 * Firmware Manifest Adapter
 */
var FirmwareManifestAdapter = (function () {
    function FirmwareManifestAdapter() {
    }
    FirmwareManifestAdapter.mapContents = function (from) {
        if (!from)
            return {};
        var contents = {
            classId: from.classId,
            vendorId: from.vendorId,
            version: from.manifestVersion,
            description: from.description,
            nonce: from.nonce,
            createdAt: from.timestamp ? new Date(from.timestamp * 1000) : null,
            encryptionMode: null,
            applyImmediately: from.applyImmediately,
            deviceId: from.deviceId,
            payloadFormat: null,
            payloadStorageIdentifier: null,
            payloadHash: null,
            payloadUri: null,
            payloadSize: null
        };
        if (from.encryptionMode && from.encryptionMode.enum) {
            contents.encryptionMode = from.encryptionMode.enum === 1 ? "none-ecc-secp256r1-sha256"
                : from.encryptionMode.enum === 2 ? "aes-128-ctr-ecc-secp256r1-sha256"
                    : from.encryptionMode.enum === 3 ? "none-none-sha256"
                        : null;
        }
        if (from.payload) {
            contents.payloadStorageIdentifier = from.payload.storageIdentifier;
            if (from.payload.format && from.payload.format.enum) {
                contents.payloadFormat = from.payload.format.enum === 1 ? "raw-binary"
                    : from.payload.format.enum === 2 ? "cbor"
                        : from.payload.format.enum === 3 ? "hex-location-length-data"
                            : from.payload.format.enum === 4 ? "elf"
                                : null;
            }
            if (from.payload.reference) {
                contents.payloadHash = from.payload.reference.hash;
                contents.payloadUri = from.payload.reference.uri;
                contents.payloadSize = from.payload.reference.size;
            }
        }
        return contents;
    };
    FirmwareManifestAdapter.map = function (from, api) {
        return new firmwareManifest_1.FirmwareManifest({
            createdAt: from.created_at,
            url: from.datafile,
            description: from.description,
            deviceClass: from.device_class,
            id: from.id,
            contents: FirmwareManifestAdapter.mapContents(from.manifest_contents),
            name: from.name,
            timestamp: from.timestamp,
            updatedAt: from.updated_at
        }, api);
    };
    return FirmwareManifestAdapter;
}());
exports.FirmwareManifestAdapter = FirmwareManifestAdapter;
