import { CallbackFn } from "../../common/interfaces";
import { ConnectApi } from "../connectApi";
import { Resource } from "./resource";
import { Device } from "../../deviceDirectory/models/device";
/**
 * Connected Device
 */
export declare class ConnectedDevice extends Device {
    private _connectApi;
    constructor(init?: Partial<Device>, _connectApi?: ConnectApi);
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
     * Get a resource
     *
     * @param resourcePath Path of the resource to get
     * @returns Promise of device resource
     */
    getResource(resourcePath: string): Promise<Resource>;
    /**
     * Get a resource
     *
     * @param resourcePath Path of the resource to get
     * @param callback A function that is passed the arguments (error, resource)
     */
    getResource(resourcePath: string, callback?: CallbackFn<Resource>): void;
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
     * @param resourcePath Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The requested mime type format of the value
     * @returns Promise of resource value when handling notifications or an asyncId
     */
    getResourceValue(resourcePath: string, cacheOnly?: boolean, noResponse?: boolean, mimeType?: string): Promise<string | number | {
        [key: string]: string | number;
    }>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The requested mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when handling notifications or an asyncId
     */
    getResourceValue(resourcePath: string, cacheOnly?: boolean, noResponse?: boolean, mimeType?: string, callback?: CallbackFn<string | number | {
        [key: string]: string | number;
    }>): void;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    setResourceValue(resourcePath: string, value: string, noResponse?: boolean, mimeType?: string): Promise<string>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    setResourceValue(resourcePath: string, value: string, noResponse?: boolean, mimeType?: string, callback?: CallbackFn<string>): void;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    executeResource(resourcePath: string, functionName?: string, noResponse?: boolean, mimeType?: string): Promise<string>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    executeResource(resourcePath: string, functionName?: string, noResponse?: boolean, mimeType?: string, callback?: CallbackFn<string>): void;
    /**
     * Gets the status of a resource's subscription
     * @param resourcePath Resource path
     * @returns Promise containing resource subscription status
     */
    getResourceSubscription(resourcePath: string): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     * @param resourcePath Resource path
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    getResourceSubscription(resourcePath: string, callback: CallbackFn<boolean>): void;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param notifyFn Function to call with notification
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    addResourceSubscription(resourcePath: string, notifyFn?: (any) => any): Promise<string>;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    addResourceSubscription(resourcePath: string, notifyFn?: (any) => any, callback?: CallbackFn<string>): void;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    deleteResourceSubscription(resourcePath: string): Promise<string>;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    deleteResourceSubscription(resourcePath: string, callback: CallbackFn<string>): void;
    /**
     * Deletes a resource
     * @param resourcePath Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    deleteResource(resourcePath: string, noResponse?: boolean): Promise<string>;
    /**
     * Deletes a resource
     * @param resourcePath Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    deleteResource(resourcePath: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
}
