/*
 * Pelion Device Management JavaScript SDK
 * Copyright Arm Limited 2018
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
import { BootstrapApi } from "../bootstrapApi";
import { AddPreSharedKey } from "../types";

export class PreSharedKey {
    /**
     * Creation time.
     */
    public readonly createdAt?: Date;

    constructor(init: Partial<PreSharedKey>, private readonly _api: BootstrapApi) {
        Object.keys(init).forEach(key => {
            this[key] = init[key];
        });
    }

    /**
     * Delete this PSK.
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Delete this PSK.
     * @param callback A function that is passed any error
     */
    public delete(callback: CallbackFn<void>): void;
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deletePsk(this.endpointName, done);
        }, callback);
    }
}

export interface PreSharedKey extends AddPreSharedKey {}
