import { ClassContainer } from "../../containers/classContainer/classContainer";

const emptyClassExpected =
`/**
*TestClass
*/
export class TestClass {
}`;

const extendsClassExpected =
`/**
*TestClass
*/
export class TestClass extends AnotherClass {
}`;

const implementsClassExpected =
`/**
*TestClass
*/
export class TestClass implements AnotherClass {
}`;

const implementsMultipleClassExpected =
`/**
*TestClass
*/
export class TestClass implements AnotherClass,YetAnotherClass {
}`;

const implementsMultipleAnExtendsClassExpected =
`/**
*TestClass
*/
export class TestClass extends BaseClass implements AnotherClass,YetAnotherClass {
}`;

describe("class container tests", () => {

    it("should render empty class", async () => {
        const emptyClass = new ClassContainer("TestClass");
        const r = await emptyClass.render();

        expect(r).toBe(emptyClassExpected);
    });

    it("should render extends class", async () => {
        const extendsClass = new ClassContainer("TestClass", { extendsClass: "AnotherClass" });
        const r = await extendsClass.render();

        expect(r).toBe(extendsClassExpected);
    });

    it("should render implements class", async () => {
        const implementsClass = new ClassContainer("TestClass", { implementsClasses: [ "AnotherClass" ] });
        const r = await implementsClass.render();

        expect(r).toBe(implementsClassExpected);
    });

    it("should render implements multiple class", async () => {
        const implementsClass = new ClassContainer("TestClass", { implementsClasses: [ "AnotherClass", "YetAnotherClass" ] });
        const r = await implementsClass.render();

        expect(r).toBe(implementsMultipleClassExpected);
    });

    it("should render implements multiple and extends class", async () => {
        const implementsClass = new ClassContainer("TestClass", { extendsClass: "BaseClass", implementsClasses: [ "AnotherClass", "YetAnotherClass" ] });
        const r = await implementsClass.render();

        expect(r).toBe(implementsMultipleAnExtendsClassExpected);
    });

});
