import { Observer } from "./observer";
import { NotificationObject } from "../../../legacy/connect/types";
export declare class MasterObserver extends Observer<NotificationObject> {
    constructor();
    /**
     * Stop this observer from receiving notifications
     */
    unsubscribe(): void;
}
