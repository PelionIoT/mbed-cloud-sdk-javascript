import { Observer } from "../observer";
import { Resource } from "../../../models/resource";
import { DeviceEvent, DeviceEventFilter } from "../../../types";
export declare class DeviceStateObserver extends Observer<DeviceEvent<Resource>> {
    private _subscribed;
    private filter;
    constructor(_filter?: DeviceEventFilter);
    private filterFunc(data);
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
