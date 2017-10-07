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
     * Delete callback URL
     * Deletes the callback URL.  **Example usage:**      curl -X DELETE https://api.us-east-1.mbedcloud.com/v2/notification/callback -H &#39;authorization: Bearer {api-key}&#39;
     */
    DefaultApi.prototype.v2NotificationCallbackDelete = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/notification/callback",
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Check callback URL
     * Shows the current callback URL if it exists.  **Example usage:**      curl -X GET https://api.us-east-1.mbedcloud.com/v2/notification/callback -H &#39;authorization: Bearer {api-key}&#39;
     */
    DefaultApi.prototype.v2NotificationCallbackGet = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/notification/callback",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    return DefaultApi;
}(apiBase_1.ApiBase));
exports.DefaultApi = DefaultApi;
/**
 * EndpointsApi
 */
var EndpointsApi = /** @class */ (function (_super) {
    __extends(EndpointsApi, _super);
    function EndpointsApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * List the resources on an endpoint
     * The list of resources is cached by mbed Cloud Connect, so this call does not create a message to the device.  **Example usage:**      curl -X GET https://api.us-east-1.mbedcloud.com/v2/endpoints/{device-id} -H &#39;authorization: Bearer {api-key}&#39;
     * @param deviceId A unique mbed Cloud device ID for an endpoint. Note that the ID needs to be an exact match. You cannot use wildcards here.
     */
    EndpointsApi.prototype.v2EndpointsDeviceIdGet = function (deviceId, callback) {
        // verify required parameter "deviceId" is set
        if (deviceId === null || deviceId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'deviceId' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/endpoints/{device-id}".replace("{" + "device-id" + "}", String(deviceId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * (DEPRECATED) List registered endpoints. The number of returned endpoints is currently limited to 200.
     * Endpoints are physical devices having valid registration to mbed Cloud Connect. All devices regardless of registration status can be requested from Device Directory API [&#39;/v3/devices/&#x60;](/docs/v1.2/api-references/device-directory-api.html#v3-devices).  **Note:** This endpoint is deprecated and will be removed 1Q/18. You should use the Device Directory API [&#x60;/v3/devices/&#x60;](/docs/v1.2/api-references/device-directory-api.html#v3-devices). To list only the registered devices, use filter &#x60;/v3/devices/?filter&#x3D;state%3Dregistered&#x60;.  **Example usage:**      curl -X GET https://api.us-east-1.mbedcloud.com/v2/endpoints -H &#39;authorization: Bearer {api-key}&#39;
     * @param type Filter endpoints by endpoint-type.
     */
    EndpointsApi.prototype.v2EndpointsGet = function (type, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (type !== undefined) {
            queryParameters["type"] = type;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/endpoints",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    return EndpointsApi;
}(apiBase_1.ApiBase));
exports.EndpointsApi = EndpointsApi;
/**
 * NotificationsApi
 */
var NotificationsApi = /** @class */ (function (_super) {
    __extends(NotificationsApi, _super);
    function NotificationsApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Register a callback URL
     * Register a URL to which the server should deliver notifications of the subscribed resource changes. To get notifications pushed you need to also place the subscriptions.  The maximum length of URL, header keys and values, all combined, is 400 characters.  Notifications are delivered as PUT messages to the HTTP server defined by the client with a subscription server message.  The given URL should be accessible and respond to the PUT request with response code of 200 or 204. mbed Cloud Connect  tests the callback URL with an empty payload when the URL is registered. For more information on callback notification, see [NotificationMessage](/docs/v1.2/api-references/connect-api.html#notificationmessage).  **Optional headers in a callback message:**  You can set optional headers to a callback in a [Webhook](v1.2/api-references/connect-api.html#v2-notification-callback) object. The Mbed Cloud Connect will include the header and key pairs to the notification messages send to callback URL. As the callback URL&#39;s are API key specific also the headers are.   One possible use for the additional headers is to check the origin of a PUT request and also distinguish the application (API key) to which the notification belongs to.  **Note**: Only one callback URL per an API key can be active. If you register a new URL while another one is already active,  it replaces the active one. There can be only one notification channel at a time. If the Long Poll notification is already present  you need to delete it before setting the callback URL.  **Expiration of a callback URL:**   A callback can expire when mbed DS cannot deliver a notification due to a connection timeout or  error response (4xx or 5xx). After each delivery failure, mbed DS sets an exponential back off time and makes a retry attempt  after that. The first retry delay is 1 second, then 2s, 4s, 8s, ..., 2min, 2min. The maximum retry delay is 2 minutes.  The callback URL will be removed if all retries fail withing 24 hours. More about [notification sending logic](/docs/v1.2/device-dev/developer-guide-to-mbed-cloud-connect.html#notification-sending-logic).  **Example usage:**  This example command shows how to set your callback URL and API key. It also sets an optional header authorization. When Mbed Cloud Connect calls your callback URL, the call contains the authorization header with the defined value.          curl -X PUT \\       https://api.us-east-1.mbedcloud.com/v2/notification/callback \\       -H &#39;authorization: Bearer {api-key}&#39; \\       -H &#39;content-type: application/json&#39; \\       -d &#39;{       \&quot;url\&quot;: \&quot;{callback-url}\&quot;,       \&quot;headers\&quot;: {\&quot;authorization\&quot; : \&quot;f4b93d6e-4652-4874-82e4-41a3ced0cd56\&quot;}       }&#39;
     * @param webhook A json object that contains the optional headers and the URL to which the notifications need to be sent.
     */
    NotificationsApi.prototype.v2NotificationCallbackPut = function (webhook, callback) {
        // verify required parameter "webhook" is set
        if (webhook === null || webhook === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'webhook' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/notification/callback",
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: webhook,
        }, callback);
    };
    /**
     * Delete notification Long Poll channel
     * To delete a notification Long Poll channel. This is required to change the channel from Long Poll to a callback.  **Example usage:**      curl -X DELETE https://api.us-east-1.mbedcloud.com/v2/notification/pull -H &#39;authorization: Bearer {api-key}&#39;
     */
    NotificationsApi.prototype.v2NotificationPullDelete = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/notification/pull",
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get notifications using Long Poll
     * In this case, notifications are delivered through HTTP long poll requests. The HTTP request is kept open until an event notification or a batch of event notifications are delivered to the client or the request times out  (response code 204). In both cases, the client should open a new polling connection after the previous one closes. Only a single long polling connection per API key can be ongoing at any given time. You must have a persistent connection (Connection keep-alive header in the request) to avoid excess  TLS handshakes.  **Note:** If it is not possible to have a public facing callback URL, for example when developing on your local machine, you can use long polling to check for new messages. However, long polling is deprecated and will likely be replaced in future. It is meant only for experimentation and not for commercial usage. The proper method to receive notifications is via [Notification Callback](/docs/v1.2/api-references/connect-api.html#v2-notification-callback). Only a single notification channel per API key can exist in mbed Cloud Connect at a time. If a callback notification channel already exists, you need to delete it before creating a long poll notification channel, and vice-versa.  **Example usage:**      curl -X GET https://api.us-east-1.mbedcloud.com/v2/notification/pull -H &#39;authorization: Bearer {api-key}&#39;
     */
    NotificationsApi.prototype.v2NotificationPullGet = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/notification/pull",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    return NotificationsApi;
}(apiBase_1.ApiBase));
exports.NotificationsApi = NotificationsApi;
/**
 * ResourcesApi
 */
var ResourcesApi = /** @class */ (function (_super) {
    __extends(ResourcesApi, _super);
    function ResourcesApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Delete a resource
     * A request to delete a resource must be handled by both mbed Cloud Client and mbed Cloud Connect. The resource is not deleted from mbed Cloud Connect until the request is handled by mbed Cloud Client.  All resource APIs are asynchronous. These APIs respond only if the device is turned on and connected to mbed Cloud Connect and there is an active notification channel.  **Example usage:**      curl -X DELETE \\       https://api.us-east-1.mbedcloud.com/v2/endpoints/{device-id}/{resourcePath} \\       -H &#39;authorization: Bearer {api-key}&#39;
     * @param deviceId A unique mbed Cloud device ID for the endpoint. Note that the ID must be an exact match. You cannot use wildcards here.
     * @param resourcePath The URL of the resource.
     * @param noResp **Non-confirmable requests**  All resource APIs have the parameter noResp. If you make a request with &#x60;noResp&#x3D;true&#x60;, mbed Cloud Connect makes a CoAP non-confirmable request to the device. Such requests are not guaranteed to arrive in the device, and you do not get back an async-response-id.  If calls with this parameter enabled succeed, they return with the status code 204 No Content. If the underlying protocol does not support non-confirmable requests, or if the endpoint is registered in queue mode, the response is status code 409 Conflict.
     */
    ResourcesApi.prototype.v2EndpointsDeviceIdResourcePathDelete = function (deviceId, resourcePath, noResp, callback) {
        // verify required parameter "deviceId" is set
        if (deviceId === null || deviceId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'deviceId' missing."));
            }
            return;
        }
        // verify required parameter "resourcePath" is set
        if (resourcePath === null || resourcePath === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'resourcePath' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (noResp !== undefined) {
            queryParameters["noResp"] = noResp;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/endpoints/{device-id}/{resourcePath}".replace("{" + "device-id" + "}", String(deviceId)).replace("{" + "resourcePath" + "}", String(resourcePath)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Read from a resource
     * Requests the resource value and when the response is available, a json AsyncIDResponse object is received in the notification channel. The preferred way to get resource values is to use [subscribe](/docs/v1.2/api-references/connect-api.html#v2-subscriptions-device-id-resourcepath) and [callback](/docs/v1.2/api-references/connect-api.html#v2-notification-callback) methods.  All resource APIs are asynchronous. These APIs only respond if the device is turned on and connected to mbed Cloud Connect.  **Example usage:**      curl -X GET \\       https://api.us-east-1.mbedcloud.com/v2/endpoints/{device-id}/{resourcePath} \\       -H &#39;authorization: Bearer {api-key}&#39;
     * @param deviceId Unique mbed Cloud device ID for the endpoint. Note that the ID needs to be an exact match. You cannot use wildcards here.
     * @param resourcePath The URL of the resource.
     * @param cacheOnly If true, the response comes only from the cache. Default: false. mbed Cloud Connect caches the received resource values for the time of [max_age](/docs/v1.2/device-dev/connecting-devices-to-the-cloud-with-mbed-cloud-client.html#use-mbed-cloud-client-data-types) defined in the client side.
     * @param noResp **Non-confirmable requests**   All resource APIs have the parameter &#x60;noResp&#x60;. If a request is made with &#x60;noResp&#x3D;true&#x60;, mbed Cloud Connect makes a CoAP  non-confirmable request to the device. Such requests are not guaranteed to arrive in the device, and you do not get back  an async-response-id.  If calls with this parameter enabled succeed, they return with the status code 204 No Content. If the underlying protocol  does not support non-confirmable requests, or if the endpoint is registered in queue mode, the response is status code  409 Conflict.
     */
    ResourcesApi.prototype.v2EndpointsDeviceIdResourcePathGet = function (deviceId, resourcePath, cacheOnly, noResp, callback) {
        // verify required parameter "deviceId" is set
        if (deviceId === null || deviceId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'deviceId' missing."));
            }
            return;
        }
        // verify required parameter "resourcePath" is set
        if (resourcePath === null || resourcePath === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'resourcePath' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (cacheOnly !== undefined) {
            queryParameters["cacheOnly"] = cacheOnly;
        }
        if (noResp !== undefined) {
            queryParameters["noResp"] = noResp;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/endpoints/{device-id}/{resourcePath}".replace("{" + "device-id" + "}", String(deviceId)).replace("{" + "resourcePath" + "}", String(resourcePath)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Execute a function on a resource
     * With this API, you can execute a function on an existing resource.  All resource APIs are asynchronous. These APIs respond only if the device is turned on and connected to mbed Cloud Connect and there is an active notification channel.  **Example usage:** This example resets the min and max values of the [temperature sensor](http://www.openmobilealliance.org/tech/profiles/lwm2m/3303.xml) instance 0 by executing the Resource 5605 &#39;Reset Min and Max Measured Values&#39;.     curl -X POST \\       https://api.us-east-1.mbedcloud.com/v2/endpoints/{device-id}/3303/0/5605 \\       -H &#39;authorization: Bearer {api-key}&#39;
     * @param deviceId A unique mbed Cloud device ID for the endpoint. Note that the ID must be an exact match. You cannot use wildcards here.
     * @param resourcePath The URL of the resource.
     * @param resourceFunction This value is not needed. Most of the time resources do not accept a function but they have their own functions predefined. You can use this to trigger them.  If a function is included, the body of this request is passed as a char* to the function in mbed Cloud Client.
     * @param noResp **Non-confirmable requests**  All resource APIs have the parameter noResp. If you make a request with &#x60;noResp&#x3D;true&#x60;, mbed Cloud Connect makes a CoAP non-confirmable request to the device. Such requests are not guaranteed to arrive in the device, and you do not get back an async-response-id.  If calls with this parameter enabled succeed, they return with the status code 204 No Content. If the underlying protocol does not support non-confirmable requests, or if the endpoint is registered in queue mode, the response is status code 409 Conflict.
     */
    ResourcesApi.prototype.v2EndpointsDeviceIdResourcePathPost = function (deviceId, resourcePath, resourceFunction, noResp, callback) {
        // verify required parameter "deviceId" is set
        if (deviceId === null || deviceId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'deviceId' missing."));
            }
            return;
        }
        // verify required parameter "resourcePath" is set
        if (resourcePath === null || resourcePath === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'resourcePath' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (noResp !== undefined) {
            queryParameters["noResp"] = noResp;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/endpoints/{device-id}/{resourcePath}".replace("{" + "device-id" + "}", String(deviceId)).replace("{" + "resourcePath" + "}", String(resourcePath)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: resourceFunction,
        }, callback);
    };
    /**
     * Write to a resource
     * With this API, you can write new values to existing resources, or create new  resources on the device. The resource-path does not have to exist - it can be  created by the call. The maximum length of resource-path is 255 characters.  This API can also be used to transfer files to the device. mbed Cloud Connect LWM2M server implements the Option 1 from RFC7959. The maximum block size is 1024 bytes. The block size versus transferred file size is something to note in low quality networks. The customer application needs to know what type of file is transferred (for example txt) and the payload can be encrypted by the customer. The maximum size of payload is 1048576 bytes.  All resource APIs are asynchronous. These APIs respond only if the device is turned on and connected to mbed Cloud Connect and there is an active notification channel.  **Example usage:**  This example sets the alarm on a buzzer. The command writes the [Buzzer](http://www.openmobilealliance.org/tech/profiles/lwm2m/3338.xml) instance 0, \&quot;On/Off\&quot; boolean resource to &#39;1&#39;     curl -X PUT \\       https://api.us-east-1.mbedcloud.com/v2/endpoints/{device-id}/3338/0/5850 \\       -H &#39;authorization: Bearer {api-key}&#39; -d &#39;1&#39;
     * @param deviceId A unique mbed Cloud device ID for the endpoint. Note that the ID must be an exact match. You cannot use wildcards here.
     * @param resourcePath Resource URL.
     * @param resourceValue The value to be set to the resource.
     * @param noResp **Non-confirmable requests**  All resource APIs have the parameter noResp. If you make a request with &#x60;noResp&#x3D;true&#x60;, mbed Cloud Connect makes a CoAP non-confirmable request to the device. Such requests are not guaranteed to arrive in the device, and you do not get back an async-response-id.  If calls with this parameter enabled succeed, they return with the status code 204 No Content. If the underlying protocol does not support non-confirmable requests, or if the endpoint is registered in queue mode, the response is status code 409 Conflict.
     */
    ResourcesApi.prototype.v2EndpointsDeviceIdResourcePathPut = function (deviceId, resourcePath, resourceValue, noResp, callback) {
        // verify required parameter "deviceId" is set
        if (deviceId === null || deviceId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'deviceId' missing."));
            }
            return;
        }
        // verify required parameter "resourcePath" is set
        if (resourcePath === null || resourcePath === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'resourcePath' missing."));
            }
            return;
        }
        // verify required parameter "resourceValue" is set
        if (resourceValue === null || resourceValue === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'resourceValue' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (noResp !== undefined) {
            queryParameters["noResp"] = noResp;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/endpoints/{device-id}/{resourcePath}".replace("{" + "device-id" + "}", String(deviceId)).replace("{" + "resourcePath" + "}", String(resourcePath)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: resourceValue,
        }, callback);
    };
    return ResourcesApi;
}(apiBase_1.ApiBase));
exports.ResourcesApi = ResourcesApi;
/**
 * SubscriptionsApi
 */
var SubscriptionsApi = /** @class */ (function (_super) {
    __extends(SubscriptionsApi, _super);
    function SubscriptionsApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Remove all subscriptions
     * Removes subscriptions from every endpoint and resource. Note that this does not remove pre-subscriptions.  **Example usage:**      curl -X DELETE https://api.us-east-1.mbedcloud.com/v2/subscriptions -H &#39;authorization: Bearer {api-key}&#39;
     */
    SubscriptionsApi.prototype.v2SubscriptionsDelete = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/subscriptions",
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Delete subscriptions from an endpoint
     * Deletes all resource subscriptions in a single endpoint.  **Example usage:**      curl -X DELETE \\       https://api.us-east-1.mbedcloud.com/v2/subscriptions/{device-id} \\       -H &#39;authorization: Bearer {api-key}&#39;
     * @param deviceId A unique mbed Cloud device ID for the endpoint. Note that the ID must be an exact match. You cannot use wildcards here.
     */
    SubscriptionsApi.prototype.v2SubscriptionsDeviceIdDelete = function (deviceId, callback) {
        // verify required parameter "deviceId" is set
        if (deviceId === null || deviceId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'deviceId' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/subscriptions/{device-id}".replace("{" + "device-id" + "}", String(deviceId)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Read endpoints subscriptions
     * Lists all subscribed resources from a single endpoint.  **Example usage:**      curl -X GET \\       https://api.us-east-1.mbedcloud.com/v2/subscriptions/{device-id} \\       -H &#39;authorization: Bearer {api-key}&#39;
     * @param deviceId A unique mbed Cloud device ID for the endpoint. Note that ID must be an exact match. You cannot use wildcards here.
     */
    SubscriptionsApi.prototype.v2SubscriptionsDeviceIdGet = function (deviceId, callback) {
        // verify required parameter "deviceId" is set
        if (deviceId === null || deviceId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'deviceId' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/subscriptions/{device-id}".replace("{" + "device-id" + "}", String(deviceId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Remove a subscription
     * To remove an existing subscription from a resource path.  **Example usage:**      curl -X DELETE \\       https://api.us-east-1.mbedcloud.com/v2/subscriptions/{device-id}/{resourcePath} \\       -H &#39;authorization: Bearer {api-key}&#39;
     * @param deviceId A unique mbed Cloud device ID for the endpoint. Note that the ID must be an exact match. You cannot use wildcards here.
     * @param resourcePath The URL of the resource.
     */
    SubscriptionsApi.prototype.v2SubscriptionsDeviceIdResourcePathDelete = function (deviceId, resourcePath, callback) {
        // verify required parameter "deviceId" is set
        if (deviceId === null || deviceId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'deviceId' missing."));
            }
            return;
        }
        // verify required parameter "resourcePath" is set
        if (resourcePath === null || resourcePath === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'resourcePath' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/subscriptions/{device-id}/{resourcePath}".replace("{" + "device-id" + "}", String(deviceId)).replace("{" + "resourcePath" + "}", String(resourcePath)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Read subscription status
     * @param deviceId A unique mbed Cloud device ID for the endpoint. Note that the ID must be an exact match. You cannot use wildcards here.
     * @param resourcePath The URL of the resource.
     */
    SubscriptionsApi.prototype.v2SubscriptionsDeviceIdResourcePathGet = function (deviceId, resourcePath, callback) {
        // verify required parameter "deviceId" is set
        if (deviceId === null || deviceId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'deviceId' missing."));
            }
            return;
        }
        // verify required parameter "resourcePath" is set
        if (resourcePath === null || resourcePath === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'resourcePath' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/subscriptions/{device-id}/{resourcePath}".replace("{" + "device-id" + "}", String(deviceId)).replace("{" + "resourcePath" + "}", String(resourcePath)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Subscribe to a resource path
     * The mbed Cloud Connect eventing model consists of observable resources.  This means that endpoints can deliver updated resource content, periodically or with a more sophisticated  solution-dependent logic. The OMA LWM2M resource model including objects, object instances,  resources and resource instances is also supported.  Applications can subscribe to objects, object instances or individual resources to make the device  to provide value change notifications to mbed Cloud Connect service. An application needs to call a &#x60;/notification/callback&#x60; method to get mbed Cloud Connect to push notifications of the resource changes.  The manual subscriptions are removed during a full device registration and applications need to  re-subscribe at that point. To avoid this, you can use &#x60;/subscriptions&#x60; to set a pre-subscription.  **Example usage:**      curl -X PUT \\       https://api.us-east-1.mbedcloud.com/v2/subscriptions/{device-id}/{resourcePath} \\       -H &#39;authorization: Bearer {api-key}&#39;
     * @param deviceId A unique mbed Cloud device ID for the endpoint. Note that the ID must be an exact match. You cannot use wildcards here.
     * @param resourcePath The URL of the resource.
     */
    SubscriptionsApi.prototype.v2SubscriptionsDeviceIdResourcePathPut = function (deviceId, resourcePath, callback) {
        // verify required parameter "deviceId" is set
        if (deviceId === null || deviceId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'deviceId' missing."));
            }
            return;
        }
        // verify required parameter "resourcePath" is set
        if (resourcePath === null || resourcePath === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'resourcePath' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/subscriptions/{device-id}/{resourcePath}".replace("{" + "device-id" + "}", String(deviceId)).replace("{" + "resourcePath" + "}", String(resourcePath)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get pre-subscriptions
     * You can retrieve the pre-subscription data with the GET operation. The server returns with the same JSON structure  as described above. If there are no pre-subscribed resources, it returns with an empty array.  **Example usage:**      curl -X GET https://api.us-east-1.mbedcloud.com/v2/subscriptions -H &#39;authorization: Bearer {api-key}&#39;
     */
    SubscriptionsApi.prototype.v2SubscriptionsGet = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/subscriptions",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Set pre-subscriptions
     * Pre-subscription is a set of rules and patterns put by the application. When an endpoint registers  and its ID, type and registered resources match the pre-subscription data, mbed Cloud Connect sends  subscription requests to the device automatically. The pattern may include the endpoint ID  (optionally having an &#x60;*&#x60; character at the end), endpoint type, a list of resources or expressions with an &#x60;*&#x60; character at the end. Subscriptions based on pre-subscriptions are done when device registers or does register update. To remove the pre-subscription data, put an empty array as a rule.  **Limits**:  - The maximum length of the endpoint name and endpoint type is 64 characters. - The maximum length of the resource path is 128 characters. - You can listen to 256 separate resource paths. - The maximum number of pre-subscription entries is 1024.          **Example request:**  &#x60;&#x60;&#x60; curl -X PUT \\   https://api.us-east-1.mbedcloud.com/v2/subscriptions \\   -H &#39;authorization: Bearer {api-key}&#39; \\   -H &#39;content-type: application/json&#39; \\   -d &#39;[          {            \&quot;endpoint-name\&quot;: \&quot;node-001\&quot;,            \&quot;resource-path\&quot;: [\&quot;/dev\&quot;]          },          {            \&quot;endpoint-type\&quot;: \&quot;Light\&quot;,            \&quot;resource-path\&quot;: [\&quot;/sen/_*\&quot;]          },          {            \&quot;endpoint-name\&quot;: \&quot;node*\&quot;          },          {            \&quot;endpoint-type\&quot;: \&quot;Sensor\&quot;          },          {            \&quot;resource-path\&quot;: [\&quot;/dev/temp\&quot;,\&quot;/dev/hum\&quot;]          }       ]&#39; &#x60;&#x60;&#x60;
     * @param presubsription Array of pre-subscriptions.
     */
    SubscriptionsApi.prototype.v2SubscriptionsPut = function (presubsription, callback) {
        // verify required parameter "presubsription" is set
        if (presubsription === null || presubsription === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'presubsription' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: "/v2/subscriptions",
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: presubsription,
        }, callback);
    };
    return SubscriptionsApi;
}(apiBase_1.ApiBase));
exports.SubscriptionsApi = SubscriptionsApi;

//# sourceMappingURL=mds.js.map
