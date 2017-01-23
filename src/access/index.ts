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

import pg = require("polygoat");
import { ConnectionOptions, ListOptions, ListResponse } from "../helpers/interfaces";
import { mapListResponse, encodeInclude } from "../helpers/data";
import { Endpoints } from "./endpoints";
import { Account } from "./account";
import { Certificate } from "./certificate";
import { User } from "./user";

/**
* Root Access API
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
     * Get account details
     * @returns Promise of account
     */
    public getAccount(): Promise<Account>;
    /**
     * Get account details
     * @param callback A function that is passed the return arguments (error, account)
     */
    public getAccount(callback: (err: any, data?: Account) => any): void;
    public getAccount(callback?: (err: any, data?: Account) => any): Promise<Account> {
        return pg(done => {
            this._endpoints.developer.getMyAccountInfo(null, (error, data) => {
                if (error) return done(error);
                done(null, Account.map(data));
            });
        }, callback);
    }

    /**
    * List users
    * @param options list options
    * @returns Promise of listResponse
    */
    public listUsers(options?: ListOptions): Promise<ListResponse<User>>;
    /**
    * List users
    * @param options list options
    * @param callback A function that is passed the arguments (error, listResponse)
    */
    public listUsers(options?: ListOptions, callback?: (err: any, data?: ListResponse<User>) => any);
    public listUsers(options?: any, callback?: (err: any, data?: ListResponse<User>) => any): Promise<ListResponse<User>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, after, order, include, filter } = options;
        return pg(done => {
            this._endpoints.admin.getAllUsers(limit, after, order, encodeInclude(include), filter, (error, data) => {
                if (error) return done(error);

                let users = data.data.map(user => {
                    return User.map(user);
                });

                done(null, mapListResponse(data, users));
            });
        }, callback);
    }

    /**
    * List certificates
    * @param options list options
    * @param callback A function that is passed the arguments (error, listResponse)
    * @returns Promise of listResponse
    */
    public listCertificates(options?: ListOptions): Promise<ListResponse<Certificate>>;
    /**
    * List certificates
    * @param options list options
    * @param callback A function that is passed the arguments (error, listResponse)
    * @returns Promise of listResponse
    */
    public listCertificates(options?: ListOptions, callback?: (err: any, data?: ListResponse<Certificate>) => any);
    public listCertificates(options?: any, callback?: (err: any, data?: ListResponse<Certificate>) => any): Promise<ListResponse<Certificate>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, after, order, include, filter } = options;
        return pg(done => {
            this._endpoints.admin.getAllCertificates(limit, after, order, encodeInclude(include), filter, (error, data) => {
                if (error) return done(error);

                var certificates = data.data.map(certificate => {
                    return Certificate.map(certificate);
                });
                done(null, mapListResponse(data, certificates));
            });
        }, callback);
    }
}

//USERS
//adAPI.getAllUsers
//adAPI.getUser (details)
//adAPI.createUSER
//adAPI.deleteUser
//defAPI.activateUser
//defAPI.requestPasswordRecovery
//defAPI.applyPasswordRecovery
//defAPI.getInvitedUser
//defAPI.getSelfEnrollingUSer
//defAPI.setApiKey
//defAPI.registerAccount
//defAPI.signup

//KEYS
//devAPI.createApiKey
//devAPI.deleteApiKey
//devAPI.getAllApiKeys
//devAPI.getApiKey
//rootAPI.setApiKey

//GROUPS
//devAPI.getAllGroups

//ACCOUNTS
//rootAPI.getAllAccountTemplates
//rootAPI.getAccountTemplate
//rootAPI.createAccountTemplate
//rootAPI.deleteAccountTemplate
//rootAPI.updateAccountTemplate

//CERTS
//adAPI.getAllCertificates
//adAPI.getCertificate (details)
//adAPI.addCertificate
//adAPI.deleteCertificate
