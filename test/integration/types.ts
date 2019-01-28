import { TestResult, TestError } from "./server/api/serverMessages";
import { SDKError } from "../../src/common/sdkError";
import { ServerError } from "./server/error";
interface SdkModule {
    name: string | undefined;
    pythonName: string | undefined;
}
interface SdkModuleInstance {
    instance: any;
    sdkModule: SdkModule;
}
type Method = (() => void);
type SuccessCallback = (result: TestResult | undefined) => void;
type ErrorCallback = (error: TestError | undefined) => void;
type Exception = SDKError | ServerError;

export function pascalToCamel(string: string) {
    if (string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }
}

export {
    Method,
    SuccessCallback,
    ErrorCallback,
    SdkModule,
    SdkModuleInstance,
    Exception
};
