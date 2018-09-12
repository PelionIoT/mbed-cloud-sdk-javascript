import { Config } from "./client/config";
import { Factory } from "./generatedPOC/accounts/factory";

export class SDK {
    private static _config: Config;

    private _instanceConfig: Config;

    public entities: Factory;

    constructor(config?: Config) {
        if (config) {
            this._instanceConfig = config;
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
