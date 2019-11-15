/* tslint:disable: no-console */
import { SDK } from "../../../src";

describe("examples of making custom api calls", () => {
    test("custom api call", () => {
        try {
            // an example: custom api call
            (async () => {
                const sdk = new SDK();
                const users = await sdk.client.CallApi({ url: "/v3/users", method: "GET", query: { limit: 2 } });
                // cloak
                expect(users).toHaveProperty("data");
                // uncloak
            })();
            // end of example
        } catch (e) {
            throw e;
        }
    });
});
