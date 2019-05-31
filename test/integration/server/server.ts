import { logMessage } from "../logger";
import * as  http from "http";
import { getApp, quit, addExitCallback } from "./app";

const app = getApp();
const port: number = 5000;

process.on("SIGINT", () => {
    quit();
});

process.on("SIGTERM", () => {
    quit();
});

export function start(): void {
    http.createServer(app)
        .listen(port, () => logMessage(`Tests server listening on port ${port}`));
}

export {
    quit,
    addExitCallback
};

// don't start the server if we're doing a coverage run on CI.
if (process.env.MBED_CLOUD_SDK_TEST_SERVER_DEBUG && process.env.MBED_CLOUD_SDK_TEST_SERVER_DEBUG !== "false") {
    // Start the SDK test server.
    start();
}
