import { TlvParser, TlvValue } from "../../../common";
import { parseValueFromType } from "../../common/functions";
import { LatLong } from "../types";
import { Resource } from "./resource";
import { decodeBase64AsString, toString } from "../../../common/tlv/utils/strings";

export class ResourceValue {
    private tlvParser: TlvParser;
    private stringValue: string;
    private jsonValue: any;
    public readonly value: string | number | LatLong | IterableIterator<TlvValue>;
    public readonly resource: Resource;
    public readonly payload: string;
    constructor({
        payload,
        resource = {},
        tlvParser,
    }: {
        payload: string;
        resource?: Resource;
        tlvParser?: TlvParser;
    }) {
        this.payload = payload;
        this.resource = resource;
        this.tlvParser = tlvParser;

        this.value =
            this.getLatLongValue(this.resource) ||
            this.getTlvValue(this.resource) ||
            this.getDefaultValue(this.resource, this.payload);
    }
    public toString() {
        if (!this.stringValue) {
            if (this.resource.contentType && this.resource.contentType.indexOf("tlv") > -1) {
                this.stringValue = this.tlvParser
                    ? this.tlvParser.parseDataAndConvertToString(this.payload)
                    : TlvParser.parseDataAndConvertToString(this.payload);
            } else {
                this.stringValue = toString(this.value);
            }
        }

        return this.stringValue;
    }
    public toJson() {
        if (this.jsonValue) {
            return this.jsonValue;
        }

        if (this.resource.contentType && this.resource.contentType.indexOf("tlv") > -1) {
            this.jsonValue = this.tlvParser
                ? this.tlvParser.parseDataAndConvertToJson(this.payload)
                : TlvParser.parseDataAndConvertToJson(this.payload);
            return this.jsonValue;
        } else {
            return {};
        }
    }

    private getLatLongValue(resource: Resource) {
        if (resource.path && resource.path.startsWith("/6")) {
            const payloadJson = this.toJson();
            const value = typeof payloadJson[0] === "object" ? payloadJson[0] : payloadJson;
            if (value[0] && value[1]) {
                return { latitude: value[0], longitude: value[1] } as LatLong;
            }

            return null;
        }
    }

    private getTlvValue(resource: Resource) {
        if (resource.contentType && resource.contentType.indexOf("tlv") > -1) {
            return new TlvParser(this.payload).parse();
        }

        return null;
    }

    private getDefaultValue(resource: Resource, payload: string) {
        const decodedPayload = decodeBase64AsString(payload);
        if (resource.type) {
            return parseValueFromType(decodedPayload, resource.type);
        } else {
            return decodedPayload;
        }
    }
}