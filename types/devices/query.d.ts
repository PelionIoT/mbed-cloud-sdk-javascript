import { Body as apiQueryRequest, DeviceQueryDetail as apiQuery } from "../_api/device_query_service";
import { QueryType } from "./types";
import { DevicesApi } from "./index";
export declare class Query {
    private _api;
    static readonly CUSTOM_PREFIX: string;
    constructor(options: QueryType, _api?: DevicesApi);
    static map(from: apiQuery, api: DevicesApi): Query;
    static reverseMap(from: any): apiQueryRequest;
    /**
     * Update the query
     * @param options.name The name of the query
     * @param options.description The description of the query
     * @param options.attributes The attributes of the query
     * @param options.customAttributes The custom attributes of the query
     * @returns Promise of query
     */
    update(options: {
        name: string;
        description?: string;
        attributes?: {
            [key: string]: string;
        };
        customAttributes?: {
            [key: string]: string;
        };
    }): Promise<Query>;
    /**
     * Update the query
     * @param options.name The name of the query
     * @param options.description The description of the query
     * @param options.attributes The attributes of the query
     * @param options.customAttributes The custom attributes of the query
     * @param callback A function that is passed the arguments (error, query)
     */
    update(options: {
        name: string;
        description?: string;
        attributes?: {
            [key: string]: string;
        };
        customAttributes?: {
            [key: string]: string;
        };
    }, callback?: (err: any, data?: Query) => any): any;
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
