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

import { asyncStyle } from "../common/functions";
import { FirmwareImageType } from "./types";
import { FirmwareImageSerializerData as apiFirmwareImage } from "../_api/firmware_catalog";
import { UpdateApi } from "./index";

/*
 * Firmware Image
 */
export class FirmwareImage {

    constructor(options: FirmwareImageType, private _api?: UpdateApi) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiFirmwareImage, api: UpdateApi): FirmwareImage {
        let type:FirmwareImageType = {
        	createdAt: 			from.created_at,
        	datafile: 			from.datafile,
        	datafileChecksum:	from.datafile_checksum,
        	description:		from.description,
        	id:					from.id,
        	name:				from.name,
        	updatedAt:			from.updated_at
        };

        return new FirmwareImage(type, api);
    }

    /**
     * Delete the firmware image
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Delete the firmware image
     * @param callback A function that is passed any error
     */
    public delete(callback?: (err: any, data?: void) => any);
    public delete(callback?: (err: any, data?: void) => any): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteFirmwareImage({
                id:    parseInt(this.id)
            }, done);
        }, callback);
    }
}
export interface FirmwareImage extends FirmwareImageType {}
