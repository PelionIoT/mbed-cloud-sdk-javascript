import { ListOptions } from "../common/interfaces";
import { UserType } from "./types";
import { UserInfoReq as apiUserRequest, UserInfoResp as apiUser } from "../_api/iam";
import { AccessApi } from "./index";
import { Group } from "./group";
import { ApiKey } from "./apiKey";
export declare class User {
    private _api;
    constructor(options: UserType, _api?: AccessApi);
    static map(from: apiUser, api: AccessApi): User;
    static reverseMap(from: any): apiUserRequest;
    /**
     * List the groups this user belongs to
     * @returns Promise containing groups
     */
    listGroups(): Promise<Group[]>;
    /**
     * List the groups this user belongs to
     * @param callback A function that is passed the return arguments (error, groups)
     */
    listGroups(callback: (err: any, data?: Group[]) => any): any;
    /**
     * List the API keys for this user
     * @returns Promise containing API keys
     */
    listApiKeys(options?: ListOptions): Promise<ApiKey[]>;
    /**
     * List the API keys for this user
     * @param callback A function that is passed the return arguments (error, API keys)
     */
    listApiKeys(options?: ListOptions, callback?: (err: any, data?: ApiKey[]) => any): any;
    /**
     * Delete the user
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the user
     * @param callback A function that is passed any error
     */
    delete(callback?: (err: any, data?: void) => any): any;
}
export interface User extends UserType {
}
