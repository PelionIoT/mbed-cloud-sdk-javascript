import { TestResult, TestError } from "./server/api/serverMessages";
import { SDKError } from "../../src/common/sdkError";
import { ServerError } from "./server/error";

export interface SdkModule {
    name: string | undefined;
    pythonName: string | undefined;
}

export interface SdkModuleInstance {
    instance: any;
    sdkModule: SdkModule;
}
export type Method = (() => void);

export type SuccessCallback = (result: TestResult) => void;

export type ErrorCallback = (error: TestError) => void;

export type Exception = SDKError | ServerError;

export function pascalToCamel(string: string) {
    if (string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }
}
