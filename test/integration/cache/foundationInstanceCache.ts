import { FoundationInstance } from "../Instance/foundationInstance";
import { Cache } from "./cache";
import { SDKInstance } from "../Instance/sdkInstance";
import { EntityInstance } from "../Instance/entityInstance";
import { Config } from "../../../src";

export class FoundationInstanceCache extends Cache<FoundationInstance> {

    constructor() {
        super();
    }
    public listSdkInstances(): Array<SDKInstance> {
        return super.listInstances().filter(i => i instanceof SDKInstance);
    }

    public listEntityInstances(): Array<EntityInstance> {
        return super.listInstances().filter(i => i instanceof EntityInstance);
    }

    public createSDKInstance(config: Config): SDKInstance {
        const instance = new SDKInstance(config);
        super.addInstance(instance);
        return instance;
    }

    public createEntityInstance(name: string, config: Config): EntityInstance {
        const instance = new EntityInstance(name, config);
        super.addInstance(instance);
        return instance;
    }
}
