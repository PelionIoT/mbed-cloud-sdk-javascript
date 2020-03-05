"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../../../");
var utils_1 = require("../../../common/utils");
var functions_1 = require("../../common/functions");
var webhookAdapter_1 = require("../models/webhookAdapter");
exports.getWebhook = function (config, endpoints, callback) {
    return functions_1.asyncStyle(function (done) {
        if (utils_1.isJwt(config.apiKey)) {
            done(null, null);
        }
        else {
            endpoints.notifications.getWebhook(function (error, data) {
                if (error) {
                    if (error.code === 404) {
                        // No webhook
                        return done(null, null);
                    }
                    return done(error);
                }
                var webhook = webhookAdapter_1.WebhookAdapter.map(data);
                done(null, webhook);
            });
        }
    }, callback);
};
exports.updateWebhook = function (connect, endpoints, deliveryMethod, connectForceClear, url, headers, forceClear, callback) {
    headers = headers || {};
    forceClear = forceClear || false;
    if (typeof forceClear === "function") {
        callback = forceClear;
        forceClear = false;
    }
    if (typeof headers === "function") {
        callback = headers;
        headers = {};
    }
    if (!deliveryMethod) {
        deliveryMethod = "SERVER_INITIATED";
    }
    return functions_1.asyncStyle(function (done) {
        if (deliveryMethod === "CLIENT_INITIATED") {
            return done(new __1.SDKError("cannot update webhook if delivery method is client initiated"), null);
        }
        function update() {
            endpoints.notifications.registerWebhook({
                url: url,
                headers: headers,
            }, function (error) {
                if (error) {
                    return done(error);
                }
                done(null, null);
            });
        }
        if (connectForceClear || forceClear) {
            connect.stopNotifications(update.bind(_this));
        }
        else {
            update.call(_this);
        }
    }, callback);
};
exports.deleteWebhook = function (endpoints, callback) {
    return functions_1.asyncStyle(function (done) {
        endpoints.notifications.deregisterWebhook(function () {
            done(null, null);
        });
    }, callback);
};
//# sourceMappingURL=webhooks.js.map