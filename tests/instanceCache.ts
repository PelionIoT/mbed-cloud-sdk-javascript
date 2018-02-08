import * as cache from "memory-cache";
import { ServerError } from "./error";
import { SdkModuleInstance } from "./sdkModuleInstance";
import { reverseMapModule, mapModule } from "./argumentMapping";
import { ConnectionOptions } from "./common/interfaces";

const moduleList: Array<string> = ["AccountManagementApi", "CertificatesApi", "ConnectApi", "DeviceDirectoryApi", "UpdateApi", "TestStubApi"];

function fetchModuleInstance(instanceId: string | undefined): SdkModuleInstance {
    const instance: SdkModuleInstance | undefined = cache.get(instanceId);
    if (!instance || instance === null) {
        throw new ServerError(404, `No such instance ["${instanceId}"] in cache`);
    }
    return instance;
}
function listAllModules(): Array<string> {
    return moduleList.map((m: string) => reverseMapModule(m));
}
function listAllInstances(): Array<SdkModuleInstance> {
    return cache.keys().map((k: string) => cache.get(k));
}
function listAllInstancesOfAModule(module: string | undefined): Array<SdkModuleInstance> {
    const sdkModule = (module) ? mapModule(module) : "";
    if (moduleList.filter((m: string) => m === sdkModule).length === 0) {
        throw new ServerError(404, `No such module in the SDK- ["${module}"]`);
    }
    return listAllInstances().filter((i: SdkModuleInstance) => i.module.pythonName === module);
}
function deleteInstance(instanceId: string): void {
    return cache.del(instanceId);
}
function deleteAllInstance(): void {
    return cache.clear();
}
function createModuleInstance(module: string | undefined, config: ConnectionOptions | undefined): SdkModuleInstance {
    const instance: SdkModuleInstance = new SdkModuleInstance(module, config);
    if (!instance.isValid()) {
        throw new ServerError(500, `Instance ("${instance.id}") of module ["${instance.module}"] cannot be stored, as invalid`);
    }
    cache.put(instance.id, instance);
    return instance;
}

export {
    fetchModuleInstance,
    listAllModules,
    listAllInstances,
    listAllInstancesOfAModule,
    deleteInstance,
    deleteAllInstance,
    createModuleInstance
};
