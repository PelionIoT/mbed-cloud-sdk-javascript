import { ConnectionOptions } from "../../common/interfaces";
import dotenv = require("dotenv");
import { SDKLogLevel } from "../../common/logger";

export class Config {
    private readonly ENV_API_KEY = "MBED_CLOUD_SDK_API_KEY";
    private readonly ENV_HOST = "MBED_CLOUD_SDK_HOST";
    private readonly ENV_LOG_LEVEL = "MBED_CLOUD_SDK_LOG_LEVEL";

    public readonly apiKey: string;
    public readonly host: string;
    public readonly logLevel: SDKLogLevel;

    constructor(options?: ConnectionOptions) {
        options = options || {};
        if (dotenv && typeof dotenv.config === "function") { dotenv.config(); }
        this.apiKey = options.apiKey || (process && process.env[this.ENV_API_KEY]) || "default";
        this.host = options.host || (process && process.env[this.ENV_HOST]) || "https://api.us-east-1.mbedcloud.com";
        this.logLevel = options.logLevel || (process && (process.env[this.ENV_LOG_LEVEL]) as SDKLogLevel) || "WARN";
        if (this.apiKey.substr(0, 6).toLowerCase() !== "bearer") { this.apiKey = `Bearer ${this.apiKey}`; }
    }
}
