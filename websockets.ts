// import { WebsocketApi } from "../../src/_api/mds";
import { ConnectApi } from "./src";
import { w3cwebsocket as WebsocketClient } from "websocket";

const apiKey = "ak_1MDE2ODVjNzVjOTdjMjJjMTFjMDQ0ZDUzMDAwMDAwMDA0168b949978cf65f42b0f3e1000000000DNrDQsaXkJWwEQLcbbPUnWafTigsGbn";
const host = "https://api-ns-websocket.mbedcloudintegration.net";

const api = new ConnectApi({
    apiKey,
    host,
});

api.listConnectedDevices().then(devices => {
    const myDevice = devices.data[0];
    api.subscribe.resourceValues({
        deviceId: myDevice.id,
        resourcePaths: [
            "/3200/0/5501"
        ]
    });
});

const websocketClient = new WebsocketClient(
    "wss://api-ns-websocket.mbedcloudintegration.net/v2/notification/websocket-connect",
    [
        `pelion_${apiKey}`,
        `wss`
    ],
);

websocketClient.onerror = error => {
    // tslint:disable-next-line:no-console
    console.log("Connect Error: " + error.toString());
};

websocketClient.onopen = () => {
    // tslint:disable-next-line:no-console
    console.log("WebSocket Client Connected");
};

websocketClient.onclose = () => {
    // tslint:disable-next-line:no-console
    console.log("echo-protocol Connection Closed");

    const connectionInfo = (websocketClient as any)._connection;
    if (connectionInfo) {
        // tslint:disable-next-line:no-console
        console.log(connectionInfo.closeReasonCode);
        // tslint:disable-next-line:no-console
        console.log(connectionInfo.closeDescription);
    }
    process.exit();
};

websocketClient.onmessage = message => {
    if (message.type === "utf8") {
        // tslint:disable-next-line:no-console
        console.log("Received: '" + message.utf8Data + "'");
    }
};

process.stdin.resume();

// mdsWebsocket.getWebsocket((error, data) => {
//     if (error) {
//         // tslint:disable-next-line:no-console
//         console.log(error);
//     }

//     // tslint:disable-next-line:no-console
//     console.log(data);

//     mdsWebsocket.registerWebsocket((error, data) => {
//         if (error) {
//             // tslint:disable-next-line:no-console
//             console.log(error);
//         }

//         // tslint:disable-next-line:no-console
//         console.log(data);

//         const websocketClient = new WebsocketClient();

//         websocketClient.connect(
//             "https://api-ns-websocket.mbedcloudintegration.net/v2/notification/websocket-connect",
//             [],
//             null,
//             {
//                 "Sec-WebSocket-Protocol": `pelion_${apiKey}, wss`
//             });
//     });
// });
