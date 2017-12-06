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
import { Device } from "../../deviceDirectory/models/device";

/**
 * Connected Device
 */
export class ConnectedDevice extends Device {

    constructor(init?: Partial<Device>, private _connectApi?: ConnectApi) {
        super();
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
    public listResources(): Promise<Array<Resource>>;
    /**
     * List device's resources
     * @param callback A function that is passed the arguments (error, resources)
     */
    public listResources(callback: CallbackFn<Array<Resource>>): void;
    public listResources(callback?: CallbackFn<Array<Resource>>): Promise<Array<Resource>> {
        return asyncStyle(done => {
            this._connectApi.listResources(this.id, done);
        }, callback);
    }

    /**
     * Get a resource
     *
     * @param resourcePath Path of the resource to get
     * @returns Promise of device resource
     */
    public getResource(resourcePath: string): Promise<Resource>;
    /**
     * Get a resource
     *
     * @param resourcePath Path of the resource to get
     * @param callback A function that is passed the arguments (error, resource)
     */
    public getResource(resourcePath: string, callback?: CallbackFn<Resource>): void;
    public getResource(resourcePath: string, callback?: CallbackFn<Resource>): Promise<Resource> {

        return asyncStyle(done => {
            this._connectApi.getResource(this.id, resourcePath, done);
        }, callback);
    }

    /**
     * List a device's subscriptions
     * @returns Promise containing the subscriptions
     */
    public listSubscriptions(): Promise<string>;
    /**
     * List a device's subscriptions
     * @param callback A function that is passed (error, subscriptions)
     */
    public listSubscriptions(callback: CallbackFn<string>): void;
    public listSubscriptions(callback?: CallbackFn<string>): Promise<string> {
        return asyncStyle(done => {
            this._connectApi.listDeviceSubscriptions(this.id, done);
        }, callback);
    }

    /**
     * Removes a device's subscriptions
     * @returns empty Promise
     */
    public deleteSubscriptions(): Promise<void>;
    /**
     * Removes a device's subscriptions
     * @param callback A function that is passed any error
     */
    public deleteSubscriptions(callback: CallbackFn<void>): void;
    public deleteSubscriptions(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._connectApi.deleteDeviceSubscriptions(this.id, done);
        }, callback);
    }

    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The requested mime type format of the value
     * @returns Promise of resource value
     */
    public getResourceValue(resourcePath: string, cacheOnly?: boolean, noResponse?: boolean, mimeType?: string): Promise<string | number | void>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param cacheOnly If true, the response will come only from the cache
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The requested mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is the resource value
     */
    public getResourceValue(resourcePath: string, cacheOnly?: boolean, noResponse?: boolean, mimeType?: string, callback?: CallbackFn<string | number | void>): void;
    public getResourceValue(resourcePath: string, cacheOnly?: any, noResponse?: any, mimeType?: any, callback?: CallbackFn<string | number | void>): Promise<string | number | void> {
        cacheOnly = cacheOnly || false;
        noResponse = noResponse || false;
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
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
            this._connectApi.getResourceValue(this.id, resourcePath, cacheOnly, noResponse, mimeType, done);
        }, callback);
    }

    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @returns empty Promise
     */
    public setResourceValue(resourcePath: string, value: string, noResponse?: boolean, mimeType?: string): Promise<void>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param value The value of the resource
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @param callback A function that is passed any error
     */
    public setResourceValue(resourcePath: string, value: string, noResponse?: boolean, mimeType?: string, callback?: CallbackFn<void>): void;
    public setResourceValue(resourcePath: string, value: string, noResponse?: any, mimeType?: any, callback?: CallbackFn<void>): Promise<void> {
        noResponse = noResponse || false;
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }

        return asyncStyle(done => {
            this._connectApi.setResourceValue(this.id, resourcePath, value, noResponse, mimeType, done);
        }, callback);
    }

    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @returns empty Promise
     */
    public executeResource(resourcePath: string, functionName?: string, noResponse?: boolean, mimeType?: string): Promise<void>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param functionName The function to trigger
     * @param noResponse If true, Mbed Device Connector will not wait for a response
     * @param mimeType The mime type format of the value
     * @param callback A function that is passed any error
     */
    public executeResource(resourcePath: string, functionName?: string, noResponse?: boolean, mimeType?: string, callback?: CallbackFn<void>): void;
    public executeResource(resourcePath: string, functionName?: any, noResponse?: any, mimeType?: any, callback?: CallbackFn<void>): Promise<void> {
        noResponse = noResponse || false;
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
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
            this._connectApi.executeResource(this.id, resourcePath, functionName, noResponse, mimeType, done);
        }, callback);
    }

    /**
     * Gets the status of a resource's subscription
     * @param resourcePath Resource path
     * @returns Promise containing resource subscription status
     */
    public getResourceSubscription(resourcePath: string): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     * @param resourcePath Resource path
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    public getResourceSubscription(resourcePath: string, callback: CallbackFn<boolean>): void;
    public getResourceSubscription(resourcePath: string, callback?: CallbackFn<boolean>): Promise<boolean> {
        return asyncStyle(done => {
            this._connectApi.getResourceSubscription(this.id, resourcePath, done);
        }, callback);
    }

    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param notifyFn Function to call with notification
     * @returns empty Promise
     */
    public addResourceSubscription(resourcePath: string, notifyFn?: (any) => any): Promise<void>;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed any error
     */
    public addResourceSubscription(resourcePath: string, notifyFn?: (any) => any, callback?: CallbackFn<void>): void;
    public addResourceSubscription(resourcePath: string, notifyFn?: (any) => any, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._connectApi.addResourceSubscription(this.id, resourcePath, notifyFn, done);
        }, callback);
    }

    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @returns empty Promise
     */
    public deleteResourceSubscription(resourcePath: string): Promise<void>;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param callback A function that is passed any error
     */
    public deleteResourceSubscription(resourcePath: string, callback: CallbackFn<void>): void;
    public deleteResourceSubscription(resourcePath: string, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._connectApi.deleteResourceSubscription(this.id, resourcePath, done);
        }, callback);
    }

    /**
     * Deletes a resource
     * @param resourcePath Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @returns empty Promise
     */
    public deleteResource(resourcePath: string, noResponse?: boolean): Promise<void>;
    /**
     * Deletes a resource
     * @param resourcePath Path of the resource to delete
     * @param noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    public deleteResource(resourcePath: string, noResponse?: boolean, callback?: CallbackFn<void>): void;
    public deleteResource(resourcePath: string, noResponse?: any, callback?: CallbackFn<void>): Promise<void> {
        noResponse = noResponse || false;
        if (typeof noResponse === "function") {
            callback = noResponse;
            noResponse = false;
        }

        return asyncStyle(done => {
            this._connectApi.deleteResource(this.id, resourcePath, noResponse, done);
        }, callback);
    }
}
