/*
* Mbed Cloud JavaScript SDK
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

import { Metric as apiMetric } from "../../_api/statistics";
import { TimePeriod } from "../types";
import { Metric } from "./metric";

/**
 * Metric Adapter
 */
export class MetricAdapter {

    public static map(from: apiMetric): Metric {
        return new Metric({
            id:                     from.id,
            timestamp:              from.timestamp ? new Date(from.timestamp) : null,
            transactions:           from.transactions,
            successfulApiCalls:     from.device_server_rest_api_success,
            failedApiCalls:         from.device_server_rest_api_error,
            successfulHandshakes:   from.handshakes_successful,
            pendingBootstraps:      from.bootstraps_pending,
            successfulBootstraps:   from.bootstraps_successful,
            failedBootstraps:       from.bootstraps_failed,
            registrations:          from.full_registrations,
            updatedRegistrations:   from.registration_updates,
            expiredRegistrations:   from.expired_registrations,
            deletedRegistrations:   from.deleted_registrations
        });
    }

    public static mapIncludes(from?: string[]): string {
        let includes = [];

        const metricNames = [
            "transactions",
            "successfulApiCalls",
            "failedApiCalls",
            "successfulHandshakes",
            "pendingBootstraps",
            "successfulBootstraps",
            "failedBootstraps",
            "registrations",
            "updatedRegistrations",
            "expiredRegistrations",
            "deletedRegistrations"
        ];

        const apiNames = [
            "transactions",
            "device_server_rest_api_success",
            "device_server_rest_api_error",
            "handshakes_successful",
            "bootstraps_pending",
            "bootstraps_successful",
            "bootstraps_failed",
            "full_registrations",
            "registration_updates",
            "expired_registrations",
            "deleted_registrations"
        ];

        if (from) {
            from.forEach(include => {
                const index = metricNames.indexOf(include);
                if (index >= 0 ) includes.push(apiNames[index]);
            });
        }

        if (includes.length === 0) includes = apiNames;
        return includes.join(",");
    }

    public static mapTimePeriod(from?: TimePeriod): string {
        if (!from) return MetricAdapter.DEFAULT_TIME_PERIOD;
        const unit = from.unit[0];
        return `${from.duration}${unit}`;
    }

    private static readonly DEFAULT_TIME_PERIOD = "1d";
}
