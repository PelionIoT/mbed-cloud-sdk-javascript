"use strict";
/* tslint:disable:array-type */
/* tslint:disable:no-namespace */
/* tslint:disable:no-string-literal */
/* tslint:disable:max-classes-per-file */
/* tslint:disable:no-trailing-whitespace */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var apiBase_1 = require("../common/apiBase");
var sdkError_1 = require("../common/sdkError");
/**
 * PreSharedKeysApi
 */
var PreSharedKeysApi = /** @class */ (function (_super) {
    __extends(PreSharedKeysApi, _super);
    function PreSharedKeysApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Remove a pre-shared key.
     * Remove a pre-shared key.
     * @param endpointName The unique endpoint identifier that this pre-shared key applies to. [Reserved characters](https://en.wikipedia.org/wiki/Percent-encoding#Percent-encoding_reserved_characters) must be percent-encoded.
     */
    PreSharedKeysApi.prototype.deletePreSharedKey = function (endpointName, callback, requestOptions) {
        // verify required parameter "endpointName" is set
        if (endpointName === null || endpointName === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'endpointName' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [];
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
    };
    /**
     * Get a pre-shared key.
     * Check if a pre-shared key for an endpoint exists or not. The response does not contain the secret itself.
     * @param endpointName The unique endpoint identifier that this pre-shared key applies to. [Reserved characters](https://en.wikipedia.org/wiki/Percent-encoding#Percent-encoding_reserved_characters) must be percent-encoded.
     */
    PreSharedKeysApi.prototype.getPreSharedKey = function (endpointName, callback, requestOptions) {
        // verify required parameter "endpointName" is set
        if (endpointName === null || endpointName === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'endpointName' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [];
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
    };
    /**
     * Upload a pre-shared key to Mbed Cloud.
     * Upload a pre-shared key (PSK) for an endpoint to allow it to bootstrap. The existing key will not be overwritten but needs to be deleted first in case of re-setting PSK for an endpoint.  **Note**: The PSK APIs are available only to accounts that have this feature enabled.  &#x60;&#x60;&#x60; Example payloads: {\&quot;endpoint_name\&quot;: \&quot;myEndpoint.host.com\&quot;, \&quot;secret_hex\&quot;: \&quot;4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a\&quot; } {\&quot;endpoint_name\&quot;: \&quot;myEndpoint.host.com\&quot;, \&quot;secret_hex\&quot;: \&quot;0x4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a\&quot; } &#x60;&#x60;&#x60;
     * @param body Pre-shared key to be uploaded.
     */
    PreSharedKeysApi.prototype.uploadPreSharedKey = function (body, callback, requestOptions) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
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
    };
    return PreSharedKeysApi;
}(apiBase_1.ApiBase));
exports.PreSharedKeysApi = PreSharedKeysApi;

//# sourceMappingURL=connector_bootstrap.js.map
