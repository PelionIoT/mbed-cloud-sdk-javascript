import { Config } from "../client/config";
import { Client } from "../client/client";

export abstract class Repository {
    protected readonly config: Config;

    protected readonly client: Client;

    constructor(config: Config, client?: Client) {
        this.config = config;
        this.client = client || new Client(config);
    }
}
