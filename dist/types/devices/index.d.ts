/// <reference types="node" />
import { EventEmitter } from "events";
import { ConnectionOptions, ListOptions } from "../helpers/interfaces";
import { DeviceDetail } from "./types";
import { Device } from "./device";
import { Resource } from "./resource";
import { Query } from "./query";
export interface Webhook {
    /**
    * The URL to which the notifications must be sent
    */
    url?: string;
    /**
    * Headers (key/value) that must be sent with the request
    */
    headers?: {};
}
/**
* Root Devices object
*/
export declare class Devices extends EventEmitter {
    private _api;
    private _pollRequest;
    static polling: boolean;
    static asyncFns: {
        [key: string]: Function;
    };
    static resourceSubs: {
        [key: string]: Resource;
    };
    /**
    * Resource notification event
    * @event
    */
    static EVENT_NOTIFICATION: string;
    /**
    * Device registration event
    * @event
    */
    static EVENT_REGISTRATION: string;
    /**
    * Device registration update event
    * @event
    */
    static EVENT_UPDATE: string;
    /**
    * Device de-registration event
    * @event
    */
    static EVENT_DEREGISTRATION: string;
    /**
    * Device registration expiration event
    * @event
    */
    static EVENT_EXPIRED: string;
    /**
    * @param options Options object
    */
    constructor(options: ConnectionOptions);
    createDevice(options?: DeviceDetail): Promise<Device>;
    createDevice(options?: DeviceDetail, callback?: (err: any, data?: Device) => void): void;
    deleteDevice(options?: {
        id: string;
    }): Promise<void>;
    deleteDevice(options?: {
        id: string;
    }, callback?: (err: any, data?: void) => void): void;
    getKnown(options?: ListOptions): Promise<Device[]>;
    getKnown(options?: ListOptions, callback?: (err: any, data?: Device[]) => void): void;
    getConnected(options?: {
        type?: string;
    }): Promise<Device[]>;
    getConnected(options?: {
        type?: string;
    }, callback?: (err: any, data?: Device[]) => void): void;
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
    getCallback(callback?: (err: any, data?: Webhook) => void): Promise<Webhook>;
    /**
    * Puts callback data
    * @param data callback data
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    putCallback(options: {
        data: Webhook;
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
    createQuery(options: {
        name: string;
        query: string;
        description?: string;
    }): Promise<Query>;
    createQuery(options: {
        name: string;
        query: string;
        description?: string;
    }, callback?: (err: any, data?: Query) => void): void;
    deleteQuery(options?: {
        id: string;
    }): Promise<void>;
    deleteQuery(options?: {
        id: string;
    }, callback?: (err: any, data?: void) => void): void;
    getQueries(options?: ListOptions): Promise<Query[]>;
    getQueries(options?: ListOptions, callback?: (err: any, data?: Query[]) => void): void;
    getQuery(options?: {
        id: string;
    }): Promise<Query>;
    getQuery(options?: {
        id: string;
    }, callback?: (err: any, data?: Query) => void): void;
    updateQuery(options?: {
        id: string;
        name?: string;
        query?: string;
        description?: string;
    }): Promise<Query>;
    updateQuery(options?: {
        id: string;
        name?: string;
        query?: string;
        description?: string;
    }, callback?: (err: any, data?: Query) => void): void;
}
