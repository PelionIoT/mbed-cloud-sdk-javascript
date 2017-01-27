import { ConnectionOptions, ListOptions, ListResponse } from "../common/interfaces";
import { DeviceLog } from "./deviceLog";
/**
 * Root Logging API
 */
export declare class LoggingApi {
    private _endpoints;
    /**
     * @param options connection options
     */
    constructor(options: ConnectionOptions);
    /**
     * List device logs
     * @param options filter options
     * @returns Promise of listResponse
     */
    listDeviceLogs(options?: ListOptions): Promise<ListResponse<DeviceLog>>;
    /**
     * List device logs
     * @param options filter options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    listDeviceLogs(options?: ListOptions, callback?: (err: any, data?: ListResponse<DeviceLog>) => any): any;
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
     * @param callback A function that is passed the return arguments (error, device log)
     */
    getDeviceLog(options: {
        id: string;
    }, callback: (err: any, data?: DeviceLog) => any): any;
}
