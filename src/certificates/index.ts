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
import { TrustedCertificateResp as iamCertificate } from "../_api/iam";
import { Endpoints } from "./endpoints";
import { AddDeveloperCertificateObject, AddCertificateObject, UpdateCertificateObject } from "./types";
import { Certificate } from "./models/certificate";
import { CertificateAdapter } from "./models/certificateAdapter";

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

        let certificate:Certificate = null;

        switch (certificate.type) {
            case "developer":
                this._endpoints.developer.v3DeveloperCertificatesIdGet(certificate.id, "", (error, data) => {
                    if (error) return done(error);
                    certificate = CertificateAdapter.mapDeveloperCertificate(iamCert, this, data);
                });
                break;

            case "bootstrap":
                this._endpoints.server.v3ServerCredentialsBootstrapGet("", (error, data) => {
                    if (error) return done(error);
                    certificate = CertificateAdapter.mapServerCertificate(iamCert, this, data);
                });
                break;

            case "lwm2m":
                this._endpoints.server.v3ServerCredentialsLwm2mGet("", (error, data) => {
                    if (error) return done(error);
                    certificate = CertificateAdapter.mapServerCertificate(iamCert, this, data);
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
    public listCertificates(options?: ListOptions, callback?: CallbackFn<ListResponse<Certificate>>);
    public listCertificates(options?: ListOptions, callback?: CallbackFn<ListResponse<Certificate>>): Promise<ListResponse<Certificate>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        let { limit, after, order, include, filter } = options as ListOptions;
        let type = filter ? filter["type"] : "developer";
        let serviceEq = type === "developer" ? "bootstrap" : type;
        let executionMode = type === "developer" ? 1 : 0;

        return asyncStyle(done => {
            this._endpoints.admin.getAllCertificates(limit, after, order, encodeInclude(include), serviceEq, 0, executionMode, (error, data) => {
                if (error) return done(error);

                var certificates = data.data.map(certificate => {
                    return CertificateAdapter.mapCertificate(certificate, this);
                });
                done(null, mapListResponse(data, certificates));
            });
        }, callback);
    }

    /**
     * Get details of a certificate
     * @param id The certificate ID
     * @returns Promise containing the certificate
     */
    public getCertificate(id: string): Promise<Certificate>;
    /**
     * Get details of a certificate
     * @param id The certificate ID
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public getCertificate(id: string, callback: CallbackFn<Certificate>);
    public getCertificate(id: string, callback?: (err: any, data?: Certificate) => any): Promise<Certificate> {
        return asyncStyle(done => {
            this._endpoints.admin.getCertificate(id, (error, data) => {
                if (error) return done(error);
                this.extendCertificate(data, done);
            });
        }, callback);
    }

    /**
     * Adds a generated developer certificate
     * @param certificate Certificate request
     * @returns Promise containing certificate
     */
    public addCertificate(certificate: AddDeveloperCertificateObject): Promise<Certificate>;
    /**
     * Adds a generated developer certificate
     * @param certificate Certificate request
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public addCertificate(certificate: AddDeveloperCertificateObject, callback: CallbackFn<Certificate>): void;
    /**
     * Adds a certificate
     * @param certificate Certificate request
     * @returns Promise containing certificate
     */
    public addCertificate(certificate: AddCertificateObject): Promise<Certificate>;
    /**
     * Adds a certificate
     * @param certificate Certificate request
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public addCertificate(certificate: AddCertificateObject, callback: CallbackFn<Certificate>): void;
    public addCertificate(certificate: AddDeveloperCertificateObject | AddCertificateObject, callback?: CallbackFn<Certificate>): Promise<Certificate> {
        return asyncStyle(done => {

            function isCert(cert: AddDeveloperCertificateObject | AddCertificateObject): cert is AddCertificateObject {
                return (<AddCertificateObject>cert).type !== undefined;
            }

            if (isCert(certificate)) {
                this._endpoints.admin.addCertificate(CertificateAdapter.reverseMap(certificate), (error, data) => {
                    if (error) return done(error);
                    this.extendCertificate(data, done);
                });                
            } else {
                this._endpoints.developer.v3DeveloperCertificatesPost("", CertificateAdapter.reverseDeveloperMap(certificate), (error, caData) => {
                    if (error) return done(error);

                    this._endpoints.admin.getCertificate(caData.id, (error, data) => {
                        if (error) return done(error);
    
                        let certificate = CertificateAdapter.mapDeveloperCertificate(data, this, caData);
                        done(null, certificate);
                    });                    
                });
            }
        }, callback);
    }

    /**
     * Updates a certificate
     * @param certificate Certificate data
     * @returns Promise containing certificate
     */
    public updateCertificate(certificate: UpdateCertificateObject): Promise<Certificate>;
    /**
     * Updates a certificate
     * @param certificate Certificate data
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public updateCertificate(certificate: UpdateCertificateObject, callback: CallbackFn<Certificate>);
    public updateCertificate(certificate: UpdateCertificateObject, callback?: CallbackFn<Certificate>): Promise<Certificate> {
        return asyncStyle(done => {
            this._endpoints.admin.updateCertificate(certificate.id, CertificateAdapter.reverseMap(certificate), (error, data) => {
                if (error) return done(error);
                this.extendCertificate(data, done);
            });
        }, callback);
    }

    /**
     * Deletes a certificate
     * @param id The certificate ID
     * @returns Promise containing any error
     */
    public deleteCertificate(id: string): Promise<void>;
    /**
     * Deletes a certificate
     * @param id The certificate ID
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteCertificate(id: string, callback: CallbackFn<void>);
    public deleteCertificate(id: string, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.admin.deleteCertificate(id, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }
}
