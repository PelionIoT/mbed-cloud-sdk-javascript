import { CallbackFn, ComparisonObject, operators } from "./interfaces";
import { SDKError } from "./sdkError";
/**
 * Internal function
 * @ignore
 */
export declare function asyncStyle<T>(asyncFn: (done: CallbackFn<T>) => void, callbackFn?: CallbackFn<T>): Promise<T>;
/**
 * Internal function
 * @ignore
 */
export declare function asyncStyleWithTimeout<T>(asyncFn: (done: CallbackFn<T>) => void, timeout: number, callbackFn?: CallbackFn<T>): Promise<T>;
/**
 * Internal function
 * @ignore
 */
export declare function apiWrapper<T>(apiFn: (resultsFn: (error: any, data: any) => void) => void, transformFn?: (data: any, resultsFn: (error: SDKError, result: T) => void) => void, callbackFn?: CallbackFn<T>, failOnNotFound?: boolean, timeout?: number): Promise<T>;
/**
 * Internal function
 * @ignore
 */
export declare function encodeBase64(payload: any): string;
/**
 * Internal function
 * @ignore
 */
export declare function decodeBase64(payload: any, contentType: any): string | number | {
    [key: string]: string | number;
};
/**
 * Internal function
 * @ignore
 */
export declare function encodeInclude(include: any): any;
/**
 * Internal function
 * @ignore
 */
export declare function snakeToCamel(snake: any): any;
/**
 * Internal function
 * @ignore
 */
export declare function camelToSnake(camel: any): any;
/**
 * Internal function
 * @ignore
 */
export declare function extractFilter(filter: {
    [key: string]: ComparisonObject<any> | string;
}, name: string, operator?: operators, defaultValue?: any): any;
/**
 * Internal function
 * @ignore
 */
export declare function encodeFilter(filter: any, map?: {
    from: Array<string>;
    to: Array<string>;
}, nested?: Array<string>): string;
/**
 * Internal function
 * @ignore
 */
export declare function decodeFilter(from: string, map?: {
    from: Array<string>;
    to: Array<string>;
}, nested?: Array<string>): {
    [key: string]: ComparisonObject<any> | {};
};
/**
 * Internal function
 * @ignore
 */
export declare function ensureArray<T>(item: T | Array<T>): Array<T>;
/**
 * Internal function
 * @ignore
 */
export declare function matchWithWildcard(input: string, matchWith: string): boolean;
/**
 * Internal function
 * @ignore
 */
export declare function dateToBillingMonth(date: Date): string;
/**
 * Internal function
 * @ignore
 */
export declare function isThisNode(): boolean;
/**
 * Internal function
 * @ignore
 */
export declare function promiseTimeout(ms: number, promise: any): Promise<any>;
