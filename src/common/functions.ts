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

import { ListResponse } from "./interfaces";

// Inspired by https://github.com/sonnyp/polygoat
export function asyncStyle<T>(asyncFn: (done: (error: any, response?: T) => any) => void, callbackFn?: (error: any, response: T) => any): Promise<T> {
    if (callbackFn) asyncFn(callbackFn)
    else {
        return new Promise((resolve, reject) => {
            asyncFn((error, response) => {
                if (error) reject(error);
                else resolve(response);
            });
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

    if (contentType.indexOf("json") > -1) {
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
        return "-" + match.toLowerCase();
    });
}

export function mapListResponse<T>(from: any, data:T[]): ListResponse<T> {
    let to: ListResponse<T> = {};

    to.after         = from.after;
    to.hasMore       = from.has_more;
    to.limit         = from.limit;
    to.order         = from.order;
    to.totalCount    = from.total_count;
    to.data          = data

    return to;
}

export function encodeAttributes(from: { [key: string]: string }, prefix: string = ""): string {
    if (!from) return "";

    return Object.keys(from).map(key => {
        return `${prefix}${key}=${from[key]}`;
    }).join("&");
}

export function decodeAttributes(from: string, prefix: string = ""): { match: { [key: string]: string }, noMatch: { [key: string]: string } } {
    let to = { match: {}, noMatch: {} };
    let re = new RegExp(`^(${prefix})?(.+)=(.+)$`);

    from = decodeURIComponent(from);
    from.split("&").forEach(attrib => {
        let match = attrib.match(re);
        if (match) {
            if (match[1]) to.match[match[2]] = match[3];
            else to.noMatch[match[2]] = match[3];
        }
    });

    return to;
}

export function encodeFilter(from: { attributes?: { [key: string]: string }, customAttributes?: { [key: string]: string } }, customPrefix: string): string {
    let filter = encodeAttributes(from.attributes);
    let custom = encodeAttributes(from.customAttributes, customPrefix);

    if (custom) {
        if (filter) filter += "&";
        filter +=custom;
    }

    return filter;
}
