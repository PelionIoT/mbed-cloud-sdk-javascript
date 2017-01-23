/// <reference types="node" />
import { EventEmitter } from "events";
import { ConnectionOptions, ListOptions, ListResponse } from "../helpers/interfaces";
import { DevicesApiType, DeviceType, QueryType, WebhookType, PresubscriptionType } from "./types";
import { Device } from "./device";
import { Resource } from "./resource";
import { Query } from "./query";
import { Webhook } from "./webhook";
import { Presubscription } from "./presubscription";
/**
 * Root Devices API
 */
export declare class DevicesApi extends EventEmitter {
    private _endpoints;
    private _pollRequest;
    private _asyncFns;
    _resourceSubs: {
        [key: string]: Resource;
    };
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
     * Allows a notification to be injected into the polling system
     * @param data The notification data to inject
     */
    notify(data: any): void;
    /**
     * Begins long polling constantly for notifications
     * @param options.requestCallback A function that is passed async responses
     * @returns Promise containing any error
     */
    startNotifications(options?: {
        requestCallback?: (err: any, data?: any) => any;
    }): Promise<void>;
    /**
     * Begins long polling constantly for notifications
     * @param options.requestCallback A function that is passed async responses
     * @param callback A function that is passed any error
     */
    startNotifications(options?: {
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
    getPreSubscription(): Promise<Presubscription[]>;
    /**
     * Gets pre-subscription data
     * @param callback A function that is passed (error, data)
     */
    getPreSubscription(callback?: (err: any, data?: Presubscription[]) => any): any;
    /**
     * Updates pre-subscription data. If you send an empty array, the pre-subscription data will be removed
     * @param options.data The pre-subscription data
     * @returns Promise containing any error
     */
    updatePreSubscription(options: PresubscriptionType[]): Promise<void>;
    /**
     * Updates pre-subscription data. If you send an empty array, the pre-subscription data will be removed
     * @param options.data The pre-subscription data
     * @param callback A function that is passed any error
     */
    updatePreSubscription(options: PresubscriptionType[], callback?: (err: any, data?: void) => any): any;
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
    listDevices(options?: ListOptions): Promise<ListResponse<Device>>;
    /**
     * Gets a list of devices
     * @param options list options
     * @param callback A function that is passed the arguments (error, devices)
     */
    listDevices(options?: ListOptions, callback?: (err: any, data?: ListResponse<Device>) => any): void;
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
    }, callback?: (err: any, data?: ListResponse<Device>) => any): void;
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
    addDevice(options?: DeviceType): Promise<Device>;
    /**
     * Add a device
     * @param options Device details
     * @param callback A function that is passed the arguments (error, device)
     */
    addDevice(options?: DeviceType, callback?: (err: any, data?: Device) => any): void;
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
    }, callback?: (err: any, data?: any) => void): void;
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
     * @returns Promise of resource value when long polling or an asyncId
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
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when long polling or an asyncId
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
     * @returns Promise containing any error
     */
    addResourceSubscription(options: {
        id: string;
        path: string;
    }): Promise<void>;
    /**
     * Subscribe to a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param callback A function that is passed any error
     */
    addResourceSubscription(options: {
        id: string;
        path: string;
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
    listQueries(options?: ListOptions, callback?: (err: any, data?: ListResponse<Query>) => any): void;
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
    }, callback?: (err: any, data?: Query) => any): void;
    /**
     * Add a query
     * @param options.name query name
     * @param options.query query string
     * @param options.description query description
     * @returns Promise of query
     */
    addQuery(options: {
        name: string;
        query: string;
        description?: string;
    }): Promise<Query>;
    /**
     * Add a query
     * @param options.name query name
     * @param options.query query string
     * @param options.description query description
     * @param callback A function that is passed the arguments (error, query)
     */
    addQuery(options: {
        name: string;
        query: string;
        description?: string;
    }, callback?: (err: any, data?: Query) => any): void;
    /**
     * Update a query
     * @param options query details
     * @returns Promise of query
     */
    updateQuery(options: QueryType): Promise<Query>;
    /**
     * Update a query
     * @param options query details
     * @param callback A function that is passed the arguments (error, query)
     */
    updateQuery(options: QueryType, callback?: (err: any, data?: Query) => void): void;
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
    }, callback?: (err: any, data?: void) => any): void;
}
export interface DevicesApi extends DevicesApiType {
}
