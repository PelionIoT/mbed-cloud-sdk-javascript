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
     * Resource's url
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
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    private addSubscription(notifyFn?);
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    private addSubscription(notifyFn?, callback?);
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    private deleteSubscription();
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    private deleteSubscription(callback);
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @returns Promise of resource value when handling notifications or an asyncId
     */
    getValue(cacheOnly?: boolean, noResponse?: boolean): Promise<string | number | {
        [key: string]: string | number;
    }>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when handling notifications or an asyncId
     */
    getValue(cacheOnly?: boolean, noResponse?: boolean, callback?: CallbackFn<string | number | {
        [key: string]: string | number;
    }>): void;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    setValue(value: string, noResponse?: boolean): Promise<string>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    setValue(value: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    execute(functionName?: string, noResponse?: boolean): Promise<string>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    execute(functionName?: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
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
     * @returns Promise containing any error
     */
    delete(noResponse?: boolean): Promise<string>;
    /**
     * Deletes a resource
     * @param noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    delete(noResponse?: boolean, callback?: CallbackFn<string>): void;
}
