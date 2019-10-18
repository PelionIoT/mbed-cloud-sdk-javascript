import { CallbackFn } from "../../common/interfaces";
import { AddApiKeyObject } from "../types";
import { AccountManagementApi } from "../accountManagementApi";
import { User } from "./user";
import { Group } from "./group";
/**
 * API Key
 */
export declare class ApiKey {
    private _api?;
    /**
     * The UUID of the API key.
     */
    readonly id: string;
    /**
     * The API key.
     */
    readonly key: string;
    /**
     * Creation time.
     */
    readonly createdAt?: Date;
    /**
     * The timestamp of the API key creation in the storage, in milliseconds.
     */
    readonly creationTime?: number;
    /**
     * The timestamp of the latest API key usage, in milliseconds.
     */
    readonly lastLoginTime?: number;
    constructor(init: Partial<ApiKey>, _api?: AccountManagementApi);
    /**
     * List the groups this API key belongs to
     * @returns Promise containing groups
     */
    listGroups(): Promise<Array<Group>>;
    /**
     * List the groups this API key belongs to
     * @param callback A function that is passed the return arguments (error, groups)
     */
    listGroups(callback: CallbackFn<Array<Group>>): void;
    /**
     * Get details of the key owner
     * @returns Promise containing the user
     */
    getOwner(): Promise<User>;
    /**
     * Get details of the key owner
     * @param callback A function that is passed the return arguments (error, user)
     */
    getOwner(callback: CallbackFn<User>): void;
    /**
     * Updates an API key
     * @returns Promise containing API key
     */
    update(): Promise<ApiKey>;
    /**
     * Updates an API key
     * @param callback A function that is passed the return arguments (error, API key)
     */
    update(callback: CallbackFn<ApiKey>): void;
    /**
     * Delete the API key
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the API key
     * @param callback A function that is passed any error
     */
    delete(callback: CallbackFn<void>): void;
}
export interface ApiKey extends AddApiKeyObject {
}
