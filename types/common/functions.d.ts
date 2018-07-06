import { CallbackFn, ComparisonObject, operators } from "./interfaces";
import { SDKError } from "./sdkError";
export declare function asyncStyle<T>(asyncFn: (done: CallbackFn<T>) => void, callbackFn?: CallbackFn<T>): Promise<T>;
export declare function apiWrapper<T>(apiFn: (resultsFn: (error: any, data: any) => void) => void, transformFn?: (data: any, resultsFn: (error: SDKError, result: T) => void) => void, callbackFn?: CallbackFn<T>, failOnNotFound?: boolean): Promise<T>;
export declare function decodeBase64(payload: any, contentType: any): string | number | {
    [key: string]: string | number;
};
export declare function encodeInclude(include: any): any;
export declare function snakeToCamel(snake: any): any;
export declare function camelToSnake(camel: any): any;
export declare function extractFilter(filter: {
    [key: string]: ComparisonObject<any> | string;
}, name: string, operator?: operators, defaultValue?: any): any;
export declare function encodeFilter(filter: {
    [key: string]: ComparisonObject<any> | string | {};
}, map?: {
    from: Array<string>;
    to: Array<string>;
}, nested?: Array<string>): string;
export declare function decodeFilter(from: string, map?: {
    from: Array<string>;
    to: Array<string>;
}, nested?: Array<string>): {
    [key: string]: ComparisonObject<any> | {};
};
export declare function ensureArray<T>(item: T | Array<T>): Array<T>;
export declare function matchWithWildcard(input: string, matchWith: string): boolean;
export declare function dateToBillingMonth(date: Date): string;
