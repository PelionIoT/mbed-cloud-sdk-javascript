import { logMessage } from "../logger";
import { ConnectionOptions } from "../../../src/common/interfaces";
import { TestError } from "./api/serverMessages";
import { ServerError } from "./error";
import { Exception } from "../types";
import { RunnerConnectionOptions } from "./types";

export const sendException = (res: any, exception: Exception | undefined): void => {
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
};

export const determineInstanceConfig = (config: RunnerConnectionOptions): ConnectionOptions => {
    const apiKeyEnv: string = "MBED_CLOUD_SDK_API_KEY";
    const hostEnv: string = "MBED_CLOUD_SDK_HOST";

    // Environment configuration
    const defaultConfig: ConnectionOptions = {
        apiKey: process.env[apiKeyEnv],
        host: process.env[hostEnv]
    };

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
};

export const sendApiError = (res: any, error: TestError | undefined): void => {
    if (error) {
        logMessage(`Error: ${error.message}`);
    }
    res.status(500).send(error);
};

export function uniq(a: Array<string>) {
    return a.sort().filter((item, pos, ary) => {
        return !pos || item !== ary[pos - 1];
    });
}