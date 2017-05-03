/* 
* mbed Cloud JavaScript SDK
* Copyright ARM Limited 2017
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
import { ConnectApi } from "../index";

/**
 * Resource
 */
export class Resource extends EventEmitter {

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

    /**
     * Resource notification event which returns the notification when handling notifications, otherwise an asyncId
     * @event
     */
    static EVENT_NOTIFICATION: string = "notification";

    constructor(init?: Partial<Resource>, private _api?: ConnectApi) {
        super();
        for(var key in init) {
            this[key] = init[key];
        }

        this.on("newListener", (eventName) => {
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

        this.on("removeListener", (eventName) => {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                if (this.listenerCount(Resource.EVENT_NOTIFICATION) === 0) {
                    this.deleteSubscription();
                }
            }
        });
    }

    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise of resource value when handling notifications or an asyncId
     */
    public getValue(cacheOnly?: boolean, noResponse?: boolean): Promise<string>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when handling notifications or an asyncId
     */
    public getValue(cacheOnly?: boolean, noResponse?: boolean, callback?: CallbackFn<string>): void;
    public getValue(cacheOnly?: boolean, noResponse?: boolean, callback?: CallbackFn<string>): Promise<string> {
        return asyncStyle(done => {
            this._api.getResourceValue(this.deviceId, this.path, cacheOnly, noResponse, done);
        }, callback);
    }

    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param value The value of the resource
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    public setValue(value: string, noResponse?: boolean): Promise<string>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param value The value of the resource
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    public setValue(value: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
    public setValue(value: string, noResponse?: boolean, callback?: CallbackFn<string>): Promise<string> {
        return asyncStyle(done => {
            this._api.setResourceValue(this.deviceId, this.path, value, noResponse, done);
        }, callback);
    }

    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param functionName The function to trigger
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    public execute(functionName?: string, noResponse?: boolean): Promise<string>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param functionName The function to trigger
     * @param noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    public execute(functionName?: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
    public execute(functionName?: string, noResponse?: boolean, callback?: CallbackFn<string>): Promise<string> {
        return asyncStyle(done => {
            this._api.executeResource(this.deviceId, this.path, functionName, noResponse, done);
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
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param notifyFn Function to call with notification
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    private addSubscription(notifyFn?: Function): Promise<string>;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    private addSubscription(notifyFn?: Function, callback?: CallbackFn<string>): void;
    private addSubscription(notifyFn?: Function, callback?: CallbackFn<string>): Promise<string> {
        return asyncStyle(done => {
            if (!this.observable) return done(null, null);
            this._api.addResourceSubscription(this.deviceId, this.path, done, notifyFn);
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
    public delete(noResponse?: boolean, callback?: CallbackFn<string>): Promise<string> {
        return asyncStyle(done => {
            this._api.deleteResource(this.deviceId, this.path, noResponse, done);
        }, callback);
    }
}
