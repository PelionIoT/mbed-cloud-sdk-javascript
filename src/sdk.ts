import { Config } from "./common/config";
import { Factory } from "./foundation";
import { Client } from "./client/client";

export class SDK {
    public readonly config: Config;
    public readonly client: Client;

    public foundation: () => Factory;

    constructor(config?: Config, client?: Client) {
        this.config = config || new Config(config);

        this.foundation = () => new Factory(this.config);
        this.client = client || new Client(this.config);
    }
}
