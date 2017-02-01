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

import pg = require("polygoat");
import { FirmwareManifestType } from "./types";
import { FirmwareManifestSerializerData as apiFirmwareManifest } from "../_api/firmware_catalog";
import { UpdateApi } from "./index";

/*
 * Firmware Manifest
 */
export class FirmwareManifest {

    constructor(options: FirmwareManifestType, private _api?: UpdateApi) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiFirmwareManifest, api: UpdateApi): FirmwareManifest {
        let type:FirmwareManifestType = {
        	createdAt:           from.created_at,
            datafile:            from.datafile,
            description:         from.description,
            deviceClass:         from.device_class,
            id:                  from.id,
            manifestContents:    from.manifest_contents,
            name:                from.name,
            timestamp:           from.timestamp,
            updatedAt:           from.updated_at
        };

        return new FirmwareManifest(type, api);
    }

    /**
     * Delete the firmware manifest
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Delete the firmware manifest
     * @param callback A function that is passed any error
     */
    public delete(callback?: (err: any, data?: void) => any);
    public delete(callback?: (err: any, data?: void) => any): Promise<void> {
        return pg(done => {
            this._api.deleteFirmwareManifest({
                id:    parseInt(this.id)
            }, done);
        }, callback);
    }
}
export interface FirmwareManifest extends FirmwareManifestType {}
