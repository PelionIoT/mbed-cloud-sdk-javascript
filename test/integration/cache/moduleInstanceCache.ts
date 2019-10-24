import { Cache } from "./cache";
import { ServerError } from "../server/error";
import * as PelionDMSDK from "../../../src";
import { reverseMapModule, mapModule } from "../mapping/argumentMapping";
import { ModuleInstance } from "../instance/moduleInstance";
import { ConfigOptions } from "../../../src/common/config";

export class ModuleInstanceCache extends Cache<ModuleInstance> {
    private moduleList: Array<string>;
    constructor() {
        super();
        this.moduleList = [ ...(Object.keys(PelionDMSDK)), "TestStubApi" ];
    }

    public getModuleInstance(key: string): ModuleInstance {
        const instance = super.getInstance(key);
        if (!instance) {
            throw new ServerError(404, `No such instance ["${key}"] in cache`);
        }
        return instance;
    }

    public createModuleInstance(module: string, config: ConfigOptions): ModuleInstance {
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
