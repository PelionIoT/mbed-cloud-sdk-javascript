import { FoundationInstance } from "./foundationInstance";
import { TestRunnerFoundationInstance } from "../foundation/types";
import { Config } from "../../../src/sdk";
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
        super(repo, name);
        this.name = name;
    }

    /**
     * Json representation of the entity
     */
    public toJson(): TestRunnerFoundationInstance {
        return Object.assign(super.toJson(), { entity: this.name });
    }
}
