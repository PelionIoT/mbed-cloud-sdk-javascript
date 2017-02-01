"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var apiBase_1 = require("../common/apiBase");
/**
 * DefaultApi
 */
var DefaultApi = (function (_super) {
    __extends(DefaultApi, _super);
    function DefaultApi() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * Deletes the account&#39;s developer certificate (only one per account allowed).
     * @param authorization \&quot;Bearer\&quot; followed by the reference token or API key.
     */
    DefaultApi.prototype.v3DeveloperCertificateDelete = function (authorization, callback) {
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'authorization' missing when calling 'v3DeveloperCertificateDelete'."));
            }
            return;
        }
        var headerParams = {};
        headerParams['Authorization'] = authorization;
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/developer-certificate',
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Gets the developer certificate of the account.
     * @param authorization \&quot;Bearer\&quot; followed by the reference token or API key.
     */
    DefaultApi.prototype.v3DeveloperCertificateGet = function (authorization, callback) {
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'authorization' missing when calling 'v3DeveloperCertificateGet'."));
            }
            return;
        }
        var headerParams = {};
        headerParams['Authorization'] = authorization;
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/developer-certificate',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Adds a developer certificate to the account (only one per account allowed).
     * @param authorization \&quot;Bearer\&quot; followed by the reference token or API key.
     * @param body
     */
    DefaultApi.prototype.v3DeveloperCertificatePost = function (authorization, body, callback) {
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'authorization' missing when calling 'v3DeveloperCertificatePost'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'v3DeveloperCertificatePost'."));
            }
            return;
        }
        var headerParams = {};
        headerParams['Authorization'] = authorization;
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/developer-certificate',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    return DefaultApi;
}(apiBase_1.ApiBase));
exports.DefaultApi = DefaultApi;
