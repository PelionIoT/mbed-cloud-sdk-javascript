"use strict";
var functions_1 = require("../common/functions");
/*
 * Query
 */
var Query = (function () {
    function Query(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Query.encodeQuery = function (from) {
        var filter = functions_1.encodeAttributes(from.attributes);
        var custom = functions_1.encodeAttributes(from.customAttributes, Query.CUSTOM_PREFIX);
        if (custom) {
            if (filter)
                filter += "&";
            filter += custom;
        }
        return filter;
    };
    Query.map = function (from) {
        var attributes = functions_1.decodeAttributes(from.query, Query.CUSTOM_PREFIX);
        var type = {
            attributes: attributes.noMatch,
            customAttributes: attributes.match,
            createdAt: from.created_at,
            description: from.description,
            id: from.id,
            name: from.name,
            updatedAt: from.updated_at
        };
        return new Query(type);
    };
    return Query;
}());
exports.Query = Query;
Query.CUSTOM_PREFIX = "custom_attributes__";
