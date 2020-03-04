import { SDKError } from "../..";
import { ConnectApi } from "../../../";
import { CallbackFn } from "../../common/interfaces";
import { Endpoints } from "../endpoints";
import { Resource } from "../models/resource";
import { AsyncResponseItem } from "../types";
export declare const deleteSubscriptions: (connect: ConnectApi, callback?: CallbackFn<void>) => Promise<void>;
export declare const listDeviceSubscriptions: (endpoints: Endpoints, deviceId: string, callback?: CallbackFn<string>) => Promise<string>;
export declare const getResourceSubscription: (endpoints: Endpoints, deviceId: string, resourcePath: string, callback?: CallbackFn<boolean>) => Promise<boolean>;
export declare const addResourceSubscription: (connect: ConnectApi, endpoints: Endpoints, notifyFns: {
    [key: string]: AsyncResponseItem;
}, deviceId: string, resourcePath: string, notifyFn?: (error: SDKError, data: any) => any, callback?: CallbackFn<void>) => Promise<void>;
export declare const deleteResourceSubscription: (connect: ConnectApi, endpoints: Endpoints, notifyFns: {
    [key: string]: AsyncResponseItem;
}, deviceId: string, resourcePath: string, callback?: CallbackFn<void>) => Promise<void>;
export declare const deleteDeviceSubscriptions: (endpoints: Endpoints, notifyFns: {
    [key: string]: AsyncResponseItem;
}, deviceId: string, callback?: CallbackFn<void>) => Promise<void>;
export declare const listResources: (endpoints: Endpoints, deviceId: string, callback?: CallbackFn<Resource[]>) => Promise<Resource[]>;
