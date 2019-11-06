import { apiWrapper } from "../../common/functions";
import { CallbackFn } from "../../common/interfaces";
import { ListResponse } from "../../common/listResponse";
import { Endpoints } from "../endpoints";
import { Metric } from "../models/metric";
import { MetricAdapter } from "../models/metricAdapter";
import { MetricsListOptions, MetricsPeriodListOptions, MetricsStartEndListOptions } from "../types";

export const listMetrics = (
    endpoints: Endpoints,
    options: MetricsStartEndListOptions | MetricsPeriodListOptions,
    callback?: CallbackFn<ListResponse<Metric>>
): Promise<ListResponse<Metric>> => {
    return apiWrapper(
        resultsFn => {
            function isPeriod(
                test: MetricsStartEndListOptions | MetricsPeriodListOptions
            ): test is MetricsPeriodListOptions {
                return (test as MetricsPeriodListOptions).period !== undefined;
            }

            const { limit, after, order, include, interval } = options as MetricsListOptions;

            let start = null;
            let end = null;
            let period = null;

            if (isPeriod(options)) {
                period = MetricAdapter.mapTimePeriod(options.period);
            } else {
                start = options.start;
                end = options.end;
            }

            endpoints.statistics.v3MetricsGet(
                MetricAdapter.mapIncludes(include),
                MetricAdapter.mapTimePeriod(interval),
                start,
                end,
                period,
                limit,
                after,
                order,
                resultsFn
            );
        },
        (data, done) => {
            let metrics: Array<Metric> = [];

            if (data.data && data.data.length) {
                metrics = data.data.map(metric => {
                    return MetricAdapter.map(metric);
                });
            }

            done(null, new ListResponse<Metric>(data, metrics));
        },
        callback
    );
};
