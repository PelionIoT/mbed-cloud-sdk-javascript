"use strict";
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
var functions_1 = require("../common/functions");
var endpoints_1 = require("./endpoints");
var deviceLog_1 = require("./deviceLog");
/**
 * Root Logging API
 */
var LoggingApi = (function () {
    /**
     * @param options connection options
     */
    function LoggingApi(options) {
        this._endpoints = new endpoints_1.Endpoints(options);
    }
    LoggingApi.prototype.listDeviceLogs = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var _a = options, limit = _a.limit, order = _a.order, after = _a.after, attributes = _a.attributes, include = _a.include;
        var filter = functions_1.encodeAttributes(attributes);
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.catalog.deviceLogList(limit, order, after, filter, functions_1.encodeInclude(include), function (error, data) {
                if (error)
                    return done(error);
                var list = data.data.map(function (log) {
                    return deviceLog_1.DeviceLog.map(log);
                });
                done(null, functions_1.mapListResponse(data, list));
            });
        }, callback);
    };
    LoggingApi.prototype.getDeviceLog = function (options, callback) {
        var _this = this;
        var id = options.id;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.catalog.deviceLogRetrieve(id, function (error, data) {
                if (error)
                    return done(error);
                var log = deviceLog_1.DeviceLog.map(data);
                done(null, log);
            });
        }, callback);
    };
    return LoggingApi;
}());
exports.LoggingApi = LoggingApi;
