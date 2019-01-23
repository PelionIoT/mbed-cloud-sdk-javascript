import { Cache } from "./cache";
import { ServerError } from "../server/error";
import * as MbedCloudSDK from "../../../src";
import { reverseMapModule, mapModule } from "../mapping/argumentMapping";
import { ConnectionOptions } from "../../../src/common/interfaces";
import { ModuleInstance } from "../Instance/moduleInstance";

export class ModuleInstanceCache extends Cache<ModuleInstance> {
    private moduleList: Array<string>;
    constructor() {
        super();
        this.moduleList = [ ...(Object.keys(MbedCloudSDK)), "TestStubApi" ];
    }

    public getModuleInstance(key: string): ModuleInstance {
        const instance = super.getInstance(key);
        if (!instance || instance === null) {
            throw new ServerError(404, `No such instance ["${key}"] in cache`);
        }
        return instance;
    }

    public createModuleInstance(module: string, config: ConnectionOptions): ModuleInstance {
        const instance: ModuleInstance = new ModuleInstance(module, config);
        if (!instance.isValid()) {
            throw new ServerError(500, `Instance ("${instance.id}") of module ["${instance.sdkModule}"] cannot be stored, as invalid`);
        }
        super.addInstance(instance.id, instance);
        return instance;
    }

    public listAllModules(): Array<string> {
        return this.moduleList.map((m: string) => reverseMapModule(m));
    }

    public listAllInstancesOfAModule(module: string): Array<ModuleInstance> {
        const sdkModule = module ? mapModule(module) : "";
        if (this.moduleList.filter((m: string) => m === sdkModule).length === 0) {
            throw new ServerError(404, `No such module in the SDK- ["${module}"]`);
        }
        return super.listInstances().filter((i: ModuleInstance) => i.sdkModule.pythonName === module);
    }
}
