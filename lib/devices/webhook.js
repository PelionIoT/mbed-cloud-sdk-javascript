"use strict";
/*
 * Webhook
 */
var Webhook = (function () {
    function Webhook(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Webhook.map = function (from) {
        var type = {
            headers: from.headers,
            url: from.url
        };
        return new Webhook(type);
    };
    return Webhook;
}());
exports.Webhook = Webhook;
