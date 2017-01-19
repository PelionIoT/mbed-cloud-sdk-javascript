import { QueryType } from "./types";
import { DeviceQueryDetail as apiQuery } from "../_api/device_query_service";
export declare class Query {
    constructor(options: QueryType);
    static map(from: apiQuery): Query;
}
export interface Query extends QueryType {
}
