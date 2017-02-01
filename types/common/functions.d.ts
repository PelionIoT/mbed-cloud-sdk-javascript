import { ListResponse } from "./interfaces";
export declare function asyncStyle<T>(asyncFn: (done: (error: any, response?: T) => any) => void, callbackFn?: (error: any, response: T) => any): Promise<T>;
export declare function decodeBase64(payload: any, contentType: any): string;
export declare function encodeInclude(include: any): any;
export declare function snakeToCamel(snake: any): any;
export declare function camelToSnake(camel: any): any;
export declare function mapListResponse<T>(from: any, data: T[]): ListResponse<T>;
export declare function encodeAttributes(from: {
    [key: string]: string;
}, prefix?: string): string;
export declare function decodeAttributes(from: string, prefix?: string): {
    match: {
        [key: string]: string;
    };
    noMatch: {
        [key: string]: string;
    };
};
export declare function encodeFilter(from: {
    attributes?: {
        [key: string]: string;
    };
    customAttributes?: {
        [key: string]: string;
    };
}, customPrefix: string): string;
