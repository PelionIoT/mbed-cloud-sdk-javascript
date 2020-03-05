"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../../../");
var functions_1 = require("../../common/functions");
var legacyPaginator_1 = require("../../common/legacyPaginator");
var resourceAdapter_1 = require("../models/resourceAdapter");
exports.deleteSubscriptions = function (connect, callback) {
    return functions_1.asyncStyle(function (done) {
        legacyPaginator_1.executeForAll(connect.listConnectedDevices.bind(_this), connect.deleteDeviceSubscriptions.bind(_this)).then(function () { return done(null); }, done);
    }, callback);
};
exports.listDeviceSubscriptions = function (endpoints, deviceId, callback) {
    return functions_1.apiWrapper(function (resultsFn) {
        endpoints.subscriptions.getEndpointSubscriptions(deviceId, resultsFn);
    }, function (data, done) {
        done(null, data);
    }, callback);
};
exports.getResourceSubscription = function (endpoints, deviceId, resourcePath, callback) {
    resourcePath = normalizePath(resourcePath);
    return functions_1.asyncStyle(function (done) {
        endpoints.subscriptions.checkResourceSubscription(deviceId, resourcePath, function (error) {
            return done(null, !error);
        });
    }, callback);
};
exports.addResourceSubscription = function (connect, endpoints, notifyFns, deviceId, resourcePath, notifyFn, callback) {
    resourcePath = normalizePath(resourcePath);
    return functions_1.apiWrapper(function (resultsFn) {
        connect.startNotifications(null, function (error) {
            if (error) {
                return resultsFn(error, null);
            }
            endpoints.subscriptions.addResourceSubscription(deviceId, resourcePath, resultsFn);
        });
    }, function (data, done) {
        if (notifyFn) {
            // Record the function at this path for notifications
            notifyFns[deviceId + "/" + resourcePath] = { fn: notifyFn };
        }
        handleAsync(data, done);
    }, callback);
};
exports.deleteResourceSubscription = function (connect, endpoints, notifyFns, deviceId, resourcePath, callback) {
    resourcePath = normalizePath(resourcePath);
    return functions_1.apiWrapper(function (resultsFn) {
        connect.startNotifications(null, function (error) {
            if (error) {
                return resultsFn(error, null);
            }
            endpoints.subscriptions.deleteResourceSubscription(deviceId, resourcePath, resultsFn);
        });
    }, function (_data, done) {
        // no-one is listening :'(
        delete notifyFns[deviceId + "/" + resourcePath];
        done(null, null);
    }, callback);
};
exports.deleteDeviceSubscriptions = function (endpoints, notifyFns, deviceId, callback) {
    return functions_1.apiWrapper(function (resultsFn) {
        endpoints.subscriptions.deleteEndpointSubscriptions(deviceId, resultsFn);
    }, function (data, done) {
        Object.keys(notifyFns).forEach(function (key) {
            if (key.startsWith(deviceId + "/")) {
                delete notifyFns[key];
            }
        });
        done(null, data);
    }, callback);
};
exports.listResources = function (endpoints, deviceId, callback) {
    return functions_1.apiWrapper(function (resultsFn) {
        endpoints.endpoints.getEndpointResources(deviceId, resultsFn);
    }, function (data, done) {
        var resources = data.map(function (resource) {
            return resourceAdapter_1.ResourceAdapter.map(resource, deviceId);
        });
        done(null, resources);
    }, callback);
};
var normalizePath = function (path) {
    if (path && path.startsWith("/")) {
        return path.substr(1);
    }
    return path;
};
function handleAsync(data, done) {
    if (data && data[__1.ConnectApi.ASYNC_KEY]) {
        this._asyncFns[data[__1.ConnectApi.ASYNC_KEY]] = done;
        return;
    }
    // Cached value may be returned
    done(null, data);
}
//# sourceMappingURL=subscriptions.js.map