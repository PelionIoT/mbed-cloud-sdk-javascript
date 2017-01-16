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
var pg = require("polygoat");
var data_1 = require("../helpers/data");
var api_1 = require("./api");
/**
 * Root Logging class
 */
var Logging = (function () {
    /**
     * @param options connection options
     */
    function Logging(options) {
        this._api = new api_1.Api(options);
    }
    Logging.prototype.mapDeviceLog = function (from) {
        return {
            changes: from.changes,
            data: from.data,
            eventDate: from.date_time,
            description: from.description,
            deviceId: from.device_id,
            logId: from.device_log_id,
            eventType: from.event_type,
            eventTypeDescription: from.event_type_description,
            stateChanged: from.state_change
        };
    };
    Logging.prototype.listDeviceLogs = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var limit = options.limit, order = options.order, after = options.after, filter = options.filter, include = options.include;
        return pg(function (done) {
            _this._api.catalog.deviceLogList(limit, order, after, filter, include, function (error, data) {
                if (error)
                    return done(error);
                var list = data.data.map(function (log) {
                    return _this.mapDeviceLog(log);
                });
                done(null, data_1.mapListResponse(data, list));
            });
        }, callback);
    };
    Logging.prototype.getDeviceLog = function (options, callback) {
        var _this = this;
        var id = options.id;
        return pg(function (done) {
            _this._api.catalog.deviceLogRetrieve(id, function (error, data) {
                if (error)
                    return done(error);
                var log = _this.mapDeviceLog(data);
                done(null, log);
            });
        }, callback);
    };
    return Logging;
}());
exports.Logging = Logging;
