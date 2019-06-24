// tslint:disable:no-console
import { DeviceRepository, SDK } from "../../../src";

describe("hello world examples", () => {

    test("hello world", async () => {
        // an example: hello_world
        // cloak
        /*
        // uncloak
        import { DeviceRepository } from "mbed-cloud-sdk";
        // cloak
        */
        // uncloak

        const main = async () => {
            // create an instance of a device repository
            const deviceList = new DeviceRepository()
                // List the first 10 devices in your Pelion DM account
                .list({ maxResults: 10 });

            for await (const device of deviceList) {
                console.log(`Hello device ${device.name}`);
            }
        };

        main();
        // end of example
    });

    test("hello world with sdk instance", async () => {
        // an example: hello_world_with_sdk_instance
        // cloak
        /*
        // uncloak
        import { SDK } from "mbed-cloud-sdk";
        // cloak
        */
        // uncloak

        const main = async () => {
            // create an instance of the Pelion Device Management SDK
            const deviceList = new SDK()
                .foundation()
                .deviceRepository()
                // List the first 10 devices in your Pelion DM account
                .list({ maxResults: 10 });

            for await (const device of deviceList) {
                console.log(`Hello device ${device.name}`);
            }
        };

        main();
        // end of example
    });

    test("hello world with multiple api keys", async () => {
        const sdk = new SDK();
        process.env.account_one_api_key = sdk.config.apiKey;
        process.env.account_two_api_key = sdk.config.apiKey;
        // an example: hello_world_with_multiple_api_keys
         // cloak
        /*
        // uncloak
        import { SDK } from "mbed-cloud-sdk";
        // cloak
        */
        // uncloak

        const main = async () => {
            const accountOne = new SDK({ apiKey: process.env.account_one_api_key });
            const deviceList = accountOne
                .foundation()
                .deviceRepository()
                .list();

            for await (const device of deviceList) {
                console.log(`account one device ${device.name}`);
            }

            const accountTwo = new SDK({ apiKey: process.env.account_two_api_key });
            accountTwo
                .foundation()
                .deviceRepository()
                .list();

            for await (const device of deviceList) {
                console.log(`account two device ${device.name}`);
            }
        };

        main();
        // end of example
    });

});
