import { PropertyContainer } from "../../containers/propertyContainer/propertyContainer";

const expectedSimple =
`/**
*testProperty
*/
public testProperty: string;
`;

const expectedPrivate =
`/**
*testProperty
*/
private testProperty: string;
`;

const expectedReadonly =
`/**
*testProperty
*/
public readonly testProperty: string;
`;

const expectedOptional =
`/**
*testProperty
*/
public testProperty?: string;
`;

const expectedFull =
`/**
*testProperty
*/
private readonly testProperty?: string;
`;

const expectedInterface =
`/**
*testProperty
*/
 testProperty: string;
`;

describe("property container tests", () => {

    it("should render basic property", async () => {
        const property = new PropertyContainer("testProperty", "string");
        const r = await property.render();

        expect(r).toEqual(expectedSimple);
    });

    it("should render private property", async () => {
        const property = new PropertyContainer("testProperty", "string", { modifier: "private" });
        const r = await property.render();

        expect(r).toEqual(expectedPrivate);
    });

    it("should render readonly property", async () => {
        const property = new PropertyContainer("testProperty", "string", { isReadonly: true });
        const r = await property.render();

        expect(r).toEqual(expectedReadonly);
    });

    it("should render optional property", async () => {
        const property = new PropertyContainer("testProperty", "string", { isOptional: true });
        const r = await property.render();

        expect(r).toEqual(expectedOptional);
    });

    it("should render full property", async () => {
        const property = new PropertyContainer("testProperty", "string", { isOptional: true, isReadonly: true, modifier: "private" });
        const r = await property.render();

        expect(r).toEqual(expectedFull);
    });

    it("should render basic interface property", async () => {
        const property = new PropertyContainer("testProperty", "string", { isInterface: true });
        const r = await property.render();

        expect(r).toEqual(expectedInterface);
    });

});
