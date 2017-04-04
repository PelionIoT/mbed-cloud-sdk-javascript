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

import { asyncStyle } from "../common/functions";
import { ConnectionOptions, CallbackFn } from "../common/interfaces";
import { Endpoints } from "./endpoints";
import { MetricsStartEndOptions, MetricsPeriodOptions } from "./types";
import { Metric } from "./models/metric";
import { MetricAdapter } from "./models/metricAdapter";

/**
 * ## Statistics API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbed = require("mbed-cloud-sdk");
 *
 * var statistics = new mbed.StatisticsApi({
 *     apiKey: "<mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/statistics.min.js"></script>
 *
 * <script>
 *     var statistics = new mbed.StatisticsApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 */
export class StatisticsApi {

    private _endpoints: Endpoints;

    /**
     * @param options connection options
     */
    constructor(options: ConnectionOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * Get account-specific metrics
     * @param options metrics options
     * @returns Promise of metrics
     */
    public getAccountMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions): Promise<Array<Metric>>;
    /**
     * Get account-specific metrics
     * @param options metrics options
     * @param callback A function that is passed the return arguments (error, metrics)
     */
    public getAccountMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions, callback: CallbackFn<Array<Metric>>);
    public getAccountMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions, callback?: CallbackFn<Array<Metric>>): Promise<Array<Metric>> {
        return asyncStyle(done => {

            function isPeriod(options: MetricsStartEndOptions | MetricsPeriodOptions): options is MetricsPeriodOptions {
                return (<MetricsPeriodOptions>options).period !== undefined;
            }

            let include = MetricAdapter.mapIncludes(options.include);
            let interval = MetricAdapter.mapTimePeriod(options.interval);
            let start = "";
            let end = "";
            let period = "";

            if (isPeriod(options)) {
                period = MetricAdapter.mapTimePeriod(options.period);
            } else {
                start = options.start.toISOString();
                end = options.end.toISOString();
            }

            this._endpoints.account.v3MetricsGet(include, start, end, period, interval, "", (error, data) => {
                if (error) return done(error);

                let list = data.map(metric => {
                    return MetricAdapter.map(metric);
                });

                done(null, list);
            });
        }, callback);
    }

    /**
     * Get metrics
     * @param options metrics options
     * @returns Promise of metrics
     */
    public getMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions): Promise<Array<Metric>>;
    /**
     * Get metrics
     * @param options metrics options
     * @param callback A function that is passed the return arguments (error, metrics)
     */
    public getMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions, callback: CallbackFn<Array<Metric>>);
    public getMetrics(options: MetricsStartEndOptions | MetricsPeriodOptions, callback?: CallbackFn<Array<Metric>>): Promise<Array<Metric>> {
        return asyncStyle(done => {

            function isPeriod(options: MetricsStartEndOptions | MetricsPeriodOptions): options is MetricsPeriodOptions {
                return (<MetricsPeriodOptions>options).period !== undefined;
            }

            let include = MetricAdapter.mapIncludes(options.include);
            let interval = MetricAdapter.mapTimePeriod(options.interval);
            let start = "";
            let end = "";
            let period = "";

            if (isPeriod(options)) {
                period = MetricAdapter.mapTimePeriod(options.period);
            } else {
                start = options.start.toISOString();
                end = options.end.toISOString();
            }

            this._endpoints.statistics.v3MetricsGet(include, start, end, period, interval, "", (error, data) => {
                if (error) return done(error);

                let list = data.map(metric => {
                    return MetricAdapter.map(metric);
                });

                done(null, list);
            });
        }, callback);
    }
}
