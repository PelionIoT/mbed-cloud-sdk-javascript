import { AccountRepository, ApiKeyRepository } from "../../../src/sdk/entities";
import { Config, SDK } from "../../../src/sdk";

describe("entities", () => {
    test("quick", async () => {
        try {
            // an example: checking account status
            const myAccount = await new AccountRepository().me();
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
            const allKeys = await new ApiKeyRepository().list().all();
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
            [ "ak_1", "ak_2" ].forEach(async k => allUsers.concat(await new SDK(new Config({ apiKey: k })).entities.userRepository().list().all()));
            // end of example
        } catch (e) {
            throw e;
        }
    });

    test("realyCustomConfig", () => {
        try {
            // an example: using custom hosts
            const config = new Config({ apiKey: "ak_1", host: "http://example" });
            const allUsers = new SDK(config).entities.userRepository().list().all();
            // end of example
            expect(allUsers).not.toBeNull();
        } catch (e) {
            throw e;
        }
    });
});
