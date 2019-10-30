/* tslint:disable:array-type */
/* tslint:disable:no-namespace */
/* tslint:disable:no-string-literal */
/* tslint:disable:max-classes-per-file */
/* tslint:disable:no-trailing-whitespace */
import { ApiBase } from "../common/apiBase";
import { SDKError } from "../common/sdkError";
/**
 * DefaultApi
 */
export class DefaultApi extends ApiBase {
    /**
     * Get billing report.
     * Fetch generated billing report for the currently authenticated commercial non-subtenant account. Billing reports for subtenant accounts are included in their aggregator&#39;s billing report response.
     * @param month Queried year and month of billing report
     */
    getBillingReport(month, callback, requestOptions) {
        // verify required parameter "month" is set
        if (month === null || month === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'month' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        if (month !== undefined) {
            queryParameters["month"] = month;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
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
    }
    /**
     * Get raw active devices billing data for the month.
     * Fetch raw active devices billing data for the currently authenticated commercial non-subtenant account. They are supplementary data for billing report. The raw active devices billing data for subtenant accounts are included in their aggregator&#39;s raw active devices billing data. Endpoint returns the URL to download the gzipped csv file. First line of the file is the header which describes information of active devices included, e.g. active device id.
     * @param month Queried year and month of billing report
     */
    getBillingReportActiveDevices(month, callback, requestOptions) {
        // verify required parameter "month" is set
        if (month === null || month === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'month' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        if (month !== undefined) {
            queryParameters["month"] = month;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
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
    }
    /**
     * Get raw firmware updates billing data for the month.
     * Fetch raw firmware updates billing data for the currently authenticated commercial non-subtenant account. They are supplementary data for billing report. The raw firmware updates billing data for subtenant accounts are included in their aggregator&#39;s raw firmware updates billing data. Endpoint returns the URL to download the gzipped csv file. First line of the file is the header which describes information of firmware updates included, e.g. firmware update device id.
     * @param month Queried year and month of billing report
     */
    getBillingReportFirmwareUpdates(month, callback, requestOptions) {
        // verify required parameter "month" is set
        if (month === null || month === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'month' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        if (month !== undefined) {
            queryParameters["month"] = month;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
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
    }
    /**
     * Service package quota
     * Get the available firmware update quota for the currently authenticated commercial acount.
     */
    getServicePackageQuota(callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
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
    }
    /**
     * Service package quota history
     * Get your quota usage history. This API is available for commercial accounts. Aggregator accounts can see own and subtenant quota usage data. History data is ordered in ascending order based on the added timestamp.
     * @param limit Maximum amount of quota history entries contained in one paged response.
     * @param after To fetch after which quota history id. The results will contain entries after specified entry.
     */
    getServicePackageQuotaHistory(limit, after, callback, requestOptions) {
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
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
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
    }
    /**
     * Get all service packages.
     * Get information of all service packages for currently authenticated commercial account. The response is returned with descending order by service package created timestamp, listing first pending service package, then active service package, and previous service packages at last.
     */
    getServicePackages(callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
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
    }
}
//# sourceMappingURL=billing.js.map