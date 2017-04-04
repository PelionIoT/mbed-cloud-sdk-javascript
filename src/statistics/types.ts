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

export type IncludeEnum = "transactions" | "successfulDeviceRegistrations" | "pendingDeviceRegistrations" | "failedDeviceRegistrations" | "successfulApiCalls" | "failedApiCalls";
export type UnitType = "hours" | "days" | "weeks";

export interface TimePeriod {
    /**
     * The time period unit
     */
    unit: UnitType;
    /**
     * The unit duration
     */
    duration: number;
}

export interface MetricsOptions {
    /**
     * List of requested metrics
     */
    include?: IncludeEnum[];
    /**
     * Group data by this interval, defaults to 1 day
     */
    interval?: TimePeriod;
}

export interface MetricsStartEndOptions extends MetricsOptions {
    /**
     * Start date
     */
    start: Date;
    /**
     * End date
     */
    end: Date;
}

export interface MetricsPeriodOptions extends MetricsOptions {
    /**
     * Fetch data for this period until now
     */
    period: TimePeriod;
}
