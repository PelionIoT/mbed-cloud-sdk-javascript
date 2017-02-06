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

import { asyncStyle } from "../common/functions";
import { EventEmitter } from "events";
import { ResourceType } from "./types";
import { DevicesApi } from "./index";
import { Resource as apiResourceType } from "../_api/mds";

/**
 * Resource
 */
export class Resource extends EventEmitter {

    /**
     * Resource notification event which returns the notification when handling notifications, otherwise an asyncId
     * @event
     */
    static EVENT_NOTIFICATION: string = "notification";

    constructor(options: ResourceType, private _api?: DevicesApi) {
        super();
        for(var key in options) {
            this[key] = options[key];
        }

        this.on("newListener", (eventName) => {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                this.addSubscription({
                    fn: data => this.emit(Resource.EVENT_NOTIFICATION, data)
                }, (error, asyncID) => {
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

    static map(from: apiResourceType, deviceId: string, api: DevicesApi): Resource {
        let type:ResourceType = {
            contentType:    from.type,
            observable:     from.obs,
            type:           from.rt,
            path:           from.uri,
            deviceId:       deviceId
        };

        return new Resource(type, api);
    }

    /**
     * Gets the value of a resource
     * @param options.cacheOnly If true, the response will come only from the cache
     * @param options.noResponse If true, If true, mbed Device Connector will not wait for a response
     * @returns Promise of resource value when handling notifications or an asyncId
     */
    public getValue(options?: { cacheOnly?: boolean, noResponse?: boolean }): Promise<string>;
    /**
     * Gets the value of a resource
     * @param options.cacheOnly If true, the response will come only from the cache
     * @param options.noResponse If true, If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when handling notifications or an asyncId
     */
    public getValue(options?: { cacheOnly?: boolean, noResponse?: boolean }, callback?: (err: any, data?: string) => any);
    public getValue(options?: any, callback?: (err: any, data?: string) => any): Promise<string> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { cacheOnly, noResponse } = options;
        return asyncStyle(done => {
            this._api.getResourceValue({
                id:            this.deviceId,
                path:          this.path,
                cacheOnly:     cacheOnly,
                noResponse:    noResponse
            }, done);
        }, callback);
    }

    /**
     * Sets the value of a resource
     * @param options.value The value of the resource
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    public setValue(options: { value: string, noResponse?: boolean }): Promise<string>;
    /**
     * Sets the value of a resource
     * @param options.value The value of the resource
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    public setValue(options: { value: string, noResponse?: boolean }, callback?: (err: any, data?: string) => any);
    public setValue(options: { value: string, noResponse?: boolean }, callback?: (err: any, data?: string) => any): Promise<string> {
        let { value, noResponse } = options;
        return asyncStyle(done => {
            this._api.setResourceValue({
                id:            this.deviceId,
                path:          this.path,
                value:         value,
                noResponse:    noResponse
            }, done);
        }, callback);
    }

    /**
     * Execute a function on a resource
     * @param options.fn The function to trigger
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    public execute(options?: { fn?: string, noResponse?: boolean }): Promise<string>;
    /**
     * Execute a function on a resource
     * @param options.fn The function to trigger
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    public execute(options: { fn?: string, noResponse?: boolean }, callback?: (err: any, data?: string) => any);
    public execute(options?: any, callback?: (err: any, data?: string) => any): Promise<string> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { fn, noResponse } = options;
        return asyncStyle(done => {
            this._api.executeResource({
                id:            this.deviceId,
                path:          this.path,
                fn:            fn,
                noResponse:    noResponse
            }, done);
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
    public getSubscription(callback: (err: any, data?: boolean) => any);
    public getSubscription(callback?: (err: any, data?: boolean) => any): Promise<boolean> {
        return asyncStyle(done => {
            if (!this.observable) return done(null, false);
            this._api.getResourceSubscription({
                id:            this.deviceId,
                path:          this.path
            }, done);
        }, callback);
    }

    /**
     * Subscribe to a resource
     * @param options.fn Function to call with notification
     * @returns Promise containing any error
     */
    private addSubscription(options?: { fn?: Function }): Promise<void>;
    /**
     * Subscribe to a resource
     * @param options.fn Function to call with notification
     * @param callback A function that is passed any error
     */
    private addSubscription(options?: { fn?: Function }, callback?: (err: any, data?: void) => any);
    private addSubscription(options?: { fn?: Function }, callback?: (err: any, data?: void) => any): Promise<void> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { fn } = options;
        return asyncStyle(done => {
            if (!this.observable) return done(null, null);
            this._api.addResourceSubscription({
                id:            this.deviceId,
                path:          this.path,
                fn:            fn
            }, done);
        }, callback);
    }

    /**
     * Deletes a resource's subscription
     * @returns Promise containing any error
     */
    private deleteSubscription(): Promise<void>;
    /**
     * Deletes a resource's subscription
     * @param callback A function that is passed any error
     */
    private deleteSubscription(callback?: (err: any, data?: void) => any);
    private deleteSubscription(callback?: (err: any, data?: void) => any): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteResourceSubscription({
                id:            this.deviceId,
                path:          this.path
            }, done);
        }, callback);
    }

    /**
     * Deletes a resource
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    public delete(options?: { noResponse?: boolean }): Promise<string>;
    /**
     * Deletes a resource
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    public delete(options?: { noResponse?: boolean }, callback?: (err: any, data?: string) => any);
    public delete(options: any, callback?: (err: any, data?: string) => any): Promise<string> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { noResponse } = options;
        return asyncStyle(done => {
            this._api.deleteDeviceResource({
                id:            this.deviceId,
                path:          this.path,
                noResponse:    noResponse
            }, done);
        }, callback);
    }
}
export interface Resource extends ResourceType {}
