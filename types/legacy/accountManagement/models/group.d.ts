import { CallbackFn, ListOptions } from "../../common/interfaces";
import { ListResponse } from "../../common/listResponse";
import { AccountManagementApi } from "../accountManagementApi";
import { User } from "./user";
import { ApiKey } from "./apiKey";
/**
 * Group
 */
export declare class Group {
    private _api?;
    /**
     * The UUID of the group.
     */
    readonly id: string;
    /**
     * The UUID of the account this group belongs to.
     */
    readonly accountId: string;
    /**
     * The name of the group.
     */
    readonly name: string;
    /**
     * The number of users in this group.
     */
    readonly userCount: number;
    /**
     * The number of API keys in this group.
     */
    readonly apiKeyCount: number;
    /**
     * Creation time.
     */
    readonly createdAt?: Date;
    constructor(init: Partial<Group>, _api?: AccountManagementApi);
    /**
     * List users of this group
     * @param options filter options
     * @returns Promise of listResponse
     */
    listUsers(options?: ListOptions): Promise<ListResponse<User>>;
    /**
     * List users of this group
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listUsers(options?: ListOptions, callback?: CallbackFn<ListResponse<User>>): void;
    /**
     * List API keys of this group
     * @param options filter options
     * @returns Promise of listResponse
     */
    listApiKeys(options?: ListOptions): Promise<ListResponse<ApiKey>>;
    /**
     * List API keys of this group
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listApiKeys(options?: ListOptions, callback?: CallbackFn<ListResponse<ApiKey>>): void;
}
