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
     * Gets the account&#39;s provisioning certificate.
     * @param authorization \&quot;Bearer\&quot; followed by the reference token or API key.
     */
    DefaultApi.prototype.v3ProvisioningCertificateGet = function (authorization, callback) {
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'authorization' missing when calling 'v3ProvisioningCertificateGet'."));
            }
            return;
        }
        var headerParams = {};
        headerParams['Authorization'] = authorization;
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/provisioning-certificate',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    return DefaultApi;
}(apiBase_1.ApiBase));
exports.DefaultApi = DefaultApi;
