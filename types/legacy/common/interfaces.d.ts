import { SDKError } from "./sdkError";
import { SDKLogLevel } from "../../common/logger";
export interface ConnectionOptions {
    /**
     * API Key for your Pelion Device Management account
     */
    apiKey?: string;
    /**
     * URL for Pelion Device Management API
     */
    host?: string;
    /**
    * configure the log level for this api instance
    */
    logLevel?: SDKLogLevel;
}
export declare type CallbackFn<T> = (error: SDKError, data?: T) => any;
/**
 * Possible optional fields to request when listing
 */
export declare type IncludeEnum = "totalCount";
/**
 * Ordering options
 */
export declare type Order = "ASC" | "DESC";
/**
 * Options to use when listing objects
 */
export interface ListOptions {
    /**
     * How many objects to retrieve in the page (Page size)
     */
    limit?: number;
    /**
     * ASC or DESC
     */
    order?: Order;
    /**
     * The ID of the item after which to retrieve the next page
     */
    after?: string;
    /**
     * Optional fields to include
     */
    include?: IncludeEnum | string | Array<IncludeEnum | string>;
    /**
     * Number of results to retrieve
     */
    maxResults?: number;
    /**
     * The number of results to return in a page
     */
    pageSize?: number;
}
/**
 * Operators inspired by [MongoDB](https://docs.mongodb.com/manual/reference/operator/query-comparison/)
 */
export interface ComparisonObject<T> {
    /**
     * Equal to
     */
    $eq?: T;
    /**
     * Not equal to
     */
    $ne?: T;
    /**
     * Greater than or equal to
     */
    $gte?: T;
    /**
     * Less than or equal to
     */
    $lte?: T;
    /**
     * In
     */
    $in?: T;
    /**
     * Not in
     */
    $nin?: T;
}
export declare type operators = "$eq" | "$ne" | "$gte" | "$lte" | "$in" | "$nin";
