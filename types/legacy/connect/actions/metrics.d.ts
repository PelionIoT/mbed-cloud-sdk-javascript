import { CallbackFn } from "../../common/interfaces";
import { ListResponse } from "../../common/listResponse";
import { Endpoints } from "../endpoints";
import { Metric } from "../models/metric";
import { MetricsPeriodListOptions, MetricsStartEndListOptions } from "../types";
export declare const listMetrics: (endpoints: Endpoints, options: MetricsStartEndListOptions | MetricsPeriodListOptions, callback?: CallbackFn<ListResponse<Metric>>) => Promise<ListResponse<Metric>>;
