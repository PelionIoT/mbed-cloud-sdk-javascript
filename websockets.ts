import { ConnectApi } from "./src";

const apiKey = "ak_1MDE2ODVjNzVjOTdjMjJjMTFjMDQ0ZDUzMDAwMDAwMDA0168b97683d6f65f42b0f3e100000000lt4PeToNqJ3ZvguwsxoxH7tadJci8qYv";
const host = "https://api-ns-websocket.mbedcloudintegration.net";

const api = new ConnectApi({
    apiKey,
    host,
    logLevel: "ALL",
});

async function main() {

    // // tslint:disable-next-line:no-console
    // console.log("------------------- start --------------");
    // await api.startNotifications();

    // // tslint:disable-next-line:no-console
    // console.log("------------------- start --------------");
    // await api.startNotifications();

    // // tslint:disable-next-line:no-console
    // console.log("------------------- start --------------");
    // await api.startNotifications();

    // // tslint:disable-next-line:no-console
    // console.log("------------------- stop --------------");
    // await api.stopNotifications();

    // // tslint:disable-next-line:no-console
    // console.log("------------------- stop --------------");
    // await api.stopNotifications();

    // // tslint:disable-next-line:no-console
    // console.log("------------------- start --------------");
    // await api.startNotifications();

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
