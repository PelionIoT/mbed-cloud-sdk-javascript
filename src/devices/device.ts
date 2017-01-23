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

import { DeviceType } from "./types";
import { DevicesApi } from "./index";
import { Resource } from "./resource";
import { DeviceDetail as apiDeviceType } from "../_api/device_catalog";

/**
 * Device
 */
export class Device {

    constructor(options: DeviceType, private _api?: DevicesApi) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiDeviceType, api: DevicesApi): Device {
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

        return new Device(type, api);
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
        return this._api.getDevice({
            id: this.id
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
        return this._api.listDeviceResources({
            id: this.id
        }, callback);
    }

    /**
     * Deletes a resource
     * @param options.path Path of the resource to delete
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    public deleteResource(options: { path: string, noResponse?: boolean }): Promise<string>;
    /**
     * Deletes a resource
     * @param options.path Path of the resource to delete
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    public deleteResource(options: { path: string, noResponse?: boolean }, callback?: (err: any, data?: string) => any);
    public deleteResource(options: { path: string, noResponse?: boolean }, callback?: (err: any, data?: string) => any): Promise<string> {
        let { path, noResponse } = options;
        return this._api.deleteDeviceResource({
            id:            this.id,
            path:          path,
            noResponse:    noResponse
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
        return this._api.listDeviceSubscriptions({
            id: this.id
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
        return this._api.deleteDeviceSubscriptions({
            id: this.id
        }, callback);
    }
}
export interface Device extends DeviceType {}
