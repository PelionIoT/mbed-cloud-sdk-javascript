import { SDKError } from "../../../";
import { isJwt } from "../../../common/utils";
import { asyncStyle } from "../../common/functions";
import { WebhookAdapter } from "../models/webhookAdapter";
export const getWebhook = (config, endpoints, callback) => {
    return asyncStyle(done => {
        if (isJwt(config.apiKey)) {
            done(null, null);
        }
        else {
            endpoints.notifications.getWebhook((error, data) => {
                if (error) {
                    if (error.code === 404) {
                        // No webhook
                        return done(null, null);
                    }
                    return done(error);
                }
                const webhook = WebhookAdapter.map(data);
                done(null, webhook);
            });
        }
    }, callback);
};
export const updateWebhook = (connect, endpoints, deliveryMethod, connectForceClear, url, headers, forceClear, callback) => {
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
    return asyncStyle(done => {
        if (deliveryMethod === "CLIENT_INITIATED") {
            return done(new SDKError("cannot update webhook if delivery method is client initiated"), null);
        }
        function update() {
            endpoints.notifications.registerWebhook({
                url,
                headers,
            }, error => {
                if (error) {
                    return done(error);
                }
                done(null, null);
            });
        }
        if (connectForceClear || forceClear) {
            connect.stopNotifications(update.bind(this));
        }
        else {
            update.call(this);
        }
    }, callback);
};
export const deleteWebhook = (endpoints, callback) => {
    return asyncStyle(done => {
        endpoints.notifications.deregisterWebhook(() => {
            done(null, null);
        });
    }, callback);
};
//# sourceMappingURL=webhooks.js.map