import { ListResponse } from "./interfaces";
export declare function decodeBase64(data: any): string;
export declare function encodeInclude(include: any): any;
export declare function snakeToCamel(snake: any): any;
export declare function camelToSnake(camel: any): any;
export declare function mapListResponse<T>(from: any, data: T[]): ListResponse<T>;
