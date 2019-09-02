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
var metric_1 = require("./metric");
/**
 * Metric Adapter
 */
var MetricAdapter = /** @class */ (function () {
    function MetricAdapter() {
    }
    MetricAdapter.map = function (from) {
        return new metric_1.Metric({
            id: from.id,
            timestamp: from.timestamp,
            handshakes: from.handshakes_successful,
            transactions: from.transactions,
            observations: from.device_observations,
            successfulApiCalls: from.connect_rest_api_success,
            failedApiCalls: from.connect_rest_api_error,
            successfulProxyRequests: from.device_proxy_request_success,
            failedProxyRequests: from.device_proxy_request_error,
            successfulSubscriptionRequests: from.device_subscription_request_success,
            failedSubscriptionRequests: from.device_subscription_request_error,
            successfulBootstraps: from.bootstraps_successful,
            failedBootstraps: from.bootstraps_failed,
            pendingBootstraps: from.bootstraps_pending,
            fullRegistrations: from.full_registrations,
            updatedRegistrations: from.registration_updates,
            expiredRegistrations: from.expired_registrations,
            deletedRegistrations: from.deleted_registrations,
        });
    };
    MetricAdapter.mapIncludes = function (from) {
        var includes = [];
        var metricNames = [
            "handshakes",
            "transactions",
            "observations",
            "successfulApiCalls",
            "failedApiCalls",
            "successfulProxyRequests",
            "failedProxyRequests",
            "successfulSubscriptionRequests",
            "failedSubscriptionRequests",
            "successfulBootstraps",
            "failedBootstraps",
            "pendingBootstraps",
            "fullRegistrations",
            "updatedRegistrations",
            "expiredRegistrations",
            "deletedRegistrations",
        ];
        var apiNames = [
            "handshakes_successful",
            "transactions",
            "device_observations",
            "connect_rest_api_success",
            "connect_rest_api_error",
            "device_proxy_request_success",
            "device_proxy_request_error",
            "device_subscription_request_success",
            "device_subscription_request_error",
            "bootstraps_successful",
            "bootstraps_failed",
            "bootstraps_pending",
            "full_registrations",
            "registration_updates",
            "expired_registrations",
            "deleted_registrations",
        ];
        if (from) {
            from.forEach(function (include) {
                var index = metricNames.indexOf(include);
                if (index >= 0) {
                    includes.push(apiNames[index]);
                }
            });
        }
        if (includes.length === 0) {
            includes = apiNames;
        }
        return includes.join(",");
    };
    MetricAdapter.mapTimePeriod = function (from) {
        if (!from) {
            return MetricAdapter.DEFAULT_TIME_PERIOD;
        }
        var unit = from.unit[0];
        return "" + from.duration + unit;
    };
    MetricAdapter.DEFAULT_TIME_PERIOD = "1d";
    return MetricAdapter;
}());
exports.MetricAdapter = MetricAdapter;
//# sourceMappingURL=metricAdapter.js.map