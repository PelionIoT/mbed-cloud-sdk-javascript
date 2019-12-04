import { TlvParser } from "../../../common";
import { parseValueFromType } from "../../common/functions";
import { decodeBase64AsString, toString } from "../../../common/tlv/utils/strings";
export class ResourceValue {
    constructor({ payload, resource = {}, tlvParser, }) {
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
    toString() {
        if (!this.stringValue) {
            if (this.resource.contentType && this.resource.contentType.indexOf("tlv") > -1) {
                this.stringValue = this.tlvParser
                    ? this.tlvParser.parseDataAndConvertToString(this.payload)
                    : TlvParser.parseDataAndConvertToString(this.payload);
            }
            else {
                this.stringValue = toString(this.value);
            }
        }
        return this.stringValue;
    }
    /**
     * Will return the json representation of the resource value, if it is a tlv value
     */
    toJson() {
        if (this.jsonValue) {
            return this.jsonValue;
        }
        if (this.resource.contentType && this.resource.contentType.indexOf("tlv") > -1) {
            this.jsonValue = this.tlvParser
                ? this.tlvParser.parseDataAndConvertToJson(this.payload)
                : TlvParser.parseDataAndConvertToJson(this.payload);
            return this.jsonValue;
        }
        else {
            return {};
        }
    }
    getLatLongValue(resource) {
        if (resource.path && resource.path.startsWith("/6")) {
            const payloadJson = this.toJson();
            const value = typeof payloadJson[0] === "object" ? payloadJson[0] : payloadJson;
            if (value[0] && value[1]) {
                return { latitude: value[0], longitude: value[1] };
            }
            return null;
        }
    }
    getTlvValue(resource) {
        if (resource.contentType && resource.contentType.indexOf("tlv") > -1) {
            return new TlvParser(this.payload).parse();
        }
        return null;
    }
    getDefaultValue(resource, payload) {
        const decodedPayload = decodeBase64AsString(payload);
        if (resource.type) {
            return parseValueFromType(decodedPayload, resource.type);
        }
        else {
            return decodedPayload;
        }
    }
}
//# sourceMappingURL=resourceValue.js.map