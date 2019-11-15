import { Client } from "../client/client";
import { Config, ConfigOptions } from "./config";

/**
 * Abstract base class for a repository
 */
export abstract class Repository {
    /**
     * The repository configuration class
     */
    public readonly config: Config;

    /**
     * The repository client instance
     */
    public readonly client: Client;

    /**
     * Initalise a new instance of the repository
     * @param config The configuration to use, if null then repository will initalise its own using dotenv
     * @param client The client instance to use
     */
    constructor(config?: ConfigOptions, client?: Client) {
        if (config && config instanceof Config) {
            this.config = config;
        } else {
            this.config = new Config(config);
        }

        this.client = client || new Client(this.config);
    }
}
