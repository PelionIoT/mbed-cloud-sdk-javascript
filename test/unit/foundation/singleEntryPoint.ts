import { SDK } from "../../../src";
import { UserRepository } from "../../../src/foundation";
import { Config } from "../../../src";

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

        const user = sdk.foundation().userRepository();

        expect("Bearer ak_1").toEqual(user.config.apiKey);
    });

    test("config with callback for key", () => {
        const sdk = new SDK(new Config({ apiKey: () => "ak_1_arrow" }));
        expect("Bearer ak_1_arrow").toEqual(sdk.config.apiKey);

        const user = sdk.foundation().userRepository();

        expect("Bearer ak_1_arrow").toEqual(user.config.apiKey);
    });

    test("config with incrementing callback for key", () => {
        let count = 0;
        const sdk = new SDK(new Config({ apiKey: () => `ak_1_arrow_${count++}` }));
        expect("Bearer ak_1_arrow_0").toEqual(sdk.config.apiKey);
        expect("Bearer ak_1_arrow_1").toEqual(sdk.config.apiKey);

        const user = sdk.foundation().userRepository();

        expect("Bearer ak_1_arrow_2").toEqual(user.config.apiKey);
        expect("Bearer ak_1_arrow_3").toEqual(user.config.apiKey);
        expect("Bearer ak_1_arrow_4").toEqual(user.config.apiKey);
    });

    test("config with incrementing callback for key with interface", () => {
        let count = 0;
        const sdk = new SDK({ apiKey: () => `ak_1_arrow_${count++}` });
        expect("Bearer ak_1_arrow_0").toEqual(sdk.config.apiKey);
        expect("Bearer ak_1_arrow_1").toEqual(sdk.config.apiKey);

        const user = sdk.foundation().userRepository();

        expect("Bearer ak_1_arrow_2").toEqual(user.config.apiKey);
        expect("Bearer ak_1_arrow_3").toEqual(user.config.apiKey);
        expect("Bearer ak_1_arrow_4").toEqual(user.config.apiKey);
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

        const user2 = sdk.foundation().userRepository();
        expect("Bearer ak_1").toEqual(user2.config.apiKey);
    });
});
