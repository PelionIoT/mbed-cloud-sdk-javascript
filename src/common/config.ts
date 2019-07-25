import { ConnectionOptions } from "../legacy/common/interfaces";
import * as dotenv from "dotenv";
import { SDKLogLevel } from "./logger";

/**
 * Configuration class for the SDK
 */
export class Config {
    private static readonly ENV_API_KEY = "MBED_CLOUD_SDK_API_KEY";
    private static readonly ENV_HOST = "MBED_CLOUD_SDK_HOST";
    private static readonly ENV_LOG_LEVEL = "MBED_CLOUD_SDK_LOG_LEVEL";

    /**
     * The Pelion Device Management Api Key
     */
    public readonly apiKey: string;

    /**
     * The host, will default to "https://api.us-east-1.mbedcloud.com"
     */
    public readonly host: string;

    /**
     * The level of logging, will default to ERROR
     */
    public readonly logLevel?: SDKLogLevel;

    /**
     * Initalise a new isntance of Config
     * @param options The connection options
     */
    constructor(options?: ConnectionOptions) {
        options = options || {};
        if (dotenv && typeof dotenv.config === "function") { dotenv.config(); }
        this.apiKey = options.apiKey || (process && process.env[Config.ENV_API_KEY]) || "default";
        this.host = options.host || (process && process.env[Config.ENV_HOST]) || "https://api.us-east-1.mbedcloud.com";
        this.logLevel = options.logLevel || (process && (process.env[Config.ENV_LOG_LEVEL]) as SDKLogLevel) || "WARN";
        if (this.apiKey.substr(0, 6).toLowerCase() !== "bearer") { this.apiKey = `Bearer ${this.apiKey}`; }
        if (!this.host.startsWith("https")) this.host = `https://${this.host}`;
    }
}
