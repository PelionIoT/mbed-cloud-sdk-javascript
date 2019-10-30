"use strict";
/* tslint:disable:array-type */
/* tslint:disable:no-namespace */
/* tslint:disable:no-string-literal */
/* tslint:disable:max-classes-per-file */
/* tslint:disable:no-trailing-whitespace */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
 * DeveloperCertificateApi
 */
var DeveloperCertificateApi = /** @class */ (function (_super) {
    __extends(DeveloperCertificateApi, _super);
    function DeveloperCertificateApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create a new developer certificate to connect to the bootstrap server.
     * This REST API is intended to be used by customers to get a developer certificate (a certificate that can be flashed into multiple devices to connect to bootstrap server).  **Note:** The number of developer certificates allowed per account is limited. Please see [Using your own certificate authority](/docs/v1.2/mbed-cloud-deploy/instructions-for-factory-setup-and-device-provision.html#using-your-own-certificate-authority-with-mbed-cloud).  **Example usage:** curl -X POST \&quot;http://api.us-east-1.mbedcloud.com/v3/developer-certificates\&quot; -H \&quot;accept: application/json\&quot; -H \&quot;Authorization: Bearer THE_ACCESS_TOKEN\&quot; -H \&quot;content-type: application/json\&quot; -d \&quot;{ \\\&quot;name\\\&quot;: \\\&quot;THE_CERTIFICATE_NAME\\\&quot;, \\\&quot;description\\\&quot;: \\\&quot;THE_CERTIFICATE_DESCRIPTION\\\&quot;}\&quot;
     * @param authorization Bearer {Access Token}.
     * @param body
     */
    DeveloperCertificateApi.prototype.createDeveloperCertificate = function (authorization, body, callback, requestOptions) {
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'authorization' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        if (authorization !== undefined) {
            headerParams["Authorization"] = authorization;
        }
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/developer-certificates",
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
    /**
     * Fetch an existing developer certificate to connect to the bootstrap server.
     * This REST API is intended to be used by customers to fetch an existing developer certificate (a certificate that can be flashed into multiple devices to connect to bootstrap server).  **Example usage:** curl -X GET \&quot;http://api.us-east-1.mbedcloud.com/v3/developer-certificates/THE_CERTIFICATE_ID\&quot; -H \&quot;accept: application/json\&quot; -H \&quot;Authorization: Bearer THE_ACCESS_TOKEN\&quot;
     * @param developerCertificateId A unique identifier for the developer certificate.
     * @param authorization Bearer {Access Token}.
     */
    DeveloperCertificateApi.prototype.getDeveloperCertificate = function (developerCertificateId, authorization, callback, requestOptions) {
        // verify required parameter "developerCertificateId" is set
        if (developerCertificateId === null || developerCertificateId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'developerCertificateId' missing."));
            }
            return;
        }
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'authorization' missing."));
            }
            return;
        }
        var headerParams = {};
        if (authorization !== undefined) {
            headerParams["Authorization"] = authorization;
        }
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/developer-certificates/{developerCertificateId}".replace("{" + "developerCertificateId" + "}", String(developerCertificateId)),
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
    return DeveloperCertificateApi;
}(apiBase_1.ApiBase));
exports.DeveloperCertificateApi = DeveloperCertificateApi;
/**
 * ServerCredentialsApi
 */
var ServerCredentialsApi = /** @class */ (function (_super) {
    __extends(ServerCredentialsApi, _super);
    function ServerCredentialsApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Fetch all (Bootstrap and LWM2M) server credentials.
     * This REST API is intended to be used by customers to fetch all (Bootstrap and LWM2M) server credentials that they will need to use with their clients to connect to bootstrap or LWM2M server.  **Example usage:** curl -X GET \&quot;http://api.us-east-1.mbedcloud.com/v3/server-credentials\&quot; -H \&quot;accept: application/json\&quot; -H \&quot;Authorization: Bearer THE_ACCESS_TOKEN\&quot;
     * @param authorization Bearer {Access Token}.
     */
    ServerCredentialsApi.prototype.getAllServerCredentials = function (authorization, callback, requestOptions) {
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'authorization' missing."));
            }
            return;
        }
        var headerParams = {};
        if (authorization !== undefined) {
            headerParams["Authorization"] = authorization;
        }
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/server-credentials",
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
     * Fetch bootstrap server credentials.
     * This REST API is intended to be used by customers to fetch bootstrap server credentials that they will need to use with their clients to connect to bootstrap server.  **Example usage:** curl -X GET \&quot;http://api.us-east-1.mbedcloud.com/v3/server-credentials/bootstrap\&quot; -H \&quot;accept: application/json\&quot; -H \&quot;Authorization: Bearer THE_ACCESS_TOKEN\&quot;
     * @param authorization Bearer {Access Token}.
     */
    ServerCredentialsApi.prototype.getBootstrapServerCredentials = function (authorization, callback, requestOptions) {
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'authorization' missing."));
            }
            return;
        }
        var headerParams = {};
        if (authorization !== undefined) {
            headerParams["Authorization"] = authorization;
        }
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/server-credentials/bootstrap",
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
     * Fetch LWM2M server credentials.
     * This REST API is intended to be used by customers to fetch LWM2M server credentials that they will need to use with their clients to connect to LWM2M server.  **Example usage:** curl -X GET \&quot;http://api.us-east-1.mbedcloud.com/v3/server-credentials/lwm2m\&quot; -H \&quot;accept: application/json\&quot; -H \&quot;Authorization: Bearer THE_ACCESS_TOKEN\&quot;
     * @param authorization Bearer {Access Token}.
     */
    ServerCredentialsApi.prototype.getL2M2MServerCredentials = function (authorization, callback, requestOptions) {
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'authorization' missing."));
            }
            return;
        }
        var headerParams = {};
        if (authorization !== undefined) {
            headerParams["Authorization"] = authorization;
        }
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/server-credentials/lwm2m",
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
    return ServerCredentialsApi;
}(apiBase_1.ApiBase));
exports.ServerCredentialsApi = ServerCredentialsApi;
//# sourceMappingURL=connector_ca.js.map