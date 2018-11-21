import { Config } from "./client/config";
import { Factory } from "./entities";
import { Client } from "./client/client";

export class SDK {
    private _config: Config;

    public entities: Factory;

    public client: Client;

    constructor(config?: Config) {
        if (config) {
            this._config = config;
        } else {
            this._config = new Config(config);
        }

        this.entities = new Factory(this.getConfig());
        this.client = new Client(this.getConfig());
    }

    public get config(): Config {
        if (this._config) {
            return this._config;
        }

        this._config = new Config();
        return this._config;
    }

    public getConfig() {
        return this._config;
    }
}
