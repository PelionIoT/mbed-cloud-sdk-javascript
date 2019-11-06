import { SDKError } from "../..";
import { ConnectApi } from "../../../";
import { apiWrapper, asyncStyle } from "../../common/functions";
import { CallbackFn } from "../../common/interfaces";
import { executeForAll } from "../../common/legacyPaginator";
import { Endpoints } from "../endpoints";
import { Resource } from "../models/resource";
import { ResourceAdapter } from "../models/resourceAdapter";
import { AsyncResponseItem } from "../types";

export const deleteSubscriptions = (connect: ConnectApi, callback?: CallbackFn<void>): Promise<void> => {
    return asyncStyle(done => {
        executeForAll(connect.listConnectedDevices.bind(this), connect.deleteDeviceSubscriptions.bind(this)).then(
            () => done(null),
            done
        );
    }, callback);
};

export const listDeviceSubscriptions = (
    endpoints: Endpoints,
    deviceId: string,
    callback?: CallbackFn<string>
): Promise<string> => {
    return apiWrapper(
        resultsFn => {
            endpoints.subscriptions.getEndpointSubscriptions(deviceId, resultsFn);
        },
        (data, done) => {
            done(null, data);
        },
        callback
    );
};

export const getResourceSubscription = (
    endpoints: Endpoints,
    deviceId: string,
    resourcePath: string,
    callback?: CallbackFn<boolean>
): Promise<boolean> => {
    resourcePath = normalizePath(resourcePath);

    return asyncStyle(done => {
        endpoints.subscriptions.checkResourceSubscription(deviceId, resourcePath, error => {
            return done(null, !error);
        });
    }, callback);
};

export const addResourceSubscription = (
    connect: ConnectApi,
    endpoints: Endpoints,
    notifyFns: { [key: string]: AsyncResponseItem },
    deviceId: string,
    resourcePath: string,
    notifyFn?: (error: SDKError, data: any) => any,
    callback?: CallbackFn<void>
): Promise<void> => {
    resourcePath = normalizePath(resourcePath);

    return apiWrapper(
        resultsFn => {
            connect.startNotifications(null, error => {
                if (error) {
                    return resultsFn(error, null);
                }
                endpoints.subscriptions.addResourceSubscription(deviceId, resourcePath, resultsFn);
            });
        },
        (data, done) => {
            if (notifyFn) {
                // Record the function at this path for notifications
                notifyFns[`${deviceId}/${resourcePath}`] = { fn: notifyFn };
            }
            handleAsync(data, done);
        },
        callback
    );
};

export const deleteResourceSubscription = (
    connect: ConnectApi,
    endpoints: Endpoints,
    notifyFns: { [key: string]: AsyncResponseItem },
    deviceId: string,
    resourcePath: string,
    callback?: CallbackFn<void>
): Promise<void> => {
    resourcePath = normalizePath(resourcePath);

    return apiWrapper(
        resultsFn => {
            connect.startNotifications(null, error => {
                if (error) {
                    return resultsFn(error, null);
                }
                endpoints.subscriptions.deleteResourceSubscription(deviceId, resourcePath, resultsFn);
            });
        },
        (_data, done) => {
            // no-one is listening :'(
            delete notifyFns[`${deviceId}/${resourcePath}`];
            done(null, null);
        },
        callback
    );
};

export const deleteDeviceSubscriptions = (
    endpoints: Endpoints,
    notifyFns: { [key: string]: AsyncResponseItem },
    deviceId: string,
    callback?: CallbackFn<void>
): Promise<void> => {
    return apiWrapper(
        resultsFn => {
            endpoints.subscriptions.deleteEndpointSubscriptions(deviceId, resultsFn);
        },
        (data, done) => {
            Object.keys(notifyFns).forEach(key => {
                if (key.indexOf(`${deviceId}/`) === 0) {
                    delete notifyFns[key];
                }
            });

            done(null, data);
        },
        callback
    );
};

export const listResources = (
    endpoints: Endpoints,
    deviceId: string,
    callback?: CallbackFn<Array<Resource>>
): Promise<Array<Resource>> => {
    return apiWrapper(
        resultsFn => {
            endpoints.endpoints.getEndpointResources(deviceId, resultsFn);
        },
        (data, done) => {
            const resources = data.map(resource => {
                return ResourceAdapter.map(resource, deviceId);
            });

            done(null, resources);
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

function handleAsync<T>(data: any, done: (error: SDKError, result: T) => void): void {
    if (data && data[ConnectApi.ASYNC_KEY]) {
        this._asyncFns[data[ConnectApi.ASYNC_KEY]] = done;
        return;
    }

    // Cached value may be returned
    done(null, data);
}
