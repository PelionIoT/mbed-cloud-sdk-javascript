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

import { asyncStyle, apiWrapper, encodeInclude, extractFilter } from "../common/functions";
import { ConnectionOptions, CallbackFn } from "../common/interfaces";
import { ListResponse } from "../common/listResponse";
import { TrustedCertificateResp as iamCertificate } from "../_api/iam";
import { Endpoints } from "./endpoints";
import { AddDeveloperCertificateObject, AddCertificateObject, UpdateCertificateObject, CertificateListOptions } from "./types";
import { Certificate } from "./models/certificate";
import { CertificateAdapter } from "./models/certificateAdapter";
import { ApiMetadata } from "../common/apiMetadata";

/**
 * ## Certificates API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbedCloudSDK = require("mbed-cloud-sdk");
 *
 * var certificates = new mbedCloudSDK.CertificatesApi({
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
 *     var certificates = new mbedCloudSDK.CertificatesApi({
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
        var dataFn = null;
        if (iamCert.service === "bootstrap") dataFn = this._endpoints.server.v3ServerCredentialsBootstrapGet;
        if (iamCert.service === "lwm2m") dataFn = this._endpoints.server.v3ServerCredentialsLwm2mGet;

        if (dataFn) {
            dataFn.call(this._endpoints.server, "", (error, data) => {
                if (error) return done(error);

                var certificate = CertificateAdapter.mapServerCertificate(iamCert, this, data);
                done(null, certificate);
            });
        }
    }

    /**
     * List certificates
     *
     * Example:
     * ```JavaScript
     * certificates.listCertificates({
     *     limit: 5,
     *     order: 'ASC',
     *     filter: {
     *         type: { $eq: 'bootstrap' }
     *     }
     * })
     * .then(certificates => {
     *     // Utilize certificates here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options filter options
     * @returns Promise of listResponse
     */
    public listCertificates(options?: CertificateListOptions): Promise<ListResponse<Certificate>>;
    /**
     * List certificates
     *
     * Example:
     * ```JavaScript
     * certificates.listCertificates({
     *     limit: 5,
     *     order: 'ASC',
     *     filter: {
     *         type: { $eq: 'bootstrap' }
     *     }
     * }, function(error, certificates) {
     *     if (error) throw error;
     *     // Utilize certificates here
     * });
     * ```
     *
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public listCertificates(options?: CertificateListOptions, callback?: CallbackFn<ListResponse<Certificate>>): void;
    public listCertificates(options?: CertificateListOptions, callback?: CallbackFn<ListResponse<Certificate>>): Promise<ListResponse<Certificate>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return apiWrapper(resultsFn => {
            let { limit, after, order, include, filter } = options as CertificateListOptions;
            let type = extractFilter(filter, "type");
            let serviceEq = type === "developer" ? "bootstrap" : type;
            let executionMode = type === "developer" ? 1 : null;

            this._endpoints.accountDeveloper.getAllCertificates(limit, after, order, encodeInclude(include), serviceEq, extractFilter(filter, "expires"), executionMode, extractFilter(filter, "ownerId"), resultsFn);
        }, (data, done) => {
            let certificates: Certificate[];
            if (data.data && data.data.length) {
                certificates = data.data.map(certificate => {
                    return CertificateAdapter.mapCertificate(certificate, this);
                });
            }

            done(null, new ListResponse(data, certificates));
        }, callback);
    }

    /**
     * Get details of a certificate
     *
     * Example:
     * ```JavaScript
     * certificates.getCertificate('015c64f76a7b02420a01230a00000000')
     * .then(certificate => {
     *     // Utilize certificate here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param certificateId The certificate ID
     * @returns Promise containing the certificate
     */
    public getCertificate(certificateId: string): Promise<Certificate>;
    /**
     * Get details of a certificate
     *
     * Example:
     * ```JavaScript
     * certificates.getCertificate('015c64f76a7b02420a01230a00000000', function(error, certificate) {
     *     if (error) throw error;
     *     // Utilize certificate here
     * });
     * ```
     *
     * @param certificateId The certificate ID
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public getCertificate(certificateId: string, callback: CallbackFn<Certificate>): void;
    public getCertificate(certificateId: string, callback?: (err: any, data?: Certificate) => any): Promise<Certificate> {
        return apiWrapper(resultsFn => {
            this._endpoints.accountDeveloper.getCertificate(certificateId, resultsFn);
        }, (data, done) => {
            this.extendCertificate(data, done);
        }, callback);
    }

    /**
     * Adds a generated developer certificate
     *
     * Example:
     * ```JavaScript
     * certificates.addCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert',
     *     type: 'developer'
     * })
     * .then(certificate => {
     *     // Utilize certificate here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param certificate Certificate request
     * @returns Promise containing certificate
     */
    public addCertificate(certificate: AddDeveloperCertificateObject): Promise<Certificate>;
    /**
     * Adds a generated developer certificate
     *
     * Example:
     * ```JavaScript
     * certificates.addCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert',
     *     type: 'developer'
     * }, function(error, certificate) {
     *     if (error) throw error;
     *     // Utilize certificate here
     * });
     * ```
     *
     * @param certificate Certificate request
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public addCertificate(certificate: AddDeveloperCertificateObject, callback: CallbackFn<Certificate>): void;
    /**
     * Adds a certificate
     *
     * Example:
     * ```JavaScript
     * // Signature is a Base64 encoded signature of the account ID hashed with SHA256
     * certificates.addCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert',
     *     type: 'developer',
     *     signature: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
     *     certificateData: '-----BEGIN CERTIFICATE-----\nMIICFzCCAbygAwIBAgIQX ... EPSDKEF\n-----END CERTIFICATE-----'
     * })
     * .then(certificate => {
     *     // Utilize certificate here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param certificate Certificate request
     * @returns Promise containing certificate
     */
    public addCertificate(certificate: AddCertificateObject): Promise<Certificate>;
    /**
     * Adds a certificate
     *
     * Example:
     * ```JavaScript
     * // Signature is a Base64 encoded signature of the account ID hashed with SHA256
     * certificates.addCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert',
     *     type: 'developer',
     *     signature: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
     *     certificateData: '-----BEGIN CERTIFICATE-----\nMIICFzCCAbygAwIBAgIQX ... EPSDKEF\n-----END CERTIFICATE-----'
     * }, function(error, certificate) {
     *     if (error) throw error;
     *     // Utilize certificate here
     * });
     * ```
     *
     * @param certificate Certificate request
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public addCertificate(certificate: AddCertificateObject, callback: CallbackFn<Certificate>): void;
    public addCertificate(certificate: AddDeveloperCertificateObject | AddCertificateObject, callback?: CallbackFn<Certificate>): Promise<Certificate> {

        function isCert(cert: AddDeveloperCertificateObject | AddCertificateObject): cert is AddCertificateObject {
            return (<AddCertificateObject>cert).type !== undefined && (<AddCertificateObject>cert).type !== "developer";
        }

        return apiWrapper(resultsFn => {
            if (isCert(certificate)) this._endpoints.admin.addCertificate(CertificateAdapter.reverseMap(certificate), resultsFn);
            else this._endpoints.certDeveloper.v3DeveloperCertificatesPost("", CertificateAdapter.reverseDeveloperMap(certificate), resultsFn);
        }, (data, done) => {
            if (isCert(certificate)) this.extendCertificate(data, done);
            else {
                this._endpoints.accountDeveloper.getCertificate(data.id, (error, certData) => {
                    if (error) return done(error, null);

                    let certificate = CertificateAdapter.mapDeveloperCertificate(certData, this, data);
                    done(null, certificate);
                });
            }
        }, callback);
    }

    /**
     * Updates a certificate
     *
     * Example:
     * ```JavaScript
     * // Signature is a Base64 encoded signature of the account ID hashed with SHA256
     * certificates.updateCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert',
     *     type: 'developer',
     *     signature: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
     *     certificateData: '-----BEGIN CERTIFICATE-----\nMIICFzCCAbygAwIBAgIQX ... EPSDKEF\n-----END CERTIFICATE-----'
     * })
     * .then(certificate => {
     *     // Utilize certificate here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param certificate Certificate data
     * @returns Promise containing certificate
     */
    public updateCertificate(certificate: UpdateCertificateObject): Promise<Certificate>;
    /**
     * Updates a certificate
     *
     * Example:
     * ```JavaScript
     * // Signature is a Base64 encoded signature of the account ID hashed with SHA256
     * certificates.updateCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert',
     *     type: 'developer',
     *     signature: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
     *     certificateData: '-----BEGIN CERTIFICATE-----\nMIICFzCCAbygAwIBAgIQX ... EPSDKEF\n-----END CERTIFICATE-----'
     * }, function(error, certificate) {
     *     if (error) throw error;
     *     // Utilize certificate here
     * });
     * ```
     *
     * @param certificate Certificate data
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public updateCertificate(certificate: UpdateCertificateObject, callback: CallbackFn<Certificate>): void;
    public updateCertificate(certificate: UpdateCertificateObject, callback?: CallbackFn<Certificate>): Promise<Certificate> {
        return apiWrapper(resultsFn => {
            this._endpoints.accountDeveloper.updateCertificate(certificate.id, CertificateAdapter.reverseMap(certificate), resultsFn);
        }, (data, done) => {
            this.extendCertificate(data, done);
        }, callback);
    }

    /**
     * Deletes a certificate
     *
     * Example:
     * ```JavaScript
     * certificates.deleteCertificate('015c64f76a7b02420a01230a00000000')
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param certificateId The certificate ID
     * @returns Promise containing any error
     */
    public deleteCertificate(certificateId: string): Promise<void>;
    /**
     * Deletes a certificate
     *
     * Example:
     * ```JavaScript
     * certificates.deleteCertificate('015c64f76a7b02420a01230a00000000', function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param certificateId The certificate ID
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteCertificate(certificateId: string, callback: CallbackFn<void>): void;
    public deleteCertificate(certificateId: string, callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper(resultsFn => {
            this._endpoints.accountDeveloper.deleteCertificate(certificateId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * Get meta data for the last mbed Cloud API call
     * @returns Promise of meta data
     */
    public getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the last mbed Cloud API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    public getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
    public getLastApiMetadata(callback?: CallbackFn<ApiMetadata>): Promise<ApiMetadata> {
        return asyncStyle(done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
