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

const DEFAULT_HOST = "http://api.mbedcloud.com";

import superagent = require('superagent');

export class ApiBase {

    private apiKey = "";

    constructor(apiKey: string, private host: string = DEFAULT_HOST) {
        if (apiKey.substr(0, 6).toLowerCase() !== "bearer") apiKey = `Bearer ${apiKey}`;
        this.apiKey = apiKey;
    }

    protected request(options: { url: string, method: string, headers: {}, query: {}, useFormData: boolean, formParams: {}, json?: boolean, body?: any }, callback?:Function): superagent.SuperAgentRequest {

        // Normalize slashes in url
        let url = options.url.replace(/([:])?\/+/g, function($0, $1) {
            return $1 ? $0: "/";
        });

        let request = superagent(options.method, this.host + url);

        // set query parameters
        request.query(ApiBase.normalizeParams(options.query));

        // set header parameters
        options.headers["Authorization"] = this.apiKey;
        request.set(ApiBase.normalizeParams(options.headers));

        // set request timeout
        request.timeout(60000);

        if (options.json) {
            request.type("application/json");
            request.accept("application/json");
        }

        if (Object.keys(options.formParams).length > 0) {
            if (options.useFormData) {
                request.type("multipart/form-data");
                let formParams = ApiBase.normalizeParams(options.formParams);
                for (var key in formParams) {
                    if (formParams.hasOwnProperty(key)) {
                        if (ApiBase.isFileParam(formParams[key])) {
                            // file field
                            request.attach(key, formParams[key]);
                        } else {
                            request.field(key, formParams[key]);
                        }
                    }
                }
            } else {
                request.type("application/x-www-form-urlencoded");
                request.send(ApiBase.normalizeParams(options.formParams));
            }
        } else if (options.body) {
            //console.log(options.body);
            request.send(options.body);
        }

        request.end(function(error, response) {
            if (callback) {
                var data = null;

                if (response && !error) {
                    data = response.body || response.text;
                }

                callback(error, data, response);
            }
        });

        return request;
    }

    /**
    * Normalizes parameter values:
    * <ul>
    * <li>remove nils</li>
    * <li>keep files and arrays</li>
    * <li>format to string with `paramToString` for other cases</li>
    * </ul>
    * @param {Object.<String, Object>} params The parameters as object properties.
    * @returns {Object.<String, Object>} normalized parameters.
    */
    private static normalizeParams(params:any) {
        var newParams = {};

        for (var key in params) {
            if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
                var value = params[key];
                if (this.isFileParam(value) || Array.isArray(value)) {
                    newParams[key] = value;
                } else {
                    newParams[key] = ApiBase.paramToString(value);
                }
            }
        }

        return newParams;
    }

    /**
    * Checks whether the given parameter value represents file-like content.
    * @param param The parameter to check.
    * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
    */
    private static isFileParam(param:any) {
        // fs.ReadStream in Node.js (but not in runtime like browserify)
        if (typeof window === 'undefined' &&
            typeof require === 'function' &&
            require('fs') &&
            param instanceof require('fs').ReadStream) {
            return true;
        }

        // Buffer in Node.js
        if (typeof Buffer === 'function' && param instanceof Buffer) {
            return true;
        }

        // Blob in browser
        if (typeof Blob === 'function' && param instanceof Blob) {
            return true;
        }

        // File in browser (it seems File object is also instance of Blob, but keep this for safe)
        if (typeof File === 'function' && param instanceof File) {
            return true;
        }

        return false;
    }

    /**
    * Returns a string representation for an actual parameter.
    * @param param The actual parameter.
    * @returns {String} The string representation of <code>param</code>.
    */
    private static paramToString(param:any) {
        if (param == undefined || param == null) {
            return '';
        }

        if (param instanceof Date) {
            return param.toJSON();
        }

        return param.toString();
    }
}
