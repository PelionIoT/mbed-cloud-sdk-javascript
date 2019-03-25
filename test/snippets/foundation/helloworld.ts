// tslint:disable:no-console
import { DeviceRepository, SDK, Config } from "../../../src";

describe("hello world examples", () => {

    it("hello world with device repository", () => {
        // an example: hello_world
        // cloak
        /*
        // uncloak
        import { DeviceRepository, SDK } from "mbed-cloud-sdk";
        // cloak
        */
        // uncloak

        // create an instance of a device repository
        new DeviceRepository()
            // List the first 10 devices in your Pelion DM account
            .list({ maxResults: 10 })
            .executeForAll(device => console.log(`Hello device ${device.name}`));
        // end of example
    });

    it("hello world with sdk", () => {
        // an example: hello_world_with_sdk_instance
        // cloak
        /*
        // uncloak
        import { SDK } from "mbed-cloud-sdk";
        // cloak
        */
        // uncloak

        // create an instance of the Pelion Device Management SDK
        new SDK()
            .foundation()
            .deviceRepository()
            // List the first 10 devices in your Pelion DM account
            .list({ maxResults: 10 })
            .executeForAll(device => console.log(`Hello device ${device.name}`));
        // end of example
    });

    it("hello world with multiple api keys", () => {
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

        const accountOne = new SDK({ apiKey: process.env.account_one_api_key });
        accountOne
            .foundation()
            .deviceRepository()
            .list()
            .executeForAll(device => console.log(`account one device ${device.name}`));

        const accountTwo = new SDK({ apiKey: process.env.account_two_api_key });
        accountTwo
            .foundation()
            .deviceRepository()
            .list()
            .executeForAll(device => console.log(`account two device ${device.name}`));
        // end of example
    });

});
