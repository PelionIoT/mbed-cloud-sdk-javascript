import { EventEmitter } from "events";
import { Config } from "../..";
import { loggerFactory } from "../../common/logger";
import { Subscribe } from "../../primary/subscribe/subscribe";
import { asyncStyle } from "../common/functions";
import { generateId } from "../common/idGenerator";
import { DeviceDirectoryApi } from "../deviceDirectory/deviceDirectoryApi";
import { deleteWebhook, getWebhook, updateWebhook } from "./actions";
import { addResourceSubscription, deleteDeviceSubscriptions, deleteResourceSubscription, deleteSubscriptions, getResourceSubscription, listDeviceSubscriptions, listResources, } from "./actions";
import { listConnectedDevices } from "./actions";
import { deletePresubscriptions, listPresubscriptions, updatePresubscriptions } from "./actions";
import { executeResource, getResource, getResourceValue, setResourceValue } from "./actions";
import { notify, startNotifications, stopNotifications } from "./actions";
import { listMetrics } from "./actions/metrics";
import { Endpoints } from "./endpoints";
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
export class ConnectApi extends EventEmitter {
    /**
     * @param options connection objects
     */
    constructor(options) {
        super();
        this._asyncFns = {};
        this._notifyFns = {};
        options = options || {};
        this._config = new Config(options);
        this._instanceId = generateId();
        // this._connectOptions = options;
        this._endpoints = new Endpoints(options);
        this._deviceDirectory = new DeviceDirectoryApi(options);
        this._log = loggerFactory(`connectApi${this._instanceId}`, options.logLevel).getLogger("ConnectApi");
        // this._restartCount = 0;
        // this._websockerUrl = `${options.host.replace("https", "wss")}/v2/notification/websocket-connect`;
        // make sure handle notifications keeps working
        if (options.handleNotifications) {
            options.autostartNotifications = false;
            this._deliveryMethod = "SERVER_INITIATED";
        }
        // default force clear and autostart to false;
        this.forceClear = options.forceClear === true;
        this.autostartNotifications = options.autostartNotifications === true;
        if (this.autostartNotifications === true) {
            this._deliveryMethod = "CLIENT_INITIATED";
        }
        this.subscribe = new Subscribe(this);
    }
    get deliveryMethod() {
        return this._deliveryMethod;
    }
    get instanceId() {
        return this._instanceId;
    }
    /**
     * Allows a notification to be injected into the notifications system
     *
     * @param data The notification data to inject
     */
    notify(data) {
        notify(this, this.subscribe, this._notifyFns, this._asyncFns, data);
    }
    startNotifications(options, callback) {
        return startNotifications(this, this._pollRequest, this._endpoints, this._log, this._deliveryMethod, this.subscribe, this._notifyFns, this._asyncFns, options, callback);
    }
    stopNotifications(callback) {
        return stopNotifications(this._endpoints, this._pollRequest, this._log, this._deliveryMethod, callback);
    }
    getWebhook(callback) {
        return getWebhook(this._config, this._endpoints, callback);
    }
    updateWebhook(url, headers, forceClear, callback) {
        return updateWebhook(this, this._endpoints, this._deliveryMethod, this.forceClear, url, headers, forceClear, callback);
    }
    deleteWebhook(callback) {
        return deleteWebhook(this._endpoints, callback);
    }
    listPresubscriptions(callback) {
        return listPresubscriptions(this._endpoints, callback);
    }
    updatePresubscriptions(subscriptions, callback) {
        return updatePresubscriptions(this._endpoints, subscriptions, callback);
    }
    deletePresubscriptions(callback) {
        return deletePresubscriptions(this._endpoints, callback);
    }
    deleteSubscriptions(callback) {
        return deleteSubscriptions(this, callback);
    }
    listConnectedDevices(options, callback) {
        return listConnectedDevices(this, this._deviceDirectory, options, callback);
    }
    listDeviceSubscriptions(deviceId, callback) {
        return listDeviceSubscriptions(this._endpoints, deviceId, callback);
    }
    deleteDeviceSubscriptions(deviceId, callback) {
        return deleteDeviceSubscriptions(this._endpoints, this._notifyFns, deviceId, callback);
    }
    listResources(deviceId, callback) {
        return listResources(this._endpoints, deviceId, callback);
    }
    getResource(deviceId, resourcePath, callback) {
        return getResource(this._endpoints, deviceId, resourcePath, callback);
    }
    getResourceValue(deviceId, resourcePath, timeout, mimeType, resource, tlvParser, callback) {
        return getResourceValue({
            connect: this,
            endpoints: this._endpoints,
            asyncFns: this._asyncFns,
            forceClear: this.forceClear,
            autostartNotifications: this.autostartNotifications,
            deviceId,
            resourcePath,
            timeout,
            mimeType,
            resource,
            tlvParser,
            callback,
        });
    }
    setResourceValue(deviceId, resourcePath, value, timeout, mimeType, callback) {
        return setResourceValue(this, this._endpoints, this._asyncFns, this.forceClear, this.autostartNotifications, deviceId, resourcePath, value, timeout, mimeType, callback);
    }
    executeResource(deviceId, resourcePath, payload, timeout, mimeType, accepts, callback) {
        return executeResource(this, this._endpoints, this._asyncFns, this.forceClear, this.autostartNotifications, deviceId, resourcePath, payload, timeout, mimeType, accepts, callback);
    }
    getResourceSubscription(deviceId, resourcePath, callback) {
        return getResourceSubscription(this._endpoints, deviceId, resourcePath, callback);
    }
    addResourceSubscription(deviceId, resourcePath, notifyFn, callback) {
        return addResourceSubscription(this, this._endpoints, this._notifyFns, deviceId, resourcePath, notifyFn, callback);
    }
    deleteResourceSubscription(deviceId, resourcePath, callback) {
        return deleteResourceSubscription(this, this._endpoints, this._notifyFns, deviceId, resourcePath, callback);
    }
    listMetrics(options, callback) {
        return listMetrics(this._endpoints, options, callback);
    }
    getLastApiMetadata(callback) {
        return asyncStyle(done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
ConnectApi.ASYNC_KEY = "async-response-id";
ConnectApi.DELAY_BETWEEN_RETRIES = 1000;
ConnectApi.MAXIMUM_NUMBER_OF_RETRIES = 3;
//# sourceMappingURL=connectApi.js.map