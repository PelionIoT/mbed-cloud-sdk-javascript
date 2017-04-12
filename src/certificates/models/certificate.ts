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

import { asyncStyle } from "../../common/functions";
import { CallbackFn } from "../../common/interfaces";
import { CertificateObject } from "../types";
import { CertificatesApi } from "../index";

/**
 * Certificate
 */
export class Certificate {
    /**
     * Entity ID.
     */
    readonly id: string;
    /**
     * The UUID of the account.
     */
    readonly accountId: string;
    /**
     * Subject of the certificate.
     */
    readonly subject: string;
    /**
     * Expiration time in UTC formatted as RFC3339.
     */
    readonly validity: string;
    /**
     * Issuer of the certificate.
     */
    readonly issuer: string;
    /**
     * Creation UTC time RFC3339.
     */
    readonly createdAt?: string;
    /**
     * Bootstrap server URI to which the client needs to connect to.
     */
    readonly serverUri?: string;
    /**
     * PEM format X.509 server certificate that will be used to validate the server certificate that will be received during the TLS/DTLS handshake.
     */
    readonly serverCertificate?: string;
    /**
     * Content of the security.c file that will be flashed into the device to provide the security credentials
     */
    readonly headerFile?: string;
    /**
     * PEM format X.509 developer certificate.
     */
    readonly developerCertificate?: string;
    /**
     * PEM format developer private key associated to the certificate.
     */
    readonly developerPrivateKey?: string;

    constructor(init: Partial<Certificate>, private _api?: CertificatesApi) {
        for(var key in init) {
            this[key] = init[key];
        }
    }

    /**
     * Updates the certificate
     * @param signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @returns Promise containing certificate
     */
    public update(signature: string): Promise<Certificate>;
    /**
     * Updates the certificate
     * @param signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public update(signature: string, callback: CallbackFn<Certificate>);
    public update(signature: string, callback?: CallbackFn<Certificate>): Promise<Certificate> {
        return asyncStyle(done => {
            this._api.updateCertificate({
                id:                 this.id,
                signature:          signature,
                type:               this.type,
                certificateData:    this.certificateData,
                name:               this.name,
                description:        this.description
            }, done);
        }, callback);
    }

    /**
     * Delete the certificate
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Delete the certificate
     * @param callback A function that is passed any error
     */
    public delete(callback?: CallbackFn<void>);
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteCertificate(this.id, done);
        }, callback);
    }
}
export interface Certificate extends CertificateObject {}
