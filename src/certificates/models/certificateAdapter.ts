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

import { CertificatesApi } from "..//index";
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

/*
 * Certificate Adapter
 */
export class CertificateAdapter {

    static map(from: iamCertificate, api: CertificatesApi): Certificate {
        let certificate = new Certificate(api);

        certificate.id                 = from.id;
        certificate.name               = from.name;
        certificate.description        = from.description;
        certificate.type               = from.device_execution_mode === 1 ? "developer" : from.service;
        certificate.accountId          = from.account_id;
        certificate.certificateData    = from.cert_data;
        certificate.createdAt          = from.created_at;
        certificate.issuer             = from.issuer;
        certificate.subject            = from.subject;
        certificate.validity           = from.validity;

        return certificate;
    }

    static mapExtension(base: Certificate, extension: serverResponse): Certificate {
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

    static reverseMap(from: AddCertificateObject): iamCertificateRequest {
        return {
            cert_data:      from.certificateData,
            name:           from.name,
            service:        from.type === "developer" ? "bootstrap" : from.type,
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
