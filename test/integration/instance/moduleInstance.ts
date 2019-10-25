import { Instance } from "./instance";
import { mapModule, mapMethod } from "../mapping/argumentMapping";
import { SdkModule, SuccessCallback, ErrorCallback } from "../types";
import { TestStubApi } from "../test/testStub";
import * as PelionDMSDK from "../../../src";
import { SdkApi } from "../mapping/sdkMethod";
import { ServerError } from "../server/error";
import { ModuleDescription } from "../server/api/serverMessages";
import { ConfigOptions } from "../../../src/common/config";

export class ModuleInstance extends Instance<any> {

    public sdkModule: SdkModule;

    constructor(pythonName: string, config: ConfigOptions) {
        const name: string = pythonName ? mapModule(pythonName) : "";
        const constructor = name === "TestStubApi" ? TestStubApi : (PelionDMSDK as any)[name];
        super(new constructor(config));
        this.sdkModule = { pythonName, name };
    }

    public listApis(): Array<SdkApi> {
        const methodList: Array<SdkApi> = [];
        if (!this.isValid()) {
            throw new ServerError(500, `Invalid instance ("${this.id}") of module ["${this.sdkModule.name}"]`);
        }
        for (const prop in this.instance) {
            if (typeof this.instance[prop] === "function") {
                methodList.push(new SdkApi(prop, this.instance[prop]));
            }
        }
        return methodList;
    }

    public executeMethod(methodName: string | undefined, args: any, onResult: SuccessCallback, onError: ErrorCallback): void {
        if (!this.isValid()) {
            throw new ServerError(500, `Invalid instance ("${this.id}") of module ["${this.sdkModule.name}"]`);
        }

        const method: string = this.getSdkRelatedApi(methodName);
        const api: SdkApi = new SdkApi(method, this.instance[method]);
        api.execute(this, args, onResult, onError);
    }

    public toJson(): ModuleDescription {
        return {
            id: this.id,
            module: this.sdkModule.pythonName,
            created_at: this.createdAt.toISOString()
        };
    }

    private getSdkRelatedApi(name: string | undefined): string {
        const api: string = (name) ? mapMethod(name) : "";
        if (api.length === 0 || !this.instance[api]) {
            throw new ServerError(404, `No such method ["${api}"] on module ["${this.sdkModule.name}"]`);
        }
        return api;
    }

}
