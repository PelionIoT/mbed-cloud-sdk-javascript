import { CallbackFn } from "../../common/interfaces";
import { AddQueryObject } from "../types";
import { DeviceDirectoryApi } from "../deviceDirectoryApi";
/**
 * Query
 */
export declare class Query {
    private _api?;
    /**
     * The ID of the query
     */
    readonly id: string;
    /**
     * The timestamp of when the query was created
     */
    readonly createdAt?: Date;
    /**
     * The timestamp when the query was updated
     */
    readonly updatedAt?: Date;
    constructor(init?: Partial<Query>, _api?: DeviceDirectoryApi);
    /**
     * Update the query
     * @returns Promise of query
     */
    update(): Promise<Query>;
    /**
     * Update the query
     * @param callback A function that is passed the arguments (error, query)
     */
    update(callback: CallbackFn<Query>): void;
    /**
     * Delete the query
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the query
     * @param callback A function that is passed any error
     */
    delete(callback: CallbackFn<void>): void;
}
export interface Query extends AddQueryObject {
}
