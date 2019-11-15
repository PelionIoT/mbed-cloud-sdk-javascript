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
import { DeviceDirectoryApi } from "../deviceDirectoryApi";
import { AddDeviceObject } from "../types";

/**
 * Device
 */
export class Device {
    /**
     * The ID of the device
     */
    public readonly id: string;
    /**
     * The owning Identity and Access Management (IAM) account ID
     */
    public readonly accountId?: string;
    /**
     * The timestamp of when the device was created
     */
    public readonly createdAt?: Date;
    /**
     * The date-time of when the device was updated
     */
    public readonly updatedAt?: Date;
    /**
     * The date-time of the current manifest version
     */
    public readonly manifestTimestamp?: Date;
    /**
     * The claim date/time
     */
    public readonly claimedAt?: Date;

    constructor(init?: Partial<Device>, private _api?: DeviceDirectoryApi) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }

    /**
     * Update the device
     * @returns Promise of device
     */
    public update(): Promise<Device>;
    /**
     * Update the device
     * @param callback A function that is passed the arguments (error, device)
     */
    public update(callback: CallbackFn<Device>): void;
    public update(callback?: CallbackFn<Device>): Promise<Device> {
        return asyncStyle(done => {
            this._api.updateDevice(this, done);
        }, callback);
    }

    /**
     * Deletes a device
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Deletes a device
     * @param callback A function that is passed any error
     */
    public delete(callback: CallbackFn<void>): void;
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteDevice(this.id, done);
        }, callback);
    }
}
export interface Device extends AddDeviceObject {}
