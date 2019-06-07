import * as dotenv from "dotenv";
/**
 * Configuration class for the SDK
 */
export class Config {
    /**
     * Initalise a new isntance of Config
     * @param options The connection options
     */
    constructor(options) {
        options = options || {};
        if (dotenv && typeof dotenv.config === "function") {
            dotenv.config();
        }
        this.apiKey = options.apiKey || (process && process.env[Config.ENV_API_KEY]) || "default";
        this.host = options.host || (process && process.env[Config.ENV_HOST]) || "https://api.us-east-1.mbedcloud.com";
        this.logLevel = options.logLevel || (process && (process.env[Config.ENV_LOG_LEVEL])) || "WARN";
        if (this.apiKey.substr(0, 6).toLowerCase() !== "bearer") {
            this.apiKey = `Bearer ${this.apiKey}`;
        }
    }
}
Config.ENV_API_KEY = "MBED_CLOUD_SDK_API_KEY";
Config.ENV_HOST = "MBED_CLOUD_SDK_HOST";
Config.ENV_LOG_LEVEL = "MBED_CLOUD_SDK_LOG_LEVEL";
//# sourceMappingURL=config.js.map