import { CallbackFn } from "../../common/interfaces";
import { ConnectApi } from "../connectApi";
import { Resource } from "./resource";
import { Device } from "../../deviceDirectory/models/device";
import { AsyncResponse } from "../types";
/**
 * Connected Device
 */
export declare class ConnectedDevice extends Device {
    private _connectApi?;
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
     * @returns empty Promise
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
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The requested mime type format of the value
     * @returns Promise of resource value
     */
    getResourceValue(resourcePath: string, timeout?: number, mimeType?: string): Promise<string | number | void>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The requested mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is the resource value
     */
    getResourceValue(resourcePath: string, timeout?: number, mimeType?: string, callback?: CallbackFn<string | number | void>): void;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param value The value of the resource
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The mime type format of the value
     * @returns the AsyncResponse
     */
    setResourceValue(resourcePath: string, value: string, timeout?: number, mimeType?: string): Promise<AsyncResponse>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param value The value of the resource
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The mime type format of the value
     * @param callback A function that is passed any error
     */
    setResourceValue(resourcePath: string, value: string, timeout?: number, mimeType?: string, callback?: CallbackFn<AsyncResponse>): void;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param payload The payload to be sent to the device.
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The content type of the payload
     * @param accepts The content type of an accepted response
     * @returns the AsyncResponse
     */
    executeResource(resourcePath: string, payload?: any, timeout?: number, mimeType?: string, accepts?: string): Promise<AsyncResponse>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param payload The payload to be sent to the device.
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The content type of the payload
     * @param accepts The content type of an accepted response
     * @param callback A function that is passed any error
     */
    executeResource(resourcePath: string, payload?: any, timeout?: number, mimeType?: string, accepts?: string, callback?: CallbackFn<AsyncResponse>): void;
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
     * @returns empty Promise
     */
    addResourceSubscription(resourcePath: string, notifyFn?: (any: any) => any): Promise<void>;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed any error
     */
    addResourceSubscription(resourcePath: string, notifyFn?: (any: any) => any, callback?: CallbackFn<void>): void;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @returns empty Promise
     */
    deleteResourceSubscription(resourcePath: string): Promise<void>;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param callback A function that is passed any error
     */
    deleteResourceSubscription(resourcePath: string, callback: CallbackFn<void>): void;
}
