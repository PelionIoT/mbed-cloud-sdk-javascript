import { SDK } from "../../../src/sdk";
import { UserRepository } from "../../../src/foundation";
import { Config } from "../../../src";

describe("singleEntryPoint", () => {

    test("global config", () => {
        const sdk = new SDK();
        expect(sdk.getConfig()).not.toBeNull();
        expect(sdk.getConfig().apiKey).toBeDefined();
    });

    test("global config from entity", () => {
        const user = new UserRepository();
        expect(user.getConfig()).not.toBeNull();
        expect(user.getConfig().apiKey).toBeDefined();
    });

    test("sdk instance", () => {
        const sdk = new SDK(new Config({ apiKey: "ak_1" }));
        expect("Bearer ak_1").toEqual(sdk.getConfig().apiKey);

        const user = sdk.entities().userRepository();

        expect("Bearer ak_1").toEqual(user.getConfig().apiKey);
    });

    test("multiple sdk instances", () => {
        const sdk1 = new SDK(new Config({ apiKey: "ak_1" }));
        expect("Bearer ak_1").toEqual(sdk1.getConfig().apiKey);

        const sdk2 = new SDK(new Config({ apiKey: "ak_2" }));
        expect("Bearer ak_2").toEqual(sdk2.getConfig().apiKey);
    });

    test("reusable config", () => {
        const config = new Config({ apiKey: "ak_1" });
        const sdk = new SDK(config);

        expect("Bearer ak_1").toEqual(sdk.getConfig().apiKey);

        const user = new UserRepository(config);
        expect("Bearer ak_1").toEqual(user.getConfig().apiKey);

        const sdk2 = new SDK(config);
        expect("Bearer ak_1").toEqual(sdk2.getConfig().apiKey);

        const user2 = sdk.entities().userRepository();
        expect("Bearer ak_1").toEqual(user2.getConfig().apiKey);
    });
});
