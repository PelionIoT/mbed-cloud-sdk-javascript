import express = require("express");
import { FoundationInstanceCache } from "../../cache/foundationInstanceCache";
import { logMessage } from "../../logger";
import { sendException } from "../utilities";

export const allInstances = (app: express.Application, foundationCache: FoundationInstanceCache) => {

    /**
     * Get all foundation instances
     */
    app.get("/foundation/instances", (_req, res) => {
        logMessage("List all foundation instances");
        try {
            res.json(foundationCache.listInstances().map(e => e.toJson()));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    /**
     * Get information of particular instance
     */
    app.get("/foundation/instances/:instanceId", (req, res) => {
        const instanceId = req.param("instanceId");
        logMessage(`Get Instance Information for ${instanceId}`);
        try {
            res.json(foundationCache.getInstance(instanceId));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    /**
     * Delete an instance
     */
    app.delete("/foundation/instances/:instanceId", (req, res) => {
        const instanceId = req.param("instanceId");
        logMessage(`Delete instance ${instanceId}`);
        try {
            res.json(foundationCache.deleteInstance(instanceId));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    /**
     * Get list of methods on an instance
     */
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

    /**
     * Executre a method on an instance
     */
    app.post("/foundation/instances/:instanceId/methods/:methodId", async (req, res) => {
        const instanceId = req.param("instanceId");
        const methodId = req.param("methodId");
        logMessage(`Execute ${methodId} on ${instanceId}`);
        try {
            const instance = foundationCache.getInstance(instanceId);
            res.json(await instance.executeMethod(methodId, req.body));
        } catch (exception) {
            sendException(res, exception);
        }
    });

};
