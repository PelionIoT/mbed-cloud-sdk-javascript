"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../../../");
var functions_1 = require("../../common/functions");
var idGenerator_1 = require("../../common/idGenerator");
var resourceAdapter_1 = require("../models/resourceAdapter");
exports.getResourceValue = function (_a) {
    var connect = _a.connect, endpoints = _a.endpoints, asyncFns = _a.asyncFns, forceClear = _a.forceClear, autostartNotifications = _a.autostartNotifications, deviceId = _a.deviceId, resourcePath = _a.resourcePath, timeout = _a.timeout, mimeType = _a.mimeType, resource = _a.resource, tlvParser = _a.tlvParser, callback = _a.callback;
    resourcePath = reverseNormalizePath(resourcePath);
    var asyncId = idGenerator_1.generateId();
    return functions_1.apiWrapper(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    function (resultsFn) { return __awaiter(void 0, void 0, void 0, function () {
        var handleError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connect.getWebhook()];
                case 1:
                    if ((_a.sent()) && forceClear) {
                        return [2 /*return*/, resultsFn(new __1.SDKError("webhook in use"), null)];
                    }
                    asyncFns[asyncId] = { fn: resultsFn, resource: __assign(__assign({}, resource), { deviceId: deviceId, path: resourcePath }), tlvParser: tlvParser };
                    if (callback) {
                        setTimeout(function () {
                            if (asyncFns[asyncId]) {
                                resultsFn(new __1.SDKError("Timeout getting async value. Timeout " + timeout + "ms"), null);
                                delete asyncFns[asyncId];
                            }
                        }, timeout);
                    }
                    handleError = function (error) {
                        if (error) {
                            delete asyncFns[asyncId];
                            resultsFn(error, null);
                        }
                    };
                    if (autostartNotifications) {
                        connect.startNotifications(null, function (error) {
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
                    return [2 /*return*/];
            }
        });
    }); }, null, callback, false, timeout);
};
exports.setResourceValue = function (connect, endpoints, asyncFns, forceClear, autostartNotifications, deviceId, resourcePath, value, timeout, mimeType, callback) {
    if (typeof timeout === "function") {
        callback = timeout;
        timeout = null;
    }
    if (typeof mimeType === "function") {
        callback = mimeType;
        mimeType = null;
    }
    resourcePath = reverseNormalizePath(resourcePath);
    var asyncId = idGenerator_1.generateId();
    var payload = functions_1.encodeBase64(value);
    return functions_1.apiWrapper(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    function (resultsFn) { return __awaiter(void 0, void 0, void 0, function () {
        var handleError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connect.getWebhook()];
                case 1:
                    if ((_a.sent()) && !forceClear) {
                        return [2 /*return*/, resultsFn(new __1.SDKError("webhook in use"), null)];
                    }
                    asyncFns[asyncId] = { fn: resultsFn };
                    if (callback) {
                        setTimeout(function () {
                            if (asyncFns[asyncId]) {
                                resultsFn(new __1.SDKError("Timeout getting async value. Timeout " + timeout + "ms"), null);
                                delete asyncFns[asyncId];
                            }
                        }, timeout);
                    }
                    handleError = function (error) {
                        if (error) {
                            delete asyncFns[asyncId];
                            return resultsFn(error, null);
                        }
                    };
                    if (autostartNotifications) {
                        connect.startNotifications(null, function (error) {
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
                    return [2 /*return*/];
            }
        });
    }); }, null, callback, false, timeout);
};
exports.executeResource = function (connect, endpoints, asyncFns, forceClear, autostartNotifications, deviceId, resourcePath, payload, timeout, mimeType, accepts, callback) {
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
    var asyncId = idGenerator_1.generateId();
    return functions_1.apiWrapper(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    function (resultsFn) { return __awaiter(void 0, void 0, void 0, function () {
        var handleError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connect.getWebhook()];
                case 1:
                    if ((_a.sent()) && !forceClear) {
                        return [2 /*return*/, resultsFn(new __1.SDKError("webhook in use"), null)];
                    }
                    asyncFns[asyncId] = { fn: resultsFn };
                    if (callback) {
                        setTimeout(function () {
                            if (asyncFns[asyncId]) {
                                resultsFn(new __1.SDKError("Timeout getting async value. Timeout " + timeout + "ms"), null);
                                delete asyncFns[asyncId];
                            }
                        }, timeout);
                    }
                    handleError = function (error) {
                        if (error) {
                            delete asyncFns[asyncId];
                            return resultsFn(error, null);
                        }
                    };
                    if (autostartNotifications) {
                        connect.startNotifications(null, function (error) {
                            if (error) {
                                return handleError(error);
                            }
                            endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                                method: "POST",
                                uri: resourcePath,
                                "content-type": mimeType,
                                accept: accepts,
                                "payload-b64": functions_1.encodeBase64(payload),
                            }, handleError);
                        });
                    }
                    else {
                        endpoints.deviceRequests.createAsyncRequest(deviceId, asyncId, {
                            method: "POST",
                            uri: resourcePath,
                            "content-type": mimeType,
                            accept: accepts,
                            "payload-b64": functions_1.encodeBase64(payload),
                        }, handleError);
                    }
                    return [2 /*return*/];
            }
        });
    }); }, null, callback, false, timeout);
};
exports.getResource = function (endpoints, deviceId, resourcePath, callback) {
    resourcePath = normalizePath(resourcePath);
    return functions_1.apiWrapper(function (resultsFn) {
        endpoints.endpoints.getEndpointResources(deviceId, resultsFn);
    }, function (data, done) {
        var found = data.find(function (resource) {
            return normalizePath(resource.uri) === resourcePath;
        });
        if (!found) {
            return done(new __1.SDKError("Resource not found"), null);
        }
        done(null, resourceAdapter_1.ResourceAdapter.map(found, deviceId));
    }, callback);
};
var normalizePath = function (path) {
    if (path && path.startsWith("/")) {
        return path.substr(1);
    }
    return path;
};
var reverseNormalizePath = function (path) {
    if (path && !path.startsWith("/")) {
        return "/" + path;
    }
    return path;
};
//# sourceMappingURL=resources.js.map