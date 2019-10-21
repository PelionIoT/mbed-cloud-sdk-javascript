"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-classes-per-file
var _1 = require(".");
// http://openmobilealliance.org/release/LightweightM2M/V1_0_2-20180209-A/OMA-TS-LightweightM2M-V1_0_2-20180209-A.pdf.
// Section 6.4.3:
exports.TLV_MIME_TYPE = "application/vnd.oma.lwm2m+tlv";
// Bits 7-6: Indicates the type of Identifier
// 00 = Object Instance in which case the Value contains  one or more Resource TLVs
// 01 = Resource Instance with Value for use within a multiple Resource TLV
// 10 = Multiple Resource, in which case the Value contains one or more Resource Instance TLVs
// 11 = Resource with Value
/** Represents the type of a `TlvValue` node. */
var TlvValueType;
(function (TlvValueType) {
    TlvValueType[TlvValueType["ObjectInstance"] = 0] = "ObjectInstance";
    TlvValueType[TlvValueType["ResourceInstanceWithValue"] = 64] = "ResourceInstanceWithValue";
    TlvValueType[TlvValueType["MultipleResource"] = 128] = "MultipleResource";
    TlvValueType[TlvValueType["ResourceWithValue"] = 192] = "ResourceWithValue";
})(TlvValueType = exports.TlvValueType || (exports.TlvValueType = {}));
/** Represents the type of the value in a `TlvNode` (if it contains a value). */
var TlvDataType;
(function (TlvDataType) {
    /**
     * This data type indicates that a node has not a (visible) value or that
     * its data type is unknown.
     */
    TlvDataType["None"] = "None";
    // These data types are defined by https://lwm2m-info.test.mbed.com/objects/????
    TlvDataType["Float"] = "Float";
    TlvDataType["String"] = "String";
    TlvDataType["Integer"] = "Integer";
    TlvDataType["Boolean"] = "Boolean";
    TlvDataType["Time"] = "Time";
    TlvDataType["Opaque"] = "Opaque";
    // These data types are not defined my LW2M but they're custom extensions,
    // they might be data types for leaf nodes or composite data types
    // to show the value of a container node.
    TlvDataType["Location"] = "Location";
})(TlvDataType = exports.TlvDataType || (exports.TlvDataType = {}));
// These are known objects which are parsed/displayed as special cases
var KNOWN_IDS = {
    LOCATION: 3336,
};
/**
 * Represents a single TLV value.
 */
var TlvValue = /** @class */ (function () {
    /**
     * Creates a new `TlvValue` object.
     * @param info - Optional information about the resource.
     * @param type - The type of this TLV node.
     * @param id - The ID of this TLV node.
     * @param value - The raw unparsed value of this TLV node.
     */
    function TlvValue(info, type, id, value) {
        this.type = type;
        this.id = typeof id === "string" ? parseInt(id, 10) : id;
        this.value = value;
        this.name = "/" + id;
        this.description = "";
        this.dataType = TlvDataType.None;
        // Object Instance and Resource with Resource Instance TLVs contains other TLVs in their value. The
        // hierarchy is as follows and may be up to 3 levels deep.
        //   * Object Instance TLV, which contains
        //     * Resource TLVs or
        //     * Multiple Resource TLVs, which contains
        //       * Resource Instance TLVs
        this.hasChildren = this.isContainer();
        if (this.hasChildren) {
            var parser = new TlvParserImpl(value, info);
            this._childrenIterator = parser.parse();
            this._children = null;
        }
        else {
            this._childrenIterator = null;
            this._children = [];
        }
        if (info) {
            this.updateWithExternalMetadata(info);
        }
    }
    Object.defineProperty(TlvValue.prototype, "children", {
        /** Gets an array with all the children of this node. */
        get: function () {
            // We keep the iterator to lazily evaluate children but we can't consume it twice.
            // Accessing this property causes the internally stored children
            // iterator to be evaluated once. Subsequent calls will not go through the
            // iterator again. Note, however, that other public functions may cause
            // the iterator to be evaluated (for example toString) then do not assume
            // anything about its state (for example for validation purposes).
            if (this._children === null) {
                if (this._childrenIterator === null) {
                    return [];
                }
                this._children = Array.from(this._childrenIterator);
            }
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Find the first child resource with the specified ID.
     * @param id - The ID of the resource to find, if it is
     * a string then it's first converted to a number. Note that id
     * must be an unsigned 16 bit value. Select children specifying
     * multiple IDs: `node.findChildById(1, 2)` first searches the node's
     * child with ID 1 and then returns the child of that child with ID 2.
     * @returns The resource with the specified id or `null` if not found.
     */
    TlvValue.prototype.findChildById = function () {
        var id = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            id[_i] = arguments[_i];
        }
        if (!this.hasChildren || id.length === 0) {
            return null;
        }
        var numericId = typeof id[0] === "string" ? parseInt(id[0], 10) : id[0];
        var resource = this.children.find(function (x) { return x.id === numericId; });
        if (resource === undefined) {
            return null;
        }
        if (id.length === 1) {
            return resource;
        }
        id.shift();
        return resource.findChildById.apply(resource, __spread(id));
    };
    /**
     * Returns a string representation of this node and all its children (if any).
     * @param output - The string builder used to construct the output string.
     * You can use this when you need to dump the value of this node together with the output of other nodes.
     * @param customValueFormatter - Custom function to format nodes value.
     * If specified it accepts a first parameter `TlvValue`, which is the node with the value to format, and
     * a second parameter `TlvDataType` which is the data type for the node (or the guessed one if type
     * is not available). Return value must be a string.
     */
    TlvValue.prototype.toString = function (output, customValueFormatter) {
        if (output === void 0) { output = new _1.StringBuilder(); }
        this.dump(output, 0, customValueFormatter);
        return output.toString();
    };
    /**
     * Returns a JSON representation of this node.
     */
    TlvValue.prototype.toJSON = function () {
        return this.dumpJSON();
    };
    /**
     * Returns a string representation of the value of this node. If data type is not available
     * then it tries to guess the data type from value content and format.
     */
    TlvValue.prototype.valueToString = function () {
        function removeLineBreaks(text) {
            return text.replace(/\r?\n|\r/g, "");
        }
        // Check first for composite data types
        if (this.dataType === TlvDataType.Location) {
            // Location (defined as https://lwm2m-info.test.mbed.com/objects/3336)
            // must have two child nodes for latitude (5514) and Longitude (5515)
            // and they must be lat and long expressed as strings.
            var latitude = this.findChildById(5514);
            var longitude = this.findChildById(5515);
            if (latitude === null || longitude === null) {
                return "";
            }
            return latitude.valueToString() + " " + longitude.valueToString();
        }
        // If it's not a composite data type then only leaf nodes have a value
        if (this.isContainer()) {
            return "";
        }
        switch (this.resolveDataType()) {
            case TlvDataType.String:
                return removeLineBreaks(this.asString());
            case TlvDataType.Float:
                return _1.Strings.toString(this.asFloat());
            case TlvDataType.Integer:
                return _1.Strings.toString(this.asInteger());
            case TlvDataType.Boolean:
                return _1.Strings.toString(this.asBoolean());
            case TlvDataType.Time:
                return this.asTime().toISOString();
            case TlvDataType.Opaque:
                return "[" + _1.Serialization.bytesToHexDump(this.value, false, 8) + "]";
            default:
                return removeLineBreaks(this.asString());
        }
    };
    /** Obtains the string value of this node. If the stored value does not match then result is indeterminate. */
    TlvValue.prototype.asString = function () {
        // Appendix C. Data Types
        // Represented as a UTF-8 string of Length bytes
        return _1.Serialization.bytesToString(this.value);
    };
    /** Obtains the floating point value of this node. If the stored value does not match then result is indeterminate. */
    TlvValue.prototype.asFloat = function () {
        // Appendix C. Data Types
        // Represented as a binary floating  point value [IEEE 754-2008]
        // [FLOAT]. The value may use the binary32 (4 byte length) or
        // binary64 (8 byte length) format as indicated by the Length field.
        // When transmitted over network, the data is represented in network
        // byte order (big endian).
        return _1.Serialization.bytesToFloat(this.value);
    };
    /** Obtains the integer value of this node. If the stored value does not match then result is indeterminate. */
    TlvValue.prototype.asInteger = function () {
        // Appendix C. Data Types
        // Represented as a binary signed integer in network byte order, and
        // in two’s complement representation. The value may be 1 (8-bit),
        // 2 (16-bit), 4 (32-bit) or 8 (64-bit) bytes long as indicated by
        // the Length field. When transmitted over network, the data is
        // represented in network byte order (big endian).
        return _1.Serialization.bytesToInt(this.value);
    };
    /** Obtains the boolean value of this node. If the stored value does not match then result is indeterminate. */
    TlvValue.prototype.asBoolean = function () {
        // Appendix C. Data Types
        // Represented as an 8 bit unsigned Integer with value 0, or 1.
        // The Length of a Boolean value MUST always be 1 byte.
        return this.value[0] !== 0;
    };
    /** Obtains the timestamp value of this node. If the stored value does not match then result is indeterminate. */
    TlvValue.prototype.asTime = function () {
        // Appendix C. Data Types
        // Unix Time. A signed integer representing the number of seconds since
        // Jan 1st, 1970 in the UTC time zone.
        // Same representation as Integer.
        return new Date(this.asInteger() * 1000);
    };
    TlvValue.prototype.isContainer = function () {
        return (this.value &&
            this.value.length > 0 &&
            (this.type === TlvValueType.ObjectInstance || this.type === TlvValueType.MultipleResource));
    };
    TlvValue.prototype.updateWithExternalMetadata = function (info) {
        // If this node has no children then it's a leaf resource (with vale).
        // Root node has not a name in the info object but it has its own
        // root property, because often ID has not a value for the root
        // we cannot even check that info.objectId matches.
        if (this.type === TlvValueType.ObjectInstance) {
            this.name = info.name || this.name;
            this.description = info.description || this.description;
            if (this.id === KNOWN_IDS.LOCATION) {
                this.name = info.name || this.name;
                this.dataType = TlvDataType.Location;
            }
            return;
        }
        if (!this.hasChildren && info.resources !== undefined) {
            var resource = info.resources[this.id];
            if (resource) {
                // If a value is undefined then it's better the default one.
                this.name = resource.name || this.name;
                this.description = resource.description || this.description;
                this.dataType = resource.type || TlvDataType.None;
            }
        }
    };
    TlvValue.prototype.resolveDataType = function () {
        if (this.dataType !== TlvDataType.None) {
            return this.dataType;
        }
        return this.guessDataType();
    };
    TlvValue.prototype.guessDataType = function () {
        function isPrintableAsciiByte(byte) {
            return byte >= 32 && byte < 127;
        }
        // Try to guess from content length and format. Let's be
        // optimistic and assume it's not an opaque type.
        // TODO: guessed value is not cached, if used multiple times
        // then we should save it somewhere (also because we
        // might call as*() functions multiple times and their
        // result is re-evaluated each time).
        // If it's empty we can't guess anything.
        if (this.value.length === 0) {
            return TlvDataType.Opaque;
        }
        // For booleans it's easy because it's too small to be
        // a numeric type and it must be 0 or 1.
        if (this.value.length === 1) {
            if (this.value[0] === 0 || this.value[0] === 1) {
                return TlvDataType.Boolean;
            }
        }
        // Give a chance to a number stored as a string
        if (!Number.isNaN(Number.parseFloat(this.asString()))) {
            return TlvDataType.String;
        }
        // Integers may be 1, 2, 4 or 8 bytes. We can't differentiate
        // timestamps (4 bytes) from plain integers then we just ignore them.
        // It may also be a string but we have no clues.
        if ([1, 2, 4, 8].includes(this.value.length)) {
            return TlvDataType.Integer;
        }
        // We may check for printable characters to guess "String" but it works
        // well only for US-ASCII text. Also we may check for leftovers
        // but IMO it's not worthy.
        if (this.value.every(isPrintableAsciiByte)) {
            return TlvDataType.String;
        }
        return TlvDataType.Opaque;
    };
    TlvValue.prototype.dump = function (output, indent, customValueFormatter) {
        var e_1, _a;
        if (indent > 0) {
            output.append(indent, "\u00a0"); // NO-BREAK SPACE (U+00A0)
            output.append("\u21b3\u00a0"); // DOWNWARDS ARROW WITH TIP RIGHTWARDS (U+21B3)
        }
        var valueAsString = customValueFormatter !== undefined
            ? customValueFormatter(this, this.resolveDataType())
            : this.valueToString();
        output.appendLine(this.name + ": " + valueAsString);
        if (!this.hasChildren) {
            return;
        }
        var childrenSortedById = Array.from(this.children).sort(function (a, b) { return a.id - b.id; });
        try {
            for (var childrenSortedById_1 = __values(childrenSortedById), childrenSortedById_1_1 = childrenSortedById_1.next(); !childrenSortedById_1_1.done; childrenSortedById_1_1 = childrenSortedById_1.next()) {
                var child = childrenSortedById_1_1.value;
                child.dump(output, indent + 1, customValueFormatter);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (childrenSortedById_1_1 && !childrenSortedById_1_1.done && (_a = childrenSortedById_1.return)) _a.call(childrenSortedById_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    TlvValue.prototype.dumpJSON = function () {
        var e_2, _a;
        if (this.hasChildren) {
            var children = [];
            var childrenSortedById = Array.from(this.children).sort(function (a, b) { return a.id - b.id; });
            try {
                for (var childrenSortedById_2 = __values(childrenSortedById), childrenSortedById_2_1 = childrenSortedById_2.next(); !childrenSortedById_2_1.done; childrenSortedById_2_1 = childrenSortedById_2.next()) {
                    var child = childrenSortedById_2_1.value;
                    children.push(child.dumpJSON());
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (childrenSortedById_2_1 && !childrenSortedById_2_1.done && (_a = childrenSortedById_2.return)) _a.call(childrenSortedById_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return { id: this.id, value: children.reduce(function (acc, _a) {
                    var _b;
                    var id = _a.id, value = _a.value;
                    return (__assign(__assign({}, acc), (_b = {}, _b[id] = value, _b)));
                }, {}) };
        }
        return { id: this.id, value: this.valueToString() };
    };
    return TlvValue;
}());
exports.TlvValue = TlvValue;
/** Represents a TLV parser compliant to OMA LWM2M 1.0.2 specs. */
var TlvParser = /** @class */ (function () {
    /**
     * Creates a new parser for the specified data.
     * @param data - Array to parse or a function to obtain it. The function is not evaluated
     * once but each time you call `parse()` method. Data can be a plain JavaScript array, an
     * iterable object (such as a typed array like Uint8Array) or a string (which is decoded
     * as base64 to a byte array). Value stream is iterated then it does not need to be all
     * available when parsing starts.
     * @param info - The object which describes atributes for resources.
     */
    function TlvParser(data, info) {
        this.info = info;
        this.data = data;
    }
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
    TlvParser.parseData = function (data, info) {
        var parser = new TlvParser(data, info);
        return parser.parse();
    };
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
    TlvParser.parseDataAndConvertToString = function (data, info, customValueFormatter) {
        var output = new _1.StringBuilder();
        Array.from(TlvParser.parseData(data, info))
            .sort(function (a, b) { return a.id - b.id; })
            .forEach(function (x) { return x.toString(output, customValueFormatter); });
        return output.toString();
    };
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
    TlvParser.parseDataAndConvertToJson = function (data, info) {
        var output = [];
        Array.from(TlvParser.parseData(data, info))
            .sort(function (a, b) { return a.id - b.id; })
            .forEach(function (x) { return output.push(x.toJSON()); });
        output = output.reduce(function (acc, _a) {
            var _b;
            var id = _a.id, value = _a.value;
            return (__assign(__assign({}, acc), (_b = {}, _b[id] = value, _b)));
        }, {});
        return output;
    };
    /**
     * Parses the input data stream.
     * @returns An iterable object of hierarchical `TlvNode` objects.
     */
    TlvParser.prototype.parse = function () {
        var parser = new TlvParserImpl(this.retrieveDataToParse(), this.info);
        return parser.parse();
    };
    TlvParser.prototype.retrieveDataToParse = function () {
        if (typeof this.data === "function") {
            return this.data();
        }
        if (typeof this.data === "string") {
            return _1.Strings.decodeBase64(this.data);
        }
        // Any other iterable object
        return this.data;
    };
    return TlvParser;
}());
exports.TlvParser = TlvParser;
// Type: 8-bits masked field
// Bits 7-6: Indicates the type of Identifier.
// Bit 5: Indicates the Length of the Identifier.
// Bit 4-3: Indicates the type of Length
// Bits 2-0: A 3-bit unsigned integer indicating the Length of the Value.
var IDENTIFIER_TYPE_MASK = 192;
var IDENTIFIER_LENGTH_MASK = 32;
var LENGTH_TYPE_MASK = 24;
var VALUE_LENGTH_MASK = 7;
var ParserState;
(function (ParserState) {
    ParserState[ParserState["Type"] = 1] = "Type";
    ParserState[ParserState["Identifier"] = 2] = "Identifier";
    ParserState[ParserState["Length"] = 3] = "Length";
    ParserState[ParserState["Value"] = 4] = "Value";
    ParserState[ParserState["Next"] = 5] = "Next";
})(ParserState || (ParserState = {}));
// Note that this parser assumes that data returned from our server
// is always correct, there is not any error/bounds checking then
// if input is malformed we may produce unexpected results.
var TlvParserImpl = /** @class */ (function () {
    function TlvParserImpl(data, info) {
        this.data = data;
        this.info = info;
        this.currentTlvValue = {};
    }
    TlvParserImpl.prototype.parse = function () {
        var state, _a, _b, value, e_3_1;
        var e_3, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    this.currentTlvValue = {};
                    state = ParserState.Type;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    _a = __values(this.data), _b = _a.next();
                    _d.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 5];
                    value = _b.value;
                    if (state === ParserState.Type) {
                        state = this.consumeTypeField(value);
                    }
                    else if (state === ParserState.Identifier) {
                        state = this.consumeIdentifierField(value);
                    }
                    else if (state === ParserState.Length) {
                        state = this.consumeLengthField(value);
                    }
                    else if (state === ParserState.Value) {
                        state = this.consumeValueField(value);
                    }
                    if (!(state === ParserState.Next)) return [3 /*break*/, 4];
                    return [4 /*yield*/, new TlvValue(this.info, this.currentTlvValue.type, this.currentTlvValue.identifier, this.currentTlvValue.valueField)];
                case 3:
                    _d.sent();
                    state = ParserState.Type;
                    _d.label = 4;
                case 4:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_3_1 = _d.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 8:
                    if (state !== ParserState.Type) {
                        throw new Error("TLV stream ended before expected, parser state is " + state + ": ");
                    }
                    return [2 /*return*/];
            }
        });
    };
    TlvParserImpl.prototype.consumeTypeField = function (value) {
        // Specs: 6.4.3 table 21
        // Bits 7-6: Indicates the type of Identifier.
        this.currentTlvValue.type = value & IDENTIFIER_TYPE_MASK;
        // Bit 5: Indicates the Length of the Identifier.
        // 0 = The Identifier field of this TLV is 8 bits long
        // 1 = The Identifier field of this TLV is 16 bits long
        this.currentTlvValue.identifierFieldLength = ((value & IDENTIFIER_LENGTH_MASK) >> 5) + 1;
        this.currentTlvValue.identifierField = [];
        // Bit 4-3: Indicates the type of Length
        // 00 = No length field, the value immediately follows the Identifier field
        //      in is of the length indicated by Bits 2-0 of this field
        // 01 = The Length field is 8-bits and Bits 2-0 MUST be ignored
        // 10 = The Length field is 16-bits and Bits 2-0 MUST be ignored
        // 11 = The Length field is 24-bits and Bits 2-0 MUST be ignored
        this.currentTlvValue.lengthFieldLength = (value & LENGTH_TYPE_MASK) >> 3;
        this.currentTlvValue.lengthField = [];
        // Bits 2-0: A 3-bit unsigned integer indicating the Length of the Value.
        // Value: Sequence of bytes of Length. Value of the tag. The format
        // of the value depends on the Resource’s data type (See Appendix C).
        this.currentTlvValue.valueFieldLength = value & VALUE_LENGTH_MASK;
        this.currentTlvValue.valueField = [];
        return ParserState.Identifier;
    };
    TlvParserImpl.prototype.consumeIdentifierField = function (value) {
        this.currentTlvValue.identifierField.push(value);
        // 6.4.3/21: 8-bit or 16-bit unsigned  as indicated by the Type field.
        if (this.currentTlvValue.identifierField.length === this.currentTlvValue.identifierFieldLength) {
            this.currentTlvValue.identifier = _1.Serialization.bytesToUInt(this.currentTlvValue.identifierField);
            if (this.currentTlvValue.lengthFieldLength > 0) {
                return ParserState.Length;
            }
            // Special case: the Value is empty. Note tht an empty node is always
            // an error but an empty leaf is an error only for certain data types.
            if (!this.currentTlvValue.valueFieldLength) {
                return ParserState.Next;
            }
            return ParserState.Value;
        }
        return ParserState.Identifier;
    };
    TlvParserImpl.prototype.consumeLengthField = function (value) {
        this.currentTlvValue.lengthField.push(value);
        // 6.4.3/21: 0-24-bit unsigned integer as indicated by the Type field.
        if (this.currentTlvValue.lengthField.length === this.currentTlvValue.lengthFieldLength) {
            this.currentTlvValue.valueFieldLength = _1.Serialization.bytesToUInt(this.currentTlvValue.lengthField);
            // Special case: the Value is empty. Note tht an empty node is always
            // an error but an empty leaf is an error only for certain data types.
            if (!this.currentTlvValue.valueFieldLength) {
                return ParserState.Next;
            }
            return ParserState.Value;
        }
        return ParserState.Length;
    };
    TlvParserImpl.prototype.consumeValueField = function (value) {
        // TODO: because of performance we may want to use a fixed size UInt8Array for the Value field.
        this.currentTlvValue.valueField.push(value);
        if (this.currentTlvValue.valueField.length === this.currentTlvValue.valueFieldLength) {
            return ParserState.Next;
        }
        return ParserState.Value;
    };
    return TlvParserImpl;
}());
//# sourceMappingURL=tlvParser.js.map