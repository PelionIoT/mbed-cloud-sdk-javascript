import { TlvParser, TlvDataType, TlvValueType, TlvValue } from "../../../../src/common/tlv";
import { TlvEncoder, TlvNode } from "../../../tlvEncoder";

describe("TlvValue", () => {
    describe("valueToString()", () => {
        test("should guess string 1", () => {
            const tlv = TlvParser.parseData(
                "CAAy6BZEDDI0LjYxMTExMDY4N+gV4wgAAAAAAAAAAOgV5AgAAAAAAAAAyOcWRUNlbHNpdXMIARDoFkQMMzQuNDQ0NDQyNzQ5CAIQ6BZEDDIyLjIyMjIyMTM3NQ=="
            );
            const entry = tlv.next().value as TlvValue;
            expect(entry.findChildById(5701).valueToString()).toEqual("Celsius");
        });
        test("should guess string 2", () => {
            const tlv = TlvParser.parseData(
                "CAAy6BZEDDI0LjYxMTExMDY4N+gV4wgAAAAAAAAAAOgV5AgAAAAAAAAAyOcWRUNlbHNpdXMIARDoFkQMMzQuNDQ0NDQyNzQ5CAIQ6BZEDDIyLjIyMjIyMTM3NQ=="
            );
            const instance = tlv.next().value as TlvValue;

            expect(
                instance
                    .findChildById(5700)
                    .valueToString()
                    .indexOf("24") !== -1
            ).toBeTruthy();
        });
        test("should use resource info if available", () => {
            const info: any = {
                resources: {
                    "5701": {
                        name: "Unit",
                        description: "Unit of measure",
                        type: "String",
                    },
                },
            };
            const tlv = TlvParser.parseData(
                "CAAy6BZEDDI0LjYxMTExMDY4N+gV4wgAAAAAAAAAAOgV5AgAAAAAAAAAyOcWRUNlbHNpdXMIARDoFkQMMzQuNDQ0NDQyNzQ5CAIQ6BZEDDIyLjIyMjIyMTM3NQ==",
                info
            );
            const instance = tlv.next().value as TlvValue;
            const resource = instance.findChildById(5701);

            expect(resource.name).toEqual("Unit");
            expect(resource.description).toEqual("Unit of measure");
            expect(resource.dataType).toEqual(TlvDataType.String);
        });
        test("should set data type for known objects (3336)", () => {
            const root = TlvEncoder.createRootObjectInstance(3336);
            root.addResourceValue("5514", TlvNode.DATA_TYPES.STRING, "100");
            root.addResourceValue("5515", TlvNode.DATA_TYPES.STRING, "200");
            const data = TlvEncoder.toBase64String(root);

            const tlv = TlvParser.parseData(data, { objectId: "3336" } as any);
            const entry = tlv.next().value as TlvValue;
            expect(entry.valueToString()).toEqual("100 200");
        });
    });

    describe("children", () => {
        test("should be consumed multiple times", () => {
            const tlv = TlvParser.parseData("CAAY6BbbCAAAAAAAAAAA6BbaCAAAAAAAAAAA");
            const instance = tlv.next().value as TlvValue;

            // Don't assume the type of tlv.children, just be sure that even
            // if it's in iterable object we can consume it multiple times
            let count = 0;
            // eslint-disable-next-line no-unused-vars
            for (const _child of instance.children) {
                ++count;
            }

            // eslint-disable-next-line no-unused-vars
            for (const _child of instance.children) {
                --count;
            }

            expect(count === 0).toBeTruthy();
        });
    });

    describe("toString()", () => {
        test("should contain the root instance ID", () => {
            const text = TlvParser.parseDataAndConvertToString("CAAY6BbbCAAAAAAAAAAA6BbaCAAAAAAAAAAA");

            expect(text.indexOf("/0:")).not.toEqual(-1);
        });
        test("should contain all children", () => {
            const text = TlvParser.parseDataAndConvertToString("CAAY6BbbCAAAAAAAAAAA6BbaCAAAAAAAAAAA");

            expect(text.indexOf("/5851")).not.toEqual(-1);
            expect(text.indexOf("/5850")).not.toEqual(-1);
        });
        test("should order values by ID", () => {
            // This TLV has two values 5851 and 5050 (declared in this order)
            const text = TlvParser.parseDataAndConvertToString("CAAY6BbbCAAAAAAAAAAA6BbaCAAAAAAAAAAA");

            expect(text.indexOf("/5851") > text.indexOf("/5850")).toBeTruthy();
        });
        test("should not output empty lines", () => {
            const text = TlvParser.parseDataAndConvertToString(
                "iAsLSAAIAAAAAAAAAADBEFXIACA2NDY1NzY1ZjZkNjE2ZTc1NjY2MTYzNzQ3NTcyNjU3MsgBIDY0NjU3NjVmNmQ2ZjY0NjU2YzVmNmU3NTZkNjI2NTcywQIwyBEPZGV2X2RldmljZV90eXBlyBIUZGV2X2hhcmR3YXJlX3ZlcnNpb27IFQgAAAAAAAAAAMgNCAAAAABawyxj"
            );
            expect(!text.includes("\n\n")).toBeTruthy();
        });
        test("should not output line breaks for strings", () => {
            const tlv = TlvParser.parseData(
                "CAAy6BZEDDI0LjYxMTExMDY4N+gV4wgAAAAAAAAAAOgV5AgAAAAAAAAAyOcWRTEyMwo0NTYIARDoFkQMMzQuNDQ0NDQyNzQ5CAIQ6BZEDDIyLjIyMjIyMTM3NQ=="
            );
            const entry = tlv.next().value as TlvValue;

            // Original string contains a new line character, asString() returns
            // literal content then it has to be there.
            expect(entry.findChildById(5701).asString()).toEqual("123\n456");

            // toString() is a "pretty-print" output, line breaks inside
            // strings are removed but it adds more of its stuff (including
            // trailing line breaks).
            expect(entry.findChildById(5701).toString()).toEqual("/5701: 123456\n");
        });
    });
});

describe("TlvParser", () => {
    describe("parseData (base64)", () => {
        test("should parse a single instance", () => {
            const tlv = TlvParser.parseData("CAAY6BbbCAAAAAAAAAAA6BbaCAAAAAAAAAAA");
            expect((tlv.next().value as TlvValue).type).toEqual(TlvValueType.ObjectInstance);
        });
        test("should parse correct number of children", () => {
            const tlv = TlvParser.parseData("CAAY6BbbCAAAAAAAAAAA6BbaCAAAAAAAAAAA");
            const children = Array.from((tlv.next().value as TlvValue).children);

            expect(children.length).toEqual(2);
        });
        test("should parse multiple instances (custom)", () => {
            const tlv = TlvParser.parseData(
                "iAsLSAAIAAAAAAAAAADBEFXIACA2NDY1NzY1ZjZkNjE2ZTc1NjY2MTYzNzQ3NTcyNjU3MsgBIDY0NjU3NjVmNmQ2ZjY0NjU2YzVmNmU3NTZkNjI2NTcywQIwyBEPZGV2X2RldmljZV90eXBlyBIUZGV2X2hhcmR3YXJlX3ZlcnNpb27IFQgAAAAAAAAAAMgNCAAAAABawyxj"
            );
            const instances = Array.from(tlv);
            expect(instances.length).toEqual(9);
        });
        test("should parse 6.4.3.2.A", () => {
            // Corrected data from https://github.com/ARMmbed/mbed-cloud-sdk-java/blob/master/lwm2m/src/test/java/com/mbed/lwm2m/tlv/TestTLVDecoder.java
            const data: any = [
                0x08,
                0x00,
                0x79,
                0xc8,
                0x00,
                0x14,
                0x4f,
                0x70,
                0x65,
                0x6e,
                0x20,
                0x4d,
                0x6f,
                0x62,
                0x69,
                0x6c,
                0x65,
                0x20,
                0x41,
                0x6c,
                0x6c,
                0x69,
                0x61,
                0x6e,
                0x63,
                0x65,
                0xc8,
                0x01,
                0x16,
                0x4c,
                0x69,
                0x67,
                0x68,
                0x74,
                0x77,
                0x65,
                0x69,
                0x67,
                0x68,
                0x74,
                0x20,
                0x4d,
                0x32,
                0x4d,
                0x20,
                0x43,
                0x6c,
                0x69,
                0x65,
                0x6e,
                0x74,
                0xc8,
                0x02,
                0x09,
                0x33,
                0x34,
                0x35,
                0x30,
                0x30,
                0x30,
                0x31,
                0x32,
                0x33,
                0xc3,
                0x03,
                0x31,
                0x2e,
                0x30,
                0x86,
                0x06,
                0x41,
                0x00,
                0x01,
                0x41,
                0x01,
                0x05,
                0x88,
                0x07,
                0x08,
                0x42,
                0x00,
                0x0e,
                0xd8,
                0x42,
                0x01,
                0x13,
                0x88,
                0x87,
                0x08,
                0x41,
                0x00,
                0x7d,
                0x42,
                0x01,
                0x03,
                0x84,
                0xc1,
                0x09,
                0x64,
                0xc1,
                0x0a,
                0x0f,
                0x83,
                0x0b,
                0x41,
                0x00,
                0x00,
                0xc4,
                0x0d,
                0x51,
                0x82,
                0x42,
                0x8f,
                0xc6,
                0x0e,
                0x2b,
                0x30,
                0x32,
                0x3a,
                0x30,
                0x30,
                0xc1,
                0x10,
                0x55,
            ];

            const tlv = TlvParser.parseData(data);

            // In this example, a request for the Device Object Instance (ID:3) of a LwM2M client is made
            // (Read /3). The Device Object is a Single-Instance Object, but the Object Instance TLV is used
            const instance = Array.from(tlv)[0];

            expect(instance.findChildById(0x00).asString()).toEqual("Open Mobile Alliance");
            expect(instance.findChildById(0x01).asString()).toEqual("Lightweight M2M Client");
            expect(instance.findChildById(0x02).asString()).toEqual("345000123");
            expect(instance.findChildById(0x03).asString()).toEqual("1.0");

            expect(instance.findChildById(0x06).type).toEqual(TlvValueType.MultipleResource);
            expect(instance.findChildById(0x06, 0x00).asInteger()).toEqual(1);
            expect(instance.findChildById(0x06, 0x01).asInteger()).toEqual(5);
            expect(instance.findChildById(0x07).type).toEqual(TlvValueType.MultipleResource);
            expect(instance.findChildById(0x07, 0x00).asInteger()).toEqual(0x0ed8);
            expect(instance.findChildById(0x07, 0x01).asInteger()).toEqual(0x1388);
            expect(instance.findChildById(0x08).type).toEqual(TlvValueType.MultipleResource);
            expect(instance.findChildById(0x08, 0x00).asInteger()).toEqual(0x7d);
            expect(instance.findChildById(0x08, 0x01).asInteger()).toEqual(0x0384);
            expect(instance.findChildById(0x09).asInteger()).toEqual(0x64);
            expect(instance.findChildById(0x0a).asInteger()).toEqual(0x0f);
            expect(instance.findChildById(0x08).type).toEqual(TlvValueType.MultipleResource);
            expect(instance.findChildById(0x0b, 0x00).asInteger()).toEqual(0x00);
            expect(instance.findChildById(0x0d).asInteger()).toEqual(0x5182428f);
            expect(instance.findChildById(0x0e).asString()).toEqual("+02:00");
            expect(instance.findChildById(0x10).asString()).toEqual("U");
        });
        test("should parse 6.4.3.2.B", () => {
            // Corrected data from https://github.com/ARMmbed/mbed-cloud-sdk-java/blob/master/lwm2m/src/test/java/com/mbed/lwm2m/tlv/TestTLVDecoder.java
            const data: any = [
                0x08,
                0x00,
                0x0e,
                0xc1,
                0x00,
                0x01,
                0xc1,
                0x01,
                0x00,
                0x83,
                0x02,
                0x41,
                0x7f,
                0x07,
                0xc1,
                0x03,
                0x7f,
                0x08,
                0x02,
                0x12,
                0xc1,
                0x00,
                0x03,
                0xc1,
                0x01,
                0x00,
                0x87,
                0x02,
                0x41,
                0x7f,
                0x07,
                0x61,
                0x01,
                0x36,
                0x01,
                0xc1,
                0x03,
                0x7f,
            ];

            const tlv = TlvParser.parseData(data);

            // In this example, a request on the Access Control Object (ID:2) of a
            // LwM2M client is made (Read /2). The Access Control Object is a Multiple-Instances
            // Object. In this simplified example, it has only 2 instances describing the access rights of two
            // LwM2M Servers with Short IDs 127 and 310 on Objects Instances /1/0 and /3/0.
            // The client responds with a TLV payload including the 2 Object Instances (ID:0 and ID:2) and their Resources
            const instances = Array.from(tlv);

            expect(instances[0].findChildById(0).asInteger()).toEqual(0x01);
            expect(instances[0].findChildById(0).type).toEqual(TlvValueType.ResourceWithValue);
            expect(instances[1].findChildById(0).asInteger()).toEqual(0x03);
            expect(instances[1].findChildById(0).type).toEqual(TlvValueType.ResourceWithValue);
        });
        test("should read string", () => {
            const tlv = TlvParser.parseData(
                "CAAy6BZEDDI0LjYxMTExMDY4N+gV4wgAAAAAAAAAAOgV5AgAAAAAAAAAyOcWRUNlbHNpdXMIARDoFkQMMzQuNDQ0NDQyNzQ5CAIQ6BZEDDIyLjIyMjIyMTM3NQ=="
            );
            const entry = tlv.next().value as TlvValue;

            expect(entry.findChildById(5701).asString()).toEqual("Celsius");
        });
        test("should read boolean", () => {
            const tlv = TlvParser.parseData("CAAM6BbaCAAAAAAAAAAA");
            const entry = tlv.next().value as TlvValue;

            expect(entry.findChildById(5850).asBoolean()).toEqual(false);
        });
        test("should correctly parse empty fields", () => {
            const tlv = TlvParser.parseData("CAAbyAAIAAAAAAAAAADIAQgAAAAAAAAOEMEGAMAH");
            expect(tlv).not.toBeNull();
        });
    });
    describe("parseData (array)", () => {
        test("should read boolean", () => {
            const tlv = TlvParser.parseData([8, 0, 12, 232, 22, 218, 8, 0, 0, 0, 0, 0, 0, 0, 0] as any);
            const entry = tlv.next().value as TlvValue;
            const resource = entry.findChildById(5850);

            expect(resource).not.toBeNull();
            expect(resource.asBoolean()).toEqual(false);
        });
    });
    describe("parseData (function)", () => {
        test("should read boolean", () => {
            const tlv = TlvParser.parseData(() => [8, 0, 12, 232, 22, 218, 8, 0, 0, 0, 0, 0, 0, 0, 0] as any);
            const entry = tlv.next().value as TlvValue;
            const resource = entry.findChildById(5850);

            expect(resource).not.toBeNull();
            expect(resource.asBoolean()).toEqual(false);
        });
    });
    describe("parseDataAndConvertToString", () => {
        test("should order multiple instances by ID", () => {
            const text = TlvParser.parseDataAndConvertToString(
                "iAsLSAAIAAAAAAAAAADBEFXIACA2NDY1NzY1ZjZkNjE2ZTc1NjY2MTYzNzQ3NTcyNjU3MsgBIDY0NjU3NjVmNmQ2ZjY0NjU2YzVmNmU3NTZkNjI2NTcywQIwyBEPZGV2X2RldmljZV90eXBlyBIUZGV2X2hhcmR3YXJlX3ZlcnNpb27IFQgAAAAAAAAAAMgNCAAAAABawyxj"
            );
            expect(text.indexOf("/16:") > text.indexOf("/1:")).toBeTruthy();
        });
    });
});
