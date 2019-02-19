import { SDK } from "../../../src/sdk";
import { UserRepository } from "../../../src/sdk/entities";
import { Config } from "../../../src/sdk/common/config";

describe("singleEntryPoint", () => {

    test("global config", () => {
        const sdk = new SDK();
        expect(sdk.config).not.toBeNull();
        expect(sdk.config.apiKey).toBeDefined();
    });

    test("global config from entity", () => {
        const user = new UserRepository();
        expect(user.config).not.toBeNull();
        expect(user.config.apiKey).toBeDefined();
    });

    test("sdk instance", () => {
        const sdk = new SDK(new Config({ apiKey: "ak_1" }));
        expect("Bearer ak_1").toEqual(sdk.config.apiKey);

        const user = sdk.entities().userRepository();

        expect("Bearer ak_1").toEqual(user.config.apiKey);
    });

    test("multiple sdk instances", () => {
        const sdk1 = new SDK(new Config({ apiKey: "ak_1" }));
        expect("Bearer ak_1").toEqual(sdk1.config.apiKey);

        const sdk2 = new SDK(new Config({ apiKey: "ak_2" }));
        expect("Bearer ak_2").toEqual(sdk2.config.apiKey);
    });

    test("reusable config", () => {
        const config = new Config({ apiKey: "ak_1" });
        const sdk = new SDK(config);

        expect("Bearer ak_1").toEqual(sdk.config.apiKey);

        const user = new UserRepository(config);
        expect("Bearer ak_1").toEqual(user.config.apiKey);

        const sdk2 = new SDK(config);
        expect("Bearer ak_1").toEqual(sdk2.config.apiKey);

        const user2 = sdk.entities().userRepository();
        expect("Bearer ak_1").toEqual(user2.config.apiKey);
    });
});
