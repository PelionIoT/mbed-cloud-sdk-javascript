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

import { TlvDataType, TlvParser } from "../../common/tlv";
import { Resource } from "../connect/models/resource";
import { ResourceValue } from "../connect/models/resourceValue";
import { CallbackFn, ComparisonObject, operators } from "./interfaces";
import { SDKError } from "./sdkError";

// Inspired by https://github.com/sonnyp/polygoat
// If a callback is passed, use that after running the passed function, otherwise return a promise chain
/**
 * Internal function
 * @ignore
 */
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
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response);
                    }
                });
            } catch (error) {
                reject(new SDKError(error.message, error));
            }
        });
    }
}

/**
 * Internal function
 * @ignore
 */
export function asyncStyleWithTimeout<T>(
    asyncFn: (done: CallbackFn<T>) => void,
    timeout: number,
    callbackFn?: CallbackFn<T>
): Promise<T> {
    if (callbackFn) {
        // timeout not relevant for a callback
        try {
            asyncFn(callbackFn);
        } catch (error) {
            callbackFn(new SDKError(error.message, error));
        }
    } else {
        const result = new Promise((resolve, reject) => {
            try {
                asyncFn((error: SDKError, response: T) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response);
                    }
                });
            } catch (error) {
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
export function apiWrapper<T>(
    apiFn: (resultsFn: (error: any, data: any) => void) => void,
    transformFn?: (data: any, resultsFn: (error: SDKError, result: T) => void) => void,
    callbackFn?: CallbackFn<T>,
    failOnNotFound = false,
    timeout?: number
): Promise<T> {
    const doneFunction = done => {
        try {
            // Call the api function
            apiFn((error, data) => {
                if (error) {
                    if (!failOnNotFound && error.code === 404) {
                        return done(null, null);
                    } else {
                        return done(error);
                    }
                }

                if (!transformFn) {
                    return done(null, data);
                }

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
    };

    if (timeout) {
        return asyncStyleWithTimeout(doneFunction, timeout, callbackFn);
    } else {
        return asyncStyle(doneFunction, callbackFn);
    }
}

/**
 * Internal function
 * @ignore
 */
export function encodeBase64(payload): string {
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
export function parseResourceValue({
    payload,
    resource,
    tlvParser,
}: {
    payload: string;
    resource?: Resource;
    tlvParser?: TlvParser;
}) {
    return new ResourceValue({ payload, resource, tlvParser });
}

export function parseValueFromType(value: string, type: TlvDataType): string | number {
    if (type === TlvDataType.Float) {
        return parseFloat(value) ? parseFloat(value) : value;
    }
    if (type === TlvDataType.Integer) {
        return parseInt(value, 10) ? parseInt(value, 10) : value;
    }
    if (type === TlvDataType.Boolean) {
        return value === "1" ? "True" : value === "0" ? "False" : value;
    }
    if (type === TlvDataType.Time) {
        return new Date(+value * 1000).toString();
    }

    return value;
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
export function extractFilter(
    filter: { [key: string]: ComparisonObject<any> | string },
    name: string,
    operator: operators = "$eq",
    defaultValue: any = null
): any {
    if (filter && filter[name]) {
        const value = filter[name];
        if (value.constructor !== {}.constructor) {
            return value;
        }

        switch (operator) {
            case "$ne": {
                if ((value as ComparisonObject<any>).$ne) {
                    return (value as ComparisonObject<any>).$ne;
                }
                break;
            }
            case "$gte": {
                if ((value as ComparisonObject<any>).$gte) {
                    return (value as ComparisonObject<any>).$gte;
                }
                break;
            }
            case "$lte": {
                if ((value as ComparisonObject<any>).$lte) {
                    return (value as ComparisonObject<any>).$lte;
                }
                break;
            }
            case "$in": {
                if ((value as ComparisonObject<any>).$in) {
                    return (value as ComparisonObject<any>).$in;
                }
                break;
            }
            case "$nin": {
                if ((value as ComparisonObject<any>).$nin) {
                    return (value as ComparisonObject<any>).$nin;
                }
                break;
            }
            default: {
                if ((value as ComparisonObject<any>).$eq) {
                    return (value as ComparisonObject<any>).$eq;
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
export function encodeFilter(
    filter,
    map: { from: Array<string>; to: Array<string> } = { from: [], to: [] },
    nested: Array<string> = []
): string {
    if (!filter) {
        return "";
    }

    function encode(name, operator, value, prefix: string = "") {
        if (value instanceof Date) {
            value = value.toISOString();
        }
        if (typeof value === "boolean") {
            value = value.toString();
        }

        if (prefix) {
            prefix = camelToSnake(prefix);
            prefix = `${prefix}__`;
        } else {
            // Don't encode nested names
            const index = map.from.indexOf(name);
            name = index > -1 ? map.to[index] : camelToSnake(name);
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

    return Object.keys(filter)
        .map(key => {
            // Support bare { key: value }
            if (filter[key].constructor !== {}.constructor) {
                return encode(key, "", filter[key]);
            }

            return Object.keys(filter[key])
                .map(operator => {
                    if (nested.indexOf(key) > -1) {
                        // Support bare { key: value }
                        if (filter[key][operator].constructor !== {}.constructor) {
                            return encode(operator, "", filter[key][operator], key);
                        }

                        return Object.keys(filter[key][operator])
                            .map(sub => {
                                return encode(operator, sub, filter[key][operator][sub], key);
                            })
                            .join("&");
                    }
                    return encode(key, operator, filter[key][operator]);
                })
                .join("&");
        })
        .join("&");
}

/**
 * Internal function
 * @ignore
 */
export function decodeFilter(
    from: string,
    map: { from: Array<string>; to: Array<string> } = { from: [], to: [] },
    nested: Array<string> = []
): { [key: string]: ComparisonObject<any> | {} } {
    const filter: { [key: string]: ComparisonObject<any> } = {};

    function decodeName(name: string): string {
        const index = map.to.indexOf(name);
        return index > -1 ? map.from[index] : snakeToCamel(name);
    }

    function addOperator(comparisonObject: {}, operator: string, value: string) {
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
export function ensureArray<T>(item: T | Array<T>): Array<T> {
    return item instanceof Array ? item : [item];
}

/**
 * Internal function
 * @ignore
 */
export function matchWithWildcard(input: string, matchWith: string): boolean {
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
export function dateToBillingMonth(date: Date) {
    // make sure date is actually a Date object;
    date = new Date(date);
    // javascript uses 0-indexed months
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}`;
}

/**
 * Internal function
 * @ignore
 */
export function isThisNode(): boolean {
    return typeof window === "undefined" && typeof require === "function";
}

/**
 * Internal function
 * @ignore
 */
export function promiseTimeout(ms: number, promise) {
    const timeout = new Promise((_resolve, reject) => {
        const id = setTimeout(() => {
            clearTimeout(id);
            reject(`Timeout getting async value. Timeout ${ms}ms`);
        }, ms);
    });

    return Promise.race([promise, timeout]);
}
