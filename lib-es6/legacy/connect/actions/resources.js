var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SDKError } from "../../../";
import { apiWrapper, encodeBase64 } from "../../common/functions";
import { generateId } from "../../common/idGenerator";
import { ResourceAdapter } from "../models/resourceAdapter";
export const getResourceValue = ({ connect, endpoints, asyncFns, forceClear, autostartNotifications, deviceId, resourcePath, timeout, mimeType, resource, tlvParser, callback, }) => {
    resourcePath = reverseNormalizePath(resourcePath);
    const asyncId = generateId();
    return apiWrapper((resultsFn) => __awaiter(void 0, void 0, void 0, function* () {
        if ((yield connect.getWebhook()) && forceClear) {
            return resultsFn(new SDKError("webhook in use"), null);
        }
        asyncFns[asyncId] = { fn: resultsFn, resource: Object.assign(Object.assign({}, resource), { deviceId, path: resourcePath }), tlvParser };
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
                endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                    method: "GET",
                    uri: resourcePath,
                    accept: mimeType,
                }, handleError);
            });
        }
        else {
            endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                method: "GET",
                uri: resourcePath,
                accept: mimeType,
            }, handleError);
        }
    }), null, callback, false, timeout);
};
export const setResourceValue = (connect, endpoints, asyncFns, forceClear, autostartNotifications, deviceId, resourcePath, value, timeout, mimeType, callback) => {
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
    return apiWrapper((resultsFn) => __awaiter(void 0, void 0, void 0, function* () {
        if ((yield connect.getWebhook()) && !forceClear) {
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
                endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                    method: "PUT",
                    uri: resourcePath,
                    "content-type": mimeType,
                    "payload-b64": payload,
                }, handleError);
            });
        }
        else {
            endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                method: "PUT",
                uri: resourcePath,
                "content-type": mimeType,
                "payload-b64": payload,
            }, handleError);
        }
    }), null, callback, false, timeout);
};
export const executeResource = (connect, endpoints, asyncFns, forceClear, autostartNotifications, deviceId, resourcePath, payload, timeout, mimeType, accepts, callback) => {
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
    return apiWrapper((resultsFn) => __awaiter(void 0, void 0, void 0, function* () {
        if ((yield connect.getWebhook()) && !forceClear) {
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
                endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                    method: "POST",
                    uri: resourcePath,
                    "content-type": mimeType,
                    accept: accepts,
                    "payload-b64": encodeBase64(payload),
                }, handleError);
            });
        }
        else {
            endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                method: "POST",
                uri: resourcePath,
                "content-type": mimeType,
                accept: accepts,
                "payload-b64": encodeBase64(payload),
            }, handleError);
        }
    }), null, callback, false, timeout);
};
export const getResource = (endpoints, deviceId, resourcePath, callback) => {
    resourcePath = normalizePath(resourcePath);
    return apiWrapper(resultsFn => {
        endpoints.endpoints.getEndpointResources(deviceId, resultsFn);
    }, (data, done) => {
        const found = data.find(resource => {
            return normalizePath(resource.uri) === resourcePath;
        });
        if (!found) {
            return done(new SDKError("Resource not found"), null);
        }
        done(null, ResourceAdapter.map(found, deviceId));
    }, callback);
};
const normalizePath = (path) => {
    if (path && path.charAt(0) === "/") {
        return path.substr(1);
    }
    return path;
};
const reverseNormalizePath = (path) => {
    if (path && path.charAt(0) !== "/") {
        return `/${path}`;
    }
    return path;
};
//# sourceMappingURL=resources.js.map