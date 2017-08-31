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

import { CallbackFn } from "../../common/interfaces";
import { asyncStyle } from "../../common/functions";
import { ConnectApi } from "../connectApi";
import { Resource } from "./resource";

/**
 * Connected Device
 */
export class ConnectedDevice {

    /**
     * The ID of the device
     */
    public readonly id: string;
    /**
     * Determines whether the device is in queue mode.
     */
    public readonly queueMode?: boolean;
    /**
     * Type of endpoint. (Free text)
     */
    public readonly type?: string;

    constructor(init?: Partial<ConnectedDevice>, private _api?: ConnectApi) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }

    /**
     * List device's resources
     * @returns Promise of device resources
     */
    public listResources(): Promise<Resource[]>;
    /**
     * List device's resources
     * @param callback A function that is passed the arguments (error, resources)
     */
    public listResources(callback: CallbackFn<Resource[]>): void;
    public listResources(callback?: CallbackFn<Resource[]>): Promise<Resource[]> {
        return asyncStyle(done => {
            this._api.listResources(this.id, done);
        }, callback);
    }

    /**
     * List a device's subscriptions
     * @returns Promise containing the subscriptions
     */
    public listSubscriptions(): Promise<any>;
    /**
     * List a device's subscriptions
     * @param callback A function that is passed (error, subscriptions)
     */
    public listSubscriptions(callback: CallbackFn<any>): void;
    public listSubscriptions(callback?: CallbackFn<any>): Promise<any> {
        return asyncStyle(done => {
            this._api.listDeviceSubscriptions(this.id, done);
        }, callback);
    }

    /**
     * Removes a device's subscriptions
     * @returns Promise containing any error
     */
    public deleteSubscriptions(): Promise<void>;
    /**
     * Removes a device's subscriptions
     * @param callback A function that is passed any error
     */
    public deleteSubscriptions(callback: CallbackFn<void>): void;
    public deleteSubscriptions(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteDeviceSubscriptions(this.id, done);
        }, callback);
    }

    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @returns Promise of resource value when handling notifications or an asyncId
     */
    public getResourceValue(path: string, cacheOnly?: boolean, noResponse?: boolean): Promise<string | number | { [key: string]: string | number }>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when handling notifications or an asyncId
     */
    public getResourceValue(path: string, cacheOnly?: boolean, noResponse?: boolean, callback?: CallbackFn<string | number | { [key: string]: string | number }>): void;
    public getResourceValue(path: string, cacheOnly?: boolean, noResponse?: boolean, callback?: CallbackFn<string | number | { [key: string]: string | number }>): Promise<string | number | { [key: string]: string | number }> {
        return asyncStyle(done => {
            this._api.getResourceValue(this.id, path, cacheOnly, noResponse, done);
        }, callback);
    }

    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    public setResourceValue(path: string, value: string, noResponse?: boolean): Promise<string>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    public setResourceValue(path: string, value: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
    public setResourceValue(path: string, value: string, noResponse?: boolean, callback?: CallbackFn<string>): Promise<string> {
        return asyncStyle(done => {
            this._api.setResourceValue(this.id, path, value, noResponse, done);
        }, callback);
    }

    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    public executeResource(path: string, functionName?: string, noResponse?: boolean): Promise<string>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    public executeResource(path: string, functionName?: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
    public executeResource(path: string, functionName?: string, noResponse?: boolean, callback?: CallbackFn<string>): Promise<string> {
        return asyncStyle(done => {
            this._api.executeResource(this.id, path, functionName, noResponse, done);
        }, callback);
    }

    /**
     * Gets the status of a resource's subscription
     * @param path Resource path
     * @returns Promise containing resource subscription status
     */
    public getResourceSubscription(path: string): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     * @param path Resource path
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    public getResourceSubscription(path: string, callback: CallbackFn<boolean>): void;
    public getResourceSubscription(path: string, callback?: CallbackFn<boolean>): Promise<boolean> {
        return asyncStyle(done => {
            this._api.getResourceSubscription(this.id, path, done);
        }, callback);
    }

    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param notifyFn Function to call with notification
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    public addResourceSubscription(path: string, notifyFn?: (any) => any): Promise<string>;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    public addResourceSubscription(path: string, notifyFn?: (any) => any, callback?: CallbackFn<string>): void;
    public addResourceSubscription(path: string, notifyFn?: (any) => any, callback?: CallbackFn<string>): Promise<string> {
        return asyncStyle(done => {
            this._api.addResourceSubscription(this.id, path, notifyFn, done);
        }, callback);
    }

    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @returns Promise containing an asyncId when there isn't a notification channel
     */
    public deleteResourceSubscription(path: string): Promise<string>;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param path Resource path
     * @param callback A function that is passed the arguments (error, value) where value is an asyncId when there isn't a notification channel
     */
    public deleteResourceSubscription(path: string, callback: CallbackFn<string>): void;
    public deleteResourceSubscription(path: string, callback?: CallbackFn<string>): Promise<string> {
        return asyncStyle(done => {
            this._api.deleteResourceSubscription(this.id, path, done);
        }, callback);
    }

    /**
     * Deletes a resource
     * @param path Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    public deleteResource(path: string, noResponse?: boolean): Promise<string>;
    /**
     * Deletes a resource
     * @param path Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    public deleteResource(path: string, noResponse?: boolean, callback?: CallbackFn<string>): void;
    public deleteResource(path: string, noResponse?: boolean, callback?: CallbackFn<string>): Promise<string> {
        return asyncStyle(done => {
            this._api.deleteResource(this.id, path, noResponse, done);
        }, callback);
    }
}
