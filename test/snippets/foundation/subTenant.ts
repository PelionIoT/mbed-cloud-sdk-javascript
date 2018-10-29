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

import { User, SubtenantAccount } from "../../../src/sdk/entities";
import { Config } from "../../../src/sdk";

describe("subTenants", () => {
    test("subTenant", async () => {
        try {
            // an example: creating and managing a subtenant account
            const newSubtenant = new SubtenantAccount();
            newSubtenant.displayName = "sdk test dan";
            newSubtenant.endMarket = "connected warrens";
            newSubtenant.adminFullName = "dan the wombat";
            newSubtenant.adminEmail = "dan@example.com";

            // when creating a new subtenant, this is the only opportunity to obtain
            // the `admin_key` for that subtenant account
            await newSubtenant.create();

            // now log in as this subtenant using the `admin_key`
            const user = new User(new Config({ apiKey: newSubtenant.adminKey }));
            user.fullName = "tommi the wombat";
            user.username = "tommi_wombat";
            user.phoneNumber = "0800001066";
            user.email = "tommi_wombat@email.com";

            // and add another user
            await user.create();

            // back as the aggregator again ...
            const users = await newSubtenant.list().all();
            // end of example

            expect(users.length).toBeGreaterThanOrEqual(1);
            await user.delete();
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
            throw e;
        }
    });
});
