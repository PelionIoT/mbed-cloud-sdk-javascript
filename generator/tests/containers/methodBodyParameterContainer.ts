import { MethodBodyParameterContainer } from "../../containers/methodBodyContainers/methods/parameters/methodBodyParameterContainer";

const standardExternalExpected = `"user_name": userName`;

const standardRequestExpected = `"user_name": request.userName`;

const standardOptionsExpected = `"user_name": options.userName`;

describe("method body parameter tests", () => {

    it("should render param from standard external", async () => {
        const parameter = new MethodBodyParameterContainer("userName", "user_name");
        const r = await parameter.render();

        expect(r).toBe(standardExternalExpected);
    });

    it("should render param from request", async () => {
        const parameter = new MethodBodyParameterContainer("userName", "user_name", "request");
        const r = await parameter.render();

        expect(r).toBe(standardRequestExpected);
    });

    it("should render param from options", async () => {
        const parameter = new MethodBodyParameterContainer("userName", "user_name", "options");
        const r = await parameter.render();

        expect(r).toBe(standardOptionsExpected);
    });

});
