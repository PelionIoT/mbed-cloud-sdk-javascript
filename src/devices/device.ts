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
import { DeviceType } from "./types";
import { Resource } from "./resource";
import { DevicesApi } from "./index";
import { DeviceDetail as apiDeviceType } from "../_api/device_catalog";

/**
 * Device
 */
export class Device {

    constructor(options: DeviceType) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiDeviceType): Device {
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

        return new Device(type);
    }

    /**
     * Gets details of a device
     * @returns Promise of device
     */
    public getDetails(): Promise<Device>;
    /**
     * Gets details of a device
     * @param callback A function that is passed the arguments (error, device)
     */
    public getDetails(callback: (err: any, data?: Device) => any);
    public getDetails(callback?: (err: any, data?: Device) => any): Promise<Device> {
        return pg(done => {
            DevicesApi._endpoints.catalog.deviceRetrieve(this.id, (error, data) => {
                if (error) return done(error);

                let device = Device.map(data);
                done(null, device);
            });
        }, callback);
    }

    /**
     * List device's resources
     * @returns Promise of device resources
     */
    public listResources(): Promise<Resource[]>;
    /**
     * List device's resources
     * @param callback A function that is passed the arguments (error, resources)
     */
    public listResources(callback: (err: any, data?: Resource[]) => any);
    public listResources(callback?: (err: any, data?: Resource[]) => any): Promise<Resource[]> {
        return pg(done => {
            DevicesApi._endpoints.endpoints.v2EndpointsEndpointNameGet(this.id, (error, data) => {
                if (error) return done(error);

                var resources = data.map(resource => {
                    return Resource.map(resource, this.id);
                });
                done(null, resources);
            });
        }, callback);
    }

    /**
     * Deletes a resource
     * @param options.path Path of the resource to delete
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    public deleteResource(options: { path: string, noResponse?: boolean }): Promise<void>;
    /**
     * Deletes a resource
     * @param options.path Path of the resource to delete
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    public deleteResource(options: { path: string, noResponse?: boolean }, callback?: (err: any, data?: void) => any);
    public deleteResource(options: { path: string, noResponse?: boolean }, callback?: (err: any, data?: void) => any): Promise<void> {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathDelete
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
     * List a device's subscriptions
     * @returns Promise containing the subscriptions
     */
    public listSubscriptions(): Promise<any>;
    /**
     * List a device's subscriptions
     * @param callback A function that is passed (error, subscriptions)
     */
    public listSubscriptions(callback: (err: any, data?: any) => any);
    public listSubscriptions(callback?: (err: any, data?: any) => any): Promise<any> {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameGet
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
     * Removes a device's subscriptions
     * @returns Promise containing any error
     */
    public deleteSubscriptions(): Promise<void>;
    /**
     * Removes a device's subscriptions
     * @param callback A function that is passed any error
     */
    public deleteSubscriptions(callback: (err: any, data?: void) => any);
    public deleteSubscriptions(callback?: (err: any, data?: void) => any): Promise<void> {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameDelete
        return pg(done => {
            done(null, null);
        }, callback);
    }
}
export interface Device extends DeviceType {}
