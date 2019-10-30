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
import { Certificate } from "./certificate";
/**
 * Certificate Adapter
 */
export class CertificateAdapter {
    static map(from) {
        return {
            id: from.id,
            name: from.name,
            description: from.description,
            type: from.device_execution_mode === 1 ? "developer" : from.service,
            status: from.status,
            accountId: from.account_id,
            certificateData: from.certificate,
            createdAt: from.created_at,
            issuer: from.issuer,
            subject: from.subject,
            validity: from.validity,
            ownerId: from.owner_id,
            enrollmentMode: from.enrollment_mode || false,
            serverUri: null,
            serverCertificate: null,
            headerFile: null,
            developerCertificate: null,
            developerPrivateKey: null,
        };
    }
    static mapCertificate(from, api) {
        return new Certificate(CertificateAdapter.map(from), api);
    }
    static mapServerCertificate(from, api, extension) {
        const partial = CertificateAdapter.map(from);
        partial.serverUri = extension.url;
        partial.serverCertificate = extension.certificate;
        return new Certificate(partial, api);
    }
    static mapDeveloperCertificate(from, api, extension) {
        const partial = CertificateAdapter.map(from);
        partial.headerFile = extension.security_file_content;
        partial.developerCertificate = extension.developer_certificate;
        partial.developerPrivateKey = extension.developer_private_key;
        return new Certificate(partial, api);
    }
    static reverseMap(from) {
        return {
            certificate: from.certificateData,
            name: from.name,
            service: from.type === "developer" ? "bootstrap" : from.type,
            status: from.status,
            signature: from.signature,
            enrollment_mode: from.enrollmentMode,
            description: from.description,
        };
    }
    static reverseUpdateMap(from) {
        return {
            certificate: from.certificateData,
            name: from.name,
            service: from.type === "developer" ? "bootstrap" : from.type,
            status: from.status,
            signature: from.signature,
            enrollment_mode: from.enrollmentMode,
            description: from.description,
        };
    }
    static reverseDeveloperMap(from) {
        return {
            name: from.name,
            description: from.description,
        };
    }
}
//# sourceMappingURL=certificateAdapter.js.map