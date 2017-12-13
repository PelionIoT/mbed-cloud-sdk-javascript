/// <reference types="node" />
import { EventEmitter } from "events";
import { CallbackFn } from "../../common/interfaces";
import { ConnectApi } from "../connectApi";
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
    /**
     * Related device ID
     */
    readonly deviceId: string;
    /**
     * Resource's URL
     */
    readonly path: string;
    /**
     * Resource's type
     */
    readonly type: string;
    /**
     * The content type of the resource
     */
    readonly contentType: string;
    /**
     * Whether you can subscribe to changes for this resource
     */
    readonly observable: boolean;
    constructor(init?: Partial<Resource>, _api?: ConnectApi);
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param notifyFn Function to call with notification
     * @returns empty Promise
     */
    private addSubscription(notifyFn?);
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed any error
     */
    private addSubscription(notifyFn?, callback?);
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @returns empty Promise
     */
    private deleteSubscription();
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param callback A function that is passed any error
     */
    private deleteSubscription(callback);
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The requested mime type format of the value
     * @returns Promise of resource value
     */
    getValue(cacheOnly?: boolean, noResponse?: boolean, mimeType?: string): Promise<string | number | void>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The requested mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is the resource value
     */
    getValue(cacheOnly?: boolean, noResponse?: boolean, mimeType?: string, callback?: CallbackFn<string | number | void>): void;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @returns empty Promise
     */
    setValue(value: string, noResponse?: boolean, mimeType?: string): Promise<void>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @param callback A function that is passed any error
     */
    setValue(value: string, noResponse?: boolean, mimeType?: string, callback?: CallbackFn<void>): void;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @returns empty Promise
     */
    execute(functionName?: string, noResponse?: boolean, mimeType?: string): Promise<void>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @param callback A function that is passed any error
     */
    execute(functionName?: string, noResponse?: boolean, mimeType?: string, callback?: CallbackFn<void>): void;
    /**
     * Gets the status of a resource's subscription
     * @returns Promise containing resource subscription status
     */
    getSubscription(): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    getSubscription(callback: CallbackFn<boolean>): void;
    /**
     * Deletes a resource
     * @param noResponse Whether to make a non-confirmable request to the device
     * @returns empty Promise
     */
    delete(noResponse?: boolean): Promise<void>;
    /**
     * Deletes a resource
     * @param noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    delete(noResponse?: boolean, callback?: CallbackFn<void>): void;
}
