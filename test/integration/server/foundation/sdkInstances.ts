import express = require("express");
import { FoundationInstanceCache } from "../../cache/foundationInstanceCache";
import { logMessage } from "../../logger";
import { sendException, determineInstanceConfig } from "../utilities";
import { Config } from "../../../../src";

export const sdkInstances = (app: express.Application, foundationCache: FoundationInstanceCache) => {

    app.get("/foundation/sdk/instances", (_req, res) => {
        logMessage("Listing all foundation sdk instances");
        try {
            res.json(foundationCache.listSdkInstances().map(s => s.toJson()));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    app.post("/foundation/sdk/instances", (req, res) => {
        logMessage("Creating new SDK instance");
        try {
            const config = new Config(determineInstanceConfig(req.body));
            const instance = foundationCache.createSDKInstance(config);
            res.json(instance.toJson());
        } catch (exception) {
            sendException(res, exception);
        }
    });
};
