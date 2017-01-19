/// <reference types="node" />
import { EventEmitter } from "events";
import { ResourceType } from "./types";
import { Resource as apiResourceType } from "../_api/mds";
/**
 * Resource
 */
export declare class Resource extends EventEmitter {
    private _deviceId;
    /**
     * Resource notification event
     * @event
     */
    static EVENT_NOTIFICATION: string;
    constructor(_deviceId: string, options: ResourceType);
    static map(from: apiResourceType, deviceId: string): Resource;
    /**
     * Gets the value of a resource
     * @param options.cacheOnly If true, the response will come only from the cache
     * @param options.noResponse If true, If true, mbed Device Connector will not wait for a response
     * @returns Promise of resource value when long polling or an asyncId
     */
    getValue(options?: {
        cacheOnly?: boolean;
        noResponse?: boolean;
    }): Promise<string>;
    /**
     * Gets the value of a resource
     * @param options.cacheOnly If true, the response will come only from the cache
     * @param options.noResponse If true, If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when long polling or an asyncId
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
    }): Promise<void>;
    /**
     * Sets the value of a resource
     * @param options.value The value of the resource
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    setValue(options: {
        value: string;
        noResponse?: boolean;
    }, callback?: (err: any, data?: void) => any): any;
    /**
     * Execute a function on a resource
     * @param options.function The function to trigger
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    execute(options: {
        function?: string;
        noResponse?: boolean;
    }): Promise<void>;
    /**
     * Execute a function on a resource
     * @param options.function The function to trigger
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    execute(options: {
        function?: string;
        noResponse?: boolean;
    }, callback?: (err: any, data?: void) => any): any;
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
     * @returns Promise containing any error
     */
    private addSubscription();
    /**
     * Subscribe to a resource
     * @param callback A function that is passed any error
     */
    private addSubscription(callback?);
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
}
export interface Resource extends ResourceType {
}
