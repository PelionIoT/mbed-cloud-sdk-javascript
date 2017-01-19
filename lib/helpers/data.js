"use strict";
function decodeBase64(data) {
    var result = "";
    if (typeof atob === "function") {
        result = atob(data.payload);
    }
    else {
        result = new Buffer(data.payload, "base64").toString("utf8");
    }
    if (data.ct.indexOf("json") > -1) {
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
