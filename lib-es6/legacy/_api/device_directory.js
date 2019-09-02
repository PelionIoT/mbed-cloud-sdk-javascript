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
     * Create a device
     * Create a new device.
     * @param device
     */
    deviceCreate(device, callback, requestOptions) {
        // verify required parameter "device" is set
        if (device === null || device === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'device' missing."));
            }
            return;
        }
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
            url: "/v3/devices/",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: device,
        }, callback);
    }
    /**
     * Delete a device.
     * Delete device. Only available for devices with a developer certificate. Attempts to delete a device with a production certicate will return a 400 response.
     * @param id
     */
    deviceDestroy(id, callback, requestOptions) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'id' missing."));
            }
            return;
        }
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
            url: "/v3/devices/{id}/".replace("{" + "id" + "}", String(id)),
            method: "DELETE",
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
     * List all device events.
     * List all device events for an account.
     * @param limit How many objects to retrieve in the page.
     * @param order The order of the records based on creation time, &#x60;ASC&#x60; or &#x60;DESC&#x60;; by default &#x60;ASC&#x60;.
     * @param after The ID of The item after which to retrieve the next page.
     * @param filter URL encoded query string parameter to filter returned data.  ##### Filtering &#x60;&#x60;&#x60;?filter&#x3D;{URL encoded query string}&#x60;&#x60;&#x60;  The query string is made up of key/value pairs separated by ampersands. So for a query of &#x60;&#x60;&#x60;key1&#x3D;value1&amp;key2&#x3D;value2&amp;key3&#x3D;value3&#x60;&#x60;&#x60; this would be encoded as follows: &#x60;&#x60;&#x60;?filter&#x3D;key1%3Dvalue1%26key2%3Dvalue2%26key3%3Dvalue3&#x60;&#x60;&#x60;  ###### Filterable fields:  The below table lists all the fields that can be filtered on with certain filters:  |     Field    | &#x3D; / __eq / __neq | __in /  __nin | __lte / __gte | |:------------:|:----------------:|:-------------:|:-------------:| |   date_time  |         ✓        |       ✓       |       ✓       | |  description |         ✓        |       ✓       |               | |      id      |         ✓        |       ✓       |               | |   device_id  |         ✓        |       ✓       |               | |  event_type  |         ✓        |       ✓       |               | | state_change |         ✓        |       ✓       |               |  The examples below show the queries in *unencoded* form.  ###### By id: &#x60;&#x60;&#x60;id&#x3D;{id}&#x60;&#x60;&#x60;  ###### By state change: &#x60;&#x60;&#x60;state_change&#x3D;[True|False]&#x60;&#x60;&#x60;  ###### By event type: &#x60;&#x60;&#x60;event_type&#x3D;{value}&#x60;&#x60;&#x60;  ###### On date-time fields: Date-time fields should be specified in UTC RFC3339 format &#x60;&#x60;&#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;&#x60;&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds e.g. 2016-11-30T16:25:12.1234Z * UTC RFC3339 without milliseconds e.g. 2016-11-30T16:25:12Z * UTC RFC3339 shortened - without milliseconds and punctuation e.g. 20161130T162512Z  Date-time filtering supports three operators:  * equality * greater than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; * less than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60;  Lower and upper limits to a date-time range may be specified by including both the &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; and &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60; forms in the filter.  &#x60;&#x60;&#x60;{field name}[|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;&#x60;&#x60;  ##### Multi-field example  &#x60;&#x60;&#x60;id&#x3D;0158d38771f70000000000010010038c&amp;state_change&#x3D;True&amp;date_time__gte&#x3D;2016-11-30T16:25:12.1234Z&#x60;&#x60;&#x60;  Encoded:  &#x60;&#x60;&#x60;?filter&#x3D;id%3D0158d38771f70000000000010010038c%26state_change%3DTrue%26date_time__gte%3D2016-11-30T16%3A25%3A12.1234Z&#x60;&#x60;&#x60;  ##### Filtering with filter operators  String field filtering supports the following operators:  * equality: &#x60;__eq&#x60; * non-equality: &#x60;__neq&#x60; * in : &#x60;__in&#x60; * not in: &#x60;__nin&#x60;  For &#x60;__in&#x60; and &#x60;__nin&#x60; filters list of parameters must be comma-separated:  &#x60;event_type__in&#x3D;update.device.device-created,update.device.device-updated&#x60;
     * @param include Comma-separated list of data fields to return. Currently supported: &#x60;total_count&#x60;
     */
    deviceEventList(limit, order, after, filter, include, callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/device-events/",
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
     * Retrieve a device event.
     * Retrieve a specific device event.
     * @param deviceEventId
     */
    deviceEventRetrieve(deviceEventId, callback, requestOptions) {
        // verify required parameter "deviceEventId" is set
        if (deviceEventId === null || deviceEventId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'deviceEventId' missing."));
            }
            return;
        }
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
            url: "/v3/device-events/{device_event_id}/".replace("{" + "device_event_id" + "}", String(deviceEventId)),
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
     * List all devices.
     * List all devices.
     * @param limit How many objects to retrieve in the page.
     * @param order The order of the records based on creation time, &#x60;ASC&#x60; or &#x60;DESC&#x60;; by default &#x60;ASC&#x60;.
     * @param after The ID of The item after which to retrieve the next page.
     * @param filter URL encoded query string parameter to filter returned data.  ##### Filtering &#x60;&#x60;&#x60;?filter&#x3D;{URL encoded query string}&#x60;&#x60;&#x60;  The query string is made up of key/value pairs separated by ampersands. So for a query of &#x60;&#x60;&#x60;key1&#x3D;value1&amp;key2&#x3D;value2&amp;key3&#x3D;value3&#x60;&#x60;&#x60; this would be encoded as follows: &#x60;&#x60;&#x60;?filter&#x3D;key1%3Dvalue1%26key2%3Dvalue2%26key3%3Dvalue3&#x60;&#x60;&#x60;  ###### Filterable fields:  The below table lists all the fields that can be filtered on with certain filters:  |           Field           | &#x3D; / __eq / __neq | __in /  __nin | __lte / __gte | |:-------------------------:|:----------------:|:-------------:|:-------------:| |         account_id        |         ✓        |       ✓       |               | |        auto_update        |         ✓        |       ✓       |               | | bootstrap_expiration_date |         ✓        |       ✓       |       ✓       | |   bootstrapped_timestamp  |         ✓        |       ✓       |       ✓       | |           ca_id           |         ✓        |       ✓       |               | | connector_expiration_date |         ✓        |       ✓       |       ✓       | |         created_at        |         ✓        |       ✓       |       ✓       | |     custom_attributes     |         ✓        |               |               | |       deployed_state      |         ✓        |       ✓       |               | |         deployment        |         ✓        |       ✓       |               | |        description        |         ✓        |       ✓       |               | |        device_class       |         ✓        |       ✓       |               | |   device_execution_mode   |         ✓        |       ✓       |               | |         device_key        |         ✓        |       ✓       |               | |       endpoint_name       |         ✓        |       ✓       |               | |       endpoint_type       |         ✓        |       ✓       |               | |  enrolment_list_timestamp |         ✓        |       ✓       |       ✓       | |            etag           |         ✓        |       ✓       |       ✓       | |     firmware_checksum     |         ✓        |       ✓       |               | |        host_gateway       |         ✓        |       ✓       |               | |             id            |         ✓        |       ✓       |               | |          manifest         |         ✓        |       ✓       |               | |     manifest_timestamp    |         ✓        |       ✓       |       ✓       | |         mechanism         |         ✓        |       ✓       |               | |       mechanism_url       |         ✓        |       ✓       |               | |            name           |         ✓        |       ✓       |               | |       serial_number       |         ✓        |       ✓       |               | |           state           |         ✓        |       ✓       |               | |         updated_at        |         ✓        |       ✓       |       ✓       | |         vendor_id         |         ✓        |       ✓       |               |   The examples below show the queries in *unencoded* form.  ###### By device properties (all properties are filterable): &#x60;&#x60;&#x60;state&#x3D;[unenrolled|cloud_enrolling|bootstrapped|registered]&#x60;&#x60;&#x60;  &#x60;&#x60;&#x60;device_class&#x3D;{value}&#x60;&#x60;&#x60;  ###### On date-time fields: Date-time fields should be specified in UTC RFC3339 format &#x60;&#x60;&#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;&#x60;&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds e.g. 2016-11-30T16:25:12.1234Z * UTC RFC3339 without milliseconds e.g. 2016-11-30T16:25:12Z * UTC RFC3339 shortened - without milliseconds and punctuation e.g. 20161130T162512Z  Date-time filtering supports three operators:  * equality * greater than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; * less than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60;  Lower and upper limits to a date-time range may be specified by including both the &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; and &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60; forms in the filter.  &#x60;&#x60;&#x60;{field name}[|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;&#x60;&#x60;  ###### On device custom attributes:  &#x60;&#x60;&#x60;custom_attributes__{param}&#x3D;{value}&#x60;&#x60;&#x60; &#x60;&#x60;&#x60;custom_attributes__tag&#x3D;TAG1&#x60;&#x60;&#x60;  ##### Multi-field example  &#x60;&#x60;&#x60;state&#x3D;bootstrapped&amp;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&#x60;&#x60;&#x60;  Encoded:  &#x60;&#x60;&#x60;?filter&#x3D;state%3Dbootstrapped%26created_at__gte%3D2016-11-30T16%3A25%3A12.1234Z%26created_at__lte%3D2016-11-30T00%3A00%3A00Z&#x60;&#x60;&#x60;  ##### Filtering with filter operators  String field filtering supports the following operators:  * equality: &#x60;__eq&#x60; * non-equality: &#x60;__neq&#x60; * in : &#x60;__in&#x60; * not in: &#x60;__nin&#x60;  For &#x60;__in&#x60; and &#x60;__nin&#x60; filters list of parameters must be comma-separated:  &#x60;state__nin&#x3D;unenrolled,dergistered&#x60;
     * @param include Comma-separated list of data fields to return. Currently supported: &#x60;total_count&#x60;.
     */
    deviceList(limit, order, after, filter, include, callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/devices/",
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
     * DEPRECATED: List all device events.
     * DEPRECATED: List all device events. Use &#x60;/v3/device-events/&#x60; instead.
     * @param limit How many objects to retrieve in the page.
     * @param order The order of the records based on creation time, &#x60;ASC&#x60; or &#x60;DESC&#x60;; by default &#x60;ASC&#x60;.
     * @param after The ID of The item after which to retrieve the next page.
     * @param filter URL encoded query string parameter to filter returned data.  ##### Filtering &#x60;&#x60;&#x60;?filter&#x3D;{URL encoded query string}&#x60;&#x60;&#x60;  The query string is made up of key/value pairs separated by ampersands. So for a query of &#x60;&#x60;&#x60;key1&#x3D;value1&amp;key2&#x3D;value2&amp;key3&#x3D;value3&#x60;&#x60;&#x60; this would be encoded as follows: &#x60;&#x60;&#x60;?filter&#x3D;key1%3Dvalue1%26key2%3Dvalue2%26key3%3Dvalue3&#x60;&#x60;&#x60;  ###### Filterable fields:  The below table lists all the fields that can be filtered on with certain filters:  |     Field    | &#x3D; / __eq / __neq | __in /  __nin | __lte / __gte | |:------------:|:----------------:|:-------------:|:-------------:| |   date_time  |         ✓        |       ✓       |       ✓       | |  description |         ✓        |       ✓       |               | |      id      |         ✓        |       ✓       |               | |   device_id  |         ✓        |       ✓       |               | |  event_type  |         ✓        |       ✓       |               | | state_change |         ✓        |       ✓       |               |  The examples below show the queries in *unencoded* form.  ###### By id: &#x60;&#x60;&#x60;id&#x3D;{id}&#x60;&#x60;&#x60;  ###### By state change: &#x60;&#x60;&#x60;state_change&#x3D;[True|False]&#x60;&#x60;&#x60;  ###### By event type: &#x60;&#x60;&#x60;event_type&#x3D;{value}&#x60;&#x60;&#x60;  ###### On date-time fields: Date-time fields should be specified in UTC RFC3339 format &#x60;&#x60;&#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;&#x60;&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds e.g. 2016-11-30T16:25:12.1234Z * UTC RFC3339 without milliseconds e.g. 2016-11-30T16:25:12Z * UTC RFC3339 shortened - without milliseconds and punctuation e.g. 20161130T162512Z  Date-time filtering supports three operators:  * equality * greater than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; * less than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60;  Lower and upper limits to a date-time range may be specified by including both the &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; and &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60; forms in the filter.  &#x60;&#x60;&#x60;{field name}[|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;&#x60;&#x60;  ##### Multi-field example  &#x60;&#x60;&#x60;id&#x3D;0158d38771f70000000000010010038c&amp;state_change&#x3D;True&amp;date_time__gte&#x3D;2016-11-30T16:25:12.1234Z&#x60;&#x60;&#x60;  Encoded:  &#x60;&#x60;&#x60;?filter&#x3D;id%3D0158d38771f70000000000010010038c%26state_change%3DTrue%26date_time__gte%3D2016-11-30T16%3A25%3A12.1234Z&#x60;&#x60;&#x60;  ##### Filtering with filter operators  String field filtering supports the following operators:  * equality: &#x60;__eq&#x60; * non-equality: &#x60;__neq&#x60; * in : &#x60;__in&#x60; * not in: &#x60;__nin&#x60;  For &#x60;__in&#x60; and &#x60;__nin&#x60; filters list of parameters must be comma-separated:  &#x60;event_type__in&#x3D;update.device.device-created,update.device.device-updated&#x60;
     * @param include Comma-separated list of data fields to return. Currently supported: &#x60;total_count&#x60;.
     */
    deviceLogList(limit, order, after, filter, include, callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/devicelog/",
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
     * DEPRECATED: Retrieve a device event.
     * Retrieve device event (deprecated, use /v3/device-events/{device_event_id}/ instead)
     * @param deviceEventId
     */
    deviceLogRetrieve(deviceEventId, callback, requestOptions) {
        // verify required parameter "deviceEventId" is set
        if (deviceEventId === null || deviceEventId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'deviceEventId' missing."));
            }
            return;
        }
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
            url: "/v3/devicelog/{device_event_id}/".replace("{" + "device_event_id" + "}", String(deviceEventId)),
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
     * Create a device query
     * Create a new device query.
     * @param device
     */
    deviceQueryCreate(device, callback, requestOptions) {
        // verify required parameter "device" is set
        if (device === null || device === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'device' missing."));
            }
            return;
        }
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
            url: "/v3/device-queries/",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: device,
        }, callback);
    }
    /**
     * Delete a device query
     * Delete a device query.
     * @param queryId
     */
    deviceQueryDestroy(queryId, callback, requestOptions) {
        // verify required parameter "queryId" is set
        if (queryId === null || queryId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'queryId' missing."));
            }
            return;
        }
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
            url: "/v3/device-queries/{query_id}/".replace("{" + "query_id" + "}", String(queryId)),
            method: "DELETE",
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
     * List device queries.
     * List all device queries. The result will be paged into pages of 100.
     * @param limit How many objects to retrieve in the page.
     * @param order The order of the records based on creation time, &#x60;ASC&#x60; or &#x60;DESC&#x60;; by default &#x60;ASC&#x60;.
     * @param after The ID of The item after which to retrieve the next page.
     * @param filter URL encoded query string parameter to filter returned data.  ##### Filtering &#x60;&#x60;&#x60;?filter&#x3D;{URL encoded query string}&#x60;&#x60;&#x60;  The query string is made up of key/value pairs separated by ampersands. So for a query of &#x60;&#x60;&#x60;key1&#x3D;value1&amp;key2&#x3D;value2&amp;key3&#x3D;value3&#x60;&#x60;&#x60; this would be encoded as follows: &#x60;&#x60;&#x60;?filter&#x3D;key1%3Dvalue1%26key2%3Dvalue2%26key3%3Dvalue3&#x60;&#x60;&#x60;  The below table lists all the fields that can be filtered on with certain filters:  |    Field   | &#x3D; / __eq / __neq | __in /  __nin | __lte / __gte | |:----------:|:----------------:|:-------------:|:-------------:| | created_at |         ✓        |       ✓       |       ✓       | |    etag    |         ✓        |       ✓       |       ✓       | |     id     |         ✓        |       ✓       |               | |    name    |         ✓        |       ✓       |               | |    query   |         ✓        |       ✓       |               | | updated_at |         ✓        |       ✓       |       ✓       |   The examples below show the queries in *unencoded* form.  ###### By device query properties (all properties are filterable): For example: &#x60;&#x60;&#x60;description&#x3D;{value}&#x60;&#x60;&#x60;  ###### On date-time fields: Date-time fields should be specified in UTC RFC3339 format &#x60;&#x60;&#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;&#x60;&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds e.g. 2016-11-30T16:25:12.1234Z * UTC RFC3339 without milliseconds e.g. 2016-11-30T16:25:12Z * UTC RFC3339 shortened - without milliseconds and punctuation e.g. 20161130T162512Z  Date-time filtering supports three operators:  * equality * greater than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; * less than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60;  Lower and upper limits to a date-time range may be specified by including both the &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; and &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60; forms in the filter.  &#x60;&#x60;&#x60;{field name}[|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;&#x60;&#x60;  ##### Multi-field example  &#x60;&#x60;&#x60;query_id&#x3D;0158d38771f70000000000010010038c&amp;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&#x60;&#x60;&#x60;  Encoded:  &#x60;&#x60;&#x60;filter&#x3D;query_id%3D0158d38771f70000000000010010038c%26created_at__gte%3D2016-11-30T16%3A25%3A12.1234Z%26created_at__lte%3D2016-11-30T00%3A00%3A00Z&#x60;&#x60;&#x60;  ##### Filtering with filter operators  String field filtering supports the following operators:  * equality: &#x60;__eq&#x60; * non-equality: &#x60;__neq&#x60; * in : &#x60;__in&#x60; * not in: &#x60;__nin&#x60;  For &#x60;__in&#x60; and &#x60;__nin&#x60; filters list of parameters must be comma-separated:  &#x60;name__nin&#x3D;query1,query2&#x60;
     * @param include Comma-separated list of data fields to return. Currently supported: &#x60;total_count&#x60;.
     */
    deviceQueryList(limit, order, after, filter, include, callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/device-queries/",
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
     * Retrieve a device query.
     * Retrieve a specific device query.
     * @param queryId
     */
    deviceQueryRetrieve(queryId, callback, requestOptions) {
        // verify required parameter "queryId" is set
        if (queryId === null || queryId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'queryId' missing."));
            }
            return;
        }
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
            url: "/v3/device-queries/{query_id}/".replace("{" + "query_id" + "}", String(queryId)),
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
     * Update a device query
     * Update a specifc device query.
     * @param queryId
     * @param body Device query update object.
     */
    deviceQueryUpdate(queryId, body, callback, requestOptions) {
        // verify required parameter "queryId" is set
        if (queryId === null || queryId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'queryId' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
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
            url: "/v3/device-queries/{query_id}/".replace("{" + "query_id" + "}", String(queryId)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    }
    /**
     * Get a devices
     * Retrieve information about a specific device.
     * @param id
     */
    deviceRetrieve(id, callback, requestOptions) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'id' missing."));
            }
            return;
        }
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
            url: "/v3/devices/{id}/".replace("{" + "id" + "}", String(id)),
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
     * Update a device
     * Update a specific device.
     * @param id The ID of the device.
     * @param device
     */
    deviceUpdate(id, device, callback, requestOptions) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'id' missing."));
            }
            return;
        }
        // verify required parameter "device" is set
        if (device === null || device === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'device' missing."));
            }
            return;
        }
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
            url: "/v3/devices/{id}/".replace("{" + "id" + "}", String(id)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: device,
        }, callback);
    }
}
//# sourceMappingURL=device_directory.js.map