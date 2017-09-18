import { Metric as apiMetric } from "../../_api/statistics";
import { TimePeriod } from "../types";
import { Metric } from "./metric";
/**
 * Metric Adapter
 */
export declare class MetricAdapter {
    private static readonly DEFAULT_TIME_PERIOD;
    static map(from: apiMetric): Metric;
    static mapIncludes(from?: Array<string>): string;
    static mapTimePeriod(from?: TimePeriod): string;
}
