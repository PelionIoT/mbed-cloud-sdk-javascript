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

import pg = require("polygoat");
import { CertificateType } from "./types";
import {
    CACertificateReq as apiCertificateRequest,
    CACertificateResp as apiCertificate
} from "../_api/iam";
import { AccessApi } from "./index";

/*
 * Certificate
 */
export class Certificate {

    constructor(options: CertificateType, private _api?: AccessApi) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiCertificate, api: AccessApi): Certificate {
        let type:CertificateType = {
            accountId:    from.account_id,
            createdAt:    from.created_at,
            data:         from.cert_data,
            id:           from.id,
            issuer:       from.issuer,
            name:         from.name,
            service:      from.service,
            subject:      from.subject,
            validity:     from.validity
        };

        return new Certificate(type, api);
    }

    static reverseMap(from: any): apiCertificateRequest {
        return {
            cert_data:    from.certificateData,
            name:         from.name,
            service:      from.service,
            signature:    from.signature
        };
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
        return pg(done => {
            this._api.deleteCertificate({
                id:    this.id
            }, done);
        }, callback);
    }
}
export interface Certificate extends CertificateType {}
