import { TestResult, TestError } from "./serverMessages";
import { SDKError } from "./common/sdkError";
import { ServerError } from "./error";
interface Module {
    name: string | undefined;
    pythonName: string | undefined;
}
interface Instance {
    instance: any;
    module: Module;
}
type Method = (() => void);
type SuccessCallback = (result: TestResult | undefined) => void;
type ErrorCallback = (error: TestError | undefined) => void;
type Exception = SDKError | ServerError;

export {
    Method,
    SuccessCallback,
    ErrorCallback,
    Instance,
    Module,
    Exception
};
