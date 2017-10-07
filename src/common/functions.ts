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

import { CallbackFn, ComparisonObject } from "./interfaces";
import { SDKError } from "./sdkError";
import { decodeTlv } from "./tlvDecoder";

// Inspired by https://github.com/sonnyp/polygoat
// If a callback is passed, use that after running the passed function, otherwise return a promise chain
export function asyncStyle<T>(asyncFn: (done: CallbackFn<T>) => void, callbackFn?: CallbackFn<T>): Promise<T> {
    if (callbackFn) {
        try {
            asyncFn(callbackFn);
        } catch (error) {
            callbackFn(new SDKError(error.message, error));
        }
    } else {
        return new Promise((resolve, reject) => {
            try {
                asyncFn((error: SDKError, response: T) => {
                    if (error) reject(error);
                    else resolve(response);
                });
            } catch (error) {
                reject(new SDKError(error.message, error));
            }
        });
    }
}

// Wrap our functions to allow error catching
// Wraps an api function call and optionally a data transformation function to allow a single point for trapping errors
export function apiWrapper<T>(apiFn: (resultsFn: (error: any, data: any) => void) => void, transformFn?: (data: any, resultsFn: (error: SDKError, result: T) => void) => void, callbackFn?: CallbackFn<T>): Promise<T> {
    // Use async style
    return asyncStyle(done => {
        try {
            // Call the api function
            apiFn((error, data) => {
                if (error) return done(error);
                if (!transformFn) return done(null, data);

                try {
                    // Call the transformation function
                    transformFn(data, done);
                } catch (error) {
                    // Catch any errors when transforming the returned data
                    done(new SDKError(error.message, error));
                }
            });
        } catch (error) {
            // Catch any errors when running api calls
            done(new SDKError(error.message, error));
        }
    }, callbackFn);
}

export function decodeBase64(payload, contentType) {
    let result = "";

    // Decode Base64
    if (typeof atob === "function") {
        result = atob(payload);
    } else {
        result = new Buffer(payload, "base64").toString("binary");
    }

    // According to the swagger, content types can be:
    // text/plain
    // application/xml
    // application/octet-stream
    // application/exi
    // application/json
    // application/link-format
    // application/senml+json
    // application/nanoservice-tlv
    // application/vnd.oma.lwm2m+text
    // application/vnd.oma.lwm2m+opaq
    // application/vnd.oma.lwm2m+tlv
    // application/vnd.oma.lwm2m+json
    if (contentType) {
        if (contentType.indexOf("tlv") > -1) {
            // Decode tlv
            try {
                return decodeTlv(result);
            // tslint:disable-next-line:no-empty
            } catch (e) {}
        }
        /*
        else if (contentType.indexOf("json") > -1) {
            // Decode json
            try {
                return JSON.parse(result);
            } catch(e) {}
        }
        */
    }

    return result;
}

export function encodeInclude(include) {
    if (!include || !include.length) return null;
    return include.map(camelToSnake).join(",");
}

export function snakeToCamel(snake) {
    return snake.replace(/(\_\w)/g, match => {
        return match[1].toUpperCase();
    });
}

export function camelToSnake(camel) {
    return camel.replace(/([A-Z]+?)/g, match => {
        return "_" + match.toLowerCase();
    });
}

export function extractFilter(filter: { [key: string]: ComparisonObject<any> | string }, name: string, defaultValue: any = null): any {

    if (filter && filter[name]) {
        const value = filter[name];
        if (value.constructor !== {}.constructor) return value;
        if ((value as ComparisonObject<any>).$eq) return (value as ComparisonObject<any>).$eq;
    }

    return defaultValue;
}

export function encodeFilter(filter: { [key: string]: ComparisonObject<any> | string | {} }, map: { from: Array<string>, to: Array<string> } = { from: [], to: [] }, nested: Array<string> = []): string {
    if (!filter) return "";

    function encode(name, operator, value, prefix: string = "") {
        if (value instanceof Date) value = value.toISOString();
        if (typeof value === "boolean") value = value.toString();

        if (prefix) {
            prefix = camelToSnake(prefix);
            prefix = `${prefix}__`;
        } else {
            // Don't encode nested names
            const index = map.from.indexOf(name);
            name = (index > -1) ? map.to[index] : camelToSnake(name);
        }

        let suffix = operator.replace("$", "");
        if (suffix === "ne") suffix = "neq";
        if (suffix === "eq") suffix = ""; // Needs to removed when implemented properly in APIs
        if (suffix) suffix = `__${suffix}`;

        return `${prefix}${name}${suffix}=${value}`;
    }

    return Object.keys(filter).map(key => {
        // Support bare { key: value }
        if (filter[key].constructor !== {}.constructor) return encode(key, "", filter[key]);

        return Object.keys(filter[key]).map(operator => {
            if (nested.indexOf(key) > -1) {
                // Support bare { key: value }
                if (filter[key][operator].constructor !== {}.constructor) return encode(operator, "", filter[key][operator], key);

                return Object.keys(filter[key][operator]).map(sub => {
                    return encode(operator, sub, filter[key][operator][sub], key);
                }).join("&");
            }
            return encode(key, operator, filter[key][operator]);
        }).join("&");
    }).join("&");
}

export function decodeFilter(from: string, map: { from: Array<string>, to: Array<string> } = { from: [], to: [] }, nested: Array<string> = []): { [key: string]: ComparisonObject<any> | {} } {
    const filter: { [key: string]: ComparisonObject<any> } = {};

    function decodeName(name: string): string {
        const index = map.to.indexOf(name);
        return (index > -1) ? map.from[index] : snakeToCamel(name);
    }

    function addOperator(comparisonObject: {}, operator: string, value: string) {
        if (!operator) operator = "eq"; // Needs to removed when implemented properly in APIs
        if (operator === "neq") operator = "ne";
        operator = `$${operator}`;
        comparisonObject[operator] = value;
    }

    from = decodeURIComponent(from);
    from.split("&").forEach(attrib => {
        const match = attrib.match(/^(.+)=(.+)$/);
        if (match) {
            const value = match[2];
            const bits = match[1].split("__");

            const name = decodeName(bits[0]);
            if (!filter[name]) filter[name] = {};

            if (nested.indexOf(name) > -1) {
                const nestedName = bits[1]; // Don't decode nested names
                if (!filter[name][nestedName]) filter[name][nestedName] = {};
                addOperator(filter[name][nestedName], bits[2], value);
                return;
            }

            addOperator(filter[name], bits[1], value);
        }
    });

    return filter;
}
