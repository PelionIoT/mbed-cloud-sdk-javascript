import { ApiKeyType } from "./types";
import { ApiKeyInfoResp as apiApiKey } from "../_api/iam";
import { AccessApi } from "./index";
import { Group } from "./group";
export declare class ApiKey {
    private _api;
    constructor(options: ApiKeyType, _api?: AccessApi);
    static map(from: apiApiKey, api: AccessApi): ApiKey;
    /**
     * List the groups this API key belongs to
     * @returns Promise containing groups
     */
    listGroups(): Promise<Group[]>;
    /**
     * List the groups this API key belongs to
     * @param callback A function that is passed the return arguments (error, groups)
     */
    listGroups(callback: (err: any, data?: Group[]) => any): any;
    /**
     * Updates an API key
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @returns Promise containing API key
     */
    update(options: {
        name: string;
        owner?: string;
    }): Promise<ApiKey>;
    /**
     * Updates an API key
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @param callback A function that is passed the return arguments (error, API key)
     */
    update(options: {
        name: string;
        owner?: string;
    }, callback: (err: any, data?: ApiKey) => any): any;
    /**
     * Delete the API key
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the API key
     * @param callback A function that is passed any error
     */
    delete(callback?: (err: any, data?: void) => any): any;
}
export interface ApiKey extends ApiKeyType {
}
