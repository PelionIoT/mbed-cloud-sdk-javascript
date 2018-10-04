import { Config } from "../client/config";
import { SDK } from "../sdk";
import { snakeToCamel } from "../../common/functions";
import { Client } from "../client/client";

export class EntityBase {
    protected readonly _renames: { [key: string]: string };

    protected readonly _foreignKeys: { [key: string]: { [key: string]: any } };

    private _config: Config;

    public client: Client;

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

    constructor(config?: Config) {
        if (config) {
            this.config = config;
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
                    Object.keys(data[key]).forEach( k => {
                        arr.push(type._fromApi(type, data[key][k]));
                    });
                    return { [newKey]: arr };
                } else {
                    return { [newKey]: foreignKeys[newKey].type._fromApi(type, data) };
                }
            }
            return { [newKey]: data[key] };
        }).reduce((a, b) => Object.assign(instance, a, b)) as T;
    }
}
