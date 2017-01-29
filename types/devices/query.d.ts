import { DeviceQueryDetail as apiQuery } from "../_api/device_query_service";
import { QueryType } from "./types";
import { DevicesApi } from "./index";
export declare class Query {
    private _api;
    private static readonly CUSTOM_PREFIX;
    constructor(options: QueryType, _api?: DevicesApi);
    static encodeQuery(from: {
        attributes?: {
            [key: string]: string;
        };
        customAttributes?: {
            [key: string]: string;
        };
    }): string;
    static map(from: apiQuery, api: DevicesApi): Query;
    /**
     * Delete the query
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the query
     * @param callback A function that is passed any error
     */
    delete(callback?: (err: any, data?: void) => any): any;
}
export interface Query extends QueryType {
}
