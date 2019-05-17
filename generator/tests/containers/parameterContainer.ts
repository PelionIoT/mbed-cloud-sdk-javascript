import { ParameterContainer } from "../../containers/parameterContainer/parameterContainer";

const standardPerameterExpected = "name: string";

const optionalPerameterExpected = "name?: string";

describe("parameter tests", () => {

    it("should render standard parameter", async () => {
        const parameter = new ParameterContainer("name", "string");
        const r = await parameter.render();

        expect(r).toBe(standardPerameterExpected);
    });

    it("should render optional parameter", async () => {
        const parameter = new ParameterContainer("name", "string", { isRequired: false });
        const r = await parameter.render();

        expect(r).toBe(optionalPerameterExpected);
    });

});
