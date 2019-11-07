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
var __1 = require("../..");
var __2 = require("../../../");
var functions_1 = require("../../common/functions");
var deviceEventAdapter_1 = require("../models/deviceEventAdapter");
var types_1 = require("../types");
exports.notify = function (connect, subscribe, notifyFns, asyncFns, data) {
    // Data can be null
    if (!data) {
        return;
    }
    subscribe.notifyAllNotifications(data);
    if (data["async-responses"]) {
        data["async-responses"].forEach(function (response) {
            var asyncID = response.id;
            var _a = asyncFns[asyncID] || {}, fn = _a.fn, tlvParser = _a.tlvParser, _b = _a.resource, resource = _b === void 0 ? {} : _b;
            if (fn) {
                if (response.status >= 400) {
                    var message = types_1.AsyncResponseStatus[response.status || 400];
                    var error = new __1.SDKError(message, null, response.error, response.status);
                    fn(error, null);
                }
                else {
                    var body = response.payload
                        ? functions_1.parseResourceValue({
                            payload: response.payload,
                            resource: __assign(__assign({}, resource), { contentType: response.ct }),
                            tlvParser: tlvParser,
                        })
                        : null;
                    fn(null, body);
                }
                delete asyncFns[asyncID];
            }
        });
    }
    if (data.notifications) {
        data.notifications.forEach(function (notification) {
            var body = notification.payload
                ? functions_1.parseResourceValue({
                    payload: notification.payload,
                    resource: { contentType: notification.ct },
                }).toString()
                : null;
            var path = "" + notification.ep + notification.path;
            var fn = (notifyFns[path] || {}).fn;
            if (fn) {
                fn(null, body);
            }
            connect.emit(types_1.ConnectEvents.EVENT_NOTIFICATION, {
                id: notification.ep,
                path: notification.path,
                payload: body,
            });
            subscribe.notifyResourceValues({
                deviceId: notification.ep,
                path: notification.path,
                payload: body,
                maxAge: notification["max-age"],
                contentType: notification.ct,
            });
        });
    }
    if (data.registrations) {
        data.registrations.forEach(function (device) {
            var map = deviceEventAdapter_1.DeviceEventAdapter.map(device, "registration");
            subscribe.notifyDeviceEvents(map);
            connect.emit(types_1.ConnectEvents.EVENT_REGISTRATION, map);
        });
    }
    if (data["reg-updates"]) {
        data["reg-updates"].forEach(function (device) {
            var map = deviceEventAdapter_1.DeviceEventAdapter.map(device, "reregistration");
            subscribe.notifyDeviceEvents(map);
            connect.emit(types_1.ConnectEvents.EVENT_REREGISTRATION, map);
        });
    }
    if (data["de-registrations"]) {
        data["de-registrations"].forEach(function (deviceId) {
            var map = deviceEventAdapter_1.DeviceEventAdapter.mapId(deviceId, "deregistration");
            subscribe.notifyDeviceEvents(map);
            connect.emit(types_1.ConnectEvents.EVENT_DEREGISTRATION, deviceId);
        });
    }
    if (data["registrations-expired"]) {
        data["registrations-expired"].forEach(function (deviceId) {
            var map = deviceEventAdapter_1.DeviceEventAdapter.mapId(deviceId, "expired");
            subscribe.notifyDeviceEvents(map);
            connect.emit(types_1.ConnectEvents.EVENT_EXPIRED, deviceId);
        });
    }
};
exports.startNotifications = function (connect, pollRequest, endpoints, log, deliveryMethod, subscribe, notifyFns, asyncFns, options, callback) {
    options = options || {};
    if (typeof options === "function") {
        callback = options;
        options = {};
    }
    if (!deliveryMethod) {
        deliveryMethod = "CLIENT_INITIATED";
    }
    return functions_1.asyncStyle(function (done) { return __awaiter(void 0, void 0, void 0, function () {
        function start() {
            poll();
            done(null, null);
        }
        var interval, requestCallback, serverErrorCount, networkErrorCount, poll;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // cannot call start notifications if using webhooks
                    if (deliveryMethod === "SERVER_INITIATED") {
                        return [2 /*return*/, done(new __1.SDKError("cannot call start notifications if delivery method is server initiated"), null)];
                    }
                    log.debug("starting notifications...");
                    // websocket has been initalised and opened
                    if (pollRequest) {
                        log.debug("notifications already started");
                        return [2 /*return*/, done(null, null)];
                    }
                    if (!connect.forceClear) return [3 /*break*/, 2];
                    return [4 /*yield*/, forceClearWebhook(connect, log)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, connect.getWebhook()];
                case 3:
                    if (_a.sent()) {
                        return [2 /*return*/, done(new __1.SDKError("cannot call start notifications as a webhook already exists"), null)];
                    }
                    _a.label = 4;
                case 4:
                    pollRequest = true;
                    interval = options.interval, requestCallback = options.requestCallback;
                    serverErrorCount = 0;
                    networkErrorCount = 0;
                    poll = function () {
                        pollRequest = endpoints.notifications.longPollNotifications(function (error, data) {
                            // If there is an error here it might be a connectivity error (for example ERR_NETWORK_CHANGED
                            // may happen when switching between different networks, say between 4G and WiFi). We cannot
                            // determine (in a portable way) the exact error then we retry a few times for all of them.
                            if (error) {
                                ++networkErrorCount;
                                if (networkErrorCount <= __2.ConnectApi.MAXIMUM_NUMBER_OF_RETRIES) {
                                    setTimeout(poll, __2.ConnectApi.DELAY_BETWEEN_RETRIES);
                                }
                                return;
                            }
                            // Check for server errors, 4xx errors raise an exception (see notify()) but we want to give
                            // a chance to 5xx errors because they might be caused by a temporary condition. Note that
                            // delay is "progressive", T for the first attempt, 2T for the second and so on.
                            if (data["async-responses"]) {
                                var errors = data["async-responses"].filter(function (response) { return response.status >= 400; });
                                var onlyServerErrors = errors.every(function (response) { return response.status >= 500; });
                                if (errors.length > 0 && onlyServerErrors) {
                                    ++serverErrorCount;
                                    if (serverErrorCount <= __2.ConnectApi.MAXIMUM_NUMBER_OF_RETRIES) {
                                        setTimeout(poll, __2.ConnectApi.DELAY_BETWEEN_RETRIES * serverErrorCount);
                                        return;
                                    }
                                }
                                // We already reached the maximum number of retries or it's a 4xx error, notify()
                                // will throw the appropriate exception.
                            }
                            exports.notify(connect, subscribe, notifyFns, asyncFns, data);
                            if (requestCallback && data["async-responses"]) {
                                requestCallback(error, data["async-responses"]);
                            }
                            // Each successful request resets these counters. TODO: we may want to keep track of them to stop trying
                            // if they occurr to often but decision is arbitrary, we may expose an ErrorHandler object (which will also
                            // include all the relevant stats) to let the caller decide what to do.
                            serverErrorCount = 0;
                            networkErrorCount = 0;
                            setTimeout(poll, interval || 500);
                        });
                    };
                    start();
                    return [2 /*return*/];
            }
        });
    }); }, callback);
};
exports.stopNotifications = function (endpoints, pollRequest, log, deliveryMethod, callback) {
    return functions_1.asyncStyle(function (done) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // cannot call stop notifications if using webhooks
            if (deliveryMethod === "SERVER_INITIATED") {
                log.warn("should not call stop notifications if delivery method is server initiated");
                return [2 /*return*/, done(null, null)];
            }
            log.debug("stopping notifications...");
            // websocket is null or has been closed
            if (pollRequest) {
                log.debug("nothing to stop");
                return [2 /*return*/, done(null, null)];
            }
            endpoints.notifications.deleteLongPollChannel(function () {
                if (pollRequest) {
                    // tslint:disable-next-line: no-string-literal
                    if (pollRequest["abort"]) {
                        // tslint:disable-next-line: no-string-literal
                        pollRequest["abort"]();
                    }
                    pollRequest = null;
                }
                done(null, null);
            });
            return [2 /*return*/];
        });
    }); }, callback);
};
var forceClearWebhook = function (connect, log) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                log.warn("deleting any existing webhook connection");
                return [4 /*yield*/, connect.deleteWebhook()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=notifications.js.map