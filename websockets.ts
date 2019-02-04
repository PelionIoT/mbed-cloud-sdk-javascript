// import { WebsocketApi } from "../../src/_api/mds";
import { client as WebsocketClient } from "websocket";

const apiKey = "ak_1MDE2ODVjNzVjOTdjMjJjMTFjMDQ0ZDUzMDAwMDAwMDA01685c7a82ee22c11c044d5300000000VjQ6rseowvjwo18BHGiBv47c4X4xNPhS";
// const host = "https://api-ns-websocket.mbedcloudintegration.net";

const websocketClient = new WebsocketClient();

websocketClient.on("connectFailed", error => {
    // tslint:disable-next-line:no-console
    console.log("Connect Error: " + error.toString());
});

websocketClient.on("connect", connection => {
    // tslint:disable-next-line:no-console
    console.log("WebSocket Client Connected");

    // tslint:disable-next-line:no-console
    console.log(connection);

    connection.on("error", error => {
        // tslint:disable-next-line:no-console
        console.log("Connection Error: " + error.toString());
    });

    connection.on("close", () => {
        // tslint:disable-next-line:no-console
        console.log("echo-protocol Connection Closed");
    });

    connection.on("message", message => {
        if (message.type === "utf8") {
            // tslint:disable-next-line:no-console
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
});

websocketClient.connect(
    "https://api-ns-websocket.mbedcloudintegration.net/v2/notification/websocket-connect",
    [],
    null,
    {
        "Sec-WebSocket-Protocol": `pelion_${apiKey}, wss`
    });

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
