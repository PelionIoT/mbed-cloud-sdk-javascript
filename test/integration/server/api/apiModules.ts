import { logMessage } from "../../logger";
import { sendException, determineInstanceConfig } from "../utilities";
import { ServerError } from "../error";
import { ConnectionOptions } from "../../../../src/common/interfaces";
import { ModuleInstanceCache } from "../../cache/moduleInstanceCache";
import { ModuleInstance } from "../../instance/moduleInstance";

const moduleIdParam: string = "moduleId";

export const apiModules = (app, instanceCache: ModuleInstanceCache) => {
    app.get("/modules", (_req, res, _next) => {
        logMessage("Listing SDK modules");
        res.json(instanceCache.listAllModules());
    });

    app.post("/modules/:moduleId/instances", (req, res, _next) => {
        const moduleId: string | undefined = req.params[moduleIdParam];
        logMessage(`Creating a module ("${moduleId}") instance`);
        const config: ConnectionOptions = determineInstanceConfig(req.body);
        if (!moduleId) {
            sendException(res, new ServerError(400, "The module id has not been specified"));
            return;
        }
        try {
            const instance: ModuleInstance = instanceCache.createModuleInstance(moduleId, config);
            res.json(instance.toJson());
        } catch (exception) {
            sendException(res, exception);
        }
    });

    app.get("/modules/:moduleId/instances", (req, res, _next) => {
        const moduleId: string = req.params[moduleIdParam];
        logMessage(`Listing module ("${moduleId}") instances`);
        if (!moduleId) {
            sendException(res, new ServerError(400, "The module id has not been specified"));
            return;
        }
        try {
            res.json(instanceCache.listAllInstancesOfAModule(moduleId).map(i => i.toJson()));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    return app;
};
