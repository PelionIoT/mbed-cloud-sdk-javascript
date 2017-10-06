const { suite, test, beforeEach } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

import { ConnectApi } from "../connect/connectApi";

// Test connectApi events and notifications
suite("connectEvents", () => {

    let api: ConnectApi;

    beforeEach(() => {
        api = new ConnectApi({
            apiKey: "key"
        });
    });

    test("should emit notification", ctx => {

        const dfd = ctx.async(1000);

        api.on(ConnectApi.EVENT_NOTIFICATION, device => {
            assert.strictEqual(device.id, "device-id");
            dfd.resolve();
        });
        api.on(ConnectApi.EVENT_REGISTRATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_REREGISTRATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_DEREGISTRATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_EXPIRED, () => {
            assert(false);
        });

        api.notify({
            notifications: [ { ep: "device-id" } ]
        });
    });

    test("should emit registration", ctx => {

        const dfd = ctx.async(1000);

        api.on(ConnectApi.EVENT_NOTIFICATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_REGISTRATION, device => {
            assert.strictEqual(device.id, "device-id");
            dfd.resolve();
        });
        api.on(ConnectApi.EVENT_REREGISTRATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_DEREGISTRATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_EXPIRED, () => {
            assert(false);
        });

        api.notify({
            registrations: [ { ep: "device-id" } ]
        });
    });

    test("should emit re-registration", ctx => {

        const dfd = ctx.async(1000);

        api.on(ConnectApi.EVENT_NOTIFICATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_REGISTRATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_REREGISTRATION, device => {
            assert.strictEqual(device.id, "device-id");
            dfd.resolve();
        });
        api.on(ConnectApi.EVENT_DEREGISTRATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_EXPIRED, () => {
            assert(false);
        });

        api.notify({
            "reg-updates": [ { ep: "device-id" } ]
        });
    });

    test("should emit de-registration", ctx => {

        const dfd = ctx.async(1000);

        api.on(ConnectApi.EVENT_NOTIFICATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_REGISTRATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_REREGISTRATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_DEREGISTRATION, id => {
            assert.strictEqual(id, "device-id");
            dfd.resolve();
        });
        api.on(ConnectApi.EVENT_EXPIRED, () => {
            assert(false);
        });

        api.notify({
            "de-registrations": [ "device-id" ]
        });
    });

    test("should emit expired", ctx => {

        const dfd = ctx.async(1000);

        api.on(ConnectApi.EVENT_NOTIFICATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_REGISTRATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_REREGISTRATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_DEREGISTRATION, () => {
            assert(false);
        });
        api.on(ConnectApi.EVENT_EXPIRED, id => {
            assert.strictEqual(id, "device-id");
            dfd.resolve();
        });

        api.notify({
            "registrations-expired": [ "device-id" ]
        });
    });

    test("should notify", ctx => {

        const dfd = ctx.async(1000);
        const deviceId = "device-id";
        const devicePath = "test";
        const payload = "test-payload";
        const notifyFns = {};

        notifyFns[`${deviceId}${devicePath}`] = value => {
            assert.strictEqual(value, payload);
            dfd.resolve();
        };

        // tslint:disable-next-line:no-string-literal
        api["_notifyFns"] = notifyFns;

        api.notify({
            notifications: [ {
                ep: deviceId,
                path: devicePath,
                payload: new Buffer(payload).toString("base64")
            } ]
        });
    });

    test("should respond to async", ctx => {

        const dfd = ctx.async(1000);
        const asyncId = "async-id";
        const payload = "test-payload";
        const asyncFns = {};

        asyncFns[asyncId] = (_error, value) => {
            assert.strictEqual(value, payload);
            dfd.resolve();
        };

        // tslint:disable-next-line:no-string-literal
        api["_asyncFns"] = asyncFns;

        api.notify({
            "async-responses": [ {
                id: asyncId,
                payload: new Buffer(payload).toString("base64")
            } ]
        });
    });

    test("should emit multiple", ctx => {

        const notifications = {
            "notifications": [ "1", "2" ],
            "registrations": [ "1", "2" ],
            "reg-updates": [ "1", "2" ],
            "de-registrations": [ "1", "2" ],
            "registrations-expired": [ "1", "2" ]
        };

        const notificationCount = Object.keys(notifications).length * 2;
        const dfd = ctx.async(1000, notificationCount);

        api.on(ConnectApi.EVENT_NOTIFICATION, () => {
            dfd.resolve();
        });
        api.on(ConnectApi.EVENT_REGISTRATION, () => {
            dfd.resolve();
        });
        api.on(ConnectApi.EVENT_REREGISTRATION, () => {
            dfd.resolve();
        });
        api.on(ConnectApi.EVENT_DEREGISTRATION, () => {
            dfd.resolve();
        });
        api.on(ConnectApi.EVENT_EXPIRED, () => {
            dfd.resolve();
        });

        api.notify(notifications);
    });
});
