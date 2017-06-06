// ===============================================
// This file is autogenerated - Please do not edit
// Tracks base typescript-fetch mustache 01/02/17
// ===============================================
/**
 * Connect-Synchronizer REST API
 * Connect-Synchronizer REST API simplyfies async requests for Service Portal, hiding the async behaviour and making those look like synchronous. 
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

/**
 * ResourcesApi
 */
export class ResourcesApi extends ApiBase {

    /** 
     * Delete a resource
     * A request to delete a resource must be handled by both mbed Client and mbed Device Connector. The resource is not deleted from mbed Device Connector until the delete is handled by mbed Client.  All resource APIs are asynchronous. Note that these APIs respond only if the device is turned on and connected to mbed Device Connector. 
     * @param endpointName A unique identifier for the endpoint. Note that the endpoint-name must be an exact match. You cannot use wildcards here. 
     * @param resourcePath Resource&#39;s url. 
     * @param noResp ** Non-confirmable requests **  All resource APIs have the parameter noResp. If you make a request with noResp&#x3D;true, mbed Device Connector makes a CoAP non-confirmable request to the device. Such requests are not guaranteed to arrive in the device, and you do not get back an async-response-id.  If calls with this parameter enabled succeed, they return with the status code 204 No Content. If the underlying protocol does not support non-confirmable requests, or if the endpoint is registered in queue mode, the response is status code 409 Conflict. 
     * @param pri Priority message. Adds traffic-class for outgoing IPv6 message (only UDP). Network should this header and  Accepted values are AF11, AF12, AF13, AF21, AF22, AF23, AF31, AF32, AF33, AF41, AF42, AF43, VA, EF, CS0, CS1, CS2,CS3, CS4, CS5, CS6, CS7 and DF. Numeric values 0-7 are interpreted as matching to the corresponding CS value. Optional. Default: 0 
     */
    v3DevicesDeviceIdCachedResourcesResourcePathDelete (endpointName: string, resourcePath: string, noResp?: boolean, pri?: string, callback?: (error:any, data?:any, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "endpointName" is set
        if (endpointName === null || endpointName === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'endpointName' missing."));
            }
            return;
        }
        // verify required parameter "resourcePath" is set
        if (resourcePath === null || resourcePath === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'resourcePath' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};
        if (noResp !== undefined) {
            queryParameters['noResp'] = noResp;
        }
        if (pri !== undefined) {
            queryParameters['pri'] = pri;
        }

        let useFormData = false;
        let formParams: any = {};

        return this.request({
            url: '/v3/devices/{deviceId}/cached-resources/{resourcePath}'.replace('{' + 'endpointName' + '}', String(endpointName)).replace('{' + 'resourcePath' + '}', String(resourcePath)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * Read from a resource
     * Requests the resource value and when the response is available, a json object with the resource value will be returned.  Note that these APIs will only respond if the device is turned on and connected to mbed Device Connector. 
     * @param endpointName Unique identifier for the endpoint. Note that the endpoint name needs to be an exact match. You cannot use wildcards here.
     * @param resourcePath Resource&#39;s url.
     * @param cacheOnly Decides if the response comes only from the cache or from the device. Default value is false.
     * @param pri Priority message. Adds traffic-class for outgoing IPv6 message (only UDP). Network should this header and  Accepted values are AF11, AF12, AF13, AF21, AF22, AF23, AF31, AF32, AF33, AF41, AF42, AF43, VA, EF, CS0, CS1, CS2,CS3, CS4, CS5, CS6, CS7 and DF. Numeric values [0 - 7 ] are interpreted as matching to the corresponding CS value. This is an optional field. 
     */
    v3DevicesDeviceIdCachedResourcesResourcePathGet (endpointName: string, resourcePath: string, cacheOnly?: boolean, pri?: string, callback?: (error:any, data?:any, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "endpointName" is set
        if (endpointName === null || endpointName === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'endpointName' missing."));
            }
            return;
        }
        // verify required parameter "resourcePath" is set
        if (resourcePath === null || resourcePath === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'resourcePath' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};
        if (cacheOnly !== undefined) {
            queryParameters['cacheOnly'] = cacheOnly;
        }
        if (pri !== undefined) {
            queryParameters['pri'] = pri;
        }

        let useFormData = false;
        let formParams: any = {};

        return this.request({
            url: '/v3/devices/{deviceId}/cached-resources/{resourcePath}'.replace('{' + 'endpointName' + '}', String(endpointName)).replace('{' + 'resourcePath' + '}', String(resourcePath)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * Execute a function on a resource
     * With this API, you can execute a function on an existing resource.  All resource APIs are asynchronous. Note that these APIs respond only if the device is turned on and connected to mbed Device Connector. 
     * @param endpointName A unique identifier for the endpoint. Note that the endpoint-name must be an exact match. You cannot use wildcards here. 
     * @param resourcePath Resource&#39;s url.
     * @param resourceFunction This value is not needed. Most of the time resources do not accept a function but they have their own functions predefined. You can use this to trigger them.  If a function is included, the body of this request is passed as a char* to the function in mbed Client. 
     * @param noResp **Non-confirmable requests**  All resource APIs have the parameter noResp. If you make a request with noResp&#x3D;true,mbed Device Connector makes a CoAP non-confirmable request to the device. Such requests are not guaranteed to arrive in the device, and you do not get back an async-response-id.  If calls with this parameter enabled succeed, they return with the status code 204 No Content. If the underlying protocol does not support non-confirmable requests, or if the endpoint is registered in queue mode, the response is status code 409 Conflict. 
     * @param pri Priority message. Adds traffic-class for outgoing IPv6 message (only UDP). Network should this header and  Accepted values are AF11, AF12, AF13, AF21, AF22, AF23, AF31, AF32, AF33, AF41, AF42, AF43, VA, EF, CS0, CS1, CS2,CS3, CS4, CS5, CS6, CS7 and DF. Numeric values 0-7 are interpreted as matching to the corresponding CS value. Optional. Default: 0 
     */
    v3DevicesDeviceIdCachedResourcesResourcePathPost (endpointName: string, resourcePath: string, resourceFunction?: string, noResp?: boolean, pri?: string, callback?: (error:any, data?:any, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "endpointName" is set
        if (endpointName === null || endpointName === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'endpointName' missing."));
            }
            return;
        }
        // verify required parameter "resourcePath" is set
        if (resourcePath === null || resourcePath === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'resourcePath' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};
        if (noResp !== undefined) {
            queryParameters['noResp'] = noResp;
        }
        if (pri !== undefined) {
            queryParameters['pri'] = pri;
        }

        let useFormData = false;
        let formParams: any = {};

        return this.request({
            url: '/v3/devices/{deviceId}/cached-resources/{resourcePath}'.replace('{' + 'endpointName' + '}', String(endpointName)).replace('{' + 'resourcePath' + '}', String(resourcePath)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: resourceFunction,
        }, callback);
    }
    /** 
     * Write to a resource
     * With this API, you can write new values to existing resources, or create new resources on the device. The resource-path does not have to exist - it can be created by the call.  Note that these APIs respond only if the device is turned on and connected to mbed Device Connector.  Also note that query parameters defined in OMA specification such as step/lt/ gt/pmax/ pmin can also be included with relvant values and will be passed to the device as they are defined. 
     * @param endpointName A unique identifier for the endpoint. Note that the endpoint name must be an exact match. You cannot use wildcards here.
     * @param resourcePath Resource&#39;s url.
     * @param resourceValue Value to be set to the resource. (Check accceptable content-types)
     * @param pri Priority message. Adds traffic-class for outgoing IPv6 message (only UDP). Network should this header and  Accepted values are AF11, AF12, AF13, AF21, AF22, AF23, AF31, AF32, AF33, AF41, AF42, AF43, VA, EF, CS0, CS1, CS2,CS3, CS4, CS5, CS6, CS7 and DF. Numeric values 0-7 are interpreted as matching to the corresponding CS value. Optional. Default: 0 
     */
    v3DevicesDeviceIdCachedResourcesResourcePathPut (endpointName: string, resourcePath: string, resourceValue: string, pri?: string, callback?: (error:any, data?:any, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "endpointName" is set
        if (endpointName === null || endpointName === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'endpointName' missing."));
            }
            return;
        }
        // verify required parameter "resourcePath" is set
        if (resourcePath === null || resourcePath === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'resourcePath' missing."));
            }
            return;
        }
        // verify required parameter "resourceValue" is set
        if (resourceValue === null || resourceValue === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'resourceValue' missing."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};
        if (pri !== undefined) {
            queryParameters['pri'] = pri;
        }

        let useFormData = false;
        let formParams: any = {};

        return this.request({
            url: '/v3/devices/{deviceId}/cached-resources/{resourcePath}'.replace('{' + 'endpointName' + '}', String(endpointName)).replace('{' + 'resourcePath' + '}', String(resourcePath)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: resourceValue,
        }, callback);
    }
}

