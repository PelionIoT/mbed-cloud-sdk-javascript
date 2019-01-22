import * as express from "express";
import * as bodyParser from "body-parser";
import { logMessage } from "../logger";
import * as  http from "http";
import { apiModules } from "./apiModules";
import { apiInstances } from "./apiInstances";
import { ModuleInstanceCache } from "../cache/moduleInstanceCache";

const port: number = 5000;

const app = express();
app.use(bodyParser.json());

const moduleInstanceCache = new ModuleInstanceCache();

app.get("/ping", (_req, res, _next) => {
    logMessage("Ping ---> <--- Pong");
    res.json("pong");
});

app.post("/reset", (_req, res, _next) => {
    logMessage("Resetting");
    res.status(205).end();
});

app.post("/shutdown", (_req, res, _next) => {
    res.status(202).end();
    logMessage("Shutting down.");
    quit();
});

// api module endpoints
apiModules(app, moduleInstanceCache);

// api instance endpoints
apiInstances(app, port, moduleInstanceCache);

process.on("SIGINT", () => {
    quit();
});

process.on("SIGTERM", () => {
    quit();
});

let exitCallback: () => void;
export function addExitCallback(callback: () => void) {
    exitCallback = callback;
}

export function start(): void {
    http.createServer(app)
        .listen(port, () => logMessage(`Tests server listening on port ${port}`));
}

export function quit(): void {
    logMessage("Quitting...");
    if (exitCallback) {
        exitCallback();
    }
    process.exit();
}
