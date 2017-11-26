/// <reference types="node" />
import { EventEmitter } from "events";
import { ListResponse } from "../common/listResponse";
import { ConnectionOptions, CallbackFn } from "../common/interfaces";
import { NotificationObject, NotificationOptions, PresubscriptionObject } from "./types";
import { Webhook } from "./models/webhook";
import { Resource } from "./models/resource";
import { ConnectedDevice } from "./models/connectedDevice";
import { MetricsStartEndListOptions, MetricsPeriodListOptions } from "./types";
import { Metric } from "./models/metric";
import { ApiMetadata } from "../common/apiMetadata";
import { DeviceListOptions } from "../deviceDirectory/types";
/**
 * ## Connect API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var MbedCloudSDK = require("mbed-cloud-sdk");
 *
 * var connect = new MbedCloudSDK.ConnectApi({
 *     apiKey: "<Mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/connect.min.js"></script>
 *
 * <script>
 *     var connect = new MbedCloudSDK.ConnectApi({
 *         apiKey: "<Mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 *
 * ### Notification channels
 *
 * Some methods on connected device resources (e.g. `resource.getValue()`) and most events (e.g. `resource.on("notification")`) require a notification channel to be set up before they will work.
 *
 * There are two options for setting up a notification channel:
 *  * Register a callback server or _webhook_ using `updateWebhook()`
 *  * Use pull notifications by using `startNotifications()`
 *
 * The `webhook` and `pull-notifications` examples show how this can be done.
 */
export declare class ConnectApi extends EventEmitter {
    /**
     * Resource notification event
     * @event
     */
    static EVENT_NOTIFICATION: string;
    /**
     * List of new devices that have registered (with resources)
     * @event
     */
    static EVENT_REGISTRATION: string;
    /**
     * List of devices that have updated registration
     * @event
     */
    static EVENT_REREGISTRATION: string;
    /**
     * List of devices that were removed in a controlled manner
     * @event
     */
    static EVENT_DEREGISTRATION: string;
    /**
     * List of devices that were removed because the registration has expired
     * @event
     */
    static EVENT_EXPIRED: string;
    private readonly ASYNC_KEY;
    private _deviceDirectory;
    private _endpoints;
    private _pollRequest;
    private _asyncFns;
    private _notifyFns;
    /**
     * Whether async callbacks are handled by the API.
     * Pull notifications will set this automatically, but it can also be used alongside the `notify` function with webhooks
     */
    handleNotifications: boolean;
    /**
     * @param options connection objects
     */
    constructor(options: ConnectionOptions);
    private normalizePath(path?);
    /**
     * Allows a notification to be injected into the notifications system
     *
     * `handleNotifications` needs to be set to true for this to work with web hook async responses
     *
     * Example: (The following pushes a notification to the event emitter, which can be read back by using the `.on` function.
     * Note that the payload is encoded in Base64)
     *
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var payload = "Q2hhbmdlIG1lIQ==";
     *
     * var notification = {notifications: [{ep: deviceID, path: resourceURI, payload: payload}]};
     * connectApi.notify(notification);
     *
     * connectApi.on(mbed.ConnectApi.EVENT_NOTIFICATION, function(notification) {
     *     // Do something with the notification
     *     console.log(notification);
     * });
     * ```
     * Console log:
     * ```json
     * { id: '015bb66a92a30000000000010010006d', path: '3200/0/5500', payload: 'Change me!'}
     * ```
     *
     * @param data The notification data to inject
     */
    notify(data: NotificationObject): void;
    /**
     * Begins pull notifications
     *
     * If an external callback is not setup (using update_webhook), then calling this function is mandatory.
     *
     * Example:
     * ```JavaScript
     * connect.startNotifications()
     * .then(() => {
     *     console.log('Mbed Cloud SDK listening for notifications');
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
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
     * Example:
     * ```JavaScript
     * connect.startNotifications(function(error) {
     *     if (error) return console.log(error);
     *     console.log('Mbed Cloud SDK listening for notifications');
     * });
     * ```
     *
     * @param options notification options
     * @param callback A function that is passed any error
     */
    startNotifications(options?: NotificationOptions, callback?: CallbackFn<void>): void;
    /**
     * Stops pull notifications
     *
     * Example:
     * ```JavaScript
     * connect.stopNotifications()
     * .then(() => {
     *     console.log('Mbed Cloud SDK stopped listening for notifications');
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @returns Promise containing any error
     */
    stopNotifications(): Promise<void>;
    /**
     * Stops pull notifications
     *
     * Example:
     * ```JavaScript
     * connect.stopNotifications(function(error) {
     *     if (error) throw error;
     *     console.log('Mbed Cloud SDK stopped listening for notifications');
     * });
     * ```
     *
     * @param callback A function that is passed any error
     */
    stopNotifications(callback: CallbackFn<void>): void;
    /**
     * Get the current callback URL if it exists
     *
     * Example:
     * ```JavaScript
     * connect.getWebhook()
     * .then(webhook => {
     *     // Utilize webhook here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @returns Promise containing the webhhok data
     */
    getWebhook(): Promise<Webhook>;
    /**
     * Get the current callback URL if it exists
     *
     * Example:
     * ```JavaScript
     * connect.getWebhook(function(error, webhook) {
     *     if (error) throw error;
     *     // Utilize webhook here
     * });
     * ```
     *
     * @param callback A function that is passed the arguments (error, webhook)
     */
    getWebhook(callback: CallbackFn<Webhook>): void;
    /**
     * Register new webhook for incoming subscriptions.
     *
     * If a webhook is already set, this will do an overwrite.
     *
     * Example:
     * ```JavaScript
     * connect.updateWebhook(url)
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param url The URL to which the notifications must be sent
     * @param headers Any headers (key/value) that must be sent with the request
     * @returns Promise containing any error
     */
    updateWebhook(url: string, headers?: {
        [key: string]: string;
    }): Promise<void>;
    /**
     * Register new webhook for incoming subscriptions.
     *
     * If a webhook is already set, this will do an overwrite.
     *
     * Example:
     * ```JavaScript
     * connect.updateWebhook(url, function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param url The URL to which the notifications must be sent
     * @param headers Any headers (key/value) that must be sent with the request
     * @param callback A function that is passed any error
     */
    updateWebhook(url: string, headers?: {
        [key: string]: string;
    }, callback?: CallbackFn<void>): void;
    /**
     * Deletes the callback data (effectively stopping Mbed Cloud Connect from putting notifications)
     *
     * If no webhook is registered, an exception (404) will be raised.
     *
     * Note that every registered subscription will be deleted as part of deregistering a webhook.
     *
     * Example:
     * ```JavaScript
     * connect.deleteWebhook()
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @returns Promise containing any error
     */
    deleteWebhook(): Promise<void>;
    /**
     * Deletes the callback data (effectively stopping Mbed Cloud Connect from putting notifications)
     *
     * If no webhook is registered, an exception (404) will be raised.
     *
     * Note that every registered subscription will be deleted as part of deregistering a webhook.
     *
     * Example:
     * ```JavaScript
     * connect.deleteWebhook(function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param callback A function that is passed any error
     */
    deleteWebhook(callback: CallbackFn<void>): void;
    /**
     * Gets a list of pre-subscription data
     *
     * Example:
     * ```JavaScript
     * connect.listPresubscriptions()
     * .then(presubscriptions => {
     *     // Utilize presubscriptions here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @returns Promise containing pre-subscriptions
     */
    listPresubscriptions(): Promise<Array<PresubscriptionObject>>;
    /**
     * Gets a list of pre-subscription data
     *
     * Example:
     * ```JavaScript
     * connect.listPresubscriptions(function(error, presubscriptions) {
     *     if (error) throw error;
     *     // Utilize presubscriptions here
     * });
     * ```
     *
     * @param callback A function that is passed (error, pre-subscriptions)
     */
    listPresubscriptions(callback: CallbackFn<Array<PresubscriptionObject>>): void;
    /**
     * Update pre-subscription data
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var subscriptions = [{deviceId: deviceID}];
     * connect.updatePresubscriptions(subscriptions)
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param subscriptions The pre-subscription data array. If you send an empty array, the pre-subscription data will be removed
     * @returns Promise containing any error
     */
    updatePresubscriptions(subscriptions: Array<PresubscriptionObject>): Promise<void>;
    /**
     * Update pre-subscription data
     *
     * Example:
     * ```JavaScript
     * var deviceID = "015bb66a92a30000000000010010006d";
     * var subscriptions = [{deviceId: deviceID}];
     * connect.updatePresubscriptions(subscriptions, function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param subscriptions The pre-subscription data array. If you send an empty array, the pre-subscription data will be removed
     * @param callback A function that is passed any error
     */
    updatePresubscriptions(subscriptions: Array<PresubscriptionObject>, callback: CallbackFn<void>): void;
    /**
     * Deletes pre-subscription data
     *
     * Example:
     * ```JavaScript
     * connect.deletePresubscriptions()
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @returns Promise containing any error
     */
    deletePresubscriptions(): Promise<void>;
    /**
     * Deletes pre-subscription data
     *
     * Example:
     * ```JavaScript
     * connect.deletePresubscriptions(function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param callback A function that is passed any error
     */
    deletePresubscriptions(callback: CallbackFn<void>): void;
    /**
     * Removes all subscriptions
     *
     * Example:
     * ```JavaScript
     * connect.deleteSubscriptions()
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @returns Promise containing any error
     */
    deleteSubscriptions(): Promise<void>;
    /**
     * Removes all subscriptions
     *
     * Example:
     * ```JavaScript
     * connect.deleteSubscriptions(function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param callback A function that is passed any error
     */
    deleteSubscriptions(callback: CallbackFn<void>): void;
    /**
     * List connected devices
     *
     * Example:
     * ```JavaScript
     * connect.listConnectedDevices({
     *     filter: {
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * })
     * .then(devices => {
     *     // Utilize devices here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options list options
     * @returns Promise of connected devices
     */
    listConnectedDevices(options?: DeviceListOptions): Promise<ListResponse<ConnectedDevice>>;
    /**
     * List connected devices
     *
     * Example:
     * ```JavaScript
     * connect.listConnectedDevices({
     *     filter: {
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * }, function(error, devices) {
     *     if (error) throw error;
     *     // Utilize devices here
     * });
     * ```
     *
     * @param options list options
     * @param callback A function that is passed the arguments (error, devices)
     */
    listConnectedDevices(options?: DeviceListOptions, callback?: CallbackFn<ListResponse<ConnectedDevice>>): void;
    /**
     * List a device's subscriptions
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * connect.listDeviceSubscriptions(deviceId)
     * .then(subscriptions => {
     *     // Utilize subscriptions here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @returns Promise containing the subscriptions
     */
    listDeviceSubscriptions(deviceId: string): Promise<string>;
    /**
     * List a device's subscriptions
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * connect.listDeviceSubscriptions(deviceId, function(error, subscriptions) {
     *     if (error) throw error;
     *     // Utilize subscriptions here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param callback A function that is passed (error, subscriptions)
     */
    listDeviceSubscriptions(deviceId: string, callback: CallbackFn<string>): void;
    /**
     * Removes a device's subscriptions
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * connect.deleteDeviceSubscriptions(deviceId)
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @returns Promise containing any error
     */
    deleteDeviceSubscriptions(deviceId: string): Promise<void>;
    /**
     * Removes a device's subscriptions
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * connect.deleteDeviceSubscriptions(deviceId, function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param callback A function that is passed any error
     */
    deleteDeviceSubscriptions(deviceId: string, callback: CallbackFn<void>): void;
    /**
     * List device's resources
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * connect.listResources(deviceId)
     * .then(resources => {
     *     for (var resource in resources) {
     *         // Utilize resource here
     *         console.log(resources[resource]);
     *     }
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @returns Promise of device resources
     */
    listResources(deviceId: string): Promise<Array<Resource>>;
    /**
     * List device's resources
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * connect.listResources(deviceId, function(error, resources) {
     *     if (error) throw error;
     *     for (var resource in resources) {
     *         // Utilize resource here
     *         console.log(resources[resource]);
     *     }
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param callback A function that is passed the arguments (error, resources)
     */
    listResources(deviceId: string, callback: CallbackFn<Array<Resource>>): void;
    /**
     * Get a resource
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.getResource(deviceId, resourceURI)
     * .then(resource => {
     *     // Utilize resource here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Path of the resource to get
     * @returns Promise of device resource
     */
    getResource(deviceId: string, resourcePath: string): Promise<Resource>;
    /**
     * Get a resource
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.getResource(deviceId, resourceURI, function(error, resource) {
     *     if (error) throw error;
     *     // Utilize resource here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Path of the resource to get
     * @param callback A function that is passed the arguments (error, resource)
     */
    getResource(deviceId: string, resourcePath: string, callback?: CallbackFn<Resource>): void;
    /**
     * Deletes a resource
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.deleteResource(deviceId, resourceURI)
     * .then(response => {
     *     // Utilize response here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    deleteResource(deviceId: string, resourcePath: string, noResponse?: boolean): Promise<string>;
    /**
     * Deletes a resource
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.deleteResource(deviceId, resourceURI, function(error, response) {
     *     if (error) throw error;
     *     // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    deleteResource(deviceId: string, resourcePath: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.getResourceValue(deviceId, resourceURI)
     * .then(data => {
     *     // Utilize data here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The requested mime type format of the value
     * @returns Promise of resource value when handling notifications or an asyncId
     */
    getResourceValue(deviceId: string, resourcePath: string, cacheOnly?: boolean, noResponse?: boolean, mimeType?: string): Promise<string | number | {
        [key: string]: string | number;
    }>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.getResourceValue(deviceId, resourceURI, function(error, data) {
     *     if (error) throw error;
     *     // Utilize data here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The requested mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when handling notifications or an asyncId
     */
    getResourceValue(deviceId: string, resourcePath: string, cacheOnly?: boolean, noResponse?: boolean, mimeType?: string, callback?: CallbackFn<string | number | {
        [key: string]: string | number;
    }>): void;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var payload = "ChangeMe!";
     * connect.setResourceValue(deviceId, resourceURI, payload)
     * .then(response => {
     *     // Utilize response here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    setResourceValue(deviceId: string, resourcePath: string, value: string, noResponse?: boolean, mimeType?: string): Promise<string>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * var payload = "ChangeMe!";
     * connect.setResourceValue(deviceId, resourceURI, payload, function(error, response) {
     *     if (error) throw error;
     *     // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    setResourceValue(deviceId: string, resourcePath: string, value: string, noResponse?: boolean, mimeType?: string, callback?: CallbackFn<string>): void;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.executeResource(deviceId, resourceURI)
     * .then(response => {
     *     // Utilize response here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    executeResource(deviceId: string, resourcePath: string, functionName?: string, noResponse?: boolean, mimeType?: string): Promise<string>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.executeResource(deviceId, resourceURI, function(error, response) {
     *     if (error) throw error;
     *     // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    executeResource(deviceId: string, resourcePath: string, functionName?: string, noResponse?: boolean, mimeType?: string, callback?: CallbackFn<string>): void;
    /**
     * Gets the status of a resource's subscription
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.getResourceSubscription(deviceId, resourceURI)
     * .then(res_exists => {
     *     // Utilize res_exists here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @returns Promise containing resource subscription status
     */
    getResourceSubscription(deviceId: string, resourcePath: string): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.getResourceSubscription(deviceId, resourceURI, function(error, res_exists) {
     *     if (error) throw error;
     *     // Utilize res_exists here
     * });
     * ```
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
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.addResourceSubscription(deviceId, resourceURI, data => {
     *     // Utilize data here - which is the updated value in resourceURI
     * })
     * .then(asyncId => {
     *     // Utilize asyncId here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param notifyFn Function to call with notification
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    addResourceSubscription(deviceId: string, resourcePath: string, notifyFn?: (data: any) => any): Promise<string>;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.addResourceSubscription(deviceId, resourceURI, function(data) {
     *      // Utilize data here - which is the updated value in resourceURI
     * }, function(error, asyncId) {
     *     if (error) throw error;
     *     // Utilize asyncId here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    addResourceSubscription(deviceId: string, resourcePath: string, notifyFn?: (data: any) => any, callback?: CallbackFn<string>): void;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.deleteResourceSubscription(deviceId, resourceURI)
     * .then(response => {
     *     // Utilize response here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    deleteResourceSubscription(deviceId: string, resourcePath: string): Promise<string>;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     *
     * Example:
     * ```JavaScript
     * var deviceId = "015bb66a92a30000000000010010006d";
     * var resourceURI = "3200/0/5500";
     * connect.deleteResourceSubscription(deviceId, resourceURI, function(error, response) {
     *     if (error) throw error;
     *     // Utilize response here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param resourcePath Resource path
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    deleteResourceSubscription(deviceId: string, resourcePath: string, callback: CallbackFn<string>): void;
    /**
     * List metrics
     *
     * Example: (The following will retrieve metrics regarding pending and failed device registrations in the last day)
     * ```JavaScript
     * var today = new Date();
     * var yesterday = new Date();
     * yesterday.setDate(yesterday.getDate() - 1);
     * var options = {start: yesterday, end: today, include: ["pendingBootstraps", "failedBootstraps"]};
     * connect.listMetrics(options)
     * .then(metrics => {
     *     // Utilize metrics here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options metrics options
     * @returns Promise of metrics
     */
    listMetrics(options: MetricsStartEndListOptions | MetricsPeriodListOptions): Promise<Array<Metric>>;
    /**
     * List metrics
     *
     * Example: (The following will retrieve metrics regarding pending and failed device registrations in the last day)
     * ```JavaScript
     * var today = new Date();
     * var yesterday = new Date();
     * yesterday.setDate(yesterday.getDate() - 1);
     * var options = {start: yesterday, end: today, include: ["pendingBootstraps", "failedBootstraps"]};
     * connect.listMetrics(options, function(error, metrics) {
     *     if (error) throw error;
     *     // Utilize metrics here
     * });
     * ```
     *
     * @param options metrics options
     * @param callback A function that is passed the return arguments (error, metrics)
     */
    listMetrics(options: MetricsStartEndListOptions | MetricsPeriodListOptions, callback: CallbackFn<Array<Metric>>): void;
    /**
     * Get meta data for the last Mbed Cloud API call
     * @returns Promise of meta data
     */
    getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the last Mbed Cloud API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
}
