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
import { Api } from "./api";
import { Devices } from "./index";

export interface ResourceValueOptions {
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

/**
* Resource object
*/
export class Resource extends EventEmitter {

    /**
    * Resource notification event
    * @event
    */
    static EVENT_NOTIFICATION: string = "notification";

    constructor(private _api: Api, options: ResourceType) {
        super();
        for(var key in options) {
            this[key] = options[key];
        }

        this.on("newListener", (eventName, listener) => {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                this.createSubscription((error, asyncID) => {
                    if (Devices.polling) {
                        // record this resource at this path for notifications
                        Devices.resourceSubs[this.device.id + this.uri] = this;
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
                    delete Devices.resourceSubs[this.device.id + this.uri];
                    this.deleteSubscription();
                }
            }
        });
    }

    public getValue(options?: ResourceValueOptions): Promise<string | Object>;
    public getValue(options?: ResourceValueOptions, callback?: (err: any, data?: string) => void);
    /**
    * Gets the value of a resource
    * @param options Options object
    * @param callback A function that is passed the arguments (error, value) where value is the value of the resource formatted as a string
    * @returns Optional Promise of resource value
    */
    public getValue(options?: any, callback?: (err: any, data?: string) => void): Promise<string> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { cacheOnly, noResp } = options;
        return pg(done => {
            this._api.resources.v2EndpointsEndpointNameResourcePathGet(this.device.id, this.uri, cacheOnly, noResp, (error, data) => {
                if (error) return done(error);

                var asyncID = data["async-response-id"];
                if (Devices.polling && asyncID) {
                    Devices.asyncFns[asyncID] = done;
                    return;
                }

                done(null, asyncID || data);
            });
        }, callback);
    }

    /**
    * Puts the value of a resource
    * @param value The value of the resource
    * @param noResp If true, mbed Device Connector will not wait for a response
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public putValue(options: { value: string, noResp?: boolean }, callback?: (err: any, data?: void) => void): Promise<void> {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPut
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
    * Execute a function on a resource
    * @param function The function to trigger
    * @param noResp If true, mbed Device Connector will not wait for a response
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public execute(options: { function?:string, noResp?: boolean }, callback?: (err: any, data?: void) => void): Promise<void> {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPost
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
    * Gets the status of a resource's subscription
    * @param callback A function that is passed (error, subscribed) where subscribed is true or false
    * @returns Optional Promise containing resource subscription status
    */
    public getSubscription(callback?: (err: any, data?: boolean) => void): Promise<boolean> {
        return pg(done => {
            if (!this.obs) done(null, null);
            this._api.subscriptions.v2SubscriptionsEndpointNameResourcePathGet(this.device.id, this.uri, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
    * Subscribe to a resource
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    private createSubscription(callback?: (err: any, data?: void) => void): Promise<void> {
        return pg(done => {
            this._api.subscriptions.v2SubscriptionsEndpointNameResourcePathPut(this.device.id, this.uri, (error, data) => {
                if (error) return done(error);
                var asyncID = data["async-response-id"];
                if (asyncID) {
                    //Devices.asyncFns[asyncID] = done;
                    //return;
                }

                done(null, asyncID || data);
            });
        }, callback);
    }

    /**
    * Deletes a resource's subscription
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    private deleteSubscription(callback?: (err: any, data?: void) => void): Promise<void> {
        return pg(done => {
            this._api.subscriptions.v2SubscriptionsEndpointNameResourcePathDelete(this.device.id, this.uri, done);
        }, callback);
    }
}
export interface Resource extends ResourceType {}
