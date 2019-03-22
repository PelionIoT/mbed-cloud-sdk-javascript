// tslint:disable:no-console
import { DeviceRepository, SDK } from "../../../src";

describe("hello world examples", () => {

    it("hello world with device repository", () => {
        // an example: hello_world
        new DeviceRepository().list().executeForAll(device => console.log(device.name));
        // end of example
    });

    it("hello world with sdk", () => {
        // an example: hello_world_with_sdk_instance
        new SDK().foundation().deviceRepository().list().executeForAll(device => console.log(device.name));
        // end of example
    });

});
