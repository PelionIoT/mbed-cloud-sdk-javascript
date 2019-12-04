import * as superagent from "superagent";
import { Logger } from "typescript-logging";
import { ConnectApi } from "../../../";
import { Subscribe } from "../../../primary/subscribe/subscribe";
import { CallbackFn } from "../../common/interfaces";
import { Endpoints } from "../endpoints";
import { AsyncResponseItem, DeliveryMethod, NotificationObject } from "../types";
export declare const notify: (connect: ConnectApi, subscribe: Subscribe, notifyFns: {
    [key: string]: AsyncResponseItem;
}, asyncFns: {
    [key: string]: AsyncResponseItem;
}, data: NotificationObject) => void;
export declare const startNotifications: (connect: ConnectApi, pollRequest: any, endpoints: Endpoints, log: Logger, deliveryMethod: DeliveryMethod, subscribe: Subscribe, notifyFns: {
    [key: string]: AsyncResponseItem;
}, asyncFns: {
    [key: string]: AsyncResponseItem;
}, options?: any, callback?: CallbackFn<void>) => Promise<void>;
export declare const stopNotifications: (endpoints: Endpoints, pollRequest: boolean | superagent.SuperAgentRequest, log: Logger, deliveryMethod: DeliveryMethod, callback?: CallbackFn<void>) => Promise<void>;
