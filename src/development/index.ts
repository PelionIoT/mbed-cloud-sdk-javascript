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
import { DefaultApi, DefaultApiApiKeys } from "../_api/developer_certificate";

/**
* Root Account object
*/
export class Development {

    private _api: DefaultApi;

    /**
    * @param options Options object
    */
    constructor(options: Development.DevelopmentOptions) {
        this._api = new DefaultApi();
//        if (options.host) this.client.basePath = options.host;
        if (options.accessKey) this._api.setApiKey(DefaultApiApiKeys.Bearer, "Bearer " + options.accessKey);
    }

    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    public postCertificate(options: Development.CertificateOptions, callback?: (err: any, data?: any) => void): Promise<any> {
        let { authorization, body } = options;
        return pg(done => {
            this._api.v3DeveloperCertificatePost(authorization, body, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    public getCertificate(options?: Development.CertificateOptions, callback?: (err: any, data?: any) => void): Promise<any> {
        let { authorization } = options;
        return pg(done => {
            this._api.v3DeveloperCertificateGet(authorization, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    public deleteCertificate(options: Development.CertificateOptions, callback?: (err: any, data?: void) => void): Promise<void> {
        let { authorization } = options;
        return pg(done => {
            this._api.v3DeveloperCertificateDelete(authorization, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }
}

export namespace Development {
    export interface DevelopmentOptions {
        /**
        * Access Key for your mbed Device Connector account
        */
        accessKey: string;
        /**
        * URL for mbed Device Connector API
        */
        host?: string;
    }

    export interface CertificateBody {
        /**
        * The developer certificate public key in PEM format (NIST P-256 curve).
        */
        'pubKey': string;
    }

    export interface CertificateOptions {
        authorization: string;
        body?: CertificateBody;
    }
}
