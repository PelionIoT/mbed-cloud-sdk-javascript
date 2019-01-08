import { ParameterContainer } from "../../containers/parameterContainer/parameterContainer";
import { ParameterListContainer } from "../../containers/parameterListContainer/parameterListContainer";
import { ParameterBucketContainer } from "../../containers/parameterBucketContainer/parameterBucketContainer";

const singleParameterExpected = "name: string";

const multipleParameterExpected = "name: string,email: string,username: string";

const multipleParameterWithOptionalExpected = "name: string,username: string,email?: string";

const multipleParameterWithMultipleOptionalExpected = "username: string,name?: string,email?: string";

const multipleParametersWithBucket = "name: string,email: string,options?: { username: string }";

const bucketOnlyExpected = "options?: { username: string }";

describe("parameter list tests", () => {

    it("should list single parameter", async () => {
        const parameter = new ParameterContainer("name", "string");
        const parameterList = new ParameterListContainer({ parameters: [ parameter ] });
        const r = await parameterList.render();

        expect(r).toBe(singleParameterExpected);
    });

    it("should list multiple parameters", async () => {
        const parameter = new ParameterContainer("name", "string");
        const secomndParameter = new ParameterContainer("email", "string");
        const thirdParameter = new ParameterContainer("username", "string");
        const parameterList = new ParameterListContainer({ parameters: [ parameter, secomndParameter, thirdParameter ] });
        const r = await parameterList.render();

        expect(r).toBe(multipleParameterExpected);
    });

    it("should list multiple parameters with optional last", async () => {
        const parameter = new ParameterContainer("name", "string");
        const secomndParameter = new ParameterContainer("email", "string", { isRequired: false });
        const thirdParameter = new ParameterContainer("username", "string");
        const parameterList = new ParameterListContainer({ parameters: [ parameter, secomndParameter, thirdParameter ] });
        const r = await parameterList.render();

        expect(r).toBe(multipleParameterWithOptionalExpected);
    });

    it("should list multiple parameters with multiple optional last", async () => {
        const parameter = new ParameterContainer("name", "string", { isRequired: false });
        const secomndParameter = new ParameterContainer("email", "string", { isRequired: false });
        const thirdParameter = new ParameterContainer("username", "string");
        const parameterList = new ParameterListContainer({ parameters: [ parameter, secomndParameter, thirdParameter ] });
        const r = await parameterList.render();

        expect(r).toBe(multipleParameterWithMultipleOptionalExpected);
    });

    it("should list multiple parameters with bucket", async () => {
        const parameter = new ParameterContainer("name", "string");
        const secomndParameter = new ParameterContainer("email", "string");
        const thirdParameter = new ParameterContainer("username", "string");
        const bucket = new ParameterBucketContainer("options", thirdParameter);
        const parameterList = new ParameterListContainer({ parameters: [ parameter, secomndParameter ], bucket });
        const r = await parameterList.render();

        expect(r).toBe(multipleParametersWithBucket);
    });

    it("should list only bucket", async () => {
        const parameter = new ParameterContainer("username", "string");
        const bucket = new ParameterBucketContainer("options", parameter);
        const parameterList = new ParameterListContainer({ bucket });
        const r = await parameterList.render();

        expect(r).toBe(bucketOnlyExpected);
    });

});
