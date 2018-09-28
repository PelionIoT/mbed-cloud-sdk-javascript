import { ConnectionOptions } from "../../common/interfaces";
import dotenv = require("dotenv");

export class Config {
    private readonly ENV_API_KEY = "MBED_CLOUD_SDK_API_KEY";
    private readonly ENV_HOST = "MBED_CLOUD_SDK_HOST";

    public readonly apiKey;
    public readonly host;

    constructor(options?: ConnectionOptions) {
        options = options || {};
        if (dotenv && typeof dotenv.config === "function") { dotenv.config(); }
        this.apiKey = options.apiKey || (process && process.env[this.ENV_API_KEY]) || "default";
        this.host = options.host || (process && process.env[this.ENV_HOST]) || "https://api.us-east-1.mbedcloud.com";
        if (this.apiKey.substr(0, 6).toLowerCase() !== "bearer") { this.apiKey = `Bearer ${this.apiKey}`; }
    }
}
