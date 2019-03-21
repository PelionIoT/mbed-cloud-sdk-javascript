import { Config } from "./common/config";
import { Factory } from "./foundation";
import { Client } from "./client/client";

/**
 * Top level Sdk instance
 */
export class Sdk {
    /**
     * The configuration for the Sdk
     */
    public readonly config: Config;

    /**
     * The client instance of the Sdk
     */
    public readonly client: Client;

    /**
     * Get a new instance of a foundation repository, instantiated with the Sdk configuration.
     */
    public foundation: () => Factory;

    /**
     * Initalise a new instance of the Sdk class
     * @param config The configuration
     * @param client The client instance
     */
    constructor(config?: Config, client?: Client) {
        this.config = config || new Config(config);

        this.foundation = () => new Factory(this.config);
        this.client = client || new Client(this.config);
    }
}
