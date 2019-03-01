/*
* Mbed Cloud JavaScript SDK
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

import { Observer } from "./observer";
import { Resource } from "legacy-connect/models/resource";
import { DeviceEvent, DeviceEventFilter } from "legacy-connect/types";
import { ensureArray } from "common/functions";

export class DeviceStateObserver extends Observer<DeviceEvent<Resource>> {

    private _subscribed: boolean = true;

    private filter: DeviceEventFilter;

    constructor(_filter?: DeviceEventFilter) {
        super();
        if (_filter) {
            this.filter = _filter;
        }
    }

    private filterFunc(data: DeviceEvent<Resource>): boolean {
        if (this.filter) {
            for (const key in this.filter) {
                if (ensureArray(this.filter[key]).indexOf(data[key]) === -1) { return false; }
            }
        }
        return true;
    }

    /**
     * Notify this observer
     * @param data
     */
    public notify(data: DeviceEvent<Resource>): void {
        if (this._subscribed) {
            if (this.filterFunc(data)) { super.notify(data); }
        }
    }

    /**
     * Stop this observer from recieving notifications
     */
    public unsubscribe(): void {
        this._subscribed = false;
        super.clearListeners();
    }

}
