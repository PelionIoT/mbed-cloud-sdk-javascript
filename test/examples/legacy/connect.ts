/* tslint:disable: no-console */
import { ConnectApi, SDK } from "../../../src";

describe("connect examples", () => {

    test("subscribe to resource values", async () => {
        // an example: subscribe to resource values
        // cloak
        /*
        // uncloak
        import { ConnectApi } from "mbed-cloud-sdk";
        // cloak
        */
        // uncloak

        const connect = new ConnectApi();

        const observer = connect.subscribe.resourceValues({
            deviceId: "*",
        });

        while (true) {
            console.log(await observer.once());
            // cloak
            break;
            // uncloak
        }
        // end of example
    });

    test("get and set a resource value", async () => {
        // an example: get and set a resource value
        // cloak
        /*
        // uncloak
        import { ConnectApi, SDK } from "mbed-cloud-sdk";
        // cloak
        */
        const sdk = new SDK();
        // uncloak

        // Use the Foundation interface to find a connected device.
        const device = await sdk.foundation().deviceRepository().list({
            filter: {
                state: "registered",
            }
        }).first();

        // Use the Legacy interface for find resources
        const connectApi = new ConnectApi({
            autostartNotifications: true,
        });

        // Find an observable resource
        const resource = (await connectApi.listResources(device.id))
            .filter(r => r.observable).pop();

        // Set a resource value
        await connectApi.setResourceValue(device.id, resource.path, "12");

        // Get a resource value
        const value = await connectApi.getResourceValue(device.id, resource.path);
        console.log(`Device ${device.id}, path ${resource.path}, current value: ${value}`);

        await connectApi.stopNotifications();
        // end of example
    });
});
