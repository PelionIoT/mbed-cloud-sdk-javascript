import express = require("express");
import { logMessage } from "../../logger";
import { sendException, uniq } from "../utilities";
import { FoundationInstanceCache } from "../../cache/foundationInstanceCache";
import { determineInstanceConfig } from "../../build/test/integration/server/utilities";
import { Config } from "../../../../src/sdk";
import { ServerError } from "../error";
import * as entities from "../../../../src/sdk/entities";

export const entityInstances = (app: express.Application, foundationCache: FoundationInstanceCache) => {

    /**
     * Get list of all entity instances
     */
    app.get("/foundation/entities", (_req, res) => {
        logMessage("List all foundation entities");
        try {
            res.json(uniq(Object.keys(entities).map(e => e.replace("Repository", "").replace("Adapter", ""))));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    /**
     * Get all instances for a particular entity
     */
    app.get("/foundation/entities/:entityId/instances", (req, res) => {
        if (!req.params.entityId) {
            sendException(res, new ServerError(400, "The instance id has not been specified"));
            return;
        }

        const entityId = req.params.entityId;
        logMessage(`List all ${entityId} foundation entities`);
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
        if (!req.params.entityId) {
            sendException(res, new ServerError(400, "The entity id has not been specified"));
            return;
        }

        const entityId = req.params.entityId;
        try {
            const config = new Config(determineInstanceConfig(req.body));
            const instance = foundationCache.createEntityInstance(entityId, config);
            if (!instance) {
                sendException(res, new ServerError(404, `no such instance ${entityId}`));
            }
            res.status(201);
            res.send(instance.toJson());
        } catch (exception) {
            sendException(res, exception);
        }
    });
};
