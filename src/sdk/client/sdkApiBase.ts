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

// this style of import is needed for third party packages that are being ignored by browserify
import superagent = require("superagent");

import { SDKError } from "../../common/sdkError";
import { Config } from "./config";
import { EntityBase } from "../common/entityBase";

// tslint:disable-next-line:no-var-requires
const packageInformation = require("../../../package.json");
const DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
const JSON_REGEX = /^application\/json(;.*)?$/i;
const MIME_REGEX = /^text\/plain(;.*)?$/i;
const VERSION = packageInformation.is_published ? packageInformation.version : `${packageInformation.version}+dev`;
const userAgent = `${packageInformation.name}-javascript / ${VERSION}`;

export class SdkApiBase {
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
        if (params) {
            for (const key in params) {
                if (params.hasOwnProperty(key) && params[key] !== undefined && params[key] !== null) {
                    const value = params[key];
                    if (this.isFileParam(value) || Array.isArray(value)) {
                        newParams[key] = value;
                    } else {
                        newParams[key] = SdkApiBase.paramToString(value);
                    }
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

    private static debugLog(title: string, obj: any) {
        if (process && process.env && process.env.DEBUG === "superagent") {
            process.stdout.write(`  \x1b[1m\x1b[35msuperagent\x1b[0m ${title.toUpperCase()} `);
            // tslint:disable-next-line:no-console
            console.log(obj);
        }
    }

    private static buildUrl(url: string, pathParams: { [key: string]: string }): string {
        if (pathParams) {
            Object.keys(pathParams).forEach(param => {
                url = url.replace(`{${param}}`, pathParams[param]);
            });
        }

        return url;
    }

    protected static request<T extends EntityBase>(options: { url: string, method: string, headers: { [key: string]: string }, pathParams: {}, query: {}, formParams: {}, useFormData: boolean, contentTypes: Array<string>, acceptTypes: Array<string>, body?: any, file?: boolean, paginated?: boolean, config?: Config }, instance: T, callback?: (sdkError: SDKError, data: any) => any): superagent.SuperAgentRequest {

        const requestOptions: { [key: string]: any } = {};
        requestOptions.timeout = 60000;
        requestOptions.method = options.method;
        requestOptions.query = SdkApiBase.normalizeParams(options.query);
        requestOptions.headers = SdkApiBase.normalizeParams(options.headers);
        requestOptions.acceptHeader = SdkApiBase.chooseType(options.acceptTypes);
        requestOptions.url = this.buildUrl(options.url, options.pathParams).replace(/([:])?\/+/g, ($0, $1) => {
            return $1 ? $0 : "/";
        });
        requestOptions.formParams = options.formParams || {};

        const request = superagent(requestOptions.method, options.config.host + requestOptions.url);

        // set query parameters
        request.query(requestOptions.query);

        let apiKey: string;
        if (options.config.apiKey.substr(0, 6).toLowerCase() !== "bearer") apiKey = `Bearer ${options.config.apiKey}`;

        // set header parameters
        requestOptions.headers.Authorization = apiKey;
        requestOptions.headers["User-Agent"] = userAgent;
        request.set(requestOptions.headers);

        // set request timeout
        request.timeout(requestOptions.timeout);

        // set accept header
        if (requestOptions.acceptHeader) {
            request.accept(requestOptions.acceptHeader);
        }

        let body = null;
        if (Object.keys(requestOptions.formParams).length > 0) {
            if (options.useFormData) {
                const formParams = SdkApiBase.normalizeParams(requestOptions.formParams);
                for (const key in formParams) {
                    if (formParams.hasOwnProperty(key)) {
                        if (SdkApiBase.isFileParam(formParams[key])) {
                            // file field
                            request.attach(key, formParams[key]);
                        } else {
                            request.field(key, formParams[key]);
                        }
                    }
                }
            } else {
                requestOptions.contentType = requestOptions.contentType || "application/x-www-form-urlencoded";
                request.type(requestOptions.contentType);
                request.send(SdkApiBase.normalizeParams(requestOptions.formParams));
            }
        } else if (options.body) {

            body = options.body;

            // set content type header
            requestOptions.contentType = requestOptions.contentType || SdkApiBase.chooseType(options.contentTypes, "application/json");
            request.type(requestOptions.contentType);

            // Remove empty or undefined json parameters
            if (body && body.constructor === {}.constructor && JSON_REGEX.test(requestOptions.contentType)) {
                body = Object.keys(body).reduce((val, key) => {
                    if (body[key] !== null && body[key] !== undefined) val[key] = body[key];
                    return val;
                }, {});
            }

            request.send(body);
        }

        if (body) SdkApiBase.debugLog("body", body);

        request.end((error, response) => {
            this.complete(error, response, requestOptions.acceptHeader, options.paginated, instance, callback);
        });

        return request;
    }

    protected static complete<T extends EntityBase>(error: any, response: any, acceptHeader: string, paginated: boolean, instance: T, callback?: (sdkError: SDKError, data) => any) {
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

        if (callback) {
            let data = null;

            if (response && !sdkError) {
                data = response.body || response.text;
            }

            // If an object has been returned and we expected json
            if (data && data.constructor === {}.constructor && JSON_REGEX.test(acceptHeader)) {
                data = JSON.parse(JSON.stringify(data), (_key, value) => {
                    // revive a date object
                    if (DATE_REGEX.test(value)) return new Date(value);
                    return value;
                });

                if (!paginated) {
                    data = instance._fromApi(instance, data);
                } else {
                    const arr: Array<T> = [];
                    Object.keys(data.data).forEach(d => {
                        const inst = instance._fromApi(instance, data.data[d]);
                        arr.push(inst);
                    });
                    data.data = arr;
                }
            }

            callback(sdkError, data);
        }
    }
}
