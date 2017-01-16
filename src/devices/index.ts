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
import { decodeBase64, mapListResponse } from "../helpers/data";
import { Api } from "./api";
import { DeviceType, QueryType, WebhookType } from "./types";
import { DeviceDetail as apiDeviceType } from "../_api/device_catalog";
import { DeviceQueryDetail as apiQueryType } from "../_api/device_query_service";
import { Device } from "./device";
import { Resource } from "./resource";
import { Query } from "./query";



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

    private mapDevice(from: apiDeviceType): Device {
        let type:DeviceType = {
            accountId:                from.account_id,
            autoUpdate:               from.auto_update,
            bootstrappedTimestamp:    from.bootstrapped_timestamp,
            createdAt:                from.created_at,
            customAttributes:         from.custom_attributes,
            deployedState:            from.deployed_state,
            deployment:               from.deployment,
            description:              from.description,
            deviceClass:              from.device_class,
            id:                       from.id,
            manifest:                 from.manifest,
            mechanism:                from.mechanism,
            mechanismUrl:             from.mechanism_url,
            name:                     from.name,
            provisionKey:             from.provision_key,
            serialNumber:             from.serial_number,
            state:                    from.state,
            trustClass:               from.trust_class,
            trustLevel:               from.trust_level,
            updatedAt:                from.updated_at,
            vendorId:                 from.vendor_id
        };

        return new Device(this._api, type);
    }

    private mapQuery(from: apiQueryType): Query {
        let type:QueryType = {
            createdAt:      from.created_at,
            description:    from.description,
            id:             from.id,
            name:           from.name,
            query:          from.query,
            updatedAt:      from.updated_at
        };

        return new Query(this._api, type);
    }

    /**
    * @param options Options object
    */
    constructor(options: ConnectionOptions) {
        super();
        this._api = new Api(options);
    }

    public createDevice(options?: DeviceType): Promise<Device>;
    public createDevice(options?: DeviceType, callback?: (err: any, data?: Device) => void): void;
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

    public listDevices(options?: ListOptions): Promise<ListResponse<Device>>;
    public listDevices(options?: ListOptions, callback?: (err: any, data?: ListResponse<Device>) => void): void;
    /**
    * Gets a list of devices
    * @param options Filters devices
    * @param callback A function that is passed the arguments (error, devices)
    * @returns Optional Promise of devices
    */
    public listDevices(options?: any, callback?: (err: any, data?: ListResponse<Device>) => void): Promise<ListResponse<Device>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let {limit, after, order, include, filter} = options;
        return pg(done => {
            this._api.catalog.deviceList(limit, order, after, filter, include, (error, data) => {
                if (error) return done(error);

                let devices = data.data.map(this.mapDevice);
                let response = mapListResponse<Device>(data, devices);

                done(null, response);
            });
        }, callback);
    }

    public listConnectedDevices(options?: { type?: string }): Promise<ListResponse<Device>>;
    public listConnectedDevices(options?: { type?: string }, callback?: (err: any, data?: ListResponse<Device>) => void): void;
    /**
    * Gets a list of currently connected device
    * @param type Filters devices by device type
    * @param callback A function that is passed the arguments (error, devices)
    * @returns Optional Promise of currently connected devices
    */
    public listConnectedDevices(options?: any, callback?: (err: any, data?: ListResponse<Device>) => void): Promise<ListResponse<Device>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { type } = options;
        return pg(done => {
            this._api.endpoints.v2EndpointsGet(type, (error, data) => {
                if (error) return done(error);

                let response:ListResponse<Device> = {
                    data: data.map(this.mapDevice)
                };

                done(null, response);
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
    public getWebhook(callback?: (err: any, data?: WebhookType) => void): Promise<WebhookType> {
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
    public updateWebhook(options: { data: WebhookType }, callback?: (err: any, data?: void) => void): Promise<void> {
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
    public deleteWebhook(callback?: (err: any, data?: void) => void): Promise<void> {
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

                let query = this.mapQuery(data);
                done(null, query);
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

    public listQueries(options?: ListOptions): Promise<ListResponse<Query>>;
    public listQueries(options?: ListOptions, callback?: (err: any, data?: ListResponse<Query>) => void): void;
    /**
    * Delete a device
    * @param options device ID
    * @param callback A function that is passed any error
    * @returns Optional Promise
    */
    public listQueries(options?:any, callback?: (err: any, data?: ListResponse<Query>) => void): Promise<ListResponse<Query>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, order, after, include } = options;
        return pg(done => {
            this._api.query.deviceQueryList(limit, order, after, include, (error, data) => {
                if (error) return done(error);

                let queries = data.data.map(this.mapQuery);
                let response = mapListResponse(data, queries);

                done(null, response);
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
            this._api.query.deviceQueryRetrieve(id, (error, data) => {
                if (error) return done(error);

                let query = this.mapQuery(data);
                done(null, query);
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
                this._api.query.deviceQueryUpdate(id, options, (error, data) => {
                    if (error) return done(error);

                    let query = this.mapQuery(data);
                    done(null, query);
                });
            }, callback);
        } else {
            // Partial update
            return pg(done => {
                this._api.query.deviceQueryPartialUpdate(id, description, name, null, query, null, (error, data) => {
                    if (error) return done(error);

                    let query = this.mapQuery(data);
                    done(null, query);
                });
            }, callback);
        }
    }
}
