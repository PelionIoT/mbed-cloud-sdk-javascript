import * as express from "express";
import * as bodyParser from "body-parser";
import { logMessage } from "../logger";
import * as  http from "http";
import { apiModules } from "./api/apiModules";
import { apiInstances } from "./api/apiInstances";
import { ModuleInstanceCache } from "../cache/moduleInstanceCache";
import { FoundationInstanceCache } from "../cache/foundationInstanceCache";
import { sdkInstances } from "./foundation/sdkInstances";
import { entityInstances } from "./foundation/entityInstances";
import { allInstances } from "./foundation/allInstances";

const port: number = 5000;

// set up caches
const moduleInstanceCache = new ModuleInstanceCache();
const foundationInstanceCache = new FoundationInstanceCache();

// set up server app
const app: express.Application = express();
app.use(bodyParser.json());

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

// sdk instances
sdkInstances(app, foundationInstanceCache);

// entity instances
entityInstances(app, foundationInstanceCache);

// all instances
allInstances(app, foundationInstanceCache);

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

// Start the SDK test server.
start();
