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
Object.defineProperty(exports, "__esModule", { value: true });
var metric_1 = require("./metric");
/**
 * Metric Adapter
 */
var MetricAdapter = (function () {
    function MetricAdapter() {
    }
    MetricAdapter.map = function (from) {
        return new metric_1.Metric({
            id: from.id,
            timestamp: from.timestamp ? new Date(from.timestamp) : null,
            transactions: from.transactions,
            successfulDeviceRegistrations: from.bootstraps_successful,
            pendingDeviceRegistrations: from.bootstraps_pending,
            failedDeviceRegistrations: from.bootstraps_failed,
            successfulApiCalls: from.device_server_rest_api_success,
            failedApiCalls: from.device_server_rest_api_error,
            successfulHandshakes: from.handshakes_successful,
            failedHandshakes: from.handshakes_failed,
            registeredDevices: from.registered_devices
        });
    };
    MetricAdapter.mapIncludes = function (from) {
        var includes = [];
        var metricNames = [
            "transactions",
            "successfulDeviceRegistrations",
            "pendingDeviceRegistrations",
            "failedDeviceRegistrations",
            "successfulApiCalls",
            "failedApiCalls"
        ];
        var apiNames = [
            "transactions",
            "bootstraps_successful",
            "bootstraps_pending",
            "bootstraps_failed",
            "device_server_rest_api_success",
            "device_server_rest_api_error"
        ];
        if (from) {
            from.forEach(function (include) {
                var index = metricNames.indexOf(include);
                if (index >= 0)
                    includes.push(apiNames[index]);
            });
        }
        if (includes.length == 0)
            includes = apiNames;
        return includes.join(",");
    };
    MetricAdapter.mapTimePeriod = function (from) {
        if (!from)
            return MetricAdapter.DEFAULT_TIME_PERIOD;
        var unit = from.unit[0];
        return "" + from.duration + unit;
    };
    return MetricAdapter;
}());
MetricAdapter.DEFAULT_TIME_PERIOD = "1d";
exports.MetricAdapter = MetricAdapter;
