import { Account, ApiKey, User } from "../../../src/sdk/entities";
import { Config, SDK } from "../../../src/sdk";

describe("entities", () => {
    test("quick", async () => {
        try {
            // an example: checking account status
            const myAccount = await new Account().me();
            const isActive = myAccount.status === "ACTIVE";
            // end of example
            expect(isActive).toBeTruthy();
        } catch (e) {
            throw e;
        }
    });

    test("listing", async () => {
        try {
            // an example: listing api keys
            const allKeys = await new ApiKey().list().all();
            const names = allKeys.map( k => k.name);
            // end of example
            expect(names.length).toBeGreaterThan(1);
        } catch (e) {
            throw e;
        }
    });

    test("customConfig", () => {
        try {
            // an example: using multiple api keys
            const allUsers = [];
            [ "ak_1", "ak_2" ].forEach(async k => allUsers.concat(await new SDK(new Config({ apiKey: k })).entities.User().list().all()));
            // end of example
        } catch (e) {
            throw e;
        }
    });

    test("realyCustomConfig", () => {
        try {
            // an example: using custom hosts
            const config = new Config({ apiKey: "ak_1", host: "http://example" });
            const allUsers = new SDK(config).entities.User().list().all();
            // end of example
            expect(allUsers).not.toBeNull();

            const user = new User();
            expect(user.config.apiKey).not.toEqual(config.apiKey);
            expect(user.config.host).not.toEqual(config.host);

            const sdk = new SDK();
            expect(sdk.config.apiKey).not.toEqual(config.apiKey);
            expect(sdk.config.host).not.toEqual(config.host);
        } catch (e) {
            throw e;
        }
    });
});
