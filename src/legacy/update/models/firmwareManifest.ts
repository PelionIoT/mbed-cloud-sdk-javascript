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

import { asyncStyle } from "../../common/functions";
import { CallbackFn } from "../../common/interfaces";
import { FirmwareManifestObject } from "../types";
import { UpdateApi } from "../updateApi";

/**
 * Firmware Manifest
 */
export class FirmwareManifest {
    /**
     * The ID of the firmware manifest
     */
    public readonly id: string;
    /**
     * The URL of the firmware manifest
     */
    public readonly url: string;
    /**
     * Size of the datafile (in bytes)
     */
    public readonly datafileSize?: number;
    /**
     * The URL of the key table used to encrypt the firmware
     */
    public readonly keyTableUrl?: string;
    /**
     * The class of device
     */
    public readonly deviceClass?: string;
    /**
     * The timestamp when the object was created
     */
    public readonly createdAt: Date;
    /**
     * The timestamp the object was updated
     */
    public readonly updatedAt: Date;
    /**
     * The version of the firmware manifest (as a timestamp)
     */
    public readonly timestamp: Date;

    constructor(init?: Partial<FirmwareManifest>, private _api?: UpdateApi) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
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
    public delete(callback: CallbackFn<void>): void;
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteFirmwareManifest(this.id, done);
        }, callback);
    }
}
export interface FirmwareManifest extends FirmwareManifestObject {}
