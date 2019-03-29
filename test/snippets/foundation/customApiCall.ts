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

import { SDK } from "../../../src";

describe("customApiCall", () => {
    test("customApiCall", async () => {
        try {
            // an example: custom api call
            const sdk = new SDK();
            const users = await sdk.client.CallApi({ url: "/v3/users", method: "GET", query: { limit: 2 } });
            // end of example
            expect(users).toHaveProperty("data");
        } catch (e) {
            throw e;
        }
    });
});
