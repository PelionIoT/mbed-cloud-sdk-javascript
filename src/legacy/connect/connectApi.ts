import { EventEmitter } from "events";
import * as superagent from "superagent";
import { Logger } from "typescript-logging";
import { Config, SDKError } from "../..";
import { TlvParser } from "../../common";
import { loggerFactory } from "../../common/logger";
import { Subscribe } from "../../primary/subscribe/subscribe";
import { ApiMetadata } from "../common/apiMetadata";
import { asyncStyle } from "../common/functions";
import { generateId } from "../common/idGenerator";
import { CallbackFn } from "../common/interfaces";
import { ListResponse } from "../common/listResponse";
import { DeviceDirectoryApi } from "../deviceDirectory/deviceDirectoryApi";
import { DeviceListOptions } from "../deviceDirectory/types";
import { deleteWebhook, getWebhook, updateWebhook } from "./actions";
import {
    addResourceSubscription,
    deleteDeviceSubscriptions,
    deleteResourceSubscription,
    deleteSubscriptions,
    getResourceSubscription,
    listDeviceSubscriptions,
    listResources,
} from "./actions";
import { listConnectedDevices } from "./actions";
import { deletePresubscriptions, listPresubscriptions, updatePresubscriptions } from "./actions";
import { executeResource, getResource, getResourceValue, setResourceValue } from "./actions";
import { notify, startNotifications, stopNotifications } from "./actions";
import { listMetrics } from "./actions/metrics";
import { Endpoints } from "./endpoints";
import { ConnectedDevice } from "./models/connectedDevice";
import { Metric } from "./models/metric";
import { Resource } from "./models/resource";
import { ResourceValue } from "./models/resourceValue";
import { Webhook } from "./models/webhook";
import {
    AsyncResponse,
    AsyncResponseItem,
    ConnectOptions,
    DeliveryMethod,
    NotificationObject,
    NotificationOptions,
    PresubscriptionObject,
} from "./types";
import { MetricsPeriodListOptions, MetricsStartEndListOptions } from "./types";

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
    public static readonly ASYNC_KEY = "async-response-id";
    public static readonly DELAY_BETWEEN_RETRIES = 1000;
    public static readonly MAXIMUM_NUMBER_OF_RETRIES = 3;

    /**
     * Gives you access to the subscribe interface
     */
    public readonly subscribe: Subscribe;

    /**
     * Clear any existing channels before receiving notifications
     */
    public readonly forceClear: boolean;

    /**
     * Start receiving notifications on the client without calling start notifications
     */
    public readonly autostartNotifications?: boolean;

    /**
     * @deprecated webhook will work if updateWebhook is called or if startNotifications is not called
     */
    public readonly handleNotifications?: boolean;

    private _config: Config;
    private _pollRequest: superagent.SuperAgentRequest | boolean;
    // private readonly _websockerUrl: string = "";
    private _instanceId: string;
    private _deviceDirectory: DeviceDirectoryApi;
    private _endpoints: Endpoints;
    private _asyncFns: { [key: string]: AsyncResponseItem } = {};
    private _notifyFns: { [key: string]: AsyncResponseItem } = {};
    // private _connectOptions: ConnectOptions;
    // private _requestCallback: CallbackFn<Array<AsyncResponse>>;
    private _deliveryMethod?: DeliveryMethod;
    // private _isClosing: boolean;
    // private _restartCount: number;
    private _log: Logger;

    public get deliveryMethod(): DeliveryMethod {
        return this._deliveryMethod;
    }

    public get instanceId(): string {
        return this._instanceId;
    }

    /**
     * @param options connection objects
     */
    constructor(options?: ConnectOptions) {
        super();
        options = options || ({} as ConnectOptions);
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

    /**
     * Allows a notification to be injected into the notifications system
     *
     * @param data The notification data to inject
     */
    public notify(data: NotificationObject) {
        notify(this, this.subscribe, this._notifyFns, this._asyncFns, data);
    }

    /**
     * Begins pull notifications
     *
     * If an external callback is not setup (using update_webhook), then calling this function is mandatory.
     *
     * @param options notification options
     * @returns Promise containing any error
     */
    public startNotifications(options?: NotificationOptions): Promise<void>;
    /**
     * Begins pull notifications
     *
     * If an external callback is not setup (using update_webhook), then calling this function is mandatory.
     *
     * @param options notification options
     * @param callback A function that is passed any error
     */
    public startNotifications(options?: NotificationOptions, callback?: CallbackFn<void>): void;
    public startNotifications(options?: any, callback?: CallbackFn<void>): Promise<void> {
        return startNotifications(
            this,
            this._pollRequest,
            this._endpoints,
            this._log,
            this._deliveryMethod,
            this.subscribe,
            this._notifyFns,
            this._asyncFns,
            options,
            callback
        );
    }

    /**
     * Stops pull notifications
     *
     * @returns Promise containing any error
     */
    public stopNotifications(): Promise<void>;
    /**
     * Stops pull notifications
     *
     * @param callback A function that is passed any error
     */
    public stopNotifications(callback: CallbackFn<void>): void;
    public stopNotifications(callback?: CallbackFn<void>): Promise<void> {
        return stopNotifications(this._endpoints, this._pollRequest, this._log, this._deliveryMethod, callback);
    }

    /**
     * Get the current callback URL if it exists
     *
     * @returns Promise containing the webhook data
     */
    public getWebhook(): Promise<Webhook>;
    /**
     * Get the current callback URL if it exists
     *
     * @param callback A function that is passed the arguments (error, webhook)
     */
    public getWebhook(callback: CallbackFn<Webhook>): void;
    public getWebhook(callback?: CallbackFn<Webhook>): Promise<Webhook> {
        return getWebhook(this._config, this._endpoints, callback);
    }

    /**
     * Register new webhook for incoming subscriptions.
     *
     * If a webhook is already set, this will do an overwrite.
     *
     * @param url The URL to which the notifications must be sent
     * @param headers Any headers (key/value) that must be sent with the request
     * @param forceClear Whether to clear any existing notification channel
     * @returns Promise containing any error
     */
    public updateWebhook(url: string, headers?: { [key: string]: string }, forceClear?: boolean): Promise<void>;
    /**
     * Register new webhook for incoming subscriptions.
     *
     * If a webhook is already set, this will do an overwrite.
     *
     * @param url The URL to which the notifications must be sent
     * @param headers Any headers (key/value) that must be sent with the request
     * @param forceClear @deprecated please use force clear on initalisation instead
     * @param callback A function that is passed any error
     */
    public updateWebhook(
        url: string,
        headers?: { [key: string]: string },
        forceClear?: boolean,
        callback?: CallbackFn<void>
    ): void;
    public updateWebhook(url: string, headers?: any, forceClear?: any, callback?: CallbackFn<void>): Promise<void> {
        return updateWebhook(
            this,
            this._endpoints,
            this._deliveryMethod,
            this.forceClear,
            url,
            headers,
            forceClear,
            callback
        );
    }

    /**
     * Deletes the callback data
     *
     * If no webhook is registered, an exception (404) will be raised.
     *
     * Note that every registered subscription will be deleted as part of deregistering a webhook.
     *
     * @returns Promise containing any error
     */
    public deleteWebhook(): Promise<void>;
    /**
     * Deletes the callback data
     *
     * If no webhook is registered, an exception (404) will be raised.
     *
     * Note that every registered subscription will be deleted as part of deregistering a webhook.
     *
     * @param callback A function that is passed any error
     */
    public deleteWebhook(callback: CallbackFn<void>): void;
    public deleteWebhook(callback?: CallbackFn<void>): Promise<void> {
        return deleteWebhook(this._endpoints, callback);
    }

    /**
     * Gets a list of pre-subscription data
     *
     * @returns Promise containing pre-subscriptions
     */
    public listPresubscriptions(): Promise<Array<PresubscriptionObject>>;
    /**
     * Gets a list of pre-subscription data
     *
     * @param callback A function that is passed (error, pre-subscriptions)
     */
    public listPresubscriptions(callback: CallbackFn<Array<PresubscriptionObject>>): void;
    public listPresubscriptions(
        callback?: CallbackFn<Array<PresubscriptionObject>>
    ): Promise<Array<PresubscriptionObject>> {
        return listPresubscriptions(this._endpoints, callback);
    }

    /**
     * Update pre-subscription data
     *
     * @param subscriptions The pre-subscription data array. If you send an empty array, the pre-subscription data will be removed
     * @returns Promise containing any error
     */
    public updatePresubscriptions(subscriptions: Array<PresubscriptionObject>): Promise<void>;
    /**
     * Update pre-subscription data
     *
     * @param subscriptions The pre-subscription data array. If you send an empty array, the pre-subscription data will be removed
     * @param callback A function that is passed any error
     */
    public updatePresubscriptions(subscriptions: Array<PresubscriptionObject>, callback: CallbackFn<void>): void;
    public updatePresubscriptions(
        subscriptions: Array<PresubscriptionObject>,
        callback?: CallbackFn<void>
    ): Promise<void> {
        return updatePresubscriptions(this._endpoints, subscriptions, callback);
    }

    /**
     * Deletes pre-subscription data
     *
     * @returns Promise containing any error
     */
    public deletePresubscriptions(): Promise<void>;
    /**
     * Deletes pre-subscription data
     *
     * @param callback A function that is passed any error
     */
    public deletePresubscriptions(callback: CallbackFn<void>): void;
    public deletePresubscriptions(callback?: CallbackFn<void>): Promise<void> {
        return deletePresubscriptions(this._endpoints, callback);
    }

    /**
     * Removes all subscriptions for all devices.
     *
     * Warning: This could be slow for large numbers of connected devices.
     * If possible, explicitly delete subscriptions known to have been created.
     *
     * @returns Promise containing any error
     */
    public deleteSubscriptions(): Promise<void>;
    /**
     * Removes all subscriptions for all devices.
     *
     * Warning: This could be slow for large numbers of connected devices.
     * If possible, explicitly delete subscriptions known to have been created.
     *
     * @param callback A function that is passed any error
     */
    public deleteSubscriptions(callback: CallbackFn<void>): void;
    public deleteSubscriptions(callback?: CallbackFn<void>): Promise<void> {
        return deleteSubscriptions(this, callback);
    }

    /**
     * List connected devices
     *
     * @param options list options
     * @returns Promise of connected devices
     */
    public listConnectedDevices(options?: DeviceListOptions): Promise<ListResponse<ConnectedDevice>>;
    /**
     * List connected devices
     *
     * @param options list options
     * @param callback A function that is passed the arguments (error, devices)
     */
    public listConnectedDevices(
        options?: DeviceListOptions,
        callback?: CallbackFn<ListResponse<ConnectedDevice>>
    ): void;
    public listConnectedDevices(
        options?: any,
        callback?: CallbackFn<ListResponse<ConnectedDevice>>
    ): Promise<ListResponse<ConnectedDevice>> {
        return listConnectedDevices(this, this._deviceDirectory, options, callback);
    }

    /**
     * List a device's subscriptions
     *
     * @param deviceId Device ID
     * @returns Promise containing the subscriptions
     */
    public listDeviceSubscriptions(deviceId: string): Promise<string>;
    /**
     * List a device's subscriptions
     *
     * @param deviceId Device ID
     * @param callback A function that is passed (error, subscriptions)
     */
    public listDeviceSubscriptions(deviceId: string, callback: CallbackFn<string>): void;
    public listDeviceSubscriptions(deviceId: string, callback?: CallbackFn<string>): Promise<string> {
        return listDeviceSubscriptions(this._endpoints, deviceId, callback);
    }

    /**
     * Removes a device's subscriptions
     *
     * @param deviceId Device ID
     * @returns Promise containing any error
     */
    public deleteDeviceSubscriptions(deviceId: string): Promise<void>;
    /**
     * Removes a device's subscriptions
     *
     * @param deviceId Device ID
     * @param callback A function that is passed any error
     */
    public deleteDeviceSubscriptions(deviceId: string, callback: CallbackFn<void>): void;
    public deleteDeviceSubscriptions(deviceId: string, callback?: CallbackFn<void>): Promise<void> {
        return deleteDeviceSubscriptions(this._endpoints, this._notifyFns, deviceId, callback);
    }

    /**
     * List device's resources
     *
     * @param deviceId Device ID
     * @returns Promise of device resources
     */
    public listResources(deviceId: string): Promise<Array<Resource>>;
    /**
     * List device's resources
     *
     * @param deviceId Device ID
     * @param callback A function that is passed the arguments (error, resources)
     */
    public listResources(deviceId: string, callback: CallbackFn<Array<Resource>>): void;
    public listResources(deviceId: string, callback?: CallbackFn<Array<Resource>>): Promise<Array<Resource>> {
        return listResources(this._endpoints, deviceId, callback);
    }

    /**
     * Get a resource
     *
     * @param deviceId Device ID
     * @param resourcePath Path of the resource to get
     * @returns Promise of device resource
     */
    public getResource(deviceId: string, resourcePath: string): Promise<Resource>;
    /**
     * Get a resource
     *
     * @param deviceId Device ID
     * @param resourcePath Path of the resource to get
     * @param callback A function that is passed the arguments (error, resource)
     */
    public getResource(deviceId: string, resourcePath: string, callback?: CallbackFn<Resource>): void;
    public getResource(deviceId: string, resourcePath: string, callback?: CallbackFn<Resource>): Promise<Resource> {
        return getResource(this._endpoints, deviceId, resourcePath, callback);
    }

    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The requested mime type format of the value
     * @returns Promise of resource value
     */
    public getResourceValue(
        deviceId: string,
        resourcePath: string,
        timeout?: number,
        mimeType?: string,
        resource?: Resource,
        tlvParser?: TlvParser
    ): Promise<ResourceValue>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param mimeType The requested mime type format of the value
     * @param timeout async request will timeout after given number of milliseconds
     * @param callback A function that is passed the arguments (error, value)
     */
    public getResourceValue(
        deviceId: string,
        resourcePath: string,
        timeout?: number,
        mimeType?: string,
        resource?: Resource,
        tlvParser?: TlvParser,
        callback?: CallbackFn<ResourceValue>
    ): void;
    public getResourceValue(
        deviceId: string,
        resourcePath: string,
        timeout?: number,
        mimeType?: any,
        resource?: Resource,
        tlvParser?: TlvParser,
        callback?: CallbackFn<ResourceValue>
    ): Promise<ResourceValue> {
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

    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param value The value of the resource
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The mime type format of the value
     * @returns the AsyncResponse
     */
    public setResourceValue(
        deviceId: string,
        resourcePath: string,
        value: string | number,
        timeout?: number,
        mimeType?: string
    ): Promise<AsyncResponse>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param value The value of the resource
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The mime type format of the value
     * @param callback A function that is passed any error
     */
    public setResourceValue(
        deviceId: string,
        resourcePath: string,
        value: string | number,
        timeout?: number,
        mimeType?: string,
        callback?: CallbackFn<AsyncResponse>
    ): void;
    public setResourceValue(
        deviceId: string,
        resourcePath: string,
        value: string | number,
        timeout?: number,
        mimeType?: any,
        callback?: CallbackFn<AsyncResponse>
    ): Promise<AsyncResponse> {
        return setResourceValue(
            this,
            this._endpoints,
            this._asyncFns,
            this.forceClear,
            this.autostartNotifications,
            deviceId,
            resourcePath,
            value,
            timeout,
            mimeType,
            callback
        );
    }

    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param mimeType The mime type format of the value
     * @param payload The payload to be sent to the device.
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The content type of the payload
     * @param accepts The content type of an accepted response
     * @returns the AsyncResponse
     */
    public executeResource(
        deviceId: string,
        resourcePath: string,
        payload?: any,
        timeout?: number,
        mimeType?: string,
        accepts?: string
    ): Promise<AsyncResponse>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param mimeType The mime type format of the value
     * @param payload The payload to be sent to the device.
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The content type of the payload
     * @param accepts The content type of an accepted response
     * @param callback A function that is passed any error
     */
    public executeResource(
        deviceId: string,
        resourcePath: string,
        payload?: any,
        timeout?: number,
        mimeType?: string,
        accepts?: string,
        callback?: CallbackFn<AsyncResponse>
    ): void;
    public executeResource(
        deviceId: string,
        resourcePath: string,
        payload?: any,
        timeout?: number,
        mimeType?: any,
        accepts?: string,
        callback?: CallbackFn<AsyncResponse>
    ): Promise<AsyncResponse> {
        return executeResource(
            this,
            this._endpoints,
            this._asyncFns,
            this.forceClear,
            this.autostartNotifications,
            deviceId,
            resourcePath,
            payload,
            timeout,
            mimeType,
            accepts,
            callback
        );
    }

    /**
     * Gets the status of a resource's subscription
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @returns Promise containing resource subscription status
     */
    public getResourceSubscription(deviceId: string, resourcePath: string): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    public getResourceSubscription(deviceId: string, resourcePath: string, callback: CallbackFn<boolean>): void;
    public getResourceSubscription(
        deviceId: string,
        resourcePath: string,
        callback?: CallbackFn<boolean>
    ): Promise<boolean> {
        return getResourceSubscription(this._endpoints, deviceId, resourcePath, callback);
    }

    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param notifyFn Function to call with notification
     * @returns empty Promise
     */
    public addResourceSubscription(
        deviceId: string,
        resourcePath: string,
        notifyFn?: (error: SDKError, data: any) => any
    ): Promise<void>;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed any error
     */
    public addResourceSubscription(
        deviceId: string,
        resourcePath: string,
        notifyFn?: (error: SDKError, data: any) => any,
        callback?: CallbackFn<void>
    ): void;
    public addResourceSubscription(
        deviceId: string,
        resourcePath: string,
        notifyFn?: (error: SDKError, data: any) => any,
        callback?: CallbackFn<void>
    ): Promise<void> {
        return addResourceSubscription(
            this,
            this._endpoints,
            this._notifyFns,
            deviceId,
            resourcePath,
            notifyFn,
            callback
        );
    }

    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @returns empty Promise
     */
    public deleteResourceSubscription(deviceId: string, resourcePath: string): Promise<void>;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param callback A function that is passed any error
     */
    public deleteResourceSubscription(deviceId: string, resourcePath: string, callback: CallbackFn<void>): void;
    public deleteResourceSubscription(
        deviceId: string,
        resourcePath: string,
        callback?: CallbackFn<void>
    ): Promise<void> {
        return deleteResourceSubscription(this, this._endpoints, this._notifyFns, deviceId, resourcePath, callback);
    }

    /**
     * List metrics
     *
     * @param options metrics options
     * @returns Promise of metrics
     */
    public listMetrics(options: MetricsStartEndListOptions | MetricsPeriodListOptions): Promise<ListResponse<Metric>>;
    /**
     * List metrics
     *
     * @param options metrics options
     * @param callback A function that is passed the return arguments (error, metrics)
     */
    public listMetrics(
        options: MetricsStartEndListOptions | MetricsPeriodListOptions,
        callback: CallbackFn<ListResponse<Metric>>
    ): void;
    public listMetrics(
        options: MetricsStartEndListOptions | MetricsPeriodListOptions,
        callback?: CallbackFn<ListResponse<Metric>>
    ): Promise<ListResponse<Metric>> {
        return listMetrics(this._endpoints, options, callback);
    }

    /**
     * Get meta data for the last Pelion Device Management API call
     * @returns Promise of meta data
     */
    public getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the lastPelion Device Management API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    public getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
    public getLastApiMetadata(callback?: CallbackFn<ApiMetadata>): Promise<ApiMetadata> {
        return asyncStyle(done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
