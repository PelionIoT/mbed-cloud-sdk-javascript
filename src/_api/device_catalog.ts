// ===============================================
// This file is autogenerated - Please do not edit
// Tracks base typescript-fetch mustache 01/02/17
// ===============================================
/**
 * Device Catalog API
 * This is the API Documentation for the mbed device catalog update service.
 *
 * OpenAPI spec version: 0.1
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

export type DeviceDataDeployedStateEnum = "development" | "production";
export interface DeviceData {
    "bootstrap_expiration_date"?: Date;
    "bootstrapped_timestamp"?: Date;
    "connector_expiration_date"?: Date;
    "updated_at"?: Date;
    "mechanism"?: string;
    "device_class"?: string;
    "id"?: string;
    "description"?: string;
    "endpoint_name"?: string;
    "auto_update"?: boolean;
    "custom_attributes"?: any;
    "state"?: string;
    "etag"?: Date;
    "serial_number"?: string;
    "firmware_checksum"?: string;
    "manifest_timestamp"?: Date;
    "vendor_id"?: string;
    "account_id"?: string;
    "deployed_state"?: DeviceDataDeployedStateEnum;
    "object"?: string;
    "trust_class"?: number;
    "deployment"?: string;
    "mechanism_url"?: string;
    "trust_level"?: number;
    "name"?: string;
    "device_key"?: string;
    "created_at"?: Date;
    "manifest"?: string;
    "attestation_method"?: number;
    "ca_id"?: string;
}

export type DeviceDataRequestDeployedStateEnum = "development" | "production";
export interface DeviceDataRequest {
    "manifest_timestamp"?: Date;
    "vendor_id"?: string;
    "description"?: string;
    "deployed_state"?: DeviceDataRequestDeployedStateEnum;
    "firmware_checksum"?: string;
    "auto_update"?: boolean;
    "mechanism"?: string;
    "device_class"?: string;
    "trust_level"?: number;
    "custom_attributes"?: any;
    "manifest"?: string;
    "trust_class"?: number;
    "device_key"?: string;
    "state"?: string;
    "attestation_method"?: number;
    "ca_id"?: string;
    "deployment"?: string;
    "mechanism_url"?: string;
    "serial_number"?: string;
    "endpoint_name"?: string;
    "name"?: string;
}

export interface DeviceLogData {
    "date_time": Date;
    "state_change"?: boolean;
    "description"?: string;
    "changes"?: any;
    "event_type_description"?: string;
    "device_log_id"?: string;
    "data"?: any;
    "id"?: string;
    "event_type"?: string;
}

export interface DeviceLogPage {
    "object"?: string;
    "has_more"?: boolean;
    "total_count"?: number;
    "after"?: string;
    "limit"?: number;
    "data"?: Array<DeviceLogData>;
    "order"?: string;
}

export interface DevicePage {
    "object"?: string;
    "has_more"?: boolean;
    "total_count"?: number;
    "after"?: string;
    "limit"?: number;
    "data"?: Array<DeviceData>;
    "order"?: string;
}

/**
 * DefaultApi
 */
export class DefaultApi extends ApiBase {

    /** 
     * &lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;Create device&lt;/p&gt;
     * @param device 
     */
    deviceCreate (device: DeviceDataRequest, callback?: (error:any, data?:DeviceData, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "device" is set
        if (device === null || device === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'device' missing when calling 'deviceCreate'."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request({
            url: '/v3/devices/',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: device,
        }, callback);
    }
    /** 
     * &lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;Delete device&lt;/p&gt;
     * @param id 
     */
    deviceDestroy (id: string, callback?: (error:any, data?:any, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'id' missing when calling 'deviceDestroy'."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request({
            url: '/v3/devices/{id}/'.replace('{' + 'id' + '}', String(id)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * &lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;List all update devices.&lt;/p&gt; &lt;h4 id&#x3D;\&quot;filtering\&quot;&gt;Filtering:&lt;/h4&gt; &lt;p&gt;&lt;code&gt;?filter&#x3D;{URL encoded query string}&lt;/code&gt;&lt;/p&gt; &lt;p&gt;The query string is made up of key/value pairs separated by ampersands. So for a query of &lt;code&gt;key1&#x3D;value1&amp;amp;key2&#x3D;value2&amp;amp;key3&#x3D;value3&lt;/code&gt; this would be encoded as follows:&lt;/p&gt; &lt;p&gt;&lt;code&gt;?filter&#x3D;key1%3Dvalue1%26key2%3Dvalue2%26key3%3Dvalue3&lt;/code&gt;&lt;/p&gt; &lt;p&gt;The examples below show the queries in &lt;em&gt;unencoded&lt;/em&gt; form.&lt;/p&gt; &lt;h5 id&#x3D;\&quot;by-device-properties-all-properties-are-filterable\&quot;&gt;By device properties (all properties are filterable):&lt;/h5&gt; &lt;p&gt;&lt;code&gt;state&#x3D;[unenrolled|cloud_enrolling|bootstrapped|registered]&lt;/code&gt;&lt;/p&gt; &lt;p&gt;&lt;code&gt;device_class&#x3D;{value}&lt;/code&gt;&lt;/p&gt; &lt;h5 id&#x3D;\&quot;on-date-time-fields\&quot;&gt;On date-time fields:&lt;/h5&gt; &lt;p&gt;Date-time fields should be specified in UTC RFC3339 format &lt;code&gt;YYYY-MM-DDThh:mm:ss.msZ&lt;/code&gt;. There are three permitted variations:&lt;/p&gt; &lt;ul&gt; &lt;li&gt;UTC RFC3339 with milliseconds e.g. 2016-11-30T16:25:12.1234Z&lt;/li&gt; &lt;li&gt;UTC RFC3339 without milliseconds e.g. 2016-11-30T16:25:12Z&lt;/li&gt; &lt;li&gt;UTC RFC3339 shortened - without milliseconds and punctuation e.g. 20161130T162512Z&lt;/li&gt; &lt;/ul&gt; &lt;p&gt;Date-time filtering supports three operators:&lt;/p&gt; &lt;ul&gt; &lt;li&gt;equality&lt;/li&gt; &lt;li&gt;greater than or equal to &amp;ndash; field name suffixed with &lt;code&gt;__gte&lt;/code&gt;&lt;/li&gt; &lt;li&gt;less than or equal to &amp;ndash; field name suffixed with &lt;code&gt;__lte&lt;/code&gt;&lt;/li&gt; &lt;/ul&gt; &lt;p&gt;Lower and upper limits to a date-time range may be specified by including both the &lt;code&gt;__gte&lt;/code&gt; and &lt;code&gt;__lte&lt;/code&gt; forms in the filter.&lt;/p&gt; &lt;p&gt;&lt;code&gt;{field name}[|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&lt;/code&gt;&lt;/p&gt; &lt;h5 id&#x3D;\&quot;on-device-custom-attributes\&quot;&gt;On device custom attributes:&lt;/h5&gt; &lt;p&gt;&lt;code&gt;custom_attributes__{param}&#x3D;{value}&lt;/code&gt;&lt;/p&gt; &lt;p&gt;&lt;code&gt;custom_attributes__tag&#x3D;TAG1&lt;/code&gt;&lt;/p&gt; &lt;h4 id&#x3D;\&quot;multi-field-example\&quot;&gt;Multi-field example&lt;/h4&gt; &lt;p&gt;&lt;code&gt;state&#x3D;bootstrapped&amp;amp;created_at__gte&#x3D;2016-11-30T16:25:12.1234Z&amp;amp;created_at__lte&#x3D;2016-12-30T00:00:00Z&lt;/code&gt;&lt;/p&gt; &lt;p&gt;Encoded: &lt;code&gt;?filter&#x3D;state%3Dbootstrapped%26created_at__gte%3D2016-11-30T16%3A25%3A12.1234Z%26created_at__lte%3D2016-11-30T00%3A00%3A00Z&lt;/code&gt;&lt;/p&gt;
     * @param limit how many objects to retrieve in the page
     * @param order ASC or DESC
     * @param after the ID of the the item after which to retrieve the next page
     * @param filter URL encoded query string parameter to filter returned data
     * @param include Comma separated list of data fields to return. Currently supported: total_count
     * @param accountId 
     * @param attestationMethod 
     * @param autoUpdate 
     * @param bootstrapExpirationDate 
     * @param bootstrapExpirationDateLte 
     * @param bootstrapExpirationDateGte 
     * @param bootstrappedTimestamp 
     * @param bootstrappedTimestampLte 
     * @param bootstrappedTimestampGte 
     * @param caId 
     * @param connectorExpirationDate 
     * @param connectorExpirationDateLte 
     * @param connectorExpirationDateGte 
     * @param createdAt 
     * @param createdAtLte 
     * @param createdAtGte 
     * @param customAttributes 
     * @param deployedState 
     * @param deployment 
     * @param description 
     * @param deviceClass 
     * @param id 
     * @param deviceKey 
     * @param endpointName 
     * @param etag 
     * @param etagLte 
     * @param etagGte 
     * @param firmwareChecksum 
     * @param manifest 
     * @param manifestTimestamp 
     * @param manifestTimestampLte 
     * @param manifestTimestampGte 
     * @param mechanism 
     * @param mechanismUrl 
     * @param name 
     * @param object 
     * @param serialNumber 
     * @param state 
     * @param trustClass 
     * @param trustLevel 
     * @param updatedAt 
     * @param updatedAtLte 
     * @param updatedAtGte 
     * @param vendorId 
     */
    deviceList (limit?: number, order?: string, after?: string, filter?: string, include?: string, accountId?: string, attestationMethod?: number, autoUpdate?: boolean, bootstrapExpirationDate?: string, bootstrapExpirationDateLte?: string, bootstrapExpirationDateGte?: string, bootstrappedTimestamp?: string, bootstrappedTimestampLte?: string, bootstrappedTimestampGte?: string, caId?: string, connectorExpirationDate?: string, connectorExpirationDateLte?: string, connectorExpirationDateGte?: string, createdAt?: string, createdAtLte?: string, createdAtGte?: string, customAttributes?: string, deployedState?: string, deployment?: string, description?: string, deviceClass?: string, id?: string, deviceKey?: string, endpointName?: string, etag?: string, etagLte?: string, etagGte?: string, firmwareChecksum?: string, manifest?: string, manifestTimestamp?: string, manifestTimestampLte?: string, manifestTimestampGte?: string, mechanism?: string, mechanismUrl?: string, name?: string, object?: string, serialNumber?: string, state?: string, trustClass?: string, trustLevel?: string, updatedAt?: string, updatedAtLte?: string, updatedAtGte?: string, vendorId?: string, callback?: (error:any, data?:DevicePage, response?: superagent.Response) => any): superagent.SuperAgentRequest {

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
        if (accountId !== undefined) {
            queryParameters['account_id'] = accountId;
        }
        if (attestationMethod !== undefined) {
            queryParameters['attestation_method'] = attestationMethod;
        }
        if (autoUpdate !== undefined) {
            queryParameters['auto_update'] = autoUpdate;
        }
        if (bootstrapExpirationDate !== undefined) {
            queryParameters['bootstrap_expiration_date'] = bootstrapExpirationDate;
        }
        if (bootstrapExpirationDateLte !== undefined) {
            queryParameters['bootstrap_expiration_date__lte'] = bootstrapExpirationDateLte;
        }
        if (bootstrapExpirationDateGte !== undefined) {
            queryParameters['bootstrap_expiration_date__gte'] = bootstrapExpirationDateGte;
        }
        if (bootstrappedTimestamp !== undefined) {
            queryParameters['bootstrapped_timestamp'] = bootstrappedTimestamp;
        }
        if (bootstrappedTimestampLte !== undefined) {
            queryParameters['bootstrapped_timestamp__lte'] = bootstrappedTimestampLte;
        }
        if (bootstrappedTimestampGte !== undefined) {
            queryParameters['bootstrapped_timestamp__gte'] = bootstrappedTimestampGte;
        }
        if (caId !== undefined) {
            queryParameters['ca_id'] = caId;
        }
        if (connectorExpirationDate !== undefined) {
            queryParameters['connector_expiration_date'] = connectorExpirationDate;
        }
        if (connectorExpirationDateLte !== undefined) {
            queryParameters['connector_expiration_date__lte'] = connectorExpirationDateLte;
        }
        if (connectorExpirationDateGte !== undefined) {
            queryParameters['connector_expiration_date__gte'] = connectorExpirationDateGte;
        }
        if (createdAt !== undefined) {
            queryParameters['created_at'] = createdAt;
        }
        if (createdAtLte !== undefined) {
            queryParameters['created_at__lte'] = createdAtLte;
        }
        if (createdAtGte !== undefined) {
            queryParameters['created_at__gte'] = createdAtGte;
        }
        if (customAttributes !== undefined) {
            queryParameters['custom_attributes'] = customAttributes;
        }
        if (deployedState !== undefined) {
            queryParameters['deployed_state'] = deployedState;
        }
        if (deployment !== undefined) {
            queryParameters['deployment'] = deployment;
        }
        if (description !== undefined) {
            queryParameters['description'] = description;
        }
        if (deviceClass !== undefined) {
            queryParameters['device_class'] = deviceClass;
        }
        if (id !== undefined) {
            queryParameters['id'] = id;
        }
        if (deviceKey !== undefined) {
            queryParameters['device_key'] = deviceKey;
        }
        if (endpointName !== undefined) {
            queryParameters['endpoint_name'] = endpointName;
        }
        if (etag !== undefined) {
            queryParameters['etag'] = etag;
        }
        if (etagLte !== undefined) {
            queryParameters['etag__lte'] = etagLte;
        }
        if (etagGte !== undefined) {
            queryParameters['etag__gte'] = etagGte;
        }
        if (firmwareChecksum !== undefined) {
            queryParameters['firmware_checksum'] = firmwareChecksum;
        }
        if (manifest !== undefined) {
            queryParameters['manifest'] = manifest;
        }
        if (manifestTimestamp !== undefined) {
            queryParameters['manifest_timestamp'] = manifestTimestamp;
        }
        if (manifestTimestampLte !== undefined) {
            queryParameters['manifest_timestamp__lte'] = manifestTimestampLte;
        }
        if (manifestTimestampGte !== undefined) {
            queryParameters['manifest_timestamp__gte'] = manifestTimestampGte;
        }
        if (mechanism !== undefined) {
            queryParameters['mechanism'] = mechanism;
        }
        if (mechanismUrl !== undefined) {
            queryParameters['mechanism_url'] = mechanismUrl;
        }
        if (name !== undefined) {
            queryParameters['name'] = name;
        }
        if (object !== undefined) {
            queryParameters['object'] = object;
        }
        if (serialNumber !== undefined) {
            queryParameters['serial_number'] = serialNumber;
        }
        if (state !== undefined) {
            queryParameters['state'] = state;
        }
        if (trustClass !== undefined) {
            queryParameters['trust_class'] = trustClass;
        }
        if (trustLevel !== undefined) {
            queryParameters['trust_level'] = trustLevel;
        }
        if (updatedAt !== undefined) {
            queryParameters['updated_at'] = updatedAt;
        }
        if (updatedAtLte !== undefined) {
            queryParameters['updated_at__lte'] = updatedAtLte;
        }
        if (updatedAtGte !== undefined) {
            queryParameters['updated_at__gte'] = updatedAtGte;
        }
        if (vendorId !== undefined) {
            queryParameters['vendor_id'] = vendorId;
        }

        let useFormData = false;
        let formParams: any = {};

        return this.request({
            url: '/v3/devices/',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * &lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;List all device logs.&lt;/p&gt; &lt;h4 id&#x3D;\&quot;filtering\&quot;&gt;Filtering:&lt;/h4&gt; &lt;p&gt;&lt;code&gt;?filter&#x3D;{URL encoded query string}&lt;/code&gt;&lt;/p&gt; &lt;p&gt;The query string is made up of key/value pairs separated by ampersands. So for a query of &lt;code&gt;key1&#x3D;value1&amp;amp;key2&#x3D;value2&amp;amp;key3&#x3D;value3&lt;/code&gt; this would be encoded as follows:&lt;/p&gt; &lt;p&gt;&lt;code&gt;?filter&#x3D;key1%3Dvalue1%26key2%3Dvalue2%26key3%3Dvalue3&lt;/code&gt;&lt;/p&gt; &lt;p&gt;The examples below show the queries in &lt;em&gt;unencoded&lt;/em&gt; form.&lt;/p&gt; &lt;h5 id&#x3D;\&quot;by-device95id\&quot;&gt;By id:&lt;/h5&gt; &lt;p&gt;&lt;code&gt;id&#x3D;{id}&lt;/code&gt;&lt;/p&gt; &lt;h5 id&#x3D;\&quot;by-state-change\&quot;&gt;By state change:&lt;/h5&gt; &lt;p&gt;&lt;code&gt;state_change&#x3D;[True|False]&lt;/code&gt;&lt;/p&gt; &lt;h5 id&#x3D;\&quot;by-event-type\&quot;&gt;By event type:&lt;/h5&gt; &lt;p&gt;&lt;code&gt;event_type&#x3D;{value}&lt;/code&gt;&lt;/p&gt; &lt;h5 id&#x3D;\&quot;on-date-time-fields\&quot;&gt;On date-time fields:&lt;/h5&gt; &lt;p&gt;Date-time fields should be specified in UTC RFC3339 format &lt;code&gt;YYYY-MM-DDThh:mm:ss.msZ&lt;/code&gt;. There are three permitted variations:&lt;/p&gt; &lt;ul&gt; &lt;li&gt;UTC RFC3339 with milliseconds e.g. 2016-11-30T16:25:12.1234Z&lt;/li&gt; &lt;li&gt;UTC RFC3339 without milliseconds e.g. 2016-11-30T16:25:12Z&lt;/li&gt; &lt;li&gt;UTC RFC3339 shortened - without milliseconds and punctuation e.g. 20161130T162512Z&lt;/li&gt; &lt;/ul&gt; &lt;p&gt;Date-time filtering supports three operators:&lt;/p&gt; &lt;ul&gt; &lt;li&gt;equality&lt;/li&gt; &lt;li&gt;greater than or equal to &amp;ndash; field name suffixed with &lt;code&gt;__gte&lt;/code&gt;&lt;/li&gt; &lt;li&gt;less than or equal to &amp;ndash; field name suffixed with &lt;code&gt;__lte&lt;/code&gt;&lt;/li&gt; &lt;/ul&gt; &lt;p&gt;Lower and upper limits to a date-time range may be specified by including both the &lt;code&gt;__gte&lt;/code&gt; and &lt;code&gt;__lte&lt;/code&gt; forms in the filter.&lt;/p&gt; &lt;p&gt;&lt;code&gt;{field name}[|__lte|__gte]&#x3D;{UTC RFC3339 date-time}&lt;/code&gt;&lt;/p&gt; &lt;h5 id&#x3D;\&quot;on-device-custom-attributes\&quot;&gt;On device custom attributes:&lt;/h5&gt; &lt;p&gt;&lt;code&gt;device__custom_attributes__{param}&#x3D;{value}&lt;/code&gt;&lt;/p&gt; &lt;p&gt;&lt;code&gt;device__custom_attributes__tag&#x3D;TAG1&lt;/code&gt;&lt;/p&gt; &lt;h5 id&#x3D;\&quot;by-device-attributes\&quot;&gt;By Device attributes:&lt;/h5&gt; &lt;p&gt;&lt;code&gt;device__deployed_state&#x3D;{value}&lt;/code&gt;&lt;/p&gt; &lt;p&gt;&lt;code&gt;device__device_class&#x3D;{value}&lt;/code&gt;&lt;/p&gt; &lt;p&gt;&lt;code&gt;device__name&#x3D;{value}&lt;/code&gt;&lt;/p&gt; &lt;h4 id&#x3D;\&quot;multi-field-example\&quot;&gt;Multi-field example&lt;/h4&gt; &lt;p&gt;&lt;code&gt;id&#x3D;0158d38771f70000000000010010038c&amp;amp;state_change&#x3D;True&amp;amp;date_time__gte&#x3D;2016-11-30T16:25:12.1234Z&lt;/code&gt;&lt;/p&gt; &lt;p&gt;Encoded: &lt;code&gt;?filter&#x3D;id%3D0158d38771f70000000000010010038c%26state_change%3DTrue%26date_time__gte%3D2016-11-30T16%3A25%3A12.1234Z&lt;/code&gt;&lt;/p&gt;
     * @param limit how many objects to retrieve in the page
     * @param order ASC or DESC
     * @param after the ID of the the item after which to retrieve the next page
     * @param filter URL encoded query string parameter to filter returned data
     * @param include Comma separated list of data fields to return. Currently supported: total_count
     */
    deviceLogList (limit?: number, order?: string, after?: string, filter?: string, include?: string, callback?: (error:any, data?:DeviceLogPage, response?: superagent.Response) => any): superagent.SuperAgentRequest {

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

        return this.request({
            url: '/v3/devicelog/',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * &lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;Retrieve device log.&lt;/p&gt;
     * @param deviceLogId 
     */
    deviceLogRetrieve (deviceLogId: string, callback?: (error:any, data?:DeviceLogData, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "deviceLogId" is set
        if (deviceLogId === null || deviceLogId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'deviceLogId' missing when calling 'deviceLogRetrieve'."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request({
            url: '/v3/devicelog/{device_log_id}/'.replace('{' + 'device_log_id' + '}', String(deviceLogId)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * &lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;Update device fields&lt;/p&gt;
     * @param id The ID of the device
     * @param device 
     */
    devicePartialUpdate (id: string, device: DeviceDataRequest, callback?: (error:any, data?:DeviceData, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'id' missing when calling 'devicePartialUpdate'."));
            }
            return;
        }
        // verify required parameter "device" is set
        if (device === null || device === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'device' missing when calling 'devicePartialUpdate'."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request({
            url: '/v3/devices/{id}/'.replace('{' + 'id' + '}', String(id)),
            method: 'PATCH',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: device,
        }, callback);
    }
    /** 
     * &lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;Retrieve device.&lt;/p&gt;
     * @param id 
     */
    deviceRetrieve (id: string, callback?: (error:any, data?:DeviceData, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'id' missing when calling 'deviceRetrieve'."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request({
            url: '/v3/devices/{id}/'.replace('{' + 'id' + '}', String(id)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * &lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;Update device.&lt;/p&gt;
     * @param id The ID of the device
     * @param device 
     */
    deviceUpdate (id: string, device: DeviceDataRequest, callback?: (error:any, data?:DeviceData, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'id' missing when calling 'deviceUpdate'."));
            }
            return;
        }
        // verify required parameter "device" is set
        if (device === null || device === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'device' missing when calling 'deviceUpdate'."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request({
            url: '/v3/devices/{id}/'.replace('{' + 'id' + '}', String(id)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: device,
        }, callback);
    }
}

