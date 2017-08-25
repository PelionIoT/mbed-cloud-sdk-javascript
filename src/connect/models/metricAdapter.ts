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

    private static readonly DEFAULT_TIME_PERIOD = "1d";

    static map(from: apiMetric): Metric {
        return new Metric({
            id:                               from.id,
            timestamp:                        from.timestamp ? new Date(from.timestamp) : null,
            transactions:                     from.transactions,
            successfulDeviceRegistrations:    from.bootstraps_successful,
            pendingDeviceRegistrations:       from.bootstraps_pending,
            failedDeviceRegistrations:        from.bootstraps_failed,
            successfulApiCalls:               from.device_server_rest_api_success,
            failedApiCalls:                   from.device_server_rest_api_error,
            successfulHandshakes:             from.handshakes_successful,
            failedHandshakes:                 from.handshakes_failed,
            registeredDevices:                from.registered_devices
        });
    }

    static mapIncludes(from?: string[]): string {
        let includes = [];

        let metricNames = [
            "transactions",
            "registrations",
            "registrationUpdates",
            "deregistrations",
            "successfulBootstraps",
            "pendingBootstraps",
            "failedBootstraps",
            "successfulApiCalls",
            "failedApiCalls"
        ];

        let apiNames = [
            "transactions",
            "full_registrations",
            "registration_updates",
            "deregistrations",
            "bootstraps_successful",
            "bootstraps_pending",
            "bootstraps_failed",
            "device_server_rest_api_success",
            "device_server_rest_api_error"
        ];

        if (from) {
            from.forEach(include => {
                let index = metricNames.indexOf(include);
                if (index >=0 ) includes.push(apiNames[index]);
            });
        }

        if (includes.length == 0) includes = apiNames;
        return includes.join(",");
    }

    static mapTimePeriod(from?: TimePeriod): string {
        if (!from) return MetricAdapter.DEFAULT_TIME_PERIOD;
        let unit = from.unit[0];
        return `${from.duration}${unit}`;
    }
}
