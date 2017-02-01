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

import { asyncStyle } from "../common/functions";
import { CertificateType, CertificateServiceEnum } from "./types";
import {
    CACertificateReq as apiCertificateRequest,
    CACertificateResp as apiCertificate
} from "../_api/iam";
import { AccessApi } from "./index";

/*
 * Certificate
 */
export class Certificate {

    constructor(options: CertificateType, private _api?: AccessApi) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiCertificate, api: AccessApi): Certificate {
        let type:CertificateType = {
            accountId:    from.account_id,
            createdAt:    from.created_at,
            data:         from.cert_data,
            id:           from.id,
            issuer:       from.issuer,
            name:         from.name,
            service:      from.service,
            subject:      from.subject,
            validity:     from.validity
        };

        return new Certificate(type, api);
    }

    static reverseMap(from: any): apiCertificateRequest {
        return {
            cert_data:    from.certificateData,
            name:         from.name,
            service:      from.service,
            signature:    from.signature
        };
    }

    /**
     * Updates the certificate
     * @param options.name Certificate name
     * @param options.service Service name where the certificate must be used
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @returns Promise containing certificate
     */
    public update(options: { name: string, service: CertificateServiceEnum, certificateData: string, signature: string }): Promise<Certificate>;
    /**
     * Updates the certificate
     * @param options.name Certificate name
     * @param options.service Service name where the certificate must be used
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public update(options: { name: string, service: CertificateServiceEnum, certificateData: string, signature: string }, callback: (err: any, data?: Certificate) => any);
    public update(options: { name: string, service: CertificateServiceEnum, certificateData: string, signature: string }, callback?: (err: any, data?: Certificate) => any): Promise<Certificate> {
        return asyncStyle(done => {
            this._api.updateCertificate({
                id:                 this.id,
                name:               options.name,
                certificateData:    options.certificateData,
                service:            options.service,
                signature:          options.signature
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
    public delete(callback?: (err: any, data?: void) => any);
    public delete(callback?: (err: any, data?: void) => any): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteCertificate(this, done);
        }, callback);
    }
}
export interface Certificate extends CertificateType {}
