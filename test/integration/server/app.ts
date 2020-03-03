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

/**
 * Get a new instance of an app
 */
export const getApp = (): express.Application => {
    // init caches
    const moduleInstanceCache = new ModuleInstanceCache();
    const foundationInstanceCache = new FoundationInstanceCache();

    // init the app
    const app: express.Application = express();
    app.use(bodyParser.json());

    if (process.env.MBED_CLOUD_SDK_TEST_SERVER_LOG_BODDY) {
        const winny = winston.createLogger(
            {
                transports: [
                    new winston.transports.Console(),
                ],
                format: winston.format.prettyPrint(),
            }
        );

        // add loging of request and response bodies
        app.use(expressWinston.logger({
            colorize: true,
            requestWhitelist: [
                "body"
            ],
            responseWhitelist: [
                "body"
            ],
            winstonInstance: winny
        }));
    }

    app.get("/ping", (_req, res, _next) => {
        logMessage("Ping ---> <--- Pong");
        res.json("pong");
    });

    app.post("/reset", (_req, res, _next) => {
        logMessage("Resetting");
        res.status(205).end();
    });

    app.post("/shutdown", (_req, res, _next) => {
        logMessage("Shutting down.");
        // don't call quit if self test
        if (!process.env.MBED_CLOUD_SDK_TEST_SERVER_SELF_TEST) {
            quit();
        }
        res.status(202).end();
        process.exit();
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
