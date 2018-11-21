/*
* Mbed Cloud JavaScript SDK
* Copyright Arm Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { ConnectApi } from "../../src/connect/connectApi";

describe("connectEvents", () => {

    let api: ConnectApi;

    beforeEach(() => {
        api = new ConnectApi({
            apiKey: "key",
        });
    });

    test("should emit notification", done => {
        api.on(ConnectApi.EVENT_NOTIFICATION, device => {
            expect(device.id).toBe("device-id");
            done();
        });
        api.on(ConnectApi.EVENT_REGISTRATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_REREGISTRATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_DEREGISTRATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_EXPIRED, () => {
            expect(false).toBeTruthy();
        });

        api.notify({
            notifications: [ { ep: "device-id" } ],
        });
    });

    test("should emit registration", done => {
        api.on(ConnectApi.EVENT_NOTIFICATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_REGISTRATION, device => {
            expect(device.id).toBe("device-id");
            done();
        });
        api.on(ConnectApi.EVENT_REREGISTRATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_DEREGISTRATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_EXPIRED, () => {
            expect(false).toBeTruthy();
        });

        api.notify({
            registrations: [ { ep: "device-id" } ],
        });
    }, 1000);

    test("should emit re-registration", done => {
        api.on(ConnectApi.EVENT_NOTIFICATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_REGISTRATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_REREGISTRATION, device => {
            expect(device.id).toBe("device-id");
            done();
        });
        api.on(ConnectApi.EVENT_DEREGISTRATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_EXPIRED, () => {
            expect(false).toBeTruthy();
        });

        api.notify({
            "reg-updates": [ { ep: "device-id" } ],
        });
    }, 1000);

    test("should emit de-registration", done => {
        api.on(ConnectApi.EVENT_NOTIFICATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_REGISTRATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_REREGISTRATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_DEREGISTRATION, id => {
            expect(id).toBe("device-id");
            done();
        });
        api.on(ConnectApi.EVENT_EXPIRED, () => {
            expect(false).toBeTruthy();
        });

        api.notify({
            "de-registrations": [ "device-id" ],
        });
    }, 1000);

    test("should emit expired", done => {
        api.on(ConnectApi.EVENT_NOTIFICATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_REGISTRATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_REREGISTRATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_DEREGISTRATION, () => {
            expect(false).toBeTruthy();
        });
        api.on(ConnectApi.EVENT_EXPIRED, id => {
            expect(id).toBe("device-id");
            done();
        });

        api.notify({
            "registrations-expired": [ "device-id" ],
        });
    }, 1000);

    test("should emit multiple", done => {

        const notifications = {
            "notifications": [ "1", "2" ],
            "registrations": [ "1", "2" ],
            "reg-updates": [ "1", "2" ],
            "de-registrations": [ "1", "2" ],
            "registrations-expired": [ "1", "2" ],
        };

        api.on(ConnectApi.EVENT_NOTIFICATION, () => {
            done();
        });
        api.on(ConnectApi.EVENT_REGISTRATION, () => {
            done();
        });
        api.on(ConnectApi.EVENT_REREGISTRATION, () => {
            done();
        });
        api.on(ConnectApi.EVENT_DEREGISTRATION, () => {
            done();
        });
        api.on(ConnectApi.EVENT_EXPIRED, () => {
            done();
        });

        api.notify(notifications);
    });
});

describe("notifications", () => {

    let api: ConnectApi;

    function encode(payload) {
        if (typeof btoa === "function") { return btoa(payload); }
        return new Buffer(payload).toString("base64");
    }

    beforeEach(() => {
        api = new ConnectApi({
            apiKey: "key",
        });
    });

    test("should notify", done => {

        const deviceId = "device-id";
        const devicePath = "test";
        const payload = "test-payload";
        const notifyFns = {};

        notifyFns[`${deviceId}${devicePath}`] = value => {
            expect(value).toBe(payload);
            done();
        };

        // tslint:disable-next-line:no-string-literal
        api["_notifyFns"] = notifyFns;

        api.notify({
            notifications: [ {
                ep: deviceId,
                path: devicePath,
                payload: encode(payload),
            } ],
        });
    });

    test("should respond to async", done => {

        const asyncId = "async-id";
        const payload = "test-payload";
        const asyncFns = {};

        asyncFns[asyncId] = (_error, value) => {
            expect(value).toBe(payload);
            done();
        };

        // tslint:disable-next-line:no-string-literal
        api["_asyncFns"] = asyncFns;

        api.notify({
            "async-responses": [ {
                id: asyncId,
                payload: encode(payload),
            } ],
        });
    });
});
