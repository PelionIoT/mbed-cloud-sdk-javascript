import { Entity } from "../../../common/entity";
/**
 *PreSharedKey
 */
export interface PreSharedKey extends Entity {
    /**
     *The date-time (RFC3339) when this pre-shared key was uploaded to Pelion device management.
     *@example 2017-07-21T17:32:28.012Z
     */
    readonly createdAt?: Date;

    /**
     *The unique endpoint identifier that this pre-shared key applies to. 16-64 [printable](https://en.wikipedia.org/wiki/ASCII#Printable_characters) (non-control) ASCII characters.
     *@example my-endpoint-0001
     */
    endpointName: string;
}
