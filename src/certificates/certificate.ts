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
import { CertificateType, CertificateTypeEnum, DeveloperCertificateRequest, CertificateRequest } from "./types";
import {
    TrustedCertificateReq as iamCertificateRequest,
    TrustedCertificateResp as iamCertificate
} from "../_api/iam";
import {
    Body as caCertificateRequest,
    InlineResponse200 as bootstrapResponse,
    InlineResponse201 as developerResponse,
    InlineResponse2001 as lwm2mResponse
} from "../_api/connector_ca";
import { CertificatesApi } from "./index";

/*
 * Certificate
 */
export class Certificate {

    constructor(options: CertificateType, private _api?: CertificatesApi) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: iamCertificate, api: CertificatesApi): Certificate {
        let type:CertificateType = {
            accountId:    from.account_id,
            createdAt:    from.created_at,
            data:         from.cert_data,
            id:           from.id,
            issuer:       from.issuer,
            name:         from.name,
            type:         from.device_execution_mode === 1 ? "developer" : from.service,
            subject:      from.subject,
            validity:     from.validity
        };

        return new Certificate(type, api);
    }

    static mapExtension(base: Certificate, extension: bootstrapResponse | lwm2mResponse): Certificate {
        base.serverUri = extension.server_uri;
        base.serverCertificate = extension.server_certificate;

        return base;
    }

    static mapDeveloperExtension(base: Certificate, extension: developerResponse): Certificate {
        base.serverUri = extension.server_uri;
        base.serverCertificate = extension.server_certificate;
        base.headerFile = extension.security_file_content;
        base.developerCertificate = extension.developer_certificate;
        base.developerPrivateKey = extension.developer_private_key;

        return base;
    }

    static reverseIamMap(from: CertificateRequest): iamCertificateRequest {
        return {
            cert_data:      from.certificateData,
            name:           from.name,
            service:        from.type === "developer" ? "bootstrap" : from.type,
            signature:      from.signature,
            description:    from.description
        };
    }

    static reverseCaMap(from: DeveloperCertificateRequest): caCertificateRequest {
        return {
            name:           from.name,
            description:    from.description
        };
    }

    /**
     * Updates the certificate
     * @param options.name Certificate name
     * @param options.description Certificate description
     * @param options.type Certificate type
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @returns Promise containing certificate
     */
    public update(options: { name: string, description: string, type: CertificateTypeEnum, certificateData: string, signature: string }): Promise<Certificate>;
    /**
     * Updates the certificate
     * @param options.name Certificate name
     * @param options.description Certificate description
     * @param options.type Certificate type
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public update(options: { name: string, description: string, type: CertificateTypeEnum, certificateData: string, signature: string }, callback: (err: any, data?: Certificate) => any);
    public update(options: { name: string, description: string, type: CertificateTypeEnum, certificateData: string, signature: string }, callback?: (err: any, data?: Certificate) => any): Promise<Certificate> {
        return asyncStyle(done => {
            this._api.updateCertificate({
                id:                 this.id,
                name:               options.name,
                description:        options.description,
                type:               options.type,
                certificateData:    options.certificateData,
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
