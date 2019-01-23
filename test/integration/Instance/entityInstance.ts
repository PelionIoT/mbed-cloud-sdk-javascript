import { FoundationInstance } from "./foundationInstance";
import { TestRunnerFoundationInstance } from "../foundation/types";
import { Entity } from "../../../src/sdk/common/entity";
import { Config } from "../../../src/sdk";
import { Repository } from "../../../src/sdk/common/repository";
import * as FoundationSDK from "../../../src/sdk/entities";

/**
 * Instance of an Entity
 */
export class EntityInstance extends FoundationInstance {

    /**
     * Create new entity instance
     * @param name Name of the entity
     * @param config Configuration object for the entity
     */
    constructor(name: string, config: Config) {
        const repoConstructor = FoundationSDK[`${name}Repository`];
        const repo = new repoConstructor(config);
        super(repo);
        this.name = name;
    }

    /**
     * Json representation of the entity
     */
    public toJson(): TestRunnerFoundationInstance {
        return Object.assign({ entity: this.name }, super.toJson());
    }
}
