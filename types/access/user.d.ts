import { UserType } from "./types";
import { UserInfoResp as apiUser, UserInfoReq as apiUserRequest } from "../_api/iam";
import { AccessApi } from "./index";
import { Group } from "./group";
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
