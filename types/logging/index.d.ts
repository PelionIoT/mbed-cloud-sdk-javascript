import { ConnectionOptions, ListOptions, ListResponse } from "../helpers/interfaces";
import { DeviceLog } from "./types";
/**
 * Root Logging class
 */
export declare class Logging {
    private _api;
    /**
     * @param options connection options
     */
    constructor(options: ConnectionOptions);
    private map(from, to?);
    /**
     * List device logs
     * @param options list options
     * @returns Promise of listResponse
     */
    listDeviceLogs(options?: ListOptions): Promise<ListResponse<DeviceLog>>;
    /**
     * List device logs
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    listDeviceLogs(options?: ListOptions, callback?: (err: any, data?: ListResponse<DeviceLog>) => any): void;
    /**
     * Get a single device log
     * @param options.id device log ID
     * @returns Promise of device log
     */
    getDeviceLog(options: {
        id: string;
    }): Promise<DeviceLog>;
    /**
     * Get a single device log
     * @param options.id device log ID
     * @param callback A function that is passed the return arguments (error, deviceLog)
     */
    getDeviceLog(options: {
        id: string;
    }, callback: (err: any, data?: DeviceLog) => any): void;
}
