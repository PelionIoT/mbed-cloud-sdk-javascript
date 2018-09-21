import { User, SubtenantAccount } from "../../../sdk/entities";

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

suite("subTennants", () => {
    test("subTennant", async () => {
        try {
            const newSubtennant = new SubtenantAccount();
            newSubtennant.displayName = "sdk test dan";
            newSubtennant.endMarket = "connected warrens";
            newSubtennant.adminFullName = "dan the wombat";
            newSubtennant.adminEmail = "dan@example.com";

            await newSubtennant.create();

            const user = new User({ apiKey: newSubtennant.adminKey });
            user.fullName = "tommi the wombat";
            user.username = "tommi_wombat";
            user.phoneNumber = "0800001066";
            user.email = "tommi_wombat@email.com";

            await user.create();

            assert.isOk(true);

            const users = await newSubtennant.list().all();
            // tslint:disable-next-line:no-console
            users.forEach(u => console.log(u));

            assert.isAtLeast(users.length, 1);
            await user.delete();
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
            throw e;
        }
    });
});
