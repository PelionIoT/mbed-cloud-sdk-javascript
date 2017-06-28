import { SDKError } from "./sdkError";
export interface ConnectionOptions {
    /**
     * API Key for your mbed Cloud account
     */
    apiKey: string;
    /**
     * URL for mbed Cloud API
     */
    host?: string;
}
export interface CallbackFn<T> {
    (error: SDKError, data?: T): any;
}
/**
 * Possible optional fields to request when listing
 */
export declare type IncludeEnum = "totalCount";
/**
 * Ordering options
 */
export declare type OrderEnum = "ASC" | "DESC";
/**
 * Options to use when listing objects
 */
export interface ListOptions {
    /**
     * how many objects to retrieve in the page
     */
    limit?: number;
    /**
     * ASC or DESC
     */
    order?: OrderEnum;
    /**
     * the ID of the the item after which to retrieve the next page
     */
    after?: string;
    /**
     * Optional fields to include
     */
    include?: IncludeEnum[];
}
/**
 * Operators inspired by [MongoDB](https://docs.mongodb.com/manual/reference/operator/query-comparison/)
 */
export declare type ComparisonObject<T> = {
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
};
