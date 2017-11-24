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
 * DeveloperCertificateApi
 */
var DeveloperCertificateApi = /** @class */ (function (_super) {
    __extends(DeveloperCertificateApi, _super);
    function DeveloperCertificateApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Fetch an existing developer certificate to connect to the bootstrap server.
     * This REST API is intended to be used by customers to fetch an existing developer certificate (a certificate that can be flashed into multiple devices to connect to bootstrap server).
     * @param id A unique identifier for the developer certificate.
     * @param authorization Bearer {Access Token}.
     */
    DeveloperCertificateApi.prototype.v3DeveloperCertificatesIdGet = function (id, authorization, callback, requestOptions) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'id' missing."));
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
            "application/json"
        ];
        return this.request({
            url: "/v3/developer-certificates/{id}".replace("{" + "id" + "}", String(id)),
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
     * Create a new developer certificate to connect to the bootstrap server.
     * This REST API is intended to be used by customers to get a developer certificate (a certificate that can be flashed into multiple devices to connect to bootstrap server).  Limitations:    - One developer certificate allows up to 100 devices to connect to bootstrap server.   - Only 10 developer certificates are allowed per account.
     * @param authorization Bearer {Access Token}.
     * @param body
     */
    DeveloperCertificateApi.prototype.v3DeveloperCertificatesPost = function (authorization, body, callback, requestOptions) {
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
            "application/json"
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
    return DeveloperCertificateApi;
}(apiBase_1.ApiBase));
exports.DeveloperCertificateApi = DeveloperCertificateApi;
/**
 * ExternalAPIApi
 */
var ExternalAPIApi = /** @class */ (function (_super) {
    __extends(ExternalAPIApi, _super);
    function ExternalAPIApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Fetch an existing developer certificate to connect to the bootstrap server.
     * This REST API is intended to be used by customers to fetch an existing developer certificate (a certificate that can be flashed into multiple devices to connect to bootstrap server).
     * @param id A unique identifier for the developer certificate.
     * @param authorization Bearer {Access Token}.
     */
    ExternalAPIApi.prototype.v3DeveloperCertificatesIdGet = function (id, authorization, callback, requestOptions) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'id' missing."));
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
            "application/json"
        ];
        return this.request({
            url: "/v3/developer-certificates/{id}".replace("{" + "id" + "}", String(id)),
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
     * Create a new developer certificate to connect to the bootstrap server.
     * This REST API is intended to be used by customers to get a developer certificate (a certificate that can be flashed into multiple devices to connect to bootstrap server).  Limitations:    - One developer certificate allows up to 100 devices to connect to bootstrap server.   - Only 10 developer certificates are allowed per account.
     * @param authorization Bearer {Access Token}.
     * @param body
     */
    ExternalAPIApi.prototype.v3DeveloperCertificatesPost = function (authorization, body, callback, requestOptions) {
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
            "application/json"
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
     * Fetch bootstrap server credentials.
     * This REST API is intended to be used by customers to fetch bootstrap server credentials that they need to use with their clients to connect to bootstrap server.
     * @param authorization Bearer {Access Token}.
     */
    ExternalAPIApi.prototype.v3ServerCredentialsBootstrapGet = function (authorization, callback, requestOptions) {
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
            "application/json"
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
     * This REST API is intended to be used by customers to fetch LWM2M server credentials that they need to use with their clients to connect to LWM2M server.
     * @param authorization Bearer {Access Token}.
     */
    ExternalAPIApi.prototype.v3ServerCredentialsLwm2mGet = function (authorization, callback, requestOptions) {
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
            "application/json"
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
    return ExternalAPIApi;
}(apiBase_1.ApiBase));
exports.ExternalAPIApi = ExternalAPIApi;
/**
 * ServerCredentialsApi
 */
var ServerCredentialsApi = /** @class */ (function (_super) {
    __extends(ServerCredentialsApi, _super);
    function ServerCredentialsApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Fetch bootstrap server credentials.
     * This REST API is intended to be used by customers to fetch bootstrap server credentials that they need to use with their clients to connect to bootstrap server.
     * @param authorization Bearer {Access Token}.
     */
    ServerCredentialsApi.prototype.v3ServerCredentialsBootstrapGet = function (authorization, callback, requestOptions) {
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
            "application/json"
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
     * This REST API is intended to be used by customers to fetch LWM2M server credentials that they need to use with their clients to connect to LWM2M server.
     * @param authorization Bearer {Access Token}.
     */
    ServerCredentialsApi.prototype.v3ServerCredentialsLwm2mGet = function (authorization, callback, requestOptions) {
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
            "application/json"
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
