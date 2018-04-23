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

import { ConnectApi } from "../connect/connectApi";
import { DeviceStateObserver } from "./observers/DeviceState/deviceStateObserver";
import { DeviceEvent, DeviceEventFilter } from "../connect/types";
import { Resource } from "../connect/models/resource";

export class Subscribe {

    private connect: ConnectApi;

    private deviceStateObservers: Array<DeviceStateObserver>;

    constructor(_connect?: ConnectApi) {
        if (_connect) {
            this.connect = _connect;
        }
        this.deviceStateObservers = new Array();
    }

    /**
     * Returns a deviceStateObserver that is listening for device events.
     * To subscribe to specific events or devices, a DeviceEventFilter must be provided.
     *
     * Example: subscribe to device registration events.
     *
     * ```javascript
     * const observer = connect.subscribe.deviceState({ event: "registrations" });
     * // add a callback
     * observer.addCallback(res => console.log(res));
     * ```
     *
     * @param filter the deviceEventFilter
     */
    public deviceState(filter?: DeviceEventFilter): DeviceStateObserver {
        const observer = new DeviceStateObserver(filter);
        this.deviceStateObservers.push(observer);
        if (this.connect) {
            if (!this.connect.handleNotifications) {
                this.connect.startNotifications();
            }
        }

        return observer;
    }

    /**
     * Notify all observers
     * @param data
     */
    public notify(data: DeviceEvent<Resource>): void {
        this.deviceStateObservers.forEach(observer => observer.notify(data));
    }
}
