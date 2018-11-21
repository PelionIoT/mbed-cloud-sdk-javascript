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

import { DeviceDirectoryApi } from "../../src/deviceDirectory/deviceDirectoryApi";

describe("deviceDirectorySnippet", () => {

    test("listDevices", () => {
        try {
            // an example: list devices in Mbed Cloud
            const deviceDirectory = new DeviceDirectoryApi();

            const devices = deviceDirectory.listDevices({ order: "ASC" });

            devices.then( d => {
                d.data.map( item => `${item.id} [${item.state}]`)
                    .forEach( _ => {
                        // do something here
                    });
            });
            // end of example
        } catch (e) {
            throw e;
        }
    });

    test("listDevicesWithFilters", () => {
        try {
            // an example: list deregistered devices in Mbed Cloud
            const deviceDirectory = new DeviceDirectoryApi();

            const devices = deviceDirectory.listDevices({ order: "ASC", filter: { state: { $eq: "deregistered" } } });

            devices.then( d => {
                d.data.map( item => `${item.id} [${item.state}]`)
                    .forEach( _ => {
                        // do something here
                    });
            });
            // end of example
        } catch (e) {
            throw e;
        }
    });
});
