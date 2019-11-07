import { ConnectApi } from "../../../";
import { TlvParser } from "../../../common";
import { CallbackFn } from "../../common/interfaces";
import { Endpoints } from "../endpoints";
import { Resource } from "../models/resource";
import { ResourceValue } from "../models/resourceValue";
import { AsyncResponse, AsyncResponseItem } from "../types";
export declare const getResourceValue: ({ connect, endpoints, asyncFns, forceClear, autostartNotifications, deviceId, resourcePath, timeout, mimeType, resource, tlvParser, callback, }: {
    connect: ConnectApi;
    endpoints: Endpoints;
    asyncFns: {
        [key: string]: AsyncResponseItem;
    };
    forceClear: boolean;
    autostartNotifications: boolean;
    deviceId: string;
    resourcePath: string;
    timeout?: number;
    mimeType?: any;
    resource?: Resource;
    tlvParser?: TlvParser;
    callback?: CallbackFn<ResourceValue>;
}) => Promise<ResourceValue>;
export declare const setResourceValue: (connect: ConnectApi, endpoints: Endpoints, asyncFns: {
    [key: string]: AsyncResponseItem;
}, forceClear: boolean, autostartNotifications: boolean, deviceId: string, resourcePath: string, value: string | number, timeout?: number, mimeType?: any, callback?: CallbackFn<AsyncResponse>) => Promise<AsyncResponse>;
export declare const executeResource: (connect: ConnectApi, endpoints: Endpoints, asyncFns: {
    [key: string]: AsyncResponseItem;
}, forceClear: boolean, autostartNotifications: boolean, deviceId: string, resourcePath: string, payload?: any, timeout?: number, mimeType?: any, accepts?: string, callback?: CallbackFn<AsyncResponse>) => Promise<AsyncResponse>;
export declare const getResource: (endpoints: Endpoints, deviceId: string, resourcePath: string, callback?: CallbackFn<Resource>) => Promise<Resource>;
