/*
 * Pelion Device Management JavaScript SDK
 * Copyright Arm Limited 2017
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
import { CertificatesApi } from "../certificatesApi";
import { AddDeveloperCertificateObject, CertificateStatusEnum, CertificateTypeEnum } from "../types";

/**
 * Certificate
 */
export class Certificate {
    /**
     * Entity ID.
     */
    public readonly id: string;
    /**
     * Certificate type
     */
    public type: CertificateTypeEnum;
    /**
     * Status of the certificate
     */
    public status?: CertificateStatusEnum;
    /**
     * X509.v3 CA certificate in PEM or base64 encoded DER format
     */
    public certificateData: string;
    /**
     * If true, signature parameter is not required. Default value is false.
     */
    public enrollmentMode?: boolean = false;
    /**
     * The UUID of the account.
     */
    public readonly accountId: string;
    /**
     * Subject of the certificate.
     */
    public readonly subject: string;
    /**
     * Expiration Date.
     */
    public readonly validity: Date;
    /**
     * Issuer of the certificate.
     */
    public readonly issuer: string;
    /**
     * The timestamp when this certfcate was created.
     */
    public readonly createdAt?: Date;
    /**
     * The UUID of the certificate owner (user or ApiKey).
     */
    public readonly ownerId?: string;
    /**
     * Bootstrap server URI to which the client needs to connect to.
     */
    public readonly serverUri?: string;
    /**
     * PEM format X.509 server certificate that will be used to validate the server certificate and will be received during the TLS/DTLS handshake.
     */
    public readonly serverCertificate?: string;
    /**
     * Content of the security.c file that will be flashed into the device to provide the security credentials.
     */
    public readonly headerFile?: string;
    /**
     * PEM format X.509 developer certificate.
     */
    public readonly developerCertificate?: string;
    /**
     * PEM format developer private key associated to the certificate.
     */
    public readonly developerPrivateKey?: string;

    constructor(init: Partial<Certificate>, private _api?: CertificatesApi) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
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
    public update(signature: string, callback: CallbackFn<Certificate>): void;
    public update(signature: string, callback?: CallbackFn<Certificate>): Promise<Certificate> {
        return asyncStyle(done => {
            this._api.updateCertificate(
                {
                    id: this.id,
                    signature,
                    type: this.type,
                    status: this.status,
                    certificateData: this.certificateData,
                    name: this.name,
                    description: this.description,
                },
                done
            );
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
    public delete(callback?: CallbackFn<void>): void;
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteCertificate(this.id, done);
        }, callback);
    }
}
export interface Certificate extends AddDeveloperCertificateObject {}
