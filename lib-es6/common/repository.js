import { Config } from "./config";
import { Client } from "../client/client";
/**
 * Abstract base class for a repository
 */
export class Repository {
    /**
     * Initalise a new instance of the repository
     * @param config The configuration to use, if null then repository will initalise its own using dotenv
     * @param client The client instance to use
     */
    constructor(config, client) {
        if (config && config instanceof Config) {
            this.config = config;
        }
        else {
            this.config = new Config(config);
        }
        this.client = client || new Client(this.config);
    }
}
//# sourceMappingURL=repository.js.map