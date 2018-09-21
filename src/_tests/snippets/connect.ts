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

import { ConnectApi } from "../../connect/connectApi";
const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("connectSnippet[skipci]", () => {

    test("subscribeToDeviceState", () => {
        try {
            // an example: subscribing to device state changes
            const connect = new ConnectApi();

            const observer = connect.subscribe.deviceStateChanges({ event: "registration" });

            observer.addListener(_res => {
                // do something here
            });
            // end of example
            assert.isOk(true);
        } catch (e) {
            throw e;
        }
    });

    test("subscribeToResourceValueChanges", () => {
        try {
            // an example: subscribing to resource value changes
            const connect = new ConnectApi();

            const observer = connect.subscribe.resourceValues({ deviceId: "016*", resourcePaths: [ "/3/0/*" ] });

            observer.addListener(_res => {
                // do something here
            });
            // end of example
        } catch (e) {
            throw e;
        }
    });
});
