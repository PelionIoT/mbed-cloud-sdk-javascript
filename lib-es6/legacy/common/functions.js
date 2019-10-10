/*
* Pelion Device Management JavaScript SDK
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
import { SDKError } from "./sdkError";
import { decodeTlv } from "./tlvDecoder";
// Inspired by https://github.com/sonnyp/polygoat
// If a callback is passed, use that after running the passed function, otherwise return a promise chain
/**
 * Internal function
 * @ignore
 */
export function asyncStyle(asyncFn, callbackFn) {
    if (callbackFn) {
        try {
            asyncFn(callbackFn);
        }
        catch (error) {
            callbackFn(new SDKError(error.message, error));
        }
    }
    else {
        return new Promise((resolve, reject) => {
            try {
                asyncFn((error, response) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(response);
                    }
                });
            }
            catch (error) {
                reject(new SDKError(error.message, error));
            }
        });
    }
}
/**
 * Internal function
 * @ignore
 */
export function asyncStyleWithTimeout(asyncFn, timeout, callbackFn) {
    if (callbackFn) {
        // timeout not relevant for a callback
        try {
            asyncFn(callbackFn);
        }
        catch (error) {
            callbackFn(new SDKError(error.message, error));
        }
    }
    else {
        const result = new Promise((resolve, reject) => {
            try {
                asyncFn((error, response) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(response);
                    }
                });
            }
            catch (error) {
                reject(new SDKError(error.message, error));
            }
        });
        return promiseTimeout(timeout, result);
    }
}
// Wrap our functions to allow error catching
// Wraps an api function call and optionally a data transformation function to allow a single point for trapping errors
/**
 * Internal function
 * @ignore
 */
export function apiWrapper(apiFn, transformFn, callbackFn, failOnNotFound = false, timeout) {
    const doneFunction = done => {
        try {
            // Call the api function
            apiFn((error, data) => {
                if (error) {
                    if (!failOnNotFound && error.code === 404) {
                        return done(null, null);
                    }
                    else {
                        return done(error);
                    }
                }
                if (!transformFn) {
                    return done(null, data);
                }
                try {
                    // Call the transformation function
                    transformFn(data, done);
                }
                catch (error) {
                    // Catch any errors when transforming the returned data
                    done(new SDKError(error.message, error));
                }
            });
        }
        catch (error) {
            // Catch any errors when running api calls
            done(new SDKError(error.message, error));
        }
    };
    if (timeout) {
        return asyncStyleWithTimeout(doneFunction, timeout, callbackFn);
    }
    else {
        return asyncStyle(doneFunction, callbackFn);
    }
}
/**
 * Internal function
 * @ignore
 */
export function encodeBase64(payload) {
    if (payload) {
        if (typeof btoa === "function") {
            return btoa(payload);
        }
        return Buffer.from(payload).toString("base64");
    }
}
/**
 * Internal function
 * @ignore
 */
export function decodeBase64(payload, contentType) {
    // any so can be used in .isNaN method
    let result = "";
    // Decode Base64
    if (typeof atob === "function") {
        result = atob(payload);
    }
    else {
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
            }
            catch (e) { }
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
    // if string value is a number, then return number, otherwise just return the string
    return !isNaN(result) ? Number(result) : result;
}
/**
 * Internal function
 * @ignore
 */
export function encodeInclude(include) {
    if (!include || !include.length) {
        return null;
    }
    return include.map(camelToSnake).join(",");
}
/**
 * Internal function
 * @ignore
 */
export function snakeToCamel(snake) {
    return snake.replace(/(\_\w)/g, match => {
        return match[1].toUpperCase();
    });
}
/**
 * Internal function
 * @ignore
 */
export function camelToSnake(camel) {
    return camel.replace(/([A-Z]+?)/g, match => {
        return "_" + match.toLowerCase();
    });
}
/**
 * Internal function
 * @ignore
 */
export function extractFilter(filter, name, operator = "$eq", defaultValue = null) {
    if (filter && filter[name]) {
        const value = filter[name];
        if (value.constructor !== {}.constructor) {
            return value;
        }
        switch (operator) {
            case "$ne": {
                if (value.$ne) {
                    return value.$ne;
                }
                break;
            }
            case "$gte": {
                if (value.$gte) {
                    return value.$gte;
                }
                break;
            }
            case "$lte": {
                if (value.$lte) {
                    return value.$lte;
                }
                break;
            }
            case "$in": {
                if (value.$in) {
                    return value.$in;
                }
                break;
            }
            case "$nin": {
                if (value.$nin) {
                    return value.$nin;
                }
                break;
            }
            default: {
                if (value.$eq) {
                    return value.$eq;
                }
                break;
            }
        }
    }
    return defaultValue;
}
/**
 * Internal function
 * @ignore
 */
export function encodeFilter(filter, map = { from: [], to: [] }, nested = []) {
    if (!filter) {
        return "";
    }
    function encode(name, operator, value, prefix = "") {
        if (value instanceof Date) {
            value = value.toISOString();
        }
        if (typeof value === "boolean") {
            value = value.toString();
        }
        if (prefix) {
            prefix = camelToSnake(prefix);
            prefix = `${prefix}__`;
        }
        else {
            // Don't encode nested names
            const index = map.from.indexOf(name);
            name = (index > -1) ? map.to[index] : camelToSnake(name);
        }
        let suffix = operator.replace("$", "");
        if (suffix === "ne") {
            suffix = "neq";
        }
        if (suffix === "eq") {
            suffix = "";
        } // Needs to removed when implemented properly in APIs
        if (suffix) {
            suffix = `__${suffix}`;
        }
        return `${prefix}${name}${suffix}=${value}`;
    }
    return Object.keys(filter).map(key => {
        // Support bare { key: value }
        if (filter[key].constructor !== {}.constructor) {
            return encode(key, "", filter[key]);
        }
        return Object.keys(filter[key]).map(operator => {
            if (nested.indexOf(key) > -1) {
                // Support bare { key: value }
                if (filter[key][operator].constructor !== {}.constructor) {
                    return encode(operator, "", filter[key][operator], key);
                }
                return Object.keys(filter[key][operator]).map(sub => {
                    return encode(operator, sub, filter[key][operator][sub], key);
                }).join("&");
            }
            return encode(key, operator, filter[key][operator]);
        }).join("&");
    }).join("&");
}
/**
 * Internal function
 * @ignore
 */
export function decodeFilter(from, map = { from: [], to: [] }, nested = []) {
    const filter = {};
    function decodeName(name) {
        const index = map.to.indexOf(name);
        return (index > -1) ? map.from[index] : snakeToCamel(name);
    }
    function addOperator(comparisonObject, operator, value) {
        if (!operator) {
            operator = "eq";
        } // Needs to removed when implemented properly in APIs
        if (operator === "neq") {
            operator = "ne";
        }
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
            if (!filter[name]) {
                filter[name] = {};
            }
            if (nested.indexOf(name) > -1) {
                const nestedName = bits[1]; // Don't decode nested names
                if (!filter[name][nestedName]) {
                    filter[name][nestedName] = {};
                }
                addOperator(filter[name][nestedName], bits[2], value);
                return;
            }
            addOperator(filter[name], bits[1], value);
        }
    });
    return filter;
}
/**
 * Internal function
 * @ignore
 */
export function ensureArray(item) {
    return item instanceof Array ? item : [item];
}
/**
 * Internal function
 * @ignore
 */
export function matchWithWildcard(input, matchWith) {
    // if we have nothing to match with, return false
    if (matchWith === null || matchWith === undefined || matchWith === "") {
        return false;
    }
    // if input is empty or * then we're listening to everything so return true
    if (input === null || input === undefined || input === "" || input === "*") {
        return true;
    }
    // if wildcard used, match on begining of string
    if (input.endsWith("*")) {
        return matchWith.startsWith(input.slice(0, -1));
    }
    // no wildcard so match strings explicitly
    return input === matchWith;
}
/**
 * Internal function
 * @ignore
 */
export function dateToBillingMonth(date) {
    // make sure date is actually a Date object;
    date = new Date(date);
    // javascript uses 0-indexed months
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}`;
}
/**
 * Internal function
 * @ignore
 */
export function isThisNode() {
    return typeof window === "undefined" && typeof require === "function";
}
/**
 * Internal function
 * @ignore
 */
export function promiseTimeout(ms, promise) {
    const timeout = new Promise((_resolve, reject) => {
        const id = setTimeout(() => {
            clearTimeout(id);
            reject(`Timeout getting async value. Timeout ${ms}ms`);
        }, ms);
    });
    return Promise.race([
        promise,
        timeout,
    ]);
}
//# sourceMappingURL=functions.js.map