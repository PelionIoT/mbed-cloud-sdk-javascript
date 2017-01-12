import { ListResponse } from "./interfaces";
export declare function decodeBase64(data: any): string;
export declare function mapListResponse<T>(from: any, to?: ListResponse<T>): ListResponse<T>;
