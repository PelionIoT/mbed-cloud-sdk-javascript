import { ConnectApi } from "./src";

const apiKey = "ak_1MDE2ODVjNzVjOTdjMjJjMTFjMDQ0ZDUzMDAwMDAwMDA0168b949978cf65f42b0f3e1000000000DNrDQsaXkJWwEQLcbbPUnWafTigsGbn";
const host = "https://api-ns-websocket.mbedcloudintegration.net";

const api = new ConnectApi({
    apiKey,
    host,
});

async function main() {

    // tslint:disable-next-line:no-console
    console.log("------------------- start --------------");
    await api.startNotifications();

    // tslint:disable-next-line:no-console
    console.log("------------------- start --------------");
    await api.startNotifications();

    // tslint:disable-next-line:no-console
    console.log("------------------- start --------------");
    await api.startNotifications();

    // tslint:disable-next-line:no-console
    console.log("------------------- stop --------------");
    await api.stopNotifications();

    // tslint:disable-next-line:no-console
    console.log("------------------- stop --------------");
    await api.stopNotifications();

    // tslint:disable-next-line:no-console
    console.log("------------------- start --------------");
    await api.startNotifications();

    // tslint:disable-next-line:no-console
    console.log("------------------- start --------------");
    await api.startNotifications();

    // tslint:disable-next-line:no-console
    console.log("------------------- subscribe --------------");
    const myDevice = (await api.listConnectedDevices()).data.pop();

    const obs = api.subscribe.resourceValues({
        deviceId: myDevice.id,
        resourcePaths: [
            "/3200/0/5501"
        ],
    });

    // tslint:disable-next-line:no-console
    obs.addListener(message => console.log(message));
}

main();

process.stdin.resume();
