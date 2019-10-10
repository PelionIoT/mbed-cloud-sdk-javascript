import { Config } from "./common/config";
import { Factory } from "./foundation";
import { Client } from "./client/client";
/**
 * Top level Sdk instance
 */
export class SDK {
    /**
     * Initalise a new instance of the Sdk class
     * @param config The configuration
     * @param client The client instance
     */
    constructor(config, client) {
        if (config && config instanceof Config) {
            this.config = config;
        }
        else {
            this.config = new Config(config);
        }
        this.foundation = () => new Factory(this.config);
        this.client = client || new Client(this.config);
    }
}
//# sourceMappingURL=sdk.js.map