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
     * Create an image
     * Create firmware image.
     * @param datafile The firmware image file to upload
     * @param name The name of the firmware image
     * @param description The description of the firmware image
     */
    DefaultApi.prototype.firmwareImageCreate = function (datafile, name, description, callback, requestOptions) {
        // verify required parameter "datafile" is set
        if (datafile === null || datafile === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'datafile' missing."));
            }
            return;
        }
        // verify required parameter "name" is set
        if (name === null || name === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'name' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        if (datafile !== undefined) {
            formParams["datafile"] = datafile;
        }
        useFormData = true;
        if (description !== undefined) {
            formParams["description"] = description;
        }
        if (name !== undefined) {
            formParams["name"] = name;
        }
        // Determine the Content-Type header
        var contentTypes = [
            "multipart/form-data",
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/firmware-images/",
            method: "POST",
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
     * Delete an image
     * Delete firmware image.
     * @param imageId The firmware image ID
     */
    DefaultApi.prototype.firmwareImageDestroy = function (imageId, callback, requestOptions) {
        // verify required parameter "imageId" is set
        if (imageId === null || imageId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'imageId' missing."));
            }
            return;
        }
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
            url: "/v3/firmware-images/{image_id}/".replace("{" + "image_id" + "}", String(imageId)),
            method: "DELETE",
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
     * List all images
     * List all firmware images.
     * @param limit How many firmware images to retrieve
     * @param order ASC or DESC
     * @param after The ID of the the item after which to retrieve the next page
     * @param filter URL-encoded query string parameter to filter returned data  &#x60;?filter&#x3D;{URL-encoded query string}&#x60;  ###### Filterable fields:  The below table lists all the fields that can be filtered on with certain filters:  |       Field       | &#x3D; / __eq / __neq | __in /  __nin | __lte / __gte | |:-----------------:|:----------------:|:-------------:|:-------------:| |     created_at    |         ✓        |       ✓       |       ✓       | |      datafile     |         ✓        |       ✓       |               | | datafile_checksum |         ✓        |       ✓       |               | |   datafile_size   |         ✓        |       ✓       |               | |    description    |         ✓        |       ✓       |               | |        etag       |         ✓        |       ✓       |       ✓       | |         id        |         ✓        |       ✓       |               | |        name       |         ✓        |       ✓       |               | |     timestamp     |         ✓        |       ✓       |       ✓       | |     updated_at    |         ✓        |       ✓       |       ✓       |  The query string is made up of key-value pairs separated by ampersands. For example, this query: &#x60;key1&#x3D;value1&amp;key2&#x3D;value2&amp;key3&#x3D;value3&#x60;  would be URL-encoded as: &#x60;?filter&#x3D;key1__eq%3Dvalue1%26key2__eq%3Dvalue2%26key3__eq%3Dvalue3&#x60;   **Filtering by properties** &#x60;name__eq&#x3D;myimage&#x60;  **Filtering on date-time fields**  Date-time fields should be specified in UTC RFC3339 format, &#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds. Example: &#x60;2016-11-30T16:25:12.1234Z&#x60; * UTC RFC3339 without milliseconds. Example: &#x60;2016-11-30T16:25:12Z&#x60; * UTC RFC3339 shortened without milliseconds and punctuation. Example: &#x60;20161130T162512Z&#x60;  Date-time filtering supports three operators:  * equality by appending &#x60;__eq&#x60; to the field name * greater than or equal to by appending &#x60;__gte&#x60; to the field name * less than or equal to by appending &#x60;__lte&#x60; to the field name  &#x60;{field name}[|__eq|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;  Time ranges may be specified by including both the &#x60;__gte&#x60; and &#x60;__lte&#x60; forms in the filter. For example:  &#x60;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&#x60;  **Filtering on multiple fields**  &#x60;name__eq&#x3D;myimage&amp;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&#x60;  **Filtering with filter operators**  String field filtering supports the following operators:  * equality: &#x60;__eq&#x60; * non-equality: &#x60;__neq&#x60; * in : &#x60;__in&#x60; * not in: &#x60;__nin&#x60;  For &#x60;__in&#x60; and &#x60;__nin&#x60; filters list of parameters must be comma-separated:  &#x60;name__in&#x3D;fw-image1,fw-image2&#x60;
     * @param include Comma-separated list of data fields to return. Currently supported: total_count
     */
    DefaultApi.prototype.firmwareImageList = function (limit, order, after, filter, include, callback, requestOptions) {
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
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/firmware-images/",
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
     * Get an image
     * Retrieve firmware image.
     * @param imageId The firmware image ID
     */
    DefaultApi.prototype.firmwareImageRetrieve = function (imageId, callback, requestOptions) {
        // verify required parameter "imageId" is set
        if (imageId === null || imageId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'imageId' missing."));
            }
            return;
        }
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
            url: "/v3/firmware-images/{image_id}/".replace("{" + "image_id" + "}", String(imageId)),
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
     * Create a manifest
     * Create firmware manifest.
     * @param datafile The manifest file to create. The API gateway enforces the account-specific file size.
     * @param name The name of the firmware manifest
     * @param description The description of the firmware manifest
     * @param keyTable The key table of pre-shared keys for devices
     */
    DefaultApi.prototype.firmwareManifestCreate = function (datafile, name, description, keyTable, callback, requestOptions) {
        // verify required parameter "datafile" is set
        if (datafile === null || datafile === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'datafile' missing."));
            }
            return;
        }
        // verify required parameter "name" is set
        if (name === null || name === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'name' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        if (datafile !== undefined) {
            formParams["datafile"] = datafile;
        }
        useFormData = true;
        if (description !== undefined) {
            formParams["description"] = description;
        }
        if (keyTable !== undefined) {
            formParams["key_table"] = keyTable;
        }
        useFormData = true;
        if (name !== undefined) {
            formParams["name"] = name;
        }
        // Determine the Content-Type header
        var contentTypes = [
            "multipart/form-data",
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/firmware-manifests/",
            method: "POST",
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
     * Delete a manifest
     * Delete firmware manifest.
     * @param manifestId The firmware manifest ID
     */
    DefaultApi.prototype.firmwareManifestDestroy = function (manifestId, callback, requestOptions) {
        // verify required parameter "manifestId" is set
        if (manifestId === null || manifestId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'manifestId' missing."));
            }
            return;
        }
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
            url: "/v3/firmware-manifests/{manifest_id}/".replace("{" + "manifest_id" + "}", String(manifestId)),
            method: "DELETE",
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
     * List manifests
     * List firmware manifests.
     * @param limit How many firmware manifests to retrieve
     * @param order ASC or DESC
     * @param after The ID of the the item after which to retrieve the next page.
     * @param filter URL-encoded query string parameter to filter returned data  &#x60;?filter&#x3D;{URL-encoded query string}&#x60;  ###### Filterable fields:  The below table lists all the fields that can be filtered on with certain filters:  |     Field     | &#x3D; / __eq / __neq | __in /  __nin | __lte / __gte | |:-------------:|:----------------:|:-------------:|:-------------:| |   created_at  |         ✓        |       ✓       |       ✓       | |    datafile   |         ✓        |       ✓       |               | | datafile_size |         ✓        |       ✓       |               | |  description  |         ✓        |       ✓       |               | |  device_class |         ✓        |       ✓       |               | |      etag     |         ✓        |       ✓       |       ✓       | |       id      |         ✓        |       ✓       |               | |      name     |         ✓        |       ✓       |               | |   timestamp   |         ✓        |       ✓       |       ✓       | |   updated_at  |         ✓        |       ✓       |       ✓       |  The query string is made up of key-value pairs separated by ampersands. For example, this query: &#x60;key1__eq&#x3D;value1&amp;key2__eq&#x3D;value2&amp;key3__eq&#x3D;value3&#x60;  would be URL-encoded as: &#x60;?filter&#x3D;key1__eq%3Dvalue1%26key2__eq%3Dvalue2%26key3__eq%3Dvalue3&#x60;   **Filtering by properties** &#x60;name__eq&#x3D;mymanifest&#x60;  **Filtering on date-time fields**  Date-time fields should be specified in UTC RFC3339 format, &#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds. Example: &#x60;2016-11-30T16:25:12.1234Z&#x60; * UTC RFC3339 without milliseconds. Example: &#x60;2016-11-30T16:25:12Z&#x60; * UTC RFC3339 shortened without milliseconds and punctuation. Example: &#x60;20161130T162512Z&#x60;  Date-time filtering supports three operators:  * equality by appending &#x60;__eq&#x60; to the field name * greater than or equal to by appending &#x60;__gte&#x60; to the field name * less than or equal to by appending &#x60;__lte&#x60; to the field name  &#x60;{field name}[|__eq|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;  Time ranges may be specified by including both the &#x60;__gte&#x60; and &#x60;__lte&#x60; forms in the filter. For example:  &#x60;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&#x60;  **Filtering on multiple fields**  &#x60;name__eq&#x3D;mymanifest&amp;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&#x60;  **Filtering with filter operators**  String field filtering supports the following operators:  * equality: &#x60;__eq&#x60; * non-equality: &#x60;__neq&#x60; * in : &#x60;__in&#x60; * not in: &#x60;__nin&#x60;  For &#x60;__in&#x60; and &#x60;__nin&#x60; filters list of parameters must be comma-separated:  &#x60;name__in&#x3D;fw-manifest1,fw-manifest2&#x60;
     * @param include Comma-separated list of data fields to return. Currently supported: total_count
     */
    DefaultApi.prototype.firmwareManifestList = function (limit, order, after, filter, include, callback, requestOptions) {
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
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/firmware-manifests/",
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
     * Get a manifest
     * Retrieve firmware manifest.
     * @param manifestId The firmware manifest ID
     */
    DefaultApi.prototype.firmwareManifestRetrieve = function (manifestId, callback, requestOptions) {
        // verify required parameter "manifestId" is set
        if (manifestId === null || manifestId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'manifestId' missing."));
            }
            return;
        }
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
            url: "/v3/firmware-manifests/{manifest_id}/".replace("{" + "manifest_id" + "}", String(manifestId)),
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
     * Create a campaign
     * Create an update campaign.
     * @param campaign Update campaign
     */
    DefaultApi.prototype.updateCampaignCreate = function (campaign, callback, requestOptions) {
        // verify required parameter "campaign" is set
        if (campaign === null || campaign === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'campaign' missing."));
            }
            return;
        }
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
            url: "/v3/update-campaigns/",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: campaign,
        }, callback);
    };
    /**
     * Delete a campaign
     * Delete an update campaign.
     * @param campaignId The ID of the update campaign
     */
    DefaultApi.prototype.updateCampaignDestroy = function (campaignId, callback, requestOptions) {
        // verify required parameter "campaignId" is set
        if (campaignId === null || campaignId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'campaignId' missing."));
            }
            return;
        }
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
            url: "/v3/update-campaigns/{campaign_id}/".replace("{" + "campaign_id" + "}", String(campaignId)),
            method: "DELETE",
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
     * List all campaigns
     * Get update campaigns for devices specified by a filter.
     * @param limit How many update campaigns to retrieve
     * @param order The order of the records. Acceptable values: ASC, DESC. Default: ASC
     * @param after The ID of the the item after which to retrieve the next page
     * @param filter URL-encoded query string parameter to filter returned data  &#x60;?filter&#x3D;{URL-encoded query string}&#x60;   ###### Filterable fields:    The below table lists all the fields that can be filtered on with certain filters:    |       Field      | &#x3D; / __eq / __neq | __in /  __nin | __lte / __gte |   |:----------------:|:----------------:|:-------------:|:-------------:|   |    created_at    |         ✓        |       ✓       |       ✓       |   |    description   |         ✓        |       ✓       |               |   |   device_filter  |         ✓        |       ✓       |               |   |       etag       |         ✓        |       ✓       |       ✓       |   |     finished     |         ✓        |       ✓       |       ✓       |   |        id        |         ✓        |       ✓       |               |   |       name       |         ✓        |       ✓       |               |   | root_manifest_id |         ✓        |       ✓       |               |   |    started_at    |         ✓        |       ✓       |       ✓       |   |       state      |         ✓        |       ✓       |               |   |    updated_at    |         ✓        |       ✓       |       ✓       |   |       when       |         ✓        |       ✓       |       ✓       |  The query string is made up of key-value pairs separated by ampersands. For example, this query: &#x60;key1__eq&#x3D;value1&amp;key2__eq&#x3D;value2&amp;key3__eq&#x3D;value3&#x60;  would be URL-encoded as: &#x60;?filter&#x3D;key1__eq%3Dvalue1%26key2__eq%3Dvalue2%26key3__eq%3Dvalue3&#x60;   **Filtering by campaign properties** &#x60;state__eq&#x3D;[draft|scheduled|devicefectch|devicecopy|publishing|deploying|deployed|manifestremoved|expired]&#x60;  &#x60;root_manifest_id__eq&#x3D;43217771234242e594ddb433816c498a&#x60;  **Filtering on date-time fields**  Date-time fields should be specified in UTC RFC3339 format, &#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds. Example: &#x60;2016-11-30T16:25:12.1234Z&#x60; * UTC RFC3339 without milliseconds. Example: &#x60;2016-11-30T16:25:12Z&#x60; * UTC RFC3339 shortened without milliseconds and punctuation. Example: &#x60;20161130T162512Z&#x60;  Date-time filtering supports three operators:  * equality by appending &#x60;__eq&#x60; to the field name * greater than or equal to by appending &#x60;__gte&#x60; to the field name * less than or equal to by appending &#x60;__lte&#x60; to the field name  &#x60;{field name}[|__eq|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;  Time ranges may be specified by including both the &#x60;__gte&#x60; and &#x60;__lte&#x60; forms in the filter. For example:  &#x60;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&#x60;  **Filtering on multiple fields**  &#x60;state__eq&#x3D;deployed&amp;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&#x60;  **Filtering with filter operators**  String field filtering supports the following operators:  * equality: &#x60;__eq&#x60; * non-equality: &#x60;__neq&#x60; * in : &#x60;__in&#x60; * not in: &#x60;__nin&#x60;  For &#x60;__in&#x60; and &#x60;__nin&#x60; filters list of parameters must be comma-separated:  &#x60;name__in&#x3D;fw-image1,fw-image2&#x60;
     * @param include Comma-separated list of data fields to return. Currently supported: total_count
     */
    DefaultApi.prototype.updateCampaignList = function (limit, order, after, filter, include, callback, requestOptions) {
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
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/update-campaigns/",
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
     * List all campaign device metadata
     * Get campaign device metadata.
     * @param campaignId The update campaign ID
     * @param limit How many objects to retrieve in the page
     * @param order ASC or DESC
     * @param after The ID of the the item after which to retrieve the next page
     * @param include Comma-separated list of data fields to return. Currently supported: total_count
     */
    DefaultApi.prototype.updateCampaignMetadataList = function (campaignId, limit, order, after, include, callback, requestOptions) {
        // verify required parameter "campaignId" is set
        if (campaignId === null || campaignId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'campaignId' missing."));
            }
            return;
        }
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
        if (include !== undefined) {
            queryParameters["include"] = include;
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
            url: "/v3/update-campaigns/{campaign_id}/campaign-device-metadata/".replace("{" + "campaign_id" + "}", String(campaignId)),
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
     * Get a campaign device metadata
     * Get update campaign metadata.
     * @param campaignId The update campaign ID
     * @param campaignDeviceMetadataId The campaign device metadata ID
     */
    DefaultApi.prototype.updateCampaignMetadataRetrieve = function (campaignId, campaignDeviceMetadataId, callback, requestOptions) {
        // verify required parameter "campaignId" is set
        if (campaignId === null || campaignId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'campaignId' missing."));
            }
            return;
        }
        // verify required parameter "campaignDeviceMetadataId" is set
        if (campaignDeviceMetadataId === null || campaignDeviceMetadataId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'campaignDeviceMetadataId' missing."));
            }
            return;
        }
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
            url: "/v3/update-campaigns/{campaign_id}/campaign-device-metadata/{campaign_device_metadata_id}/".replace("{" + "campaign_id" + "}", String(campaignId)).replace("{" + "campaign_device_metadata_id" + "}", String(campaignDeviceMetadataId)),
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
     * Stop a running campaign
     * Stop a running update campaign.
     * @param campaignId The campaign ID
     */
    DefaultApi.prototype.updateCampaignMetadataStop = function (campaignId, callback, requestOptions) {
        // verify required parameter "campaignId" is set
        if (campaignId === null || campaignId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'campaignId' missing."));
            }
            return;
        }
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
            url: "/v3/update-campaigns/{campaign_id}/stop".replace("{" + "campaign_id" + "}", String(campaignId)),
            method: "POST",
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
     * Get a campaign.
     * Get an update campaign.
     * @param campaignId The campaign ID
     */
    DefaultApi.prototype.updateCampaignRetrieve = function (campaignId, callback, requestOptions) {
        // verify required parameter "campaignId" is set
        if (campaignId === null || campaignId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'campaignId' missing."));
            }
            return;
        }
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
            url: "/v3/update-campaigns/{campaign_id}/".replace("{" + "campaign_id" + "}", String(campaignId)),
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
     * Modify a campaign
     * Modify an update campaign.
     * @param campaignId
     * @param campaign Update campaign
     */
    DefaultApi.prototype.updateCampaignUpdate = function (campaignId, campaign, callback, requestOptions) {
        // verify required parameter "campaignId" is set
        if (campaignId === null || campaignId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'campaignId' missing."));
            }
            return;
        }
        // verify required parameter "campaign" is set
        if (campaign === null || campaign === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'campaign' missing."));
            }
            return;
        }
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
            url: "/v3/update-campaigns/{campaign_id}/".replace("{" + "campaign_id" + "}", String(campaignId)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: campaign,
        }, callback);
    };
    return DefaultApi;
}(apiBase_1.ApiBase));
exports.DefaultApi = DefaultApi;
//# sourceMappingURL=update_service.js.map