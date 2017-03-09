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

import { asyncStyle, mapListResponse, encodeInclude } from "../common/functions";
import { ConnectionOptions, CallbackFn, ListOptions, ListResponse } from "../common/interfaces";
import { Endpoints } from "./endpoints";
import { CertificateTypeEnum, CertificateRequest, DeveloperCertificateRequest } from "./types";
import { Certificate } from "./certificate";
import { TrustedCertificateResp as iamCertificate } from "../_api/iam";

/**
 * ## Certificates API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbed = require("mbed-cloud-sdk");
 *
 * var certificates = new mbed.CertificatesApi({
 *     apiKey: "<mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/certificates.min.js"></script>
 *
 * <script>
 *     var certificates = new mbed.CertificatesApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 */
export class CertificatesApi {

    private _endpoints: Endpoints;

    /**
     * @param options connection options
     */
    constructor(options: ConnectionOptions) {
        this._endpoints = new Endpoints(options);
    }

    private extendCertificate(iamCert: iamCertificate, done: Function) {

        let certificate = Certificate.map(iamCert, this);

        switch (certificate.type) {
            case "developer":
                this._endpoints.developer.v3DeveloperCertificatesIdGet(certificate.id, "", (error, data) => {
                    if (error) return done(error);
                    Certificate.mapDeveloperExtension(certificate, data);
                });
                break;

            case "bootstrap":
                this._endpoints.server.v3ServerCredentialsBootstrapGet("", (error, data) => {
                    if (error) return done(error);
                    Certificate.mapExtension(certificate, data);
                });
                break;

            case "lwm2m":
                this._endpoints.server.v3ServerCredentialsLwm2mGet("", (error, data) => {
                    if (error) return done(error);
                    Certificate.mapExtension(certificate, data);
                });
                break;
        }

        done(null, certificate);
    }

    /**
     * List certificates
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listCertificates(options?: ListOptions): Promise<ListResponse<Certificate>>;
    /**
     * List certificates
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public listCertificates(options?: ListOptions, callback?: (err: any, data?: ListResponse<Certificate>) => any);
    public listCertificates(options?: any, callback?: (err: any, data?: ListResponse<Certificate>) => any): Promise<ListResponse<Certificate>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let { limit, after, order, include, attributes } = options as ListOptions;
        let type = attributes ? attributes["type"] : "developer";
        let serviceEq = type === "developer" ? "bootstrap" : type;
        let executionMode = type === "developer" ? 1 : 0;

        return asyncStyle(done => {
            this._endpoints.admin.getAllCertificates(limit, after, order, encodeInclude(include), serviceEq, 0, executionMode, (error, data) => {
                if (error) return done(error);

                var certificates = data.data.map(certificate => {
                    return Certificate.map(certificate, this);
                });
                done(null, mapListResponse(data, certificates));
            });
        }, callback);
    }

    /**
     * Get details of a certificate
     * @param options.id The certificate ID
     * @returns Promise containing the certificate
     */
    public getCertificate(options: { id: string }): Promise<Certificate>;
    /**
     * Get details of a certificate
     * @param options.id The certificate ID
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public getCertificate(options: { id: string }, callback: CallbackFn<Certificate>);
    public getCertificate(options: { id: string }, callback?: (err: any, data?: Certificate) => any): Promise<Certificate> {
        return asyncStyle(done => {
            this._endpoints.admin.getCertificate(options.id, (error, data) => {
                if (error) return done(error);
                this.extendCertificate(data, done);
            });
        }, callback);
    }

    /**
     * Adds a generated developer certificate
     * @param options Certificate request
     * @returns Promise containing certificate
     */
    public addCertificate(options: DeveloperCertificateRequest): Promise<Certificate>;
    /**
     * Adds a generated developer certificate
     * @param options Certificate request
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public addCertificate(options: DeveloperCertificateRequest, callback: CallbackFn<Certificate>): void;
    /**
     * Adds a certificate
     * @param options Certificate request
     * @returns Promise containing certificate
     */
    public addCertificate(options: CertificateRequest): Promise<Certificate>;
    /**
     * Adds a certificate
     * @param options Certificate request
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public addCertificate(options: CertificateRequest, callback: CallbackFn<Certificate>): void;
    public addCertificate(options: DeveloperCertificateRequest | CertificateRequest, callback?: CallbackFn<Certificate>): Promise<Certificate> {
        return asyncStyle(done => {

            function isCert(cert: DeveloperCertificateRequest | CertificateRequest): cert is CertificateRequest {
                return (<CertificateRequest>cert).type !== undefined;
            }

            if (isCert(options)) {
                this._endpoints.admin.addCertificate(Certificate.reverseIamMap(options), (error, data) => {
                    if (error) return done(error);
                    this.extendCertificate(data, done);
                });                
            } else {
                this._endpoints.developer.v3DeveloperCertificatesPost("", Certificate.reverseCaMap(options), (error, caData) => {
                    if (error) return done(error);

                    this._endpoints.admin.getCertificate(caData.id, (error, data) => {
                        if (error) return done(error);
    
                        let certificate = Certificate.map(data, this);
                        Certificate.mapDeveloperExtension(certificate, caData);

                        done(null, certificate);
                    });                    
                });
            }
        }, callback);
    }

    /**
     * Updates a certificate
     * @param options.id The certificate ID
     * @param options.name Certificate name
     * @param options.description Certificate description
     * @param options.type Certificate type
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @returns Promise containing certificate
     */
    public updateCertificate(options: { id: string, name: string, description: string, type: CertificateTypeEnum, certificateData: string, signature: string }): Promise<Certificate>;
    /**
     * Updates a certificate
     * @param options.id The certificate ID
     * @param options.name Certificate name
     * @param options.description Certificate description
     * @param options.type Certificate type
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public updateCertificate(options: { id: string, name: string, description: string, type: CertificateTypeEnum, certificateData: string, signature: string }, callback: (err: any, data?: Certificate) => any);
    public updateCertificate(options: { id: string, name: string, description: string, type: CertificateTypeEnum, certificateData: string, signature: string }, callback?: (err: any, data?: Certificate) => any): Promise<Certificate> {
        return asyncStyle(done => {
            this._endpoints.admin.updateCertificate(options.id, Certificate.reverseIamMap(options), (error, data) => {
                if (error) return done(error);
                this.extendCertificate(data, done);
            });
        }, callback);
    }

    /**
     * Deletes a certificate
     * @param options.id The certificate ID
     * @returns Promise containing any error
     */
    public deleteCertificate(options: { id: string }): Promise<void>;
    /**
     * Deletes a certificate
     * @param options.id The certificate ID
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteCertificate(options: { id: string }, callback: (err: any, data?: void) => any);
    public deleteCertificate(options: { id: string }, callback?: (err: any, data?: void) => any): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.admin.deleteCertificate(options.id, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }
}
