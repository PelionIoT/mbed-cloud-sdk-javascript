"use strict";
/* tslint:disable:array-type */
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
 * DefaultApi
 */
var DefaultApi = /** @class */ (function (_super) {
    __extends(DefaultApi, _super);
    function DefaultApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create device.
     * @param device
     */
    DefaultApi.prototype.deviceCreate = function (device, callback) {
        // verify required parameter "device" is set
        if (device === null || device === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'device' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/devices/",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: device,
        }, callback);
    };
    /**
     * Delete device. Only available for devices with a developer certificate. Attempts to delete a device with a production certicate will return a 400 response.
     * @param id
     */
    DefaultApi.prototype.deviceDestroy = function (id, callback) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'id' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/devices/{id}/".replace("{" + "id" + "}", String(id)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * List all device events.
     * @param limit How many objects to retrieve in the page.
     * @param order The order of the objects to return. &#x60;ASC&#x60; or &#x60;DESC&#x60;.
     * @param after The ID of The item after which to retrieve the next page.
     * @param filter URL encoded query string parameter to filter returned data.  ##### Filtering &#x60;&#x60;&#x60;?filter&#x3D;{URL encoded query string}&#x60;&#x60;&#x60;  The query string is made up of key/value pairs separated by ampersands. So for a query of &#x60;&#x60;&#x60;key1&#x3D;value1&amp;key2&#x3D;value2&amp;key3&#x3D;value3&#x60;&#x60;&#x60; this would be encoded as follows: &#x60;&#x60;&#x60;?filter&#x3D;key1%3Dvalue1%26key2%3Dvalue2%26key3%3Dvalue3&#x60;&#x60;&#x60; The examples below show the queries in *unencoded* form.  ###### By id: &#x60;&#x60;&#x60;id&#x3D;{id}&#x60;&#x60;&#x60;  ###### By state change: &#x60;&#x60;&#x60;state_change&#x3D;[True|False]&#x60;&#x60;&#x60;  ###### By event type: &#x60;&#x60;&#x60;event_type&#x3D;{value}&#x60;&#x60;&#x60;  ###### On date-time fields: Date-time fields should be specified in UTC RFC3339 format &#x60;&#x60;&#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;&#x60;&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds e.g. 2016-11-30T16:25:12.1234Z * UTC RFC3339 without milliseconds e.g. 2016-11-30T16:25:12Z * UTC RFC3339 shortened - without milliseconds and punctuation e.g. 20161130T162512Z  Date-time filtering supports three operators:  * equality * greater than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; * less than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60;  Lower and upper limits to a date-time range may be specified by including both the &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; and &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60; forms in the filter.  &#x60;&#x60;&#x60;{field name}[|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;&#x60;&#x60;  ##### Multi-field example  &#x60;&#x60;&#x60;id&#x3D;0158d38771f70000000000010010038c&amp;state_change&#x3D;True&amp;date_time__gte&#x3D;2016-11-30T16:25:12.1234Z&#x60;&#x60;&#x60;  Encoded:  &#x60;&#x60;&#x60;?filter&#x3D;id%3D0158d38771f70000000000010010038c%26state_change%3DTrue%26date_time__gte%3D2016-11-30T16%3A25%3A12.1234Z&#x60;&#x60;&#x60;
     * @param include Comma-separated list of data fields to return. Currently supported: &#x60;total_count&#x60;
     */
    DefaultApi.prototype.deviceEventList = function (limit, order, after, filter, include, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (order !== undefined) {
            queryParameters["order"] = order;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        if (filter !== undefined) {
            queryParameters["filter"] = filter;
        }
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/device-events/",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Retrieve device event.
     * @param deviceEventId
     */
    DefaultApi.prototype.deviceEventRetrieve = function (deviceEventId, callback) {
        // verify required parameter "deviceEventId" is set
        if (deviceEventId === null || deviceEventId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'deviceEventId' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/device-events/{device_event_id}/".replace("{" + "device_event_id" + "}", String(deviceEventId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * List all devices.
     * @param limit How many objects to retrieve in the page.
     * @param order The order of the objects to return. &#x60;ASC&#x60; or &#x60;DESC&#x60;.
     * @param after The ID of The item after which to retrieve the next page.
     * @param filter URL encoded query string parameter to filter returned data.  ##### Filtering &#x60;&#x60;&#x60;?filter&#x3D;{URL encoded query string}&#x60;&#x60;&#x60;  The query string is made up of key/value pairs separated by ampersands. So for a query of &#x60;&#x60;&#x60;key1&#x3D;value1&amp;key2&#x3D;value2&amp;key3&#x3D;value3&#x60;&#x60;&#x60; this would be encoded as follows: &#x60;&#x60;&#x60;?filter&#x3D;key1%3Dvalue1%26key2%3Dvalue2%26key3%3Dvalue3&#x60;&#x60;&#x60; The examples below show the queries in *unencoded* form.  ###### By device properties (all properties are filterable): &#x60;&#x60;&#x60;state&#x3D;[unenrolled|cloud_enrolling|bootstrapped|registered]&#x60;&#x60;&#x60;  &#x60;&#x60;&#x60;device_class&#x3D;{value}&#x60;&#x60;&#x60;  ###### On date-time fields: Date-time fields should be specified in UTC RFC3339 format &#x60;&#x60;&#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;&#x60;&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds e.g. 2016-11-30T16:25:12.1234Z * UTC RFC3339 without milliseconds e.g. 2016-11-30T16:25:12Z * UTC RFC3339 shortened - without milliseconds and punctuation e.g. 20161130T162512Z  Date-time filtering supports three operators:  * equality * greater than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; * less than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60;  Lower and upper limits to a date-time range may be specified by including both the &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; and &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60; forms in the filter.  &#x60;&#x60;&#x60;{field name}[|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;&#x60;&#x60;  ###### On device custom attributes:  &#x60;&#x60;&#x60;custom_attributes__{param}&#x3D;{value}&#x60;&#x60;&#x60; &#x60;&#x60;&#x60;custom_attributes__tag&#x3D;TAG1&#x60;&#x60;&#x60;  ##### Multi-field example  &#x60;&#x60;&#x60;state&#x3D;bootstrapped&amp;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&#x60;&#x60;&#x60;  Encoded:  &#x60;&#x60;&#x60;?filter&#x3D;state%3Dbootstrapped%26created_at__gte%3D2016-11-30T16%3A25%3A12.1234Z%26created_at__lte%3D2016-11-30T00%3A00%3A00Z&#x60;&#x60;&#x60;
     * @param include Comma-separated list of data fields to return. Currently supported: &#x60;total_count&#x60;.
     */
    DefaultApi.prototype.deviceList = function (limit, order, after, filter, include, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (order !== undefined) {
            queryParameters["order"] = order;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        if (filter !== undefined) {
            queryParameters["filter"] = filter;
        }
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/devices/",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * DEPRECATED: List all device events. Use &#x60;/v3/device-events/&#x60; instead.
     * @param limit How many objects to retrieve in the page.
     * @param order The order of the objects to return. &#x60;ASC&#x60; or &#x60;DESC&#x60;.
     * @param after The ID of The item after which to retrieve the next page.
     * @param filter URL encoded query string parameter to filter returned data.  ##### Filtering &#x60;&#x60;&#x60;?filter&#x3D;{URL encoded query string}&#x60;&#x60;&#x60;  The query string is made up of key/value pairs separated by ampersands. So for a query of &#x60;&#x60;&#x60;key1&#x3D;value1&amp;key2&#x3D;value2&amp;key3&#x3D;value3&#x60;&#x60;&#x60; this would be encoded as follows: &#x60;&#x60;&#x60;?filter&#x3D;key1%3Dvalue1%26key2%3Dvalue2%26key3%3Dvalue3&#x60;&#x60;&#x60; The examples below show the queries in *unencoded* form.  ###### By id: &#x60;&#x60;&#x60;id&#x3D;{id}&#x60;&#x60;&#x60;  ###### By state change: &#x60;&#x60;&#x60;state_change&#x3D;[True|False]&#x60;&#x60;&#x60;  ###### By event type: &#x60;&#x60;&#x60;event_type&#x3D;{value}&#x60;&#x60;&#x60;  ###### On date-time fields: Date-time fields should be specified in UTC RFC3339 format &#x60;&#x60;&#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;&#x60;&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds e.g. 2016-11-30T16:25:12.1234Z * UTC RFC3339 without milliseconds e.g. 2016-11-30T16:25:12Z * UTC RFC3339 shortened - without milliseconds and punctuation e.g. 20161130T162512Z  Date-time filtering supports three operators:  * equality * greater than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; * less than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60;  Lower and upper limits to a date-time range may be specified by including both the &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; and &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60; forms in the filter.  &#x60;&#x60;&#x60;{field name}[|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;&#x60;&#x60;  ##### Multi-field example  &#x60;&#x60;&#x60;id&#x3D;0158d38771f70000000000010010038c&amp;state_change&#x3D;True&amp;date_time__gte&#x3D;2016-11-30T16:25:12.1234Z&#x60;&#x60;&#x60;  Encoded:  &#x60;&#x60;&#x60;?filter&#x3D;id%3D0158d38771f70000000000010010038c%26state_change%3DTrue%26date_time__gte%3D2016-11-30T16%3A25%3A12.1234Z&#x60;&#x60;&#x60;
     * @param include Comma-separated list of data fields to return. Currently supported: &#x60;total_count&#x60;.
     */
    DefaultApi.prototype.deviceLogList = function (limit, order, after, filter, include, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (order !== undefined) {
            queryParameters["order"] = order;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        if (filter !== undefined) {
            queryParameters["filter"] = filter;
        }
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/devicelog/",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Retrieve device event (deprecated, use /v3/device-events/{device_event_id}/ instead)
     * @param deviceEventId
     */
    DefaultApi.prototype.deviceLogRetrieve = function (deviceEventId, callback) {
        // verify required parameter "deviceEventId" is set
        if (deviceEventId === null || deviceEventId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'deviceEventId' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/devicelog/{device_event_id}/".replace("{" + "device_event_id" + "}", String(deviceEventId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Update device fields.
     * @param id The ID of the device.
     * @param device
     */
    DefaultApi.prototype.devicePartialUpdate = function (id, device, callback) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'id' missing."));
            }
            return;
        }
        // verify required parameter "device" is set
        if (device === null || device === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'device' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/devices/{id}/".replace("{" + "id" + "}", String(id)),
            method: "PATCH",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: device,
        }, callback);
    };
    /**
     * Create device query.
     * @param device
     */
    DefaultApi.prototype.deviceQueryCreate = function (device, callback) {
        // verify required parameter "device" is set
        if (device === null || device === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'device' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/device-queries/",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: device,
        }, callback);
    };
    /**
     * Delete device query.
     * @param queryId
     */
    DefaultApi.prototype.deviceQueryDestroy = function (queryId, callback) {
        // verify required parameter "queryId" is set
        if (queryId === null || queryId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'queryId' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/device-queries/{query_id}/".replace("{" + "query_id" + "}", String(queryId)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * List all device queries. The result will be paged into pages of 100.
     * @param limit How many objects to retrieve in the page.
     * @param order The order of the objects to return. &#x60;ASC&#x60; or &#x60;DESC&#x60;.
     * @param after The ID of The item after which to retrieve the next page.
     * @param filter URL encoded query string parameter to filter returned data.  ##### Filtering &#x60;&#x60;&#x60;?filter&#x3D;{URL encoded query string}&#x60;&#x60;&#x60;  The query string is made up of key/value pairs separated by ampersands. So for a query of &#x60;&#x60;&#x60;key1&#x3D;value1&amp;key2&#x3D;value2&amp;key3&#x3D;value3&#x60;&#x60;&#x60; this would be encoded as follows: &#x60;&#x60;&#x60;?filter&#x3D;key1%3Dvalue1%26key2%3Dvalue2%26key3%3Dvalue3&#x60;&#x60;&#x60; The examples below show the queries in *unencoded* form.  ###### By device query properties (all properties are filterable): For example: &#x60;&#x60;&#x60;description&#x3D;{value}&#x60;&#x60;&#x60;  ###### On date-time fields: Date-time fields should be specified in UTC RFC3339 format &#x60;&#x60;&#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;&#x60;&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds e.g. 2016-11-30T16:25:12.1234Z * UTC RFC3339 without milliseconds e.g. 2016-11-30T16:25:12Z * UTC RFC3339 shortened - without milliseconds and punctuation e.g. 20161130T162512Z  Date-time filtering supports three operators:  * equality * greater than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; * less than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60;  Lower and upper limits to a date-time range may be specified by including both the &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; and &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60; forms in the filter.  &#x60;&#x60;&#x60;{field name}[|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;&#x60;&#x60;  ##### Multi-field example  &#x60;&#x60;&#x60;query_id&#x3D;0158d38771f70000000000010010038c&amp;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&#x60;&#x60;&#x60;  Encoded:  &#x60;&#x60;&#x60;filter&#x3D;query_id%3D0158d38771f70000000000010010038c%26created_at__gte%3D2016-11-30T16%3A25%3A12.1234Z%26created_at__lte%3D2016-11-30T00%3A00%3A00Z&#x60;&#x60;&#x60;
     * @param include Comma-separated list of data fields to return. Currently supported: &#x60;total_count&#x60;.
     */
    DefaultApi.prototype.deviceQueryList = function (limit, order, after, filter, include, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (order !== undefined) {
            queryParameters["order"] = order;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        if (filter !== undefined) {
            queryParameters["filter"] = filter;
        }
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/device-queries/",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Update device query fields.
     * @param queryId
     * @param deviceQuery
     */
    DefaultApi.prototype.deviceQueryPartialUpdate = function (queryId, deviceQuery, callback) {
        // verify required parameter "queryId" is set
        if (queryId === null || queryId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'queryId' missing."));
            }
            return;
        }
        // verify required parameter "deviceQuery" is set
        if (deviceQuery === null || deviceQuery === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'deviceQuery' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/device-queries/{query_id}/".replace("{" + "query_id" + "}", String(queryId)),
            method: "PATCH",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: deviceQuery,
        }, callback);
    };
    /**
     * Retrieve device query.
     * @param queryId
     */
    DefaultApi.prototype.deviceQueryRetrieve = function (queryId, callback) {
        // verify required parameter "queryId" is set
        if (queryId === null || queryId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'queryId' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/device-queries/{query_id}/".replace("{" + "query_id" + "}", String(queryId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Update device query.
     * @param queryId
     * @param body Device query update object.
     */
    DefaultApi.prototype.deviceQueryUpdate = function (queryId, body, callback) {
        // verify required parameter "queryId" is set
        if (queryId === null || queryId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'queryId' missing."));
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
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/device-queries/{query_id}/".replace("{" + "query_id" + "}", String(queryId)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Retrieve device.
     * @param id
     */
    DefaultApi.prototype.deviceRetrieve = function (id, callback) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'id' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/devices/{id}/".replace("{" + "id" + "}", String(id)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Update device.
     * @param id The ID of the device.
     * @param device
     */
    DefaultApi.prototype.deviceUpdate = function (id, device, callback) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'id' missing."));
            }
            return;
        }
        // verify required parameter "device" is set
        if (device === null || device === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'device' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v3/devices/{id}/".replace("{" + "id" + "}", String(id)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: device,
        }, callback);
    };
    return DefaultApi;
}(apiBase_1.ApiBase));
exports.DefaultApi = DefaultApi;

//# sourceMappingURL=device_directory.js.map
