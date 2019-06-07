import { Observer } from "./observer";
import { Resource } from "../../../legacy/connect/models/resource";
import { DeviceEvent, DeviceEventFilter } from "../../../legacy/connect/types";
export declare class DeviceStateObserver extends Observer<DeviceEvent<Resource>> {
    private _subscribed;
    private filter;
    constructor(_filter?: DeviceEventFilter);
    private filterFunc;
    /**
     * Notify this observer
     * @param data
     */
    notify(data: DeviceEvent<Resource>): void;
    /**
     * Stop this observer from recieving notifications
     */
    unsubscribe(): void;
}
