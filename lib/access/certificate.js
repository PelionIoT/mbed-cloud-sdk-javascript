"use strict";
/*
 * Certificate
 */
var Certificate = (function () {
    function Certificate(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Certificate.map = function (from) {
        var type = {
            accountId: from.account_id,
            createdAt: from.created_at,
            data: from.cert_data,
            id: from.id,
            issuer: from.issuer,
            name: from.name,
            service: from.service,
            subject: from.subject,
            validity: from.validity
        };
        return new Certificate(type);
    };
    return Certificate;
}());
exports.Certificate = Certificate;
