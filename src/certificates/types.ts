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

export type CertificateTypeEnum = "developer" | "lwm2m" | "bootstrap";

/**
 * This object represents a developer certificate
 */
export interface AddDeveloperCertificateObject {
    /**
     * Certificate name
     */
    name: string,
    /**
     * Certificate description
     */
    description?: string;
}

/**
 * This object represents a certificate
 */
export interface CertificateObject extends AddDeveloperCertificateObject {
    /**
     * Certificate type
     */
    type: CertificateTypeEnum;
    /**
     * X509.v3 CA certificate in PEM or base64 encoded DER format
     */
    certificateData: string;
}

/**
 * This object represents a certificate
 */
export interface AddCertificateObject extends CertificateObject {
    /**
     * Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     */
    signature: string;
}

/**
 * This object represents a certificate
 */
export interface UpdateCertificateObject extends AddCertificateObject {
    /**
     * Certificate ID
     */
    id: string;
}
