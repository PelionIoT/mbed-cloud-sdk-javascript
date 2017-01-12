import { DeviceType } from "./types";
import { Api } from "./api";
import { Resource } from "./resource";
/**
 * Object representing a device
 */
export declare class Device {
    private _api;
    id: string;
    constructor(_api: Api, id: string);
    getDetails(): Promise<any>;
    getDetails(callback: (err: any, data?: any) => void): void;
    listResources(): Promise<Resource[]>;
    listResources(callback: (err: any, data?: Resource[]) => void): void;
    /**
    * Deletes a resource
    * @param path Path of the resource to delete
    * @param noResp Whether to make a non-confirmable request to the device
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    deleteResource(options: {
        path: string;
        noResp?: boolean;
    }, callback?: (err: any, data?: void) => void): Promise<void>;
    /**
    * Gets a list of a device's subscriptions
    * @param callback A function that is passed (error, subscriptions)
    * @returns Optional Promise containing the subscriptions
    */
    listSubscriptions(callback?: (err: any, data?: any) => void): Promise<any>;
    /**
    * Removes a device's subscriptions
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    deleteSubscriptions(callback?: (err: any, data?: void) => void): Promise<void>;
}
export interface Device extends DeviceType {
}
