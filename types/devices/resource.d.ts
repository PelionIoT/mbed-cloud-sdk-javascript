/// <reference types="node" />
import { EventEmitter } from "events";
import { ResourceType } from "./types";
import { Api } from "./api";
export interface ResourceValueOptions {
    /**
    * If true, the response will come only from the cache
    */
    cacheOnly?: boolean;
    /**
    * If true, mbed Device Connector will not wait for a response
    * Creates a CoAP Non-Confirmable requests
    * If false, a response is expected and the CoAP request is confirmable
    * (default: false)
    */
    noResp?: boolean;
}
/**
* Resource object
*/
export declare class Resource extends EventEmitter {
    private _api;
    private _deviceId;
    /**
    * Resource notification event
    * @event
    */
    static EVENT_NOTIFICATION: string;
    constructor(_api: Api, _deviceId: string, options: ResourceType);
    getValue(options?: ResourceValueOptions): Promise<string | Object>;
    getValue(options?: ResourceValueOptions, callback?: (err: any, data?: string) => void): any;
    /**
    * Puts the value of a resource
    * @param value The value of the resource
    * @param noResp If true, mbed Device Connector will not wait for a response
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    putValue(options: {
        value: string;
        noResp?: boolean;
    }, callback?: (err: any, data?: void) => void): Promise<void>;
    /**
    * Execute a function on a resource
    * @param function The function to trigger
    * @param noResp If true, mbed Device Connector will not wait for a response
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    execute(options: {
        function?: string;
        noResp?: boolean;
    }, callback?: (err: any, data?: void) => void): Promise<void>;
    /**
    * Gets the status of a resource's subscription
    * @param callback A function that is passed (error, subscribed) where subscribed is true or false
    * @returns Optional Promise containing resource subscription status
    */
    getSubscription(callback?: (err: any, data?: boolean) => void): Promise<boolean>;
    /**
    * Subscribe to a resource
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    private createSubscription(callback?);
    /**
    * Deletes a resource's subscription
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    private deleteSubscription(callback?);
}
export interface Resource extends ResourceType {
}
