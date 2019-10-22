import { Strings } from "../../../../../src/common/tlv";

describe("Strings.toString()", () => {
    test("returns an empty string for null or undefined", () => {
        expect(Strings.toString(null)).toBe("");
        expect(Strings.toString(undefined)).toBe("");
        expect(Strings.toString("")).toBe("");
    });

    test("returns evaluated value of a function (recursively)", () => {
        expect(Strings.toString(() => "test")).toBe("test");
        expect(Strings.toString(() => () => "test")).toBe("test");
    });

    test("returns arrays joined", () => {
        expect(Strings.toString(["A", "B"])).toBe("A, B");
    });

    test("returns primitive values as string", () => {
        expect(Strings.toString(false)).toBe("false");
        expect(Strings.toString(true)).toBe("true");
        expect(Strings.toString(0)).toBe("0");
        expect(Strings.toString(1)).toBe("1");
        expect(Strings.toString(Symbol.for("a"))).toBe("Symbol(a)");
    });

    test("returns objects as stringified JSON", () => {
        expect(Strings.toString({ value: 1 })).toBe(`{"value":1}`);
    });
});

describe("Strings.decodeBase64", () => {
    test("should return an array", () => {
        const result = Strings.decodeBase64("QUJD");
        expect(Array.isArray(result) || Object.prototype.toString.call(result) === "[object Uint8Array]").toBeTruthy();
        expect(result).toBeTruthy();
    });
    test("should decode a base64 encoded string", () => {
        const result = Strings.decodeBase64("QUJD");
        expect(Array.from(result)).toEqual([65, 66, 67]);
    });
});

describe("Strings.encodeBase64", () => {
    test("should encode a byte array", () => {
        const data = [50, 100, 200, 250];

        const encoded = Strings.encodeBase64(data);
        expect(typeof encoded).toEqual("string");

        const decoded = Strings.decodeBase64(encoded);
        expect(Array.from(decoded)).toEqual(data);
    });
    test("should decode a base64 encoded string", () => {
        const result = Strings.decodeBase64("QUJD");
        expect(Array.from(result)).toEqual([65, 66, 67]);
    });
});
