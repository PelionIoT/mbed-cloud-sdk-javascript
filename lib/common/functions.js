"use strict";
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
    if (contentType.indexOf("json") > -1) {
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
