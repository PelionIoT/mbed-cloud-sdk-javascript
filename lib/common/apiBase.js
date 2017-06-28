"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var superagent = require("superagent");
var sdkError_1 = require("./sdkError");
var DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
var ApiBase = (function () {
    function ApiBase(apiKey, host) {
        if (host === void 0) { host = "https://api.us-east-1.mbedcloud.com"; }
        this.host = host;
        this.apiKey = "";
        if (apiKey && apiKey.substr(0, 6).toLowerCase() !== "bearer")
            apiKey = "Bearer " + apiKey;
        this.apiKey = apiKey;
    }
    ApiBase.prototype.request = function (options, callback) {
        // Normalize slashes in url
        var url = options.url.replace(/([:])?\/+/g, function ($0, $1) {
            return $1 ? $0 : "/";
        });
        var request = superagent(options.method, this.host + url);
        // set query parameters
        request.query(ApiBase.normalizeParams(options.query));
        // set header parameters
        options.headers["Authorization"] = this.apiKey;
        request.set(ApiBase.normalizeParams(options.headers));
        // set request timeout
        request.timeout(60000);
        if (options.json) {
            request.accept("application/json");
        }
        var body = null;
        if (Object.keys(options.formParams).length > 0) {
            if (options.useFormData) {
                var formParams = ApiBase.normalizeParams(options.formParams);
                for (var key in formParams) {
                    if (formParams.hasOwnProperty(key)) {
                        if (ApiBase.isFileParam(formParams[key])) {
                            // file field
                            request.attach(key, formParams[key]);
                        }
                        else {
                            request.field(key, formParams[key]);
                        }
                    }
                }
            }
            else {
                request.type("application/x-www-form-urlencoded");
                request.send(ApiBase.normalizeParams(options.formParams));
            }
        }
        else if (options.body) {
            body = options.body;
            if (options.json) {
                request.type("application/json");
                if (body.constructor === {}.constructor) {
                    body = Object.keys(body).reduce(function (val, key) {
                        if (body[key] !== null && body[key] !== undefined)
                            val[key] = body[key];
                        return val;
                    }, {});
                }
            }
            request.send(body);
        }
        request.end(function (error, response) {
            if (callback) {
                var sdkError = null;
                if (error) {
                    var message = error.message;
                    var innerError = error;
                    var details = "";
                    if (response) {
                        if (response.error)
                            message = response.error.message;
                        if (response.body && response.body.message)
                            message = response.body.message;
                        innerError = response.error || error;
                        details = response.body;
                    }
                    sdkError = new sdkError_1.SDKError(message, innerError, details, error.status);
                }
                var data = null;
                if (response && !sdkError) {
                    data = response.body || response.text;
                }
                if (options.json && typeof data === "object") {
                    data = JSON.parse(JSON.stringify(data), function (_key, value) {
                        // Check for date
                        if (DATE_REGEX.test(value))
                            return new Date(value);
                        return value;
                    });
                }
                callback(sdkError, data, response);
            }
        });
        if (body && process && process.env && process.env.DEBUG === "superagent") {
            process.stdout.write("  \x1b[1m\x1b[35msuperagent\x1b[0m BODY ");
            console.log(body);
        }
        return request;
    };
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
    ApiBase.normalizeParams = function (params) {
        var newParams = {};
        for (var key in params) {
            if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
                var value = params[key];
                if (this.isFileParam(value) || Array.isArray(value)) {
                    newParams[key] = value;
                }
                else {
                    newParams[key] = ApiBase.paramToString(value);
                }
            }
        }
        return newParams;
    };
    /**
    * Checks whether the given parameter value represents file-like content.
    * @param param The parameter to check.
    * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
    */
    ApiBase.isFileParam = function (param) {
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
    };
    /**
    * Returns a string representation for an actual parameter.
    * @param param The actual parameter.
    * @returns {String} The string representation of <code>param</code>.
    */
    ApiBase.paramToString = function (param) {
        if (param == undefined || param == null) {
            return '';
        }
        if (param instanceof Date) {
            return param.toJSON();
        }
        return param.toString();
    };
    return ApiBase;
}());
exports.ApiBase = ApiBase;
