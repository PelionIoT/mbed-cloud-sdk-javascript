"use strict";
/*
 * Group
 */
var Group = (function () {
    function Group(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Group.map = function (from) {
        var type = {
            apiKeyCount: from.apiKeyCount,
            createdAt: from.created_at,
            creationTime: from.creationTime,
            id: from.id,
            lastUpdateTime: from.lastUpdateTime,
            name: from.name,
            userCount: from.userCount
        };
        return new Group(type);
    };
    return Group;
}());
exports.Group = Group;
