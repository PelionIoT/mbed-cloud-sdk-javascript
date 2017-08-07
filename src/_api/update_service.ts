// ===============================================
// This file is autogenerated - Please do not edit
// Tracks base typescript-fetch mustache 01/02/17
// ===============================================
/**
 * Update Service API
 * This is the API Documentation for the mbed deployment service which is part of the update service.
 *
 * OpenAPI spec version: 3
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/* tslint:disable:no-unused-variable */
/* tslint:disable:no-implicit-any */

import superagent = require('superagent');
import { ApiBase } from "../common/apiBase";
import { SDKError } from "../common/sdkError";

export interface CampaignDeviceMetadata {
    /**
     * Description of the record
     */
    "description"?: string;
    /**
     * The id of the campaign the device is in
     */
    "campaign"?: string;
    /**
     * This time the record was created in the database
     */
    "created_at"?: Date;
    /**
     * Entity name: always 'update-campaign-device-metadata'
     */
    "object"?: string;
    /**
     * This time this record was modified in the database format: date-time
     */
    "updated_at"?: Date;
    /**
     * The mechanism used to deliver the firmware (connector or direct)
     */
    "mechanism"?: string;
    /**
     * The name of the record
     */
    "name"?: string;
    /**
     * API resource entity version.
     */
    "etag"?: string;
    /**
     * The url of cloud connect used
     */
    "mechanism_url"?: string;
    /**
     * The state of the update campaign on the device
     */
    "deployment_state"?: string;
    /**
     * The id of the metadata record
     */
    "id"?: string;
    /**
     * The id of the device
     */
    "device_id"?: string;
}

export interface CampaignDeviceMetadataPage {
    /**
     * The entity ID to fetch after the given one.
     */
    "after"?: string;
    /**
     * Flag indicating whether there is more results.
     */
    "has_more"?: boolean;
    /**
     * The total number or records, if requested. It might be returned also for small lists.
     */
    "total_count"?: number;
    /**
     * Entity name: always ‘list’
     */
    "object"?: string;
    /**
     * The number of results to return, (range: 2-1000), or equals to total_count
     */
    "limit"?: number;
    /**
     * A list of entities
     */
    "data"?: Array<CampaignDeviceMetadata>;
}

export interface FirmwareImage {
    /**
     * The binary file of firmware image.
     */
    "datafile": string;
    /**
     * The description of the object.
     */
    "description": string;
    /**
     * The time the object was created.
     */
    "created_at": Date;
    /**
     * The API resource entity.
     */
    "object": string;
    /**
     * The time the object was updated.
     */
    "updated_at": Date;
    /**
     * The entity instance signature.
     */
    "etag": Date;
    /**
     * Checksum generated for the datafile.
     */
    "datafile_checksum": string;
    /**
     * The ID of the firmware image.
     */
    "id": string;
    /**
     * The name of the object.
     */
    "name": string;
}

export interface FirmwareImagePage {
    "object"?: string;
    "has_more"?: boolean;
    "total_count"?: number;
    "after"?: string;
    "limit"?: number;
    "data"?: Array<FirmwareImage>;
    "order"?: string;
}

export interface FirmwareManifest {
    "datafile": string;
    /**
     * The description of the object.
     */
    "description": string;
    /**
     * The version of the firmware manifest (as a timestamp).
     */
    "timestamp": Date;
    /**
     * The time the object was created.
     */
    "created_at": Date;
    /**
     * The API resource entity.
     */
    "object": string;
    /**
     * The time the object was updated.
     */
    "updated_at": Date;
    "manifest_contents": ManifestContents;
    /**
     * The entity instance signature.
     */
    "etag": Date;
    /**
     * The class of device.
     */
    "device_class": string;
    /**
     * The ID of the firmware manifest.
     */
    "id": string;
    /**
     * The name of the object.
     */
    "name": string;
}

export interface FirmwareManifestPage {
    "object"?: string;
    "has_more"?: boolean;
    "total_count"?: number;
    "after"?: string;
    "limit"?: number;
    "data"?: Array<FirmwareManifest>;
    "order"?: string;
}

export interface ManifestContents {
    /**
     * Hex representation of the 128-bit RFC4122 GUID that represents the device class that the update targets.
     */
    "classId"?: string;
    /**
     * Hex representation of the 128-bit RFC4122 GUID that represents the vendor.
     */
    "vendorId"?: string;
    /**
     * The version of the manifest format being used.
     */
    "manifestVersion"?: number;
    /**
     * A short description of the update.
     */
    "description"?: string;
    /**
     * A 128-bit random field. This is provided by the manifest tool to ensure that the signing algorithm is safe from timing side-channel attacks.
     */
    "nonce"?: string;
    /**
     * The time the manifest was created. The timestamp is stored as Unix time.
     */
    "timestamp"?: number;
    "encryptionMode"?: ManifestContentsEncryptionMode;
    /**
     * A flag that indicates that the update described by the manifest should be applied as soon as possible.
     */
    "applyImmediately"?: boolean;
    /**
     * Hex representation of the 128-bit RFC4122 GUID that uniquely identifies the device. Each device has a single, unique device ID.
     */
    "deviceId"?: string;
    "payload"?: ManifestContentsPayload;
}

export interface ManifestContentsEncryptionMode {
    /**
     * The encryption mode describing the kind of hashing, signing and, encryption in use. The following modes are available: 1: none-ecc-secp256r1-sha256: SHA-256 hashing, ECDSA signatures, using the secp256r1 curve. No payload encryption is used. 2: aes-128-ctr-ecc-secp256r1-sha256: SHA-256 hashing, ECDSA signatures, using the secp256r1 curve. The payload is encrypted with AES-128 in CTR-mode. 3: none-none-sha256: SHA-256 hashing. No signature is used. No payload encryption is used. This mode is not recommended except over existing, trusted connections.         
     */
    "enum"?: number;
}

export interface ManifestContentsPayload {
    "format"?: ManifestContentsPayloadFormat;
    "reference"?: ManifestContentsPayloadReference;
    /**
     * An identifier for where the payload is to be located. This identifier indicates where the image should be placed on the device. For example, when an IoT device contains multiple microcontrollers (MCUs) and the decision needs to be made to which MCU to send which firmware image.
     */
    "storageIdentifier"?: string;
}

export interface ManifestContentsPayloadFormat {
    /**
     * Format of the payload. Can be: 1: raw-binary 2: cbor 3: hex-location-length-data 4: elf 
     */
    "enum"?: number;
}

export interface ManifestContentsPayloadReference {
    /**
     * Hex representation of the SHA-256 hash of the payload
     */
    "hash"?: string;
    /**
     * The URI of the payload.
     */
    "uri"?: string;
    /**
     * Size of the payload in bytes
     */
    "size"?: number;
}

export type UpdateCampaignStateEnum = "draft" | "scheduled" | "devicefetch" | "devicecopy" | "publishing" | "deploying" | "deployed" | "manifestremoved" | "expired";
export interface UpdateCampaign {
    /**
     * An optional description of the campaign.
     */
    "description"?: string;
    "root_manifest_id"?: string;
    /**
     * The time the object was created.
     */
    "created_at"?: string;
    /**
     * The API resource entity.
     */
    "object"?: string;
    /**
     * The timestamp at which update campaign scheduled to start.
     */
    "when"?: string;
    /**
     * The state of the campaign.
     */
    "state"?: UpdateCampaignStateEnum;
    /**
     * The timestamp when the update campaign finished.
     */
    "finished"?: string;
    /**
     * The entity instance signature.
     */
    "etag"?: string;
    "root_manifest_url"?: string;
    "started_at"?: Date;
    /**
     * The ID of the campaign.
     */
    "id"?: string;
    /**
     * The filter for the devices the campaign will target.
     */
    "device_filter"?: string;
    /**
     * A name for this campaign.
     */
    "name"?: string;
}

export interface UpdateCampaignPage {
    "object"?: string;
    "has_more"?: boolean;
    "total_count"?: number;
    "after"?: string;
    "limit"?: number;
    "data"?: Array<UpdateCampaign>;
    "order"?: string;
}

export type UpdateCampaignPatchRequestStateEnum = "draft" | "scheduled" | "devicefetch" | "devicecopy" | "publishing" | "deploying" | "deployed" | "manifestremoved" | "expired";
export interface UpdateCampaignPatchRequest {
    /**
     * An optional description of the campaign.
     */
    "description"?: string;
    "root_manifest_id"?: string;
    /**
     * The API resource entity.
     */
    "object"?: string;
    /**
     * The timestamp at which update campaign scheduled to start.
     */
    "when"?: string;
    /**
     * The state of the campaign.
     */
    "state"?: UpdateCampaignPatchRequestStateEnum;
    /**
     * The filter for the devices the campaign will target.
     */
    "device_filter"?: string;
    /**
     * A name for this campaign.
     */
    "name"?: string;
}

export type UpdateCampaignPostRequestStateEnum = "draft" | "scheduled" | "devicefetch" | "devicecopy" | "publishing" | "deploying" | "deployed" | "manifestremoved" | "expired";
export interface UpdateCampaignPostRequest {
    /**
     * An optional description of the campaign.
     */
    "description"?: string;
    "root_manifest_id"?: string;
    /**
     * The API resource entity.
     */
    "object"?: string;
    /**
     * The timestamp at which update campaign scheduled to start.
     */
    "when"?: string;
    /**
     * The state of the campaign.
     */
    "state"?: UpdateCampaignPostRequestStateEnum;
    /**
     * The filter for the devices the campaign will target.
     */
    "device_filter": string;
    /**
     * A name for this campaign.
     */
    "name": string;
}

export type UpdateCampaignPutRequestStateEnum = "draft" | "scheduled" | "devicefetch" | "devicecopy" | "publishing" | "deploying" | "deployed" | "manifestremoved" | "expired";
export interface UpdateCampaignPutRequest {
    /**
     * An optional description of the campaign.
     */
    "description": string;
    "root_manifest_id": string;
    /**
     * The API resource entity.
     */
    "object": string;
    /**
     * The timestamp at which update campaign scheduled to start.
     */
    "when": string;
    /**
     * The state of the campaign.
     */
    "state": UpdateCampaignPutRequestStateEnum;
    /**
     * The filter for the devices the campaign will target.
     */
    "device_filter": string;
    /**
     * A name for this campaign.
     */
    "name": string;
}

/**
 * DefaultApi
 */
export class DefaultApi extends ApiBase {

    /** 
     * Create firmware image.
     * @param datafile The firmware image file to upload.
     * @param name The name of the object.
     * @param description The description of the object.
     */
    firmwareImageCreate (datafile: any, name: string, description?: string, callback?: (error:any, data?:FirmwareImage, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "datafile" is set
        if (datafile === null || datafile === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'datafile' missing."));
            }
            return;
        }
        // verify required parameter "name" is set
        if (name === null || name === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'name' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};
        if (datafile !== undefined) {
            formParams['datafile'] = datafile;
        }
        useFormData = true;

        if (description !== undefined) {
            formParams['description'] = description;
        }

        if (name !== undefined) {
            formParams['name'] = name;
        }


        return this.request<FirmwareImage>({
            url: '/v3/firmware-images/',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * Delete firmware image.
     * @param imageId The ID of the firmware image.
     */
    firmwareImageDestroy (imageId: string, callback?: (error:any, data?:any, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "imageId" is set
        if (imageId === null || imageId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'imageId' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request<null>({
            url: '/v3/firmware-images/{image_id}/'.replace('{' + 'image_id' + '}', String(imageId)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * List all firmware images
     * @param limit How many objects to retrieve in the page.
     * @param order ASC or DESC
     * @param after The ID of the the item after which to retrieve the next page.
     * @param filter URL encoded query string parameter to filter returned data. The result will be paged into pages of 50.  ##### Filtering &#x60;&#x60;&#x60;?filter&#x3D;{URL encoded query string}&#x60;&#x60;&#x60;  The query string is made up of key/value pairs separated by ampersands. So for a query of &#x60;&#x60;&#x60;key1&#x3D;value1&amp;key2&#x3D;value2&amp;key3&#x3D;value3&#x60;&#x60;&#x60; this would be encoded as follows: &#x60;&#x60;&#x60;?filter&#x3D;key1%3Dvalue1%26key2%3Dvalue2%26key3%3Dvalue3&#x60;&#x60;&#x60; The examples below show the queries in *unencoded* form.  ###### By firmware image properties (all properties are filterable): For example: &#x60;&#x60;&#x60;name&#x3D;{value}&#x60;&#x60;&#x60; ###### On date-time fields: Date-time fields should be specified in UTC RFC3339 format &#x60;&#x60;&#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;&#x60;&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds e.g. 2016-11-30T16:25:12.1234Z * UTC RFC3339 without milliseconds e.g. 2016-11-30T16:25:12Z * UTC RFC3339 shortened - without milliseconds and punctuation e.g. 20161130T162512Z  Date-time filtering supports three operators:  * equality * greater than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; * less than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60;  Lower and upper limits to a date-time range may be specified by including both the &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; and &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60; forms in the filter.  &#x60;&#x60;&#x60;{field name}[|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;&#x60;&#x60;  ##### Multi-field example &#x60;&#x60;&#x60;name&#x3D;MyName&amp;bootstrapped&amp;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&#x60;&#x60;&#x60;  Encoded: &#x60;&#x60;&#x60;?filter&#x3D;name%3DMyName%26created_at__gte%3D2016-11-30T16%3A25%3A12.1234Z%26created_at__lte%3D2016-11-30T00%3A00%3A00Z&#x60;&#x60;&#x60;
     * @param include Comma separated list of data fields to return. Currently supported: total_count
     */
    firmwareImageList (limit?: number, order?: string, after?: string, filter?: string, include?: string, callback?: (error:any, data?:FirmwareImagePage, response?: superagent.Response) => any): superagent.SuperAgentRequest {

        let headerParams: any = {};

        let queryParameters: any = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (filter !== undefined) {
            queryParameters['filter'] = filter;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }

        let useFormData = false;
        let formParams: any = {};

        return this.request<FirmwareImagePage>({
            url: '/v3/firmware-images/',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * Retrieve firmware image.
     * @param imageId The ID of the firmware image.
     */
    firmwareImageRetrieve (imageId: string, callback?: (error:any, data?:FirmwareImage, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "imageId" is set
        if (imageId === null || imageId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'imageId' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request<FirmwareImage>({
            url: '/v3/firmware-images/{image_id}/'.replace('{' + 'image_id' + '}', String(imageId)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * Create firmware manifest.
     * @param datafile The manifest file to create. The size of the file is account specific and enforced by the api gateway.
     * @param name The name of the object.
     * @param description The description of the object.
     */
    firmwareManifestCreate (datafile: any, name: string, description?: string, callback?: (error:any, data?:FirmwareManifest, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "datafile" is set
        if (datafile === null || datafile === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'datafile' missing."));
            }
            return;
        }
        // verify required parameter "name" is set
        if (name === null || name === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'name' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};
        if (datafile !== undefined) {
            formParams['datafile'] = datafile;
        }
        useFormData = true;

        if (description !== undefined) {
            formParams['description'] = description;
        }

        if (name !== undefined) {
            formParams['name'] = name;
        }


        return this.request<FirmwareManifest>({
            url: '/v3/firmware-manifests/',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * Delete firmware manifest.
     * @param manifestId The ID of the firmware manifest.
     */
    firmwareManifestDestroy (manifestId: string, callback?: (error:any, data?:any, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "manifestId" is set
        if (manifestId === null || manifestId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'manifestId' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request<null>({
            url: '/v3/firmware-manifests/{manifest_id}/'.replace('{' + 'manifest_id' + '}', String(manifestId)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * List all firmware manifests.
     * @param limit How many objects to retrieve in the page.
     * @param order ASC or DESC
     * @param after The ID of the the item after which to retrieve the next page.
     * @param filter URL-encoded query string parameter to filter returned data.  ##### Filtering &#x60;&#x60;&#x60;?filter&#x3D;{URL-encoded query string}&#x60;&#x60;&#x60;  The query string is made up of key/value pairs separated by ampersands. So for a query of &#x60;&#x60;&#x60;key1&#x3D;value1&amp;key2&#x3D;value2&amp;key3&#x3D;value3&#x60;&#x60;&#x60; this would be encoded as follows: &#x60;&#x60;&#x60;?filter&#x3D;key1%3Dvalue1%26key2%3Dvalue2%26key3%3Dvalue3&#x60;&#x60;&#x60; The examples below show the queries in *unencoded* form.  ##### By manifest ID: &#x60;&#x60;&#x60;manifest_id&#x3D;{id}&#x60;&#x60;&#x60;  ##### By firmware manifest properties (all properties are filterable):  &#x60;&#x60;&#x60;device_class&#x3D;{value}&#x60;&#x60;&#x60;  ###### On date-time fields: Date-time fields should be specified in UTC RFC3339 format &#x60;&#x60;&#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;&#x60;&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds e.g. 2016-11-30T16:25:12.1234Z * UTC RFC3339 without milliseconds e.g. 2016-11-30T16:25:12Z * UTC RFC3339 shortened - without milliseconds and punctuation e.g. 20161130T162512Z  Date-time filtering supports three operators:  * equality * greater than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; * less than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60;  Lower and upper limits to a date-time range may be specified by including both the &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; and &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60; forms in the filter.  &#x60;&#x60;&#x60;{field name}[|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;&#x60;&#x60;  ##### Multi-field example &#x60;&#x60;&#x60;device_class&#x3D;1234&amp;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&#x60;&#x60;&#x60;  Encoded: &#x60;&#x60;&#x60;?filter&#x3D;device_class%3D1234%26created_at__gte%3D2016-11-30T16%3A25%3A12.1234Z%26created_at__lte%3D2016-11-30T00%3A00%3A00Z&#x60;&#x60;&#x60;
     * @param include Comma separated list of data fields to return. Currently supported: total_count
     */
    firmwareManifestList (limit?: number, order?: string, after?: string, filter?: string, include?: string, callback?: (error:any, data?:FirmwareManifestPage, response?: superagent.Response) => any): superagent.SuperAgentRequest {

        let headerParams: any = {};

        let queryParameters: any = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (filter !== undefined) {
            queryParameters['filter'] = filter;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }

        let useFormData = false;
        let formParams: any = {};

        return this.request<FirmwareManifestPage>({
            url: '/v3/firmware-manifests/',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * Retrieve firmware manifest.
     * @param manifestId The ID of the firmware manifest.
     */
    firmwareManifestRetrieve (manifestId: string, callback?: (error:any, data?:FirmwareManifest, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "manifestId" is set
        if (manifestId === null || manifestId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'manifestId' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request<FirmwareManifest>({
            url: '/v3/firmware-manifests/{manifest_id}/'.replace('{' + 'manifest_id' + '}', String(manifestId)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * &lt;p&gt;The APIs for creating and manipulating update campaigns. Update campaigns are used to control firmware update to a list of devices specified by a filter.  &lt;/p&gt; &lt;p&gt;Create update campaign&lt;/p&gt;
     * @param campaign Update campaign
     */
    updateCampaignCreate (campaign: UpdateCampaignPostRequest, callback?: (error:any, data?:UpdateCampaign, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "campaign" is set
        if (campaign === null || campaign === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'campaign' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request<UpdateCampaign>({
            url: '/v3/update-campaigns/',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: campaign,
        }, callback);
    }
    /** 
     * &lt;p&gt;The APIs for creating and manipulating update campaigns. Update campaigns are used to control firmware update to a list of devices specified by a filter.  &lt;/p&gt; &lt;p&gt;Delete update campaign&lt;/p&gt;
     * @param campaignId The ID of the update campaign
     */
    updateCampaignDestroy (campaignId: string, callback?: (error:any, data?:any, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "campaignId" is set
        if (campaignId === null || campaignId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'campaignId' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request<null>({
            url: '/v3/update-campaigns/{campaign_id}/'.replace('{' + 'campaign_id' + '}', String(campaignId)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * The APIs for creating and manipulating update campaigns.
     * @param limit How many objects to retrieve in the page.
     * @param order ASC or DESC
     * @param after The ID of the the item after which to retrieve the next page.
     * @param filter URL encoded query string parameter to filter returned data.  ##### Filtering &#x60;&#x60;&#x60;?filter&#x3D;{URL encoded query string}&#x60;&#x60;&#x60;  The query string is made up of key/value pairs separated by ampersands. So for a query of &#x60;&#x60;&#x60;key1&#x3D;value1&amp;key2&#x3D;value2&amp;key3&#x3D;value3&#x60;&#x60;&#x60; this would be encoded as follows: &#x60;&#x60;&#x60;?filter&#x3D;key1%3Dvalue1%26key2%3Dvalue2%26key3%3Dvalue3&#x60;&#x60;&#x60; The examples below show the queries in *unencoded* form.  ###### By campaign properties (all properties are filterable): For example: &#x60;&#x60;&#x60;state&#x3D;[draft|scheduled|devicefectch|devicecopy|publishing|deploying|deployed|manifestremoved|expired]&#x60;&#x60;&#x60;  &#x60;&#x60;&#x60;root_manifest_id&#x3D;43217771234242e594ddb433816c498a&#x60;&#x60;&#x60;  ###### On date-time fields: Date-time fields should be specified in UTC RFC3339 format &#x60;&#x60;&#x60;YYYY-MM-DDThh:mm:ss.msZ&#x60;&#x60;&#x60;. There are three permitted variations:  * UTC RFC3339 with milliseconds e.g. 2016-11-30T16:25:12.1234Z * UTC RFC3339 without milliseconds e.g. 2016-11-30T16:25:12Z * UTC RFC3339 shortened - without milliseconds and punctuation e.g. 20161130T162512Z  Date-time filtering supports three operators:  * equality * greater than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; * less than or equal to &amp;ndash; field name suffixed with &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60;  Lower and upper limits to a date-time range may be specified by including both the &#x60;&#x60;&#x60;__gte&#x60;&#x60;&#x60; and &#x60;&#x60;&#x60;__lte&#x60;&#x60;&#x60; forms in the filter.  &#x60;&#x60;&#x60;{field name}[|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&#x60;&#x60;&#x60;  ##### Multi-field example &#x60;&#x60;&#x60;state&#x3D;deployed&amp;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&#x60;&#x60;&#x60; Encoded: &#x60;&#x60;&#x60;?filter&#x3D;state%3Ddeployed%26created_at__gte%3D2016-11-30T16%3A25%3A12.1234Z%26created_at__lte%3D2016-11-30T00%3A00%3A00Z&#x60;&#x60;&#x60;
     * @param include Comma separated list of data fields to return. Currently supported: total_count
     */
    updateCampaignList (limit?: number, order?: string, after?: string, filter?: string, include?: string, callback?: (error:any, data?:UpdateCampaignPage, response?: superagent.Response) => any): superagent.SuperAgentRequest {

        let headerParams: any = {};

        let queryParameters: any = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (filter !== undefined) {
            queryParameters['filter'] = filter;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }

        let useFormData = false;
        let formParams: any = {};

        return this.request<UpdateCampaignPage>({
            url: '/v3/update-campaigns/',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * &lt;p&gt;The APIs for creating and manipulating update campaigns. Update campaigns are used to control firmware update to a list of devices specified by a filter.  &lt;/p&gt; &lt;p&gt;Update campaign fields&lt;/p&gt;
     * @param campaignId 
     * @param campaign Update campaign
     */
    updateCampaignPartialUpdate (campaignId: string, campaign: UpdateCampaignPatchRequest, callback?: (error:any, data?:UpdateCampaign, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "campaignId" is set
        if (campaignId === null || campaignId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'campaignId' missing."));
            }
            return;
        }
        // verify required parameter "campaign" is set
        if (campaign === null || campaign === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'campaign' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request<UpdateCampaign>({
            url: '/v3/update-campaigns/{campaign_id}/'.replace('{' + 'campaign_id' + '}', String(campaignId)),
            method: 'PATCH',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: campaign,
        }, callback);
    }
    /** 
     * &lt;p&gt;The APIs for creating and manipulating update campaigns. Update campaigns are used to control firmware update to a list of devices specified by a filter.  &lt;/p&gt; &lt;p&gt;Retrieve campaign&lt;/p&gt;
     * @param campaignId The ID of the campaign
     */
    updateCampaignRetrieve (campaignId: string, callback?: (error:any, data?:UpdateCampaign, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "campaignId" is set
        if (campaignId === null || campaignId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'campaignId' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request<UpdateCampaign>({
            url: '/v3/update-campaigns/{campaign_id}/'.replace('{' + 'campaign_id' + '}', String(campaignId)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * &lt;p&gt;The APIs for creating and manipulating update campaigns. Update campaigns are used to control firmware update to a list of devices specified by a filter.  &lt;/p&gt; &lt;p&gt;Update campaign&lt;/p&gt;
     * @param campaignId 
     * @param campaign Update campaign
     */
    updateCampaignUpdate (campaignId: string, campaign: UpdateCampaignPutRequest, callback?: (error:any, data?:UpdateCampaign, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "campaignId" is set
        if (campaignId === null || campaignId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'campaignId' missing."));
            }
            return;
        }
        // verify required parameter "campaign" is set
        if (campaign === null || campaign === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'campaign' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request<UpdateCampaign>({
            url: '/v3/update-campaigns/{campaign_id}/'.replace('{' + 'campaign_id' + '}', String(campaignId)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: campaign,
        }, callback);
    }
    /** 
     * @param campaignDeviceMetadataId The id of the campaign device metadata
     */
    v3CampaignDeviceMetadataCampaignDeviceMetadataIdGet (campaignDeviceMetadataId: string, callback?: (error:any, data?:CampaignDeviceMetadata, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "campaignDeviceMetadataId" is set
        if (campaignDeviceMetadataId === null || campaignDeviceMetadataId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'campaignDeviceMetadataId' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request<CampaignDeviceMetadata>({
            url: '/v3/campaign-device-metadata/{campaign_device_metadata_id}'.replace('{' + 'campaign_device_metadata_id' + '}', String(campaignDeviceMetadataId)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     */
    v3CampaignDeviceMetadataGet (callback?: (error:any, data?:CampaignDeviceMetadataPage, response?: superagent.Response) => any): superagent.SuperAgentRequest {

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request<CampaignDeviceMetadataPage>({
            url: '/v3/campaign-device-metadata',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
}

