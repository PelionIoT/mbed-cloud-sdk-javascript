import { QueryType } from "./types";
import { DeviceQueryDetail as apiQuery } from "../_api/device_query_service";
export declare class Query {
    private static readonly CUSTOM_PREFIX;
    constructor(options: QueryType);
    static encodeQuery(from: {
        attributes?: {
            [key: string]: string;
        };
        customAttributes?: {
            [key: string]: string;
        };
    }): string;
    static map(from: apiQuery): Query;
}
export interface Query extends QueryType {
}
