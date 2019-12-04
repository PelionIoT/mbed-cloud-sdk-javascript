"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../../common/functions");
var listResponse_1 = require("../../common/listResponse");
var metricAdapter_1 = require("../models/metricAdapter");
exports.listMetrics = function (endpoints, options, callback) {
    return functions_1.apiWrapper(function (resultsFn) {
        function isPeriod(test) {
            return test.period !== undefined;
        }
        var _a = options, limit = _a.limit, after = _a.after, order = _a.order, include = _a.include, interval = _a.interval;
        var start = null;
        var end = null;
        var period = null;
        if (isPeriod(options)) {
            period = metricAdapter_1.MetricAdapter.mapTimePeriod(options.period);
        }
        else {
            start = options.start;
            end = options.end;
        }
        endpoints.statistics.v3MetricsGet(metricAdapter_1.MetricAdapter.mapIncludes(include), metricAdapter_1.MetricAdapter.mapTimePeriod(interval), start, end, period, limit, after, order, resultsFn);
    }, function (data, done) {
        var metrics = [];
        if (data.data && data.data.length) {
            metrics = data.data.map(function (metric) {
                return metricAdapter_1.MetricAdapter.map(metric);
            });
        }
        done(null, new listResponse_1.ListResponse(data, metrics));
    }, callback);
};
//# sourceMappingURL=metrics.js.map