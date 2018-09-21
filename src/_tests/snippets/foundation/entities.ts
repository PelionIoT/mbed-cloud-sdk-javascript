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

import { MyAccount, ApiKey } from "../../../sdk/entities";
import { Config, SDK } from "../../../sdk";
import { SDKError } from "../../../common/sdkError";
const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("entities", () => {
    test("quick", async () => {
        try {
            const myAccount = await new MyAccount().get();
            const isActive = myAccount.status === "ACTIVE";
            assert.isOk(isActive);
        } catch (e) {
            throw e;
        }
    });

    test("listing", async () => {
        try {
            const allKeys = await new ApiKey().list().all();
            const names = allKeys.map(k => k.name);
            assert.isAtLeast(names.length, 1);
        } catch (e) {
            throw e;
        }
    });

    test("customConfig", () => {
        assert.throws(() => {
            try {
                const allUsers = [];
                [ "ak_1", "ak_2" ].forEach(async k => allUsers.concat(await new SDK({ apiKey: k }).entities.User().list().all()));
            } catch (e) {
                throw e;
            }
        }, SDKError);
    });

    test("realyCustomConfig", () => {
        assert.throws(() => {
            try {
                const config = new Config({ apiKey: "ak_1", host: "http://example" });
                const allUsers = new SDK(config).entities.User().list().all();
                assert.isOk(allUsers);
            } catch (e) {
                throw e;
            }
        }, SDKError);
    });
});
