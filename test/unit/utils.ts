import { isObject, isJwt } from "../../src/common/utils";

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
