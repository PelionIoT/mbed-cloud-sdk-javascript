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

    static reverseMap(from: DeviceType): apiDeviceType {
        return {
            account_id:           from.accountId,
            name:                 from.name,
            auto_update:          from.autoUpdate,
            vendor_id:            from.vendorId,
            custom_attributes:    from.customAttributes,
            manifest:             from.manifest,
            trust_class:          from.trustClass,
            provision_key:        from.provisionKey,
            mechanism:            from.mechanism,
            device_class:         from.deviceClass,
            mechanism_url:        from.mechanismUrl,
            serial_number:        from.serialNumber,
            trust_level:          from.trustLevel,
            description:          from.description,
        };
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
            this._api.listDeviceResources({
                id: this.id
            }, done);
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
        return pg(done => {
            this._api.listDeviceSubscriptions({
                id: this.id
            }, done);
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
        return pg(done => {
            this._api.deleteDeviceSubscriptions({
                id: this.id
            }, done);
        }, callback);
    }

    /**
     * Update a device
     * @param options device details
     * @returns Promise of device
     */
    public update(options: DeviceType): Promise<Device>;
    /**
     * Update a device
     * @param options device details
     * @param callback A function that is passed the arguments (error, device)
     */
    public update(options: DeviceType, callback?: (err: any, data?: Device) => any);
    public update(options: DeviceType, callback?: (err: any, data?: Device) => any): Promise<Device> {
        return pg(done => {
            this._api.updateDevice(options, done);
        }, callback);
    }

    /**
     * Deletes a device
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Deletes a device
     * @param callback A function that is passed any error
     */
    public delete(callback?: (err: any, data?: void) => any);
    public delete(callback?: (err: any, data?: void) => any): Promise<void> {
        return pg(done => {
            this._api.deleteDevice({
                id:    this.id
            }, done);
        }, callback);
    }
}
export interface Device extends DeviceType {}
