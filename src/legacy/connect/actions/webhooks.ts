import { CallbackFn } from "../../common/interfaces";
import { Webhook } from "../models/webhook";
import { asyncStyle } from "../../common/functions";
import { isJwt } from "../../../common/utils";
import { WebhookAdapter } from "../models/webhookAdapter";
import { SDKError, ConnectApi } from "../..";
import { Config } from "../../..";
import { Endpoints } from "../endpoints";
import { DeliveryMethod } from "../types";

export const getWebhook = (config: Config, endpoints: Endpoints, callback?: CallbackFn<Webhook>): Promise<Webhook> => {
    return asyncStyle(done => {
        if (isJwt(config.apiKey)) {
            done(null, null);
        } else {
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

export const updateWebhook = (
    connect: ConnectApi,
    endpoints: Endpoints,
    deliveryMethod: DeliveryMethod,
    connectForceClear: boolean,
    url: string,
    headers?: any,
    forceClear?: any,
    callback?: CallbackFn<void>
): Promise<void> => {
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
            endpoints.notifications.registerWebhook(
                {
                    url: url,
                    headers: headers,
                },
                error => {
                    if (error) {
                        return done(error);
                    }
                    done(null, null);
                }
            );
        }

        if (connectForceClear || forceClear) {
            connect.stopNotifications(update.bind(this));
        } else {
            update.call(this);
        }
    }, callback);
};

export const deleteWebhook = (endpoints: Endpoints, callback?: CallbackFn<void>): Promise<void> => {
    return asyncStyle(done => {
        endpoints.notifications.deregisterWebhook(() => {
            done(null, null);
        });
    }, callback);
};
