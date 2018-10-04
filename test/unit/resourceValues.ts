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
import { Subscribe } from "../../src/subscribe/subscribe";
import { PresubscriptionObject, NotificationData } from "../../src/connect/types";

suite("testResourceValues", () => {

    test("presubscriptionConstruction", () => {
        const subscribe = new Subscribe();
        const observer = subscribe.resourceValues({ deviceId: "2", resourcePaths: [ "3/0/*", "4/0/1" ] });
        const presub: PresubscriptionObject = { deviceId: "2", resourcePaths: [ "3/0/*", "4/0/1" ] };
        assert.deepEqual(presub, observer.localPresubscriptions[0]);
    });

    test("multiplePresubscriptionConstruction", () => {
        const subscribe = new Subscribe();
        const observer = subscribe.resourceValues({ deviceId: [ "2", "3" ], resourcePaths: [ "3/0/*", "4/0/1" ] });
        const presubs: Array<PresubscriptionObject> = [ { deviceId: "2", resourcePaths: [ "3/0/*", "4/0/1" ] }, { deviceId: "3", resourcePaths: [ "3/0/*", "4/0/1" ] } ];
        assert.deepEqual(presubs, observer.localPresubscriptions);
    });

    test("subscribingToOneDevice", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: "1" });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 3);
        mockNotify(subscribe);
        assert.lengthOf(items, 6);
    });

    test("subscribingToMultipleDevices", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: [ "1", "2" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 6);
        mockNotify(subscribe);
        assert.lengthOf(items, 12);
    });

    test("subscribingToResourcePath", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ resourcePaths: [ "/3/0/0" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 5);
        mockNotify(subscribe);
        assert.lengthOf(items, 10);
    });

    test("subscribingToOneDeviceAndResourcePath", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: "2", resourcePaths: [ "/3/0/0" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 1);
        mockNotify(subscribe);
        assert.lengthOf(items, 2);
    });

    test("subscribingToOneDeviceAndResourcePaths", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: "2", resourcePaths: [ "/3/0/0", "/3/0/1" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 2);
        mockNotify(subscribe);
        assert.lengthOf(items, 4);
    });

    test("subscribingToMultipleDevicesAndResourcePath", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: [ "2", "3" ], resourcePaths: [ "/3/0/0" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 2);
        mockNotify(subscribe);
        assert.lengthOf(items, 4);
    });

    test("subscribingToMultipleDevicesAndResourcePaths", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: [ "2", "3" ], resourcePaths: [ "/3/0/0", "/3/0/1" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 4);
        mockNotify(subscribe);
        assert.lengthOf(items, 8);
    });

    test("subscribingToOneDeviceWildcard", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: "*" });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 15);
        mockNotify(subscribe);
        assert.lengthOf(items, 30);
    });

    test("subscribingToOneDeviceAndResourcePathWildcard", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: "2", resourcePaths: [ "/3/*" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        assert.lengthOf(items, 3);
        mockNotify(subscribe);
        assert.lengthOf(items, 6);
    });
});

export function mockNotify(subscribe: Subscribe): void {
    const notificationList: Array<NotificationData> = [
        { deviceId: "1", path: "/3/0/0", payload: "SGK=" },
        { deviceId: "1", path: "/3/0/1", payload: "SGK=" },
        { deviceId: "1", path: "/3/0/2", payload: "SGK=" },
        { deviceId: "2", path: "/3/0/0", payload: "SGK=" },
        { deviceId: "2", path: "/3/0/1", payload: "SGK=" },
        { deviceId: "2", path: "/3/0/2", payload: "SGK=" },
        { deviceId: "3", path: "/3/0/0", payload: "SGK=" },
        { deviceId: "3", path: "/3/0/1", payload: "SGK=" },
        { deviceId: "3", path: "/3/0/2", payload: "SGK=" },
        { deviceId: "4", path: "/3/0/0", payload: "SGK=" },
        { deviceId: "4", path: "/3/0/1", payload: "SGK=" },
        { deviceId: "4", path: "/3/0/2", payload: "SGK=" },
        { deviceId: "5", path: "/3/0/0", payload: "SGK=" },
        { deviceId: "5", path: "/3/0/1", payload: "SGK=" },
        { deviceId: "5", path: "/3/0/2", payload: "SGK=" },
    ];

    notificationList.forEach( item => subscribe.notifyResourceValues(item));
}
