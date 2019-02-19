import { Config } from "./common/config";
import { Factory } from "./entities";
import { Client } from "./client/client";

export class SDK {
    public readonly config: Config;
    public readonly client: Client;

    public entities: () => Factory;

    constructor(config?: Config, client?: Client) {
        this.config = config || new Config(config);

        this.entities = () => new Factory(this.config);
        this.client = client || new Client(this.config);
    }
}
