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

import { asyncStyle, mapListResponse, encodeInclude, encodeFilter } from "../common/functions";
import { ConnectionOptions, ListResponse, CallbackFn } from "../common/interfaces";
import { AddDeviceObject, UpdateDeviceObject, AddQueryObject, UpdateQueryObject, DeviceListOptions, QueryListOptions, DeviceLogListOptions } from "./types";
import { Device } from "./models/device";
import { DeviceAdapter } from "./models/deviceAdapter";
import { Query } from "./models/query";
import { QueryAdapter } from "./models/queryAdapter";
import { DeviceLog } from "./models/deviceLog";
import { DeviceLogAdapter } from "./models/deviceLogAdapter";
import { Endpoints } from "./endpoints";
import { Filters } from "./filters";

/**
 * ## Device Directory API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbedCloudSDK = require("mbed-cloud-sdk");
 *
 * var devices = new mbedCloudSDK.DeviceDirectoryApi({
 *     apiKey: "<mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/device-directory.min.js"></script>
 *
 * <script>
 *     var devices = new mbedCloudSDK.DeviceDirectoryApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 */
export class DeviceDirectoryApi {

    private _endpoints: Endpoints;

    /**
     * @param options connection objects
     */
    constructor(options: ConnectionOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * Gets a list of devices
     * @param options list options
     * @returns Promise of devices
     */
    public listDevices(options?: DeviceListOptions): Promise<ListResponse<Device>>;
    /**
     * Gets a list of devices
     * @param options list options
     * @param callback A function that is passed the arguments (error, devices)
     */
    public listDevices(options?: DeviceListOptions, callback?: CallbackFn<ListResponse<Device>>): void;
    public listDevices(options?: any, callback?: CallbackFn<ListResponse<Device>>): Promise<ListResponse<Device>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return asyncStyle(done => {
            let { limit, after, order, include, filter } = options;

            this._endpoints.catalog.deviceList(limit, order, after, encodeFilter(filter, Filters.DEVICE_FILTER_MAP, Filters.NESTED_FILTERS), encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let devices = data.data.map(device => {
                    return DeviceAdapter.map(device, this);
                });
                let response = mapListResponse<Device>(data, devices);

                done(null, response);
            });
        }, callback);
    }

    /**
     * Gets details of a device
     * @param deviceId Device ID
     * @returns Promise of device
     */
    public getDevice(deviceId: string): Promise<Device>;
    /**
     * Gets details of a device
     * @param deviceId Device ID
     * @param callback A function that is passed the arguments (error, device)
     */
    public getDevice(deviceId: string, callback: CallbackFn<Device>): void;
    public getDevice(deviceId: string, callback?: CallbackFn<Device>): Promise<Device> {
        return asyncStyle(done => {
            this._endpoints.catalog.deviceRetrieve(deviceId, (error, data) => {
                if (error) return done(error);

                let device = DeviceAdapter.map(data, this);
                done(null, device);
            });
        }, callback);
    }

    /**
     * Add a device
     * @param device Device details
     * @returns Promise of device
     */
    public addDevice(device: AddDeviceObject): Promise<Device>;
    /**
     * Add a device
     * @param device Device details
     * @param callback A function that is passed the arguments (error, device)
     */
    public addDevice(device: AddDeviceObject, callback: CallbackFn<Device>): void;
    public addDevice(device: AddDeviceObject, callback?: CallbackFn<Device>): Promise<Device> {
        return asyncStyle(done => {
            this._endpoints.catalog.deviceCreate(DeviceAdapter.addMap(device), (error, data) => {
                if (error) return done(error);
                done(null, DeviceAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Update a device
     * @param device Device details
     * @returns Promise of device
     */
    public updateDevice(device: UpdateDeviceObject): Promise<Device>;
    /**
     * Update a device
     * @param device Device details
     * @param callback A function that is passed the arguments (error, device)
     */
    public updateDevice(device: UpdateDeviceObject, callback: CallbackFn<Device>): void;
    public updateDevice(device: UpdateDeviceObject, callback?: CallbackFn<Device>): Promise<Device> {
        return asyncStyle(done => {
            this._endpoints.catalog.devicePartialUpdate(device.id, DeviceAdapter.updateMap(device), (error, data) => {
                if (error) return done(error);

                let device = DeviceAdapter.map(data, this);
                done(null, device);
            });
        }, callback);
    }

    /**
     * Delete a device
     * @param deviceId Device ID
     * @returns Promise containing any error
     */
    public deleteDevice(deviceId: string): Promise<void>;
    /**
     * Delete a device
     * @param deviceId Device ID
     * @param callback A function that is passed any error
     */
    public deleteDevice(deviceId: string, callback: CallbackFn<void>): void;
    public deleteDevice(deviceId: string, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.catalog.deviceDestroy(deviceId, (error) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * List queries
     * @param options list options
     * @param callback A function containing a list response
     * @returns Promise containing a list response
     */
    public listQueries(options?: QueryListOptions): Promise<ListResponse<Query>>;
    /**
     * List queries
     * @param options list options
     * @param callback A function containing a list response
     * @returns Promise containing a list response
     */
    public listQueries(options?: QueryListOptions, callback?: CallbackFn<ListResponse<Query>>): void;
    public listQueries(options?:any, callback?: CallbackFn<ListResponse<Query>>): Promise<ListResponse<Query>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return asyncStyle(done => {
            let { limit, order, after, include, filter } = options;

            this._endpoints.query.deviceQueryList(limit, order, after, encodeFilter(filter, Filters.EMPTY_FILTER_MAP), encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let queries = data.data.map(query => {
                    return QueryAdapter.map(query, this);
                });
                let response = mapListResponse(data, queries);

                done(null, response);
            });
        }, callback);
    }

    /**
     * Get a query
     * @param queryId query ID
     * @param callback A function that is passed the arguments (error, query)
     * @returns Promise of query
     */
    public getQuery(queryId: string): Promise<Query>;
    /**
     * Get a query
     * @param queryId query ID
     * @param callback A function that is passed the arguments (error, query)
     * @returns Promise of query
     */
    public getQuery(queryId: string, callback: CallbackFn<Query>): void;
    public getQuery(queryId: string, callback?: CallbackFn<Query>): Promise<Query> {
        return asyncStyle(done => {
            this._endpoints.query.deviceQueryRetrieve(queryId, (error, data) => {
                if (error) return done(error);

                let query = QueryAdapter.map(data, this);
                done(null, query);
            });
        }, callback);
    }

    /**
     * Add a query
     * @param query The query
     * @returns Promise of query
     */
    public addQuery(query: AddQueryObject): Promise<Query>;
    /**
     * Add a query
     * @param query The query
     * @param callback A function that is passed the arguments (error, query)
     */
    public addQuery(query: AddQueryObject, callback: CallbackFn<Query>): void;
    public addQuery(query: AddQueryObject, callback?: CallbackFn<Query>): Promise<Query> {
        return asyncStyle(done => {
            this._endpoints.query.deviceQueryCreate(QueryAdapter.addMap(query), (error, data) => {
                if (error) return done(error);

                let query = QueryAdapter.map(data, this);
                done(null, query);
            });
        }, callback);
    }

    /**
     * Update a query
     * @param query The query to update
     * @returns Promise of query
     */
    public updateQuery(query: UpdateQueryObject): Promise<Query>;
    /**
     * Update a query
     * @param query The query to update
     * @param callback A function that is passed the arguments (error, query)
     */
    public updateQuery(query: UpdateQueryObject, callback: CallbackFn<Query>): void;
    public updateQuery(query: UpdateQueryObject, callback?: CallbackFn<Query>): Promise<Query> {
        return asyncStyle(done => {
            this._endpoints.query.deviceQueryPartialUpdate(query.id, QueryAdapter.updateMap(query), (error, data) => {
                if (error) return done(error);

                let query = QueryAdapter.map(data, this);
                done(null, query);
            });
        }, callback);
    }

    /**
     * Delete a query
     * @param queryId query ID
     * @returns Promise containing any error
     */
    public deleteQuery(queryId: string): Promise<void>;
    /**
     * Delete a query
     * @param queryId query ID
     * @param callback A function that is passed any error
     */
    public deleteQuery(queryId: string, callback: CallbackFn<void>): void;
    public deleteQuery(queryId: string, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.query.deviceQueryDestroy(queryId, (error) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * List device logs
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listDeviceLogs(options?: DeviceLogListOptions): Promise<ListResponse<DeviceLog>>;
    /**
     * List device logs
     * @param options filter options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listDeviceLogs(options?: DeviceLogListOptions, callback?: CallbackFn<ListResponse<DeviceLog>>): void;
    public listDeviceLogs(options?:any, callback?: CallbackFn<ListResponse<DeviceLog>>): Promise<ListResponse<DeviceLog>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return asyncStyle(done => {
            let { limit, order, after, include, filter } = options as DeviceLogListOptions;

            this._endpoints.catalog.deviceLogList(limit, order, after, encodeFilter(filter, Filters.DEVICE_LOG_FILTER_MAP), encodeInclude(include), (error, data) => {
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
     * @param deviceLogId device log ID
     * @returns Promise of device log
     */
    public getDeviceLog(deviceLogId: string): Promise<DeviceLog>;
    /**
     * Get a single device log
     * @param deviceLogId device log ID
     * @param callback A function that is passed the return arguments (error, device log)
     */
    public getDeviceLog(deviceLogId: string, callback: CallbackFn<DeviceLog>): void;
    public getDeviceLog(deviceLogId: string, callback?: CallbackFn<DeviceLog>): Promise<DeviceLog> {
        return asyncStyle(done => {
            this._endpoints.catalog.deviceLogRetrieve(deviceLogId, (error, data) => {
                if (error) return done(error);
                let log = DeviceLogAdapter.map(data);
                done(null, log);
            });
        }, callback);
    }
}
