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

import { asyncStyle } from "../../common/functions";
import { CallbackFn } from "../../common/interfaces";
import { AddFirmwareImageObject } from "../types";
import { UpdateApi } from "../index";

/**
 * Firmware Image
 */
export class FirmwareImage {

    /**
     * The ID of the firmware image
     */
    readonly id: string;
    /**
     * Checksum generated for the datafile
     */
    readonly datafileChecksum: string;
    /**
     * The time the object was created
     */
    readonly createdAt: Date;
    /**
     * The time the object was updated
     */
    readonly updatedAt: Date;

    constructor(init?: Partial<FirmwareImage>, private _api?: UpdateApi) {
        for(var key in init) {
            this[key] = init[key];
        }
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
    public delete(callback: CallbackFn<void>);
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteFirmwareImage(parseInt(this.id), done);
        }, callback);
    }
}
export interface FirmwareImage extends AddFirmwareImageObject {}
