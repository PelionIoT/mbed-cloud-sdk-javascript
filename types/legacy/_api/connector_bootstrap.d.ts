/**
 * Bootstrap API
 * Mbed Cloud Bootstrap API allows web applications to control the device bootstrapping process.
 *
 * OpenAPI spec version: 2
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import * as superagent from "superagent";
import { ApiBase } from "../common/apiBase";
export interface ListOfPreSharedKeysWithoutSecret {
    /**
     * An offset token for current page.
     */
    "after"?: string;
    /**
     * An offset token for fetching the next page. Note that exactly the same limit needs to be used on the request for fetching the subsequent pages.
     */
    "continuation_marker"?: string;
    /**
     * Array of the pre-shared key entries. The array is empty if there are no pre-shared keys.
     */
    "data": Array<PreSharedKeyWithoutSecret>;
    /**
     * Are there more results available.
     */
    "has_more": boolean;
    /**
     * The value of limit query parameter from the request, or default if not specified.
     */
    "limit": number;
    /**
     * The type of this API object is a \"list\".
     */
    "object": string;
    /**
     * The creation time based order of the entries.
     */
    "order": string;
}
export interface PreSharedKey {
    /**
     * The unique endpoint identifier that this pre-shared key applies to. 16-64 [printable](https://en.wikipedia.org/wiki/ASCII#Printable_characters) (non-control) ASCII characters.
     */
    "endpoint_name": string;
    /**
     * The secret of the pre-shared key in hexadecimal. It is not case sensitive; 4a is same as 4A, and it is allowed with or without 0x in the beginning. The minimum length of the secret is 128 bits and maximum 256 bits.
     */
    "secret_hex": string;
}
export interface PreSharedKeyWithoutSecret {
    /**
     * The date-time (RFC3339) when this pre-shared key was uploaded to Mbed Cloud.
     */
    "created_at"?: Date;
    /**
     * The unique endpoint identifier that this pre-shared key applies to. 16-64 [printable](https://en.wikipedia.org/wiki/ASCII#Printable_characters) (non-control) ASCII characters.
     */
    "endpoint_name": string;
}
/**
 * PreSharedKeysApi
 */
export declare class PreSharedKeysApi extends ApiBase {
    /**
     * Remove a pre-shared key.
     * Remove a pre-shared key.  **Example usage:**  &#x60;&#x60;&#x60; curl -H \&quot;authorization: Bearer ${API_TOKEN}\&quot; -X DELETE https://api.us-east-1.mbedcloud.com/v2/device-shared-keys/my-endpoint-0001 &#x60;&#x60;&#x60;
     * @param endpointName The unique endpoint identifier that this pre-shared key applies to. [Reserved characters](https://en.wikipedia.org/wiki/Percent-encoding#Percent-encoding_reserved_characters) must be percent-encoded.
     */
    deletePreSharedKey(endpointName: string, callback?: (error: any, data?: any, response?: superagent.Response) => any, requestOptions?: {
        [key: string]: any;
    }): superagent.SuperAgentRequest;
    /**
     * Get a pre-shared key.
     * Check if a pre-shared key for an endpoint exists or not. The response does not contain the secret itself.  **Example usage:**  &#x60;&#x60;&#x60; curl -H \&quot;authorization: Bearer ${API_TOKEN}\&quot; https://api.us-east-1.mbedcloud.com/v2/device-shared-keys/my-endpoint-0001 &#x60;&#x60;&#x60;
     * @param endpointName The unique endpoint identifier that this pre-shared key applies to. [Reserved characters](https://en.wikipedia.org/wiki/Percent-encoding#Percent-encoding_reserved_characters) must be percent-encoded.
     */
    getPreSharedKey(endpointName: string, callback?: (error: any, data?: PreSharedKeyWithoutSecret, response?: superagent.Response) => any, requestOptions?: {
        [key: string]: any;
    }): superagent.SuperAgentRequest;
    /**
     * List pre-shared keys.
     * List pre-shared keys with pagination and default page size of 50 entries.  **Example usage:**  &#x60;&#x60;&#x60; curl -H \&quot;authorization: Bearer ${API_TOKEN}\&quot; https://api.us-east-1.mbedcloud.com/v2/device-shared-keys &#x60;&#x60;&#x60;
     * @param limit The number of entries per page
     * @param after An offset token for fetching a specific page. Provided by the server.
     */
    listPreSharedKeys(limit?: number, after?: string, callback?: (error: any, data?: ListOfPreSharedKeysWithoutSecret, response?: superagent.Response) => any, requestOptions?: {
        [key: string]: any;
    }): superagent.SuperAgentRequest;
    /**
     * Upload a pre-shared key to Mbed Cloud.
     * Upload a pre-shared key (PSK) for an endpoint to allow it to bootstrap. The existing key will not be overwritten but needs to be deleted first in case of re-setting PSK for an endpoint.  **Note**: The PSK APIs are available only to accounts that have this feature enabled.  **Example usage:**  &#x60;&#x60;&#x60; curl -H \&quot;authorization: Bearer ${API_TOKEN}\&quot; -H \&quot;content-type: application/json\&quot; -X POST https://api.us-east-1.mbedcloud.com/v2/device-shared-keys \\      -d &#39;{\&quot;endpoint_name\&quot;: \&quot;my-endpoint-0001\&quot;, \&quot;secret_hex\&quot;: \&quot;4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a\&quot; }&#39; &#x60;&#x60;&#x60;
     * @param body Pre-shared key to be uploaded.
     */
    uploadPreSharedKey(body: PreSharedKey, callback?: (error: any, data?: any, response?: superagent.Response) => any, requestOptions?: {
        [key: string]: any;
    }): superagent.SuperAgentRequest;
}