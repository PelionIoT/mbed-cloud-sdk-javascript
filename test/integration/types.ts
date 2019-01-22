import { TestResult, TestError } from "./server/serverMessages";
import { SDKError } from "../../src/common/sdkError";
import { ServerError } from "./server/error";
interface SdkModule {
    name: string | undefined;
    pythonName: string | undefined;
}
interface Instance {
    instance: any;
    sdkModule: SdkModule;
}
type Method = (() => void);
type SuccessCallback = (result: TestResult | undefined) => void;
type ErrorCallback = (error: TestError | undefined) => void;
type Exception = SDKError | ServerError;

export {
    Method,
    SuccessCallback,
    ErrorCallback,
    SdkModule,
    Instance,
    Exception
};
