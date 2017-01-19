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

import pg = require("polygoat");
import { EventEmitter } from "events";
import { ResourceType } from "./types";
import { DevicesApi } from "./index";
import { Resource as apiResourceType } from "../_api/mds";

/**
 * Resource
 */
export class Resource extends EventEmitter {

    /**
     * Resource notification event
     * @event
     */
    static EVENT_NOTIFICATION: string = "notification";

    constructor(private _deviceId: string, options: ResourceType) {
        super();
        for(var key in options) {
            this[key] = options[key];
        }

        this.on("newListener", (eventName, listener) => {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                this.addSubscription((error, asyncID) => {
                    if (DevicesApi.polling) {
                        // record this resource at this path for notifications
                        DevicesApi.resourceSubs[this._deviceId + this.path] = this;
                    } else {
                        // return the asyncID for use with webhooks
                        this.emit(Resource.EVENT_NOTIFICATION, asyncID);
                    }
                });
            }
        });

        this.on("removeListener", (eventName, listener) => {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                if (this.listenerCount(Resource.EVENT_NOTIFICATION) === 0) {
                    // no-one is listening :(
                    delete DevicesApi.resourceSubs[this._deviceId + this.path];
                    this.deleteSubscription();
                }
            }
        });
    }

    static map(from: apiResourceType, deviceId: string): Resource {
        let type:ResourceType = {
            contentType:    from.type,
            observable:     from.obs,
            type:           from.rt,
            path:           from.uri
        };

        return new Resource(deviceId, type);
    }

    /**
     * Gets the value of a resource
     * @param options.cacheOnly If true, the response will come only from the cache
     * @param options.noResponse If true, If true, mbed Device Connector will not wait for a response
     * @returns Promise of resource value when long polling or an asyncId
     */
    public getValue(options?: { cacheOnly?: boolean, noResponse?: boolean }): Promise<string>;
    /**
     * Gets the value of a resource
     * @param options.cacheOnly If true, the response will come only from the cache
     * @param options.noResponse If true, If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when long polling or an asyncId
     */
    public getValue(options?: { cacheOnly?: boolean, noResponse?: boolean }, callback?: (err: any, data?: string) => any);
    public getValue(options?: any, callback?: (err: any, data?: string) => any): Promise<string> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { cacheOnly, noResponse } = options;
        return pg(done => {
            DevicesApi._endpoints.resources.v2EndpointsEndpointNameResourcePathGet(this._deviceId, this.path, cacheOnly, noResponse, (error, data) => {
                if (error) return done(error);

                var asyncID = data["async-response-id"];
                if (DevicesApi.polling && asyncID) {
                    DevicesApi.asyncFns[asyncID] = done;
                    return;
                }

                done(null, asyncID);
            });
        }, callback);
    }

    /**
     * Sets the value of a resource
     * @param options.value The value of the resource
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    public setValue(options: { value: string, noResponse?: boolean }): Promise<void>;
    /**
     * Sets the value of a resource
     * @param options.value The value of the resource
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    public setValue(options: { value: string, noResponse?: boolean }, callback?: (err: any, data?: void) => any);
    public setValue(options?: any, callback?: (err: any, data?: void) => any): Promise<void> {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPut
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
     * Execute a function on a resource
     * @param options.function The function to trigger
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    public execute(options: { function?: string, noResponse?: boolean }): Promise<void>;
    /**
     * Execute a function on a resource
     * @param options.function The function to trigger
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    public execute(options: { function?: string, noResponse?: boolean }, callback?: (err: any, data?: void) => any);
    public execute(options?: any, callback?: (err: any, data?: void) => any): Promise<void> {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPost
        return pg(done => {
            done(null, null);
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
        return pg(done => {
            if (!this.observable) done(null, null);
            DevicesApi._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathGet(this._deviceId, this.path, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * Subscribe to a resource
     * @returns Promise containing any error
     */
    private addSubscription(): Promise<void>;
    /**
     * Subscribe to a resource
     * @param callback A function that is passed any error
     */
    private addSubscription(callback?: (err: any, data?: void) => any);
    private addSubscription(callback?: (err: any, data?: void) => any): Promise<void> {
        return pg(done => {
            DevicesApi._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathPut(this._deviceId, this.path, (error, data) => {
                if (error) return done(error);
                var asyncID = data["async-response-id"];
                if (asyncID) {
                    //DevicesApi.asyncFns[asyncID] = done;
                    //return;
                }

                done(null, asyncID || data);
            });
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
        return pg(done => {
            DevicesApi._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathDelete(this._deviceId, this.path, done);
        }, callback);
    }
}
export interface Resource extends ResourceType {}
