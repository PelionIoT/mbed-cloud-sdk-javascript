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

import { ListResponse, CallbackFn, ComparisonObject } from "./interfaces";
import { SDKError } from "./sdkError";

// Inspired by https://github.com/sonnyp/polygoat
export function asyncStyle<T>(asyncFn: (done: CallbackFn<T>) => void, callbackFn?: CallbackFn<T>): Promise<T> {
    if (callbackFn) {
        try {
            asyncFn(callbackFn)
        } catch(error) {
            callbackFn(new SDKError(error.message, error));
        }
    } else {
        return new Promise((resolve, reject) => {
            try {
                asyncFn((error: SDKError, response: T) => {
                    if (error) reject(error);
                    else resolve(response);
                });
            } catch(error) {
                reject(new SDKError(error.message, error));
            }
        });
    }
}

export function decodeBase64(payload, contentType) {
    var result = "";

    if (typeof atob === "function") {
        result = atob(payload);
    } else {
        result = new Buffer(payload, "base64").toString("utf8");
    }

    if (contentType && contentType.indexOf("json") > -1) {
        result = JSON.parse(result);
    }

    return result;
}

export function encodeInclude(include) {
    if (!include || !include.length) return null;
    return include.map(camelToSnake).join(",");
}

export function snakeToCamel(snake) {
    return snake.replace(/(\_\w)/g, function(match) {
        return match[1].toUpperCase();
    });
}

export function camelToSnake(camel) {
    return camel.replace(/([A-Z]+)/g, function(match) {
        return "_" + match.toLowerCase();
    });
}

export function mapListResponse<T>(from: any, data:Array<T>): ListResponse<T> {
    let to: ListResponse<T> = {};

    to.after         = from.after;
    to.hasMore       = from.has_more;
    to.limit         = from.limit;
    to.order         = from.order;
    to.totalCount    = from.total_count;
    to.data          = data

    return to;
}

export function encodeFilter(filter: { [key: string]: ComparisonObject<any> }, map: { from: string[], to: string[] }, nested: string[] = []): string {
    if (!filter) return "";

    function encode(filter, name, operator, prefix: string = "") {
        let value = filter[name][operator];
        if (value instanceof Date) value = value.toISOString();
        if (typeof value === "boolean") value = value.toString();

        if (prefix) {
            prefix = camelToSnake(prefix);
            prefix = `${prefix}__`;
        }
        else {
            // Don't encode nested names
            let index = map.from.indexOf(name);
            name = (index > -1) ? map.to[index] : camelToSnake(name);
        }

        let suffix = operator.replace("$", "");
        if (suffix === "ne") suffix = "neq";
        if (suffix === "eq") suffix = ""; // Needs to removed when implemented properly in APIs
        if (suffix) suffix = `__${suffix}`;

        return `${prefix}${name}${suffix}=${value}`;
    }

    return Object.keys(filter).map(key => {
        return Object.keys(filter[key]).map(operator => {
            if (nested.indexOf(key) > -1) {
                return Object.keys(filter[key][operator]).map(sub => {
                    return encode(filter[key], operator, sub, key);
                }).join("&");
            }
            return encode(filter, key, operator);
        }).join("&");
    }).join("&");
}

export function decodeFilter(from: string, map: { from: string[], to: string[] }, nested: string[] = []): { [key: string]: ComparisonObject<any> } {
    let filter:{ [key: string]: ComparisonObject<any> } = {};

    function decodeName(name: string): string {
        let index = map.to.indexOf(name);
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
        let match = attrib.match(/^(.+)=(.+)$/);
        if (match) {
            let value = match[2];
            let bits = match[1].split("__");

            let name = decodeName(bits[0]);
            if (!filter[name]) filter[name] = {};

            if (nested.indexOf(name) > -1) {
                let nestedName = bits[1]; // Don't decode nested names
                if (!filter[name][nestedName]) filter[name][nestedName] = {};
                addOperator(filter[name][nestedName], bits[2], value);
                return;
            }

            addOperator(filter[name], bits[1], value);
        }
    });

    return filter;
}
