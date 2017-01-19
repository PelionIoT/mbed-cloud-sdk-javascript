/// <reference types="node" />
import { EventEmitter } from "events";
import { ConnectionOptions, ListOptions, ListResponse } from "../helpers/interfaces";
import { Endpoints } from "./endpoints";
import { DeviceType, QueryType, WebhookType } from "./types";
import { Device } from "./device";
import { Resource } from "./resource";
import { Query } from "./query";
import { Webhook } from "./webhook";
/**
 * Root Devices API
 */
export declare class DevicesApi extends EventEmitter {
    static _endpoints: Endpoints;
    private _pollRequest;
    static polling: boolean;
    static asyncFns: {
        [key: string]: Function;
    };
    static resourceSubs: {
        [key: string]: Resource;
    };
    /**
     * Resource notification event
     * @event
     */
    static EVENT_NOTIFICATION: string;
    /**
     * Device registration event
     * @event
     */
    static EVENT_REGISTRATION: string;
    /**
     * Device registration update event
     * @event
     */
    static EVENT_UPDATE: string;
    /**
     * Device de-registration event
     * @event
     */
    static EVENT_DEREGISTRATION: string;
    /**
     * Device registration expiration event
     * @event
     */
    static EVENT_EXPIRED: string;
    /**
     * @param options connection objects
     */
    constructor(options: ConnectionOptions);
    /**
     * Add a device
     * @param options device details
     * @returns Promise of device
     */
    addDevice(options?: DeviceType): Promise<Device>;
    /**
     * Create a device
     * @param options device details
     * @param callback A function that is passed the arguments (error, device)
     */
    addDevice(options?: DeviceType, callback?: (err: any, data?: Device) => any): void;
    /**
     * Delete a device
     * @param options.id device ID
     * @returns Promise containing any error
     */
    deleteDevice(options?: {
        id: string;
    }): Promise<void>;
    /**
     * Delete a device
     * @param options.id device ID
     * @param callback A function that is passed any error
     */
    deleteDevice(options?: {
        id: string;
    }, callback?: (err: any, data?: any) => void): void;
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
     * Begins long polling constantly for notifications
     * @param options.requestCallback A function that is passed all notifications
     * @returns Promise containing any error
     */
    startNotifications(options?: {
        requestCallback?: (err: any, data?: any) => any;
    }): Promise<void>;
    /**
     * Begins long polling constantly for notifications
     * @param options.requestCallback A function that is passed all notifications
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
    getPreSubscription(): Promise<any>;
    /**
     * Gets pre-subscription data
     * @param callback A function that is passed (error, data)
     */
    getPreSubscription(callback?: (err: any, data?: any) => any): any;
    /**
     * Puts pre-subscription data
     * @param options.data The pre-subscription data
     * @returns Promise containing any error
     */
    updatePreSubscription(options: {
        data: string[];
    }): Promise<void>;
    /**
     * Puts pre-subscription data
     * @param options.data The pre-subscription data
     * @param callback A function that is passed any error
     */
    updatePreSubscription(options: {
        data: string[];
    }, callback?: (err: any, data?: void) => any): any;
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
}
