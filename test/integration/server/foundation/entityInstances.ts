import express = require("express");
import { logMessage } from "../../logger";
import { sendException } from "../utilities";
import { FoundationInstanceCache } from "../../cache/foundationInstanceCache";
import { determineInstanceConfig } from "../../build/test/integration/server/utilities";
import { Config } from "../../../../src/sdk";

export const entityInstances = (app: express.Application, foundationCache: FoundationInstanceCache) => {

    /**
     * Get list of all entity instances
     */
    app.get("/foundation/entities", (_req, res) => {
        logMessage("List all foundation entities");
        try {
            res.json(foundationCache.listEntityInstances().map(e => e.toJson()));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    /**
     * Get all instances for a particular entity
     */
    app.get("/foundation/entities/:entityId/instances", (req, res) => {
        const entityId = req.param("entityId");
        try {
            res.json(foundationCache.listEntityInstances().filter(e => e.name === entityId).map(e => e.toJson()));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    /**
     * Create a new entity instance
     */
    app.post("/foundation/entities/:entityId/instances", (req, res) => {
        const entityId = req.param("entityId");
        try {
            const config = new Config(determineInstanceConfig(req.body));
            const instance = foundationCache.createEntityInstance(entityId, config);
            return instance.toJson();
        } catch (exception) {
            sendException(res, exception);
        }
    });
};
