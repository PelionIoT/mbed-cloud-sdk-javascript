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

import { asyncStyle, mapListResponse, encodeInclude, encodeAttributes } from "../common/functions";
import { ConnectionOptions, ListOptions, ListResponse } from "../common/interfaces";
import { Endpoints } from "./endpoints";
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
 * <script src="<mbed-cloud-sdk>/bundles/devices.min.js"></script>
 *
 * <script>
 *     var logging = new mbed.LoggingApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 */
export class LoggingApi {

    private _endpoints: Endpoints;

    /**
     * @param options connection options
     */
    constructor(options: ConnectionOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * List device logs
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listDeviceLogs(options?: ListOptions): Promise<ListResponse<DeviceLog>>;
    /**
     * List device logs
     * @param options filter options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listDeviceLogs(options?: ListOptions, callback?: (err: any, data?: ListResponse<DeviceLog>) => any);
    public listDeviceLogs(options?:any, callback?: (err: any, data?: ListResponse<DeviceLog>) => any): Promise<ListResponse<DeviceLog>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let { limit, order, after, attributes, include } = options as ListOptions;
        let filter = encodeAttributes(attributes);

        return asyncStyle(done => {
            this._endpoints.catalog.deviceLogList(limit, order, after, filter, encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let list = data.data.map(log => {
                    return DeviceLog.map(log);
                });

                done(null, mapListResponse<DeviceLog>(data, list));
            });
        }, callback);
    }

    /**
     * Get a single device log
     * @param options.id device log ID
     * @returns Promise of device log
     */
    public getDeviceLog(options: { id: string }): Promise<DeviceLog>;
    /**
     * Get a single device log
     * @param options.id device log ID
     * @param callback A function that is passed the return arguments (error, device log)
     */
    public getDeviceLog(options: { id: string }, callback: (err: any, data?: DeviceLog) => any);
    public getDeviceLog(options: { id: string }, callback?: (err: any, data?: DeviceLog) => any): Promise<DeviceLog> {
        let { id } = options;
        return asyncStyle(done => {
            this._endpoints.catalog.deviceLogRetrieve(id, (error, data) => {
                if (error) return done(error);
                let log = DeviceLog.map(data);
                done(null, log);
            });
        }, callback);
    }
}
