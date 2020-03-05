"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../../../common");
var functions_1 = require("../../common/functions");
var strings_1 = require("../../../common/tlv/utils/strings");
var ResourceValue = /** @class */ (function () {
    function ResourceValue(_a) {
        var payload = _a.payload, _b = _a.resource, resource = _b === void 0 ? {} : _b, tlvParser = _a.tlvParser;
        this.payload = payload;
        this.resource = resource;
        this.tlvParser = tlvParser;
        this.value =
            this.getLatLongValue(this.resource) ||
                this.getTlvValue(this.resource) ||
                this.getDefaultValue(this.resource, this.payload);
    }
    /**
     * Return the value of the resource as a string
     */
    ResourceValue.prototype.toString = function () {
        if (!this.stringValue) {
            if (this.resource.contentType && this.resource.contentType.includes("tlv")) {
                this.stringValue = this.tlvParser
                    ? this.tlvParser.parseDataAndConvertToString(this.payload)
                    : common_1.TlvParser.parseDataAndConvertToString(this.payload);
            }
            else {
                this.stringValue = strings_1.toString(this.value);
            }
        }
        return this.stringValue;
    };
    /**
     * Will return the json representation of the resource value, if it is a tlv value
     */
    ResourceValue.prototype.toJson = function () {
        if (this.jsonValue) {
            return this.jsonValue;
        }
        if (this.resource.contentType && this.resource.contentType.includes("tlv")) {
            this.jsonValue = this.tlvParser
                ? this.tlvParser.parseDataAndConvertToJson(this.payload)
                : common_1.TlvParser.parseDataAndConvertToJson(this.payload);
            return this.jsonValue;
        }
        else {
            return {};
        }
    };
    ResourceValue.prototype.getLatLongValue = function (resource) {
        if (resource.path && resource.path.startsWith("/6")) {
            var payloadJson = this.toJson();
            var value = typeof payloadJson[0] === "object" ? payloadJson[0] : payloadJson;
            if (value[0] && value[1]) {
                return { latitude: value[0], longitude: value[1] };
            }
            return null;
        }
    };
    ResourceValue.prototype.getTlvValue = function (resource) {
        if (resource.contentType && resource.contentType.includes("tlv")) {
            return new common_1.TlvParser(this.payload).parse();
        }
        return null;
    };
    ResourceValue.prototype.getDefaultValue = function (resource, payload) {
        var decodedPayload = strings_1.decodeBase64AsString(payload);
        if (resource.type) {
            return functions_1.parseValueFromType(decodedPayload, resource.type);
        }
        else {
            return decodedPayload;
        }
    };
    return ResourceValue;
}());
exports.ResourceValue = ResourceValue;
//# sourceMappingURL=resourceValue.js.map