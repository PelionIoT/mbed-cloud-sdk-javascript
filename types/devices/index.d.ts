/// <reference types="node" />
import { EventEmitter } from "events";
import { ConnectionOptions, ListOptions, ListResponse } from "../common/interfaces";
import { DevicesApiType, DeviceType, QueryOptions, WebhookType, PresubscriptionType, MechanismEnum } from "./types";
import { Device } from "./device";
import { Resource } from "./resource";
import { Query } from "./query";
import { Webhook } from "./webhook";
import { Presubscription } from "./presubscription";
/**
 * ## Devices API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbed = require("mbed-cloud-sdk");
 *
 * var devices = new mbed.DevicesApi({
 *     apiKey: "<mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/devices.min.js"></script>
 *
 * <script>
 *     var devices = new mbed.DevicesApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 */
export declare class DevicesApi extends EventEmitter {
    private readonly asyncKey;
    private _endpoints;
    private _pollRequest;
    private _asyncFns;
    private _notifyFns;
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
    /**
     * @param options connection objects
     */
    constructor(options: ConnectionOptions);
    /**
     * Allows a notification to be injected into the notifications system
     * `handleNotifications` needs to be set to true for this to work with web hook async responses
     * @param data The notification data to inject
     */
    notify(data: any): void;
    /**
     * Begins long polling constantly for notifications
     * @param options.interval A polling interval in milliseconds
     * @param options.requestCallback A function that is passed async responses
     * @returns Promise containing any error
     */
    startNotifications(options?: {
        interval?: number;
        requestCallback?: (err: any, data?: any) => any;
    }): Promise<void>;
    /**
     * Begins long polling constantly for notifications
     * @param options.interval A polling interval in milliseconds
     * @param options.requestCallback A function that is passed async responses
     * @param callback A function that is passed any error
     */
    startNotifications(options?: {
        interval?: number;
        requestCallback?: (err: any, data?: any) => any;
    }, callback?: (err: any, data?: void) => any): any;
    /**
     * Stops long polling for notifications
     * @returns Promise containing any error
     */
    stopNotifications(): Promise<void>;
    /**
     * Stops long polling for notifications
     * @param callback A function that is passed any error
     */
    stopNotifications(callback?: (err: any, data?: void) => any): any;
    /**
     * Gets the current webhook data
     * @returns Promise containing the webhhok data
     */
    getWebhook(): Promise<Webhook>;
    /**
     * Gets the current webhook data
     * @param callback A function that is passed the arguments (error, webhook)
     */
    getWebhook(callback: (err: any, data?: Webhook) => any): any;
    /**
     * Updates the webhook
     * @param options webhook details
     * @returns Promise containing any error
     */
    updateWebhook(options: WebhookType): Promise<void>;
    /**
     * Updates the webhook
     * @param options webhook details
     * @param callback A function that is passed any error
     */
    updateWebhook(options: WebhookType, callback?: (err: any, data?: void) => any): any;
    /**
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
     * @returns Promise containing any error
     */
    deleteWebhook(): Promise<void>;
    /**
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
     * @param callback A function that is passed any error
     */
    deleteWebhook(callback?: (err: any, data?: void) => any): any;
    /**
     * Gets pre-subscription data
     * @returns Promise containing data
     */
    getPresubscription(): Promise<Presubscription[]>;
    /**
     * Gets pre-subscription data
     * @param callback A function that is passed (error, data)
     */
    getPresubscription(callback?: (err: any, data?: Presubscription[]) => any): any;
    /**
     * Updates pre-subscription data. If you send an empty array, the pre-subscription data will be removed
     * @param options.data The pre-subscription data
     * @returns Promise containing any error
     */
    updatePresubscription(options: PresubscriptionType[]): Promise<void>;
    /**
     * Updates pre-subscription data. If you send an empty array, the pre-subscription data will be removed
     * @param options.data The pre-subscription data
     * @param callback A function that is passed any error
     */
    updatePresubscription(options: PresubscriptionType[], callback?: (err: any, data?: void) => any): any;
    /**
     * Deletes pre-subscription data
     * @returns Promise containing any error
     */
    deletePresubscription(): Promise<void>;
    /**
     * Deletes pre-subscription data
     * @param callback A function that is passed any error
     */
    deletePresubscription(callback?: (err: any, data?: void) => any): any;
    /**
     * Removes all subscriptions
     * @returns Promise containing any error
     */
    deleteSubscriptions(): Promise<void>;
    /**
     * Removes all subscriptions
     * @param callback A function that is passed any error
     */
    deleteSubscriptions(callback?: (err: any, data?: void) => any): any;
    /**
     * Gets a list of devices
     * @param options list options
     * @returns Promise of devices
     */
    listDevices(options?: QueryOptions): Promise<ListResponse<Device>>;
    /**
     * Gets a list of devices
     * @param options list options
     * @param callback A function that is passed the arguments (error, devices)
     */
    listDevices(options?: QueryOptions, callback?: (err: any, data?: ListResponse<Device>) => any): any;
    /**
     * List connected devices
     * @param options.type Filter devices by device type
     * @returns Promise of connected devices
     */
    listConnectedDevices(options?: {
        type?: string;
    }): Promise<ListResponse<Device>>;
    /**
     * List connected devices
     * @param options.type Filter devices by device type
     * @param callback A function that is passed the arguments (error, devices)
     */
    listConnectedDevices(options?: {
        type?: string;
    }, callback?: (err: any, data?: ListResponse<Device>) => any): any;
    /**
     * Gets details of a device
     * @param options.id Device ID
     * @returns Promise of device
     */
    getDevice(options: {
        id: string;
    }): Promise<Device>;
    /**
     * Gets details of a device
     * @param options.id ID of device to get details for
     * @param callback A function that is passed the arguments (error, device)
     */
    getDevice(options: {
        id: string;
    }, callback: (err: any, data?: Device) => any): any;
    /**
     * Add a device
     * @param options Device details
     * @returns Promise of device
     */
    addDevice(options: DeviceType): Promise<Device>;
    /**
     * Add a device
     * @param options Device details
     * @param callback A function that is passed the arguments (error, device)
     */
    addDevice(options: DeviceType, callback?: (err: any, data?: Device) => any): any;
    /**
     * Update a device
     * @param options.id The ID of the device
     * @param options.name The name of the device
     * @param options.description The description of the device
     * @param options.customAttributes Up to 5 custom JSON attributes
     * @param options.deviceClass The device class
     * @param options.accountId The owning IAM account ID
     * @param options.autoUpdate Mark this device for auto firmware update
     * @param options.vendorId The device vendor ID
     * @param options.manifest URL for the current device manifest
     * @param options.trustClass The device trust class
     * @param options.trustLevel The device trust level
     * @param options.provisionKey The key used to provision the device
     * @param options.mechanism The ID of the channel used to communicate with the device
     * @param options.mechanismUrl The address of the connector to use
     * @param options.serialNumber The serial number of the device
     * @returns Promise of device
     */
    updateDevice(options: {
        id: string;
        name?: string;
        description?: string;
        customAttributes?: {
            [key: string]: string;
        };
        deviceClass?: string;
        accountId?: string;
        autoUpdate?: boolean;
        vendorId?: string;
        manifest?: string;
        trustClass?: number;
        trustLevel?: number;
        provisionKey?: string;
        mechanism?: MechanismEnum;
        mechanismUrl?: string;
        serialNumber?: string;
    }): Promise<Device>;
    /**
     * Update a device
     * @param options.id The ID of the device
     * @param options.name The name of the device
     * @param options.description The description of the device
     * @param options.customAttributes Up to 5 custom JSON attributes
     * @param options.deviceClass The device class
     * @param options.accountId The owning IAM account ID
     * @param options.autoUpdate Mark this device for auto firmware update
     * @param options.vendorId The device vendor ID
     * @param options.manifest URL for the current device manifest
     * @param options.trustClass The device trust class
     * @param options.trustLevel The device trust level
     * @param options.provisionKey The key used to provision the device
     * @param options.mechanism The ID of the channel used to communicate with the device
     * @param options.mechanismUrl The address of the connector to use
     * @param options.serialNumber The serial number of the device
     * @param callback A function that is passed the arguments (error, device)
     */
    updateDevice(options: {
        id: string;
        name?: string;
        description?: string;
        customAttributes?: {
            [key: string]: string;
        };
        deviceClass?: string;
        accountId?: string;
        autoUpdate?: boolean;
        vendorId?: string;
        manifest?: string;
        trustClass?: number;
        trustLevel?: number;
        provisionKey?: string;
        mechanism?: MechanismEnum;
        mechanismUrl?: string;
        serialNumber?: string;
    }, callback?: (err: any, data?: Device) => any): any;
    /**
     * Delete a device
     * @param options.id Device ID
     * @returns Promise containing any error
     */
    deleteDevice(options: {
        id: string;
    }): Promise<void>;
    /**
     * Delete a device
     * @param options.id Device ID
     * @param callback A function that is passed any error
     */
    deleteDevice(options: {
        id: string;
    }, callback?: (err: any, data?: void) => any): any;
    /**
     * List a device's subscriptions
     * @param options.id Device ID
     * @returns Promise containing the subscriptions
     */
    listDeviceSubscriptions(options: {
        id: string;
    }): Promise<any>;
    /**
     * List a device's subscriptions
     * @param options.id Device ID
     * @param callback A function that is passed (error, subscriptions)
     */
    listDeviceSubscriptions(options: {
        id: string;
    }, callback: (err: any, data?: any) => any): any;
    /**
     * Removes a device's subscriptions
     * @param options.id Device ID
     * @returns Promise containing any error
     */
    deleteDeviceSubscriptions(options: {
        id: string;
    }): Promise<void>;
    /**
     * Removes a device's subscriptions
     * @param options.id Device ID
     * @param callback A function that is passed any error
     */
    deleteDeviceSubscriptions(options: {
        id: string;
    }, callback: (err: any, data?: void) => any): any;
    /**
     * List device's resources
     * @param options.id Device ID
     * @returns Promise of device resources
     */
    listDeviceResources(options: {
        id: string;
    }): Promise<Resource[]>;
    /**
     * List device's resources
     * @param options.id Device ID
     * @param callback A function that is passed the arguments (error, resources)
     */
    listDeviceResources(options: {
        id: string;
    }, callback: (err: any, data?: Resource[]) => any): any;
    /**
     * Deletes a resource
     * @param options.id Device ID
     * @param options.path Path of the resource to delete
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    deleteDeviceResource(options: {
        id: string;
        path: string;
        noResponse?: boolean;
    }): Promise<string>;
    /**
     * Deletes a resource
     * @param options.id Device ID
     * @param options.path Path of the resource to delete
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    deleteDeviceResource(options: {
        id: string;
        path: string;
        noResponse?: boolean;
    }, callback?: (err: any, data?: string) => any): any;
    /**
     * Gets the value of a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.cacheOnly If true, the response will come only from the cache
     * @param options.noResponse If true, If true, mbed Device Connector will not wait for a response
     * @returns Promise of resource value when handling notifications or an asyncId
     */
    getResourceValue(options: {
        id: string;
        path: string;
        cacheOnly?: boolean;
        noResponse?: boolean;
    }): Promise<string>;
    /**
     * Gets the value of a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.cacheOnly If true, the response will come only from the cache
     * @param options.noResponse If true, If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when handling notifications or an asyncId
     */
    getResourceValue(options: {
        id: string;
        path: string;
        cacheOnly?: boolean;
        noResponse?: boolean;
    }, callback: (err: any, data?: string) => any): any;
    /**
     * Sets the value of a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.value The value of the resource
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    setResourceValue(options: {
        id: string;
        path: string;
        value: string;
        noResponse?: boolean;
    }): Promise<string>;
    /**
     * Sets the value of a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.value The value of the resource
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    setResourceValue(options: {
        id: string;
        path: string;
        value: string;
        noResponse?: boolean;
    }, callback?: (err: any, data?: string) => any): any;
    /**
     * Execute a function on a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.fn The function to trigger
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    executeResource(options: {
        id: string;
        path: string;
        fn?: string;
        noResponse?: boolean;
    }): Promise<string>;
    /**
     * Execute a function on a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.fn The function to trigger
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    executeResource(options: {
        id: string;
        path: string;
        fn?: string;
        noResponse?: boolean;
    }, callback?: (err: any, data?: string) => any): any;
    /**
     * Gets the status of a resource's subscription
     * @param options.id Device ID
     * @param options.path Resource path
     * @returns Promise containing resource subscription status
     */
    getResourceSubscription(options: {
        id: string;
        path: string;
    }): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     * @param options.id Device ID
     * @param options.path Resource path
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    getResourceSubscription(options: {
        id: string;
        path: string;
    }, callback: (err: any, data?: boolean) => any): any;
    /**
     * Subscribe to a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.fn Function to call with notification
     * @returns Promise containing any error
     */
    addResourceSubscription(options: {
        id: string;
        path: string;
        fn?: Function;
    }): Promise<void>;
    /**
     * Subscribe to a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.fn Function to call with notification
     * @param callback A function that is passed any error
     */
    addResourceSubscription(options: {
        id: string;
        path: string;
        fn?: Function;
    }, callback?: (err: any, data?: void) => any): any;
    /**
     * Deletes a resource's subscription
     * @param options.id Device ID
     * @param options.path Resource path
     * @returns Promise containing any error
     */
    deleteResourceSubscription(options: {
        id: string;
        path: string;
    }): Promise<void>;
    /**
     * Deletes a resource's subscription
     * @param options.id Device ID
     * @param options.path Resource path
     * @param callback A function that is passed any error
     */
    deleteResourceSubscription(options: {
        id: string;
        path: string;
    }, callback?: (err: any, data?: void) => any): any;
    /**
     * List queries
     * @param options list options
     * @param callback A function containing a list response
     * @returns Promise containing a list response
     */
    listQueries(options?: ListOptions): Promise<ListResponse<Query>>;
    /**
     * List queries
     * @param options list options
     * @param callback A function containing a list response
     * @returns Promise containing a list response
     */
    listQueries(options?: ListOptions, callback?: (err: any, data?: ListResponse<Query>) => any): any;
    /**
     * Get a query
     * @param options.is query ID
     * @param callback A function that is passed the arguments (error, query)
     * @returns Promise of query
     */
    getQuery(options: {
        id: string;
    }): Promise<Query>;
    /**
     * Get a query
     * @param options.is query ID
     * @param callback A function that is passed the arguments (error, query)
     * @returns Promise of query
     */
    getQuery(options: {
        id: string;
    }, callback?: (err: any, data?: Query) => any): any;
    /**
     * Add a query
     * @param options.name The name of the query
     * @param options.description The description of the query
     * @param options.attributes The attributes of the query
     * @param options.customAttributes The custom attributes of the query
     * @returns Promise of query
     */
    addQuery(options: {
        name: string;
        description?: string;
        attributes?: {
            [key: string]: string;
        };
        customAttributes?: {
            [key: string]: string;
        };
    }): Promise<Query>;
    /**
     * Add a query
     * @param options.name The name of the query
     * @param options.description The description of the query
     * @param options.attributes The attributes of the query
     * @param options.customAttributes The custom attributes of the query
     * @param callback A function that is passed the arguments (error, query)
     */
    addQuery(options: {
        name: string;
        description?: string;
        attributes?: {
            [key: string]: string;
        };
        customAttributes?: {
            [key: string]: string;
        };
    }, callback?: (err: any, data?: Query) => any): any;
    /**
     * Update a query
     * @param options.id The ID of the query
     * @param options.name The name of the query
     * @param options.description The description of the query
     * @param options.attributes The attributes of the query
     * @param options.customAttributes The custom attributes of the query
     * @returns Promise of query
     */
    updateQuery(options: {
        id: string;
        name: string;
        description?: string;
        attributes?: {
            [key: string]: string;
        };
        customAttributes?: {
            [key: string]: string;
        };
    }): Promise<Query>;
    /**
     * Update a query
     * @param options.id The ID of the query
     * @param options.name The name of the query
     * @param options.description The description of the query
     * @param options.attributes The attributes of the query
     * @param options.customAttributes The custom attributes of the query
     * @param callback A function that is passed the arguments (error, query)
     */
    updateQuery(options: {
        id: string;
        name: string;
        description?: string;
        attributes?: {
            [key: string]: string;
        };
        customAttributes?: {
            [key: string]: string;
        };
    }, callback?: (err: any, data?: Query) => any): any;
    /**
     * Delete a query
     * @param options.id query ID
     * @returns Promise containing any error
     */
    deleteQuery(options: {
        id: string;
    }): Promise<void>;
    /**
     * Delete a query
     * @param options.id query ID
     * @param callback A function that is passed any error
     */
    deleteQuery(options: {
        id: string;
    }, callback?: (err: any, data?: void) => any): any;
}
export interface DevicesApi extends DevicesApiType {
}
