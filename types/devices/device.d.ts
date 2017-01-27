import { DeviceType } from "./types";
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
     * Update a device
     * @param options device details
     * @returns Promise of device
     */
    update(options: DeviceType): Promise<Device>;
    /**
     * Update a device
     * @param options device details
     * @param callback A function that is passed the arguments (error, device)
     */
    update(options: DeviceType, callback?: (err: any, data?: Device) => any): any;
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
