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
import { EventEmitter } from "events";
import { ConnectionOptions, ListOptions, ListResponse } from "../helpers/interfaces";
import { decodeBase64, mapListResponse, encodeInclude } from "../helpers/data";
import { Endpoints } from "./endpoints";
import { DeviceType, QueryType, WebhookType } from "./types";
import { Device } from "./device";
import { Resource } from "./resource";
import { Query } from "./query";
import { Webhook } from "./webhook";

/**
 * Root Devices API
 */
export class DevicesApi extends EventEmitter {

    static _endpoints: Endpoints;
    private _pollRequest: superagent.SuperAgentRequest;
    static polling: boolean = false;
    static asyncFns: { [key: string]: Function; } = {};
    static resourceSubs: { [key: string]: Resource; } = {};

    /**
     * Resource notification event
     * @event
     */
    static EVENT_NOTIFICATION: string = "notification";

    /**
     * Device registration event
     * @event
     */
    static EVENT_REGISTRATION: string = "registration";

    /**
     * Device registration update event
     * @event
     */
    static EVENT_UPDATE: string = "reg-update";

    /**
     * Device de-registration event
     * @event
     */
    static EVENT_DEREGISTRATION: string = "de-registration";

    /**
     * Device registration expiration event
     * @event
     */
    static EVENT_EXPIRED: string = "registration-expired";

    /**
     * @param options connection objects
     */
    constructor(options: ConnectionOptions) {
        super();
        DevicesApi._endpoints = new Endpoints(options);
    }

    /**
     * Add a device
     * @param options device details
     * @returns Promise of device
     */
    public addDevice(options?: DeviceType): Promise<Device>;
    /**
     * Create a device
     * @param options device details
     * @param callback A function that is passed the arguments (error, device)
     */
    public addDevice(options?: DeviceType, callback?: (err: any, data?: Device) => any): void;
    public addDevice(options?:any, callback?: (err: any, data?: Device) => any): Promise<Device> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return pg(done => {
            /*
            this._api.catalog.deviceCreate(xxx, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
            */
        }, callback);
    }

    /**
     * Delete a device
     * @param options.id device ID
     * @returns Promise containing any error
     */
    public deleteDevice(options?: { id: string }): Promise<void>;
    /**
     * Delete a device
     * @param options.id device ID
     * @param callback A function that is passed any error
     */
    public deleteDevice(options?: { id: string }, callback?: (err: any, data?: any) => void): void;
    public deleteDevice(options?:any, callback?: (err: any, data?: void) => any): Promise<void> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { id } = options;
        return pg(done => {
            DevicesApi._endpoints.catalog.deviceDestroy(id, (error, data) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * Gets a list of devices
     * @param options list options
     * @returns Promise of devices
     */
    public listDevices(options?: ListOptions): Promise<ListResponse<Device>>;
    /**
     * Gets a list of devices
     * @param options list options
     * @param callback A function that is passed the arguments (error, devices)
     */
    public listDevices(options?: ListOptions, callback?: (err: any, data?: ListResponse<Device>) => any): void;
    public listDevices(options?: any, callback?: (err: any, data?: ListResponse<Device>) => any): Promise<ListResponse<Device>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, after, order, include, filter } = options;
        return pg(done => {
            DevicesApi._endpoints.catalog.deviceList(limit, order, after, filter, encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let devices = data.data.map(Device.map);
                let response = mapListResponse<Device>(data, devices);

                done(null, response);
            });
        }, callback);
    }

    /**
     * List connected devices
     * @param options.type Filter devices by device type
     * @returns Promise of connected devices
     */
    public listConnectedDevices(options?: { type?: string }): Promise<ListResponse<Device>>;
    /**
     * List connected devices
     * @param options.type Filter devices by device type
     * @param callback A function that is passed the arguments (error, devices)
     */
    public listConnectedDevices(options?: { type?: string }, callback?: (err: any, data?: ListResponse<Device>) => any): void;
    public listConnectedDevices(options?: any, callback?: (err: any, data?: ListResponse<Device>) => any): Promise<ListResponse<Device>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { type } = options;
        return pg(done => {
            DevicesApi._endpoints.endpoints.v2EndpointsGet(type, (error, data) => {
                if (error) return done(error);

                let response:ListResponse<Device> = {
                    data: data.map(device => {
                        return Device.map({
                            id: device.name
                        })
                    })
                };

                done(null, response);
            });
        }, callback);
    }

    /**
     * Begins long polling constantly for notifications
     * @param options.requestCallback A function that is passed all notifications
     * @returns Promise containing any error
     */
    public startNotifications(options?: { requestCallback?: (err: any, data?: any) => any }): Promise<void>;
    /**
     * Begins long polling constantly for notifications
     * @param options.requestCallback A function that is passed all notifications
     * @param callback A function that is passed any error
     */
    public startNotifications(options?: { requestCallback?: (err: any, data?: any) => any }, callback?: (err: any, data?: void) => any);
    public startNotifications(options?: any, callback?: (err: any, data?: void) => any): Promise<void> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { requestCallback } = options;

        function poll() {
            this._pollRequest = this._api.notifications.v2NotificationPullGet((error, data) => {

                if (!DevicesApi.polling) return;

                //payload, path, ep(endpoint name), ct(content type)
                if (data["notifications"]) {
                    data["notifications"].forEach(notification => {
                        var path = notification.ep + notification.path;
                        var resource = DevicesApi.resourceSubs[path];

                        if (resource) {
                            resource.emit(DevicesApi.EVENT_NOTIFICATION, decodeBase64(notification));
                        }
                    });
                }

                //q(queue mode), ept(endpoint type), ep(endpont name), resources[][path, rf(resource type, ct, obs, _if(interface description)]
                if (data["registrations"]) {
                    data["registrations"].forEach(device => {
                        this.emit(DevicesApi.EVENT_REGISTRATION, device);
                    });
                }

                //q(queue mode), ept(endpoint type), ep(endpont name), resources[][path, rf(resource type, ct, obs, _if(interface description)]
                if (data["reg-updates"]) {
                    data["reg-updates"].forEach(update => {
                        this.emit(DevicesApi.EVENT_UPDATE, update);
                    });
                }

                //string
                if (data["de-registrations"]) {
                    data["de-registrations"].forEach(device => {
                        this.emit(DevicesApi.EVENT_DEREGISTRATION, device);
                    });
                }

                //string
                if (data["registrations-expired"]) {
                    data["registrations-expired"].forEach(expired => {
                        this.emit(DevicesApi.EVENT_EXPIRED, expired);
                    });
                }

                //status,payload,maxage,error,id,ct
                if (data["async-responses"]) {
                    data["async-responses"].forEach(response => {
                        var asyncID = response.id;
                        var fn = DevicesApi.asyncFns[asyncID];
                        if (fn) {
                            if (response.status >= 400) {
                                fn(response.error || response.status, response);
                            } else {
                                if (response.payload) {
                                    fn(null, decodeBase64(response));
                                    return;
                                }

                                fn(null, response);
                            }
                            delete DevicesApi.asyncFns[asyncID];
                        }
                    });
                }

                if (requestCallback) requestCallback(error, data);

                if (error) {
                    DevicesApi.polling = false;
                    return;
                }
                
                setTimeout(poll.bind(this), 500);
            }); 
        }

        poll.call(this);
        DevicesApi.polling = true;

        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
     * Stops long polling for notifications
     * @returns Promise containing any error
     */
    public stopNotifications(): Promise<void>;
    /**
     * Stops long polling for notifications
     * @param callback A function that is passed any error
     */
    public stopNotifications(callback?: (err: any, data?: void) => any);
    /**
     * Stops long polling for notifications
     * @param callback A function that is passed any error
     * @returns Promise containing any error
     */
    public stopNotifications(callback?: (err: any, data?: void) => any): Promise<void> {
        if (this._pollRequest) {
            this._pollRequest.abort();
            this._pollRequest = null;
        }

        DevicesApi.polling = false;

        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
     * Gets the current webhook data
     * @returns Promise containing the webhhok data
     */
    public getWebhook(): Promise<Webhook>;
    /**
     * Gets the current webhook data
     * @param callback A function that is passed the arguments (error, webhook)
     */
    public getWebhook(callback: (err: any, data?: Webhook) => any);
    public getWebhook(callback?: (err: any, data?: Webhook) => any): Promise<Webhook> {
        //mds.DefaultApi.v2NotificationCallbackGet
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
     * Updates the webhook
     * @param options webhook details
     * @returns Promise containing any error
     */
    public updateWebhook(options: WebhookType): Promise<void>;
    /**
     * Updates the webhook
     * @param options webhook details
     * @param callback A function that is passed any error
     */
    public updateWebhook(options: WebhookType, callback?: (err: any, data?: void) => any);
    public updateWebhook(options: any, callback?: (err: any, data?: void) => any): Promise<void> {
        //mds.NotificationsApi.v2NotificationCallbackPut
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
     * @returns Promise containing any error
     */
    public deleteWebhook(): Promise<void>;
    /**
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
     * @param callback A function that is passed any error
     */
    public deleteWebhook(callback?: (err: any, data?: void) => any);
    public deleteWebhook(callback?: (err: any, data?: void) => any): Promise<void> {
        //mds.DefaultApi.v2NotificationCallbackDelete
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
     * Gets pre-subscription data
     * @returns Promise containing data
     */
    public getPreSubscription(): Promise<any>;
    /**
     * Gets pre-subscription data
     * @param callback A function that is passed (error, data)
     */
    public getPreSubscription(callback?: (err: any, data?: any) => any);
    public getPreSubscription(callback?: (err: any, data?: any) => any): Promise<any> {
        //mds.SubscriptionsApi.v2SubscriptionsGet
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
     * Puts pre-subscription data
     * @param options.data The pre-subscription data
     * @returns Promise containing any error
     */
    public updatePreSubscription(options: { data: string[] }): Promise<void>;
    /**
     * Puts pre-subscription data
     * @param options.data The pre-subscription data
     * @param callback A function that is passed any error
     */
    public updatePreSubscription(options: { data: string[] }, callback?: (err: any, data?: void) => any);
    public updatePreSubscription(options?: any, callback?: (err: any, data?: void) => any): Promise<void> {
        //mds.SubscriptionsApi.v2SubscriptionsPut
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
     * Removes all subscriptions
     * @returns Promise containing any error
     */
    public deleteSubscriptions(): Promise<void>;
    /**
     * Removes all subscriptions
     * @param callback A function that is passed any error
     */
    public deleteSubscriptions(callback?: (err: any, data?: void) => any);
    public deleteSubscriptions(callback?: (err: any, data?: void) => any): Promise<void> {
        //mds.SubscriptionsApi.v2SubscriptionsDelete
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
     * Add a query
     * @param options.name query name
     * @param options.query query string
     * @param options.description query description
     * @returns Promise of query
     */
    public addQuery(options: { name: string, query: string, description?: string }): Promise<Query>;
    /**
     * Add a query
     * @param options.name query name
     * @param options.query query string
     * @param options.description query description
     * @param callback A function that is passed the arguments (error, query)
     */
    public addQuery(options: { name: string, query: string, description?: string }, callback?: (err: any, data?: Query) => any): void;
    public addQuery(options: { name: string, query: string, description?: string }, callback?: (err: any, data?: Query) => any): Promise<Query> {
        let { name, query, description } = options;
        return pg(done => {
            DevicesApi._endpoints.query.deviceQueryCreate(name, query, description, null, null, (error, data) => {
                if (error) return done(error);

                let query = Query.map(data);
                done(null, query);
            });
        }, callback);
    }

    /**
     * Delete a query
     * @param options.id query ID
     * @returns Promise containing any error
     */
    public deleteQuery(options: { id: string }): Promise<void>;
    /**
     * Delete a query
     * @param options.id query ID
     * @param callback A function that is passed any error
     */
    public deleteQuery(options: { id: string }, callback?: (err: any, data?: void) => any): void;
    public deleteQuery(options: { id: string }, callback?: (err: any, data?: void) => any): Promise<void> {
        let { id } = options;
        return pg(done => {
            DevicesApi._endpoints.query.deviceQueryDestroy(id, (error, data) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * List queries
     * @param options list options
     * @param callback A function containing a list response
     * @returns Promise containing a list response
     */
    public listQueries(options?: ListOptions): Promise<ListResponse<Query>>;
    /**
     * List queries
     * @param options list options
     * @param callback A function containing a list response
     * @returns Promise containing a list response
     */
    public listQueries(options?: ListOptions, callback?: (err: any, data?: ListResponse<Query>) => any): void;
    public listQueries(options?:any, callback?: (err: any, data?: ListResponse<Query>) => any): Promise<ListResponse<Query>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, order, after, include } = options;
        return pg(done => {
            DevicesApi._endpoints.query.deviceQueryList(limit, order, after, encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let queries = data.data.map(Query.map);
                let response = mapListResponse(data, queries);

                done(null, response);
            });
        }, callback);
    }

    /**
     * Get a query
     * @param options.is query ID
     * @param callback A function that is passed the arguments (error, query)
     * @returns Promise of query
     */
    public getQuery(options: { id: string }): Promise<Query>;
    /**
     * Get a query
     * @param options.is query ID
     * @param callback A function that is passed the arguments (error, query)
     * @returns Promise of query
     */
    public getQuery(options: { id: string }, callback?: (err: any, data?: Query) => any): void;
    public getQuery(options: { id: string }, callback?: (err: any, data?: Query) => any): Promise<Query> {
        let { id } = options;
        return pg(done => {
            DevicesApi._endpoints.query.deviceQueryRetrieve(id, (error, data) => {
                if (error) return done(error);

                let query = Query.map(data);
                done(null, query);
            });
        }, callback);
    }

    /**
     * Update a query
     * @param options query details
     * @returns Promise of query
     */
    public updateQuery(options: QueryType): Promise<Query>;
    /**
     * Update a query
     * @param options query details
     * @param callback A function that is passed the arguments (error, query)
     */
    public updateQuery(options: QueryType, callback?: (err: any, data?: Query) => void): void;
    public updateQuery(options: QueryType, callback?: (err: any, data?: Query) => void): Promise<Query> {
        let { id, name, query, description } = options;

        if (name && query) {
            // Full update
            return pg(done => {
                DevicesApi._endpoints.query.deviceQueryUpdate(id, {
                    description: description,
                    name:name,
                    query: query
                }, (error, data) => {
                    if (error) return done(error);

                    let query = Query.map(data);
                    done(null, query);
                });
            }, callback);
        } else {
            // Partial update
            return pg(done => {
                DevicesApi._endpoints.query.deviceQueryPartialUpdate(id, description, name, null, query, null, (error, data) => {
                    if (error) return done(error);

                    let query = Query.map(data);
                    done(null, query);
                });
            }, callback);
        }
    }
}

//getResourceValue
//setResourceValue
//executeResource
//getResourceSubscription
//addResourceSubscription
//deleteResourceSubscription

//getDeviceDetails
//listDeviceResources
//deleteDeviceResource
//listDeviceSubscriptions
//deleteDeviceSubscriptions
