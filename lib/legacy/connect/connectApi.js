"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var __1 = require("../..");
var logger_1 = require("../../common/logger");
var subscribe_1 = require("../../primary/subscribe/subscribe");
var functions_1 = require("../common/functions");
var idGenerator_1 = require("../common/idGenerator");
var deviceDirectoryApi_1 = require("../deviceDirectory/deviceDirectoryApi");
var actions_1 = require("./actions");
var actions_2 = require("./actions");
var actions_3 = require("./actions");
var actions_4 = require("./actions");
var actions_5 = require("./actions");
var actions_6 = require("./actions");
var metrics_1 = require("./actions/metrics");
var endpoints_1 = require("./endpoints");
/**
 * ## Connect API
 *
 * The API can be initalized with a .env file in the working directory with the following values
 *
 * MBED_CLOUD_SDK_API_KEY=<Pelion DM API Key>
 *
 * and optionally
 *
 * MBED_CLOUD_SDK_HOST=<your host> (defaults to https://api.us-east-1.mbedcloud.com)
 *
 * OR
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * ### Notification channels
 *
 * Some methods on connected device resources (e.g. `resource.getValue()`) and most events (e.g. `resource.on("notification")`) require a notification channel to be set up before they will work.
 *
 * There are two options for setting up a notification channel:
 *  * Use pull notifications by using `startNotifications()` (the default which starts automatically)
 *  * Register a callback server or _webhook_ using `updateWebhook()`
 *
 * The `webhook` and `pull-notifications` examples show how this can be done.
 */
var ConnectApi = /** @class */ (function (_super) {
    __extends(ConnectApi, _super);
    /**
     * @param options connection objects
     */
    function ConnectApi(options) {
        var _this = _super.call(this) || this;
        _this._asyncFns = {};
        _this._notifyFns = {};
        options = options || {};
        _this._config = new __1.Config(options);
        _this._instanceId = idGenerator_1.generateId();
        // this._connectOptions = options;
        _this._endpoints = new endpoints_1.Endpoints(options);
        _this._deviceDirectory = new deviceDirectoryApi_1.DeviceDirectoryApi(options);
        _this._log = logger_1.loggerFactory("connectApi" + _this._instanceId, options.logLevel).getLogger("ConnectApi");
        // this._restartCount = 0;
        // this._websockerUrl = `${options.host.replace("https", "wss")}/v2/notification/websocket-connect`;
        // make sure handle notifications keeps working
        if (options.handleNotifications) {
            options.autostartNotifications = false;
            _this._deliveryMethod = "SERVER_INITIATED";
        }
        // default force clear and autostart to false;
        _this.forceClear = options.forceClear === true;
        _this.autostartNotifications = options.autostartNotifications === true;
        if (_this.autostartNotifications === true) {
            _this._deliveryMethod = "CLIENT_INITIATED";
        }
        _this.subscribe = new subscribe_1.Subscribe(_this);
        return _this;
    }
    Object.defineProperty(ConnectApi.prototype, "deliveryMethod", {
        get: function () {
            return this._deliveryMethod;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectApi.prototype, "instanceId", {
        get: function () {
            return this._instanceId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Allows a notification to be injected into the notifications system
     *
     * @param data The notification data to inject
     */
    ConnectApi.prototype.notify = function (data) {
        actions_6.notify(this, this.subscribe, this._notifyFns, this._asyncFns, data);
    };
    ConnectApi.prototype.startNotifications = function (options, callback) {
        return actions_6.startNotifications(this, this._pollRequest, this._endpoints, this._log, this._deliveryMethod, this.subscribe, this._notifyFns, this._asyncFns, options, callback);
    };
    ConnectApi.prototype.stopNotifications = function (callback) {
        return actions_6.stopNotifications(this._endpoints, this._pollRequest, this._log, this._deliveryMethod, callback);
    };
    ConnectApi.prototype.getWebhook = function (callback) {
        return actions_1.getWebhook(this._config, this._endpoints, callback);
    };
    ConnectApi.prototype.updateWebhook = function (url, headers, forceClear, callback) {
        return actions_1.updateWebhook(this, this._endpoints, this._deliveryMethod, this.forceClear, url, headers, forceClear, callback);
    };
    ConnectApi.prototype.deleteWebhook = function (callback) {
        return actions_1.deleteWebhook(this._endpoints, callback);
    };
    ConnectApi.prototype.listPresubscriptions = function (callback) {
        return actions_4.listPresubscriptions(this._endpoints, callback);
    };
    ConnectApi.prototype.updatePresubscriptions = function (subscriptions, callback) {
        return actions_4.updatePresubscriptions(this._endpoints, subscriptions, callback);
    };
    ConnectApi.prototype.deletePresubscriptions = function (callback) {
        return actions_4.deletePresubscriptions(this._endpoints, callback);
    };
    ConnectApi.prototype.deleteSubscriptions = function (callback) {
        return actions_2.deleteSubscriptions(this, callback);
    };
    ConnectApi.prototype.listConnectedDevices = function (options, callback) {
        return actions_3.listConnectedDevices(this, this._deviceDirectory, options, callback);
    };
    ConnectApi.prototype.listDeviceSubscriptions = function (deviceId, callback) {
        return actions_2.listDeviceSubscriptions(this._endpoints, deviceId, callback);
    };
    ConnectApi.prototype.deleteDeviceSubscriptions = function (deviceId, callback) {
        return actions_2.deleteDeviceSubscriptions(this._endpoints, this._notifyFns, deviceId, callback);
    };
    ConnectApi.prototype.listResources = function (deviceId, callback) {
        return actions_2.listResources(this._endpoints, deviceId, callback);
    };
    ConnectApi.prototype.getResource = function (deviceId, resourcePath, callback) {
        return actions_5.getResource(this._endpoints, deviceId, resourcePath, callback);
    };
    ConnectApi.prototype.getResourceValue = function (deviceId, resourcePath, timeout, mimeType, resource, tlvParser, callback) {
        return actions_5.getResourceValue({
            connect: this,
            endpoints: this._endpoints,
            asyncFns: this._asyncFns,
            forceClear: this.forceClear,
            autostartNotifications: this.autostartNotifications,
            deviceId: deviceId,
            resourcePath: resourcePath,
            timeout: timeout,
            mimeType: mimeType,
            resource: resource,
            tlvParser: tlvParser,
            callback: callback,
        });
    };
    ConnectApi.prototype.setResourceValue = function (deviceId, resourcePath, value, timeout, mimeType, callback) {
        return actions_5.setResourceValue(this, this._endpoints, this._asyncFns, this.forceClear, this.autostartNotifications, deviceId, resourcePath, value, timeout, mimeType, callback);
    };
    ConnectApi.prototype.executeResource = function (deviceId, resourcePath, payload, timeout, mimeType, accepts, callback) {
        return actions_5.executeResource(this, this._endpoints, this._asyncFns, this.forceClear, this.autostartNotifications, deviceId, resourcePath, payload, timeout, mimeType, accepts, callback);
    };
    ConnectApi.prototype.getResourceSubscription = function (deviceId, resourcePath, callback) {
        return actions_2.getResourceSubscription(this._endpoints, deviceId, resourcePath, callback);
    };
    ConnectApi.prototype.addResourceSubscription = function (deviceId, resourcePath, notifyFn, callback) {
        return actions_2.addResourceSubscription(this, this._endpoints, this._notifyFns, deviceId, resourcePath, notifyFn, callback);
    };
    ConnectApi.prototype.deleteResourceSubscription = function (deviceId, resourcePath, callback) {
        return actions_2.deleteResourceSubscription(this, this._endpoints, this._notifyFns, deviceId, resourcePath, callback);
    };
    ConnectApi.prototype.listMetrics = function (options, callback) {
        return metrics_1.listMetrics(this._endpoints, options, callback);
    };
    ConnectApi.prototype.getLastApiMetadata = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            done(null, _this._endpoints.getLastMeta());
        }, callback);
    };
    ConnectApi.ASYNC_KEY = "async-response-id";
    ConnectApi.DELAY_BETWEEN_RETRIES = 1000;
    ConnectApi.MAXIMUM_NUMBER_OF_RETRIES = 3;
    return ConnectApi;
}(events_1.EventEmitter));
exports.ConnectApi = ConnectApi;
//# sourceMappingURL=connectApi.js.map