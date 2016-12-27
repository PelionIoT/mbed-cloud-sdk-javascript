/// <reference types="node" />
import { EventEmitter } from "events";
import { EndpointsApi } from "./_api/mds";
export interface DevicesOptions {
    /**
    * Access Key for your mbed Device Connector account
    */
    accessKey: string;
    /**
    * URL for mbed Device Connector API
    */
    host?: string;
}
export interface ResourceValueOptions {
    /**
    * If true, the response will come only from the cache
    * (default: false)
    */
    cacheOnly?: boolean;
    /**
    * If true, mbed Device Connector will not wait for a response
    * Creates a CoAP Non-Confirmable requests
    * If false, a response is expected and the CoAP request is confirmable
    * (default: false)
    */
    noResp?: string;
}
export interface CallbackData {
    /**
    * The callback URL
    */
    url: string;
    /**
    * The headers that should be set when mbed Cloud Connect puts to the given callback URL
    */
    headers?: any;
}
/**
* Root Devices object
*/
export declare class Devices extends EventEmitter {
    private api;
    /**
    * Resource notification event
    * @event
    */
    static EVENT_NOTIFICATION: string;
    /**
    * Endpoint registration event
    * @event
    */
    static EVENT_REGISTRATION: string;
    /**
    * Endpoint registration update event
    * @event
    */
    static EVENT_UPDATE: string;
    /**
    * Endpoint de-registration event
    * @event
    */
    static EVENT_DEREGISTRATION: string;
    /**
    * Endpoint registration expiration event
    * @event
    */
    static EVENT_EXPIRED: string;
    /**
    * @param options Options object
    */
    constructor(options: DevicesOptions);
    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    getEndpoints(type?: string, callback?: Function): Promise<Endpoint[]>;
    /**
    * Begins long polling constantly for notifications
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    startNotifications(callback?: Function): Promise<void>;
    /**
    * Stops long polling for notifications
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    stopNotifications(callback?: Function): Promise<void>;
    /**
    * Gets the current callback data
    * @param callback A function that is passed the arguments (error, callbackData)
    * @returns Optional Promise containing the callback data
    */
    getCallback(callback?: Function): Promise<CallbackData>;
    /**
    * Puts callback data
    * @param data callback data
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    putCallback(data: CallbackData, callback?: Function): Promise<void>;
    /**
    * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    deleteCallback(callback?: Function): Promise<void>;
    /**
    * Gets pre-subscription data
    * @param callback A function that is passed (error, data)
    * @returns Optional Promise containing data
    */
    getSubscriptionData(callback?: Function): Promise<any>;
    /**
    * Puts pre-subscription data
    * @param data The pre-subscription data
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    putSubscriptionData(data: any, callback?: Function): Promise<void>;
    /**
    * Removes all subscriptions
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    deleteSubscriptions(callback?: Function): Promise<void>;
}
/**
* Endpoint object
*/
export declare class Endpoint {
    private api;
    name: any;
    status: any;
    type: any;
    constructor(api: EndpointsApi, options: any);
    /**
    * Gets a list of an endpoint's resources
    * @param callback A function that is passed the arguments (error, resources)
    * @returns Optional Promise of endpoint resources
    */
    getResources(callback?: Function): Promise<Resource[]>;
    /**
    * Adds a new resource
    * @param path The path of the resource
    * @param value The value of the resource
    * @param options Options object
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    postResource(path: string, value?: string, options?: ResourceValueOptions, callback?: Function): Promise<void>;
    /**
    * Deletes a resource
    * @param path Path of the resource to delete
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    deleteResource(path?: string, callback?: Function): Promise<void>;
    /**
    * Gets a list of an endpoint's subscriptions
    * @param callback A function that is passed (error, subscriptions)
    * @returns Optional Promise containing the subscriptions
    */
    getSubscriptions(callback?: Function): Promise<any>;
    /**
    * Removes an endpoint's subscriptions
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    deleteSubscriptions(callback?: Function): Promise<void>;
}
/**
* Resource object
*/
export declare class Resource {
    private api;
    obs: any;
    rt: any;
    type: any;
    uri: any;
    constructor(api: EndpointsApi, options: any);
    /**
    * Gets the value of a resource
    * @param options Options object
    * @param callback A function that is passed the arguments (error, value) where value is the value of the resource formatted as a string
    * @returns Optional Promise of resource value
    */
    getValue(options?: ResourceValueOptions, callback?: Function): Promise<string>;
    /**
    * Puts the value of a resource
    * @param value The value of the resource
    * @param options Options object
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    putValue(value: string, options?: ResourceValueOptions, callback?: Function): Promise<void>;
    /**
    * Gets the status of a resource's subscription
    * @param callback A function that is passed (error, subscribed) where subscribed is true or false
    * @returns Optional Promise containing resource subscription status
    */
    getSubscription(callback?: Function): Promise<boolean>;
    /**
    * Puts a subscription to a resource
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    putSubscription(callback?: Function): Promise<void>;
    /**
    * Deletes a resource's subscription
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    deleteSubscription(callback?: Function): Promise<void>;
}
