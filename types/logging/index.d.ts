import { ConnectionOptions, ListOptions, ListResponse } from "../common/interfaces";
import { DeviceLog } from "./deviceLog";
/**
 * ## Logging API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbed = require("mbed-cloud-sdk");
 *
 * var logging = new mbed.LoggingApi({
 *     apiKey: "<mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/logging.min.js"></script>
 *
 * <script>
 *     var logging = new mbed.LoggingApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
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
