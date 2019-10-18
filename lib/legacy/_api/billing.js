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
 * DefaultApi
 */
var DefaultApi = /** @class */ (function (_super) {
    __extends(DefaultApi, _super);
    function DefaultApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get billing report.
     * Fetch generated billing report for the currently authenticated commercial non-subtenant account. Billing reports for subtenant accounts are included in their aggregator&#39;s billing report response.
     * @param month Queried year and month of billing report
     */
    DefaultApi.prototype.getBillingReport = function (month, callback, requestOptions) {
        // verify required parameter "month" is set
        if (month === null || month === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'month' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (month !== undefined) {
            queryParameters["month"] = month;
        }
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
            url: "/v3/billing-report",
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
     * Get raw active devices billing data for the month.
     * Fetch raw active devices billing data for the currently authenticated commercial non-subtenant account. They are supplementary data for billing report. The raw active devices billing data for subtenant accounts are included in their aggregator&#39;s raw active devices billing data. Endpoint returns the URL to download the gzipped csv file. First line of the file is the header which describes information of active devices included, e.g. active device id.
     * @param month Queried year and month of billing report
     */
    DefaultApi.prototype.getBillingReportActiveDevices = function (month, callback, requestOptions) {
        // verify required parameter "month" is set
        if (month === null || month === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'month' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (month !== undefined) {
            queryParameters["month"] = month;
        }
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
            url: "/v3/billing-report-active-devices",
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
     * Get raw firmware updates billing data for the month.
     * Fetch raw firmware updates billing data for the currently authenticated commercial non-subtenant account. They are supplementary data for billing report. The raw firmware updates billing data for subtenant accounts are included in their aggregator&#39;s raw firmware updates billing data. Endpoint returns the URL to download the gzipped csv file. First line of the file is the header which describes information of firmware updates included, e.g. firmware update device id.
     * @param month Queried year and month of billing report
     */
    DefaultApi.prototype.getBillingReportFirmwareUpdates = function (month, callback, requestOptions) {
        // verify required parameter "month" is set
        if (month === null || month === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'month' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (month !== undefined) {
            queryParameters["month"] = month;
        }
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
            url: "/v3/billing-report-firmware-updates",
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
     * Service package quota
     * Get the available firmware update quota for the currently authenticated commercial acount.
     */
    DefaultApi.prototype.getServicePackageQuota = function (callback, requestOptions) {
        var headerParams = {};
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
            url: "/v3/service-packages-quota",
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
     * Service package quota history
     * Get your quota usage history. This API is available for commercial accounts. Aggregator accounts can see own and subtenant quota usage data. History data is ordered in ascending order based on the added timestamp.
     * @param limit Maximum amount of quota history entries contained in one paged response.
     * @param after To fetch after which quota history id. The results will contain entries after specified entry.
     */
    DefaultApi.prototype.getServicePackageQuotaHistory = function (limit, after, callback, requestOptions) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
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
            url: "/v3/service-packages-quota-history",
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
     * Get all service packages.
     * Get information of all service packages for currently authenticated commercial account. The response is returned with descending order by service package created timestamp, listing first pending service package, then active service package, and previous service packages at last.
     */
    DefaultApi.prototype.getServicePackages = function (callback, requestOptions) {
        var headerParams = {};
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
            url: "/v3/service-packages",
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
    return DefaultApi;
}(apiBase_1.ApiBase));
exports.DefaultApi = DefaultApi;
//# sourceMappingURL=billing.js.map