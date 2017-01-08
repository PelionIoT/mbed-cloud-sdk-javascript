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
import { ConnectionOptions } from "../helpers/interfaces";
import { Api } from "./api";

/**
* Root Account object
*/
export class Development {

    private _api: Api;

    /**
    * @param options Options object
    */
    constructor(options: ConnectionOptions) {
        this._api = new Api(options);
    }

    public postCertificate(options: { pubKey: string }): Promise<Certificate>;
    public postCertificate(options: { pubKey: string }, callback: (err: any, data?: Certificate) => void);
    /**
    * Adds a developer certificate to the account (only one per account allowed).
    * @param callback
    * @returns Optional Promise
    */
    public postCertificate(options: { pubKey: string }, callback?: (err: any, data?: any) => void): Promise<any> {
        return pg(done => {
            this._api.default.v3DeveloperCertificatePost("authorization", options, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    public getCertificate(): Promise<Certificate>;
    public getCertificate(callback?: (err: any, data?: Certificate) => void);
    /**
    * Gets the developer certificate of the account.
    * @param callback
    * @returns Optional Promise
    */
    public getCertificate(callback?: (err: any, data?: Certificate) => void): Promise<Certificate> {
        return pg(done => {
            this._api.default.v3DeveloperCertificateGet("options.authorization", (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    public deleteCertificate(): Promise<void>;
    public deleteCertificate(callback?: (err: any, data?: void) => void);
    /**
    * Deletes the account's developer certificate (only one per account allowed).
    * @param callback
    * @returns Optional Promise
    */
    public deleteCertificate(callback?: (err: any, data?: void) => void): Promise<void> {
        return pg(done => {
            this._api.default.v3DeveloperCertificateDelete("options.authorization", (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }
}

export interface Certificate {
    /**
    * UTC time of the entity creation.
    */
    createdAt: string;
    /**
    * The developer certificate public key in PEM format (NIST P-256 curve).
    */
    pubKey: string;
    /**
    * entity ID
    */
    id: string;
}
