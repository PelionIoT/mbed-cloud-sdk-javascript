import { ConnectApi } from "../../legacy/connect/connectApi";
import { DeviceStateObserver } from "./observers/deviceStateObserver";
import { DeviceEvent, DeviceEventFilter, ResourceValuesFilter, NotificationData, FirstValueEnum } from "../../legacy/connect/types";
import { Resource } from "../../legacy/connect/models/resource";
import { ResourceValuesObserver } from "./observers/resourceValuesObserver";
export declare class Subscribe {
    private connect;
    private deviceStateObservers;
    private resourceValueObservers;
    constructor(_connect?: ConnectApi);
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
    deviceStateChanges(filter?: DeviceEventFilter): DeviceStateObserver;
    resourceValues(filter?: ResourceValuesFilter, immediacy?: FirstValueEnum): ResourceValuesObserver;
    /**
     * Notify all observers
     * @param data
     */
    notifyDeviceEvents(data: DeviceEvent<Resource>): void;
    /**
     * Notify all observers
     * @param data
     */
    notifyResourceValues(data: NotificationData): void;
    private startNotifications;
}
