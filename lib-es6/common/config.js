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
        this._apiKey = this.ensureBearer(options.apiKey || (process && process.env[Config.ENV_API_KEY]) || "default");
        this.host = options.host || (process && process.env[Config.ENV_HOST]) || "https://api.us-east-1.mbedcloud.com";
        this.logLevel = options.logLevel || (process && (process.env[Config.ENV_LOG_LEVEL])) || "WARN";
        if (!this.host.startsWith("https"))
            this.host = `https://${this.host}`;
    }
    /**
     * The Pelion Device Management Api Key
     */
    get apiKey() {
        if (typeof this._apiKey === "function") {
            return this.ensureBearer(this._apiKey());
        }
        return this._apiKey;
    }
    ensureBearer(key) {
        if (typeof key === "string" && key.substr(0, 6).toLowerCase() !== "bearer") {
            return `Bearer ${key}`;
        }
        return key;
    }
}
Config.ENV_API_KEY = "MBED_CLOUD_SDK_API_KEY";
Config.ENV_HOST = "MBED_CLOUD_SDK_HOST";
Config.ENV_LOG_LEVEL = "MBED_CLOUD_SDK_LOG_LEVEL";
//# sourceMappingURL=config.js.map