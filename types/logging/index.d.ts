import { ConnectionOptions, ListOptions, ListResponse } from "../helpers/interfaces";
import { DeviceLogType } from "./types";
/**
 * Root Logging class
 */
export declare class Logging {
    private _api;
    /**
     * @param options connection options
     */
    constructor(options: ConnectionOptions);
    private mapDeviceLog(from);
    /**
     * List device logs
     * @param options list options
     * @returns Promise of listResponse
     */
    listDeviceLogs(options?: ListOptions): Promise<ListResponse<DeviceLogType>>;
    /**
     * List device logs
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    listDeviceLogs(options?: ListOptions, callback?: (err: any, data?: ListResponse<DeviceLogType>) => any): void;
    /**
     * Get a single device log
     * @param options.id device log ID
     * @returns Promise of device log
     */
    getDeviceLog(options: {
        id: string;
    }): Promise<DeviceLogType>;
    /**
     * Get a single device log
     * @param options.id device log ID
     * @param callback A function that is passed the return arguments (error, deviceLog)
     */
    getDeviceLog(options: {
        id: string;
    }, callback: (err: any, data?: DeviceLogType) => any): void;
}
