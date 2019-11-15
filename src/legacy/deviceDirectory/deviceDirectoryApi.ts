/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
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

import { asyncStyle, apiWrapper, encodeInclude, encodeFilter } from "../common/functions";
import { CallbackFn } from "../common/interfaces";
import { ListResponse } from "../common/listResponse";
import { AddDeviceObject, UpdateDeviceObject, AddQueryObject, UpdateQueryObject, DeviceListOptions, QueryListOptions, DeviceEventListOptions } from "./types";
import { Device } from "./models/device";
import { DeviceAdapter } from "./models/deviceAdapter";
import { Query } from "./models/query";
import { QueryAdapter } from "./models/queryAdapter";
import { DeviceEvent } from "./models/deviceEvent";
import { DeviceEventAdapter } from "./models/deviceEventAdapter";
import { Endpoints } from "./endpoints";
import { Filters } from "./filters";
import { ApiMetadata } from "../common/apiMetadata";
import { ConfigOptions } from "../../common/config";

/**
 * ## Device Directory API
 * The API can be initalized with a .env file in the working directory with the following values
 *
 * MBED_CLOUD_SDK_API_KEY=<Pelion DM API Key>
 *
 * and optionally
 *
 * MBED_CLOUD_SDK_HOST=<your host> (defaults to https://api.us-east-1.mbedcloud.com)
 *
 * OR
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var PelionDMSDK = require("mbed-cloud-sdk");
 *
 * var devices = new PelionDMSDK.DeviceDirectoryApi({
 *     apiKey: "<Pelion DM API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<pelion-dm-sdk>/bundles/device-directory.min.js"></script>
 *
 * <script>
 *     var devices = new MbedCloudSDK.DeviceDirectoryApi({
 *         apiKey: "<Pelion DM API Key>"
 *     });
 * </script>
 * ```
 */
export class DeviceDirectoryApi {

    private _endpoints: Endpoints;

    /**
     * @param options connection objects
     */
    constructor(options?: ConfigOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * Gets a list of devices
     *
     * Example:
     * ```JavaScript
     * devices.listDevices({
     *     filter: {
     *         state: { $eq: "bootstrapped" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * })
     * .then(devices => {
     *     // Utilize devices here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options list options
     * @returns Promise of devices
     */
    public listDevices(options?: DeviceListOptions): Promise<ListResponse<Device>>;
    /**
     * Gets a list of devices
     *
     * Example:
     * ```JavaScript
     * devices.listDevices({
     *     filter: {
     *         state: { $eq: "bootstrapped" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * }, function(error, devices) {
     *     if (error) throw error;
     *     // Utilize devices here
     * });
     * ```
     *
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

        return apiWrapper( resultsFn => {
            const { limit, after, order, include, filter } = options;
            this._endpoints.directory.deviceList(limit, order, after, encodeFilter(filter, Filters.DEVICE_FILTER_MAP, Filters.NESTED_FILTERS), encodeInclude(include), resultsFn);
        }, (data, done) => {
            const devices = data.data.map( device => {
                return DeviceAdapter.map(device, this);
            });

            done(null, new ListResponse<Device>(data, devices));
        }, callback);
    }

    /**
     * Gets details of a device
     *
     * Example:
     * ```JavaScript
     * devices.getDevice('015c5ed320c0000000000001001000f0')
     * .then(device => {
     *     // Utilize device here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @returns Promise of device
     */
    public getDevice(deviceId: string): Promise<Device>;
    /**
     * Gets details of a device
     *
     * Example:
     * ```JavaScript
     * devices.getDevice('015c5ed320c0000000000001001000f0', function(error, device) {
     *     if (error) throw error;
     *     // Utilize device here
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param callback A function that is passed the arguments (error, device)
     */
    public getDevice(deviceId: string, callback: CallbackFn<Device>): void;
    public getDevice(deviceId: string, callback?: CallbackFn<Device>): Promise<Device> {
        return apiWrapper( resultsFn => {
            this._endpoints.directory.deviceRetrieve(deviceId, resultsFn);
        }, (data, done) => {
            const device = DeviceAdapter.map(data, this);
            done(null, device);
        }, callback);
    }

    /**
     * Add a device
     *
     * Example:
     * ```JavaScript
     * devices.addDevice({
     *     certificateFingerprint: '07:7A:EB:67:37:42:4D:11:5C:3E:99:07:1E:EB:44:...',
     *     certificateIssuerId: '015c3c457b2002420a01041603c00000',
     *     name: 'newDeviceName'
     * })
     * .then(device => {
     *     // Utilize device here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param device Device details
     * @returns Promise of device
     */
    public addDevice(device: AddDeviceObject): Promise<Device>;
    /**
     * Add a device
     *
     * Example:
     * ```JavaScript
     * devices.addDevice({
     *     certificateFingerprint: '07:7A:EB:67:37:42:4D:11:5C:3E:99:07:1E:EB:44:...',
     *     certificateIssuerId: '015c3c457b2002420a01041603c00000',
     *     name: 'newDeviceName'
     * }, function(error, device) {
     *     if (error) throw error;
     *     // Utilize device here
     * });
     * ```
     *
     * @param device Device details
     * @param callback A function that is passed the arguments (error, device)
     */
    public addDevice(device: AddDeviceObject, callback: CallbackFn<Device>): void;
    public addDevice(device: AddDeviceObject, callback?: CallbackFn<Device>): Promise<Device> {
        return apiWrapper( resultsFn => {
            this._endpoints.directory.deviceCreate(DeviceAdapter.addMap(device), resultsFn);
        }, (data, done) => {
            const result = DeviceAdapter.map(data, this);
            done(null, result);
        }, callback);
    }

    /**
     * Update a device
     *
     * Example:
     * ```JavaScript
     * devices.updateDevice({
     *     id: '015c5ed320c0000000000001001000f0',
     *     name: 'Updated name',
     *     description: 'Updated description',
     *     customAttributes: {
     *         attr1: 'Use json structure',
     *         attr2: 'Can use 5 entries in the JSON struct'
     *     }
     * })
     * .then(device => {
     *     // Utilize device here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param device Device details
     * @returns Promise of device
     */
    public updateDevice(device: UpdateDeviceObject): Promise<Device>;
    /**
     * Update a device
     *
     * Example:
     * ```JavaScript
     * devices.updateDevice({
     *     id: '015c5ed320c0000000000001001000f0',
     *     name: 'Updated name',
     *     description: 'Updated description',
     *     customAttributes: {
     *         attr1: 'Use json structure',
     *         attr2: 'Can use 5 entries in the JSON struct'
     *     }
     * }, function(error, device) {
     *     if (error) throw error;
     *     // Utilize device here
     * });
     * ```
     *
     * @param device Device details
     * @param callback A function that is passed the arguments (error, device)
     */
    public updateDevice(device: UpdateDeviceObject, callback: CallbackFn<Device>): void;
    public updateDevice(device: UpdateDeviceObject, callback?: CallbackFn<Device>): Promise<Device> {
        return apiWrapper( resultsFn => {
            this._endpoints.directory.deviceUpdate(device.id, DeviceAdapter.updateMap(device), resultsFn);
        }, (data, done) => {
            const result = DeviceAdapter.map(data, this);
            done(null, result);
        }, callback);
    }

    /**
     * Delete a device
     *
     * Example:
     * ```JavaScript
     * devices.deleteDevice('015c5ed320c0000000000001001000f0')
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceId Device ID
     * @returns Promise containing any error
     */
    public deleteDevice(deviceId: string): Promise<void>;
    /**
     * Delete a device
     *
     * Example:
     * ```JavaScript
     * devices.deleteDevice('015c5ed320c0000000000001001000f0', function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param deviceId Device ID
     * @param callback A function that is passed any error
     */
    public deleteDevice(deviceId: string, callback: CallbackFn<void>): void;
    public deleteDevice(deviceId: string, callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper( resultsFn => {
            this._endpoints.directory.deviceDestroy(deviceId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * List queries
     *
     * Example:
     * ```JavaScript
     * devices.listQueries({limit: 5})
     * .then(queries => {
     *     // Utilize queries here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options list options
     * @param callback A function containing a list response
     * @returns Promise containing a list response
     */
    public listQueries(options?: QueryListOptions): Promise<ListResponse<Query>>;
    /**
     * List queries
     *
     * Example:
     * ```JavaScript
     * devices.listQueries({limit: 5}, function(error, queries) {
     *     if (error) throw error;
     *     // Utilize queries here
     * });
     * ```
     *
     * @param options list options
     * @param callback A function containing a list response
     * @returns Promise containing a list response
     */
    public listQueries(options?: QueryListOptions, callback?: CallbackFn<ListResponse<Query>>): void;
    public listQueries(options?: any, callback?: CallbackFn<ListResponse<Query>>): Promise<ListResponse<Query>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return apiWrapper( resultsFn => {
            const { limit, order, after, include, filter } = options;
            this._endpoints.directory.deviceQueryList(limit, order, after, encodeFilter(filter, Filters.EMPTY_FILTER_MAP), encodeInclude(include), resultsFn);
        }, (data, done) => {
            let queries: Array<Query>;
            if (data.data && data.data.length) {
                queries = data.data.map( query => {
                    return QueryAdapter.map(query, this);
                });
            }

            const response = new ListResponse(data, queries);
            done(null, response);
        }, callback);
    }

    /**
     * Get a query
     *
     * Example:
     * ```JavaScript
     * devices.getQuery('015c45eb321700000000000100100155')
     * .then(query => {
     *     // Utilize query here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param queryId query ID
     * @param callback A function that is passed the arguments (error, query)
     * @returns Promise of query
     */
    public getQuery(queryId: string): Promise<Query>;
    /**
     * Get a query
     *
     * Example:
     * ```JavaScript
     * devices.getQuery('015c45eb321700000000000100100155', function(error, query) {
     *     if (error) throw error;
     *     // Utilize query here
     * });
     * ```
     *
     * @param queryId query ID
     * @param callback A function that is passed the arguments (error, query)
     * @returns Promise of query
     */
    public getQuery(queryId: string, callback: CallbackFn<Query>): void;
    public getQuery(queryId: string, callback?: CallbackFn<Query>): Promise<Query> {
        return apiWrapper( resultsFn => {
            this._endpoints.directory.deviceQueryRetrieve(queryId, resultsFn);
        }, (data, done) => {
            const query = QueryAdapter.map(data, this);
            done(null, query);
        }, callback);
    }

    /**
     * Add a query
     *
     * Example:
     * ```JavaScript
     * devices.addQuery({
     *     name: 'TestFilter',
     *     description: 'Description here',
     *     filter: {
     *         state: { $eq: "bootstrapped" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * })
     * .then(query => {
     *     // Utilize query here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param query The query
     * @returns Promise of query
     */
    public addQuery(query: AddQueryObject): Promise<Query>;
    /**
     * Add a query
     *
     * Example:
     * ```JavaScript
     * devices.addQuery({
     *     name: 'TestFilter',
     *     description: 'Description here',
     *     filter: {
     *         state: { $eq: "bootstrapped" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * }, function(error, query) {
     *     if (error) throw error;
     *     // Utilize query here
     * });
     * ```
     *
     * @param query The query
     * @param callback A function that is passed the arguments (error, query)
     */
    public addQuery(query: AddQueryObject, callback: CallbackFn<Query>): void;
    public addQuery(query: AddQueryObject, callback?: CallbackFn<Query>): Promise<Query> {
        return apiWrapper( resultsFn => {
            this._endpoints.directory.deviceQueryCreate(QueryAdapter.addMap(query), resultsFn);
        }, (data, done) => {
            const result = QueryAdapter.map(data, this);
            done(null, result);
        }, callback);
    }

    /**
     * Update a query
     *
     * Example:
     * ```JavaScript
     * devices.updateQuery({
     *     name: 'TestFilter',
     *     id: '015c45eb321700000000000100100155',
     *     filter: {
     *         state: { $eq: "bootstrapped" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * })
     * .then(query => {
     *     // Utilize query here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param query The query to update
     * @returns Promise of query
     */
    public updateQuery(query: UpdateQueryObject): Promise<Query>;
    /**
     * Update a query
     *
     * Example:
     * ```JavaScript
     * devices.updateQuery({
     *     name: 'TestFilter',
     *     id: '015c45eb321700000000000100100155',
     *     filter: {
     *         state: { $eq: "bootstrapped" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * }, function(error, query) {
     *     if (error) throw error;
     *     // Utilize query here
     * });
     * ```
     *
     * @param query The query to update
     * @param callback A function that is passed the arguments (error, query)
     */
    public updateQuery(query: UpdateQueryObject, callback: CallbackFn<Query>): void;
    public updateQuery(query: UpdateQueryObject, callback?: CallbackFn<Query>): Promise<Query> {
        return apiWrapper( resultsFn => {
            this._endpoints.directory.deviceQueryUpdate(query.id, QueryAdapter.updateMap(query), resultsFn);
        }, (data, done) => {
            const result = QueryAdapter.map(data, this);
            done(null, result);
        }, callback);
    }

    /**
     * Delete a query
     *
     * Example:
     * ```JavaScript
     * devices.deleteQuery('015c45eb321700000000000100100155')
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param queryId query ID
     * @returns Promise containing any error
     */
    public deleteQuery(queryId: string): Promise<void>;
    /**
     * Delete a query
     *
     * Example:
     * ```JavaScript
     * devices.deleteQuery('015c45eb321700000000000100100155', function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param queryId query ID
     * @param callback A function that is passed any error
     */
    public deleteQuery(queryId: string, callback: CallbackFn<void>): void;
    public deleteQuery(queryId: string, callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper( resultsFn => {
            this._endpoints.directory.deviceQueryDestroy(queryId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * List device events
     *
     * Example:
     * ```JavaScript
     * devices.listDeviceEvents({
     *     limit: 50,
     *     filter: {
     *         deviceId: { $eq: "015c45eb321700000000000100100155" },
     *         eventDate: { $gte: new Date("01-01-2016"), $lte: new Date("01-01-2018") }
     *     }
     * })
     * .then(deviceevents => {
     *     // Utilize deviceevents here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listDeviceEvents(options?: DeviceEventListOptions): Promise<ListResponse<DeviceEvent>>;
    /**
     * List device events
     *
     * Example:
     * ```JavaScript
     * devices.listDeviceEvents({
     *     limit: 50,
     *     filter: {
     *         deviceId: { $eq: "015c45eb321700000000000100100155" },
     *         eventDate: { $gte: new Date("01-01-2016"), $lte: new Date("01-01-2018") }
     *     }
     * }, function(error, deviceevents) {
     *     if (error) throw error;
     *     // Utilize deviceevents here
     * });
     * ```
     *
     * @param options filter options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listDeviceEvents(options?: DeviceEventListOptions, callback?: CallbackFn<ListResponse<DeviceEvent>>): void;
    public listDeviceEvents(options?: any, callback?: CallbackFn<ListResponse<DeviceEvent>>): Promise<ListResponse<DeviceEvent>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return apiWrapper( resultsFn => {
            const { limit, order, after, include, filter } = options as DeviceEventListOptions;
            this._endpoints.directory.deviceLogList(limit, order, after, encodeFilter(filter, Filters.DEVICE_EVENT_FILTER_MAP), encodeInclude(include), resultsFn);
        }, (data, done) => {
            let list: Array<DeviceEvent>;
            if (data.data && data.data.length) {
                list = data.data.map( event => {
                    return DeviceEventAdapter.map(event);
                });
            }

            done(null, new ListResponse<DeviceEvent>(data, list));
        }, callback);
    }

    /**
     * Get a single device event
     *
     * Example:
     * ```JavaScript
     * devices.getDeviceEvent('015c45eb321700000000000100100155')
     * .then(deviceevent => {
     *     // Utilize deviceevent here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param deviceEventId device event ID
     * @returns Promise of device event
     */
    public getDeviceEvent(deviceEventId: string): Promise<DeviceEvent>;
    /**
     * Get a single device event
     *
     * Example:
     * ```JavaScript
     * devices.getDeviceEvent('015c45eb321700000000000100100155', function(error, deviceevent) {
     *     if (error) throw error;
     *     // Utilize deviceevent here
     * });
     * ```
     *
     * @param deviceEventId device event ID
     * @param callback A function that is passed the return arguments (error, device event)
     */
    public getDeviceEvent(deviceEventId: string, callback: CallbackFn<DeviceEvent>): void;
    public getDeviceEvent(deviceEventId: string, callback?: CallbackFn<DeviceEvent>): Promise<DeviceEvent> {
        return apiWrapper( resultsFn => {
            this._endpoints.directory.deviceLogRetrieve(deviceEventId, resultsFn);
        }, (data, done) => {
            const event = DeviceEventAdapter.map(data);
            done(null, event);
        }, callback);
    }

    /**
     * Get meta data for the last Pelion Device Management API call
     * @returns Promise of meta data
     */
    public getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the last Pelion Device Management API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    public getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
    public getLastApiMetadata(callback?: CallbackFn<ApiMetadata>): Promise<ApiMetadata> {
        return asyncStyle( done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
