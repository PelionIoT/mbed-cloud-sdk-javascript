import express = require("express");
import bodyParser = require("body-parser");
import { logMessage } from "../logger";
import { ModuleInstanceCache } from "../cache/moduleInstanceCache";
import { FoundationInstanceCache } from "../cache/foundationInstanceCache";
import { apiModules } from "./api/apiModules";
import { apiInstances } from "./api/apiInstances";
import { sdkInstances } from "./foundation/sdkInstances";
import { entityInstances } from "./foundation/entityInstances";
import { allInstances } from "./foundation/allInstances";
import * as expressWinston from "express-winston";
import * as winston from "winston";

export const getApp = (): express.Application => {
    const moduleInstanceCache = new ModuleInstanceCache();
    const foundationInstanceCache = new FoundationInstanceCache();

    const app: express.Application = express();
    app.use(bodyParser.json());

    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console()
        ],
        colorize: true,
        requestWhitelist: [
            "body"
        ],
        responseWhitelist: [
            "body"
        ],
    }));

    app.get("/ping", (_req, res, _next) => {
        logMessage("Ping ---> <--- Pong");
        res.json("pong");
    });

    app.post("/reset", (_req, res, _next) => {
        logMessage("Resetting");
        res.status(205).end();
    });

    app.post("/shutdown", (req, res, _next) => {
        logMessage("Shutting down.");
        res.status(202).end();
        // don't call quit if self test
        if (!req.param("test", false)) {
            quit();
        }
    });

    // api module endpoints
    apiModules(app, moduleInstanceCache);

    // api instance endpoints
    apiInstances(app, moduleInstanceCache);

    // sdk instances
    sdkInstances(app, foundationInstanceCache);

    // entity instances
    entityInstances(app, foundationInstanceCache);

    // all instances
    allInstances(app, foundationInstanceCache);

    return app;
};

let exitCallback: () => void;
export function addExitCallback(callback: () => void) {
    exitCallback = callback;
}

export function quit(): void {
    logMessage("Quitting...");
    if (exitCallback) {
        exitCallback();
    }
    process.exit();
}
