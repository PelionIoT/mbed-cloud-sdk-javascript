/* tslint:disable: no-console */
import { ConnectApi } from "../../../src";

describe("connect examples", () => {

    test("subscribeToDeviceStateChanges", async () => {
        // an example: subscribing to device state changes
        const connect = new ConnectApi();

        const observer = connect.subscribe.deviceStateChanges();

        observer.addListener(res => console.log(res));

        for (let i = 0; i < 10; i++) {
            console.log(await observer.once());
        }
        // end of example
    });

    test("subscribeToResourceVslueChanges", async () => {
        // an example: subscribing to resource value changes
        const connect = new ConnectApi();

        const observer = connect.subscribe.resourceValues({
            deviceId: "016*",
            resourcePaths: [
                "/3/0/*"
            ],
        });

        observer.addListener(res => console.log(res));

        for (let i = 0; i < 10; i++) {
            console.log(await observer.once());
        }
        // end of example
    });

    test("getAndSetResourceValues", async () => {
        // an example: resource values
        const connect = new ConnectApi({
            autostartNotifications: true,
        });

        const connectedDevice = (await connect.listConnectedDevices()).data[0];

        const resources = await connectedDevice.listResources();

        const observableResource = resources.filter(r => r.observable)[0];

        await connect.setResourceValue(observableResource.deviceId, observableResource.path, new Date().toString());

        const newValue = await connect.getResourceValue(observableResource.deviceId, observableResource.path);
        // end of example
    });
});
