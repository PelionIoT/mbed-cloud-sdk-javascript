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
import { mapListResponse } from "../helpers/data";
import { Api } from "./api";
import { User, UserOptions } from "./user";
import { Certificate } from "./certificate";
import { AccountInfo, UserInfoResp, UserInfoRespList } from "../_api/iam";

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

    private mapUser(from: UserInfoResp): User {
        let to:UserOptions = {
            account_id: from.account_id,
            full_name: from.full_name,
            id: from.id,
            status: from.status,
            username: from.username
        };

        return new User(this._api, to);
    }

    /**
     * List device logs
     * @param options list options
     * @returns Promise of listResponse
     */
    public getAccountDetails(): Promise<any>;
    /**
     * List device logs
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public getAccountDetails(callback: (err: any, data?: any) => any): void;
    public getAccountDetails(callback?: (err: any, data?: any) => any): Promise<any> {
        return pg(done => {
            this._api.developer.getMyAccountInfo(null, (error, data:AccountInfo) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    public listUsers(options?: ListOptions): Promise<ListResponse<User>>;
    public listUsers(options?: ListOptions, callback?: (err: any, data?: ListResponse<User>) => void);
    /**
    * Gets a list of currently registered endpoints
    * @param options Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    public listUsers(options?: any, callback?: (err: any, data?: ListResponse<User>) => void): Promise<ListResponse<User>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let {limit, after, order, include, filter} = options;
        return pg(done => {
            this._api.admin.getAllUsers(limit, after, order, include, filter, (error, data:UserInfoRespList) => {
                if (error) return done(error);

                let users = data.data.map(user => {
                    return this.mapUser(user);
                });

                done(null, mapListResponse(data, users));
            });
        }, callback);
    }

    public listCertificates(options?: ListOptions): Promise<Certificate[]>;
    public listCertificates(options?: ListOptions, callback?: (err: any, data?: Certificate[]) => void);
    /**
    * Gets a list of certificates
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    public listCertificates(options?: any, callback?: (err: any, data?: Certificate[]) => void): Promise<Certificate[]> {
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
