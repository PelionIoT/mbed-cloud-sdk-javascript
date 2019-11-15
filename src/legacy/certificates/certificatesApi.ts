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

import { asyncStyle, apiWrapper, encodeInclude, extractFilter } from "../common/functions";
import { CallbackFn } from "../common/interfaces";
import { ListResponse } from "../common/listResponse";
import { TrustedCertificateResp as iamCertificate } from "../_api/iam";
import { Endpoints } from "./endpoints";
import { AddDeveloperCertificateObject, AddCertificateObject, UpdateCertificateObject, CertificateListOptions } from "./types";
import { Certificate } from "./models/certificate";
import { CertificateAdapter } from "./models/certificateAdapter";
import { ApiMetadata } from "../common/apiMetadata";
import { ConfigOptions } from "../../common/config";

/**
 * ## Certificates API
 * The API can be initalized with a .env file in the working directory with the following values
 *
 * MBED_CLOUD_SDK_API_KEY=<Pelion DM API Key>
 *
 * and optionally
 *
 * MBED_CLOUD_SDK_HOST=<your host> (defaults to https://api.us-east-1.mbedcloud.com)
 *
 * OR
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var PelionDMSDK = require("mbed-cloud-sdk");
 *
 * var certificates = new PelionDMSDK.CertificatesApi({
 *     apiKey: "<Pelion DM API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<pelion-dm-sdk>/bundles/certificates.min.js"></script>
 *
 * <script>
 *     var certificates = new MbedCloudSDK.CertificatesApi({
 *         apiKey: "<Pelion DM API Key>"
 *     });
 * </script>
 * ```
 */
export class CertificatesApi {

    private _endpoints: Endpoints;

    /**
     * @param options connection options
     */
    constructor(options?: ConfigOptions) {
        this._endpoints = new Endpoints(options);
    }

    private extendCertificate(iamCert: iamCertificate, done: (error: any, certificate: any) => any) {
        if (iamCert.device_execution_mode === 1) {
            // Developer certificate
            this._endpoints.connector.getDeveloperCertificate(iamCert.id, "", (error, data) => {
                if (error) { return done(error, null); }

                const certificate = CertificateAdapter.mapDeveloperCertificate(iamCert, this, data);
                done(null, certificate);
            });

            return;
        }

        let credentials = null;
        this._endpoints.serverCredentials.getAllServerCredentials("", (error, data) => {
            if (error) { return done(error, null); }

            if (iamCert.service === "bootstrap") { credentials = data.bootstrap; }
            if (iamCert.service === "lwm2m") { credentials = data.lwm2m; }

            const certificate = CertificateAdapter.mapServerCertificate(iamCert, this, credentials);
            done(null, certificate);
        });
    }

    /**
     * List certificates
     *
     * Currently returns partially populated certificates. To obtain the full
     * certificate object use [[getCertificate]].
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
     * Currently returns partially populated certificates. To obtain the full
     * certificate object use [[getCertificate]].
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

        return apiWrapper( resultsFn => {
            const { limit, after, order, include, filter } = options as CertificateListOptions;
            const type = extractFilter(filter, "type");
            const serviceEq = type === "developer" ? "bootstrap" : type;
            const executionMode = type === "developer" ? 1 : null;
            const typeNeq = extractFilter(filter, "typeNeq");
            const executionModeNeq = typeNeq === "developer" ? 0 : 1;

            this._endpoints.accountDeveloper.getAllCertificates(limit, after, order, encodeInclude(include), extractFilter(filter, "name"), serviceEq, extractFilter(filter, "expires"), executionMode, executionModeNeq, extractFilter(filter, "ownerId"), extractFilter(filter, "enrollmentMode"), extractFilter(filter, "issuer"), extractFilter(filter, "subject"), resultsFn);
        }, (data, done) => {
            let certificates: Array<Certificate>;
            if (data.data && data.data.length) {
                certificates = data.data.map( certificate => {
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
        return apiWrapper( resultsFn => {
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
     * certificates.addDeveloperCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert'
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
    public addDeveloperCertificate(certificate: AddDeveloperCertificateObject): Promise<Certificate>;
    /**
     * Adds a generated developer certificate
     *
     * Example:
     * ```JavaScript
     * certificates.addDeveloperCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert'
     * }, function(error, certificate) {
     *     if (error) throw error;
     *     // Utilize certificate here
     * });
     * ```
     *
     * @param certificate Certificate request
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    public addDeveloperCertificate(certificate: AddDeveloperCertificateObject, callback: CallbackFn<Certificate>): void;
    public addDeveloperCertificate(certificate: AddDeveloperCertificateObject, callback?: CallbackFn<Certificate>): Promise<Certificate> {
        return apiWrapper( resultsFn => {
            this._endpoints.connector.createDeveloperCertificate("", CertificateAdapter.reverseDeveloperMap(certificate), resultsFn);
        }, (data, done) => {
            this._endpoints.accountDeveloper.getCertificate(data.id, (error, certData) => {
                if (error) { return done(error, null); }

                const cert = CertificateAdapter.mapDeveloperCertificate(certData, this, data);
                done(null, cert);
            });
        }, callback);
    }

    /**
     * Adds a certificate
     *
     * Example:
     * ```JavaScript
     * // Signature is a Base64 encoded signature of the account ID hashed with SHA256
     * certificates.addCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert',
     *     type: 'bootstrap',
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
     *     type: 'bootstrap',
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
    public addCertificate(certificate: AddCertificateObject, callback?: CallbackFn<Certificate>): Promise<Certificate> {
        return apiWrapper( resultsFn => {
            this._endpoints.admin.addCertificate(CertificateAdapter.reverseMap(certificate), resultsFn);
        }, (data, done) => {
            this.extendCertificate(data, done);
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
     *     type: 'bootstrap',
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
     *     type: 'bootstrap',
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
        return apiWrapper( resultsFn => {
            this._endpoints.accountDeveloper.updateCertificate(certificate.id, CertificateAdapter.reverseUpdateMap(certificate), resultsFn);
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
        return apiWrapper( resultsFn => {
            this._endpoints.accountDeveloper.deleteCertificate(certificateId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * Get meta data for the last Pelion Device Management API call
     * @returns Promise of meta data
     */
    public getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the last Pelion Device Management API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    public getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
    public getLastApiMetadata(callback?: CallbackFn<ApiMetadata>): Promise<ApiMetadata> {
        return asyncStyle( done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
