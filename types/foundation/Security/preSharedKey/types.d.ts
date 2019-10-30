/**
 *PreSharedKeyCreateRequest
 */
export interface PreSharedKeyCreateRequest {
    /**
     *The Id of the pre_shared_key, shadows the endpoint_name
     *@example my-endpoint-0001
     */
    readonly endpointName?: string;
    /**
     *The secret of the PSK in hexadecimal. It is not case sensitive; 4a is same as 4A, and it is allowed with or without 0x in the beginning. The minimum length of the secret is 128 bits and maximum 256 bits.
     *@example 4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a
     */
    readonly secretHex: string;
}
