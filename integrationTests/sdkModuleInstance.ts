import { ErrorCallback, Module, SuccessCallback } from "./types";
import * as MbedCloudSDK from "../src";
import { ConnectionOptions } from "../src/common/interfaces";
import { SdkApi } from "./sdkMethod";
import { ModuleDescription } from "./serverMessages";
import { ServerError } from "./error";
import { mapMethod, mapModule } from "./argumentMapping";
import { TestStubApi } from "./testStub";

function uuidv4(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c: string) => {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export class SdkModuleInstance {

    public module: Module;
    public instance: any;
    public id: string;
    public createdAt: Date;

    public constructor(pythonName: string | undefined, config: ConnectionOptions | undefined) {
        const name: string = pythonName ? mapModule(pythonName) : "";
        this.module = { pythonName, name };
        this.id = `${name}-${uuidv4()}`;
        this.createdAt = new Date();
        const constructor = name === "TestStubApi" ? TestStubApi : (MbedCloudSDK as any)[name];
        if (constructor) {
            this.instance = new constructor(config);
        }
    }
    private getSdkRelatedApi(name: string | undefined): string {
        const api: string = (name) ? mapMethod(name) : "";
        if (api.length === 0 || !this.instance[api]) {
            throw new ServerError(404, `No such method ["${api}"] on module ["${this.module.name}"]`);
        }
        return api;
    }
    public isValid(): boolean {
        return this.instance !== undefined;
    }
    public toJson(): ModuleDescription {
        return {
            id: this.id,
            module: this.module.pythonName,
            created_at: this.createdAt.toISOString()
        };
    }
    public listApis(): Array<SdkApi> {
        const methodList: Array<SdkApi> = [];
        if (!this.isValid()) {
            throw new ServerError(500, `Invalid instance ("${this.id}") of module ["${this.module.name}"]`);
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
            throw new ServerError(500, `Invalid instance ("${this.id}") of module ["${this.module.name}"]`);
        }

        const method: string = this.getSdkRelatedApi(methodName);
        const api: SdkApi = new SdkApi(method, this.instance[method]);
        api.execute(this, args, onResult, onError);
    }
}
