import { TlvParser, TlvValue } from "../../../common";
import { LatLong } from "../types";
import { Resource } from "./resource";
export declare class ResourceValue {
    private tlvParser;
    private stringValue;
    private jsonValue;
    /**
     * The value of the resource in human readable form
     * Can be a string, number, pair of lat long values or a iterator of tlv values
     */
    readonly value: string | number | LatLong | IterableIterator<TlvValue>;
    /**
     * The resource this resource value was read from
     */
    readonly resource: Resource;
    /**
     * The raw base64 encoded payload
     */
    readonly payload: string;
    constructor({ payload, resource, tlvParser, }: {
        payload: string;
        resource?: Resource;
        tlvParser?: TlvParser;
    });
    /**
     * Return the value of the resource as a string
     */
    toString(): string;
    /**
     * Will return the json representation of the resource value, if it is a tlv value
     */
    toJson(): any;
    private getLatLongValue;
    private getTlvValue;
    private getDefaultValue;
}
