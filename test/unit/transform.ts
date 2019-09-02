import { objectKeysToSnakeCase } from "../../src/common/transform";

describe("test transform function", () => {

    it("should return empty object if input is null", () => {
        expect(objectKeysToSnakeCase(null)).toEqual({});
    });

    it("should transform object keys to snakeCase", () => {

        const obj = {
            firstProp: "first_prop",
            secondProp: "second_prop",
        };

        expect(obj.firstProp).not.toBeUndefined();
        expect((obj as any).first_prop).toBeUndefined();

        const transformedObject = objectKeysToSnakeCase(obj);

        expect(transformedObject.first_prop).not.toBeUndefined();
        expect(transformedObject.firstProp).toBeUndefined();

    });

    it("should transform nested object keys to snakeCase", () => {
        const obj = {
            firstProp: {
                nestedProp: "nestedProp",
            },
            secondProp: {
                twoNestedProp: {
                    threeNestedProp: {
                        nestedProp: "nestedProp",
                    },
                },
            },
        };

        expect(obj.secondProp.twoNestedProp.threeNestedProp.nestedProp).not.toBeUndefined();
        expect((obj as any).second_prop).toBeUndefined();

        const transformedObject = objectKeysToSnakeCase(obj);

        expect(transformedObject.second_prop.two_nested_prop.three_nested_prop.nested_prop).not.toBeUndefined();
    });

});
