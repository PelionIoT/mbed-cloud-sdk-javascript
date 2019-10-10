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
import { ListResponse } from "../common/listResponse";
import { DeviceAdapter } from "./models/deviceAdapter";
import { QueryAdapter } from "./models/queryAdapter";
import { DeviceEventAdapter } from "./models/deviceEventAdapter";
import { Endpoints } from "./endpoints";
import { Filters } from "./filters";
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
    /**
     * @param options connection objects
     */
    constructor(options) {
        this._endpoints = new Endpoints(options);
    }
    listDevices(options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, after, order, include, filter } = options;
            this._endpoints.directory.deviceList(limit, order, after, encodeFilter(filter, Filters.DEVICE_FILTER_MAP, Filters.NESTED_FILTERS), encodeInclude(include), resultsFn);
        }, (data, done) => {
            const devices = data.data.map(device => {
                return DeviceAdapter.map(device, this);
            });
            done(null, new ListResponse(data, devices));
        }, callback);
    }
    getDevice(deviceId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.directory.deviceRetrieve(deviceId, resultsFn);
        }, (data, done) => {
            const device = DeviceAdapter.map(data, this);
            done(null, device);
        }, callback);
    }
    addDevice(device, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.directory.deviceCreate(DeviceAdapter.addMap(device), resultsFn);
        }, (data, done) => {
            const result = DeviceAdapter.map(data, this);
            done(null, result);
        }, callback);
    }
    updateDevice(device, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.directory.deviceUpdate(device.id, DeviceAdapter.updateMap(device), resultsFn);
        }, (data, done) => {
            const result = DeviceAdapter.map(data, this);
            done(null, result);
        }, callback);
    }
    deleteDevice(deviceId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.directory.deviceDestroy(deviceId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    listQueries(options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, order, after, include, filter } = options;
            this._endpoints.directory.deviceQueryList(limit, order, after, encodeFilter(filter, Filters.EMPTY_FILTER_MAP), encodeInclude(include), resultsFn);
        }, (data, done) => {
            let queries;
            if (data.data && data.data.length) {
                queries = data.data.map(query => {
                    return QueryAdapter.map(query, this);
                });
            }
            const response = new ListResponse(data, queries);
            done(null, response);
        }, callback);
    }
    getQuery(queryId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.directory.deviceQueryRetrieve(queryId, resultsFn);
        }, (data, done) => {
            const query = QueryAdapter.map(data, this);
            done(null, query);
        }, callback);
    }
    addQuery(query, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.directory.deviceQueryCreate(QueryAdapter.addMap(query), resultsFn);
        }, (data, done) => {
            const result = QueryAdapter.map(data, this);
            done(null, result);
        }, callback);
    }
    updateQuery(query, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.directory.deviceQueryUpdate(query.id, QueryAdapter.updateMap(query), resultsFn);
        }, (data, done) => {
            const result = QueryAdapter.map(data, this);
            done(null, result);
        }, callback);
    }
    deleteQuery(queryId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.directory.deviceQueryDestroy(queryId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    listDeviceEvents(options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, order, after, include, filter } = options;
            this._endpoints.directory.deviceLogList(limit, order, after, encodeFilter(filter, Filters.DEVICE_EVENT_FILTER_MAP), encodeInclude(include), resultsFn);
        }, (data, done) => {
            let list;
            if (data.data && data.data.length) {
                list = data.data.map(event => {
                    return DeviceEventAdapter.map(event);
                });
            }
            done(null, new ListResponse(data, list));
        }, callback);
    }
    getDeviceEvent(deviceEventId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.directory.deviceLogRetrieve(deviceEventId, resultsFn);
        }, (data, done) => {
            const event = DeviceEventAdapter.map(data);
            done(null, event);
        }, callback);
    }
    getLastApiMetadata(callback) {
        return asyncStyle(done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
//# sourceMappingURL=deviceDirectoryApi.js.map