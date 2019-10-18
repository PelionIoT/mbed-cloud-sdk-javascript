import { ConnectionOptions, CallbackFn, ListOptions } from "../common/interfaces";
import { ListResponse } from "../common/listResponse";
import { UpdateAccountObject, AddApiKeyObject, UpdateApiKeyObject, AddUserObject, UpdateUserObject, ApiKeyListOptions, UserListOptions, GroupListOptions } from "./types";
import { Account } from "./models/account";
import { ApiKey } from "./models/apiKey";
import { User } from "./models/user";
import { Group } from "./models/group";
import { ApiMetadata } from "../common/apiMetadata";
/**
 * ## Account Management API
 *
 * The API can be initalized with a .env file in the wroking directory with the following values
 *
 * MBED_CLOUD_SDK_API_KEY=<Pelion DM API Key>
 *
 * and optionally
 *
 * MBED_CLOUD_SDK_HOST=<your host> (defaults to https://api.us-east-1.mbedcloud.com)
 *
 * OR
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var PelionDMSDK = require("mbed-cloud-sdk");
 *
 * var accounts = new PelionDMSDK.AccountManagementApi();
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<pelion-dm-sdk>/bundles/account-management.min.js"></script>
 *
 * <script>
 *     var accounts = new MbedCloudSDK.AccountManagementApi({
 *         apiKey: "<Pelion DM API Key>"
 *     });
 * </script>
 * ```
 */
export declare class AccountManagementApi {
    private _endpoints;
    /**
     * @param options connection options
     */
    constructor(options?: ConnectionOptions);
    /**
     * Get details of account associated with current API key
     *
     * Example:
     * ```JavaScript
     * accounts.getAccount()
     * .then(account => {
     *     console.log("Account ID: " + account.id);
     *     // Utilize account here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @returns Promise of account
     */
    getAccount(): Promise<Account>;
    /**
     * Get details of account associated with current API key
     *
     * Example:
     * ```JavaScript
     * accounts.getAccount(function(error, account) {
     *     if (error) throw error;
     *     console.log("Account ID: " + account.id);
     *     // Utilize account here
     * });
     * ```
     *
     * @param callback A function that is passed the return arguments (error, account)
     */
    getAccount(callback?: CallbackFn<Account>): void;
    /**
     * Update details of account associated with current API key
     *
     * Example:
     * ```JavaScript
     * accounts.updateAccount({
     *    state: 'Texas',
     *    city: 'Austin',
     *    country: 'USA'
     * })
     * .then(account => {
     *     // Utilize account here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param account The account object to update
     * @returns Promise of account
     */
    updateAccount(account: UpdateAccountObject): Promise<Account>;
    /**
     * Update details of account associated with current API key
     *
     * Example:
     * ```JavaScript
     * accounts.updateAccount({
     *     state: 'Texas',
     *     city: 'Austin',
     *     country: 'USA'
     * }, function(error, account) {
     *     if (error) throw error;
     *     // Utilize account here
     * });
     * ```
     *
     * @param account The account object to update
     * @param callback A function that is passed the return arguments (error, account)
     */
    updateAccount(account: UpdateAccountObject, callback?: CallbackFn<Account>): void;
    /**
     * List API keys
     *
     * Example:
     * ```JavaScript
     * // Filter finds API keys that are owned by the specified user ID
     * accounts.listApiKeys({
     *     filter: {
     *         ownerId: { $eq: '015c3c46514802420a010b1000000000' }
     *     }
     * })
     * .then(keys => {
     *     // Utilize keys here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options filter options
     * @returns Promise of listResponse
     */
    listApiKeys(options?: ApiKeyListOptions): Promise<ListResponse<ApiKey>>;
    /**
     * List API keys
     *
     * Example:
     * ```JavaScript
     * // Filter finds API keys that are owned by the specified user ID
     * accounts.listApiKeys({
     *     filter: {
     *         ownerId: { $eq: '015c3c46514802420a010b1000000000' }
     *     }
     * }, function(error, keys) {
     *     if (error) throw error;
     *     // Utilize keys here
     * });
     * ```
     *
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listApiKeys(options?: ApiKeyListOptions, callback?: CallbackFn<ListResponse<ApiKey>>): void;
    /**
     * Get details of an API key
     *
     * Example:
     * ```JavaScript
     * accounts.getApiKey()
     * .then(key => {
     *     console.log('Current user ID: ' + key.ownerId);
     *     // Utilize key here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param apiKeyId The API key ID (if not specified, returns current API key)
     * @returns Promise containing the API key
     */
    getApiKey(apiKeyId?: string): Promise<ApiKey>;
    /**
     * Get details of an API key
     *
     * Example:
     * ```JavaScript
     * accounts.getApiKey(function(error, key) {
     *     if (error) throw error;
     *     console.log('Current user ID: ' + key.ownerId);
     *     // Utilize key here
     * });
     * ```
     *
     * @param apiKeyId The API key ID (if not specified, returns current API key)
     * @param callback A function that is passed the return arguments (error, API key)
     */
    getApiKey(apiKeyId?: string, callback?: CallbackFn<ApiKey>): void;
    /**
     * Adds an API key
     *
     * Example:
     * ```JavaScript
     * accounts.addApiKey({name: 'auto_generated_key'})
     * .then(keyResult => {
     *     var key = keyResult.key;
     *     console.log('Save this signature as you only get it once: ' + key);
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param apiKey The API key to add
     * @returns Promise containing API key
     */
    addApiKey(apiKey: AddApiKeyObject): Promise<ApiKey>;
    /**
     * Adds an API key
     *
     * Example:
     * ```JavaScript
     * accounts.addApiKey({name: 'auto_generated_key'}, function(error, key) {
     *     if (error) throw error;
     *     var key = keyResult.key;
     *     console.log('Save this signature as you only get it once: ' + key);
     * });
     * ```
     *
     * @param apiKey The API key to add
     * @param callback A function that is passed the return arguments (error, API key)
     */
    addApiKey(apiKey: AddApiKeyObject, callback: CallbackFn<ApiKey>): void;
    /**
     * Updates an API key
     *
     * Example:
     * ```JavaScript
     * accounts.updateApiKey({
     *     id: '015c65119ed102420a01041200000000',
     *     name: 'new API name'
     * })
     * .then(key => {
     *     // Utilize key here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param apiKey The API key to add
     * @returns Promise containing API key
     */
    updateApiKey(apiKey: UpdateApiKeyObject): Promise<ApiKey>;
    /**
     * Updates an API key
     *
     * Example:
     * ```JavaScript
     * accounts.updateApiKey({
     *     id: '015c65119ed102420a01041200000000',
     *     name: 'new API name'
     * }, updatefunction(error, key) {
     *     if (error) throw error;
     *     // Utilize key here
     * });
     * ```
     *
     * @param apiKey The API key to add
     * @param callback A function that is passed the return arguments (error, API key)
     */
    updateApiKey(apiKey: UpdateApiKeyObject, callback: CallbackFn<ApiKey>): void;
    /**
     * Deletes an API key
     *
     * Example:
     * ```JavaScript
     * accounts.deleteApiKey('015c65119ed102420a01041200000000')
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param apiKeyId The API key ID
     * @returns Promise containing any error
     */
    deleteApiKey(apiKeyId: string): Promise<void>;
    /**
     * Deletes an API key
     *
     * Example:
     * ```JavaScript
     * accounts.deleteApiKey('015c65119ed102420a01041200000000', function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param apiKeyId The API key ID
     * @param callback A function that is passed the return arguments (error, void)
     */
    deleteApiKey(apiKeyId: string, callback: CallbackFn<void>): void;
    /**
     * List users
     *
     * Example:
     * ```JavaScript
     * accounts.listUsers({
     *     limit: 10,
     *     filter: {
     *         status: { $eq: 'ACTIVE' }
     *     }
     * })
     * .then(users => {
     *     // Utilize users here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options filter options
     * @returns Promise of listResponse
     */
    listUsers(options?: UserListOptions): Promise<ListResponse<User>>;
    /**
     * List users
     *
     * Example:
     * ```JavaScript
     * accounts.listUsers({
     *     limit: 10,
     *     filter: {
     *         status: { $eq: 'ACTIVE' }
     *     }
     * }, function(error, users) {
     *     if (error) throw error;
     *     // Utilize users here
     * });
     * ```
     *
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listUsers(options?: UserListOptions, callback?: CallbackFn<ListResponse<User>>): void;
    /**
     * Get details of a user
     *
     * Example:
     * ```JavaScript
     * accounts.getUser('015c3c46514802420a010b1000000000')
     * .then(user => {
     *     // Utilize user here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param userId The user ID
     * @returns Promise containing the user
     */
    getUser(userId: string): Promise<User>;
    /**
     * Get details of a user
     *
     * Example:
     * ```JavaScript
     * accounts.getUser('015c3c46514802420a010b1000000000', function(error, user) {
     *     if (error) throw error;
     *     // Utilize user here
     * });
     * ```
     *
     * @param userId The user ID
     * @param callback A function that is passed the return arguments (error, user)
     */
    getUser(userId: string, callback?: CallbackFn<User>): void;
    /**
     * Adds a user
     *
     * Example:
     * ```JavaScript
     * accounts.addUser({
     *     email: 'user@email.com',
     *     fullName: 'First Last',
     *     username: 'user123'
     * })
     * .then(user => {
     *     // Utilize user here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param user User to add
     * @returns Promise containing user
     */
    addUser(user: AddUserObject): Promise<User>;
    /**
     * Adds a user
     *
     * Example:
     * ```JavaScript
     * accounts.addUser({
     *     email: 'user@email.com',
     *     fullName: 'First Last',
     *     username: 'user123'
     * }, function(error, user) {
     *     if (error) throw error;
     *     // Utilize user here
     * });
     * ```
     *
     * @param user User to add
     * @param callback A function that is passed the return arguments (error, user)
     */
    addUser(user: AddUserObject, callback: CallbackFn<User>): void;
    /**
     * Updates a user
     *
     * Example:
     * ```JavaScript
     * accounts.updateUser({
     *     id: '015c3c46514802420a010b1000000000',
     *     fullName: 'First Last',
     *     username: 'user123'
     * })
     * .then(user => {
     *     // Utilize user here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param user User to update
     * @returns Promise containing user
     */
    updateUser(user: UpdateUserObject): Promise<User>;
    /**
     * Updates a user
     *
     * Example:
     * ```JavaScript
     * accounts.updateUser({
     *     id: '015c3c46514802420a010b1000000000',
     *     fullName: 'First Last',
     *     username: 'user123'
     * }, function(error, user) {
     *     if (error) throw error;
     *     // Utilize user here
     * });
     * ```
     *
     * @param user User to update
     * @param callback A function that is passed the return arguments (error, user)
     */
    updateUser(user: UpdateUserObject, callback: CallbackFn<User>): void;
    /**
     * Deletes a user
     *
     * Example:
     * ```JavaScript
     * accounts.deleteUser('015c3c46514802420a010b1000000000')
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param userId The user ID
     * @returns Promise containing any error
     */
    deleteUser(userId: string): Promise<void>;
    /**
     * Deletes a user
     *
     * Example:
     * ```JavaScript
     * accounts.deleteUser('015c3c46514802420a010b1000000000', function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param userId The user ID
     * @param callback A function that is passed the return arguments (error, void)
     */
    deleteUser(userId: string, callback: CallbackFn<void>): void;
    /**
     * List groups
     *
     * Example:
     * ```JavaScript
     * accounts.listGroups({limit: 5})
     * .then(groups => {
     *     // Utilize groups here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options filter options
     * @returns Promise of listResponse
     */
    listGroups(options?: ListOptions): Promise<ListResponse<Group>>;
    /**
     * List groups
     *
     * Example:
     * ```JavaScript
     * accounts.listGroups({limit: 5}, function(error, groups) {
     *     if (error) throw error;
     *     // Utilize groups here
     * });
     * ```
     *
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listGroups(options?: GroupListOptions, callback?: CallbackFn<ListResponse<Group>>): void;
    /**
     * Get details of a group
     *
     * Example:
     * ```JavaScript
     * accounts.getGroup('015b5c9279ee02420a01041200000000')
     * .then(group => {
     *     // Utilize group here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param groupId The group ID
     * @returns Promise containing the group
     */
    getGroup(groupId: string): Promise<Group>;
    /**
     * Get details of a group
     *
     * Example:
     * ```JavaScript
     * accounts.getGroup('015b5c9279ee02420a01041200000000', function(error, group) {
     *     if (error) throw error;
     *     // Utilize group here
     * });
     * ```
     *
     * @param groupId The group ID
     * @param callback A function that is passed the arguments (error, group)
     */
    getGroup(groupId: string, callback: CallbackFn<Group>): void;
    /**
     * List users of a group
     *
     * Example:
     * ```JavaScript
     * accounts.listGroupUsers({limit: 10}, '015b5c9279ee02420a01041200000000')
     * .then(users => {
     *     // Utilize users here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param groupId The group ID
     * @param options filter options
     * @returns Promise of listResponse
     */
    listGroupUsers(groupId: string, options?: ListOptions): Promise<ListResponse<User>>;
    /**
     * List users of a group
     *
     * Example:
     * ```JavaScript
     * accounts.listGroupUsers({limit: 10}, '015b5c9279ee02420a01041200000000', function(error, users) {
     *     if (error) throw error;
     *     // Utilize users here
     * });
     * ```
     *
     * @param groupId The group ID
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listGroupUsers(groupId: string, options?: GroupListOptions, callback?: CallbackFn<ListResponse<User>>): void;
    /**
     * List API keys of a group
     *
     * Example:
     * ```JavaScript
     * accounts.listGroupApiKeys({limit: 10}, '015b5c9279ee02420a01041200000000')
     * .then(keys => {
     *     // Utilize keys here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param groupId The group ID
     * @param options filter options
     * @returns Promise of listResponse
     */
    listGroupApiKeys(groupId: string, options?: ListOptions): Promise<ListResponse<ApiKey>>;
    /**
     * List API keys of a group
     *
     * Example:
     * ```JavaScript
     * accounts.listGroupApiKeys({limit: 10}, '015b5c9279ee02420a01041200000000', function(error, keys) {
     *     if (error) throw error;
     *     // Utilize keys here
     * });
     * ```
     *
     * @param groupId The group ID
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listGroupApiKeys(groupId: string, options?: ListOptions, callback?: CallbackFn<ListResponse<ApiKey>>): void;
    /**
     * Get meta data for the last Pelion Device Management API call
     * @returns Promise of meta data
     */
    getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the last Pelion Device Management API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
}
