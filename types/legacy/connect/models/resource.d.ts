/// <reference types="node" />
import { EventEmitter } from "events";
import { CallbackFn } from "../../common/interfaces";
import { ConnectApi } from "../connectApi";
import { AsyncResponse } from "../types";
/**
 * Resource
 */
export declare class Resource extends EventEmitter {
    private _api?;
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
    private addSubscription;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @returns empty Promise
     */
    private deleteSubscription;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The requested mime type format of the value
     * @returns Promise of resource value
     */
    getValue(timeout?: number, mimeType?: string): Promise<string | number | void>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The requested mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is the resource value
     */
    getValue(timeout?: number, mimeType?: string, callback?: CallbackFn<string | number | void>): void;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param value The value of the resource
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The mime type format of the value
     * @returns the AsyncResponse
     */
    setValue(value: string, timeout?: number, mimeType?: string): Promise<AsyncResponse>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param value The value of the resource
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The mime type format of the value
     * @param callback A function that is passed any error
     */
    setValue(value: string, timeout?: number, mimeType?: string, callback?: CallbackFn<AsyncResponse>): void;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param payload The payload to be sent to the device.
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The content type of the payload
     * @param accepts The content type of an accepted response
     * @returns the AsyncResponse
     */
    execute(payload?: any, timeout?: number, mimeType?: string, accepts?: string): Promise<AsyncResponse>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param payload The payload to be sent to the device.
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The content type of the payload
     * @param accepts The content type of an accepted response
     * @param callback A function that is passed any error
     */
    execute(payload?: any, timeout?: number, mimeType?: string, accepts?: string, callback?: CallbackFn<AsyncResponse>): void;
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
}
