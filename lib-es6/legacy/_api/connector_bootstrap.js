/* tslint:disable:array-type */
/* tslint:disable:no-namespace */
/* tslint:disable:no-string-literal */
/* tslint:disable:max-classes-per-file */
/* tslint:disable:no-trailing-whitespace */
import { ApiBase } from "../common/apiBase";
import { SDKError } from "../common/sdkError";
/**
 * PreSharedKeysApi
 */
export class PreSharedKeysApi extends ApiBase {
    /**
     * Remove a pre-shared key.
     * Remove a pre-shared key.  **Example usage:**  &#x60;&#x60;&#x60; curl -H \&quot;authorization: Bearer ${API_TOKEN}\&quot; -X DELETE https://api.us-east-1.mbedcloud.com/v2/device-shared-keys/my-endpoint-0001 &#x60;&#x60;&#x60;
     * @param endpointName The unique endpoint identifier that this pre-shared key applies to. [Reserved characters](https://en.wikipedia.org/wiki/Percent-encoding#Percent-encoding_reserved_characters) must be percent-encoded.
     */
    deletePreSharedKey(endpointName, callback, requestOptions) {
        // verify required parameter "endpointName" is set
        if (endpointName === null || endpointName === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'endpointName' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [];
        return this.request({
            url: "/v2/device-shared-keys/{endpoint_name}".replace("{" + "endpoint_name" + "}", String(endpointName)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    }
    /**
     * Get a pre-shared key.
     * Check if a pre-shared key for an endpoint exists or not. The response does not contain the secret itself.  **Example usage:**  &#x60;&#x60;&#x60; curl -H \&quot;authorization: Bearer ${API_TOKEN}\&quot; https://api.us-east-1.mbedcloud.com/v2/device-shared-keys/my-endpoint-0001 &#x60;&#x60;&#x60;
     * @param endpointName The unique endpoint identifier that this pre-shared key applies to. [Reserved characters](https://en.wikipedia.org/wiki/Percent-encoding#Percent-encoding_reserved_characters) must be percent-encoded.
     */
    getPreSharedKey(endpointName, callback, requestOptions) {
        // verify required parameter "endpointName" is set
        if (endpointName === null || endpointName === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'endpointName' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [];
        return this.request({
            url: "/v2/device-shared-keys/{endpoint_name}".replace("{" + "endpoint_name" + "}", String(endpointName)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    }
    /**
     * List pre-shared keys.
     * List pre-shared keys with pagination and default page size of 50 entries.  **Example usage:**  &#x60;&#x60;&#x60; curl -H \&quot;authorization: Bearer ${API_TOKEN}\&quot; https://api.us-east-1.mbedcloud.com/v2/device-shared-keys &#x60;&#x60;&#x60;
     * @param limit The number of entries per page
     * @param after An offset token for fetching a specific page. Provided by the server.
     */
    listPreSharedKeys(limit, after, callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v2/device-shared-keys",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    }
    /**
     * Upload a pre-shared key to Mbed Cloud.
     * Upload a pre-shared key (PSK) for an endpoint to allow it to bootstrap. The existing key will not be overwritten but needs to be deleted first in case of re-setting PSK for an endpoint.  **Note**: The PSK APIs are available only to accounts that have this feature enabled.  **Example usage:**  &#x60;&#x60;&#x60; curl -H \&quot;authorization: Bearer ${API_TOKEN}\&quot; -H \&quot;content-type: application/json\&quot; -X POST https://api.us-east-1.mbedcloud.com/v2/device-shared-keys \\      -d &#39;{\&quot;endpoint_name\&quot;: \&quot;my-endpoint-0001\&quot;, \&quot;secret_hex\&quot;: \&quot;4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a\&quot; }&#39; &#x60;&#x60;&#x60;
     * @param body Pre-shared key to be uploaded.
     */
    uploadPreSharedKey(body, callback, requestOptions) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v2/device-shared-keys",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    }
}
//# sourceMappingURL=connector_bootstrap.js.map