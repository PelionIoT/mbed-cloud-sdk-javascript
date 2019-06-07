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
import { DeviceStateObserver } from "./observers/deviceStateObserver";
import { ResourceValuesObserver } from "./observers/resourceValuesObserver";
export class Subscribe {
    constructor(_connect) {
        if (_connect) {
            this.connect = _connect;
        }
        this.deviceStateObservers = new Array();
        this.resourceValueObservers = new Array();
    }
    /**
     * Returns a deviceStateObserver that is listening for device events.
     * To subscribe to specific events or devices, a DeviceEventFilter must be provided.
     *
     * Example: subscribe to device registration events.
     *
     * ```javascript
     * const observer = connect.subscribe.deviceStateChanges({ event: "registrations" });
     * // add a callback
     * observer.addCallback(res => console.log(res));
     * ```
     *
     * @param filter the deviceEventFilter
     */
    deviceStateChanges(filter) {
        const observer = new DeviceStateObserver(filter);
        this.deviceStateObservers.push(observer);
        this.startNotifications();
        return observer;
    }
    resourceValues(filter, immediacy = "OnValueUpdate") {
        const observer = new ResourceValuesObserver(filter, this.connect, immediacy);
        this.resourceValueObservers.push(observer);
        this.startNotifications();
        return observer;
    }
    /**
     * Notify all observers
     * @param data
     */
    notifyDeviceEvents(data) {
        this.deviceStateObservers.forEach(observer => observer.notify(data));
    }
    /**
     * Notify all observers
     * @param data
     */
    notifyResourceValues(data) {
        this.resourceValueObservers.forEach(observer => observer.notify(data));
    }
    startNotifications() {
        if (this.connect) {
            this.connect.startNotifications();
        }
    }
}
//# sourceMappingURL=subscribe.js.map