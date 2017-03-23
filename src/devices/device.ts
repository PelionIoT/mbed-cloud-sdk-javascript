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

import { asyncStyle } from "../common/functions";
import { DeviceType, MechanismEnum } from "./types";
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
            vendorId:                 from.vendor_id,
            type:                     from.type
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
            type:                 from.type
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
        return asyncStyle(done => {
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
        return asyncStyle(done => {
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
        return asyncStyle(done => {
            this._api.deleteDeviceSubscriptions({
                id: this.id
            }, done);
        }, callback);
    }

    /**
     * Update the device
     * @param options.name The name of the device
     * @param options.description The description of the device
     * @param options.customAttributes Up to 5 custom JSON attributes
     * @param options.deviceClass The device class
     * @param options.accountId The owning IAM account ID
     * @param options.autoUpdate Mark this device for auto firmware update
     * @param options.vendorId The device vendor ID
     * @param options.manifest URL for the current device manifest
     * @param options.trustClass The device trust class
     * @param options.trustLevel The device trust level
     * @param options.provisionKey The key used to provision the device
     * @param options.mechanism The ID of the channel used to communicate with the device
     * @param options.mechanismUrl The address of the connector to use
     * @param options.serialNumber The serial number of the device
     * @returns Promise of device
     */
    public update(options: { name?: string, description?: string, customAttributes?: { [key: string]: string; }, deviceClass?: string, accountId?: string, autoUpdate?: boolean, vendorId?: string, manifest?: string, trustClass?: number, trustLevel?: number, provisionKey?: string, mechanism?: MechanismEnum, mechanismUrl?: string, serialNumber?: string, type?: string }): Promise<Device>;
    /**
     * Update the device
     * @param options.name The name of the device
     * @param options.description The description of the device
     * @param options.customAttributes Up to 5 custom JSON attributes
     * @param options.deviceClass The device class
     * @param options.accountId The owning IAM account ID
     * @param options.autoUpdate Mark this device for auto firmware update
     * @param options.vendorId The device vendor ID
     * @param options.manifest URL for the current device manifest
     * @param options.trustClass The device trust class
     * @param options.trustLevel The device trust level
     * @param options.provisionKey The key used to provision the device
     * @param options.mechanism The ID of the channel used to communicate with the device
     * @param options.mechanismUrl The address of the connector to use
     * @param options.serialNumber The serial number of the device
     * @param options.type The endpoint type of the device
     * @param callback A function that is passed the arguments (error, device)
     */
    public update(options: { name?: string, description?: string, customAttributes?: { [key: string]: string; }, deviceClass?: string, accountId?: string, autoUpdate?: boolean, vendorId?: string, manifest?: string, trustClass?: number, trustLevel?: number, provisionKey?: string, mechanism?: MechanismEnum, mechanismUrl?: string, serialNumber?: string, type?: string }, callback?: (err: any, data?: Device) => any);
    public update(options: { name?: string, description?: string, customAttributes?: { [key: string]: string; }, deviceClass?: string, accountId?: string, autoUpdate?: boolean, vendorId?: string, manifest?: string, trustClass?: number, trustLevel?: number, provisionKey?: string, mechanism?: MechanismEnum, mechanismUrl?: string, serialNumber?: string, type?: string }, callback?: (err: any, data?: Device) => any): Promise<Device> {
        return asyncStyle(done => {
            this._api.updateDevice({
                id:this.id,
                accountId:           options.accountId,
                autoUpdate:          options.autoUpdate,
                customAttributes:    options.customAttributes,
                description:         options.description,
                deviceClass:         options.deviceClass,
                manifest:            options.manifest,
                mechanism:           options.mechanism,
                mechanismUrl:        options.mechanismUrl,
                name:                options.name,
                provisionKey:        options.provisionKey,
                serialNumber:        options.serialNumber,
                trustClass:          options.trustClass,
                trustLevel:          options.trustLevel,
                vendorId:            options.vendorId,
                type:                options.type
            }, done);
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
        return asyncStyle(done => {
            this._api.deleteDevice({
                id:    this.id
            }, done);
        }, callback);
    }
}
export interface Device extends DeviceType {}
