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
import { polygoat as pg }  from "./helpers/polygoat";
import { EndpointsApi } from "./_api/mds";

export interface DevicesOptions {
    /**
    * Access Key for your mbed Device Connector account
    */
    accessKey: string;
    /**
    * URL for mbed Device Connector API
    */
    host?: string;
}

export interface ResourceValueOptions {
    /**
    * If true, the response will come only from the cache
    * (default: false)
    */
    cacheOnly?: boolean;
    /**
    * If true, mbed Device Connector will not wait for a response
    * Creates a CoAP Non-Confirmable requests
    * If false, a response is expected and the CoAP request is confirmable
    * (default: false)
    */
    noResp?: string;
}

export interface CallbackData {
    /**
    * The callback URL
    */
    url: string;
    /**
    * The headers that should be set when mbed Cloud Connect puts to the given callback URL
    */
    headers?: any;
}

/**
* Root Devices object
*/
export class Devices extends EventEmitter {

    private api: any;

    /**
    * Resource notification event
    * @event
    */
    static EVENT_NOTIFICATION:string = "notification";

    /**
    * Endpoint registration event
    * @event
    */
    static EVENT_REGISTRATION:string = "registration";

    /**
    * Endpoint registration update event
    * @event
    */
    static EVENT_UPDATE:string = "reg-update";

    /**
    * Endpoint de-registration event
    * @event
    */
    static EVENT_DEREGISTRATION:string = "de-registration";

    /**
    * Endpoint registration expiration event
    * @event
    */
    static EVENT_EXPIRED:string = "registration-expired";

    /**
    * @param options Options object
    */
    constructor(options: DevicesOptions) {
        super();
        this.api = new EndpointsApi();
//        if (options.host) this.client.basePath = options.host;
        if (options.accessKey) this.api.setApiKey("Bearer", "Bearer " + options.accessKey);
    }

    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    public getEndpoints(type?:string, callback?: Function):Promise<Endpoint[]> {
        var api = this.api;

        return pg(function(done) {
            api.v2EndpointsGet(type, function(error, response) {
                if (error) return done(error);
                var endpoints = response.body.map(function(endpoint) {
                    return new Endpoint(api, endpoint);
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
    public startNotifications(callback?: Function):Promise<void> {
        //mds.NotificationsApi.v2NotificationPullGet
        return pg(function(done) {
            done(null, null);
        }, callback);
    }

    /**
    * Stops long polling for notifications
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public stopNotifications(callback?: Function):Promise<void> {
        return pg(function(done) {
            done(null, null);
        }, callback);
    }

    /**
    * Gets the current callback data
    * @param callback A function that is passed the arguments (error, callbackData)
    * @returns Optional Promise containing the callback data
    */
    public getCallback(callback?: Function):Promise<CallbackData> {
        //mds.DefaultApi.v2NotificationCallbackGet
        return pg(function(done) {
            done(null, null);
        }, callback);
    }

    /**
    * Puts callback data
    * @param data callback data
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public putCallback(data:CallbackData, callback?: Function):Promise<void> {
        //mds.NotificationsApi.v2NotificationCallbackPut
        return pg(function(done) {
            done(null, null);
        }, callback);
    }

    /**
    * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public deleteCallback(callback?: Function):Promise<void> {
        //mds.DefaultApi.v2NotificationCallbackDelete
        return pg(function(done) {
            done(null, null);
        }, callback);
    }

    /**
    * Gets pre-subscription data
    * @param callback A function that is passed (error, data)
    * @returns Optional Promise containing data
    */
    public getSubscriptionData(callback?: Function):Promise<any> {
        //mds.SubscriptionsApi.v2SubscriptionsGet
        return pg(function(done) {
            done(null, null);
        }, callback);
    }

    /**
    * Puts pre-subscription data
    * @param data The pre-subscription data
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public putSubscriptionData(data:any, callback?: Function):Promise<void> {
        //mds.SubscriptionsApi.v2SubscriptionsPut
        return pg(function(done) {
            done(null, null);
        }, callback);
    }

    /**
    * Removes all subscriptions
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public deleteSubscriptions(callback?: Function):Promise<void> {
        //mds.SubscriptionsApi.v2SubscriptionsDelete
        return pg(function(done) {
            done(null, null);
        }, callback);
    }
}

/**
* Endpoint object
*/
export class Endpoint {

    private api: any;
    name: any;
    status: any;
    type: any;

    constructor(api, options) {
        this.api = api;
        this.name = options.name;
        this.status = options.status;
        this.type = options.type;
    }

    /**
    * Gets a list of an endpoint's resources
    * @param callback A function that is passed the arguments (error, resources)
    * @returns Optional Promise of endpoint resources
    */
    public getResources(callback?: Function):Promise<Resource[]> {
        var name = this.name;
        var api = this.api;

        return pg(function(done) {
            api.v2EndpointsEndpointNameGet(name, function(error, response) {
                if (error) return done(error);
                var resources = response.body.map(function(resource) {
                    return new Resource(api, resource);
                });
                done(null, resources);
            });
        }, callback);
    }

    /**
    * Adds a new resource
    * @param path The path of the resource
    * @param value The value of the resource
    * @param options Options object
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public postResource(path:string, value?:string, options?: ResourceValueOptions, callback?: Function):Promise<void> {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPost
        return pg(function(done) {
            done(null, null);
        }, callback);
    }

    /**
    * Deletes a resource
    * @param path Path of the resource to delete
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public deleteResource(path?:string, callback?: Function):Promise<void> {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathDelete
        return pg(function(done) {
            done(null, null);
        }, callback);
    }

    /**
    * Gets a list of an endpoint's subscriptions
    * @param callback A function that is passed (error, subscriptions)
    * @returns Optional Promise containing the subscriptions
    */
    public getSubscriptions(callback?: Function):Promise<any> {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameGet
        return pg(function(done) {
            done(null, null);
        }, callback);
    }

    /**
    * Removes an endpoint's subscriptions
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public deleteSubscriptions(callback?: Function):Promise<void> {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameDelete
        return pg(function(done) {
            done(null, null);
        }, callback);
    }
}

/**
* Resource object
*/
export class Resource {

    private api: any;
    obs: any;
    rt: any;
    type: any;
    uri: any;

    constructor(api, options) {
        this.api = api;
        this.obs = options.obs;
        this.rt = options.rt;
        this.type = options.type;
        this.uri = options.uri;
    }

    /**
    * Gets the value of a resource
    * @param options Options object
    * @param callback A function that is passed the arguments (error, value) where value is the value of the resource formatted as a string
    * @returns Optional Promise of resource value
    */
    public getValue(options?: ResourceValueOptions, callback?: Function):Promise<string> {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathGet
        var uri = this.uri;

        return pg(function(done) {
            done(null, "value - " + uri);
        }, callback);
    }

    /**
    * Puts the value of a resource
    * @param value The value of the resource
    * @param options Options object
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public putValue(value:string, options?: ResourceValueOptions, callback?: Function):Promise<void> {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPut
        return pg(function(done) {
            done(null, null);
        }, callback);
    }

    /**
    * Gets the status of a resource's subscription
    * @param callback A function that is passed (error, subscribed) where subscribed is true or false
    * @returns Optional Promise containing resource subscription status
    */
    public getSubscription(callback?: Function):Promise<boolean> {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameResourcePathGet
        return pg(function(done) {
            done(null, null);
        }, callback);
    }

    /**
    * Puts a subscription to a resource
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public putSubscription(callback?: Function):Promise<void> {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameResourcePathPut
        return pg(function(done) {
            done(null, null);
        }, callback);
    }

    /**
    * Deletes a resource's subscription
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public deleteSubscription(callback?: Function):Promise<void> {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameResourcePathDelete
        return pg(function(done) {
            done(null, null);
        }, callback);
    }
}
