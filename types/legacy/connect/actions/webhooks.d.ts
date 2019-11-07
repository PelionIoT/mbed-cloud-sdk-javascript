import { Config } from "../../..";
import { ConnectApi } from "../../../";
import { CallbackFn } from "../../common/interfaces";
import { Endpoints } from "../endpoints";
import { Webhook } from "../models/webhook";
import { DeliveryMethod } from "../types";
export declare const getWebhook: (config: Config, endpoints: Endpoints, callback?: CallbackFn<Webhook>) => Promise<Webhook>;
export declare const updateWebhook: (connect: ConnectApi, endpoints: Endpoints, deliveryMethod: DeliveryMethod, connectForceClear: boolean, url: string, headers?: any, forceClear?: any, callback?: CallbackFn<void>) => Promise<void>;
export declare const deleteWebhook: (endpoints: Endpoints, callback?: CallbackFn<void>) => Promise<void>;
