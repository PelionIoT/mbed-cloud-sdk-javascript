"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../common/functions");
var listResponse_1 = require("../common/listResponse");
var deviceAdapter_1 = require("./models/deviceAdapter");
var queryAdapter_1 = require("./models/queryAdapter");
var deviceEventAdapter_1 = require("./models/deviceEventAdapter");
var endpoints_1 = require("./endpoints");
var filters_1 = require("./filters");
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
var DeviceDirectoryApi = /** @class */ (function () {
    /**
     * @param options connection objects
     */
    function DeviceDirectoryApi(options) {
        this._endpoints = new endpoints_1.Endpoints(options);
    }
    DeviceDirectoryApi.prototype.listDevices = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var limit = options.limit, after = options.after, order = options.order, include = options.include, filter = options.filter;
            _this._endpoints.directory.deviceList(limit, order, after, functions_1.encodeFilter(filter, filters_1.Filters.DEVICE_FILTER_MAP, filters_1.Filters.NESTED_FILTERS), functions_1.encodeInclude(include), resultsFn);
        }, function (data, done) {
            var devices = data.data.map(function (device) {
                return deviceAdapter_1.DeviceAdapter.map(device, _this);
            });
            done(null, new listResponse_1.ListResponse(data, devices));
        }, callback);
    };
    DeviceDirectoryApi.prototype.getDevice = function (deviceId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.directory.deviceRetrieve(deviceId, resultsFn);
        }, function (data, done) {
            var device = deviceAdapter_1.DeviceAdapter.map(data, _this);
            done(null, device);
        }, callback);
    };
    DeviceDirectoryApi.prototype.addDevice = function (device, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.directory.deviceCreate(deviceAdapter_1.DeviceAdapter.addMap(device), resultsFn);
        }, function (data, done) {
            var result = deviceAdapter_1.DeviceAdapter.map(data, _this);
            done(null, result);
        }, callback);
    };
    DeviceDirectoryApi.prototype.updateDevice = function (device, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.directory.deviceUpdate(device.id, deviceAdapter_1.DeviceAdapter.updateMap(device), resultsFn);
        }, function (data, done) {
            var result = deviceAdapter_1.DeviceAdapter.map(data, _this);
            done(null, result);
        }, callback);
    };
    DeviceDirectoryApi.prototype.deleteDevice = function (deviceId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.directory.deviceDestroy(deviceId, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    DeviceDirectoryApi.prototype.listQueries = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var limit = options.limit, order = options.order, after = options.after, include = options.include, filter = options.filter;
            _this._endpoints.directory.deviceQueryList(limit, order, after, functions_1.encodeFilter(filter, filters_1.Filters.EMPTY_FILTER_MAP), functions_1.encodeInclude(include), resultsFn);
        }, function (data, done) {
            var queries;
            if (data.data && data.data.length) {
                queries = data.data.map(function (query) {
                    return queryAdapter_1.QueryAdapter.map(query, _this);
                });
            }
            var response = new listResponse_1.ListResponse(data, queries);
            done(null, response);
        }, callback);
    };
    DeviceDirectoryApi.prototype.getQuery = function (queryId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.directory.deviceQueryRetrieve(queryId, resultsFn);
        }, function (data, done) {
            var query = queryAdapter_1.QueryAdapter.map(data, _this);
            done(null, query);
        }, callback);
    };
    DeviceDirectoryApi.prototype.addQuery = function (query, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.directory.deviceQueryCreate(queryAdapter_1.QueryAdapter.addMap(query), resultsFn);
        }, function (data, done) {
            var result = queryAdapter_1.QueryAdapter.map(data, _this);
            done(null, result);
        }, callback);
    };
    DeviceDirectoryApi.prototype.updateQuery = function (query, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.directory.deviceQueryUpdate(query.id, queryAdapter_1.QueryAdapter.updateMap(query), resultsFn);
        }, function (data, done) {
            var result = queryAdapter_1.QueryAdapter.map(data, _this);
            done(null, result);
        }, callback);
    };
    DeviceDirectoryApi.prototype.deleteQuery = function (queryId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.directory.deviceQueryDestroy(queryId, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    DeviceDirectoryApi.prototype.listDeviceEvents = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var _a = options, limit = _a.limit, order = _a.order, after = _a.after, include = _a.include, filter = _a.filter;
            _this._endpoints.directory.deviceLogList(limit, order, after, functions_1.encodeFilter(filter, filters_1.Filters.DEVICE_EVENT_FILTER_MAP), functions_1.encodeInclude(include), resultsFn);
        }, function (data, done) {
            var list;
            if (data.data && data.data.length) {
                list = data.data.map(function (event) {
                    return deviceEventAdapter_1.DeviceEventAdapter.map(event);
                });
            }
            done(null, new listResponse_1.ListResponse(data, list));
        }, callback);
    };
    DeviceDirectoryApi.prototype.getDeviceEvent = function (deviceEventId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.directory.deviceLogRetrieve(deviceEventId, resultsFn);
        }, function (data, done) {
            var event = deviceEventAdapter_1.DeviceEventAdapter.map(data);
            done(null, event);
        }, callback);
    };
    DeviceDirectoryApi.prototype.getLastApiMetadata = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            done(null, _this._endpoints.getLastMeta());
        }, callback);
    };
    return DeviceDirectoryApi;
}());
exports.DeviceDirectoryApi = DeviceDirectoryApi;
//# sourceMappingURL=deviceDirectoryApi.js.map