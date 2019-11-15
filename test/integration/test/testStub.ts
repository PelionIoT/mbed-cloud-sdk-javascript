import { SDKError } from "../../../src/legacy/common/sdkError";
import { ServerError } from "../server/error";
import { ConfigOptions } from "../../../src/common/config";

export class TestStubApi {

    public options: ConfigOptions | undefined;

    /**
     * @param options connection options
     */
    constructor(options: ConfigOptions | undefined) {
        this.options = options;

    }

    public exception(done: (error: SDKError | ServerError | null, result: any) => void): void {
        done(new ServerError(undefined, "just a test"), null);
    }

    public success(testArgument0: string, testArgument1: number, testArgument2: any, testArgument3: string, done: (error: SDKError | ServerError | null, result: any) => void): void {
        let modifiedDate: Date = new Date();
        const date: number = Date.parse(testArgument3);
        if (date) {
            modifiedDate = new Date(date);
            modifiedDate.setDate(modifiedDate.getDate() + 1);
        }
        done(null, { ...this.options, testArgument0: testArgument0, testArgument1: testArgument1, testArgument2: testArgument2, testArgument3: modifiedDate.toISOString(), success: true });
    }
}
