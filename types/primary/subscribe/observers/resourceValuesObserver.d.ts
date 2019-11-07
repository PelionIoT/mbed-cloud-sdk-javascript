import { ConnectApi } from "../../../legacy/connect/connectApi";
import { FirstValueEnum, NotificationData, PresubscriptionObject, ResourceValuesFilter } from "../../../legacy/connect/types";
import { Observer } from "./observer";
export declare class ResourceValuesObserver extends Observer<NotificationData> {
    firstValue: FirstValueEnum;
    localPresubscriptions: Array<PresubscriptionObject>;
    private connect;
    private filter;
    constructor(_filter?: ResourceValuesFilter, _connect?: ConnectApi, firstValue?: FirstValueEnum);
    /**
     * Notify this observer
     * @param data
     */
    notify(data: NotificationData): void;
    /**
     * Stop this observer from recieving notifications
     */
    unsubscribe(): void;
    private compareData;
    private syncPresubscriptions;
    private unionOfPresubscriptions;
}
