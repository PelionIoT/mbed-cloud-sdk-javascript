import { Api } from "./api";
import { QueryDetail } from "./types";
export declare class Query {
    private _api;
    constructor(_api: Api);
}
export interface Query extends QueryDetail {
}
