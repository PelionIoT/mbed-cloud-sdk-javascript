/// <reference types="node" />
import { EventEmitter } from "events";
import { SDKError } from "../..";
import { TlvParser } from "../../common";
import { Subscribe } from "../../primary/subscribe/subscribe";
import { ApiMetadata } from "../common/apiMetadata";
import { CallbackFn } from "../common/interfaces";
import { ListResponse } from "../common/listResponse";
import { DeviceListOptions } from "../deviceDirectory/types";
import { ConnectedDevice } from "./models/connectedDevice";
import { Metric } from "./models/metric";
import { Resource } from "./models/resource";
import { ResourceValue } from "./models/resourceValue";
import { Webhook } from "./models/webhook";
import { AsyncResponse, ConnectOptions, DeliveryMethod, NotificationObject, NotificationOptions, PresubscriptionObject } from "./types";
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
export declare class ConnectApi extends EventEmitter {
    static readonly ASYNC_KEY = "async-response-id";
    static readonly DELAY_BETWEEN_RETRIES = 1000;
    static readonly MAXIMUM_NUMBER_OF_RETRIES = 3;
    /**
     * Gives you access to the subscribe interface
     */
    readonly subscribe: Subscribe;
    /**
     * Clear any existing channels before receiving notifications
     */
    readonly forceClear: boolean;
    /**
     * Start receiving notifications on the client without calling start notifications
     */
    readonly autostartNotifications?: boolean;
    /**
     * @deprecated webhook will work if updateWebhook is called or if startNotifications is not called
     */
    readonly handleNotifications?: boolean;
    private _config;
    private _pollRequest;
    private _instanceId;
    private _deviceDirectory;
    private _endpoints;
    private _asyncFns;
    private _notifyFns;
    private _deliveryMethod?;
    private _log;
    get deliveryMethod(): DeliveryMethod;
    get instanceId(): string;
    /**
     * @param options connection objects
     */
    constructor(options?: ConnectOptions);
    /**
     * Allows a notification to be injected into the notifications system
     *
     * @param data The notification data to inject
     */
    notify(data: NotificationObject): void;
    /**
     * Begins pull notifications
     *
     * If an external callback is not setup (using update_webhook), then calling this function is mandatory.
     *
     * @param options notification options
     * @returns Promise containing any error
     */
    startNotifications(options?: NotificationOptions): Promise<void>;
    /**
     * Begins pull notifications
     *
     * If an external callback is not setup (using update_webhook), then calling this function is mandatory.
     *
     * @param options notification options
     * @param callback A function that is passed any error
     */
    startNotifications(options?: NotificationOptions, callback?: CallbackFn<void>): void;
    /**
     * Stops pull notifications
     *
     * @returns Promise containing any error
     */
    stopNotifications(): Promise<void>;
    /**
     * Stops pull notifications
     *
     * @param callback A function that is passed any error
     */
    stopNotifications(callback: CallbackFn<void>): void;
    /**
     * Get the current callback URL if it exists
     *
     * @returns Promise containing the webhook data
     */
    getWebhook(): Promise<Webhook>;
    /**
     * Get the current callback URL if it exists
     *
     * @param callback A function that is passed the arguments (error, webhook)
     */
    getWebhook(callback: CallbackFn<Webhook>): void;
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
    updateWebhook(url: string, headers?: {
        [key: string]: string;
    }, forceClear?: boolean): Promise<void>;
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
    updateWebhook(url: string, headers?: {
        [key: string]: string;
    }, forceClear?: boolean, callback?: CallbackFn<void>): void;
    /**
     * Deletes the callback data
     *
     * If no webhook is registered, an exception (404) will be raised.
     *
     * Note that every registered subscription will be deleted as part of deregistering a webhook.
     *
     * @returns Promise containing any error
     */
    deleteWebhook(): Promise<void>;
    /**
     * Deletes the callback data
     *
     * If no webhook is registered, an exception (404) will be raised.
     *
     * Note that every registered subscription will be deleted as part of deregistering a webhook.
     *
     * @param callback A function that is passed any error
     */
    deleteWebhook(callback: CallbackFn<void>): void;
    /**
     * Gets a list of pre-subscription data
     *
     * @returns Promise containing pre-subscriptions
     */
    listPresubscriptions(): Promise<Array<PresubscriptionObject>>;
    /**
     * Gets a list of pre-subscription data
     *
     * @param callback A function that is passed (error, pre-subscriptions)
     */
    listPresubscriptions(callback: CallbackFn<Array<PresubscriptionObject>>): void;
    /**
     * Update pre-subscription data
     *
     * @param subscriptions The pre-subscription data array. If you send an empty array, the pre-subscription data will be removed
     * @returns Promise containing any error
     */
    updatePresubscriptions(subscriptions: Array<PresubscriptionObject>): Promise<void>;
    /**
     * Update pre-subscription data
     *
     * @param subscriptions The pre-subscription data array. If you send an empty array, the pre-subscription data will be removed
     * @param callback A function that is passed any error
     */
    updatePresubscriptions(subscriptions: Array<PresubscriptionObject>, callback: CallbackFn<void>): void;
    /**
     * Deletes pre-subscription data
     *
     * @returns Promise containing any error
     */
    deletePresubscriptions(): Promise<void>;
    /**
     * Deletes pre-subscription data
     *
     * @param callback A function that is passed any error
     */
    deletePresubscriptions(callback: CallbackFn<void>): void;
    /**
     * Removes all subscriptions for all devices.
     *
     * Warning: This could be slow for large numbers of connected devices.
     * If possible, explicitly delete subscriptions known to have been created.
     *
     * @returns Promise containing any error
     */
    deleteSubscriptions(): Promise<void>;
    /**
     * Removes all subscriptions for all devices.
     *
     * Warning: This could be slow for large numbers of connected devices.
     * If possible, explicitly delete subscriptions known to have been created.
     *
     * @param callback A function that is passed any error
     */
    deleteSubscriptions(callback: CallbackFn<void>): void;
    /**
     * List connected devices
     *
     * @param options list options
     * @returns Promise of connected devices
     */
    listConnectedDevices(options?: DeviceListOptions): Promise<ListResponse<ConnectedDevice>>;
    /**
     * List connected devices
     *
     * @param options list options
     * @param callback A function that is passed the arguments (error, devices)
     */
    listConnectedDevices(options?: DeviceListOptions, callback?: CallbackFn<ListResponse<ConnectedDevice>>): void;
    /**
     * List a device's subscriptions
     *
     * @param deviceId Device ID
     * @returns Promise containing the subscriptions
     */
    listDeviceSubscriptions(deviceId: string): Promise<string>;
    /**
     * List a device's subscriptions
     *
     * @param deviceId Device ID
     * @param callback A function that is passed (error, subscriptions)
     */
    listDeviceSubscriptions(deviceId: string, callback: CallbackFn<string>): void;
    /**
     * Removes a device's subscriptions
     *
     * @param deviceId Device ID
     * @returns Promise containing any error
     */
    deleteDeviceSubscriptions(deviceId: string): Promise<void>;
    /**
     * Removes a device's subscriptions
     *
     * @param deviceId Device ID
     * @param callback A function that is passed any error
     */
    deleteDeviceSubscriptions(deviceId: string, callback: CallbackFn<void>): void;
    /**
     * List device's resources
     *
     * @param deviceId Device ID
     * @returns Promise of device resources
     */
    listResources(deviceId: string): Promise<Array<Resource>>;
    /**
     * List device's resources
     *
     * @param deviceId Device ID
     * @param callback A function that is passed the arguments (error, resources)
     */
    listResources(deviceId: string, callback: CallbackFn<Array<Resource>>): void;
    /**
     * Get a resource
     *
     * @param deviceId Device ID
     * @param resourcePath Path of the resource to get
     * @returns Promise of device resource
     */
    getResource(deviceId: string, resourcePath: string): Promise<Resource>;
    /**
     * Get a resource
     *
     * @param deviceId Device ID
     * @param resourcePath Path of the resource to get
     * @param callback A function that is passed the arguments (error, resource)
     */
    getResource(deviceId: string, resourcePath: string, callback?: CallbackFn<Resource>): void;
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
    getResourceValue(deviceId: string, resourcePath: string, timeout?: number, mimeType?: string, resource?: Resource, tlvParser?: TlvParser): Promise<ResourceValue>;
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
    getResourceValue(deviceId: string, resourcePath: string, timeout?: number, mimeType?: string, resource?: Resource, tlvParser?: TlvParser, callback?: CallbackFn<ResourceValue>): void;
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
    setResourceValue(deviceId: string, resourcePath: string, value: string | number, timeout?: number, mimeType?: string): Promise<AsyncResponse>;
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
    setResourceValue(deviceId: string, resourcePath: string, value: string | number, timeout?: number, mimeType?: string, callback?: CallbackFn<AsyncResponse>): void;
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
    executeResource(deviceId: string, resourcePath: string, payload?: any, timeout?: number, mimeType?: string, accepts?: string): Promise<AsyncResponse>;
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
    executeResource(deviceId: string, resourcePath: string, payload?: any, timeout?: number, mimeType?: string, accepts?: string, callback?: CallbackFn<AsyncResponse>): void;
    /**
     * Gets the status of a resource's subscription
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @returns Promise containing resource subscription status
     */
    getResourceSubscription(deviceId: string, resourcePath: string): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    getResourceSubscription(deviceId: string, resourcePath: string, callback: CallbackFn<boolean>): void;
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
    addResourceSubscription(deviceId: string, resourcePath: string, notifyFn?: (error: SDKError, data: any) => any): Promise<void>;
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
    addResourceSubscription(deviceId: string, resourcePath: string, notifyFn?: (error: SDKError, data: any) => any, callback?: CallbackFn<void>): void;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @returns empty Promise
     */
    deleteResourceSubscription(deviceId: string, resourcePath: string): Promise<void>;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param callback A function that is passed any error
     */
    deleteResourceSubscription(deviceId: string, resourcePath: string, callback: CallbackFn<void>): void;
    /**
     * List metrics
     *
     * @param options metrics options
     * @returns Promise of metrics
     */
    listMetrics(options: MetricsStartEndListOptions | MetricsPeriodListOptions): Promise<ListResponse<Metric>>;
    /**
     * List metrics
     *
     * @param options metrics options
     * @param callback A function that is passed the return arguments (error, metrics)
     */
    listMetrics(options: MetricsStartEndListOptions | MetricsPeriodListOptions, callback: CallbackFn<ListResponse<Metric>>): void;
    /**
     * Get meta data for the last Pelion Device Management API call
     * @returns Promise of meta data
     */
    getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the lastPelion Device Management API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
}
