/*
 * Pelion Device Management JavaScript SDK
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

import { asyncStyle } from "../../common/functions";
import { CallbackFn } from "../../common/interfaces";
import { Device } from "../../deviceDirectory/models/device";
import { ConnectApi } from "../connectApi";
import { AsyncResponse } from "../types";
import { Resource } from "./resource";
import { ResourceValue } from "./resourceValue";

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
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The requested mime type format of the value
     * @returns Promise of resource value
     */
    public getResourceValue(resourcePath: string, timeout?: number, mimeType?: string): Promise<ResourceValue>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param resourcePath Resource path
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The requested mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is the resource value
     */
    public getResourceValue(
        resourcePath: string,
        timeout?: number,
        mimeType?: string,
        callback?: CallbackFn<ResourceValue>
    ): void;
    public getResourceValue(
        resourcePath: string,
        timeout?: number,
        mimeType?: any,
        callback?: CallbackFn<ResourceValue>
    ): Promise<ResourceValue> {
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }

        return asyncStyle(done => {
            this._connectApi.getResourceValue(this.id, resourcePath, timeout, mimeType, null, null, done);
        }, callback);
    }

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
    public setResourceValue(
        resourcePath: string,
        value: string,
        timeout?: number,
        mimeType?: string
    ): Promise<AsyncResponse>;
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
    public setResourceValue(
        resourcePath: string,
        value: string,
        timeout?: number,
        mimeType?: string,
        callback?: CallbackFn<AsyncResponse>
    ): void;
    public setResourceValue(
        resourcePath: string,
        value: string,
        timeout?: number,
        mimeType?: any,
        callback?: CallbackFn<AsyncResponse>
    ): Promise<AsyncResponse> {
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }

        return asyncStyle(done => {
            this._connectApi.setResourceValue(this.id, resourcePath, value, timeout, mimeType, done);
        }, callback);
    }

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
    public executeResource(
        resourcePath: string,
        payload?: any,
        timeout?: number,
        mimeType?: string,
        accepts?: string
    ): Promise<AsyncResponse>;
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
    public executeResource(
        resourcePath: string,
        payload?: any,
        timeout?: number,
        mimeType?: string,
        accepts?: string,
        callback?: CallbackFn<AsyncResponse>
    ): void;
    public executeResource(
        resourcePath: string,
        payload?: any,
        timeout?: number,
        mimeType?: any,
        accepts?: string,
        callback?: CallbackFn<AsyncResponse>
    ): Promise<AsyncResponse> {
        if (typeof payload === "function") {
            callback = payload;
            payload = null;
        }
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof accepts === "function") {
            callback = accepts;
            accepts = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }

        return asyncStyle(done => {
            this._connectApi.executeResource(this.id, resourcePath, timeout, mimeType, accepts, payload, done);
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
    public addResourceSubscription(
        resourcePath: string,
        notifyFn?: (any) => any,
        callback?: CallbackFn<void>
    ): Promise<void> {
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
}
