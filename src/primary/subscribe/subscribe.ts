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

import { ConnectApi } from "../../legacy/connect/connectApi";
import { Resource } from "../../legacy/connect/models/resource";
import {
    DeviceEvent,
    DeviceEventFilter,
    FirstValueEnum,
    NotificationData,
    NotificationObject,
    ResourceValuesFilter,
} from "../../legacy/connect/types";
import { DeviceStateObserver } from "./observers/deviceStateObserver";
import { MasterObserver } from "./observers/masterObserver";
import { ResourceValuesObserver } from "./observers/resourceValuesObserver";

export class Subscribe {
    private connect: ConnectApi;

    private deviceStateObservers: Array<DeviceStateObserver>;

    private resourceValueObservers: Array<ResourceValuesObserver>;

    private masterObserver: MasterObserver;

    constructor(_connect?: ConnectApi) {
        if (_connect) {
            this.connect = _connect;
        }
        this.deviceStateObservers = new Array();
        this.resourceValueObservers = new Array();
        this.masterObserver = new MasterObserver();
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
    public deviceStateChanges(filter?: DeviceEventFilter): DeviceStateObserver {
        const observer = new DeviceStateObserver(filter);
        this.deviceStateObservers.push(observer);
        this.startNotifications();

        return observer;
    }

    public resourceValues(
        filter?: ResourceValuesFilter,
        immediacy: FirstValueEnum = "OnValueUpdate"
    ): ResourceValuesObserver {
        const observer = new ResourceValuesObserver(filter, this.connect, immediacy);
        this.resourceValueObservers.push(observer);
        this.startNotifications();

        return observer;
    }

    /**
     * Returns the master observer that is listening to all notifications coming from Pelion.
     */
    public allNotifications(): MasterObserver {
        this.startNotifications();

        return this.masterObserver;
    }

    /**
     * Notify all observers
     * @param data
     */
    public notifyDeviceEvents(data: DeviceEvent<Resource>): void {
        this.deviceStateObservers.forEach(observer => observer.notify(data));
    }

    /**
     * Notify all observers
     * @param data
     */
    public notifyResourceValues(data: NotificationData): void {
        this.resourceValueObservers.forEach(observer => observer.notify(data));
    }

    /**
     * Notify the master observer
     * @param data
     */
    public notifyAllNotifications(data: NotificationObject): void {
        this.masterObserver.notify(data);
    }

    /**
     * Notify all observers
     * @param data
     */
    private startNotifications(): void {
        if (this.connect && this.connect.autostartNotifications) {
            this.connect.startNotifications();
        }
    }
}
