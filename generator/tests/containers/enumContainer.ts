import { EnumContainer } from "../../containers/enumContainer/enumContainer";

const singleValueEnumExpected = `export type SomeEnum = "FIRST_VALUE";`;

const multipleValueEnumExpected = `export type SomeEnum = "FIRST_VALUE" | "SECOND_VALUE" | "THIRD_VALUE";`;

describe("enum container tests", () => {

    it("should render enum with single value", async () => {
        const enumContainer = new EnumContainer("SomeEnum", [ "FIRST_VALUE" ]);
        const r = await enumContainer.render();

        expect(r).toBe(singleValueEnumExpected);
    });

    it("should render enum with multiple values", async () => {
        const enumContainer = new EnumContainer("SomeEnum", [ "FIRST_VALUE", "SECOND_VALUE", "THIRD_VALUE" ]);
        const r = await enumContainer.render();

        expect(r).toBe(multipleValueEnumExpected);
    });

});
