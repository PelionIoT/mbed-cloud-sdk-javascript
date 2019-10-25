"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
/**
 * Configuration class for the SDK
 */
var Config = /** @class */ (function () {
    /**
     * Initalise a new isntance of Config
     * @param options The connection options
     */
    function Config(options) {
        options = options || {};
        if (dotenv && typeof dotenv.config === "function") {
            dotenv.config();
        }
        this._apiKey = this.ensureBearer(options.apiKey || (process && process.env[Config.ENV_API_KEY]) || "default");
        this.host = options.host || (process && process.env[Config.ENV_HOST]) || "https://api.us-east-1.mbedcloud.com";
        this.logLevel = options.logLevel || (process && (process.env[Config.ENV_LOG_LEVEL])) || "WARN";
        if (!this.host.startsWith("https"))
            this.host = "https://" + this.host;
    }
    Object.defineProperty(Config.prototype, "apiKey", {
        /**
         * The Pelion Device Management Api Key
         */
        get: function () {
            if (typeof this._apiKey === "function") {
                return this.ensureBearer(this._apiKey());
            }
            return this._apiKey;
        },
        enumerable: true,
        configurable: true
    });
    Config.prototype.ensureBearer = function (key) {
        if (typeof key === "string" && key.substr(0, 6).toLowerCase() !== "bearer") {
            return "Bearer " + key;
        }
        return key;
    };
    Config.ENV_API_KEY = "MBED_CLOUD_SDK_API_KEY";
    Config.ENV_HOST = "MBED_CLOUD_SDK_HOST";
    Config.ENV_LOG_LEVEL = "MBED_CLOUD_SDK_LOG_LEVEL";
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map