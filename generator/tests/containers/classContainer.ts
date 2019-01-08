import { ClassContainer } from "../../containers/classContainer/classContainer";
import { PropertyContainer } from "../../containers/propertyContainer/propertyContainer";
import { MethodContainer } from "../../containers/methodContainer/methodContainer";

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

const interfaceWithPropertyExpected =
`/**
*TestInterface
*/
export interface TestInterface {

/**
*testProperty
*/
 testProperty: string;

}`;

const interfaceWithMultiplePropertyExpected =
`/**
*TestInterface
*/
export interface TestInterface {

/**
*testProperty
*/
 testProperty: string;

/**
*anotherTestProperty
*/
 anotherTestProperty: string;

}`;

describe("class with properties", () => {

    it("should render interface with property", async () => {
        const interfaceWithProperty = new ClassContainer("TestInterface", { isInterface: true });

        const property = new PropertyContainer("testProperty", "string", { isInterface: true });
        interfaceWithProperty.addProperty(property);

        const r = await interfaceWithProperty.render();

        expect(r).toBe(interfaceWithPropertyExpected);
    });

    it("should render interface with multiple properties", async () => {
        const interfaceWithMultipleProperty = new ClassContainer("TestInterface", { isInterface: true });

        const property = new PropertyContainer("testProperty", "string", { isInterface: true });
        interfaceWithMultipleProperty.addProperty(property);

        const secondProperty = new PropertyContainer("anotherTestProperty", "string", { isInterface: true });
        interfaceWithMultipleProperty.addProperty(secondProperty);

        const r = await interfaceWithMultipleProperty.render();

        expect(r).toBe(interfaceWithMultiplePropertyExpected);
    });

});

const classWithSingleMethodExpected =
`/**
*MyClass
*/
export class MyClass {

public getName(): void {
}
}`;

const classWithMultipleMethodsExpected =
`/**
*MyClass
*/
export class MyClass {

public getName(): void {
}
public getUsername(): void {
}
}`;

const classWithMultipleMethodsAndPropertyExpected =
`/**
*MyClass
*/
export class MyClass {

/**
*username
*/
public username: string;

public getName(): void {
}
public getUsername(): void {
}
}`;

describe("class with methods", () => {

    it("should render class with single method", async () => {
        const method = new MethodContainer("getName");
        const myClass = new ClassContainer("MyClass", { methods: [ method ] });
        const r = await myClass.render();

        expect(r).toBe(classWithSingleMethodExpected);
    });

    it("should render class with multiple methods", async () => {
        const method = new MethodContainer("getName");
        const secondMethod = new MethodContainer("getUsername");
        const myClass = new ClassContainer("MyClass", { methods: [ method, secondMethod ] });
        const r = await myClass.render();

        expect(r).toBe(classWithMultipleMethodsExpected);
    });

    it("should render class with multiple methods and properties", async () => {
        const method = new MethodContainer("getName");
        const secondMethod = new MethodContainer("getUsername");
        const property = new PropertyContainer("username", "string");
        const myClass = new ClassContainer("MyClass", { methods: [ method, secondMethod ], properties: [ property ] });
        const r = await myClass.render();

        expect(r).toBe(classWithMultipleMethodsAndPropertyExpected);
    });

});
