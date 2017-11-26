/*
* Mbed Cloud JavaScript SDK
* Copyright Arm Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { EventEmitter } from "events";
import { CallbackFn } from "../../common/interfaces";
import { asyncStyle } from "../../common/functions";
import { ConnectApi } from "../connectApi";

/**
 * Resource
 */
export class Resource extends EventEmitter {

    /**
     * Resource notification event which returns the notification when handling notifications, otherwise an asyncId
     * @event
     */
    public static EVENT_NOTIFICATION: string = "notification";

    /**
     * Related device ID
     */
    public readonly deviceId: string;
    /**
     * Resource's url
     */
    public readonly path: string;
    /**
     * Resource's type
     */
    public readonly type: string;
    /**
     * The content type of the resource
     */
    public readonly contentType: string;
    /**
     * Whether you can subscribe to changes for this resource
     */
    public readonly observable: boolean;

    constructor(init?: Partial<Resource>, private _api?: ConnectApi) {
        super();
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }

        this.on("newListener", eventName => {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                this.addSubscription(data => this.emit(Resource.EVENT_NOTIFICATION, data),
                (error, asyncID) => {
                    if (!error && !this._api.handleNotifications) {
                        // return the asyncID for use with web hooks
                        this.emit(Resource.EVENT_NOTIFICATION, asyncID);
                    }
                });
            }
        });

        this.on("removeListener", eventName => {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                if (this.listenerCount(Resource.EVENT_NOTIFICATION) === 0) {
                    this.deleteSubscription();
                }
            }
        });
    }

    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param notifyFn Function to call with notification
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    private addSubscription(notifyFn?: (any) => any): Promise<string>;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    private addSubscription(notifyFn?: (any) => any, callback?: CallbackFn<string>): void;
    private addSubscription(notifyFn?: (any) => any, callback?: CallbackFn<string>): Promise<string> {
        return asyncStyle(done => {
            if (!this.observable) return done(null, null);
            this._api.addResourceSubscription(this.deviceId, this.path, notifyFn, done);
        }, callback);
    }

    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    private deleteSubscription(): Promise<string>;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    private deleteSubscription(callback: CallbackFn<string>): void;
    private deleteSubscription(callback?: CallbackFn<string>): Promise<string> {
        return asyncStyle(done => {
            this._api.deleteResourceSubscription(this.deviceId, this.path, done);
        }, callback);
    }

    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param acceptType The requested mime type format of the value
     * @returns Promise of resource value when handling notifications or an asyncId
     */
    public getValue(cacheOnly?: boolean, noResponse?: boolean, acceptType?: string): Promise<string | number | { [key: string]: string | number }>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param acceptType The requested mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when handling notifications or an asyncId
     */
    public getValue(cacheOnly?: boolean, noResponse?: boolean, acceptType?: string, callback?: CallbackFn<string | number | { [key: string]: string | number }>): void;
    public getValue(cacheOnly?: any, noResponse?: any, acceptType?: any, callback?: CallbackFn<string | number | { [key: string]: string | number }>): Promise<string | number | { [key: string]: string | number }> {
        cacheOnly = cacheOnly || false;
        noResponse = noResponse || false;
        if (typeof acceptType === "function") {
            callback = acceptType;
            acceptType = null;
        }
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        if (typeof cacheOnly === "function") {
            callback = cacheOnly;
            cacheOnly = false;
        }

        return asyncStyle(done => {
            this._api.getResourceValue(this.deviceId, this.path, cacheOnly, noResponse, acceptType, done);
        }, callback);
    }

    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param contentType The mime type format of the value
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    public setValue(value: string, noResponse?: boolean, contentType?: string): Promise<string>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param contentType The mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    public setValue(value: string, noResponse?: boolean, contentType?: string, callback?: CallbackFn<string>): void;
    public setValue(value: string, noResponse?: any, contentType?: any, callback?: CallbackFn<string>): Promise<string> {
        noResponse = noResponse || false;
        if (typeof contentType === "function") {
            callback = contentType;
            contentType = null;
        }
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }

        return asyncStyle(done => {
            this._api.setResourceValue(this.deviceId, this.path, value, noResponse, contentType, done);
        }, callback);
    }

    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param contentType The mime type format of the value
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    public execute(functionName?: string, noResponse?: boolean, contentType?: string): Promise<string>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param contentType The mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    public execute(functionName?: string, noResponse?: boolean, contentType?: string, callback?: CallbackFn<string>): void;
    public execute(functionName?: any, noResponse?: any, contentType?: any, callback?: CallbackFn<string>): Promise<string> {
        noResponse = noResponse || false;
        if (typeof contentType === "function") {
            callback = contentType;
            contentType = null;
        }
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }
        if (typeof functionName === "function") {
            callback = functionName;
            functionName = null;
        }

        return asyncStyle(done => {
            this._api.executeResource(this.deviceId, this.path, functionName, noResponse, contentType, done);
        }, callback);
    }

    /**
     * Gets the status of a resource's subscription
     * @returns Promise containing resource subscription status
     */
    public getSubscription(): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    public getSubscription(callback: CallbackFn<boolean>): void;
    public getSubscription(callback?: CallbackFn<boolean>): Promise<boolean> {
        return asyncStyle(done => {
            if (!this.observable) return done(null, false);
            this._api.getResourceSubscription(this.deviceId, this.path, done);
        }, callback);
    }

    /**
     * Deletes a resource
     * @param noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    public delete(noResponse?: boolean): Promise<string>;
    /**
     * Deletes a resource
     * @param noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    public delete(noResponse?: boolean, callback?: CallbackFn<string>): void;
    public delete(noResponse?: any, callback?: CallbackFn<string>): Promise<string> {
        noResponse = noResponse || false;
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }

        return asyncStyle(done => {
            this._api.deleteResource(this.deviceId, this.path, noResponse, done);
        }, callback);
    }
}
