import { Config } from "../client/config";
import { Client } from "../client/client";

export abstract class Repository {
    protected readonly config: Config;

    protected readonly client: Client;

    constructor(config?: Config, client?: Client) {
        this.config = config || new Config();
        this.client = client || new Client(this.config);
    }

    public getConfig(): Config {
        return this.config;
    }
}
