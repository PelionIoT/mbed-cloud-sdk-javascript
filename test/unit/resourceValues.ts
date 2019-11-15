/*
* Pelion Device Management JavaScript SDK
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

import { Subscribe } from "../../src/primary/subscribe/subscribe";
import { PresubscriptionObject, NotificationData } from "../../src/legacy/connect/types";
import { ResourceValuesObserver } from "../../src/primary/subscribe/observers/resourceValuesObserver";

describe("resourceValues", () => {

    test("presubscriptionConstruction", () => {
        const subscribe = new Subscribe();
        const observer = subscribe.resourceValues({ deviceId: "2", resourcePaths: [ "3/0/*", "4/0/1" ] });
        const presub: PresubscriptionObject = { deviceId: "2", resourcePaths: [ "3/0/*", "4/0/1" ] };
        expect(presub).toEqual(observer.localPresubscriptions[0]);
    });

    test("multiplePresubscriptionConstruction", () => {
        const subscribe = new Subscribe();
        const observer = subscribe.resourceValues({ deviceId: [ "2", "3" ], resourcePaths: [ "3/0/*", "4/0/1" ] });
        const presubs: Array<PresubscriptionObject> = [ { deviceId: "2", resourcePaths: [ "3/0/*", "4/0/1" ] }, { deviceId: "3", resourcePaths: [ "3/0/*", "4/0/1" ] } ];
        expect(presubs).toEqual(observer.localPresubscriptions);
    });

    test("subscribingToOneDevice", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: "1" });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        expect(items).toHaveLength(3);
        mockNotify(subscribe);
        expect(items).toHaveLength(6);
    });

    test("subscribingToMultipleDevices", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: [ "1", "2" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        expect(items).toHaveLength(6);
        mockNotify(subscribe);
        expect(items).toHaveLength(12);
    });

    test("subscribingToResourcePath", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ resourcePaths: [ "/3/0/0" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        expect(items).toHaveLength(5);
        mockNotify(subscribe);
        expect(items).toHaveLength(10);
    });

    test("subscribingToOneDeviceAndResourcePath", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: "2", resourcePaths: [ "/3/0/0" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        expect(items).toHaveLength(1);
        mockNotify(subscribe);
        expect(items).toHaveLength(2);
    });

    test("subscribingToOneDeviceAndResourcePaths", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: "2", resourcePaths: [ "/3/0/0", "/3/0/1" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        expect(items).toHaveLength(2);
        mockNotify(subscribe);
        expect(items).toHaveLength(4);
    });

    test("subscribingToMultipleDevicesAndResourcePath", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: [ "2", "3" ], resourcePaths: [ "/3/0/0" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        expect(items).toHaveLength(2);
        mockNotify(subscribe);
        expect(items).toHaveLength(4);
    });

    test("subscribingToMultipleDevicesAndResourcePaths", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: [ "2", "3" ], resourcePaths: [ "/3/0/0", "/3/0/1" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        expect(items).toHaveLength(4);
        mockNotify(subscribe);
        expect(items).toHaveLength(8);
    });

    test("subscribingToOneDeviceWildcard", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: "*" });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        expect(items).toHaveLength(15);
        mockNotify(subscribe);
        expect(items).toHaveLength(30);
    });

    test("subscribingToOneDeviceAndResourcePathWildcard", () => {
        const subscribe = new Subscribe();
        const items: Array<NotificationData> = [];
        const observer = subscribe.resourceValues({ deviceId: "2", resourcePaths: [ "/3/*" ] });
        observer.addListener( res => items.push(res));
        mockNotify(subscribe);
        expect(items).toHaveLength(3);
        mockNotify(subscribe);
        expect(items).toHaveLength(6);
    });

    test("should return union of presubscriptions", () => {
        // tslint:disable-next-line: no-string-literal
        const unionOfPresubscriptions = new ResourceValuesObserver()["unionOfPresubscriptions"];

        const server: Array<PresubscriptionObject> = [
            {
                deviceId: "12345",
                resourcePaths: [
                    "3303/*"
                ]
            },
            {
                deviceId: "1234567",
                resourcePaths: [
                    "33303/*"
                ]
            },
        ];

        const local: Array<PresubscriptionObject> = [
            {
                deviceId: "12345",
                resourcePaths: [
                    "3303/*"
                ]
            }
        ];

        const union = unionOfPresubscriptions(server, local);

        expect(union).toHaveLength(2);
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
