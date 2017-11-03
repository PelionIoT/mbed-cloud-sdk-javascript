/* tslint:disable:array-type */
/* tslint:disable:no-string-literal */
/* tslint:disable:max-classes-per-file */
/* tslint:disable:no-trailing-whitespace */

// ===============================================
// This file is autogenerated - Please do not edit
// Tracks base typescript-fetch mustache 01/02/17
// ===============================================

/**
 * Connect Statistics API
 * mbed Cloud Connect Statistics API provides statistics about other cloud services through defined counters.
 *
 * OpenAPI spec version: 3
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import superagent = require("superagent");
import { ApiBase } from "../common/apiBase";
import { SDKError } from "../common/sdkError";

export interface ErrorResponse {
    /**
     * HTTP response code.
     */
    "code"?: number;
    /**
     * Details of the error fields.
     */
    "fields"?: Array<Fields>;
    /**
     * Response type, always \"error\".
     */
    "object"?: string;
    /**
     * Request ID.
     */
    "request_id"?: string;
    /**
     * Description of the error.
     */
    "message"?: string;
    /**
     * Type of error.
     */
    "type"?: string;
}

export interface Fields {
    /**
     * Error description.
     */
    "message"?: string;
    /**
     * The field name in the request for which the validation has failed.
     */
    "name"?: string;
}

export interface Metric {
    /**
     * The number of registration updates linked to the account. Registration update is the process of updating the registration status with the Mbed Cloud Connect to update or extend the lifetime of the device.
     */
    "registration_updates"?: number;
    /**
     * The number of successful [Connect API](/docs/v1.2/service-api-references/connect-api.html) requests the account has performed. The metric do not consider the actual response from the device and it includes only the result of the http request used to subscibe to the device resources.
     */
    "connect_rest_api_success"?: number;
    /**
     * The number of failed bootstraps the account has performed. Bootstrap is the process of provisioning a Lightweight Machine to Machine Client to a state where it can initiate a management session to a new Lightweight Machine to Machine Server.
     */
    "bootstraps_failed"?: number;
    /**
     * The number of transaction events from or to devices linked to the account. A transaction is a 512-byte block of data processed by Mbed Cloud Connect. It can be either sent by the device (device --> Mbed Cloud Connect) or received by the device (Mbed Cloud Connect --> device). A transaction does not include IP, TCP or UDP, TLS or DTLS packet overhead. It only contains the packet payload (full CoAP packet including CoAP headers). The Registration (full registration or registration update) and Deregistration events from device to Mbed Cloud Connect are not counted as a transaction. The observation event (resource change notifications) from device to Mbed Cloud Connect is counted as a transaction. The proxy and subscription request from Mbed Cloud Connect to the device is counted as a transaction and the access to Mbed Cloud Connect cache without contacting the actual device may also add to transaction count.
     */
    "transactions"?: number;
    /**
     * UTC time in RFC3339 format. The timestamp is the starting point of the interval for which the data is aggregated. Each interval includes data for the time greater than or equal to the timestamp and less than the next interval's starting point.
     */
    "timestamp"?: Date;
    /**
     * **(Beta)** The number of failed subscription requests from Mbed Cloud Connect to devices linked to the account. The subscription requests are made from Mbed Cloud Connect to devices when you try to subscribe to a resource path using [Connect API](/docs/v1.2/service-api-references/connect-api.html) endpoints. 
     */
    "device_subscription_request_error"?: number;
    /**
     * The number of pending bootstraps the account has performed. Bootstrap is the process of provisioning a Lightweight Machine to Machine Client to a state where it can initiate a management session to a new Lightweight Machine to Machine Server.
     */
    "bootstraps_pending"?: number;
    /**
     * **(Beta)** The number of successful proxy requests from Mbed Cloud Connect to devices linked to the account. The proxy requests are made from Mbed Cloud Connect to devices when you try to read or write values to device resources using [Connect API](/docs/v1.2/service-api-references/connect-api.html) endpoints. 
     */
    "device_proxy_request_success"?: number;
    /**
     * The number of successful bootstraps the account has performed. Bootstrap is the process of provisioning a Lightweight Machine to Machine Client to a state where it can initiate a management session to a new Lightweight Machine to Machine Server.
     */
    "bootstraps_successful"?: number;
    /**
     * The number of full registrations linked to the account. Full registration is the process of registering a device with the Mbed Cloud Connect by providing its lifetime and capabilities such as the resource structure.The registered status of the device does not guarantee that the device is active and accessible from Mebd Cloud Connect at any point of time.
     */
    "full_registrations"?: number;
    /**
     * **(Beta)** The number of successful subscription requests from Mbed Cloud Connect to devices linked to the account. The subscription requests are made from Mbed Cloud Connect to devices when you try to subscribe to a resource path using [Connect API](/docs/v1.2/service-api-references/connect-api.html) endpoints. 
     */
    "device_subscription_request_success"?: number;
    /**
     * The number of expired registrations linked to the account. Mbed Cloud Connect removes the device registrations when the devices cannot update their registration before the expiry of the lifetime. Mbed Cloud Connect no longer handles requests for a device whose registration has expired already.
     */
    "expired_registrations"?: number;
    /**
     * The number of successful TLS handshakes the account has performed. The SSL or TLS handshake enables the SSL or TLS client and server to establish the secret keys with which they communicate. A successful TLS handshake is required for establishing a connection with Mbed Cloud Connect for any operaton such as registration, registration update and deregistration.
     */
    "handshakes_successful"?: number;
    /**
     * **(Beta)** The number of observations received by Mbed Cloud Connect from the devices linked to the account. The observations are pushed from the device to Mbed Cloud Connect when you have successfully subscribed to the device resources using [Connect API](/docs/v1.2/service-api-references/connect-api.html) endpoints. 
     */
    "device_observations"?: number;
    /**
     * **(Beta)** The number of failed proxy requests from Mbed Cloud Connect to devices linked to the account. The proxy requests are made from Mbed Cloud Connect to devices when you try to read or write values to device resources using [Connect API](/docs/v1.2/service-api-references/connect-api.html) endpoints. 
     */
    "device_proxy_request_error"?: number;
    /**
     * The number of deleted registrations (deregistrations) linked to the account. Deregistration is the process of removing the device registration from the Mbed Cloud Connect registry. The deregistration is usually initiated by the device. Mbed Cloud Connect no longer handles requests for a deregistered device.
     */
    "deleted_registrations"?: number;
    /**
     * The number of failed [Connect API](/docs/v1.2/service-api-references/connect-api.html) requests the account has performed.The metric do not consider the actual response from the device and it includes only the result of the http request used to subscibe to the device resources.
     */
    "connect_rest_api_error"?: number;
    /**
     * A unique metric ID.
     */
    "id"?: string;
}

export interface SuccessfulResponse {
    /**
     * The metric ID included in the request or null.
     */
    "after"?: string;
    /**
     * Indicates whether there are more results for you to fetch in the next page.
     */
    "has_more"?: boolean;
    /**
     * The total number of records available.
     */
    "total_count"?: number;
    /**
     * API resource name.
     */
    "object"?: string;
    /**
     * The limit used in the request to retrieve the results.
     */
    "limit"?: number;
    "data"?: Array<Metric>;
}

/**
 * AccountApi
 */
export class AccountApi extends ApiBase {

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
    public v3MetricsGet(include: string, interval: string, start?: string, end?: string, period?: string, limit?: number, after?: string, order?: string, callback?: (error: any, data?: SuccessfulResponse, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "include" is set
        if (include === null || include === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'include' missing."));
            }
            return;
        }
        // verify required parameter "interval" is set
        if (interval === null || interval === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'interval' missing."));
            }
            return;
        }

        const headerParams: any = {};

        const queryParameters: any = {};
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
        let useFormData = false;
        const formParams: any = {};

        // Determine the Content-Type header
        const contentTypes: Array<string> = [
        ];

        // Determine the Accept header
        const acceptTypes: Array<string> = [
            "application/json"
        ];

        return this.request<SuccessfulResponse>({
            url: "/v3/metrics",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    }
}
/**
 * StatisticsApi
 */
export class StatisticsApi extends ApiBase {

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
    public v3MetricsGet(include: string, interval: string, start?: string, end?: string, period?: string, limit?: number, after?: string, order?: string, callback?: (error: any, data?: SuccessfulResponse, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "include" is set
        if (include === null || include === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'include' missing."));
            }
            return;
        }
        // verify required parameter "interval" is set
        if (interval === null || interval === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'interval' missing."));
            }
            return;
        }

        const headerParams: any = {};

        const queryParameters: any = {};
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
        let useFormData = false;
        const formParams: any = {};

        // Determine the Content-Type header
        const contentTypes: Array<string> = [
        ];

        // Determine the Accept header
        const acceptTypes: Array<string> = [
            "application/json"
        ];

        return this.request<SuccessfulResponse>({
            url: "/v3/metrics",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    }
}
