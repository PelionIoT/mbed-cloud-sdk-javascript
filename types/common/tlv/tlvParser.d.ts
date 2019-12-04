import { StringBuilder } from ".";
export declare const TLV_MIME_TYPE = "application/vnd.oma.lwm2m+tlv";
/** Custom formatter to convert a `TlvValue` node into a string. */
export declare type TlvCustomValueFormatter = (value: TlvValue, dataType: TlvDataType) => string;
/** Represents the type of a `TlvValue` node. */
export declare enum TlvValueType {
    ObjectInstance = 0,
    ResourceInstanceWithValue = 64,
    MultipleResource = 128,
    ResourceWithValue = 192
}
/** Represents the type of the value in a `TlvNode` (if it contains a value). */
export declare enum TlvDataType {
    /**
     * This data type indicates that a node has not a (visible) value or that
     * its data type is unknown.
     */
    None = "None",
    Float = "Float",
    String = "String",
    Integer = "Integer",
    Boolean = "Boolean",
    Time = "Time",
    Opaque = "Opaque",
    Location = "Location"
}
/** Contains custom information about a specific LwM2M resource. */
export interface LwM2MResourceInfo {
    name?: string;
    description?: string;
    type?: TlvDataType;
    resources?: Record<number, LwM2MResourceInfo>;
}
/** Represents an already decoded and ready to consume TLV packet. */
export declare type TlvPacketDecoded = IterableIterator<number> | Uint8Array;
/** Represents a TLV packet optionally base64 encoded. */
export declare type TlvPacket = TlvPacketDecoded | string;
/** Represents a source for a `TlvPacket`, it can be an immediate value or a factory function. */
export declare type TlvPacketIndirect = TlvPacket | (() => TlvPacketDecoded);
/**
 * Represents a single TLV value.
 */
export declare class TlvValue {
    /** Gets an array with all the children of this node. */
    get children(): TlvValue[];
    /** Gets the type of this TLV value. */
    readonly type: TlvValueType;
    /** Gets the ID of this TLV value. */
    readonly id: number;
    /** Gets the raw value (as a byte array) of this TLV value. */
    readonly value: any;
    /**  Gets the name of this TLV value. */
    name: string;
    /**  Gets the description of this TLV value. */
    description: string;
    /**  Gets the data type of this TLV value. */
    dataType: TlvDataType;
    /**
     * Indicates whether this node is not a leaf and has children. Note that
     * a malformed node may be marked to have children but its value be empty,
     * if you need to determine this then check both for this property
     * and for `children.length`.
     */
    readonly hasChildren: boolean;
    private _children;
    private readonly _childrenIterator;
    /**
     * Creates a new `TlvValue` object.
     * @param info - Optional information about the resource.
     * @param type - The type of this TLV node.
     * @param id - The ID of this TLV node.
     * @param value - The raw unparsed value of this TLV node.
     */
    constructor(info: LwM2MResourceInfo | undefined, type: TlvValueType, id: string | number, value: any);
    /**
     * Find the first child resource with the specified ID.
     * @param id - The ID of the resource to find, if it is
     * a string then it's first converted to a number. Note that id
     * must be an unsigned 16 bit value. Select children specifying
     * multiple IDs: `node.findChildById(1, 2)` first searches the node's
     * child with ID 1 and then returns the child of that child with ID 2.
     * @returns The resource with the specified id or `null` if not found.
     */
    findChildById(...id: Array<string | number>): TlvValue | null;
    /**
     * Returns a string representation of this node and all its children (if any).
     * @param output - The string builder used to construct the output string.
     * You can use this when you need to dump the value of this node together with the output of other nodes.
     * @param customValueFormatter - Custom function to format nodes value.
     * If specified it accepts a first parameter `TlvValue`, which is the node with the value to format, and
     * a second parameter `TlvDataType` which is the data type for the node (or the guessed one if type
     * is not available). Return value must be a string.
     */
    toString(output?: StringBuilder, customValueFormatter?: TlvCustomValueFormatter): string;
    /**
     * Returns a JSON representation of this node.
     */
    toJSON(): object;
    /**
     * Returns a string representation of the value of this node. If data type is not available
     * then it tries to guess the data type from value content and format.
     */
    valueToString(): string;
    /** Obtains the string value of this node. If the stored value does not match then result is indeterminate. */
    asString(): string;
    /** Obtains the floating point value of this node. If the stored value does not match then result is indeterminate. */
    asFloat(): number;
    /** Obtains the integer value of this node. If the stored value does not match then result is indeterminate. */
    asInteger(): number;
    /** Obtains the boolean value of this node. If the stored value does not match then result is indeterminate. */
    asBoolean(): boolean;
    /** Obtains the timestamp value of this node. If the stored value does not match then result is indeterminate. */
    asTime(): Date;
    private isContainer;
    private updateWithExternalMetadata;
    private resolveDataType;
    private guessDataType;
    private dump;
    private dumpJSON;
}
/** Represents a TLV parser compliant to OMA LWM2M 1.0.2 specs. */
export declare class TlvParser {
    private readonly data;
    private readonly info?;
    /**
     * Creates a new parser for the specified data.
     * @param data - Array to parse or a function to obtain it. The function is not evaluated
     * once but each time you call `parse()` method. Data can be a plain JavaScript array, an
     * iterable object (such as a typed array like Uint8Array) or a string (which is decoded
     * as base64 to a byte array). Value stream is iterated then it does not need to be all
     * available when parsing starts.
     * @param info - The object which describes atributes for resources.
     */
    constructor(data?: TlvPacketIndirect, info?: LwM2MResourceInfo);
    /**
     * Parses the specified data stream.
     * @param data - Array to parse or a function to obtain it. The function is not evaluated
     * once but each time you call `parse()` method. Data can be a plain JavaScript array, an
     * iterable object (such as a typed array like Uint8Array) or a string (which is decoded
     * as base64 to a byte array). Value stream is iterated then it does not need to be all
     * available when parsing starts.
     * @param info - The object which describes atributes for resources.
     * @returns An iterable object of hierarchical `TlvNode` objects.
     */
    static parseData(data: TlvPacketIndirect, info?: LwM2MResourceInfo): IterableIterator<TlvValue>;
    /**
     * Parses the specified data stream and returns its string representation.
     * @param data - Array to parse or a function to obtain it. The function is not evaluated
     * once but each time you call `parse()` method. Data can be a plain JavaScript array, an
     * iterable object (such as a typed array like Uint8Array) or a string (which is decoded
     * as base64 to a byte array). Value stream is iterated then it does not need to be all
     * available when parsing starts.
     * @param info - The object which describes atributes for resources.
     * @param customValueFormatter - Optional formatter used to convert a `TlvValue` to its
     * string representation.
     * @returns The string representation of the specified TLV packet.
     */
    static parseDataAndConvertToString(data: TlvPacketIndirect, info?: LwM2MResourceInfo, customValueFormatter?: TlvCustomValueFormatter): string;
    /**
     * Parses the specified data stream and returns its representation as a simple JSON object.
     * @param data - Array to parse or a function to obtain it. The function is not evaluated
     * once but each time you call `parse()` method. Data can be a plain JavaScript array, an
     * iterable object (such as a typed array like Uint8Array) or a string (which is decoded
     * as base64 to a byte array). Value stream is iterated then it does not need to be all
     * available when parsing starts.
     * @param info - The object which describes atributes for resources.
     * @returns A simple JSON representation of the whole `TlvValue` hierarchy.
     */
    static parseDataAndConvertToJson(data: TlvPacketIndirect, info?: LwM2MResourceInfo): any[];
    /**
     * Parses the input data stream.
     * @returns An iterable object of hierarchical `TlvNode` objects.
     */
    parse(): IterableIterator<TlvValue>;
    parseDataAndConvertToString(data: TlvPacketIndirect, customValueFormatter?: TlvCustomValueFormatter): string;
    parseDataAndConvertToJson(data: TlvPacketIndirect): any[];
    private retrieveDataToParse;
}
