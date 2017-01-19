"use strict";
/*
 * Development Certificate
 */
var DeveloperCertificate = (function () {
    function DeveloperCertificate(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    DeveloperCertificate.map = function (from) {
        var type = {
            createdAt: from.created_at,
            id: from.id,
            publicKey: from.pub_key
        };
        return new DeveloperCertificate(type);
    };
    return DeveloperCertificate;
}());
exports.DeveloperCertificate = DeveloperCertificate;
