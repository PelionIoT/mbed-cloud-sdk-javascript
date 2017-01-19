import { DeviceType } from "./types";
import { Resource } from "./resource";
import { DeviceDetail as apiDeviceType } from "../_api/device_catalog";
/**
 * Device
 */
export declare class Device {
    constructor(options: DeviceType);
    static map(from: apiDeviceType): Device;
    /**
     * Gets details of a device
     * @returns Promise of device
     */
    getDetails(): Promise<Device>;
    /**
     * Gets details of a device
     * @param callback A function that is passed the arguments (error, device)
     */
    getDetails(callback: (err: any, data?: Device) => any): any;
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
     * Deletes a resource
     * @param options.path Path of the resource to delete
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @returns Promise containing any error
     */
    deleteResource(options: {
        path: string;
        noResponse?: boolean;
    }): Promise<void>;
    /**
     * Deletes a resource
     * @param options.path Path of the resource to delete
     * @param options.noResponse Whether to make a non-confirmable request to the device
     * @param callback A function that is passed any error
     */
    deleteResource(options: {
        path: string;
        noResponse?: boolean;
    }, callback?: (err: any, data?: void) => any): any;
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
}
export interface Device extends DeviceType {
}
