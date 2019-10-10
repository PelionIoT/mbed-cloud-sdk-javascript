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
import { ListResponse } from "../common/listResponse";
import { Endpoints } from "./endpoints";
import { CertificateAdapter } from "./models/certificateAdapter";
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
    /**
     * @param options connection options
     */
    constructor(options) {
        this._endpoints = new Endpoints(options);
    }
    extendCertificate(iamCert, done) {
        if (iamCert.device_execution_mode === 1) {
            // Developer certificate
            this._endpoints.connector.getDeveloperCertificate(iamCert.id, "", (error, data) => {
                if (error) {
                    return done(error, null);
                }
                const certificate = CertificateAdapter.mapDeveloperCertificate(iamCert, this, data);
                done(null, certificate);
            });
            return;
        }
        let credentials = null;
        this._endpoints.serverCredentials.getAllServerCredentials("", (error, data) => {
            if (error) {
                return done(error, null);
            }
            if (iamCert.service === "bootstrap") {
                credentials = data.bootstrap;
            }
            if (iamCert.service === "lwm2m") {
                credentials = data.lwm2m;
            }
            const certificate = CertificateAdapter.mapServerCertificate(iamCert, this, credentials);
            done(null, certificate);
        });
    }
    listCertificates(options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, after, order, include, filter } = options;
            const type = extractFilter(filter, "type");
            const serviceEq = type === "developer" ? "bootstrap" : type;
            const executionMode = type === "developer" ? 1 : null;
            const typeNeq = extractFilter(filter, "typeNeq");
            const executionModeNeq = typeNeq === "developer" ? 0 : 1;
            this._endpoints.accountDeveloper.getAllCertificates(limit, after, order, encodeInclude(include), extractFilter(filter, "name"), serviceEq, extractFilter(filter, "expires"), executionMode, executionModeNeq, extractFilter(filter, "ownerId"), extractFilter(filter, "enrollmentMode"), extractFilter(filter, "issuer"), extractFilter(filter, "subject"), resultsFn);
        }, (data, done) => {
            let certificates;
            if (data.data && data.data.length) {
                certificates = data.data.map(certificate => {
                    return CertificateAdapter.mapCertificate(certificate, this);
                });
            }
            done(null, new ListResponse(data, certificates));
        }, callback);
    }
    getCertificate(certificateId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.accountDeveloper.getCertificate(certificateId, resultsFn);
        }, (data, done) => {
            this.extendCertificate(data, done);
        }, callback);
    }
    addDeveloperCertificate(certificate, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.connector.createDeveloperCertificate("", CertificateAdapter.reverseDeveloperMap(certificate), resultsFn);
        }, (data, done) => {
            this._endpoints.accountDeveloper.getCertificate(data.id, (error, certData) => {
                if (error) {
                    return done(error, null);
                }
                const cert = CertificateAdapter.mapDeveloperCertificate(certData, this, data);
                done(null, cert);
            });
        }, callback);
    }
    addCertificate(certificate, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.admin.addCertificate(CertificateAdapter.reverseMap(certificate), resultsFn);
        }, (data, done) => {
            this.extendCertificate(data, done);
        }, callback);
    }
    updateCertificate(certificate, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.accountDeveloper.updateCertificate(certificate.id, CertificateAdapter.reverseUpdateMap(certificate), resultsFn);
        }, (data, done) => {
            this.extendCertificate(data, done);
        }, callback);
    }
    deleteCertificate(certificateId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.accountDeveloper.deleteCertificate(certificateId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    getLastApiMetadata(callback) {
        return asyncStyle(done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
//# sourceMappingURL=certificatesApi.js.map