import { Api } from "./api";
import { QueryType } from "./types";
export declare class Query {
    private _api;
    constructor(_api: Api, options: QueryType);
}
export interface Query extends QueryType {
}
