import { MethodContainer } from "../../containers/methodContainer/methodContainer";
import { ParameterContainer } from "../../containers/parameterContainer/parameterContainer";
import { ParameterListContainer } from "../../containers/parameterListContainer/parameterListContainer";

const basicMethodExpected =
`public getName(): void {
}`;

const privateMethodExpected =
`private getName(): void {
}`;

const staticMethodExpected =
`public static getName(): void {
}`;

const basicMethodReturnsStringExpected =
`public getName(): Promise<string> {
}`;

const methodWithParametersExpected =
`public getName(name: string): void {
}`;

const methodWithMultipleParametersExpected =
`public getName(name: string,username: string): void {
}`;

describe("method container tests", () => {

    it("should render basic method", async () => {
        const method = new MethodContainer("getName");
        const r = await method.render();

        expect(r).toBe(basicMethodExpected);
    });

    it("should render private method", async () => {
        const method = new MethodContainer("getName", { modifier: "private" });
        const r = await method.render();

        expect(r).toBe(privateMethodExpected);
    });

    it("should render static method", async () => {
        const method = new MethodContainer("getName", { isStatic: true });
        const r = await method.render();

        expect(r).toBe(staticMethodExpected);
    });

    it("should render method returns string", async () => {
        const method = new MethodContainer("getName", { returns: "string", promise: true });
        const r = await method.render();

        expect(r).toBe(basicMethodReturnsStringExpected);
    });

    it("should render method with parameters", async () => {
        const parameter = new ParameterContainer("name", "string");
        const parameterList = new ParameterListContainer({ parameters: [ parameter ] });
        const method = new MethodContainer("getName", { parameterList });
        const r = await method.render();

        expect(r).toBe(methodWithParametersExpected);
    });

    it("should render method with multiple parameters", async () => {
        const parameter = new ParameterContainer("name", "string");
        const secondParameter = new ParameterContainer("username", "string");
        const parameterList = new ParameterListContainer({ parameters: [ parameter, secondParameter ] });
        const method = new MethodContainer("getName", { parameterList });
        const r = await method.render();

        expect(r).toBe(methodWithMultipleParametersExpected);
    });

});
