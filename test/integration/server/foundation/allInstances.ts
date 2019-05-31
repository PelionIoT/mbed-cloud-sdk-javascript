import express = require("express");
import { FoundationInstanceCache } from "../../cache/foundationInstanceCache";
import { logMessage } from "../../logger";
import { sendException, sendSDKError } from "../utilities";
import { ServerError } from "../error";
import { snakeToCamel } from "../../../../src/legacy/common/functions";

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
        if (!req.params.instanceId) {
            sendException(res, new ServerError(400, "The instance id has not been specified"));
            return;
        }

        const instanceId = req.params.instanceId;
        logMessage(`Get Instance Information for ${instanceId}`);
        try {
            const instance = foundationCache.getInstance(instanceId);
            if (!instance) {
                sendException(res, new ServerError(404, `no such instance ${instanceId}`));
                return;
            }
            res.json(instance.toJson());
        } catch (exception) {
            sendException(res, exception);
        }
    });

    /**
     * Delete an instance
     */
    app.delete("/foundation/instances/:instanceId", (req, res) => {
        if (!req.params.instanceId) {
            sendException(res, new ServerError(400, "The instance id has not been specified"));
            return;
        }

        const instanceId = req.params.instanceId;
        logMessage(`Delete instance ${instanceId}`);
        try {
            foundationCache.deleteInstance(instanceId);
            res.status(204).end();
        } catch (exception) {
            sendException(res, exception);
        }
    });

    /**
     * Get list of methods on an instance
     */
    app.get("/foundation/instances/:instanceId/methods", (req, res) => {
        if (!req.params.instanceId) {
            sendException(res, new ServerError(400, "The instance id has not been specified"));
            return;
        }

        const instanceId = req.params.instanceId;
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
        if (!req.params.instanceId) {
            sendException(res, new ServerError(400, "The instance id has not been specified"));
            return;
        }

        if (!req.params.methodId) {
            sendException(res, new ServerError(400, "The method id has not been specified"));
            return;
        }

        const instanceId = req.params.instanceId;
        const methodId = snakeToCamel(req.params.methodId);
        logMessage(`Execute ${methodId} on ${instanceId}`);
        try {
            const instance = foundationCache.getInstance(instanceId);
            if (instance) {
                res.json(await instance.executeMethod(methodId, req.body));
            } else {
                sendException(res, new ServerError(400, `no such instance`));
                return;
            }
        } catch (exception) {
            if (exception && exception.innerError) {
                sendSDKError(res, exception);
            } else {
                sendException(res, exception);
            }
        }
    });

};
