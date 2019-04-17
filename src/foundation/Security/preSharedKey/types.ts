/**
 *PreSharedKeyCreateRequest
 */
export interface PreSharedKeyCreateRequest {
    /**
     *The unique endpoint identifier that this pre-shared key applies to. 16-64 [printable](https://en.wikipedia.org/wiki/ASCII#Printable_characters) (non-control) ASCII characters.
     *@example my-endpoint-0001
     */
    readonly endpointName: string;

    /**
     *The secret of the pre-shared key in hexadecimal. It is not case sensitive; 4a is same as 4A, and it is allowed with or without 0x in the beginning. The minimum length of the secret is 128 bits and maximum 256 bits.
     *@example 4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a
     */
    readonly secretHex: string;
}