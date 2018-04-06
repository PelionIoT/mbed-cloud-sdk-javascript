import { ConnectApi } from "../connectApi";
import { DeviceStateObserver } from "./observers/DeviceState/deviceStateObserver";
import { DeviceEvent, DeviceEventFilter } from "../types";
import { Resource } from "../models/resource";
export declare class Subscribe {
    private connect;
    private deviceStateObservers;
    constructor(_connect?: ConnectApi);
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
    deviceState(filter?: DeviceEventFilter): DeviceStateObserver;
    /**
     * Notify all observers
     * @param data
     */
    notify(data: DeviceEvent<Resource>): void;
}
