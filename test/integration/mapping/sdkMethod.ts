import { SdkModule, SdkModuleInstance, Method, SuccessCallback, ErrorCallback, Exception } from "../types";
import { ServerError } from "../server/error";
import { isSpecialMappingMethod, mapSpecialMethodsArg, mapResult, reverseMapMethod } from "./argumentMapping";
import { MethodDescription } from "../server/api/serverMessages";

function retrieveRelatedObject(methodName: string | undefined): string | undefined {
    // Hack to determine from its name, the objects type the API deals with.
    if (!methodName) {
        return undefined;
    }
    const match = methodName.match(/([A-Z]{1}.*)$/);
    if (!match) {
        return undefined;
    }
    return match[1];
}

function flattenArguments(args: any): Array<any> {
    const methodArgs: Array<any> = [];
    if (!args) {
        return methodArgs;
    }
    for (const arg of args) {
        if (typeof arg === "object") {
            Object.keys(arg).forEach(k => {
                methodArgs.push(arg[k]);
            });
        } else if (Array.isArray(arg)) {
            methodArgs.concat(arg);
        } else {
            methodArgs.push(arg);
        }
    }

    return methodArgs;
}

export class SdkApi {
    public name: string;
    public relatedObject: string;
    public argNumber: number;
    public method: Method;

    public constructor(methodName: string, method: Method) {
        this.name = methodName;
        this.relatedObject = retrieveRelatedObject(methodName);
        if (method) {
            this.argNumber = method.length;
            this.method = method;
        } else {
            this.argNumber = 0;
            this.method = undefined;
        }
    }
    public isValid(): boolean {
        return this.method !== undefined;
    }

    private contains(substring: string): boolean {
        if (!this.name) {
            return false;
        }
        return this.name.toLowerCase().indexOf(substring) !== -1;
    }

    public isDelete(): boolean {
        return this.contains("delete");
    }
    public isGet(): boolean {
        return this.contains("get");
    }
    private needsSpecialMapping(module: SdkModule | undefined): boolean {
        return isSpecialMappingMethod((module) ? module.name : undefined, this.name);
    }
    private mapSpecialArg(module: SdkModule, arg: any): any {
        return mapSpecialMethodsArg((module) ? module.name : undefined, this.name, arg);
    }
    private mapSpecialArgs(module: SdkModule | undefined, args: any): any {
        if (!module) {
            return args;
        }
        return args.map((arg: any) => this.mapSpecialArg(module, arg));
    }
    protected mapResult(module: SdkModule | undefined, result: any): any {
        if (!module) {
            return result;
        }
        return mapResult(result);
    }
    protected mapArguments(module: SdkModule | undefined, args: any) {
        let methodArgs: Array<any> = [];
        // Modification of the arguments when special methods
        if (this.needsSpecialMapping(module)) {
            args = this.mapSpecialArgs(module, args);
        }

        if (this.argNumber > 2 || this.isDelete() || this.isGet()) {
            // Arguments need to be flattened
            methodArgs = flattenArguments(args);
        } else {
            if (args && args.length) {
                methodArgs = args;
            }
        }
        // Hack to replace "objectTypeId" to "id" e.g. apiKeyId => id
        if (this.relatedObject) {
            const idField = this.relatedObject[0].toLowerCase() + this.relatedObject.slice(1) + "Id";
            methodArgs.forEach((element: any) => {
                if (element && typeof element === "object") {
                    if (element[idField]) {
                        element.id = element[idField];
                        delete element[idField];
                    }
                }
            });
        }
        return methodArgs;
    }
    public execute(instance: SdkModuleInstance, args: any, onResult: SuccessCallback, onError: ErrorCallback): void {
        if (!this.isValid()) {
            throw new ServerError(500, `Invalid method ("${this.name}")`);
        }
        if (!instance || !instance.instance) {
            throw new ServerError(500, `Invalid instance to execute method ("${this.name}") on`);
        }

        // Maps arguments
        const methodArgs = this.mapArguments(instance.sdkModule, args);
        // Adds call back methods
        methodArgs.push((e: Exception | null, result: any) => {
            if (e) {
                let message = `(${e.code}) ${e.message}`;
                // If a server exception
                if ((e as ServerError).fromTestServer) {
                    message = `${e.message}`;
                }
                onError({
                    message: message,
                    traceback: e.message
                });

            } else {
                onResult({
                    payload: mapResult(result)
                });
            }
        });
        // Call
        if (this.method) {
            this.method.apply(instance.instance, methodArgs);
        }
    }
    public toJson(): MethodDescription {
        return {
            name: (this.name) ? reverseMapMethod(this.name) : undefined,
            number_of_arguments: this.argNumber
        };
    }

}
