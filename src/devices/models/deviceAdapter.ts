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

import {
    DeviceData as apiDevice,
    DeviceDataPostRequest as apiDeviceAdd,
    DeviceDataPatchRequest as apiDeviceUpdate
} from "../../_api/device_catalog";
import { DevicesApi } from "../index";
import { AddDeviceObject, UpdateDeviceObject } from "../types";
import { Device } from "./device";

/**
 * Device Adapter
 */
export class DeviceAdapter {

    static map(from: apiDevice, api: DevicesApi): Device {
        return new Device({
            accountId:                         from.account_id,
            autoUpdate:                        from.auto_update,
            bootstrappedTimestamp:             from.bootstrapped_timestamp,
            createdAt:                         from.created_at,
            customAttributes:                  from.custom_attributes,
            deployedState:                     from.deployed_state,
            lastDeployment:                    from.deployment,
            description:                       from.description,
            deviceClass:                       from.device_class,
            id:                                from.id,
            manifestUrl:                       from.manifest,
            mechanism:                         from.mechanism,
            mechanismUrl:                      from.mechanism_url,
            name:                              from.name,
            serialNumber:                      from.serial_number,
            state:                             from.state,
            trustClass:                        from.trust_class,
            trustLevel:                        from.trust_level,
            updatedAt:                         from.updated_at,
            vendorId:                          from.vendor_id,
            alias:                             from.endpoint_name,
            bootstrapCertificateExpiration:    from.bootstrap_expiration_date,
            certificateFingerprint:            from.device_key,
            certificateIssuerID:               from.ca_id,
            connectorCertificateExpiration:    from.connector_expiration_date,
            deviceExecutionMode:               from.device_execution_mode,
            firmwareChecksum:                  from.firmware_checksum,
            manifestTimestamp:                 from.manifest_timestamp
        }, api);
    }

    static addMap(from: AddDeviceObject): apiDeviceAdd {
        return {
            name:                         from.name,
            auto_update:                  from.autoUpdate,
            vendor_id:                    from.vendorId,
            custom_attributes:            from.customAttributes,
            manifest:                     from.manifestUrl,
            mechanism:                    from.mechanism,
            device_class:                 from.deviceClass,
            mechanism_url:                from.mechanismUrl,
            serial_number:                from.serialNumber,
            trust_level:                  from.trustLevel,
            description:                  from.description,
            bootstrap_expiration_date:    from.bootstrapCertificateExpiration,
            bootstrapped_timestamp:       from.bootstrappedTimestamp,
            ca_id:                        from.certificateIssuerID,
            connector_expiration_date:    from.connectorCertificateExpiration,
            deployed_state:               from.deployedState,
            deployment:                   from.lastDeployment,
            device_execution_mode:        from.deviceExecutionMode,
            device_key:                   from.certificateFingerprint,
            endpoint_name:                from.alias,
            firmware_checksum:            from.firmwareChecksum,
            state:                        from.state
        };
    }

    static updateMap(from: UpdateDeviceObject): apiDeviceUpdate {
        return {
            name:                         from.name,
            auto_update:                  from.autoUpdate,
            custom_attributes:            from.customAttributes,
            description:                  from.description,
            ca_id:                        from.certificateIssuerID,
            device_key:                   from.certificateFingerprint,
            endpoint_name:                from.alias,
        };
    }
}
