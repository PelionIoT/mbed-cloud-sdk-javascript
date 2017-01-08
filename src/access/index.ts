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
import { ConnectionOptions, ListOptions } from "../helpers/interfaces";
import { Api } from "./api";
import { User } from "./user";
import { Certificate } from "./certificate";

/**
* Root Account object
*/
export class Access {

    private _api: Api;

    /**
    * @param options Options object
    */
    constructor(options: ConnectionOptions) {
        this._api = new Api(options);
    }

    public getUsers(options?: ListOptions): Promise<User[]>;
    public getUsers(options?: ListOptions, callback?: (err: any, data?: User[]) => void);
    /**
    * Gets a list of currently registered endpoints
    * @param options Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    public getUsers(options?: any, callback?: (err: any, data?: User[]) => void): Promise<User[]> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let {limit, after, order, include, filter} = options;
        return pg(done => {
            this._api.admin.getAllUsers(limit, after, order, include, filter, (error, data) => {
                if (error) return done(error);
                /*
                { object: 'list',
                 limit: 50,
                 order: 'ASC',
                 total_count: 23,
                 has_more: false,
                 data:
                 */
                var users = data.data.map(user => {
                    return new User(this._api, user);
                });
                done(null, users);
            });
        }, callback);
    }

    public getCertificates(options?: ListOptions): Promise<Certificate[]>;
    public getCertificates(options?: ListOptions, callback?: (err: any, data?: Certificate[]) => void);
    /**
    * Gets a list of certificates
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    public getCertificates(options?: any, callback?: (err: any, data?: Certificate[]) => void): Promise<Certificate[]> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let {limit, after, order, include, filter} = options;
        return pg(done => {
            this._api.admin.getAllCertificates(limit, after, order, include, filter, (error, data) => {
                if (error) return done(error);
                var certificates = data.data.map(certificate => {
                    return new Certificate(this._api, certificate);
                });
                done(null, certificates);
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

//CURRENT_USER
//devAPI.getMyAccountinfo
//devAPI.getMyApiKey
//devAPI.getMyUser

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

//??????
//rootAPI.useQuerystring
