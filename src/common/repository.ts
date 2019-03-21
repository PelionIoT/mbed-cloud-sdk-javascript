import { Config } from "./config";
import { Client } from "../client/client";

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
    constructor(config?: Config, client?: Client) {
        this.config = config || new Config();
        this.client = client || new Client(this.config);
    }
}
