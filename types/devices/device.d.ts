import { DeviceType, MechanismEnum } from "./types";
import { DevicesApi } from "./index";
import { Resource } from "./resource";
import { DeviceDetail as apiDeviceType } from "../_api/device_catalog";
/**
 * Device
 */
export declare class Device {
    private _api;
    constructor(options: DeviceType, _api?: DevicesApi);
    static map(from: apiDeviceType, api: DevicesApi): Device;
    static reverseMap(from: DeviceType): apiDeviceType;
    /**
     * List device's resources
     * @returns Promise of device resources
     */
    listResources(): Promise<Resource[]>;
    /**
     * List device's resources
     * @param callback A function that is passed the arguments (error, resources)
     */
    listResources(callback: (err: any, data?: Resource[]) => any): any;
    /**
     * List a device's subscriptions
     * @returns Promise containing the subscriptions
     */
    listSubscriptions(): Promise<any>;
    /**
     * List a device's subscriptions
     * @param callback A function that is passed (error, subscriptions)
     */
    listSubscriptions(callback: (err: any, data?: any) => any): any;
    /**
     * Removes a device's subscriptions
     * @returns Promise containing any error
     */
    deleteSubscriptions(): Promise<void>;
    /**
     * Removes a device's subscriptions
     * @param callback A function that is passed any error
     */
    deleteSubscriptions(callback: (err: any, data?: void) => any): any;
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
    update(options: {
        name?: string;
        description?: string;
        customAttributes?: {
            [key: string]: string;
        };
        deviceClass?: string;
        accountId?: string;
        autoUpdate?: boolean;
        vendorId?: string;
        manifest?: string;
        trustClass?: number;
        trustLevel?: number;
        provisionKey?: string;
        mechanism?: MechanismEnum;
        mechanismUrl?: string;
        serialNumber?: string;
    }): Promise<Device>;
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
     * @param callback A function that is passed the arguments (error, device)
     */
    update(options: {
        name?: string;
        description?: string;
        customAttributes?: {
            [key: string]: string;
        };
        deviceClass?: string;
        accountId?: string;
        autoUpdate?: boolean;
        vendorId?: string;
        manifest?: string;
        trustClass?: number;
        trustLevel?: number;
        provisionKey?: string;
        mechanism?: MechanismEnum;
        mechanismUrl?: string;
        serialNumber?: string;
    }, callback?: (err: any, data?: Device) => any): any;
    /**
     * Deletes a device
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Deletes a device
     * @param callback A function that is passed any error
     */
    delete(callback?: (err: any, data?: void) => any): any;
}
export interface Device extends DeviceType {
}
