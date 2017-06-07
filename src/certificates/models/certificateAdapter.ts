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

import { CertificatesApi } from "../certificatesApi";
import { Certificate } from "./certificate";
import { AddCertificateObject, AddDeveloperCertificateObject } from "../types";
import {
    TrustedCertificateReq as iamCertificateRequest,
    TrustedCertificateResp as iamCertificate
} from "../../_api/iam";
import {
    DeveloperCertificateRequestData as caCertificateRequest,
    ServerCredentialsResponseData as serverResponse,
    DeveloperCertificateResponseData as developerResponse
} from "../../_api/connector_ca";

/**
 * Certificate Adapter
 */
export class CertificateAdapter {

    private static map(from: iamCertificate): Partial<Certificate> {
        return {
            id                 : from.id,
            name               : from.name,
            description        : from.description,
            type               : from.device_execution_mode === 1 ? "developer" : from.service,
            status             : from.status,
            accountId          : from.account_id,
            certificateData    : from.certificate,
            createdAt          : from.created_at,
            issuer             : from.issuer,
            subject            : from.subject,
            validity           : from.validity,
            ownerId            : from.owner_id
        };
    }

    static mapCertificate(from: iamCertificate, api: CertificatesApi): Certificate {
        return new Certificate(CertificateAdapter.map(from), api);
    }

    static mapServerCertificate(from: iamCertificate, api: CertificatesApi, extension: serverResponse): Certificate {
        let partial: any = CertificateAdapter.map(from);

        partial.serverUri = extension.server_uri;
        partial.serverCertificate = extension.server_certificate;

        return new Certificate(partial, api);
    }

    static mapDeveloperCertificate(from: iamCertificate, api: CertificatesApi, extension: developerResponse): Certificate {
        let partial: any = CertificateAdapter.map(from);

        partial.serverUri = extension.server_uri;
        partial.serverCertificate = extension.server_certificate;
        partial.headerFile = extension.security_file_content;
        partial.developerCertificate = extension.developer_certificate;
        partial.developerPrivateKey = extension.developer_private_key;

        return new Certificate(partial, api);
    }

    static reverseMap(from: AddCertificateObject): iamCertificateRequest {
        return {
            certificate:    from.certificateData,
            name:           from.name,
            service:        from.type === "developer" ? "bootstrap" : from.type,
            status:         from.status,
            signature:      from.signature,
            description:    from.description
        };
    }

    static reverseDeveloperMap(from: AddDeveloperCertificateObject): caCertificateRequest {
        return {
            name:           from.name,
            description:    from.description
        };
    }
}
