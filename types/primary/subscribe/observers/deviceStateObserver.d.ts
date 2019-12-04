import { Resource } from "../../../legacy/connect/models/resource";
import { DeviceEvent, DeviceEventFilter } from "../../../legacy/connect/types";
import { Observer } from "./observer";
export declare class DeviceStateObserver extends Observer<DeviceEvent<Resource>> {
    private filter;
    constructor(_filter?: DeviceEventFilter);
    /**
     * Notify this observer
     * @param data
     */
    notify(data: DeviceEvent<Resource>): void;
    /**
     * Stop this observer from recieving notifications
     */
    unsubscribe(): void;
    private filterFunc;
}
