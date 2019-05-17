/* tslint:disable: no-console */
import { SDK } from "../../../src";

describe("examples of making custom api calls", () => {

    test("custom api call", async () => {
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
