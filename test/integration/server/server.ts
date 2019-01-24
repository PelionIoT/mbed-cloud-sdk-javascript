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

// Start the SDK test server.
start();
