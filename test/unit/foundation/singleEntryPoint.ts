import { SDK } from "../../../src/sdk";
import { User } from "../../../src/sdk/entities";
import { Config } from "../../../src/sdk/client/config";

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

describe("singleEntryPoint", () => {

    test("global config", () => {
        const sdk = new SDK();
        expect(sdk.getConfig()).not.toBeNull();
        expect(sdk.getConfig().apiKey).toBeDefined();
    });

    test("global config from entity", () => {
        const user = new User();
        expect(user.config).not.toBeNull();
        expect(user.config.apiKey).toBeDefined();
    });

    test("sdk instance", () => {
        const sdk = new SDK({ apiKey: "ak_1" });
        expect("Bearer ak_1").toEqual(sdk.getConfig().apiKey);

        const user = sdk.entities.User();

        expect("Bearer ak_1").toEqual(user.config.apiKey);
    });

    test("multiple sdk instances", () => {
        const sdk1 = new SDK({ apiKey: "ak_1" });
        expect("Bearer ak_1").toEqual(sdk1.getConfig().apiKey);

        const sdk2 = new SDK({ apiKey: "ak_2" });
        expect("Bearer ak_2").toEqual(sdk2.getConfig().apiKey);
    });

    test("reusable config", () => {
        const config = new Config({ apiKey: "ak_1" });
        const sdk = new SDK(config);

        expect("Bearer ak_1").toEqual(sdk.getConfig().apiKey);

        const user = new User(config);
        expect("Bearer ak_1").toEqual(user.config.apiKey);

        const sdk2 = new SDK(config);
        expect("Bearer ak_1").toEqual(sdk2.getConfig().apiKey);

        const user2 = sdk.entities.User();
        expect("Bearer ak_1").toEqual(user2.config.apiKey);
    });
});
