/// <reference types="node" />
import { connectionOptions } from "../helpers/connectionOptions";
import { EventEmitter } from "events";
import { EndpointsApi, NotificationsApi, ResourcesApi, SubscriptionsApi } from "../_api/mds";
/**
* Root Devices object
*/
export declare class Devices extends EventEmitter {
    private _apis;
    private _pollRequest;
    static polling: boolean;
    static asyncFns: {
        [key: string]: Function;
    };
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
    constructor(options: connectionOptions);
    getEndpoints(options?: {
        type?: string;
    }): Promise<Devices.Endpoint[]>;
    getEndpoints(options?: {
        type?: string;
    }, callback?: (err: any, data?: Devices.Endpoint[]) => void): void;
    /**
    * Begins long polling constantly for notifications
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    startNotifications(options?: {
        requestCallback?: (err: any, data?: any) => any;
    }, callback?: (err: any, data?: void) => void): Promise<void>;
    /**
    * Stops long polling for notifications
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    stopNotifications(callback?: (err: any, data?: void) => void): Promise<void>;
    /**
    * Gets the current callback data
    * @param callback A function that is passed the arguments (error, callbackData)
    * @returns Optional Promise containing the callback data
    */
    getCallback(callback?: (err: any, data?: Devices.Webhook) => void): Promise<Devices.Webhook>;
    /**
    * Puts callback data
    * @param data callback data
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    putCallback(options: {
        data: Devices.Webhook;
    }, callback?: (err: any, data?: void) => void): Promise<void>;
    /**
    * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    deleteCallback(callback?: (err: any, data?: void) => void): Promise<void>;
    /**
    * Gets pre-subscription data
    * @param callback A function that is passed (error, data)
    * @returns Optional Promise containing data
    */
    getSubscriptionData(callback?: (err: any, data?: any) => void): Promise<any>;
    /**
    * Puts pre-subscription data
    * @param data The pre-subscription data
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    putSubscriptionData(options: {
        presubsription: string[];
    }, callback?: (err: any, data?: void) => void): Promise<void>;
    /**
    * Removes all subscriptions
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    deleteSubscriptions(callback?: (err: any, data?: void) => void): Promise<void>;
}
export declare namespace Devices {
    function decode(data: any): string;
    interface Webhook {
        /**
        * The URL to which the notifications must be sent
        */
        url?: string;
        /**
        * Headers (key/value) that must be sent with the request
        */
        headers?: {};
    }
    class APIContainer {
        epAPI: EndpointsApi;
        notAPI: NotificationsApi;
        resAPI: ResourcesApi;
        subAPI: SubscriptionsApi;
        constructor(options: connectionOptions);
    }
    interface ResourceValueOptions {
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
    type Statuses = "ACTIVE" | "STALE";
    interface EndpointOptions {
        /**
        * Unique identifier representing the endpoint
        */
        name?: string;
        /**
        * Type of endpoint. (Free text)
        */
        type?: string;
        /**
        * Possible values ACTIVE, STALE
        */
        status?: Statuses;
        /**
        * Determines whether the device is in queue mode
        */
        queueMode?: boolean;
    }
    /**
    * Endpoint object
    */
    class Endpoint {
        private _apis;
        constructor(_apis: APIContainer, options: EndpointOptions);
        getResources(): Promise<Resource[]>;
        getResources(callback: (err: any, data?: Resource[]) => void): void;
        /**
        * Deletes a resource
        * @param path Path of the resource to delete
        * @param noResp Whether to make a non-confirmable request to the device
        * @param callback A function that is passed any error
        * @returns Optional Promise containing any error
        */
        deleteResource(options: {
            path: string;
            noResp?: boolean;
        }, callback?: (err: any, data?: void) => void): Promise<void>;
        /**
        * Gets a list of an endpoint's subscriptions
        * @param callback A function that is passed (error, subscriptions)
        * @returns Optional Promise containing the subscriptions
        */
        getSubscriptions(callback?: (err: any, data?: any) => void): Promise<any>;
        /**
        * Removes an endpoint's subscriptions
        * @param callback A function that is passed any error
        * @returns Optional Promise containing any error
        */
        deleteSubscriptions(callback?: (err: any, data?: void) => void): Promise<void>;
    }
    interface Endpoint extends EndpointOptions {
    }
    interface ResourceOptions {
        /**
        * Whether you can subscribe to changes for this resource
        */
        obs: boolean;
        /**
        * Resource's type
        */
        rt: string;
        /**
        * The content type of the resource
        */
        type: string;
        /**
        * Resource's url
        */
        uri: string;
        /**
        * The endpoint the resource belongs to
        */
        endpoint: Endpoint;
    }
    /**
    * Resource object
    */
    class Resource {
        private _apis;
        constructor(_apis: APIContainer, options: ResourceOptions);
        getValue(options?: ResourceValueOptions): Promise<string>;
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
        putSubscription(callback?: (err: any, data?: void) => void): Promise<void>;
        /**
        * Deletes a resource's subscription
        * @param callback A function that is passed any error
        * @returns Optional Promise containing any error
        */
        deleteSubscription(callback?: (err: any, data?: void) => void): Promise<void>;
    }
    interface Resource extends ResourceOptions {
    }
}
