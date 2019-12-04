import { NotificationObject } from "../../../legacy/connect/types";
import { Observer } from "./observer";
export declare class MasterObserver extends Observer<NotificationObject> {
    constructor();
    /**
     * Stop this observer from receiving notifications
     */
    unsubscribe(): void;
}
