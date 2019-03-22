// tslint:disable:no-console
import { DeviceRepository, SDK } from "../../../src";

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
        import { DeviceRepository, SDK } from "mbed-cloud-sdk";
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

});
