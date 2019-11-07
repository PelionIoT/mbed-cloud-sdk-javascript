import { apiWrapper } from "../../common/functions";
import { ListResponse } from "../../common/listResponse";
import { MetricAdapter } from "../models/metricAdapter";
export const listMetrics = (endpoints, options, callback) => {
    return apiWrapper(resultsFn => {
        function isPeriod(test) {
            return test.period !== undefined;
        }
        const { limit, after, order, include, interval } = options;
        let start = null;
        let end = null;
        let period = null;
        if (isPeriod(options)) {
            period = MetricAdapter.mapTimePeriod(options.period);
        }
        else {
            start = options.start;
            end = options.end;
        }
        endpoints.statistics.v3MetricsGet(MetricAdapter.mapIncludes(include), MetricAdapter.mapTimePeriod(interval), start, end, period, limit, after, order, resultsFn);
    }, (data, done) => {
        let metrics = [];
        if (data.data && data.data.length) {
            metrics = data.data.map(metric => {
                return MetricAdapter.map(metric);
            });
        }
        done(null, new ListResponse(data, metrics));
    }, callback);
};
//# sourceMappingURL=metrics.js.map