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
import { DeviceLog } from "./types";

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

    private map(from: any, to?:DeviceLog): DeviceLog {
        to = to || { eventDate: null };

        to.changes                 = from.changes;
        to.data                    = from.data;
        to.eventDate               = from.date_time;
        to.description             = from.description;
        to.deviceId                = from.device_id;
        to.logId                   = from.device_log_id;
        to.eventType               = from.event_type;
        to.eventTypeDescription    = from.event_type_description;
        to.stateChanged            = from.state_change;

        return to;
    }

    /**
     * List device logs
     * @param options list options
     * @returns Promise of listResponse
     */
    public listDeviceLogs(options?: ListOptions): Promise<ListResponse<DeviceLog>>;
    /**
     * List device logs
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listDeviceLogs(options?: ListOptions, callback?: (err: any, data?: ListResponse<DeviceLog>) => any): void;
    public listDeviceLogs(options?:any, callback?: (err: any, data?: ListResponse<DeviceLog>) => any): Promise<ListResponse<DeviceLog>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, order, after, filter, include } = options;
        return pg(done => {
            this._api.catalog.deviceLogList(limit, order, after, filter, include, (error, data:ListResponse<DeviceLog>) => {
                if (error) return done(error);

                data.data = data.data.map(log => {
                    return this.map(log);
                });

                done(null, mapListResponse<DeviceLog>(data));
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
     * @param callback A function that is passed the return arguments (error, deviceLog)
     */
    public getDeviceLog(options: { id: string }, callback: (err: any, data?: DeviceLog) => any): void;
    public getDeviceLog(options: { id: string }, callback?: (err: any, data?: DeviceLog) => any): Promise<DeviceLog> {
        let { id } = options;
        return pg(done => {
            this._api.catalog.deviceLogRetrieve(id, (error, data) => {
                if (error) return done(error);
                let log = this.map(data);
                done(null, log);
            });
        }, callback);
    }
}
