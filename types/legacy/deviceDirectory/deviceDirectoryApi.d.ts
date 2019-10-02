import { ConnectionOptions, CallbackFn } from "../common/interfaces";
import { ListResponse } from "../common/listResponse";
import { AddDeviceObject, UpdateDeviceObject, AddQueryObject, UpdateQueryObject, DeviceListOptions, QueryListOptions, DeviceEventListOptions } from "./types";
import { Device } from "./models/device";
import { Query } from "./models/query";
import { DeviceEvent } from "./models/deviceEvent";
import { ApiMetadata } from "../common/apiMetadata";
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
export declare class DeviceDirectoryApi {
    private _endpoints;
    /**
     * @param options connection objects
     */
    constructor(options?: ConnectionOptions);
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
    listDevices(options?: DeviceListOptions): Promise<ListResponse<Device>>;
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
    listDevices(options?: DeviceListOptions, callback?: CallbackFn<ListResponse<Device>>): void;
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
    getDevice(deviceId: string): Promise<Device>;
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
    getDevice(deviceId: string, callback: CallbackFn<Device>): void;
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
    addDevice(device: AddDeviceObject): Promise<Device>;
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
    addDevice(device: AddDeviceObject, callback: CallbackFn<Device>): void;
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
    updateDevice(device: UpdateDeviceObject): Promise<Device>;
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
    updateDevice(device: UpdateDeviceObject, callback: CallbackFn<Device>): void;
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
    deleteDevice(deviceId: string): Promise<void>;
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
    deleteDevice(deviceId: string, callback: CallbackFn<void>): void;
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
    listQueries(options?: QueryListOptions): Promise<ListResponse<Query>>;
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
    listQueries(options?: QueryListOptions, callback?: CallbackFn<ListResponse<Query>>): void;
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
    getQuery(queryId: string): Promise<Query>;
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
    getQuery(queryId: string, callback: CallbackFn<Query>): void;
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
    addQuery(query: AddQueryObject): Promise<Query>;
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
    addQuery(query: AddQueryObject, callback: CallbackFn<Query>): void;
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
    updateQuery(query: UpdateQueryObject): Promise<Query>;
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
    updateQuery(query: UpdateQueryObject, callback: CallbackFn<Query>): void;
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
    deleteQuery(queryId: string): Promise<void>;
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
    deleteQuery(queryId: string, callback: CallbackFn<void>): void;
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
    listDeviceEvents(options?: DeviceEventListOptions): Promise<ListResponse<DeviceEvent>>;
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
    listDeviceEvents(options?: DeviceEventListOptions, callback?: CallbackFn<ListResponse<DeviceEvent>>): void;
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
    getDeviceEvent(deviceEventId: string): Promise<DeviceEvent>;
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
    getDeviceEvent(deviceEventId: string, callback: CallbackFn<DeviceEvent>): void;
    /**
     * Get meta data for the last Pelion Device Management API call
     * @returns Promise of meta data
     */
    getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the last Pelion Device Management API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
}
