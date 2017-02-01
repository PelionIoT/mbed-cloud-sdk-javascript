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
import { DeveloperCertificateType } from "./types";
import {
    Body as apiDeveloperCertificateRequest,
    DeveloperCertificate as apiDeveloperCertificate
} from "../_api/developer_certificate";
import { DevelopmentApi } from "./index";

/*
 * Development Certificate
 */
export class DeveloperCertificate {

    constructor(options: DeveloperCertificateType, private _api: DevelopmentApi) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiDeveloperCertificate, api: DevelopmentApi): DeveloperCertificate {
        let type:DeveloperCertificateType = {
            createdAt:    from.created_at,
            id:           from.id,
            publicKey:    from.pub_key
        };

        return new DeveloperCertificate(type, api);
    }

    static reverseMap(from: any): apiDeveloperCertificateRequest {
        return {
            pub_key: from.publicKey
        };
    }

    /**
     * Deletes the developer certificate
     * @returns empty Promise
     */
    public delete(): Promise<void>;
    /**
     * Deletes the developer certificate
     * @param callback A function that is passed the return arguments (error, void)
     */
    public delete(callback?: (err: any, data?: void) => any);
    public delete(callback?: (err: any, data?: void) => any): Promise<void> {
        return pg(done => {
            this._api.deleteCertificate(done);
        }, callback);
    }
}
export interface DeveloperCertificate extends DeveloperCertificateType {}
