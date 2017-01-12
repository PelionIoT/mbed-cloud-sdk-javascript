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
import { Api } from "./api";
import { DeviceDetail, QueryDetail } from "./types";
import { decodeBase64 } from "../helpers/data";
import { Device } from "./device";
import { Resource } from "./resource";
import { Query } from "./query";

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

/**
* Root Devices object
*/
export class Devices extends EventEmitter {

    private _api: Api;
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
    * @param options Options object
    */
    constructor(options: ConnectionOptions) {
        super();
        this._api = new Api(options);
    }

    public createDevice(options?: DeviceDetail): Promise<Device>;
    public createDevice(options?: DeviceDetail, callback?: (err: any, data?: Device) => void): void;
    /**
    * Create a device
    * @param options device details
    * @param callback A function that is passed the arguments (error, device)
    * @returns Optional Promise of device
    */
    public createDevice(options?:any, callback?: (err: any, data?: Device) => void): Promise<Device> {
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

    public deleteDevice(options?: { id: string }): Promise<void>;
    public deleteDevice(options?: { id: string }, callback?: (err: any, data?: void) => void): void;
    /**
    * Delete a device
    * @param options device ID
    * @param callback A function that is passed any error
    * @returns Optional Promise
    */
    public deleteDevice(options?:any, callback?: (err: any, data?: void) => void): Promise<void> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { id } = options;
        return pg(done => {
            this._api.catalog.deviceDestroy(id, (error, data) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    public listKnownDevices(options?: ListOptions): Promise<Device[]>;
    public listKnownDevices(options?: ListOptions, callback?: (err: any, data?: Device[]) => void): void;
    /**
    * Gets a list of known devices
    * @param options Filters devices
    * @param callback A function that is passed the arguments (error, devices)
    * @returns Optional Promise of devices
    */
    public listKnownDevices(options?: any, callback?: (err: any, data?: Device[]) => void): Promise<Device[]> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let {limit, after, order, include, filter} = options;
        return pg(done => {
            this._api.catalog.deviceList(limit, order, after, filter, include, (error, data: ListResponse<DeviceDetail>) => {
                if (error) return done(error);
                var devices = data.data.map(device => {
                    return new Device(this._api, device.id);
                });
                done(null, devices);
            });
        }, callback);
    }

    public listConnectedDevices(options?: { type?: string }): Promise<Device[]>;
    public listConnectedDevices(options?: { type?: string }, callback?: (err: any, data?: Device[]) => void): void;
    /**
    * Gets a list of currently connected device
    * @param type Filters devices by device type
    * @param callback A function that is passed the arguments (error, devices)
    * @returns Optional Promise of currently connected devices
    */
    public listConnectedDevices(options?: any, callback?: (err: any, data?: Device[]) => void): Promise<Device[]> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { type } = options;
        return pg(done => {
            this._api.endpoints.v2EndpointsGet(type, (error, data) => {
                if (error) return done(error);
                var devices = data.map(device => {
                    return new Device(this._api, device.name);
                });
                done(null, devices);
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
            this._pollRequest = this._api.notifications.v2NotificationPullGet((error, data) => {

                if (!Devices.polling) return;

                //payload, path, ep(endpoint name), ct(content type)
                if (data["notifications"]) {
                    data["notifications"].forEach(notification => {
                        var path = notification.ep + notification.path;
                        var resource = Devices.resourceSubs[path];

                        if (resource) {
                            resource.emit(Devices.EVENT_NOTIFICATION, decodeBase64(notification));
                        }
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
                                    fn(null, decodeBase64(response));
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
    public getWebhookData(callback?: (err: any, data?: Webhook) => void): Promise<Webhook> {
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
    public updateWebhookData(options: { data: Webhook }, callback?: (err: any, data?: void) => void): Promise<void> {
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
    public deleteWebhookData(callback?: (err: any, data?: void) => void): Promise<void> {
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
    public updateSubscriptionData(options: { presubsription: string[] }, callback?: (err: any, data?: void) => void): Promise<void> {
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

    public createQuery(options: { name: string, query: string, description?: string }): Promise<Query>;
    public createQuery(options: { name: string, query: string, description?: string }, callback?: (err: any, data?: Query) => void): void;
    /**
    * Create a device
    * @param options device details
    * @param callback A function that is passed the arguments (error, device)
    * @returns Optional Promise of device
    */
    public createQuery(options?:any, callback?: (err: any, data?: Query) => void): Promise<Query> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { name, query, description } = options;
        return pg(done => {
            this._api.query.deviceQueryCreate(name, query, description, null, null, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    public deleteQuery(options?: { id: string }): Promise<void>;
    public deleteQuery(options?: { id: string }, callback?: (err: any, data?: void) => void): void;
    /**
    * Delete a device
    * @param options device ID
    * @param callback A function that is passed any error
    * @returns Optional Promise
    */
    public deleteQuery(options?:any, callback?: (err: any, data?: void) => void): Promise<void> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { id } = options;
        return pg(done => {
            this._api.query.deviceQueryDestroy(id, (error, data) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    public listQueries(options?: ListOptions): Promise<Query[]>;
    public listQueries(options?: ListOptions, callback?: (err: any, data?: Query[]) => void): void;
    /**
    * Delete a device
    * @param options device ID
    * @param callback A function that is passed any error
    * @returns Optional Promise
    */
    public listQueries(options?:any, callback?: (err: any, data?: Query[]) => void): Promise<Query[]> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, order, after } = options;
        return pg(done => {
            this._api.query.deviceQueryList(limit, order, after, (error, data: ListResponse<QueryDetail>) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    public getQuery(options?: { id: string }): Promise<Query>;
    public getQuery(options?: { id: string }, callback?: (err: any, data?: Query) => void): void;
    /**
    * Delete a device
    * @param options device ID
    * @param callback A function that is passed any error
    * @returns Optional Promise
    */
    public getQuery(options?:any, callback?: (err: any, data?: Query) => void): Promise<Query> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { id } = options;
        return pg(done => {
            this._api.query.deviceQueryRetrieve(id, (error, data: QueryDetail) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    public updateQuery(options?: { id: string, name?: string, query?: string, description?: string }): Promise<Query>;
    public updateQuery(options?: { id: string, name?: string, query?: string, description?: string }, callback?: (err: any, data?: Query) => void): void;
    /**
    * Delete a device
    * @param options device ID
    * @param callback A function that is passed any error
    * @returns Optional Promise
    */
    public updateQuery(options?:any, callback?: (err: any, data?: Query) => void): Promise<Query> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { id, name, query, description } = options;

        if (name && query) {
            // Full update
            return pg(done => {
                this._api.query.deviceQueryUpdate(id, name, query, description, null, null, (error, data: QueryDetail) => {
                    if (error) return done(error);
                    done(null, null);
                });
            }, callback);
        } else {
            // Partial update
            return pg(done => {
                this._api.query.deviceQueryPartialUpdate(id, description, name, null, query, null, (error, data: QueryDetail) => {
                    if (error) return done(error);
                    done(null, null);
                });
            }, callback);
        }
    }
}
