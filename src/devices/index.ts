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
import { ConnectionOptions, ListOptions, ListResponse } from "../common/interfaces";
import { decodeBase64, mapListResponse, encodeInclude } from "../common/functions";
import { Endpoints } from "./endpoints";
import { DevicesApiType, DeviceType, DeviceEventType, QueryType, QueryOptions, WebhookType, PresubscriptionType } from "./types";
import { Device } from "./device";
import { Resource } from "./resource";
import { Query } from "./query";
import { Webhook } from "./webhook";
import { Presubscription } from "./presubscription";

/**
 * Root Devices API
 */
export class DevicesApi extends EventEmitter {

    private readonly asyncKey = "async-response-id";
    private _endpoints: Endpoints;
    private _pollRequest: superagent.SuperAgentRequest;
    private _asyncFns: { [key: string]: Function; } = {};
    private _notifyFns: { [key: string]: Function; } = {};

    /**
     * Resource notification event
     * @event
     */
    static EVENT_NOTIFICATION: string = "notification";

    /**
     * List of new devices that have registered (with resources)
     * @event
     */
    static EVENT_REGISTRATION: string = "registration";

    /**
     * List of devices that have updated registration
     * @event
     */
    static EVENT_REREGISTRATION: string = "reregistration";

    /**
     * List of devices that were removed in a controlled manner
     * @event
     */
    static EVENT_DEREGISTRATION: string = "deregistration";

    /**
     * List of devices that were removed because the registration has expired
     * @event
     */
    static EVENT_EXPIRED: string = "expired";

    /**
     * @param options connection objects
     */
    constructor(options: ConnectionOptions) {
        super();
        this._endpoints = new Endpoints(options);
    }

    /**
     * Allows a notification to be injected into the notifications system
     * `handleNotifications` needs to be set to true for this to work with web hook async responses
     * @param data The notification data to inject
     */
    public notify(data: any) {

        function mapDevice(from): DeviceEventType {
            let device:DeviceEventType = {
                id:           from.ep,
                type:         from.ept,
                queueMode:    from.q,
                resources:    from.resources.map(function(resource) {
                    return {
                        observable:     resource.obs,
                        type:           resource.rf,
                        contentType:    resource.ct,
                        path:           resource.path
                    };
                })
            };

            return device;
        }

        if (data["notifications"]) {
            data["notifications"].forEach(notification => {
                var path = notification.ep + notification.path;
                var fn = this._notifyFns[path];

                if (fn) {
                    fn(decodeBase64(notification.payload, notification.ct));
                }
            });
        }

        if (data["registrations"]) {
            data["registrations"].forEach(device => {
                this.emit(DevicesApi.EVENT_REGISTRATION, mapDevice(device));
            });
        }

        if (data["reg-updates"]) {
            data["reg-updates"].forEach(device => {
                this.emit(DevicesApi.EVENT_REREGISTRATION, mapDevice(device));
            });
        }

        if (data["de-registrations"]) {
            data["de-registrations"].forEach(deviceId => {
                this.emit(DevicesApi.EVENT_DEREGISTRATION, deviceId);
            });
        }

        if (data["registrations-expired"]) {
            data["registrations-expired"].forEach(deviceId => {
                this.emit(DevicesApi.EVENT_EXPIRED, deviceId);
            });
        }

        if (data["async-responses"]) {
            data["async-responses"].forEach(response => {
                var asyncID = response.id;
                var fn = this._asyncFns[asyncID];
                if (fn) {
                    if (response.status >= 400) {
                        fn(response.error || response.status, null);
                    } else {
                        fn(null, decodeBase64(response.payload, response.ct));
                    }
                    delete this._asyncFns[asyncID];
                }
            });
        }
    }

    /**
     * Begins long polling constantly for notifications
     * @param options.requestCallback A function that is passed async responses
     * @returns Promise containing any error
     */
    public startNotifications(options?: { requestCallback?: (err: any, data?: any) => any }): Promise<void>;
    /**
     * Begins long polling constantly for notifications
     * @param options.requestCallback A function that is passed async responses
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
            this._pollRequest = this._endpoints.notifications.v2NotificationPullGet((error, data) => {

                if (!this.handleNotifications) return;

                this.notify(data);

                if (requestCallback) requestCallback(error, data);

                if (error) {
                    this.handleNotifications = false;
                    return;
                }

                setTimeout(poll.bind(this), 500);
            });
        }

        poll.call(this);
        this.handleNotifications = true;

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
    public stopNotifications(callback?: (err: any, data?: void) => any): Promise<void> {
        if (this._pollRequest) {
            this._pollRequest.abort();
            this._pollRequest = null;
        }

        this.handleNotifications = false;

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
        return pg(done => {
            this._endpoints.webhooks.v2NotificationCallbackGet((error, data) => {
                if (error) return done(error);

                let webhook = Webhook.map(data);
                done(null, webhook);
            });
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
    public updateWebhook(options: WebhookType, callback?: (err: any, data?: void) => any): Promise<void> {
        return pg(done => {
            this._endpoints.notifications.v2NotificationCallbackPut({
                headers: options.headers,
                url: options.url
            }, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
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
        return pg(done => {
            this._endpoints.webhooks.v2NotificationCallbackDelete((error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * Gets pre-subscription data
     * @returns Promise containing data
     */
    public getPresubscription(): Promise<Presubscription[]>;
    /**
     * Gets pre-subscription data
     * @param callback A function that is passed (error, data)
     */
    public getPresubscription(callback?: (err: any, data?: Presubscription[]) => any);
    public getPresubscription(callback?: (err: any, data?: Presubscription[]) => any): Promise<Presubscription[]> {
        return pg(done => {
            this._endpoints.subscriptions.v2SubscriptionsGet((error, data) => {
                if (error) return done(error);

                let presubs = data.map(Presubscription.map);
                done(null, presubs);
            });
        }, callback);
    }

    /**
     * Updates pre-subscription data. If you send an empty array, the pre-subscription data will be removed
     * @param options.data The pre-subscription data
     * @returns Promise containing any error
     */
    public updatePresubscription(options: PresubscriptionType[]): Promise<void>;
    /**
     * Updates pre-subscription data. If you send an empty array, the pre-subscription data will be removed
     * @param options.data The pre-subscription data
     * @param callback A function that is passed any error
     */
    public updatePresubscription(options: PresubscriptionType[], callback?: (err: any, data?: void) => any);
    public updatePresubscription(options: PresubscriptionType[], callback?: (err: any, data?: void) => any): Promise<void> {
        let presubs = options.map(Presubscription.reverseMap);
        return pg(done => {
            this._endpoints.subscriptions.v2SubscriptionsPut(presubs, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
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
        return pg(done => {
            this._endpoints.subscriptions.v2SubscriptionsDelete((error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * Gets a list of devices
     * @param options list options
     * @returns Promise of devices
     */
    public listDevices(options?: QueryOptions): Promise<ListResponse<Device>>;
    /**
     * Gets a list of devices
     * @param options list options
     * @param callback A function that is passed the arguments (error, devices)
     */
    public listDevices(options?: QueryOptions, callback?: (err: any, data?: ListResponse<Device>) => any);
    public listDevices(options?: any, callback?: (err: any, data?: ListResponse<Device>) => any): Promise<ListResponse<Device>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let { limit, after, order, include } = options as QueryOptions;
        let filter = Query.encodeQuery(options);

        return pg(done => {
            this._endpoints.catalog.deviceList(limit, order, after, filter, encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let devices = data.data.map(device => {
                    return Device.map(device, this);
                });
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
    public listConnectedDevices(options?: { type?: string }, callback?: (err: any, data?: ListResponse<Device>) => any);
    public listConnectedDevices(options?: any, callback?: (err: any, data?: ListResponse<Device>) => any): Promise<ListResponse<Device>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { type } = options;
        return pg(done => {
            this._endpoints.endpoints.v2EndpointsGet(type, (error, data) => {
                if (error) return done(error);

                let response:ListResponse<Device> = {
                    data: data.map(device => {
                        return Device.map({
                            id: device.name
                        }, this)
                    })
                };

                done(null, response);
            });
        }, callback);
    }

    /**
     * Gets details of a device
     * @param options.id Device ID
     * @returns Promise of device
     */
    public getDevice(options: { id: string }): Promise<Device>;
    /**
     * Gets details of a device
     * @param options.id ID of device to get details for
     * @param callback A function that is passed the arguments (error, device)
     */
    public getDevice(options: { id: string }, callback: (err: any, data?: Device) => any);
    public getDevice(options: { id: string }, callback?: (err: any, data?: Device) => any): Promise<Device> {
        return pg(done => {
            this._endpoints.catalog.deviceRetrieve(options.id, (error, data) => {
                if (error) return done(error);

                let device = Device.map(data, this);
                done(null, device);
            });
        }, callback);
    }

    /**
     * Add a device
     * @param options Device details
     * @returns Promise of device
     */
    public addDevice(options: DeviceType): Promise<Device>;
    /**
     * Add a device
     * @param options Device details
     * @param callback A function that is passed the arguments (error, device)
     */
    public addDevice(options: DeviceType, callback?: (err: any, data?: Device) => any);
    public addDevice(options: DeviceType, callback?: (err: any, data?: Device) => any): Promise<Device> {
        let { mechanism, provisionKey, accountId, autoUpdate, bootstrappedTimestamp, createdAt, customAttributes,
              deployedState, deployment, description, deviceClass, id, manifest, mechanismUrl, name,
              serialNumber, state, trustClass, trustLevel, updatedAt, vendorId } = options;
        return pg(done => {
            this._endpoints.catalog.deviceCreate(
              mechanism, provisionKey, accountId, autoUpdate, bootstrappedTimestamp, createdAt, customAttributes,
              deployedState, deployment, description, deviceClass, null, null, id, manifest, mechanismUrl, name,
              null, serialNumber, state, trustClass, trustLevel, updatedAt, vendorId, (error, data) => {
                if (error) return done(error);
                done(null, Device.map(data, this));
            });
        }, callback);
    }

    /**
     * Update a device
     * @param options device details
     * @returns Promise of device
     */
    public updateDevice(options: DeviceType): Promise<Device>;
    /**
     * Update a device
     * @param options device details
     * @param callback A function that is passed the arguments (error, device)
     */
    public updateDevice(options: DeviceType, callback?: (err: any, data?: Device) => any);
    public updateDevice(options: DeviceType, callback?: (err: any, data?: Device) => any): Promise<Device> {
        return pg(done => {
            let apiDevice = Device.reverseMap(options);
            this._endpoints.catalog.deviceUpdate(options.id, apiDevice, (error, data) => {
                if (error) return done(error);

                let device = Device.map(data, this);
                done(null, device);
            });
        }, callback);
    }

    /**
     * Delete a device
     * @param options.id Device ID
     * @returns Promise containing any error
     */
    public deleteDevice(options: { id: string }): Promise<void>;
    /**
     * Delete a device
     * @param options.id Device ID
     * @param callback A function that is passed any error
     */
    public deleteDevice(options: { id: string }, callback?: (err: any, data?: void) => any);
    public deleteDevice(options?:any, callback?: (err: any, data?: void) => any): Promise<void> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { id } = options;
        return pg(done => {
            this._endpoints.catalog.deviceDestroy(id, (error, data) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * List a device's subscriptions
     * @param options.id Device ID
     * @returns Promise containing the subscriptions
     */
    public listDeviceSubscriptions(options: { id: string }): Promise<any>;
    /**
     * List a device's subscriptions
     * @param options.id Device ID
     * @param callback A function that is passed (error, subscriptions)
     */
    public listDeviceSubscriptions(options: { id: string }, callback: (err: any, data?: any) => any);
    public listDeviceSubscriptions(options: { id: string }, callback?: (err: any, data?: any) => any): Promise<any> {
        return pg(done => {
            this._endpoints.subscriptions.v2SubscriptionsEndpointNameGet(options.id, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * Removes a device's subscriptions
     * @param options.id Device ID
     * @returns Promise containing any error
     */
    public deleteDeviceSubscriptions(options: { id: string }): Promise<void>;
    /**
     * Removes a device's subscriptions
     * @param options.id Device ID
     * @param callback A function that is passed any error
     */
    public deleteDeviceSubscriptions(options: { id: string }, callback: (err: any, data?: void) => any);
    public deleteDeviceSubscriptions(options: { id: string }, callback?: (err: any, data?: void) => any): Promise<void> {
        return pg(done => {
            this._endpoints.subscriptions.v2SubscriptionsEndpointNameDelete(options.id, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * List device's resources
     * @param options.id Device ID
     * @returns Promise of device resources
     */
    public listDeviceResources(options: { id: string }): Promise<Resource[]>;
    /**
     * List device's resources
     * @param options.id Device ID
     * @param callback A function that is passed the arguments (error, resources)
     */
    public listDeviceResources(options: { id: string }, callback: (err: any, data?: Resource[]) => any);
    public listDeviceResources(options: { id: string }, callback?: (err: any, data?: Resource[]) => any): Promise<Resource[]> {
        return pg(done => {
            this._endpoints.endpoints.v2EndpointsEndpointNameGet(options.id, (error, data) => {
                if (error) return done(error);

                var resources = data.map(resource => {
                    return Resource.map(resource, options.id, this);
                });
                done(null, resources);
            });
        }, callback);
    }

    /**
     * Deletes a resource
     * @param options.id Device ID
     * @param options.path Path of the resource to delete
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    public deleteDeviceResource(options: { id: string, path: string, noResponse?: boolean }): Promise<string>;
    /**
     * Deletes a resource
     * @param options.id Device ID
     * @param options.path Path of the resource to delete
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    public deleteDeviceResource(options: { id: string, path: string, noResponse?: boolean }, callback?: (err: any, data?: string) => any);
    public deleteDeviceResource(options: { id: string, path: string, noResponse?: boolean }, callback?: (err: any, data?: string) => any): Promise<string> {
        let { id, path, noResponse } = options;
        return pg(done => {
            this._endpoints.resources.v2EndpointsEndpointNameResourcePathDelete(id, path, noResponse, (error, data) => {
                if (error) return done(error);
                done(null, data[this.asyncKey]);
            });
        }, callback);
    }

    /**
     * Gets the value of a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.cacheOnly If true, the response will come only from the cache
     * @param options.noResponse If true, If true, mbed Device Connector will not wait for a response
     * @returns Promise of resource value when handling notifications or an asyncId
     */
    public getResourceValue(options: { id: string, path: string, cacheOnly?: boolean, noResponse?: boolean }): Promise<string>;
    /**
     * Gets the value of a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.cacheOnly If true, the response will come only from the cache
     * @param options.noResponse If true, If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed the arguments (error, value) where value is the resource value when handling notifications or an asyncId
     */
    public getResourceValue(options: { id: string, path: string, cacheOnly?: boolean, noResponse?: boolean }, callback: (err: any, data?: string) => any);
    public getResourceValue(options: { id: string, path: string, cacheOnly?: boolean, noResponse?: boolean }, callback?: (err: any, data?: string) => any): Promise<string> {
        let { id, path, cacheOnly, noResponse } = options;
        return pg(done => {
            this._endpoints.resources.v2EndpointsEndpointNameResourcePathGet(id, path, cacheOnly, noResponse, (error, data) => {
                if (error) return done(error);

                var asyncID = data[this.asyncKey];
                if (this.handleNotifications && asyncID) {
                    this._asyncFns[asyncID] = done;
                    return;
                }

                done(null, asyncID);
            });
        }, callback);
    }

    /**
     * Sets the value of a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.value The value of the resource
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    public setResourceValue(options: { id: string, path: string, value: string, noResponse?: boolean }): Promise<string>;
    /**
     * Sets the value of a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.value The value of the resource
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    public setResourceValue(options: { id: string, path: string, value: string, noResponse?: boolean }, callback?: (err: any, data?: string) => any);
    public setResourceValue(options: { id: string, path: string, value: string, noResponse?: boolean }, callback?: (err: any, data?: string) => any): Promise<string> {
        let { id, path, value, noResponse } = options;
        return pg(done => {
            this._endpoints.resources.v2EndpointsEndpointNameResourcePathPut(id, path.substr(1), value, noResponse, (error, data) => {
                if (error) return done(error);

                var asyncID = data[this.asyncKey];
                if (this.handleNotifications && asyncID) {
                    this._asyncFns[asyncID] = done;
                    return;
                }

                done(null, asyncID);
            });
        }, callback);
    }

    /**
     * Execute a function on a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.fn The function to trigger
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @returns Promise containing any error
     */
    public executeResource(options: { id: string, path: string, fn?: string, noResponse?: boolean }): Promise<string>;
    /**
     * Execute a function on a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.fn The function to trigger
     * @param options.noResponse If true, mbed Device Connector will not wait for a response
     * @param callback A function that is passed any error
     */
    public executeResource(options: { id: string, path: string, fn?: string, noResponse?: boolean }, callback?: (err: any, data?: string) => any);
    public executeResource(options: { id: string, path: string, fn?: string, noResponse?: boolean }, callback?: (err: any, data?: string) => any): Promise<string> {
        let { id, path, fn, noResponse } = options;
        return pg(done => {
            this._endpoints.resources.v2EndpointsEndpointNameResourcePathPost(id, path, fn, noResponse, (error, data) => {
                if (error) return done(error);

                var asyncID = data[this.asyncKey];
                if (this.handleNotifications && asyncID) {
                    this._asyncFns[asyncID] = done;
                    return;
                }

                done(null, asyncID);
            });
        }, callback);
    }

    /**
     * Gets the status of a resource's subscription
     * @param options.id Device ID
     * @param options.path Resource path
     * @returns Promise containing resource subscription status
     */
    public getResourceSubscription(options: { id: string, path: string }): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     * @param options.id Device ID
     * @param options.path Resource path
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    public getResourceSubscription(options: { id: string, path: string }, callback: (err: any, data?: boolean) => any);
    public getResourceSubscription(options: { id: string, path: string }, callback?: (err: any, data?: boolean) => any): Promise<boolean> {
        let { id, path } = options;
        return pg(done => {
            this._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathGet(id, path, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * Subscribe to a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.fn Function to call with notification
     * @returns Promise containing any error
     */
    public addResourceSubscription(options: { id: string, path: string, fn?: Function }): Promise<void>;
    /**
     * Subscribe to a resource
     * @param options.id Device ID
     * @param options.path Resource path
     * @param options.fn Function to call with notification
     * @param callback A function that is passed any error
     */
    public addResourceSubscription(options: { id: string, path: string, fn?: Function }, callback?: (err: any, data?: void) => any);
    public addResourceSubscription(options: { id: string, path: string, fn?: Function }, callback?: (err: any, data?: void) => any): Promise<void> {
        let { id, path, fn } = options;
        return pg(done => {
            this._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathPut(id, path, (error, data) => {
                if (error) return done(error);

                if (fn) {
                    // Record the function at this path for notifications
                    this._notifyFns[id + path] = fn;
                }

                var asyncID = data[this.asyncKey];
                if (this.handleNotifications && asyncID) {
                    this._asyncFns[asyncID] = done;
                    return;
                }

                done(null, asyncID);
            });
        }, callback);
    }

    /**
     * Deletes a resource's subscription
     * @param options.id Device ID
     * @param options.path Resource path
     * @returns Promise containing any error
     */
    public deleteResourceSubscription(options: { id: string, path: string }): Promise<void>;
    /**
     * Deletes a resource's subscription
     * @param options.id Device ID
     * @param options.path Resource path
     * @param callback A function that is passed any error
     */
    public deleteResourceSubscription(options: { id: string, path: string }, callback?: (err: any, data?: void) => any);
    public deleteResourceSubscription(options: { id: string, path: string }, callback?: (err: any, data?: void) => any): Promise<void> {
        let { id, path } = options;
        return pg(done => {
            this._endpoints.subscriptions.v2SubscriptionsEndpointNameResourcePathDelete(id, path, (error, data) => {
                if (error) return done(error);

                // no-one is listening :(
                delete this._notifyFns[id + path];

                var asyncID = data[this.asyncKey];
                if (this.handleNotifications && asyncID) {
                    this._asyncFns[asyncID] = done;
                    return;
                }

                done(null, asyncID);
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
    public listQueries(options?: ListOptions, callback?: (err: any, data?: ListResponse<Query>) => any);
    public listQueries(options?:any, callback?: (err: any, data?: ListResponse<Query>) => any): Promise<ListResponse<Query>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, order, after, include } = options as ListOptions;
        return pg(done => {
            this._endpoints.query.deviceQueryList(limit, order, after, encodeInclude(include), (error, data) => {
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
    public getQuery(options: { id: string }, callback?: (err: any, data?: Query) => any);
    public getQuery(options: { id: string }, callback?: (err: any, data?: Query) => any): Promise<Query> {
        let { id } = options;
        return pg(done => {
            this._endpoints.query.deviceQueryRetrieve(id, (error, data) => {
                if (error) return done(error);

                let query = Query.map(data);
                done(null, query);
            });
        }, callback);
    }

    /**
     * Add a query
     * @param options query details
     * @returns Promise of query
     */
    public addQuery(options: QueryType): Promise<Query>;
    /**
     * Add a query
     * @param options query details
     * @param callback A function that is passed the arguments (error, query)
     */
    public addQuery(options: QueryType, callback?: (err: any, data?: Query) => any);
    public addQuery(options: QueryType, callback?: (err: any, data?: Query) => any): Promise<Query> {
        let { name, description } = options;
        let query = Query.encodeQuery(options);
        return pg(done => {
            this._endpoints.query.deviceQueryCreate(name, query, description, null, null, (error, data) => {
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
    public updateQuery(options: QueryType, callback?: (err: any, data?: Query) => any);
    public updateQuery(options: QueryType, callback?: (err: any, data?: Query) => any): Promise<Query> {
        let { id, name, description } = options;
        let query = Query.encodeQuery(options);

        if (name && query) {
            // Full update
            return pg(done => {
                this._endpoints.query.deviceQueryUpdate(id, {
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
                this._endpoints.query.deviceQueryPartialUpdate(id, description, name, null, query, null, (error, data) => {
                    if (error) return done(error);

                    let query = Query.map(data);
                    done(null, query);
                });
            }, callback);
        }
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
    public deleteQuery(options: { id: string }, callback?: (err: any, data?: void) => any);
    public deleteQuery(options: { id: string }, callback?: (err: any, data?: void) => any): Promise<void> {
        let { id } = options;
        return pg(done => {
            this._endpoints.query.deviceQueryDestroy(id, (error, data) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }
}
export interface DevicesApi extends DevicesApiType {}
