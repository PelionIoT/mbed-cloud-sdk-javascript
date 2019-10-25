import * as dotenv from "dotenv";
import { SDKLogLevel } from "./logger";

/**
 * Configuration class for the SDK
 */
export class Config {
    private static readonly ENV_API_KEY = "MBED_CLOUD_SDK_API_KEY";
    private static readonly ENV_HOST = "MBED_CLOUD_SDK_HOST";
    private static readonly ENV_LOG_LEVEL = "MBED_CLOUD_SDK_LOG_LEVEL";

    private _apiKey: string | (() => string);

    /**
     * The Pelion Device Management Api Key
     */
    public get apiKey(): string {
        if (typeof this._apiKey === "function") {
            return this.ensureBearer(this._apiKey()) as string;
        }

        return this._apiKey;
    }

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
    constructor(options?: ConfigOptions) {
        options = options || {} as ConfigOptions;
        if (dotenv && typeof dotenv.config === "function") { dotenv.config(); }
        this._apiKey = this.ensureBearer(options.apiKey || (process && process.env[Config.ENV_API_KEY]) || "default");
        this.host = options.host || (process && process.env[Config.ENV_HOST]) || "https://api.us-east-1.mbedcloud.com";
        this.logLevel = options.logLevel || (process && (process.env[Config.ENV_LOG_LEVEL]) as SDKLogLevel) || "WARN";
        if (!this.host.startsWith("https")) this.host = `https://${this.host}`;
    }

    private ensureBearer(key: string | (() => string)): string | (() => string) {
        if (typeof key === "string" && key.substr(0, 6).toLowerCase() !== "bearer") {
            return `Bearer ${key}`;
        }

        return key;
    }
}

export interface ConfigOptions {
    /**
     * API Key for your Pelion Device Management account
     */
    apiKey?: string | (() => string);
    /**
     * URL for Pelion Device Management API
     */
    host?: string;
    /**
    * configure the log level for this api instance
    */
    logLevel?: SDKLogLevel;
}
