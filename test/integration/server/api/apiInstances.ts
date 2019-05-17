import { logMessage } from "../../logger";
import { sendException, sendApiError, sendSDKError } from "../utilities";
import { ServerError } from "../error";
import { TestResult, TestError } from "./serverMessages";
import { mapJsonArgs } from "../../mapping/argumentMapping";
import { ModuleInstanceCache } from "../../cache/moduleInstanceCache";
import { ModuleInstance } from "../../instance/moduleInstance";

const instanceIdParam: string = "instanceId";
const methodIdParam: string = "methodId";

export const apiInstances = (app, instanceCache: ModuleInstanceCache) => {
    app.get("/instances", (_req, res, _next) => {
        logMessage("Listing all module instances");
        try {
            res.json(instanceCache.listInstances().map(i => i.toJson()));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    app.get("/instances/:instanceId", (req, res, _next) => {
        const instanceId: string = req.params[instanceIdParam];
        logMessage(`Fetching instance ("${instanceId}")`);
        if (!instanceId) {
            sendException(res, new ServerError(400, "The instance id has not been specified"));
            return;
        }
        try {
            const instance = instanceCache.getModuleInstance(instanceId);
            if (!instance) {
                sendException(res, new ServerError(404, `no such instance ${instanceId}`));
                return;
            }
            res.json(instance.toJson());
        } catch (exception) {
            sendException(res, exception);
        }
    });

    app.delete("/instances/:instanceId", (req, res, _next) => {
        const instanceId: string = req.params[instanceIdParam];
        logMessage(`Deleting instance ("${instanceId}")`);
        if (!instanceId) {
            sendException(res, new ServerError(400, "The instance id has not been specified"));
            return;
        }
        try {
            instanceCache.getModuleInstance(instanceId);
            res.json(instanceCache.deleteInstance(instanceId));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    app.get("/instances/:instanceId/methods", (req, res, _next) => {
        const instanceId: string = req.params[instanceIdParam];
        logMessage(`Listing instance ("${instanceId}") methods`);
        if (!instanceId) {
            sendException(res, new ServerError(400, "The instance id has not been specified"));
            return;
        }
        let instance: ModuleInstance;
        try {
            instance = instanceCache.getModuleInstance(instanceId);
            res.json(instance.listApis().map(m => m.toJson()));
        } catch (exception) {
            sendException(res, exception);
        }
    });

    app.post("/instances/:instanceId/methods/:methodId", (req, res, _next) => {
        logMessage(`TEST http://localhost/${req.url} at ${new Date().toISOString()}`);

        // Instance
        const instanceId: string = req.params[instanceIdParam];
        if (!instanceId) {
            sendException(res, new ServerError(400, "The instance id has not been specified"));
            return;
        }
        // Method
        const methodId: string = req.params[methodIdParam];
        if (!methodId) {
            sendException(res, new ServerError(400, "The method id has not been specified"));
            return;
        }
        try {
            const instance: ModuleInstance = instanceCache.getModuleInstance(instanceId);
            const args: Array<any> = mapJsonArgs(req.body);
            logMessage(`CALLING method ("${methodId}") on instance ("${instanceId}")`);
            if (args.length) {
                const argsStr: string = JSON.stringify(args);
                logMessage(`USING ${argsStr}`);
            }
            instance.executeMethod(methodId, args, (result: TestResult) => {
                if (result) {
                    res.json(result);
                }
            }, (error: TestError) => {
                if (error) {
                    sendApiError(res, error);
                }
            });
        } catch (exception) {
            sendSDKError(res, exception);
        }
    });
};
