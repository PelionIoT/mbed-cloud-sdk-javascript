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

import { asyncStyle, mapListResponse, encodeAttributes } from "../common/functions";
import { ConnectionOptions, CallbackFn, ListOptions, ListResponse } from "../common/interfaces";
import { Endpoints } from "./endpoints";
import { DeviceLogAdapter } from "./models/deviceLogAdapter";
import { DeviceLog } from "./models/deviceLog";

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
    public listDeviceLogs(options?: ListOptions, callback?: CallbackFn<ListResponse<DeviceLog>>);
    public listDeviceLogs(options?:any, callback?: CallbackFn<ListResponse<DeviceLog>>): Promise<ListResponse<DeviceLog>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let { limit, order, after, attributes } = options as ListOptions;
        let filter = encodeAttributes(attributes);

        return asyncStyle(done => {
            this._endpoints.catalog.deviceLogList(limit, order, after, filter, (error, data) => {
                if (error) return done(error);

                let list = data.data.map(log => {
                    return DeviceLogAdapter.map(log);
                });

                done(null, mapListResponse<DeviceLog>(data, list));
            });
        }, callback);
    }

    /**
     * Get a single device log
     * @param id device log ID
     * @returns Promise of device log
     */
    public getDeviceLog(id: string): Promise<DeviceLog>;
    /**
     * Get a single device log
     * @param id device log ID
     * @param callback A function that is passed the return arguments (error, device log)
     */
    public getDeviceLog(id: string, callback: CallbackFn<DeviceLog>);
    public getDeviceLog(id: string, callback?: CallbackFn<DeviceLog>): Promise<DeviceLog> {
        return asyncStyle(done => {
            this._endpoints.catalog.deviceLogRetrieve(id, (error, data) => {
                if (error) return done(error);
                let log = DeviceLogAdapter.map(data);
                done(null, log);
            });
        }, callback);
    }
}
