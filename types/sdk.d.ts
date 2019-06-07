import { Config } from "./common/config";
import { Factory } from "./foundation";
import { Client } from "./client/client";
import { ConnectionOptions } from "./legacy/common/interfaces";
/**
 * Top level Sdk instance
 */
export declare class SDK {
    /**
     * The configuration for the Sdk
     */
    readonly config: Config;
    /**
     * The client instance of the Sdk
     */
    readonly client: Client;
    /**
     * Get a new instance of a foundation repository, instantiated with the Sdk configuration.
     */
    foundation: () => Factory;
    /**
     * Initalise a new instance of the Sdk class
     * @param config The configuration
     * @param client The client instance
     */
    constructor(config?: ConnectionOptions | Config, client?: Client);
}
