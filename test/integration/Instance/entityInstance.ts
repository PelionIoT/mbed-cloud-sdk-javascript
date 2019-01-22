import { FoundationInstance } from "./foundationInstance";
import { TestRunnerFoundationInstance } from "../foundation/types";
import { Entity } from "../../../src/sdk/common/entity";
import { Config } from "../../../src/sdk";
import { Repository } from "../../../src/sdk/common/repository";
import * as FoundationSDK from "../../../src/sdk/entities";

export class EntityInstance extends FoundationInstance {

    public entityClassInstance?: Entity;
    public entityRepositoryInstance?: Repository;

    constructor(name: string, config: Config) {
        const repoConstructor = FoundationSDK[`${name}Repository`];
        const repo = new repoConstructor(config);
        super(repo);
        this.name = name;
    }
    public toJson(): TestRunnerFoundationInstance {
        return Object.assign({ entity: this.name }, super.toJson());
    }
}
