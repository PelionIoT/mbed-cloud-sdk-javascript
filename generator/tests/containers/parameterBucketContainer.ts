import { ParameterContainer } from "../../containers/parameterContainer/parameterContainer";
import { ParameterBucketContainer } from "../../containers/parameterBucketContainer/parameterBucketContainer";

const bucketSingleParameterExpected = "options?: { name?: string }";

const bucketMultipleParameterExpected = "options?: { name?: string,email?: string }";

describe("parameter bucket tests", () => {

    it("should render bucket with single parameter", async () => {
        const parameter = new ParameterContainer("name", "string", { isRequired: false });
        const bucket = new ParameterBucketContainer("options", parameter);
        const r = await bucket.render();

        expect(r).toBe(bucketSingleParameterExpected);
    });

    it("should render bucket with multiple parameters", async () => {
        const parameter = new ParameterContainer("name", "string", { isRequired: false });
        const secondParameter = new ParameterContainer("email", "string", { isRequired: false });

        const bucket = new ParameterBucketContainer("options", [ parameter, secondParameter ]);
        const r = await bucket.render();

        expect(r).toBe(bucketMultipleParameterExpected);
    });

});
