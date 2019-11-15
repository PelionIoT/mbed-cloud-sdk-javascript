import { Serialization } from "../../../../../src/common/tlv";

describe("Conversions", () => {
    describe("bytesToUInt", () => {
        // https://www.scadacore.com/tools/programming-calculators/online-hex-converter/
        test("should decode 16 bit unsigned integer in network order", () => {
            expect(Serialization.bytesToUInt([0, 0])).toEqual(0);
            expect(Serialization.bytesToUInt([0, 0xff])).toEqual(0x00ff);
            expect(Serialization.bytesToUInt([0xff, 0])).toEqual(0xff00);
            expect(Serialization.bytesToUInt([0xff, 0xff])).toEqual(0xffff);
        });
        test("should decode 32 bit unsigned integer in network order", () => {
            expect(Serialization.bytesToUInt([0, 0, 0, 0])).toEqual(0);
            expect(Serialization.bytesToUInt([0, 0, 0, 0xff])).toEqual(0x000000ff);
            expect(Serialization.bytesToUInt([0, 0, 0xff, 0])).toEqual(0x0000ff00);
            expect(Serialization.bytesToUInt([0, 0xff, 0, 0])).toEqual(0x00ff0000);
            expect(Serialization.bytesToUInt([0xff, 0, 0, 0])).toEqual(0xff000000);
            expect(Serialization.bytesToUInt([0xff, 0xff, 0xff, 0xff])).toEqual(0xffffffff);
        });
    });
    describe("bytesToInt", () => {
        test("should decode 8 bit signed integer in network order", () => {
            expect(Serialization.bytesToInt([0])).toEqual(0);
            expect(Serialization.bytesToInt([0x7f])).toEqual(127);
            expect(Serialization.bytesToInt([0xff])).toEqual(-1);
            expect(Serialization.bytesToInt([0xfe])).toEqual(-2);
        });
        test("should decode 16 bit signed integer in network order", () => {
            expect(Serialization.bytesToInt([0, 0])).toEqual(0);
            expect(Serialization.bytesToInt([0, 0xff])).toEqual(0xff);
            expect(Serialization.bytesToInt([0xff, 0xff])).toEqual(-1);
        });
        test("should decode 32 bit signed integer in network order", () => {
            expect(Serialization.bytesToInt([0, 0, 0, 0])).toEqual(0);
            expect(Serialization.bytesToInt([0, 0, 0, 0xff])).toEqual(0x000000ff);
            expect(Serialization.bytesToInt([0, 0, 0xff, 0])).toEqual(0x0000ff00);
            expect(Serialization.bytesToInt([0, 0xff, 0, 0])).toEqual(0x00ff0000);
            expect(Serialization.bytesToInt([0x7f, 0, 0, 0])).toEqual(0x7f000000);
            expect(Serialization.bytesToInt([0xff, 0xff, 0xff, 0xff])).toEqual(-1);
            expect(Serialization.bytesToInt([0xff, 0xff, 0xff, 0xfe])).toEqual(-2);
        });
        test("should decode 64 bit signed integer in network order", () => {
            expect(Serialization.bytesToInt([0, 0, 0, 0, 0, 0, 0, 0])).toEqual(0);
            expect(Serialization.bytesToInt([0, 0, 0, 0, 0, 0, 0, 0xff])).toEqual(0x00000000000000ff);
            expect(Serialization.bytesToInt([0x7f, 0, 0, 0, 0, 0, 0, 0])).toEqual(0x7f00000000000000);
            expect(Serialization.bytesToInt([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])).toEqual(-1);
        });
    });
    describe("bytesToString", () => {
        test("should decode US-ASCII", () => {
            expect(Serialization.bytesToString([65, 66, 67])).toEqual("ABC");
        });
        test("should decode multibyte UTF-8", () => {
            expect(Serialization.bytesToString([0x46, 0x6f, 0x6f, 0x20, 0xc2, 0xa9, 0x20, 0x62, 0x61, 0x72])).toEqual(
                "Foo © bar"
            );
        });
        test("should ignore leftovers in decoded multibyte UTF-8", () => {
            expect(Serialization.bytesToString([0x46, 0x6f, 0x6f, 0x20, 0xc2, 0xc2])).toEqual("Foo ");
        });
    });
    describe("stringToBytes", () => {
        test("should encode US-ASCII", () => {
            expect(Serialization.stringToBytes("ABC")).toEqual([65, 66, 67]);
        });
        test("should encode multibyte UTF-8", () => {
            expect(Serialization.stringToBytes("Foo © bar")).toEqual([
                0x46,
                0x6f,
                0x6f,
                0x20,
                0xc2,
                0xa9,
                0x20,
                0x62,
                0x61,
                0x72,
            ]);
        });
    });
    describe("bytesToHexDump", () => {
        test("should dump hex values", () => {
            expect(Serialization.bytesToHexDump([65, 66, 67, 68])).toEqual("41 42 43 44");
        });
        test("should dump hex values + ASCII", () => {
            expect(Serialization.bytesToHexDump([65, 66, 67, 68], true)).toEqual("41 42 43 44    ABCD");
        });
        test("should replace non-printable ASCII with dots", () => {
            expect(Serialization.bytesToHexDump([65, 66, 10, 68], true)).toEqual("41 42 0a 44    AB·D");
        });
    });
    describe("int32ToBytes", () => {
        test("should convert to bytes in network order", () => {
            const n = 0x01000002;
            expect(Array.from(Serialization.int32ToBytes(n))).toEqual([1, 0, 0, 2]);
        });
    });
    describe("float64ToBytes", () => {
        test("should convert to bytes in network order", () => {
            // Not best test ever, we actually just check that bytesToFloat() can
            // convert back a value serialized by float64ToBytes().
            const n = 1.0;
            expect(Serialization.bytesToFloat(Serialization.float64ToBytes(n))).toEqual(n);
        });
    });
});
