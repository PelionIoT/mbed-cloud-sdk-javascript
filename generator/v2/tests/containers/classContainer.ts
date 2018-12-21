import { ClassContainer } from "../../containers/classContainer/classContainer";
import { PropertyContainer } from "../../containers/propertyContainer/propertyContainer";

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

const emptyInterfaceExpected =
`/**
*TestInterface
*/
export interface TestInterface {

}`;

const extendsInterfaceExpected =
`/**
*TestInterface
*/
export interface TestInterface extends SomeInterface {

}`;

const extendsMultipleInterfaceExpected =
`/**
*TestInterface
*/
export interface TestInterface extends SomeInterface,AnotherInterface {

}`;

describe("interface container tests", () => {

    it("should render basic interface", async () => {
        const emptyInterface = new ClassContainer("TestInterface", { isInterface: true });
        const r = await emptyInterface.render();

        expect(r).toBe(emptyInterfaceExpected);
    });

    it("should render extends interface", async () => {
        const extendsInterface = new ClassContainer("TestInterface", { isInterface: true, extendsClass: "SomeInterface" });
        const r = await extendsInterface.render();

        expect(r).toBe(extendsInterfaceExpected);
    });

    it("should render multiple extends interface", async () => {
        const extendsInterface = new ClassContainer("TestInterface", { isInterface: true, extendsClass: [ "SomeInterface", "AnotherInterface" ] });
        const r = await extendsInterface.render();

        expect(r).toBe(extendsMultipleInterfaceExpected);
    });

});

const classWithPropertyExpected =
`/**
*TestClass
*/
export class TestClass {

/**
*testProperty
*/
public testProperty: string;

}`;

const classWithMultiplePropertyExpected =
`/**
*TestClass
*/
export class TestClass {

/**
*testProperty
*/
public testProperty: string;

/**
*anotherTestProperty
*/
public anotherTestProperty: string;

}`;

describe("class with properties", () => {

    it("should render class with properties", async () => {
        const classWithProperty = new ClassContainer("TestClass");

        const property = new PropertyContainer("testProperty", "string");
        classWithProperty.addProperty(property);

        const r = await classWithProperty.render();

        expect(r).toBe(classWithPropertyExpected);
    });

    it("should render class with multiple properties", async () => {
        const classWithMultipleProperty = new ClassContainer("TestClass");

        const property = new PropertyContainer("testProperty", "string");
        classWithMultipleProperty.addProperty(property);

        const secondProperty = new PropertyContainer("anotherTestProperty", "string");
        classWithMultipleProperty.addProperty(secondProperty);

        const r = await classWithMultipleProperty.render();

        expect(r).toBe(classWithMultiplePropertyExpected);
    });

});
