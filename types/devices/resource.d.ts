/// <reference types="node" />
import { EventEmitter } from "events";
import { ResourceType } from "./types";
import { DevicesApi } from "./index";
import { Resource as apiResourceType } from "../_api/mds";
/**
 * Resource
 */
export declare class Resource extends EventEmitter {
    private _api;
    /**
     * Resource notification event which returns the notification when handling notifications, otherwise an asyncId
     * @event
     */
    static EVENT_NOTIFICATION: string;
    constructor(options: ResourceType, _api?: DevicesApi);
    static map(from: apiResourceType, deviceId: string, api: DevicesApi): Resource;
    /**
     * Gets the value of a resource
     * @param options.cacheOnly If true, the response will come only from the cache
     * @param options.noResponse If true, If true, mbed Device Connector will not wait for a response
     * @returns Promise of resource value when handling notifications or an asyncId
     */
    getValue(options?: {
        cacheOnly?: boolean;
        noResponse?: boolean;
    }): Promise<string>;
    /**
     * Gets the value of a resource
     * @param options.cacheOnly If true, the response will come only from the cache
     * @param options.noResponse If true, If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when handling notifications or an asyncId
     */
    getValue(options?: {
        cacheOnly?: boolean;
        noResponse?: boolean;
    }, callback?: (err: any, data?: string) => any): any;
    /**
     * Sets the value of a resource
     * @param options.value The value of the resource
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    setValue(options: {
        value: string;
        noResponse?: boolean;
    }): Promise<string>;
    /**
     * Sets the value of a resource
     * @param options.value The value of the resource
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    setValue(options: {
        value: string;
        noResponse?: boolean;
    }, callback?: (err: any, data?: string) => any): any;
    /**
     * Execute a function on a resource
     * @param options.fn The function to trigger
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    execute(options?: {
        fn?: string;
        noResponse?: boolean;
    }): Promise<string>;
    /**
     * Execute a function on a resource
     * @param options.fn The function to trigger
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    execute(options: {
        fn?: string;
        noResponse?: boolean;
    }, callback?: (err: any, data?: string) => any): any;
    /**
     * Gets the status of a resource's subscription
     * @returns Promise containing resource subscription status
     */
    getSubscription(): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    getSubscription(callback: (err: any, data?: boolean) => any): any;
    /**
     * Subscribe to a resource
     * @param options.fn Function to call with notification
     * @returns Promise containing any error
     */
    private addSubscription(options?);
    /**
     * Subscribe to a resource
     * @param options.fn Function to call with notification
     * @param callback A function that is passed any error
     */
    private addSubscription(options?, callback?);
    /**
     * Deletes a resource's subscription
     * @returns Promise containing any error
     */
    private deleteSubscription();
    /**
     * Deletes a resource's subscription
     * @param callback A function that is passed any error
     */
    private deleteSubscription(callback?);
    /**
     * Deletes a resource
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    delete(options?: {
        noResponse?: boolean;
    }): Promise<string>;
    /**
     * Deletes a resource
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    delete(options?: {
        noResponse?: boolean;
    }, callback?: (err: any, data?: string) => any): any;
}
export interface Resource extends ResourceType {
}
