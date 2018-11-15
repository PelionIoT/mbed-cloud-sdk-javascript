import { Config } from "../client/config";
import { snakeToCamel } from "../../common/functions";
import { Client } from "../client/client";

export class EntityBase {
    protected readonly _renames: { [key: string]: string };

    protected readonly _foreignKeys: { [key: string]: { [key: string]: any } };

    private _config: Config;

    protected client: Client;

    /**
     * The id of the entity
     */
    public id: string;

    public get config(): Config {
        return this._config;
    }

    public set config(c: Config) {
        this._config = c;
    }

    constructor(config?: Config) {
        if (config) {
            this.config = config;
        } else {
            this.config = new Config();
        }

        this.client = new Client(this.config);
    }

    public activator<T extends EntityBase>(type: { new(): T; }): T {
        return new type();
    }

    public _fromApi<T extends EntityBase>(instance: T, data: any): T {
        const renames = this._renames || {};
        const foreignKeys = this._foreignKeys || {};

        return Object.keys(data).map( key => {
            const newKey = renames[key] || snakeToCamel(key);
            // check if key has type in foreignKey dict
            if (foreignKeys[newKey]) {
                const type = this.activator(foreignKeys[newKey].type);
                if (foreignKeys[newKey].array === true) {
                    // populate list of foreign keys
                    const arr = [];
                    if (data[key]) {
                        Object.keys(data[key]).forEach(k => {
                            arr.push(type._fromApi(type, data[key][k]));
                        });
                    }
                    return { [newKey]: arr };
                } else {
                    if (data[key]) {
                        return { [newKey]: type._fromApi(type, data[key]) };
                    }
                }
            }
            return { [newKey]: data[key] };
        }).reduce((a, b) => Object.assign(instance, a, b)) as T;
    }
}
