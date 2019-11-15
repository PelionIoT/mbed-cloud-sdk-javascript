import * as superagent from "superagent";
import { Logger } from "typescript-logging";
import { SDKError } from "../..";
import { ConnectApi } from "../../../";
import { Subscribe } from "../../../primary/subscribe/subscribe";
import { asyncStyle, parseResourceValue } from "../../common/functions";
import { CallbackFn } from "../../common/interfaces";
import { Endpoints } from "../endpoints";
import { DeviceEventAdapter } from "../models/deviceEventAdapter";
import { AsyncResponseItem, AsyncResponseStatus, ConnectEvents, DeliveryMethod, NotificationObject } from "../types";

export const notify = (
    connect: ConnectApi,
    subscribe: Subscribe,
    notifyFns: { [key: string]: AsyncResponseItem },
    asyncFns: { [key: string]: AsyncResponseItem },
    data: NotificationObject
) => {
    // Data can be null
    if (!data) {
        return;
    }

    subscribe.notifyAllNotifications(data);

    if (data["async-responses"]) {
        data["async-responses"].forEach(response => {
            const asyncID = response.id;
            const { fn, tlvParser, resource = {} } = asyncFns[asyncID] || {};
            if (fn) {
                if (response.status >= 400) {
                    const message = AsyncResponseStatus[response.status || 400];
                    const error = new SDKError(message, null, response.error, response.status);
                    fn(error, null);
                } else {
                    const body = response.payload
                        ? parseResourceValue({
                              payload: response.payload,
                              resource: { ...resource, contentType: response.ct },
                              tlvParser,
                          })
                        : null;
                    fn(null, body);
                }
                delete asyncFns[asyncID];
            }
        });
    }

    if (data.notifications) {
        data.notifications.forEach(notification => {
            const body = notification.payload
                ? parseResourceValue({
                      payload: notification.payload,
                      resource: { contentType: notification.ct },
                  }).toString()
                : null;
            const path = `${notification.ep}${notification.path}`;
            const { fn } = notifyFns[path] || {};
            if (fn) {
                fn(null, body);
            }

            connect.emit(ConnectEvents.EVENT_NOTIFICATION, {
                id: notification.ep,
                path: notification.path,
                payload: body,
            });

            subscribe.notifyResourceValues({
                deviceId: notification.ep,
                path: notification.path,
                payload: body,
                maxAge: notification["max-age"],
                contentType: notification.ct,
            });
        });
    }

    if (data.registrations) {
        data.registrations.forEach(device => {
            const map = DeviceEventAdapter.map(device, "registration");
            subscribe.notifyDeviceEvents(map);
            connect.emit(ConnectEvents.EVENT_REGISTRATION, map);
        });
    }

    if (data["reg-updates"]) {
        data["reg-updates"].forEach(device => {
            const map = DeviceEventAdapter.map(device, "reregistration");
            subscribe.notifyDeviceEvents(map);
            connect.emit(ConnectEvents.EVENT_REREGISTRATION, map);
        });
    }

    if (data["de-registrations"]) {
        data["de-registrations"].forEach(deviceId => {
            const map = DeviceEventAdapter.mapId(deviceId, "deregistration");
            subscribe.notifyDeviceEvents(map);
            connect.emit(ConnectEvents.EVENT_DEREGISTRATION, deviceId);
        });
    }

    if (data["registrations-expired"]) {
        data["registrations-expired"].forEach(deviceId => {
            const map = DeviceEventAdapter.mapId(deviceId, "expired");
            subscribe.notifyDeviceEvents(map);
            connect.emit(ConnectEvents.EVENT_EXPIRED, deviceId);
        });
    }
};

export const startNotifications = (
    connect: ConnectApi,
    pollRequest,
    endpoints: Endpoints,
    log: Logger,
    deliveryMethod: DeliveryMethod,
    subscribe: Subscribe,
    notifyFns: { [key: string]: AsyncResponseItem },
    asyncFns: { [key: string]: AsyncResponseItem },
    options?: any,
    callback?: CallbackFn<void>
): Promise<void> => {
    options = options || {};
    if (typeof options === "function") {
        callback = options;
        options = {};
    }

    if (!deliveryMethod) {
        deliveryMethod = "CLIENT_INITIATED";
    }

    return asyncStyle(async done => {
        // cannot call start notifications if using webhooks
        if (deliveryMethod === "SERVER_INITIATED") {
            return done(new SDKError("cannot call start notifications if delivery method is server initiated"), null);
        }

        log.debug("starting notifications...");

        // websocket has been initalised and opened
        if (pollRequest) {
            log.debug("notifications already started");
            return done(null, null);
        }

        // websocket hasn't been started so lets set it up
        if (connect.forceClear) {
            await forceClearWebhook(connect, log);
        } else {
            if (await connect.getWebhook()) {
                return done(new SDKError("cannot call start notifications as a webhook already exists"), null);
            }
        }

        pollRequest = true;
        const { interval, requestCallback } = options;

        let serverErrorCount = 0;
        let networkErrorCount = 0;
        const poll = () => {
            pollRequest = endpoints.notifications.longPollNotifications((error, data) => {
                // If there is an error here it might be a connectivity error (for example ERR_NETWORK_CHANGED
                // may happen when switching between different networks, say between 4G and WiFi). We cannot
                // determine (in a portable way) the exact error then we retry a few times for all of them.
                if (error) {
                    ++networkErrorCount;

                    if (networkErrorCount <= ConnectApi.MAXIMUM_NUMBER_OF_RETRIES) {
                        setTimeout(poll, ConnectApi.DELAY_BETWEEN_RETRIES);
                    }

                    return;
                }

                // Check for server errors, 4xx errors raise an exception (see notify()) but we want to give
                // a chance to 5xx errors because they might be caused by a temporary condition. Note that
                // delay is "progressive", T for the first attempt, 2T for the second and so on.
                if (data["async-responses"]) {
                    const errors = data["async-responses"].filter(response => response.status >= 400);
                    const onlyServerErrors = errors.every(response => response.status >= 500);

                    if (errors.length > 0 && onlyServerErrors) {
                        ++serverErrorCount;

                        if (serverErrorCount <= ConnectApi.MAXIMUM_NUMBER_OF_RETRIES) {
                            setTimeout(poll, ConnectApi.DELAY_BETWEEN_RETRIES * serverErrorCount);
                            return;
                        }
                    }
                    // We already reached the maximum number of retries or it's a 4xx error, notify()
                    // will throw the appropriate exception.
                }
                notify(connect, subscribe, notifyFns, asyncFns, data);
                if (requestCallback && data["async-responses"]) {
                    requestCallback(error, data["async-responses"]);
                }
                // Each successful request resets these counters. TODO: we may want to keep track of them to stop trying
                // if they occurr to often but decision is arbitrary, we may expose an ErrorHandler object (which will also
                // include all the relevant stats) to let the caller decide what to do.
                serverErrorCount = 0;
                networkErrorCount = 0;
                setTimeout(poll, interval || 500);
            });
        };

        function start() {
            poll();
            done(null, null);
        }

        start();
    }, callback);
};

export const stopNotifications = (
    endpoints: Endpoints,
    pollRequest: superagent.SuperAgentRequest | boolean,
    log: Logger,
    deliveryMethod: DeliveryMethod,
    callback?: CallbackFn<void>
): Promise<void> => {
    return asyncStyle(async done => {
        // cannot call stop notifications if using webhooks
        if (deliveryMethod === "SERVER_INITIATED") {
            log.warn("should not call stop notifications if delivery method is server initiated");
            return done(null, null);
        }

        log.debug("stopping notifications...");

        // websocket is null or has been closed
        if (pollRequest) {
            log.debug("nothing to stop");
            return done(null, null);
        }

        endpoints.notifications.deleteLongPollChannel(() => {
            if (pollRequest) {
                // tslint:disable-next-line: no-string-literal
                if (pollRequest["abort"]) {
                    // tslint:disable-next-line: no-string-literal
                    pollRequest["abort"]();
                }
                pollRequest = null;
            }
            done(null, null);
        });
    }, callback);
};

const forceClearWebhook = async (connect: ConnectApi, log: Logger): Promise<void> => {
    log.warn("deleting any existing webhook connection");
    await connect.deleteWebhook();
};
