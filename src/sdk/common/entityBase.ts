import { Config } from "../client/config";
import { SDK } from "../sdk";

export class EntityBase {
    private _config: Config;
    /**
     * The id of the entity
     */
    public id: string;

    public get config(): Config {
        return this._config || SDK.config;
    }

    public set config(c: Config) {
        this._config = c;
    }
}
