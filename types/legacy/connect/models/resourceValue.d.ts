import { TlvParser, TlvValue } from "../../../common";
import { LatLong } from "../types";
import { Resource } from "./resource";
export declare class ResourceValue {
    private tlvParser;
    private stringValue;
    private jsonValue;
    readonly value: string | number | LatLong | IterableIterator<TlvValue>;
    readonly resource: Resource;
    readonly payload: string;
    constructor({ payload, resource, tlvParser, }: {
        payload: string;
        resource?: Resource;
        tlvParser?: TlvParser;
    });
    toString(): string;
    toJson(): any;
    private getLatLongValue;
    private getTlvValue;
    private getDefaultValue;
}
