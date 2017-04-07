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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Inspired by https://github.com/sonnyp/polygoat
function asyncStyle(asyncFn, callbackFn) {
    if (callbackFn)
        asyncFn(callbackFn);
    else {
        return new Promise(function (resolve, reject) {
            asyncFn(function (error, response) {
                if (error)
                    reject(error);
                else
                    resolve(response);
            });
        });
    }
}
exports.asyncStyle = asyncStyle;
function decodeBase64(payload, contentType) {
    var result = "";
    if (typeof atob === "function") {
        result = atob(payload);
    }
    else {
        result = new Buffer(payload, "base64").toString("utf8");
    }
    if (contentType && contentType.indexOf("json") > -1) {
        result = JSON.parse(result);
    }
    return result;
}
exports.decodeBase64 = decodeBase64;
function encodeInclude(include) {
    if (!include || !include.length)
        return null;
    return include.map(camelToSnake).join(",");
}
exports.encodeInclude = encodeInclude;
function snakeToCamel(snake) {
    return snake.replace(/(\_\w)/g, function (match) {
        return match[1].toUpperCase();
    });
}
exports.snakeToCamel = snakeToCamel;
function camelToSnake(camel) {
    return camel.replace(/([A-Z]+)/g, function (match) {
        return "-" + match.toLowerCase();
    });
}
exports.camelToSnake = camelToSnake;
function mapListResponse(from, data) {
    var to = {};
    to.after = from.after;
    to.hasMore = from.has_more;
    to.limit = from.limit;
    to.order = from.order;
    to.totalCount = from.total_count;
    to.data = data;
    return to;
}
exports.mapListResponse = mapListResponse;
function encodeAttributes(from, prefix) {
    if (prefix === void 0) { prefix = ""; }
    if (!from)
        return "";
    return Object.keys(from).map(function (key) {
        return "" + prefix + key + "=" + from[key];
    }).join("&");
}
exports.encodeAttributes = encodeAttributes;
function decodeAttributes(from, prefix) {
    if (prefix === void 0) { prefix = ""; }
    var to = { match: {}, noMatch: {} };
    var re = new RegExp("^(" + prefix + ")?(.+)=(.+)$");
    from = decodeURIComponent(from);
    from.split("&").forEach(function (attrib) {
        var match = attrib.match(re);
        if (match) {
            if (match[1])
                to.match[match[2]] = match[3];
            else
                to.noMatch[match[2]] = match[3];
        }
    });
    return to;
}
exports.decodeAttributes = decodeAttributes;
function encodeFilter(from, customPrefix) {
    var filter = encodeAttributes(from.attributes);
    var custom = encodeAttributes(from.customAttributes, customPrefix);
    if (custom) {
        if (filter)
            filter += "&";
        filter += custom;
    }
    return filter;
}
exports.encodeFilter = encodeFilter;
