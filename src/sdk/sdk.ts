import { Config } from "./client/config";
import { Factory } from "./entities";
import { ConnectionOptions } from "../common/interfaces";
import { Client } from "./client/client";

export class SDK {
    private static _config: Config;

    private _instanceConfig: Config;

    public entities: Factory;

    public client: Client;

    constructor(config?: Config | ConnectionOptions) {
        if (config) {
            if (config instanceof Config) {
                this._instanceConfig = config;
            } else {
                this._instanceConfig = new Config(config);
            }
        }

        this.entities = new Factory(this.getConfig());
        this.client = new Client(this.getConfig());
    }

    public static get config(): Config {
        if (this._config) {
            return this._config;
        }

        this._config = new Config();
        return this._config;
    }

    public getConfig() {
        return this._instanceConfig || SDK.config;
    }
}
