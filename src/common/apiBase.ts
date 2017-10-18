/*
* Mbed Cloud JavaScript SDK
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

import superagent = require("superagent");
import { SDKError } from "./sdkError";

const DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
const MIME_REGEX = /^application\/json(;.*)?$/i;

export class ApiBase {

    private apiKey = "";

    constructor(apiKey?: string, private host: string = "https://api.us-east-1.mbedcloud.com", private responseHandler: (sdkError: SDKError, response: superagent.Response) => any = null) {
        if (apiKey && apiKey.substr(0, 6).toLowerCase() !== "bearer") apiKey = `Bearer ${apiKey}`;
        this.apiKey = apiKey;
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
    private static normalizeParams(params: any) {
        const newParams = {};

        for (const key in params) {
            if (params.hasOwnProperty(key) && params[key] !== undefined && params[key] !== null) {
                const value = params[key];
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
    private static isFileParam(param: any) {
        // fs.ReadStream in Node.js (but not in runtime like browserify)
        if (typeof window === "undefined" &&
            typeof require === "function" &&
            require("fs") &&
            param instanceof require("fs").ReadStream) {
            return true;
        }

        // Buffer in Node.js
        if (typeof Buffer === "function" && param instanceof Buffer) {
            return true;
        }

        // Blob in browser
        if (typeof Blob === "function" && param instanceof Blob) {
            return true;
        }

        // File in browser (it seems File object is also instance of Blob, but keep this for safe)
        if (typeof File === "function" && param instanceof File) {
            return true;
        }

        return false;
    }

    /**
     * Returns a string representation for an actual parameter.
     * @param param The actual parameter.
     * @returns {String} The string representation of <code>param</code>.
     */
    private static paramToString(param: any) {
        if (param === undefined || param === null) {
            return "";
        }

        if (param instanceof Date) {
            return param.toJSON();
        }

        return param.toString();
    }

    private static chooseType(types: Array<string>, defaultType: string = null): string {
        // No type
        if (!types.length) return defaultType;

        // Default to first entry or default
        let result = types[0] || defaultType;

        // Find first preferred type
        types.some(type => {
            if (MIME_REGEX.test(type)) {
                result = type;
                return true;
            }
        });

        return result;
    }

    private static debugLog(message: string) {
        if (process && process.env && process.env.DEBUG === "superagent") {
            process.stdout.write("  \x1b[1m\x1b[35msuperagent\x1b[0m ");
            // tslint:disable-next-line:no-console
            console.log(message);
        }
    }

    protected request<T>(options: { url: string, method: string, headers: { [key: string]: string }, query: {}, formParams: {}, useFormData: boolean, contentTypes: Array<string>, acceptTypes: Array<string>, body?: any, file?: boolean }, callback?: (sdkError: SDKError, data: T) => any): superagent.SuperAgentRequest {

        // Normalize slashes in url
        const url = options.url.replace(/([:])?\/+/g, ($0, $1) => {
            return $1 ? $0 : "/";
        });

        const request = superagent(options.method, this.host + url);

        // set query parameters
        request.query(ApiBase.normalizeParams(options.query));

        // set header parameters
        options.headers.Authorization = this.apiKey;
        request.set(ApiBase.normalizeParams(options.headers));

        // set request timeout
        request.timeout(60000);

        // set accept header
        const acceptHeader = ApiBase.chooseType(options.acceptTypes);
        if (acceptHeader) {
            request.accept(acceptHeader);
        }

        let body = null;
        if (Object.keys(options.formParams).length > 0) {
            if (options.useFormData) {
                const formParams = ApiBase.normalizeParams(options.formParams);
                for (const key in formParams) {
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

            body = options.body;

            // set content type header
            const contentType = ApiBase.chooseType(options.contentTypes, "application/json");
            request.type(contentType);

            // Remove empty or undefined json parameters
            if (body && body.constructor === {}.constructor && MIME_REGEX.test(contentType)) {
                body = Object.keys(body).reduce((val, key) => {
                    if (body[key] !== null && body[key] !== undefined) val[key] = body[key];
                    return val;
                }, {});
            }

            request.send(body);
        }

        ApiBase.debugLog(`HOST ${this.host}`);
        if (body) ApiBase.debugLog(`BODY ${body}`);

        request.end((error, response) => {
            this.complete(error, response, acceptHeader, callback);
        });

        return request;
    }

    protected complete(error: any, response: any, acceptHeader: string, callback?: (sdkError: SDKError, data) => any) {
        let sdkError = null;

        if (error) {
            let message = error.message;
            let innerError = error;
            let details = "";

            if (response) {
                if (response.error) message = response.error.message;
                if (response.body && response.body.message) {
                    message = response.body.message;
                    if (message.error) message = message.error;
                }
                innerError = response.error || error;
                details = response.body || response.text;
            }

            sdkError = new SDKError(message, innerError, details, error.status);
        }

        if (this.responseHandler) {
            this.responseHandler(sdkError, response);
        }

        if (callback) {
            let data = null;

            if (response && !sdkError) {
                data = response.body || response.text;
            }

            // If an object has been returned and we expected json
            if (data && data.constructor === {}.constructor && MIME_REGEX.test(acceptHeader)) {
                data = JSON.parse(JSON.stringify(data), (_key, value) => {
                    // Check for date
                    if (DATE_REGEX.test(value)) return new Date(value);
                    return value;
                });
            }

            callback(sdkError, data);
        }
    }
}
