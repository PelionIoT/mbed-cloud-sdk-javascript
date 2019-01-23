import { FoundationInstance } from "../Instance/foundationInstance";
import { Cache } from "./cache";
import { SDKInstance } from "../Instance/sdkInstance";
import { EntityInstance } from "../Instance/entityInstance";
import { Config } from "../../../src";

export class FoundationInstanceCache extends Cache<FoundationInstance> {

    constructor() {
        super();
    }

    /**
     * List all SDK instances
     */
    public listSdkInstances(): Array<SDKInstance> {
        return super.listInstances().filter(i => i instanceof SDKInstance);
    }

    /**
     * List all Entity instances
     */
    public listEntityInstances(): Array<EntityInstance> {
        return super.listInstances().filter(i => i instanceof EntityInstance);
    }

    /**
     * Create an SDK instance
     * @param config configuration object for SDK
     */
    public createSDKInstance(config: Config): SDKInstance {
        const instance = new SDKInstance(config);
        super.addInstance(instance.id, instance);
        return instance;
    }

    /**
     * Create an Entity instance
     * @param name Name of entity to create
     * @param config Configuration for entity
     */
    public createEntityInstance(name: string, config: Config): EntityInstance {
        const instance = new EntityInstance(name, config);
        super.addInstance(instance.id, instance);
        return instance;
    }
}
