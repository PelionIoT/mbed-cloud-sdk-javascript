import { ConnectApi, SDKError } from "../../../";
import { TlvParser } from "../../../common";
import { apiWrapper, encodeBase64 } from "../../common/functions";
import { generateId } from "../../common/idGenerator";
import { CallbackFn } from "../../common/interfaces";
import { Endpoints } from "../endpoints";
import { Resource } from "../models/resource";
import { ResourceAdapter } from "../models/resourceAdapter";
import { ResourceValue } from "../models/resourceValue";
import { AsyncResponse, AsyncResponseItem } from "../types";

export const getResourceValue = ({
    connect,
    endpoints,
    asyncFns,
    forceClear,
    autostartNotifications,
    deviceId,
    resourcePath,
    timeout,
    mimeType,
    resource,
    tlvParser,
    callback,
}: {
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
}): Promise<ResourceValue> => {
    resourcePath = reverseNormalizePath(resourcePath);
    const asyncId = generateId();

    return apiWrapper<ResourceValue>(
        async resultsFn => {
            if ((await connect.getWebhook()) && forceClear) {
                return resultsFn(new SDKError("webhook in use"), null);
            }

            asyncFns[asyncId] = { fn: resultsFn, resource: { ...resource, deviceId, path: resourcePath }, tlvParser };

            if (callback) {
                setTimeout(() => {
                    if (asyncFns[asyncId]) {
                        resultsFn(new SDKError(`Timeout getting async value. Timeout ${timeout}ms`), null);
                        delete asyncFns[asyncId];
                    }
                }, timeout);
            }

            const handleError = error => {
                if (error) {
                    delete asyncFns[asyncId];
                    resultsFn(error, null);
                }
            };

            if (autostartNotifications) {
                connect.startNotifications(null, error => {
                    if (error) {
                        return handleError(error);
                    }

                    endpoints.deviceRequests.createAsyncRequest(
                        deviceId,
                        asyncId,
                        {
                            method: "GET",
                            uri: resourcePath,
                            accept: mimeType,
                        },
                        handleError
                    );
                });
            } else {
                endpoints.deviceRequests.createAsyncRequest(
                    deviceId,
                    asyncId,
                    {
                        method: "GET",
                        uri: resourcePath,
                        accept: mimeType,
                    },
                    handleError
                );
            }
        },
        null,
        callback,
        false,
        timeout
    );
};

export const setResourceValue = (
    connect: ConnectApi,
    endpoints: Endpoints,
    asyncFns: { [key: string]: AsyncResponseItem },
    forceClear: boolean,
    autostartNotifications: boolean,
    deviceId: string,
    resourcePath: string,
    value: string | number,
    timeout?: number,
    mimeType?: any,
    callback?: CallbackFn<AsyncResponse>
): Promise<AsyncResponse> => {
    if (typeof timeout === "function") {
        callback = timeout;
        timeout = null;
    }
    if (typeof mimeType === "function") {
        callback = mimeType;
        mimeType = null;
    }

    resourcePath = reverseNormalizePath(resourcePath);
    const asyncId = generateId();
    const payload = encodeBase64(value);

    return apiWrapper(
        async resultsFn => {
            if ((await connect.getWebhook()) && !forceClear) {
                return resultsFn(new SDKError("webhook in use"), null);
            }

            asyncFns[asyncId] = { fn: resultsFn };

            if (callback) {
                setTimeout(() => {
                    if (asyncFns[asyncId]) {
                        resultsFn(new SDKError(`Timeout getting async value. Timeout ${timeout}ms`), null);
                        delete asyncFns[asyncId];
                    }
                }, timeout);
            }

            const handleError = error => {
                if (error) {
                    delete asyncFns[asyncId];
                    return resultsFn(error, null);
                }
            };

            if (autostartNotifications) {
                connect.startNotifications(null, error => {
                    if (error) {
                        return handleError(error);
                    }

                    endpoints.deviceRequests.createAsyncRequest(
                        deviceId,
                        asyncId,
                        {
                            method: "PUT",
                            uri: resourcePath,
                            "content-type": mimeType,
                            "payload-b64": payload,
                        },
                        handleError
                    );
                });
            } else {
                endpoints.deviceRequests.createAsyncRequest(
                    deviceId,
                    asyncId,
                    {
                        method: "PUT",
                        uri: resourcePath,
                        "content-type": mimeType,
                        "payload-b64": payload,
                    },
                    handleError
                );
            }
        },
        null,
        callback,
        false,
        timeout
    );
};

export const executeResource = (
    connect: ConnectApi,
    endpoints: Endpoints,
    asyncFns: { [key: string]: AsyncResponseItem },
    forceClear: boolean,
    autostartNotifications: boolean,
    deviceId: string,
    resourcePath: string,
    payload?: any,
    timeout?: number,
    mimeType?: any,
    accepts?: string,
    callback?: CallbackFn<AsyncResponse>
): Promise<AsyncResponse> => {
    if (typeof payload === "function") {
        callback = payload;
        payload = null;
    }
    if (typeof timeout === "function") {
        callback = timeout;
        timeout = null;
    }
    if (typeof accepts === "function") {
        callback = accepts;
        accepts = null;
    }
    if (typeof mimeType === "function") {
        callback = mimeType;
        mimeType = null;
    }

    resourcePath = reverseNormalizePath(resourcePath);
    const asyncId = generateId();

    return apiWrapper(
        async resultsFn => {
            if ((await connect.getWebhook()) && !forceClear) {
                return resultsFn(new SDKError("webhook in use"), null);
            }

            asyncFns[asyncId] = { fn: resultsFn };

            if (callback) {
                setTimeout(() => {
                    if (asyncFns[asyncId]) {
                        resultsFn(new SDKError(`Timeout getting async value. Timeout ${timeout}ms`), null);
                        delete asyncFns[asyncId];
                    }
                }, timeout);
            }

            const handleError = error => {
                if (error) {
                    delete asyncFns[asyncId];
                    return resultsFn(error, null);
                }
            };

            if (autostartNotifications) {
                connect.startNotifications(null, error => {
                    if (error) {
                        return handleError(error);
                    }

                    endpoints.deviceRequests.createAsyncRequest(
                        deviceId,
                        asyncId,
                        {
                            method: "POST",
                            uri: resourcePath,
                            "content-type": mimeType,
                            accept: accepts,
                            "payload-b64": encodeBase64(payload),
                        },
                        handleError
                    );
                });
            } else {
                endpoints.deviceRequests.createAsyncRequest(
                    deviceId,
                    asyncId,
                    {
                        method: "POST",
                        uri: resourcePath,
                        "content-type": mimeType,
                        accept: accepts,
                        "payload-b64": encodeBase64(payload),
                    },
                    handleError
                );
            }
        },
        null,
        callback,
        false,
        timeout
    );
};

export const getResource = (
    endpoints: Endpoints,
    deviceId: string,
    resourcePath: string,
    callback?: CallbackFn<Resource>
): Promise<Resource> => {
    resourcePath = normalizePath(resourcePath);

    return apiWrapper(
        resultsFn => {
            endpoints.endpoints.getEndpointResources(deviceId, resultsFn);
        },
        (data, done) => {
            const found = data.find(resource => {
                return normalizePath(resource.uri) === resourcePath;
            });

            if (!found) {
                return done(new SDKError("Resource not found"), null);
            }

            done(null, ResourceAdapter.map(found, deviceId));
        },
        callback
    );
};

const normalizePath = (path?: string): string => {
    if (path && path.charAt(0) === "/") {
        return path.substr(1);
    }

    return path;
};

const reverseNormalizePath = (path?: string): string => {
    if (path && path.charAt(0) !== "/") {
        return `/${path}`;
    }

    return path;
};
