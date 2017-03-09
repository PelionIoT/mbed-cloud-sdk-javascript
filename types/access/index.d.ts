import { ConnectionOptions, ListOptions, ListResponse } from "../common/interfaces";
import { Account } from "./account";
import { User } from "./user";
import { ApiKey } from "./apiKey";
/**
 * ## Access API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbed = require("mbed-cloud-sdk");
 *
 * var access = new mbed.AccessApi({
 *     apiKey: "<mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/access.min.js"></script>
 *
 * <script>
 *     var access = new mbed.AccessApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 */
export declare class AccessApi {
    private _endpoints;
    /**
    * @param options connection options
    */
    constructor(options: ConnectionOptions);
    /**
     * Get details of account associated with current API key
     * @returns Promise of account
     */
    getAccountDetails(): Promise<Account>;
    /**
     * Get details of account associated with current API key
     * @param callback A function that is passed the return arguments (error, account)
     */
    getAccountDetails(callback: (err: any, data?: Account) => any): any;
    /**
     * Update details of account associated with current API key
     * @param options.displayName The display name for the account
     * @param options.parentId The ID of the parent account, if it has any
     * @param options.aliases An array of aliases
     * @param options.company The name of the company
     * @param options.contact The name of the contact person for this account
     * @param options.email The company email address for this account
     * @param options.phoneNumber The phone number of the company
     * @param options.addressLine1 Postal address line 1
     * @param options.addressLine2 Postal address line 2
     * @param options.city The city part of the postal address
     * @param options.state The state part of the postal address
     * @param options.postcode The postal code part of the postal address
     * @param options.country The country part of the postal address
     * @returns Promise of account
     */
    updateAccountDetails(options: {
        displayName?: string;
        parentId?: string;
        aliases?: string[];
        company?: string;
        contact?: string;
        email?: string;
        phoneNumber?: string;
        addressLine1?: string;
        addressLine2?: string;
        city?: string;
        state?: string;
        postcode?: string;
        country?: string;
    }): Promise<Account>;
    /**
     * Update details of account associated with current API key
     * @param options.displayName The display name for the account
     * @param options.parentId The ID of the parent account, if it has any
     * @param options.aliases An array of aliases
     * @param options.company The name of the company
     * @param options.contact The name of the contact person for this account
     * @param options.email The company email address for this account
     * @param options.phoneNumber The phone number of the company
     * @param options.addressLine1 Postal address line 1
     * @param options.addressLine2 Postal address line 2
     * @param options.city The city part of the postal address
     * @param options.state The state part of the postal address
     * @param options.postcode The postal code part of the postal address
     * @param options.country The country part of the postal address
     * @param callback A function that is passed the return arguments (error, account)
     */
    updateAccountDetails(options: {
        displayName?: string;
        parentId?: string;
        aliases?: string[];
        company?: string;
        contact?: string;
        email?: string;
        phoneNumber?: string;
        addressLine1?: string;
        addressLine2?: string;
        city?: string;
        state?: string;
        postcode?: string;
        country?: string;
    }, callback?: (err: any, data?: Account) => any): any;
    /**
     * List API keys
     * @param options filter options
     * @returns Promise of listResponse
     */
    listApiKeys(options?: ListOptions): Promise<ListResponse<ApiKey>>;
    /**
     * List API keys
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listApiKeys(options?: ListOptions, callback?: (err: any, data?: ListResponse<ApiKey>) => any): any;
    /**
     * Get details of an API key
     * @param options.id The API key ID (if not specified, returns current API key)
     * @returns Promise containing the API key
     */
    getApiKey(options?: {
        id?: string;
    }): Promise<ApiKey>;
    /**
     * Get details of an API key
     * @param options.id The API key ID (if not specified, returns current API key)
     * @param callback A function that is passed the return arguments (error, API key)
     */
    getApiKey(options?: {
        id?: string;
    }, callback?: (err: any, data?: ApiKey) => any): any;
    /**
     * Adds an API key
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @returns Promise containing API key
     */
    addApiKey(options: {
        name: string;
        owner?: string;
    }): Promise<ApiKey>;
    /**
     * Adds an API key
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @param callback A function that is passed the return arguments (error, API key)
     */
    addApiKey(options: {
        name: string;
        owner?: string;
    }, callback: (err: any, data?: ApiKey) => any): any;
    /**
     * Updates an API key
     * @param options.id The API key ID (if not specified, updates current API key)
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @returns Promise containing API key
     */
    updateApiKey(options: {
        id?: string;
        name: string;
        owner?: string;
    }): Promise<ApiKey>;
    /**
     * Updates an API key
     * @param options.id The API key ID (if not specified, updates current API key)
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @param callback A function that is passed the return arguments (error, API key)
     */
    updateApiKey(options: {
        id?: string;
        name: string;
        owner?: string;
    }, callback: (err: any, data?: ApiKey) => any): any;
    /**
     * Deletes an API key
     * @param options.id The API key ID
     * @returns Promise containing any error
     */
    deleteApiKey(options: {
        id: string;
    }): Promise<void>;
    /**
     * Deletes an API key
     * @param options.id The API key ID
     * @param callback A function that is passed the return arguments (error, void)
     */
    deleteApiKey(options: {
        id: string;
    }, callback: (err: any, data?: void) => any): any;
    /**
     * List users
     * @param options filter options
     * @returns Promise of listResponse
     */
    listUsers(options?: ListOptions): Promise<ListResponse<User>>;
    /**
     * List users
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listUsers(options?: ListOptions, callback?: (err: any, data?: ListResponse<User>) => any): any;
    /**
     * Get details of a user
     * @param options.id The user ID
     * @returns Promise containing the user
     */
    getUser(options: {
        id: string;
    }): Promise<User>;
    /**
     * Get details of a user
     * @param options.id The user ID
     * @param callback A function that is passed the return arguments (error, user)
     */
    getUser(options: {
        id: string;
    }, callback: (err: any, data?: User) => any): any;
    /**
     * Adds a user
     * @param options.username A username containing alphanumerical letters and -,._@+= characters
     * @param options.phoneNumber Phone number
     * @param options.marketingAccepted A flag indicating that receiving marketing information has been accepted
     * @param options.termsAccepted A flag indicating that the General Terms and Conditions has been accepted
     * @param options.fullName The full name of the user
     * @param options.address Address
     * @param options.password The password when creating a new user. It will will generated when not present in the request
     * @param options.email The email address
     * @returns Promise containing user
     */
    addUser(options: {
        username: string;
        phoneNumber?: string;
        marketingAccepted?: boolean;
        termsAccepted?: boolean;
        fullName?: string;
        address?: string;
        password?: string;
        email: string;
    }): Promise<User>;
    /**
     * Adds a user
     * @param options.username A username containing alphanumerical letters and -,._@+= characters
     * @param options.phoneNumber Phone number
     * @param options.marketingAccepted A flag indicating that receiving marketing information has been accepted
     * @param options.termsAccepted A flag indicating that the General Terms and Conditions has been accepted
     * @param options.fullName The full name of the user
     * @param options.address Address
     * @param options.password The password when creating a new user. It will will generated when not present in the request
     * @param options.email The email address
     * @param callback A function that is passed the return arguments (error, user)
     */
    addUser(options: {
        username: string;
        phoneNumber?: string;
        marketingAccepted?: boolean;
        termsAccepted?: boolean;
        fullName?: string;
        address?: string;
        password?: string;
        email: string;
    }, callback: (err: any, data?: User) => any): any;
    /**
     * Updates a user
     * @param options.id User ID
     * @param options.username A username containing alphanumerical letters and -,._@+= characters
     * @param options.phoneNumber Phone number
     * @param options.marketingAccepted A flag indicating that receiving marketing information has been accepted
     * @param options.termsAccepted A flag indicating that the General Terms and Conditions has been accepted
     * @param options.fullName The full name of the user
     * @param options.address Address
     * @param options.password The password when creating a new user. It will will generated when not present in the request
     * @param options.email The email address
     * @returns Promise containing user
     */
    updateUser(options: {
        id: string;
        username: string;
        phoneNumber?: string;
        marketingAccepted?: boolean;
        termsAccepted?: boolean;
        fullName?: string;
        address?: string;
        password?: string;
        email: string;
    }): Promise<User>;
    /**
     * Updates a user
     * @param options.id User ID
     * @param options.username A username containing alphanumerical letters and -,._@+= characters
     * @param options.phoneNumber Phone number
     * @param options.marketingAccepted A flag indicating that receiving marketing information has been accepted
     * @param options.termsAccepted A flag indicating that the General Terms and Conditions has been accepted
     * @param options.fullName The full name of the user
     * @param options.address Address
     * @param options.password The password when creating a new user. It will will generated when not present in the request
     * @param options.email The email address
     * @param callback A function that is passed the return arguments (error, user)
     */
    updateUser(options: {
        id: string;
        username: string;
        phoneNumber?: string;
        marketingAccepted?: boolean;
        termsAccepted?: boolean;
        fullName?: string;
        address?: string;
        password?: string;
        email: string;
    }, callback: (err: any, data?: User) => any): any;
    /**
     * Deletes a user
     * @param options.id The user ID
     * @param options.force A flag indicating that the user is forced to be deleted
     * @returns Promise containing any error
     */
    deleteUser(options: {
        id: string;
        force?: string;
    }): Promise<void>;
    /**
     * Deletes a user
     * @param options.id The user ID
     * @param options.force A flag indicating that the user is forced to be deleted
     * @param callback A function that is passed the return arguments (error, void)
     */
    deleteUser(options: {
        id: string;
        force?: string;
    }, callback: (err: any, data?: void) => any): any;
}
