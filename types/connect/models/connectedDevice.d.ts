import { CallbackFn } from "../../common/interfaces";
import { ConnectApi } from "../connectApi";
import { Resource } from "./resource";
/**
 * Connected Device
 */
export declare class ConnectedDevice {
    private _api;
    /**
     * The ID of the device
     */
    readonly id: string;
    /**
     * Determines whether the device is in queue mode.
     */
    readonly queueMode?: boolean;
    /**
     * Type of endpoint. (Free text)
     */
    readonly type?: string;
    constructor(init?: Partial<ConnectedDevice>, _api?: ConnectApi);
    /**
     * List device's resources
     * @returns Promise of device resources
     */
    listResources(): Promise<Array<Resource>>;
    /**
     * List device's resources
     * @param callback A function that is passed the arguments (error, resources)
     */
    listResources(callback: CallbackFn<Array<Resource>>): void;
    /**
     * List a device's subscriptions
     * @returns Promise containing the subscriptions
     */
    listSubscriptions(): Promise<string>;
    /**
     * List a device's subscriptions
     * @param callback A function that is passed (error, subscriptions)
     */
    listSubscriptions(callback: CallbackFn<string>): void;
    /**
     * Removes a device's subscriptions
     * @returns Promise containing any error
     */
    deleteSubscriptions(): Promise<void>;
    /**
     * Removes a device's subscriptions
     * @param callback A function that is passed any error
     */
    deleteSubscriptions(callback: CallbackFn<void>): void;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @returns Promise of resource value when handling notifications or an asyncId
     */
    getResourceValue(path: string, cacheOnly?: boolean, noResponse?: boolean): Promise<string | number | {
        [key: string]: string | number;
    }>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when handling notifications or an asyncId
     */
    getResourceValue(path: string, cacheOnly?: boolean, noResponse?: boolean, callback?: CallbackFn<string | number | {
        [key: string]: string | number;
    }>): void;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    setResourceValue(path: string, value: string, noResponse?: boolean): Promise<string>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    setResourceValue(path: string, value: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    executeResource(path: string, functionName?: string, noResponse?: boolean): Promise<string>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    executeResource(path: string, functionName?: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
    /**
     * Gets the status of a resource's subscription
     * @param path Resource path
     * @returns Promise containing resource subscription status
     */
    getResourceSubscription(path: string): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     * @param path Resource path
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    getResourceSubscription(path: string, callback: CallbackFn<boolean>): void;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param notifyFn Function to call with notification
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    addResourceSubscription(path: string, notifyFn?: (any) => any): Promise<string>;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    addResourceSubscription(path: string, notifyFn?: (any) => any, callback?: CallbackFn<string>): void;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    deleteResourceSubscription(path: string): Promise<string>;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    deleteResourceSubscription(path: string, callback: CallbackFn<string>): void;
    /**
     * Deletes a resource
     * @param path Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    deleteResource(path: string, noResponse?: boolean): Promise<string>;
    /**
     * Deletes a resource
     * @param path Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    deleteResource(path: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
}
