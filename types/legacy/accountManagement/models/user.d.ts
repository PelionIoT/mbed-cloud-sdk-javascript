import { CallbackFn, ListOptions } from "../../common/interfaces";
import { ListResponse } from "../../common/listResponse";
import { UpdateUserObject, UserStatusEnum } from "../types";
import { AccountManagementApi } from "../accountManagementApi";
import { ApiKey } from "./apiKey";
import { Group } from "./group";
import { LoginHistory } from "./loginHistory";
/**
 * User
 */
export declare class User {
    private _api?;
    /**
     * A list of group IDs this user belongs to.
     */
    readonly groups?: Array<string>;
    /**
     * The status of the user. INVITED means that the user has not accepted the invitation request. RESET means that the password must be changed immediately.
     */
    readonly status: UserStatusEnum;
    /**
     * The UUID of the account.
     */
    readonly accountId: string;
    /**
     * A flag indicating whether the user's email address has been verified or not.
     */
    readonly emailVerified?: boolean;
    /**
     * Creation time.
     */
    readonly createdAt?: Date;
    /**
     * A timestamp of the user creation in the storage, in milliseconds.
     */
    readonly creationTime?: number;
    /**
     * A timestamp of the latest change of the user password, in milliseconds.
     */
    readonly passwordChangedTime?: number;
    /**
     * Whether two factor authentication has been enabled for this user.
     */
    readonly twoFactorAuthentication?: boolean;
    /**
     * A timestamp of the latest login of the user, in milliseconds.
     */
    readonly lastLoginTime?: number;
    /**
     * History of logins for this user.
     */
    readonly loginHistory?: Array<LoginHistory>;
    constructor(init: Partial<User>, _api?: AccountManagementApi);
    /**
     * Updates the user
     * @returns Promise containing user
     */
    update(): Promise<User>;
    /**
     * Updates the user
     * @param callback A function that is passed the return arguments (error, user)
     */
    update(callback: CallbackFn<User>): void;
    /**
     * List the groups this user belongs to
     * @returns Promise containing groups
     */
    listGroups(): Promise<Array<Group>>;
    /**
     * List the groups this user belongs to
     * @param callback A function that is passed the return arguments (error, groups)
     */
    listGroups(callback: CallbackFn<Array<Group>>): void;
    /**
     * List the API keys for this user
     * @returns Promise containing API keys
     */
    listApiKeys(options?: ListOptions): Promise<ListResponse<ApiKey>>;
    /**
     * List the API keys for this user
     * @param callback A function that is passed the return arguments (error, API keys)
     */
    listApiKeys(options?: ListOptions, callback?: CallbackFn<ListResponse<ApiKey>>): void;
    /**
     * Delete the user
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the user
     * @param callback A function that is passed any error
     */
    delete(callback: CallbackFn<void>): void;
}
export interface User extends UpdateUserObject {
}
