import { ConnectApi } from "../../../";
import { apiWrapper, asyncStyle } from "../../common/functions";
import { executeForAll } from "../../common/legacyPaginator";
import { ResourceAdapter } from "../models/resourceAdapter";
export const deleteSubscriptions = (connect, callback) => {
    return asyncStyle(done => {
        executeForAll(connect.listConnectedDevices.bind(this), connect.deleteDeviceSubscriptions.bind(this)).then(() => done(null), done);
    }, callback);
};
export const listDeviceSubscriptions = (endpoints, deviceId, callback) => {
    return apiWrapper(resultsFn => {
        endpoints.subscriptions.getEndpointSubscriptions(deviceId, resultsFn);
    }, (data, done) => {
        done(null, data);
    }, callback);
};
export const getResourceSubscription = (endpoints, deviceId, resourcePath, callback) => {
    resourcePath = normalizePath(resourcePath);
    return asyncStyle(done => {
        endpoints.subscriptions.checkResourceSubscription(deviceId, resourcePath, error => {
            return done(null, !error);
        });
    }, callback);
};
export const addResourceSubscription = (connect, endpoints, notifyFns, deviceId, resourcePath, notifyFn, callback) => {
    resourcePath = normalizePath(resourcePath);
    return apiWrapper(resultsFn => {
        connect.startNotifications(null, error => {
            if (error) {
                return resultsFn(error, null);
            }
            endpoints.subscriptions.addResourceSubscription(deviceId, resourcePath, resultsFn);
        });
    }, (data, done) => {
        if (notifyFn) {
            // Record the function at this path for notifications
            notifyFns[`${deviceId}/${resourcePath}`] = { fn: notifyFn };
        }
        handleAsync(data, done);
    }, callback);
};
export const deleteResourceSubscription = (connect, endpoints, notifyFns, deviceId, resourcePath, callback) => {
    resourcePath = normalizePath(resourcePath);
    return apiWrapper(resultsFn => {
        connect.startNotifications(null, error => {
            if (error) {
                return resultsFn(error, null);
            }
            endpoints.subscriptions.deleteResourceSubscription(deviceId, resourcePath, resultsFn);
        });
    }, (_data, done) => {
        // no-one is listening :'(
        delete notifyFns[`${deviceId}/${resourcePath}`];
        done(null, null);
    }, callback);
};
export const deleteDeviceSubscriptions = (endpoints, notifyFns, deviceId, callback) => {
    return apiWrapper(resultsFn => {
        endpoints.subscriptions.deleteEndpointSubscriptions(deviceId, resultsFn);
    }, (data, done) => {
        Object.keys(notifyFns).forEach(key => {
            if (key.indexOf(`${deviceId}/`) === 0) {
                delete notifyFns[key];
            }
        });
        done(null, data);
    }, callback);
};
export const listResources = (endpoints, deviceId, callback) => {
    return apiWrapper(resultsFn => {
        endpoints.endpoints.getEndpointResources(deviceId, resultsFn);
    }, (data, done) => {
        const resources = data.map(resource => {
            return ResourceAdapter.map(resource, deviceId);
        });
        done(null, resources);
    }, callback);
};
const normalizePath = (path) => {
    if (path && path.charAt(0) === "/") {
        return path.substr(1);
    }
    return path;
};
function handleAsync(data, done) {
    if (data && data[ConnectApi.ASYNC_KEY]) {
        this._asyncFns[data[ConnectApi.ASYNC_KEY]] = done;
        return;
    }
    // Cached value may be returned
    done(null, data);
}
//# sourceMappingURL=subscriptions.js.map