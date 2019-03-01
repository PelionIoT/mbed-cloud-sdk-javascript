import { Config } from "./config";
import { Client } from "../client/client";

export abstract class Repository {
    public readonly config: Config;

    public readonly client: Client;

    constructor(config?: Config, client?: Client) {
        this.config = config || new Config();
        this.client = client || new Client(this.config);
    }
}
