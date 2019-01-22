import express = require("express");
import { FoundationInstanceCache } from "../../cache/foundationInstanceCache";
import { logMessage } from "../../logger";
import { sendException } from "../utilities";

export const allInstances = (app: express.Application, foundationCache: FoundationInstanceCache) => {

    app.get("/foundation/instances", (_req, res) => {
        logMessage("List all foundation instances");
        try {
            res.json(foundationCache.listInstances().map(e => e.toJson()));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    app.get("/foundation/instances/:instanceId", (req, res) => {
        const instanceId = req.param("instanceId");
        logMessage(`Get Instance Information for ${instanceId}`);
        try {
            res.json(foundationCache.getInstance(instanceId));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    app.delete("/foundation/instances/:instanceId", (req, res) => {
        const instanceId = req.param("instanceId");
        logMessage(`Delete instance ${instanceId}`);
        try {
            res.json(foundationCache.deleteInstance(instanceId));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    app.get("/foundation/instances/:instanceId/methods", (req, res) => {
        const instanceId = req.param("instanceId");
        logMessage(`List instance Methods for ${instanceId}`);
        try {
            const instance = foundationCache.getInstance(instanceId);
            res.json(instance.listMethods());
        } catch (exception) {
            sendException(res, exception);
        }
    });

    app.post("/foundation/instances/:instanceId:/methods/:methodId", (req, res) => {
        const instanceId = req.param("instanceId");
        const methodId = req.param("methodId");
        logMessage(`Execute ${methodId} on ${instanceId}`);
        try {
            const instance = foundationCache.getInstance(instanceId);
            res.json(instance);
        } catch (exception) {
            sendException(res, exception);
        }
    });

};
