import { ConnectApi } from "./src";

const api = new ConnectApi({
    logLevel: "ALL",
});

async function main() {
    const myDevice = (await api.listConnectedDevices()).data.filter(d => d.id === "01681908e1ba00000000000100100089").pop();

    const obs = api.subscribe.resourceValues({
        deviceId: myDevice.id,
        resourcePaths: [
            "/3202/0/5600"
        ],
    });

    for (let index = 0; index < 4000; index++) {
        // tslint:disable-next-line:no-console
        console.log(await obs.once());
    }
}

main();

process.stdin.resume();
