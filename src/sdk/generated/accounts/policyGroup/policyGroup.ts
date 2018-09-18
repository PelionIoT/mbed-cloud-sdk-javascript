import { EntityBase } from "../../../common/entityBase";
import { CallbackFn, ConnectionOptions, ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";

export class PolicyGroup extends EntityBase {

    // private renames/foreignKeys

    constructor(config?: ConnectionOptions | Config) {
        super();
        if (config instanceof Config) {
            this.config = config;
        } else {
            this.config = new Config(config);
        }
    }

    // methods

}
