import { Config } from "./client/config";
import { Factory } from "./generated/factory";
import { ConnectionOptions } from "../common/interfaces";

export class SDK {
    private static _config: Config;

    private _instanceConfig: Config;

    public entities: Factory;

    constructor(config?: Config | ConnectionOptions) {
        if (config) {
            if (config instanceof Config) {
                this._instanceConfig = config;
            } else {
                this._instanceConfig = new Config(config);
            }
        }

        this.entities = new Factory(this.getConfig());
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
