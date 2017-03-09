/* 
* mbed Cloud JavaScript SDK
* Copyright ARM Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { asyncStyle, mapListResponse, encodeInclude, encodeAttributes } from "../common/functions";
import { ConnectionOptions, ListOptions, ListResponse } from "../common/interfaces";
import { Endpoints } from "./endpoints";
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
export class AccessApi {

    private _endpoints: Endpoints;

    /**
    * @param options connection options
    */
    constructor(options: ConnectionOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * Get details of account associated with current API key
     * @returns Promise of account
     */
    public getAccountDetails(): Promise<Account>;
    /**
     * Get details of account associated with current API key
     * @param callback A function that is passed the return arguments (error, account)
     */
    public getAccountDetails(callback: (err: any, data?: Account) => any);
    public getAccountDetails(callback?: (err: any, data?: Account) => any): Promise<Account> {
        return asyncStyle(done => {
            this._endpoints.developer.getMyAccountInfo("limits", (error, data) => {
                if (error) return done(error);
                done(null, Account.map(data, this));
            });
        }, callback);
    }

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
    public updateAccountDetails(options: { displayName?: string, parentId?: string, aliases?: string[], company?: string, contact?: string, email?: string, phoneNumber?: string, addressLine1?: string, addressLine2?: string, city?: string, state?: string, postcode?: string, country?: string }): Promise<Account>;
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
    public updateAccountDetails(options: { displayName?: string, parentId?: string, aliases?: string[], company?: string, contact?: string, email?: string, phoneNumber?: string, addressLine1?: string, addressLine2?: string, city?: string, state?: string, postcode?: string, country?: string }, callback?: (err: any, data?: Account) => any);
    public updateAccountDetails(options: { displayName?: string, parentId?: string, aliases?: string[], company?: string, contact?: string, email?: string, phoneNumber?: string, addressLine1?: string, addressLine2?: string, city?: string, state?: string, postcode?: string, country?: string }, callback?: (err: any, data?: Account) => any): Promise<Account> {
        let account = Account.reverseMap(options);
        return asyncStyle(done => {
            this._endpoints.admin.updateMyAccount(account, (error, data) => {
                if (error) return done(error);
                done(null, Account.map(data, this));
            });
        }, callback);
    }

    /**
     * List API keys
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listApiKeys(options?: ListOptions): Promise<ListResponse<ApiKey>>;
    /**
     * List API keys
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public listApiKeys(options?: ListOptions, callback?: (err: any, data?: ListResponse<ApiKey>) => any);
    public listApiKeys(options?: any, callback?: (err: any, data?: ListResponse<ApiKey>) => any): Promise<ListResponse<ApiKey>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let { limit, after, order, include, attributes } = options as ListOptions;
        let owner = attributes ? attributes["owner"] : null;

        return asyncStyle(done => {
            this._endpoints.developer.getAllApiKeys(limit, after, order, encodeInclude(include), owner, (error, data) => {
                if (error) return done(error);

                var keys = data.data.map(key => {
                    return ApiKey.map(key, this);
                });
                done(null, mapListResponse(data, keys));
            });
        }, callback);
    }

    /**
     * Get details of an API key
     * @param options.id The API key ID (if not specified, returns current API key)
     * @returns Promise containing the API key
     */
    public getApiKey(options?: { id?: string }): Promise<ApiKey>;
    /**
     * Get details of an API key
     * @param options.id The API key ID (if not specified, returns current API key)
     * @param callback A function that is passed the return arguments (error, API key)
     */
    public getApiKey(options?: { id?: string }, callback?: (err: any, data?: ApiKey) => any);
    public getApiKey(options?: any, callback?: (err: any, data?: ApiKey) => any): Promise<ApiKey> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return asyncStyle(done => {
            if (options.id) {
                this._endpoints.developer.getApiKey(options.id, (error, data) => {
                    if (error) return done(error);
                    done(null, ApiKey.map(data, this));
                });
            } else {
                this._endpoints.developer.getMyApiKey((error, data) => {
                    if (error) return done(error);
                    done(null, ApiKey.map(data, this));
                });
            }
        }, callback);
    }

    /**
     * Adds an API key
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @returns Promise containing API key
     */
    public addApiKey(options: { name: string, owner?: string }): Promise<ApiKey>;
    /**
     * Adds an API key
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @param callback A function that is passed the return arguments (error, API key)
     */
    public addApiKey(options: { name: string, owner?: string }, callback: (err: any, data?: ApiKey) => any);
    public addApiKey(options: { name: string, owner?: string }, callback?: (err: any, data?: ApiKey) => any): Promise<ApiKey> {
        return asyncStyle(done => {
            this._endpoints.developer.createApiKey(options, (error, data) => {
                if (error) return done(error);

                let key = ApiKey.map(data, this);
                done(null, key);
            });
        }, callback);
    }

    /**
     * Updates an API key
     * @param options.id The API key ID (if not specified, updates current API key)
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @returns Promise containing API key
     */
    public updateApiKey(options: { id?: string, name: string, owner?: string }): Promise<ApiKey>;
    /**
     * Updates an API key
     * @param options.id The API key ID (if not specified, updates current API key)
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @param callback A function that is passed the return arguments (error, API key)
     */
    public updateApiKey(options: { id?: string, name: string, owner?: string }, callback: (err: any, data?: ApiKey) => any);
    public updateApiKey(options: { id?: string, name: string, owner?: string }, callback?: (err: any, data?: ApiKey) => any): Promise<ApiKey> {
        return asyncStyle(done => {
            if (options.id) {
                this._endpoints.developer.updateApiKey(options.id, options, (error, data) => {
                    if (error) return done(error);
                    done(null, ApiKey.map(data, this));
                });
            } else {
                this._endpoints.developer.updateMyApiKey(options, (error, data) => {
                    if (error) return done(error);
                    done(null, ApiKey.map(data, this));
                });
            }
        }, callback);
    }

    /**
     * Deletes an API key
     * @param options.id The API key ID
     * @returns Promise containing any error
     */
    public deleteApiKey(options: { id: string }): Promise<void>;
    /**
     * Deletes an API key
     * @param options.id The API key ID
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteApiKey(options: { id: string }, callback: (err: any, data?: void) => any);
    public deleteApiKey(options: { id: string }, callback?: (err: any, data?: void) => any): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.developer.deleteApiKey(options.id, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * List users
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listUsers(options?: ListOptions): Promise<ListResponse<User>>;
    /**
     * List users
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public listUsers(options?: ListOptions, callback?: (err: any, data?: ListResponse<User>) => any);
    public listUsers(options?: any, callback?: (err: any, data?: ListResponse<User>) => any): Promise<ListResponse<User>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let { limit, after, order, include, attributes } = options as ListOptions;
        let filter = encodeAttributes(attributes);

        return asyncStyle(done => {
            this._endpoints.admin.getAllUsers(limit, after, order, encodeInclude(include), filter, (error, data) => {
                if (error) return done(error);

                let users = data.data.map(user => {
                    return User.map(user, this);
                });

                done(null, mapListResponse(data, users));
            });
        }, callback);
    }

    /**
     * Get details of a user
     * @param options.id The user ID
     * @returns Promise containing the user
     */
    public getUser(options: { id: string }): Promise<User>;
    /**
     * Get details of a user
     * @param options.id The user ID
     * @param callback A function that is passed the return arguments (error, user)
     */
    public getUser(options: { id: string }, callback: (err: any, data?: User) => any);
    public getUser(options: { id: string }, callback?: (err: any, data?: User) => any): Promise<User> {
        return asyncStyle(done => {
            this._endpoints.admin.getUser(options.id, (error, data) => {
                if (error) return done(error);
                done(null, User.map(data, this));
            });
        }, callback);
    }

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
    public addUser(options: { username: string, phoneNumber?: string, marketingAccepted?: boolean, termsAccepted?: boolean,
        fullName?: string, address?: string, password?: string, email: string }): Promise<User>;
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
    public addUser(options: { username: string, phoneNumber?: string, marketingAccepted?: boolean, termsAccepted?: boolean,
        fullName?: string, address?: string, password?: string, email: string }, callback: (err: any, data?: User) => any);
    public addUser(options: { username: string, phoneNumber?: string, marketingAccepted?: boolean, termsAccepted?: boolean,
        fullName?: string, address?: string, password?: string, email: string }, callback?: (err: any, data?: User) => any): Promise<User> {
        return asyncStyle(done => {
            let apiUser = User.reverseMap(options);
            this._endpoints.admin.createUser(apiUser, "create", (error, data) => {
                if (error) return done(error);
                done(null, User.map(data, this));
            });
        }, callback);
    }

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
    public updateUser(options: { id: string, username: string, phoneNumber?: string, marketingAccepted?: boolean, termsAccepted?: boolean,
        fullName?: string, address?: string, password?: string, email: string }): Promise<User>;
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
    public updateUser(options: { id: string, username: string, phoneNumber?: string, marketingAccepted?: boolean, termsAccepted?: boolean,
        fullName?: string, address?: string, password?: string, email: string }, callback: (err: any, data?: User) => any);
    public updateUser(options: { id: string, username: string, phoneNumber?: string, marketingAccepted?: boolean, termsAccepted?: boolean,
        fullName?: string, address?: string, password?: string, email: string }, callback?: (err: any, data?: User) => any): Promise<User> {
        return asyncStyle(done => {
            let apiUser = User.reverseMap(options);
            this._endpoints.admin.updateUser(options.id, apiUser, (error, data) => {
                if (error) return done(error);
                done(null, User.map(data, this));
            });
        }, callback);
    }

    /**
     * Deletes a user
     * @param options.id The user ID
     * @param options.force A flag indicating that the user is forced to be deleted
     * @returns Promise containing any error
     */
    public deleteUser(options: { id: string, force?:string }): Promise<void>;
    /**
     * Deletes a user
     * @param options.id The user ID
     * @param options.force A flag indicating that the user is forced to be deleted
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteUser(options: { id: string, force?:string }, callback: (err: any, data?: void) => any);
    public deleteUser(options: { id: string, force?:string }, callback?: (err: any, data?: void) => any): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.admin.deleteUser(options.id, options.force, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }
}
