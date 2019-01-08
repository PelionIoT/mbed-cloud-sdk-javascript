import { AdapterMapperContainer } from "../../containers/methodBodyContainers/adapter/adapterMapperContainer";

const mapperExpected =
`let loginHistory = [];
if (data.login_history) {
loginHistory = data.login_history.map(i => LoginHistoryAdapter.fromApi(i));
}`;

describe("adapter mapper tests", () => {

    it("should return adapter mapper", async () => {
        const mapper = new AdapterMapperContainer("login_history", "loginHistory", "LoginHistoryAdapter");
        const r = await mapper.render();

        expect(r).toBe(mapperExpected);
    });

});
