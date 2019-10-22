import { StringBuilder } from "../../../../../src/common/tlv";

describe("StringBuilder", () => {
    describe("Constructor", () => {
        test("should use an empty string as default", () => {
            const sb = new StringBuilder();
            expect(sb.toString()).toEqual("");
        });
        test("should accept a new initial value", () => {
            const sb = new StringBuilder("test");
            expect(sb.toString()).toEqual("test");
        });
    });

    describe("isEmpty", () => {
        test("should be true when buffer is empty", () => {
            const sb = new StringBuilder();
            expect(sb.isEmpty).toEqual(true);
        });
        test("should be false when buffer is not empty", () => {
            const sb = new StringBuilder("something");
            expect(sb.isEmpty).toEqual(false);
        });
    });

    describe("last", () => {
        test("should return last character in buffer", () => {
            const sb = new StringBuilder("123");
            expect(sb.last).toEqual("3");
        });
        test("should return undefined if buffer is empty", () => {
            const sb = new StringBuilder();
            expect(sb.last).toEqual(undefined);
        });
    });

    describe("append", () => {
        test("should append the specified text", () => {
            const sb = new StringBuilder("this_is_a_");
            sb.append("test");
            expect(sb.toString()).toEqual("this_is_a_test");
        });
        test("should append the specified text multiple times", () => {
            const sb = new StringBuilder();
            sb.append(2, "test");
            expect(sb.toString()).toEqual("testtest");
        });
        test("should not append anything is multiplicity is 0", () => {
            const sb = new StringBuilder();
            sb.append(0, "test");
            expect(sb.toString()).toEqual("");
        });
    });

    describe("appendLine", () => {
        test("should append a new line after the specified text", () => {
            const sb = new StringBuilder("this_is_a_");
            sb.appendLine("test");
            expect(sb.toString()).toEqual("this_is_a_test\n");
        });
        test("should append a new line even when text is empty", () => {
            const sb = new StringBuilder("this_is_a_");
            sb.appendLine("");
            expect(sb.toString()).toEqual("this_is_a_\n");
        });
    });
    describe("clear", () => {
        test("should clear the string and return previous content", () => {
            const sb = new StringBuilder("test");
            const content = sb.clear();

            expect(content).toEqual("test");
            expect(sb.isEmpty).toEqual(true);
        });
    });
});
