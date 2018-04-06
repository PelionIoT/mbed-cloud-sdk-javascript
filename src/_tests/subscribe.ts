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

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

import { Subscribe } from "../connect/subscribe/subscribe";
import { DeviceEvent } from "../connect/types";
import { Resource } from "../connect/models/resource";

suite("testSubscribe", () => {

    test("allEvents", () => {
        const subscribe = new Subscribe();
        const items: Array<DeviceEvent<Resource>> = [];
        const observer = subscribe.deviceState();
        observer.addCallback(res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 36);
        mockNotify(subscribe);
        assert.lengthOf(items, 72);
    });

    test("oneDeviceId", () => {
        const subscribe = new Subscribe();
        const items: Array<DeviceEvent<Resource>> = [];
        const observer = subscribe.deviceState({ id: "1" });
        observer.addCallback(res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 8);
        mockNotify(subscribe);
        assert.lengthOf(items, 16);
    });

    test("multipleDeviceId", () => {
        const subscribe = new Subscribe();
        const items: Array<DeviceEvent<Resource>> = [];
        const observer = subscribe.deviceState({ id: [ "1", "2" ] });
        observer.addCallback(res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 16);
        mockNotify(subscribe);
        assert.lengthOf(items, 32);
    });

    test("oneState", () => {
        const subscribe = new Subscribe();
        const items: Array<DeviceEvent<Resource>> = [];
        const observer = subscribe.deviceState({ event: "registration" });
        observer.addCallback(res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 9);
        mockNotify(subscribe);
        assert.lengthOf(items, 18);
    });

    test("multipleStates", () => {
        const subscribe = new Subscribe();
        const items: Array<DeviceEvent<Resource>> = [];
        const observer = subscribe.deviceState({ event: [ "registration", "deregistration" ] });
        observer.addCallback(res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 18);
        mockNotify(subscribe);
        assert.lengthOf(items, 36);
    });

    test("specific", () => {
        const subscribe = new Subscribe();
        const items: Array<DeviceEvent<Resource>> = [];
        const observer = subscribe.deviceState({ id: "1", event: "registration" });
        observer.addCallback(res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 2);
        mockNotify(subscribe);
        assert.lengthOf(items, 4);
    });

    test("multipleSpecific", () => {
        const subscribe = new Subscribe();
        const items: Array<DeviceEvent<Resource>> = [];
        const observer = subscribe.deviceState({ id: [ "1", "3" ], event: [ "registration", "deregistration" ] });
        observer.addCallback(res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 8);
        mockNotify(subscribe);
        assert.lengthOf(items, 16);
    });
});

export function mockNotify(subscribe: Subscribe): void {
    const regList: Array<DeviceEvent<Resource>> = [
        { id: "1", event: "registration" },
        { id: "1", event: "registration" },
        { id: "2", event: "registration" },
        { id: "2", event: "registration" },
        { id: "3", event: "registration" },
        { id: "3", event: "registration" },
        { id: "4", event: "registration" },
        { id: "4", event: "registration" },
        { id: "5", event: "registration" },
        { id: "1", event: "reregistration" },
        { id: "1", event: "reregistration" },
        { id: "2", event: "reregistration" },
        { id: "2", event: "reregistration" },
        { id: "3", event: "reregistration" },
        { id: "3", event: "reregistration" },
        { id: "4", event: "reregistration" },
        { id: "4", event: "reregistration" },
        { id: "5", event: "reregistration" },
        { id: "1", event: "deregistration" },
        { id: "1", event: "deregistration" },
        { id: "2", event: "deregistration" },
        { id: "2", event: "deregistration" },
        { id: "3", event: "deregistration" },
        { id: "3", event: "deregistration" },
        { id: "4", event: "deregistration" },
        { id: "4", event: "deregistration" },
        { id: "5", event: "deregistration" },
        { id: "1", event: "expired" },
        { id: "1", event: "expired" },
        { id: "2", event: "expired" },
        { id: "2", event: "expired" },
        { id: "3", event: "expired" },
        { id: "3", event: "expired" },
        { id: "4", event: "expired" },
        { id: "4", event: "expired" },
        { id: "5", event: "expired" },
    ];

    regList.forEach(item => subscribe.notify(item));
}
