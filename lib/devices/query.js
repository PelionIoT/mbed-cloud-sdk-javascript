"use strict";
/*
 * Query
 */
var Query = (function () {
    function Query(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Query.map = function (from) {
        var type = {
            createdAt: from.created_at,
            description: from.description,
            id: from.id,
            name: from.name,
            query: from.query,
            updatedAt: from.updated_at
        };
        return new Query(type);
    };
    return Query;
}());
exports.Query = Query;
