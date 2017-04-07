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

import { FirmwareManifest as apiFirmwareManifest } from "../../_api/firmware_catalog";
import { UpdateApi } from "../index";
import { FirmwareManifest } from "./firmwareManifest";

/*
 * Firmware Manifest Adapter
 */
export class FirmwareManifestAdapter {

    static map(from: apiFirmwareManifest, api: UpdateApi): FirmwareManifest {
        return new FirmwareManifest({
        	createdAt:           from.created_at,
            datafile:            from.datafile,
            description:         from.description,
            deviceClass:         from.device_class,
            id:                  from.id,
            manifestContents:    from.manifest_contents,
            name:                from.name,
            timestamp:           from.timestamp,
            updatedAt:           from.updated_at
        }, api);
    }
}
