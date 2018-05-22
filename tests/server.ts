import * as express from "express";
import * as  http from "http";
import * as bodyParser from "body-parser";
import * as instanceCache from "./instanceCache";
import { logMessage } from "./logger";
import { SdkModuleInstance } from "./sdkModuleInstance";
import { ConnectionOptions } from "./common/interfaces";
import { Exception } from "./types";
import { TestError, TestResult } from "./serverMessages";
import { ServerError } from "./error";
import { SDKError } from "./common/sdkError";
import { mapJsonArgs } from "./argumentMapping";
// TODO remove when no longer needed
import * as MbedCloudSDK from "../lib";
import * as mapping from "./mapping";

const app = express();
app.use(bodyParser.json());

// Variables
const moduleIdParam: string = "moduleId";
const instanceIdParam: string = "instanceId";
const methodIdParam: string = "methodId";

const apiKeyEnv: string = "MBED_CLOUD_API_KEY";
const hostEnv: string = "MBED_CLOUD_HOST";

const port: number = 5000;

// Environment configuration
const defaultConfig: ConnectionOptions = {
    apiKey: process.env[apiKeyEnv],
    host: process.env[hostEnv]
};

interface RunnerConnectionOptionsBase {
    api_key: string | undefined;
    host: string | undefined;
}

interface RunnerConnectionOptions extends RunnerConnectionOptionsBase {
    params: RunnerConnectionOptionsBase | undefined;
}
function determineInstanceConfig(config: RunnerConnectionOptions): ConnectionOptions {
    if (!config) {
        logMessage("The test server did not receive any connection configuration. Defaulting to test server configuration.");
        return defaultConfig;
    }

    if (!config.api_key) {
        const configStr: string = JSON.stringify(config);
        logMessage(`The test server could not interpret instance configuration properly: [${configStr}]. Defaulting to test server configuration.`);
        return defaultConfig;
    }
    const instanceConfig: ConnectionOptions = { ...defaultConfig, apiKey: config.api_key, host: config.host };
    return instanceConfig;
}
function sendException(res: any, exception: Exception | undefined): void {
    let exceptionCode: number = 500;
    const errorMessage: TestError = { message: `${exception}`, traceback: "" };
    if (exception && (exception as ServerError).fromTestServer) {
        const serverError: ServerError = exception as ServerError;
        exceptionCode = serverError.code;
        errorMessage.traceback = serverError.stack;
        errorMessage.message = serverError.message;
    }
    logMessage(`Exception: (${exceptionCode}) ${errorMessage.message}`);
    res.status(exceptionCode).send(errorMessage);
}
function sendApiError(res: any, error: TestError | undefined): void {
    if (error) {
        logMessage(`Error: ${error.message}`);
    }
    res.status(500).send(error);
}

let exitCallback: () => void;
function addExitCallback(callback: () => void) {
    exitCallback = callback;
}
function quit(): void {
    logMessage("Quitting...");
    if (exitCallback) {
        exitCallback();
    }
    process.exit();
}

// Instance server endpoints
// * Server endpoints
app.get("/ping", (req, res, next) => {
    logMessage("Ping ---> <--- Pong");
    res.json("pong");
});
app.post("/reset", (req, res, next) => {
    logMessage("Resetting");
    res.status(205).end();
});
app.post("/shutdown", (req, res, next) => {
    res.status(202).end();
    logMessage("Shutting down.");
    quit();
});
// * API Modules endpoints
app.get("/modules", (req, res, next) => {
    logMessage("Listing SDK modules");
    res.json(instanceCache.listAllModules());
});
app.post("/modules/:moduleId/instances", (req, res, next) => {
    const moduleId: string | undefined = req.params[moduleIdParam];
    logMessage(`Creating a module ("${moduleId}") instance`);
    const config: ConnectionOptions = determineInstanceConfig(req.body);
    if (!moduleId) {
        sendException(res, new ServerError(400, "The module id has not been specified"));
        return;
    }
    try {
        const instance: SdkModuleInstance = instanceCache.createModuleInstance(moduleId, config);
        res.json(instance.toJson());
    } catch (exception) {
        sendException(res, exception);
    }
});
app.get("/modules/:moduleId/instances", (req, res, next) => {
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
// * API Instances endpoints
app.get("/instances", (req, res, next) => {
    logMessage("Listing all module instances");
    try {
        res.json(instanceCache.listAllInstances().map(i => i.toJson()));
    } catch (exception) {
        sendException(res, exception);
    }
});
app.get("/instances/:instanceId", (req, res, next) => {
    const instanceId: string | undefined = req.params[instanceIdParam];
    logMessage(`Fetching instance ("${instanceId}")`);
    if (!instanceId) {
        sendException(res, new ServerError(400, "The instance id has not been specified"));
        return;
    }
    try {
        res.json(instanceCache.fetchModuleInstance(instanceId).toJson());
    } catch (exception) {
        sendException(res, exception);
    }
});
app.delete("/instances/:instanceId", (req, res, next) => {
    const instanceId: string | undefined = req.params[instanceIdParam];
    logMessage(`Deleting instance ("${instanceId}")`);
    if (!instanceId) {
        sendException(res, new ServerError(400, "The instance id has not been specified"));
        return;
    }
    try {
        instanceCache.fetchModuleInstance(instanceId);
        res.json(instanceCache.deleteInstance(instanceId));
    } catch (exception) {
        sendException(res, exception);
    }
});
app.get("/instances/:instanceId/methods", (req, res, next) => {
    const instanceId: string | undefined = req.params[instanceIdParam];
    logMessage(`Listing instance ("${instanceId}") methods`);
    if (!instanceId) {
        sendException(res, new ServerError(400, "The instance id has not been specified"));
        return;
    }
    let instance: SdkModuleInstance | undefined;
    try {
        instance = instanceCache.fetchModuleInstance(instanceId);
        res.json(instance.listApis().map(m => m.toJson()));
    } catch (exception) {
        sendException(res, exception);
    }
});
app.post("/instances/:instanceId/methods/:methodId", (req, res, next) => {
    logMessage(`TEST http://localhost:${port}${req.url} at ${new Date().toISOString()}`);

    // Instance
    const instanceId: string | undefined = req.params[instanceIdParam];
    if (!instanceId) {
        sendException(res, new ServerError(400, "The instance id has not been specified"));
        return;
    }
    // Method
    const methodId: string | undefined = req.params[methodIdParam];
    if (!methodId) {
        sendException(res, new ServerError(400, "The method id has not been specified"));
        return;
    }
    try {
        const instance: SdkModuleInstance = instanceCache.fetchModuleInstance(instanceId);
        const args: Array<any> = mapJsonArgs(req.body);
        logMessage(`CALLING method ("${methodId}") on instance ("${instanceId}")`);
        if (args.length) {
            const argsStr: string = JSON.stringify(args);
            logMessage(`USING ${argsStr}`);
        }
        instance.executeMethod(methodId, args, (result: TestResult | undefined) => {
            if (result) {
                res.json(result);
            }
        }, (error: TestError | undefined) => {
            if (error) {
                sendApiError(res, error);
            }
        });
    } catch (exception) {
        sendException(res, exception);
    }
});

// Setup server
// TODO module definition for former test server. Remove when no longer needed.
const modules: any = {
    AccountManagementApi: new MbedCloudSDK.AccountManagementApi(defaultConfig),
    CertificatesApi: new MbedCloudSDK.CertificatesApi(defaultConfig),
    ConnectApi: new MbedCloudSDK.ConnectApi(defaultConfig),
    DeviceDirectoryApi: new MbedCloudSDK.DeviceDirectoryApi(defaultConfig),
    UpdateApi: new MbedCloudSDK.UpdateApi(defaultConfig)
};

function sendError(res: any, error: any): void {
    const statusCode: number = error.code || 500;
    const message: string | undefined = error.message;
    logMessage(`${statusCode}: ${message}`);
    res.status(statusCode).send({
        message: message
    });
}

// TODO endpoint definitions for former test server. Remove when no longer needed.
app.get("/_init", (req, res, next) => {
    res.send({});
});

app.get("/:module/:method", (req, res, next) => {
    logMessage(`TEST http://localhost:${port}${req.url} at ${new Date().toISOString()}`);
    const moduleParam: string = "module";
    const methodParam: string = "method";
    const argsParam: string = "args";
    // Module
    const module = mapping.mapModule(req.params[moduleParam]);

    // Method
    const method = mapping.mapMethod(module, req.params[methodParam]);

    if (!modules[module] || !modules[module][method]) {
        return sendError(res, {
            message: `"${method}" not found on "${module}"`
        });
    }

    // Args
    const args = mapping.mapArgs(module, method, req.query[argsParam]);

    logMessage(`CALLING "${method}" on "${module}"`);
    if (args.length) {
        const argString: string = JSON.stringify(args);
        logMessage(`USING ${argString}`);
    }

    args.push((error: any, result: any) => {
        if (error) {
            return sendError(res, error);
        }
        result = mapping.mapResult(module, method, result);
        res.json(result);
    });

    // Call
    modules[module][method].apply(modules[module], args);
});

process.on("SIGINT", () => {
    quit();
});

process.on("SIGTERM", () => {
    quit();
});

function start(): void {
    // Start server
    http.createServer(app)
        .listen(port, () => logMessage(`Tests server listening on port ${port}`));
}

export {
    start,
    addExitCallback,
    quit
};
