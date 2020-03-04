import { Entity } from "../../../common/entity";
/**
 *PreSharedKey
 */
export interface PreSharedKey extends Entity {
    /**
     *The date-time (RFC3339) when this PSK was uploaded to Device Management.
     *@example 2017-07-21T17:32:28.012Z
     */
    readonly createdAt?: Date;
    /**
     *The unique endpoint identifier that this PSK applies to. 16-64 [printable](https://en.wikipedia.org/wiki/ASCII#Printable_characters) (non-control) ASCII characters.
     *@example my-endpoint-0001
     */
    endpointName?: string;
}
