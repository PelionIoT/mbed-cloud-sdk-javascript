"use strict";
/*
 * Presubscription
 */
var Presubscription = (function () {
    function Presubscription(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Presubscription.map = function (from) {
        var type = {
            id: from["endpoint-name"],
            type: from["endpoint-type"],
            resourcePaths: from["resource-path"]
        };
        return new Presubscription(type);
    };
    Presubscription.reverseMap = function (from) {
        return {
            "endpoint-name": from.id,
            "endpoint-type": from.type,
            "resource-path": from.resourcePaths
        };
    };
    return Presubscription;
}());
exports.Presubscription = Presubscription;
