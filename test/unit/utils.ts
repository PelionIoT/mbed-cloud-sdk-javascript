import { isObject, isJwt, union, arraysEqual } from "../../src/common/utils";

describe("tests for isObject utility function", () => {

    it("should return true if object", () => {
        const obj = {
            someProp: "prop",
        };

        expect(isObject(obj)).toBeTruthy();
    });

    it("should return false if not object", () => {
        const aNull = null;
        expect(isObject(aNull)).toBeFalsy();

        const aString = "string";
        expect(isObject(aString)).toBeFalsy();

        const aInt = 45;
        expect(isObject(aInt)).toBeFalsy();

        const anArray = ["abc"];
        expect(isObject(anArray)).toBeFalsy();
    });

});

describe("tests for isJwt utility function", () => {

    it("should return true if jwt", () => {
        const jwt = "rt_XKDvjkOzqMr6hGAD10VEdTh3SjZZ3iEY/X1fZkoCMaMq6mWyO5ZpXcdSiANAT+Tj9MlI0jz+lKjtmi/F9oAQnFQ9WtL3Gu965CyO0O73YXmrG3MIdmHiyOOxU+cpNB79RtjsbfQ8ajIL5q6O9GIRkYsnXcGuIllPLO/hKoRCoZI";

        expect(isJwt(jwt)).toBeTruthy();
    });

    it("should return false if api key", () => {
        const key = "ak_1MDE1YTllM2FjODM1MDI0MjBhMDE0MDBhMDAwMDAwMDA016b27";

        expect(isJwt(key)).toBeFalsy();
    });

    it("should return false if null", () => {
        expect(isJwt(null)).toBeFalsy();
    });

});

describe("tests for union of two arrays", () => {
    it("should return true if arrays are equal", () => {
        const equal = arraysEqual([1, 2, 3], [1, 2, 3]);
        expect(equal).toBeTruthy();
    });

    it("should return false if arrays not of same length", () => {
        const equal = arraysEqual([1, 2], [1, 2, 3]);
        expect(equal).toBeFalsy();
    });

    it("should return false if arrays are same lenght but values are unequal", () => {
        const equal = arraysEqual([1, 2], [3, 4]);
        expect(equal).toBeFalsy();
    });

    it("should return true if arrays have same items out of order", () => {
        const equal = arraysEqual([1, 2], [2,1]);
        expect(equal).toBeTruthy();
    });

    it("should return union of number array", () => {
        const numberUnion = union([1, 2, 3, 4, 5, 6, 7], [5, 6, 7, 8]);
        expect(numberUnion).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it("should return union of object array", () => {
        const numberUnion = union(
            [
                {
                    x: "1"
                },
                {
                    x: "2"
                },
                {
                    x: "3"
                }
            ],
            [
                {
                    x: "3"
                },
                {
                    x: "4"
                }
            ], (x, y) => x.x === y.x);
        expect(numberUnion).toEqual([
            {
                x: "1"
            },
            {
                x: "2"
            },
            {
                x: "3"
            },
            {
                x: "4"
            }
        ]);
    });
});
