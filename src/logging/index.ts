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

import pg = require("polygoat");
import { ConnectionOptions, ListOptions, ListResponse } from "../helpers/interfaces";
import { mapListResponse } from "../helpers/data";
import { Api } from "./api";
import { DeviceLogType } from "./types";
import { DeviceLogSerializer, DeviceLogSerializerData as apiDeviceLogType } from "../_api/device_catalog";

/**
 * Root Logging class
 */
export class Logging {

    private _api: Api;

    /**
     * @param options connection options
     */
    constructor(options: ConnectionOptions) {
        this._api = new Api(options);
    }

    private mapDeviceLog(from: apiDeviceLogType): DeviceLogType {
        return {
            changes:                 from.changes,
            data:                    from.data,
            eventDate:               from.date_time,
            description:             from.description,
            deviceId:                from.device_id,
            logId:                   from.device_log_id,
            eventType:               from.event_type,
            eventTypeDescription:    from.event_type_description,
            stateChanged:            from.state_change
        };
    }

    /**
     * List device logs
     * @param options list options
     * @returns Promise of listResponse
     */
    public listDeviceLogs(options?: ListOptions): Promise<ListResponse<DeviceLogType>>;
    /**
     * List device logs
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listDeviceLogs(options?: ListOptions, callback?: (err: any, data?: ListResponse<DeviceLogType>) => any): void;
    public listDeviceLogs(options?:any, callback?: (err: any, data?: ListResponse<DeviceLogType>) => any): Promise<ListResponse<DeviceLogType>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, order, after, filter, include } = options;
        return pg(done => {
            this._api.catalog.deviceLogList(limit, order, after, filter, include, (error, data:DeviceLogSerializer) => {
                if (error) return done(error);

                let list = data.data.map(log => {
                    return this.mapDeviceLog(log);
                });

                done(null, mapListResponse<DeviceLogType>(data, list));
            });
        }, callback);
    }

    /**
     * Get a single device log
     * @param options.id device log ID
     * @returns Promise of device log
     */
    public getDeviceLog(options: { id: string }): Promise<DeviceLogType>;
    /**
     * Get a single device log
     * @param options.id device log ID
     * @param callback A function that is passed the return arguments (error, deviceLog)
     */
    public getDeviceLog(options: { id: string }, callback: (err: any, data?: DeviceLogType) => any): void;
    public getDeviceLog(options: { id: string }, callback?: (err: any, data?: DeviceLogType) => any): Promise<DeviceLogType> {
        let { id } = options;
        return pg(done => {
            this._api.catalog.deviceLogRetrieve(id, (error, data:apiDeviceLogType) => {
                if (error) return done(error);
                let log = this.mapDeviceLog(data);
                done(null, log);
            });
        }, callback);
    }
}
