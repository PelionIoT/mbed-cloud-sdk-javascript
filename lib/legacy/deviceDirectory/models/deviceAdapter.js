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
var device_1 = require("./device");
/**
 * Device Adapter
 */
var DeviceAdapter = /** @class */ (function () {
    function DeviceAdapter() {
    }
    DeviceAdapter.map = function (from, api) {
        return new device_1.Device({
            accountId: from.account_id,
            bootstrappedTimestamp: from.bootstrapped_timestamp,
            createdAt: from.created_at,
            customAttributes: from.custom_attributes,
            description: from.description,
            deviceClass: from.device_class,
            id: from.id,
            mechanism: from.mechanism,
            mechanismUrl: from.mechanism_url,
            name: from.name,
            serialNumber: from.serial_number,
            state: from.state,
            updatedAt: from.updated_at,
            vendorId: from.vendor_id,
            alias: from.endpoint_name,
            bootstrapCertificateExpiration: from.bootstrap_expiration_date,
            certificateFingerprint: from.device_key,
            certificateIssuerId: from.ca_id,
            connectorCertificateExpiration: from.connector_expiration_date,
            deviceExecutionMode: from.device_execution_mode,
            firmwareChecksum: from.firmware_checksum,
            manifestTimestamp: from.manifest_timestamp,
            hostGateway: from.host_gateway,
            deviceType: from.endpoint_type,
            claimedAt: from.enrolment_list_timestamp,
        }, api);
    };
    DeviceAdapter.addMap = function (from) {
        return {
            name: from.name,
            vendor_id: from.vendorId,
            custom_attributes: from.customAttributes,
            mechanism: from.mechanism,
            device_class: from.deviceClass,
            mechanism_url: from.mechanismUrl,
            serial_number: from.serialNumber,
            description: from.description,
            bootstrap_expiration_date: from.bootstrapCertificateExpiration,
            bootstrapped_timestamp: from.bootstrappedTimestamp,
            ca_id: from.certificateIssuerId,
            connector_expiration_date: from.connectorCertificateExpiration,
            device_execution_mode: from.deviceExecutionMode,
            device_key: from.certificateFingerprint,
            endpoint_name: from.alias,
            firmware_checksum: from.firmwareChecksum,
            state: from.state,
            host_gateway: from.hostGateway,
            endpoint_type: from.deviceType,
        };
    };
    DeviceAdapter.updateMap = function (from) {
        return {
            name: from.name,
            custom_attributes: from.customAttributes,
            description: from.description,
            ca_id: from.certificateIssuerId,
            device_key: from.certificateFingerprint,
            endpoint_name: from.alias,
            host_gateway: from.hostGateway,
            endpoint_type: from.deviceType,
        };
    };
    return DeviceAdapter;
}());
exports.DeviceAdapter = DeviceAdapter;
//# sourceMappingURL=deviceAdapter.js.map