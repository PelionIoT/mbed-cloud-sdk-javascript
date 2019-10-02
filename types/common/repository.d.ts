import { Config } from "./config";
import { Client } from "../client/client";
/**
 * Abstract base class for a repository
 */
export declare abstract class Repository {
    /**
     * The repository configuration class
     */
    readonly config: Config;
    /**
     * The repository client instance
     */
    readonly client: Client;
    /**
     * Initalise a new instance of the repository
     * @param config The configuration to use, if null then repository will initalise its own using dotenv
     * @param client The client instance to use
     */
    constructor(config?: Config, client?: Client);
}
