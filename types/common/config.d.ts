import { ConnectionOptions } from "../legacy/common/interfaces";
import { SDKLogLevel } from "./logger";
/**
 * Configuration class for the SDK
 */
export declare class Config {
    private static readonly ENV_API_KEY;
    private static readonly ENV_HOST;
    private static readonly ENV_LOG_LEVEL;
    /**
     * The Pelion Device Management Api Key
     */
    readonly apiKey: string;
    /**
     * The host, will default to "https://api.us-east-1.mbedcloud.com"
     */
    readonly host: string;
    /**
     * The level of logging, will default to ERROR
     */
    readonly logLevel?: SDKLogLevel;
    /**
     * Initalise a new isntance of Config
     * @param options The connection options
     */
    constructor(options?: ConnectionOptions);
}
