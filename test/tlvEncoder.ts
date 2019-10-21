// tslint:disable:max-classes-per-file
import { Serialization, Strings } from "../src/common/tlv";

// This code produces valid TLV objects but it's intended only for testing purposes!

const TYPES = {
    OBJECT_INSTANCE: 0b00000000,
    RESOURCE_INSTANCE_WITH_VALUE: 0b01000000,
    MULTIPLE_RESOURCE: 0b10000000,
    RESOURCE_WITH_VALUE: 0b11000000,
};

const DATA_TYPES = {
    FLOAT: "Float",
    STRING: "String",
    INTEGER: "Integer",
    BOOLEAN: "Boolean",
    TIME: "Time",
    OPAQUE: "Opaque",
};

class TlvNode {
    _id: any;
    _children: any[];
    constructor(id) {
        this._id = id;
        this._children = [];
    }

    static get DATA_TYPES() {
        return DATA_TYPES;
    }

    get id() {
        return this._id;
    }

    get type(): number {
        throw new Error("Not Implemented.");
    }

    // eslint-disable-next-line no-unused-vars
    addChild(_node) {
        throw new Error("This node cannot have children.");
    }

    _serialize() {
        // Specs: 6.4.3 table 21
        // Bits 7-6: Indicates the type of Identifier.
        // Bit 5: Indicates the Length of the Identifier.
        // 0 = The Identifier field of this TLV is 8 bits long
        // 1 = The Identifier field of this TLV is 16 bits long
        // Bit 4-3: Indicates the type of Length
        // 00 = No length field, the value immediately follows the Identifier field
        //      in is of the length indicated by Bits 2-0 of this field
        // 01 = The Length field is 8-bits and Bits 2-0 MUST be ignored
        // 10 = The Length field is 16-bits and Bits 2-0 MUST be ignored
        // 11 = The Length field is 24-bits and Bits 2-0 MUST be ignored
        // Bits 2-0: A 3-bit unsigned integer indicating the Length of the Value.
        // Value: Sequence of bytes of Length. Value of the tag. The format
        // of the value depends on the Resource’s data type (See Appendix C).
        // This is NOT AN OPTIMAL ENCODER, its main purpose is to produce
        // TLV values for testing then, for simplicity, we have fixed length
        // fields (regardless the effective values we have to store)

        // This is not a fully featured TLV encoder, its main purpose is
        // to generate test streams for the TLV parser. For simplicity
        // we assume that we are always running on a little endian machine.
        const valueFieldBytes = this._serializeValue();

        let typeField = this.type;
        const lengthField = valueFieldBytes.length;

        // If enough then fit ID in one byte (instead of two)
        let idFieldBytes = [];
        if (this.id <= (1 << 8) - 1) {
            idFieldBytes = Serialization.uint8ToBytes(this.id);
        } else {
            typeField = typeField | 0b00100000;
            idFieldBytes = Serialization.uint16ToBytes(this.id);
        }

        // We have bits 2-0 but we can use it only if length is at most
        // 7 bytes, if we need more then we have to reserve space for
        // the Length field (which can be 1, 2 or 3 bytes itself).
        let lengthFieldBytes = [];
        if (lengthField <= 7) {
            typeField = typeField | lengthField;
        } else {
            if (lengthField <= (1 << 8) - 1) {
                typeField = typeField | 0b00001000;
                lengthFieldBytes = Serialization.uint8ToBytes(lengthField);
            } else if (lengthField <= (1 << 16) - 1) {
                typeField = typeField | 0b00010000;
                lengthFieldBytes = Serialization.uint16ToBytes(lengthField);
            } else if (lengthField <= (1 << 24) - 1) {
                typeField = typeField | 0b00011000;
                lengthFieldBytes = Serialization.uint24ToBytes(lengthField);
            }
        }

        // Not exactly the best from performance POV...
        return [typeField].concat(idFieldBytes, lengthFieldBytes, valueFieldBytes);
    }

    _serializeValue() {
        let result = [];
        for (const child of this._children) {
            // Not exactly the best from performance POV...
            result = result.concat(child._serialize());
        }

        return result;
    }
}

class TlvObjectInstance extends TlvNode {
    constructor(id) {
        super(id);
    }

    get type() {
        return TYPES.OBJECT_INSTANCE;
    }

    addChild(node) {
        const isResourceWithValue = node instanceof TlvResourceWithValue;
        const isMultipleResource = node instanceof TlvMultipleResource;

        if (!isResourceWithValue && !isMultipleResource) {
            throw new Error("Only TlvResourceWithValue and TlvMultipleResource can be children of TlvObjectInstance.");
        }

        this._children.push(node);
    }

    addResourceValue(id, dataType, value) {
        this._children.push(new TlvResourceWithValue(id, dataType, value));
    }
}

class TlvMultipleResource extends TlvNode {
    get type() {
        return TYPES.MULTIPLE_RESOURCE;
    }

    addChild(node) {
        if (!(node instanceof TlvResourceInstanceWithValue)) {
            throw new Error("Only TlvResourceInstanceWithValue can be child of TlvMultipleResource.");
        }

        this._children.push(node);
    }
}

class TlvResource extends TlvNode {
    _dataType: any;
    _value: any;
    constructor(id, dataType, value) {
        super(id);

        this._dataType = dataType;
        this._value = value;
    }

    get dataType() {
        return this._dataType;
    }

    get value() {
        return this._value;
    }

    // For integer and flaots we do not pick the "best" type, floats are
    // always 64 bit and integers always 32 bit (also note that 64 bit integers
    // are not supported).
    _serializeValue() {
        switch (this.dataType) {
            case DATA_TYPES.OPAQUE:
                return this.value; // Must be an array already
            case DATA_TYPES.STRING:
                return Serialization.stringToBytes(this.value);
            case DATA_TYPES.BOOLEAN:
                return [!!this.value];
            case DATA_TYPES.FLOAT:
                return Serialization.float64ToBytes(this.value);
            case DATA_TYPES.INTEGER:
                return Serialization.int32ToBytes(this.value);
            case DATA_TYPES.TIME:
                return Array.from(new Uint8Array(new Int32Array([this.value.getTime() / 1000]).buffer)).reverse();
        }
    }
}

class TlvResourceInstanceWithValue extends TlvResource {
    get type() {
        return TYPES.RESOURCE_INSTANCE_WITH_VALUE;
    }
}

class TlvResourceWithValue extends TlvResource {
    get type() {
        return TYPES.RESOURCE_WITH_VALUE;
    }
}

class TlvEncoder {
    static createRootObjectInstance(id) {
        return new TlvObjectInstance(id);
    }

    static toBase64String(node) {
        // TODO: a valid TLV packet may contain multiple resources
        // without an OBJECT_INSTANCE root (see for example 6.4.3.1),
        // in this case it might be handy to accept change prototype to
        // toBase64String(...nodes) and concatenate arrays into a single
        // base64 encoded string.
        return Strings.encodeBase64(node._serialize());
    }
}

export {
    TlvObjectInstance,
    TlvMultipleResource,
    TlvResourceInstanceWithValue,
    TlvResourceWithValue,
    TlvEncoder,
    TlvNode,
};
