import { Config } from "./client/config";
import { Factory } from "./entities";
import { Client } from "./client/client";

export class SDK {
    private _config: Config;

    public entities: () => Factory;

    public client: Client;

    constructor(config?: Config, client?: Client) {
        this._config = config || new Config(config);

        this.entities = () => new Factory(this.config);
        this.client = client || new Client(this.config);
    }

    public get config() {
        return this._config;
    }
}
