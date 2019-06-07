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
 * AccountApi
 */
var AccountApi = /** @class */ (function (_super) {
    __extends(AccountApi, _super);
    function AccountApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Provides account-specific statistics for other cloud services.
     * This REST API is used to get account-specific statistics.
     * @param include A comma-separated list of requested metrics and total_count (if included, the response will contain total_count to specify the total number of records available). Supported values are:  - &#x60;transactions&#x60; - &#x60;full_registrations&#x60; - &#x60;registration_updates&#x60; - &#x60;deleted_registrations&#x60; - &#x60;expired_registrations&#x60; - &#x60;bootstraps_successful&#x60; - &#x60;bootstraps_failed&#x60; - &#x60;bootstraps_pending&#x60; - &#x60;handshakes_successful&#x60; - &#x60;connect_rest_api_success&#x60; - &#x60;connect_rest_api_error&#x60; - &#x60;device_proxy_request_success&#x60; - &#x60;device_proxy_request_error&#x60; - &#x60;device_subscription_request_success&#x60; - &#x60;device_subscription_request_error&#x60; - &#x60;device_observations&#x60; - &#x60;total_count&#x60;  **Note:**  The metrics device_proxy_request_success, device_proxy_request_error, device_subscription_request_success, device_subscription_request_error and device_observations monitor only the response from the device to Mbed Cloud Connect and they do not confirm that the response is delivered to client callback urls used when you try to access device resources using [Connect API](/docs/v1.2/service-api-references/connect-api.html) endpoints.  **Example usage:**  &#x60;&#x60;&#x60; curl  -X GET \\       -H \&quot;Authorization : Bearer &lt;valid access Token&gt;\&quot;        &#39;https://api.us-east-1.mbedcloud.com/v3/metrics?include&#x3D;transactions,total_count&amp;start&#x3D;20170207&amp;end&#x3D;20170407&amp;interval&#x3D;1d&#39;  {     \&quot;object\&quot;: \&quot;list\&quot;,     \&quot;limit\&quot;: 20,     \&quot;total_count\&quot;: 54,     \&quot;after\&quot;: \&quot;2017-07-26T00:00:00Z\&quot;,     \&quot;has_more\&quot;: true,     \&quot;data\&quot;: [         {             \&quot;id\&quot;: \&quot;015d8157c800015e306fffff005374617473000\&quot;,             \&quot;timestamp\&quot;: \&quot;2017-07-27T00:00:00Z\&quot;,             \&quot;transactions\&quot;: 27366         },         {             \&quot;id\&quot;: \&quot;015d867e2400015e306fffff005374617473000\&quot;,             \&quot;timestamp\&quot;: \&quot;2017-07-28T00:00:00Z\&quot;,             \&quot;transactions\&quot;: 27480         }     ] } &#x60;&#x60;&#x60;
     * @param interval Group the data by this interval in minutes, hours, days or weeks. Sample values: 5m, 2h, 3d, 4w. The maximum interval cannot exceed one year (365 days). The allowed ranges are 5m-525600m/1h-8760h/1d-365d/1w-53w.
     * @param start UTC time/year/date in RFC3339 format. Fetch the data with timestamp greater than or equal to this value. Sample values: 20170207T092056990Z / 2017-02-07T09:20:56.990Z / 2017 / 20170207. The maximum time between start and end parameters cannot exceed more than one year (365 days). The parameter is not mandatory, if the period is specified.
     * @param end UTC time/year/date in RFC3339 format. Fetch the data with timestamp less than this value.Sample values: 20170207T092056990Z / 2017-02-07T09:20:56.990Z / 2017 / 20170207. The maximum time between start and end parameters cannot exceed more than one year ( 365 days ). The parameter is not mandatory, if the period is specified.
     * @param period Period. Fetch the data for the period in minutes, hours, days or weeks. Sample values: 5m, 2h, 3d, 4w. The parameter is not mandatory, if the start and end time are specified. The maximum period cannot exceed one year (365 days). The allowed ranges are 5m-525600m/1h-8760h/1d-365d/1w-53w.
     * @param limit The number of results to return. The default value is 50, minimum 2 and maximum 1000.
     * @param after The metric ID after which to start fetching. This also can be used for pagination as follows.  **Example usage:**  &#x60;&#x60;&#x60; curl  -X GET \\       -H \&quot;Authorization : Bearer &lt;valid access Token&gt;\&quot;        &#39;https://api.us-east-1.mbedcloud.com/v3/metrics?include&#x3D;transactions,total_count&amp;start&#x3D;20170707&amp;end&#x3D;20170829&amp;interval&#x3D;1d&amp;limit&#x3D;20&#39; {    \&quot;object\&quot;: \&quot;list\&quot;,    \&quot;limit\&quot;: 20,    \&quot;total_count\&quot;: 54,    \&quot;has_more\&quot;: true,    \&quot;data\&quot;: [        {            \&quot;id\&quot;: \&quot;015d1a589800015e306fffff005374617473000\&quot;,            \&quot;timestamp\&quot;: \&quot;2017-07-07T00:00:00Z\&quot;,            \&quot;transactions\&quot;: 26381        },        .        .        .        {            \&quot;id\&quot;: \&quot;015d7c316c00015e306fffff005374617473000\&quot;,            \&quot;timestamp\&quot;: \&quot;2017-07-26T00:00:00Z\&quot;,            \&quot;transactions\&quot;: 25569        }    ] } &#x60;&#x60;&#x60;  If the parameter “has more” is true, it indicates that the list is not complete and more values are available. You can give the last ID of the list as the value of the “after” query parameter, and you get the next page of values. You can keep doing this until “has more” is false. &#x60;&#x60;&#x60; curl -X GET \\      -H \&quot;Authorization : Bearer &lt;valid access Token&gt;\&quot;      &#39;https://api.us-east-1.mbedcloud.com/v3/metrics?include&#x3D;transactions,total_count&amp;start&#x3D;20170707&amp;end&#x3D;20170829&amp;interval&#x3D;1d&amp;limit&#x3D;20&amp;after&#x3D;015d7c316c00015e306fffff005374617473000&#39;  {    \&quot;object\&quot;: \&quot;list\&quot;,    \&quot;limit\&quot;: 20,    \&quot;total_count\&quot;: 54,    \&quot;after\&quot;: \&quot;2017-07-26T00:00:00Z\&quot;,    \&quot;has_more\&quot;: true,    \&quot;data\&quot;: [        {            \&quot;id\&quot;: \&quot;015d8157c800015e306fffff005374617473000\&quot;,            \&quot;timestamp\&quot;: \&quot;2017-07-27T00:00:00Z\&quot;,            \&quot;transactions\&quot;: 27366        },      .      .      .        {            \&quot;id\&quot;: \&quot;015de3309c00015e306fffff005374617473000\&quot;,            \&quot;timestamp\&quot;: \&quot;2017-08-15T00:00:00Z\&quot;,            \&quot;transactions\&quot;: 24707        }    ] } &#x60;&#x60;&#x60;
     * @param order The order of the records to return. Available values are ASC and DESC. The default value is ASC.
     */
    AccountApi.prototype.v3MetricsGet = function (include, interval, start, end, period, limit, after, order, callback, requestOptions) {
        // verify required parameter "include" is set
        if (include === null || include === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'include' missing."));
            }
            return;
        }
        // verify required parameter "interval" is set
        if (interval === null || interval === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'interval' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        if (start !== undefined) {
            queryParameters["start"] = start;
        }
        if (end !== undefined) {
            queryParameters["end"] = end;
        }
        if (period !== undefined) {
            queryParameters["period"] = period;
        }
        if (interval !== undefined) {
            queryParameters["interval"] = interval;
        }
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        if (order !== undefined) {
            queryParameters["order"] = order;
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
            url: "/v3/metrics",
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
    return AccountApi;
}(apiBase_1.ApiBase));
exports.AccountApi = AccountApi;
/**
 * StatisticsApi
 */
var StatisticsApi = /** @class */ (function (_super) {
    __extends(StatisticsApi, _super);
    function StatisticsApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Provides account-specific statistics for other cloud services.
     * This REST API is used to get account-specific statistics.
     * @param include A comma-separated list of requested metrics and total_count (if included, the response will contain total_count to specify the total number of records available). Supported values are:  - &#x60;transactions&#x60; - &#x60;full_registrations&#x60; - &#x60;registration_updates&#x60; - &#x60;deleted_registrations&#x60; - &#x60;expired_registrations&#x60; - &#x60;bootstraps_successful&#x60; - &#x60;bootstraps_failed&#x60; - &#x60;bootstraps_pending&#x60; - &#x60;handshakes_successful&#x60; - &#x60;connect_rest_api_success&#x60; - &#x60;connect_rest_api_error&#x60; - &#x60;device_proxy_request_success&#x60; - &#x60;device_proxy_request_error&#x60; - &#x60;device_subscription_request_success&#x60; - &#x60;device_subscription_request_error&#x60; - &#x60;device_observations&#x60; - &#x60;total_count&#x60;  **Note:**  The metrics device_proxy_request_success, device_proxy_request_error, device_subscription_request_success, device_subscription_request_error and device_observations monitor only the response from the device to Mbed Cloud Connect and they do not confirm that the response is delivered to client callback urls used when you try to access device resources using [Connect API](/docs/v1.2/service-api-references/connect-api.html) endpoints.  **Example usage:**  &#x60;&#x60;&#x60; curl  -X GET \\       -H \&quot;Authorization : Bearer &lt;valid access Token&gt;\&quot;        &#39;https://api.us-east-1.mbedcloud.com/v3/metrics?include&#x3D;transactions,total_count&amp;start&#x3D;20170207&amp;end&#x3D;20170407&amp;interval&#x3D;1d&#39;  {     \&quot;object\&quot;: \&quot;list\&quot;,     \&quot;limit\&quot;: 20,     \&quot;total_count\&quot;: 54,     \&quot;after\&quot;: \&quot;2017-07-26T00:00:00Z\&quot;,     \&quot;has_more\&quot;: true,     \&quot;data\&quot;: [         {             \&quot;id\&quot;: \&quot;015d8157c800015e306fffff005374617473000\&quot;,             \&quot;timestamp\&quot;: \&quot;2017-07-27T00:00:00Z\&quot;,             \&quot;transactions\&quot;: 27366         },         {             \&quot;id\&quot;: \&quot;015d867e2400015e306fffff005374617473000\&quot;,             \&quot;timestamp\&quot;: \&quot;2017-07-28T00:00:00Z\&quot;,             \&quot;transactions\&quot;: 27480         }     ] } &#x60;&#x60;&#x60;
     * @param interval Group the data by this interval in minutes, hours, days or weeks. Sample values: 5m, 2h, 3d, 4w. The maximum interval cannot exceed one year (365 days). The allowed ranges are 5m-525600m/1h-8760h/1d-365d/1w-53w.
     * @param start UTC time/year/date in RFC3339 format. Fetch the data with timestamp greater than or equal to this value. Sample values: 20170207T092056990Z / 2017-02-07T09:20:56.990Z / 2017 / 20170207. The maximum time between start and end parameters cannot exceed more than one year (365 days). The parameter is not mandatory, if the period is specified.
     * @param end UTC time/year/date in RFC3339 format. Fetch the data with timestamp less than this value.Sample values: 20170207T092056990Z / 2017-02-07T09:20:56.990Z / 2017 / 20170207. The maximum time between start and end parameters cannot exceed more than one year ( 365 days ). The parameter is not mandatory, if the period is specified.
     * @param period Period. Fetch the data for the period in minutes, hours, days or weeks. Sample values: 5m, 2h, 3d, 4w. The parameter is not mandatory, if the start and end time are specified. The maximum period cannot exceed one year (365 days). The allowed ranges are 5m-525600m/1h-8760h/1d-365d/1w-53w.
     * @param limit The number of results to return. The default value is 50, minimum 2 and maximum 1000.
     * @param after The metric ID after which to start fetching. This also can be used for pagination as follows.  **Example usage:**  &#x60;&#x60;&#x60; curl  -X GET \\       -H \&quot;Authorization : Bearer &lt;valid access Token&gt;\&quot;        &#39;https://api.us-east-1.mbedcloud.com/v3/metrics?include&#x3D;transactions,total_count&amp;start&#x3D;20170707&amp;end&#x3D;20170829&amp;interval&#x3D;1d&amp;limit&#x3D;20&#39; {    \&quot;object\&quot;: \&quot;list\&quot;,    \&quot;limit\&quot;: 20,    \&quot;total_count\&quot;: 54,    \&quot;has_more\&quot;: true,    \&quot;data\&quot;: [        {            \&quot;id\&quot;: \&quot;015d1a589800015e306fffff005374617473000\&quot;,            \&quot;timestamp\&quot;: \&quot;2017-07-07T00:00:00Z\&quot;,            \&quot;transactions\&quot;: 26381        },        .        .        .        {            \&quot;id\&quot;: \&quot;015d7c316c00015e306fffff005374617473000\&quot;,            \&quot;timestamp\&quot;: \&quot;2017-07-26T00:00:00Z\&quot;,            \&quot;transactions\&quot;: 25569        }    ] } &#x60;&#x60;&#x60;  If the parameter “has more” is true, it indicates that the list is not complete and more values are available. You can give the last ID of the list as the value of the “after” query parameter, and you get the next page of values. You can keep doing this until “has more” is false. &#x60;&#x60;&#x60; curl -X GET \\      -H \&quot;Authorization : Bearer &lt;valid access Token&gt;\&quot;      &#39;https://api.us-east-1.mbedcloud.com/v3/metrics?include&#x3D;transactions,total_count&amp;start&#x3D;20170707&amp;end&#x3D;20170829&amp;interval&#x3D;1d&amp;limit&#x3D;20&amp;after&#x3D;015d7c316c00015e306fffff005374617473000&#39;  {    \&quot;object\&quot;: \&quot;list\&quot;,    \&quot;limit\&quot;: 20,    \&quot;total_count\&quot;: 54,    \&quot;after\&quot;: \&quot;2017-07-26T00:00:00Z\&quot;,    \&quot;has_more\&quot;: true,    \&quot;data\&quot;: [        {            \&quot;id\&quot;: \&quot;015d8157c800015e306fffff005374617473000\&quot;,            \&quot;timestamp\&quot;: \&quot;2017-07-27T00:00:00Z\&quot;,            \&quot;transactions\&quot;: 27366        },      .      .      .        {            \&quot;id\&quot;: \&quot;015de3309c00015e306fffff005374617473000\&quot;,            \&quot;timestamp\&quot;: \&quot;2017-08-15T00:00:00Z\&quot;,            \&quot;transactions\&quot;: 24707        }    ] } &#x60;&#x60;&#x60;
     * @param order The order of the records to return. Available values are ASC and DESC. The default value is ASC.
     */
    StatisticsApi.prototype.v3MetricsGet = function (include, interval, start, end, period, limit, after, order, callback, requestOptions) {
        // verify required parameter "include" is set
        if (include === null || include === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'include' missing."));
            }
            return;
        }
        // verify required parameter "interval" is set
        if (interval === null || interval === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'interval' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        if (start !== undefined) {
            queryParameters["start"] = start;
        }
        if (end !== undefined) {
            queryParameters["end"] = end;
        }
        if (period !== undefined) {
            queryParameters["period"] = period;
        }
        if (interval !== undefined) {
            queryParameters["interval"] = interval;
        }
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        if (order !== undefined) {
            queryParameters["order"] = order;
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
            url: "/v3/metrics",
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
    return StatisticsApi;
}(apiBase_1.ApiBase));
exports.StatisticsApi = StatisticsApi;
//# sourceMappingURL=statistics.js.map