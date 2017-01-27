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
import { ConnectionOptions } from "../common/interfaces";
import { Endpoints } from "./endpoints";
import { DeveloperCertificate } from "./developerCertificate";

/**
 * Root Development API
 */
export class DevelopmentApi {

    private _endpoints: Endpoints;

    /**
     * @param options connection options
     */
    constructor(options: ConnectionOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * Adds a developer certificate to the account (only one per account allowed)
     * @param options.publicKey The developer certificate public key in raw format (65 bytes), Base64 encoded, NIST P-256 curve
     * @returns Promise containing created certificate
     */
    public addCertificate(options: { publicKey: string }): Promise<DeveloperCertificate>;
    /**
     * Adds a developer certificate to the account (only one per account allowed).
     * @param options.publicKey The developer certificate public key in raw format (65 bytes), Base64 encoded, NIST P-256 curve.
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public addCertificate(options: { publicKey: string }, callback: (err: any, data?: DeveloperCertificate) => any);
    public addCertificate(options: { publicKey: string }, callback?: (err: any, data?: DeveloperCertificate) => any): Promise<DeveloperCertificate> {
        let body = {
            pub_key: options.publicKey
        };
        return pg(done => {
            this._endpoints.development.v3DeveloperCertificatePost("", body, (error, data) => {
                if (error) return done(error);

                let cert = DeveloperCertificate.map(data);
                done(null, cert);
            });
        }, callback);
    }

    /**
     * Gets the current developer certificate of the account
     * @returns Promise containing current certificate
     */
    public getCertificate(): Promise<DeveloperCertificate>;
    /**
     * Gets the current developer certificate of the account
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public getCertificate(callback: (err: any, data?: DeveloperCertificate) => any);
    public getCertificate(callback?: (err: any, data?: DeveloperCertificate) => any): Promise<DeveloperCertificate> {
        return pg(done => {
            this._endpoints.development.v3DeveloperCertificateGet("", (error, data) => {
                if (error) return done(error);

                let cert = DeveloperCertificate.map(data);
                done(null, cert);
            });
        }, callback);
    }

    /**
     * Deletes the account's developer certificate (only one per account allowed)
     * @returns empty Promise
     */
    public deleteCertificate(): Promise<void>;
    /**
     * Deletes the account's developer certificate (only one per account allowed)
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteCertificate(callback?: (err: any, data?: void) => any);
    public deleteCertificate(callback?: (err: any, data?: void) => any): Promise<void> {
        return pg(done => {
            this._endpoints.development.v3DeveloperCertificateDelete("", (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }
}
