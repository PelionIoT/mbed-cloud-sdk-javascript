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
import superagent = require("superagent");
import { connectionOptions } from "../helpers/connectionOptions";
import { EventEmitter } from "events";
import { EndpointsApi, NotificationsApi, EndpointsApiApiKeys, NotificationsApiApiKeys, ResourcesApi, ResourcesApiApiKeys, SubscriptionsApi, SubscriptionsApiApiKeys } from "../_api/mds";

/**
* Root Devices object
*/
export class Devices extends EventEmitter {

    private _apis: Devices.APIContainer;
    private _pollRequest: superagent.SuperAgentRequest;
    static polling: boolean = false;
    static asyncFns: { [key: string]: Function; } = {};

    /**
    * Resource notification event
    * @event
    */
    static EVENT_NOTIFICATION: string = "notification";

    /**
    * Endpoint registration event
    * @event
    */
    static EVENT_REGISTRATION: string = "registration";

    /**
    * Endpoint registration update event
    * @event
    */
    static EVENT_UPDATE: string = "reg-update";

    /**
    * Endpoint de-registration event
    * @event
    */
    static EVENT_DEREGISTRATION: string = "de-registration";

    /**
    * Endpoint registration expiration event
    * @event
    */
    static EVENT_EXPIRED: string = "registration-expired";

    /**
    * @param options Options object
    */
    constructor(options: connectionOptions) {
        super();
        this._apis = new Devices.APIContainer(options);
    }

    public getEndpoints(options?: { type?: string }): Promise<Devices.Endpoint[]>;
    public getEndpoints(options?: { type?: string }, callback?: (err: any, data?: Devices.Endpoint[]) => void): void;
    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    public getEndpoints(options?: any, callback?: (err: any, data?: Devices.Endpoint[]) => void): Promise<Devices.Endpoint[]> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { type } = options;
        return pg(done => {
            this._apis.epAPI.v2EndpointsGet(type, (error, data) => {
                if (error) return done(error);
                var endpoints = data.map(endpoint => {
                    return new Devices.Endpoint(this._apis, endpoint);
                });
                done(null, endpoints);
            });
        }, callback);
    }

    /**
    * Begins long polling constantly for notifications
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public startNotifications(options?: { requestCallback?: (err: any, data?: any) => any }, callback?: (err: any, data?: void) => void): Promise<void> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { requestCallback } = options;

        function poll() {
            this._pollRequest = this._apis.notAPI.v2NotificationPullGet((error, data) => {

                if (!Devices.polling) return;

                //payload, path, ep(endpoint name), ct(content type)
                if (data["notifications"]) {
                    data["notifications"].forEach(notification => {
                        this.emit(Devices.EVENT_NOTIFICATION, notification);
                    });
                }

                //q(queue mode), ept(endpoint type), ep(endpont name), resources[][path, rf(resource type, ct, obs, _if(interface description)]
                if (data["registrations"]) {
                    data["registrations"].forEach(device => {
                        this.emit(Devices.EVENT_REGISTRATION, device);
                    });
                }

                //q(queue mode), ept(endpoint type), ep(endpont name), resources[][path, rf(resource type, ct, obs, _if(interface description)]
                if (data["reg-updates"]) {
                    data["reg-updates"].forEach(update => {
                        this.emit(Devices.EVENT_UPDATE, update);
                    });
                }

                //string
                if (data["de-registrations"]) {
                    data["de-registrations"].forEach(device => {
                        this.emit(Devices.EVENT_DEREGISTRATION, device);
                    });
                }

                //string
                if (data["registrations-expired"]) {
                    data["registrations-expired"].forEach(expired => {
                        this.emit(Devices.EVENT_EXPIRED, expired);
                    });
                }

                //status,payload,maxage,error,id,ct
                if (data["async-responses"]) {
                    data["async-responses"].forEach(response => {
                        var asyncID = response.id;
                        var fn = Devices.asyncFns[asyncID];
                        if (fn) {
                            if (response.status >= 400) {
                                fn(response.error || response.status, response);
                            } else {
                                if (response.payload) {
                                    fn(null, Devices.decode(response));
                                    return;
                                }

                                fn(null, response);
                            }
                            delete Devices.asyncFns[asyncID];
                        }
                    });
                }

                if (requestCallback) requestCallback(error, data);

                if (error) {
                    Devices.polling = false;
                    return;
                }
                
                setTimeout(poll.bind(this), 500);
            }); 
        }

        poll.call(this);
        Devices.polling = true;

        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
    * Stops long polling for notifications
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public stopNotifications(callback?: (err: any, data?: void) => void): Promise<void> {
        if (this._pollRequest) {
            this._pollRequest.abort();
            this._pollRequest = null;
        }

        Devices.polling = false;

        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
    * Gets the current callback data
    * @param callback A function that is passed the arguments (error, callbackData)
    * @returns Optional Promise containing the callback data
    */
    public getCallback(callback?: (err: any, data?: Devices.Webhook) => void): Promise<Devices.Webhook> {
        //mds.DefaultApi.v2NotificationCallbackGet
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
    * Puts callback data
    * @param data callback data
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public putCallback(options: { data: Devices.Webhook }, callback?: (err: any, data?: void) => void): Promise<void> {
        //mds.NotificationsApi.v2NotificationCallbackPut
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
    * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public deleteCallback(callback?: (err: any, data?: void) => void): Promise<void> {
        //mds.DefaultApi.v2NotificationCallbackDelete
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
    * Gets pre-subscription data
    * @param callback A function that is passed (error, data)
    * @returns Optional Promise containing data
    */
    public getSubscriptionData(callback?: (err: any, data?: any) => void): Promise<any> {
        //mds.SubscriptionsApi.v2SubscriptionsGet
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
    * Puts pre-subscription data
    * @param data The pre-subscription data
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public putSubscriptionData(options: { presubsription: string[] }, callback?: (err: any, data?: void) => void): Promise<void> {
        //mds.SubscriptionsApi.v2SubscriptionsPut
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
    * Removes all subscriptions
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public deleteSubscriptions(callback?: (err: any, data?: void) => void): Promise<void> {
        //mds.SubscriptionsApi.v2SubscriptionsDelete
        return pg(done => {
            done(null, null);
        }, callback);
    }
}

export namespace Devices {

    export function decode(data) {
        var result = "";

        if (typeof atob === "function") {
            result = atob(data.payload);
        } else {
            result = new Buffer(data.payload, "base64").toString("utf8");
        }

        if (data.ct.indexOf("json") > -1) {
            result = JSON.parse(result);
        }

        return result;
    }

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

    export class APIContainer {

        epAPI: EndpointsApi;
        notAPI: NotificationsApi;
        resAPI: ResourcesApi;
        subAPI: SubscriptionsApi;

        constructor(options: connectionOptions) {
            this.epAPI = new EndpointsApi(options.host);
            this.notAPI = new NotificationsApi(options.host);
            this.resAPI = new ResourcesApi(options.host);
            this.subAPI = new SubscriptionsApi(options.host);

            this.epAPI.setApiKey(EndpointsApiApiKeys.Bearer, "Bearer " + options.accessKey);
            this.notAPI.setApiKey(NotificationsApiApiKeys.Bearer, "Bearer " + options.accessKey);
            this.resAPI.setApiKey(ResourcesApiApiKeys.Bearer, "Bearer " + options.accessKey);
            this.subAPI.setApiKey(SubscriptionsApiApiKeys.Bearer, "Bearer " + options.accessKey);
        }
    }

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

    export type Statuses = "ACTIVE" | "STALE";
    export interface EndpointOptions {
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
    export class Endpoint {

        constructor(private _apis: APIContainer, options: EndpointOptions) {
            for(var key in options) {
                this[key] = options[key];
            }
        }

        public getResources(): Promise<Resource[]>;
        public getResources(callback: (err: any, data?: Resource[]) => void): void;
        /**
        * Gets a list of an endpoint's resources
        * @param callback A function that is passed the arguments (error, resources)
        * @returns Optional Promise of endpoint resources
        */
        public getResources(callback?: (err: any, data?: Resource[]) => void): Promise<Resource[]> {
            return pg(done => {
                this._apis.epAPI.v2EndpointsEndpointNameGet(this.name, (error, data) => {
                    if (error) return done(error);
                    var resources = data.map(resource => {
                        resource.endpoint = this;
                        return new Resource(this._apis, resource);
                    });
                    done(null, resources);
                });
            }, callback);
        }

        /**
        * Deletes a resource
        * @param path Path of the resource to delete
        * @param noResp Whether to make a non-confirmable request to the device
        * @param callback A function that is passed any error
        * @returns Optional Promise containing any error
        */
        public deleteResource(options: { path: string, noResp?: boolean }, callback?: (err: any, data?: void) => void): Promise<void> {
            //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathDelete
            return pg(done => {
                done(null, null);
            }, callback);
        }

        /**
        * Gets a list of an endpoint's subscriptions
        * @param callback A function that is passed (error, subscriptions)
        * @returns Optional Promise containing the subscriptions
        */
        public getSubscriptions(callback?: (err: any, data?: any) => void): Promise<any> {
            //mds.SubscriptionsApi.v2SubscriptionsEndpointNameGet
            return pg(done => {
                done(null, null);
            }, callback);
        }

        /**
        * Removes an endpoint's subscriptions
        * @param callback A function that is passed any error
        * @returns Optional Promise containing any error
        */
        public deleteSubscriptions(callback?: (err: any, data?: void) => void): Promise<void> {
            //mds.SubscriptionsApi.v2SubscriptionsEndpointNameDelete
            return pg(done => {
                done(null, null);
            }, callback);
        }
    }
    export interface Endpoint extends EndpointOptions {}

    export interface ResourceOptions {
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
    export class Resource {

        constructor(private _apis: APIContainer, options: ResourceOptions) {
            for(var key in options) {
                this[key] = options[key];
            }
        }

        public getValue(options?: ResourceValueOptions): Promise<string>;
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
                this._apis.resAPI.v2EndpointsEndpointNameResourcePathGet(this.endpoint.name, this.uri.substr(1), cacheOnly, noResp, (error, data) => {
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
            //mds.SubscriptionsApi.v2SubscriptionsEndpointNameResourcePathGet
            return pg(done => {
                done(null, null);
            }, callback);
        }

        /**
        * Subscribe to a resource
        * @param callback A function that is passed any error
        * @returns Optional Promise containing any error
        */
        public putSubscription(callback?: (err: any, data?: void) => void): Promise<void> {
            return pg(done => {
                this._apis.subAPI.v2SubscriptionsEndpointNameResourcePathPut(this.endpoint.name, this.uri, (error, data) => {
                    if (error) return done(error);
                    done(null, data);
                });
            }, callback);
        }

        /**
        * Deletes a resource's subscription
        * @param callback A function that is passed any error
        * @returns Optional Promise containing any error
        */
        public deleteSubscription(callback?: (err: any, data?: void) => void): Promise<void> {
            //mds.SubscriptionsApi.v2SubscriptionsEndpointNameResourcePathDelete
            return pg(done => {
                done(null, null);
            }, callback);
        }
    }
    export interface Resource extends ResourceOptions { }
}
