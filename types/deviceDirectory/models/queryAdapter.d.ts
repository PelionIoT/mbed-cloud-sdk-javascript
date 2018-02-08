import { DeviceQuery as apiQuery, DeviceQueryPostPutRequest as apiQueryAdd, DeviceQueryPostPutRequest as apiQueryUpdate } from "../../_api/device_directory";
import { DeviceDirectoryApi } from "../deviceDirectoryApi";
import { AddQueryObject, UpdateQueryObject } from "../types";
import { Query } from "./query";
/**
 * Query Adapter
 */
export declare class QueryAdapter {
    static map(from: apiQuery, api: DeviceDirectoryApi): Query;
    static addMap(from: AddQueryObject): apiQueryAdd;
    static updateMap(from: UpdateQueryObject): apiQueryUpdate;
}
