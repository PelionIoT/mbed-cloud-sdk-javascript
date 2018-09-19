import { EntityBase } from "../../../common/entityBase";
import { ConnectionOptions, ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { Client } from "../../../client/client";
export class PasswordPolicy extends EntityBase {
    public readonly _renames: { [key: string]: string } = {
    };
    public readonly _foreignKeys: { [key: string]: { [key: string]: any } } = {
    }
};
/**
* Gets a user
* @returns Promise containing user
*/
public minimumLength ?: string;
constructor(config ?: ConnectionOptions | Config) {
    super();
    if (config instanceof Config) {
        this.config = config;
    } else {
        this.config = new Config(config);
    }
}
}