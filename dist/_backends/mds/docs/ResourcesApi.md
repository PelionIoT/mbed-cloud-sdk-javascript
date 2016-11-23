# MbedCloudConnectRestApi.ResourcesApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**v2EndpointsEndpointNameResourcePathDelete**](ResourcesApi.md#v2EndpointsEndpointNameResourcePathDelete) | **DELETE** /v2/endpoints/{endpointName}/{resourcePath} | Delete a resource
[**v2EndpointsEndpointNameResourcePathGet**](ResourcesApi.md#v2EndpointsEndpointNameResourcePathGet) | **GET** /v2/endpoints/{endpointName}/{resourcePath} | Read from a resource
[**v2EndpointsEndpointNameResourcePathPost**](ResourcesApi.md#v2EndpointsEndpointNameResourcePathPost) | **POST** /v2/endpoints/{endpointName}/{resourcePath} | Execute a function on a resource
[**v2EndpointsEndpointNameResourcePathPut**](ResourcesApi.md#v2EndpointsEndpointNameResourcePathPut) | **PUT** /v2/endpoints/{endpointName}/{resourcePath} | Write to a resource


<a name="v2EndpointsEndpointNameResourcePathDelete"></a>
# **v2EndpointsEndpointNameResourcePathDelete**
> AsyncID v2EndpointsEndpointNameResourcePathDelete(endpointName, resourcePath, opts)

Delete a resource

A request to delete a resource must be handled by both mbed Cloud Client and mbed Cloud Connect. The resource is not deleted from mbed Cloud Connect until the delete  is handled by mbed Cloud Client.  All resource APIs are asynchronous. Note that these APIs respond only if the device is turned on and connected to mbed Cloud Connect. 

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.ResourcesApi();

var endpointName = "endpointName_example"; // String | A unique identifier for the endpoint. Note that the endpoint-name must be an exact match. You cannot use wildcards here. 

var resourcePath = "resourcePath_example"; // String | Resource's url. 

var opts = { 
  'noResp': true // Boolean | **Non-confirmable requests**   All resource APIs have the parameter noResp. If you make a request with noResp=true, mbed Cloud Connect makes a CoAP non-confirmable request to the device.  Such requests are not guaranteed to arrive in the device, and you do not get back an async-response-id.  If calls with this parameter enabled succeed, they return with the status code  204 No Content. If the underlying protocol does not support non-confirmable requests,  or if the endpoint is registered in queue mode, the response is status code 409 Conflict. 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v2EndpointsEndpointNameResourcePathDelete(endpointName, resourcePath, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **endpointName** | **String**| A unique identifier for the endpoint. Note that the endpoint-name must be an exact match. You cannot use wildcards here.  | 
 **resourcePath** | **String**| Resource&#39;s url.  | 
 **noResp** | **Boolean**| **Non-confirmable requests**   All resource APIs have the parameter noResp. If you make a request with noResp&#x3D;true, mbed Cloud Connect makes a CoAP non-confirmable request to the device.  Such requests are not guaranteed to arrive in the device, and you do not get back an async-response-id.  If calls with this parameter enabled succeed, they return with the status code  204 No Content. If the underlying protocol does not support non-confirmable requests,  or if the endpoint is registered in queue mode, the response is status code 409 Conflict.  | [optional] 

### Return type

[**AsyncID**](AsyncID.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="v2EndpointsEndpointNameResourcePathGet"></a>
# **v2EndpointsEndpointNameResourcePathGet**
> AsyncID v2EndpointsEndpointNameResourcePathGet(endpointName, resourcePath, opts)

Read from a resource

Requests the resource value and when the response is available, a json AsycResponse  object (AsyncIDResponse object) is received in the notification channel. Note that you can also  receive notifications when a resource changes. The preferred way to get resource values is to use subscribe  and callback methods.  All resource APIs are asynchronous. Note that these APIs will only respond  if the device is turned on and connected to mbed Cloud Connect. 

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.ResourcesApi();

var endpointName = "endpointName_example"; // String | Unique identifier for the endpoint. Note that the endpoint name needs to be an exact match. You cannot use wildcards here. 

var resourcePath = "resourcePath_example"; // String | Resource's url. 

var opts = { 
  'cacheOnly': true, // Boolean | If true, the response comes only from the cache. Default: false. 
  'noResp': true // Boolean | **Non-confirmable requests**   All resource APIs have the parameter noResp. If a request is made with noResp=true, mbed Cloud Connect makes a CoAP non-confirmable request to the device.  Such requests are not guaranteed to arrive in the device,  and you do not get back an async-response-id.  If calls with this parameter enabled succeed, they return with the status code  204 No Content. If the underlying protocol does not support non-confirmable requests,  or if the endpoint is registered in queue mode, the response is status code 409 Conflict. 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v2EndpointsEndpointNameResourcePathGet(endpointName, resourcePath, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **endpointName** | **String**| Unique identifier for the endpoint. Note that the endpoint name needs to be an exact match. You cannot use wildcards here.  | 
 **resourcePath** | **String**| Resource&#39;s url.  | 
 **cacheOnly** | **Boolean**| If true, the response comes only from the cache. Default: false.  | [optional] 
 **noResp** | **Boolean**| **Non-confirmable requests**   All resource APIs have the parameter noResp. If a request is made with noResp&#x3D;true, mbed Cloud Connect makes a CoAP non-confirmable request to the device.  Such requests are not guaranteed to arrive in the device,  and you do not get back an async-response-id.  If calls with this parameter enabled succeed, they return with the status code  204 No Content. If the underlying protocol does not support non-confirmable requests,  or if the endpoint is registered in queue mode, the response is status code 409 Conflict.  | [optional] 

### Return type

[**AsyncID**](AsyncID.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="v2EndpointsEndpointNameResourcePathPost"></a>
# **v2EndpointsEndpointNameResourcePathPost**
> AsyncID v2EndpointsEndpointNameResourcePathPost(endpointName, resourcePath, opts)

Execute a function on a resource

With this API, you can execute a function on an existing resource.  All resource APIs are asynchronous. Note that these APIs respond only if the device is turned on and connected to mbed Cloud Connect. 

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.ResourcesApi();

var endpointName = "endpointName_example"; // String | A unique identifier for the endpoint. Note that the endpoint-name must be an exact match. You cannot use wildcards here. 

var resourcePath = "resourcePath_example"; // String | Resource's url.

var opts = { 
  'resourceFunction': "resourceFunction_example", // String | This value is not needed. Most of the time resources do not accept a function but they have their own functions predefined. You can use this to trigger them.  If a function is included, the body of this request is passed as a char* to the function in mbed Cloud Client. 
  'noResp': true // Boolean | **Non-confirmable requests**  All resource APIs have the parameter noResp. If you make a request with noResp=true, mbed Cloud Connect makes a CoAP non-confirmable request to the device.  Such requests are not guaranteed to arrive in the device,  and you do not get back an async-response-id.  If calls with this parameter enabled succeed, they return with the status code  204 No Content. If the underlying protocol does not support non-confirmable requests,  or if the endpoint is registered in queue mode, the response is status code 409 Conflict. 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v2EndpointsEndpointNameResourcePathPost(endpointName, resourcePath, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **endpointName** | **String**| A unique identifier for the endpoint. Note that the endpoint-name must be an exact match. You cannot use wildcards here.  | 
 **resourcePath** | **String**| Resource&#39;s url. | 
 **resourceFunction** | **String**| This value is not needed. Most of the time resources do not accept a function but they have their own functions predefined. You can use this to trigger them.  If a function is included, the body of this request is passed as a char* to the function in mbed Cloud Client.  | [optional] 
 **noResp** | **Boolean**| **Non-confirmable requests**  All resource APIs have the parameter noResp. If you make a request with noResp&#x3D;true, mbed Cloud Connect makes a CoAP non-confirmable request to the device.  Such requests are not guaranteed to arrive in the device,  and you do not get back an async-response-id.  If calls with this parameter enabled succeed, they return with the status code  204 No Content. If the underlying protocol does not support non-confirmable requests,  or if the endpoint is registered in queue mode, the response is status code 409 Conflict.  | [optional] 

### Return type

[**AsyncID**](AsyncID.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: text/plain, application/xml, application/octet-stream, application/exi, application/json, application/link-format, application/senml+json, application/nanoservice-tlv, application/vnd.oma.lwm2m+text, application/vnd.oma.lwm2m+opaq, application/vnd.oma.lwm2m+tlv, application/vnd.oma.lwm2m+json
 - **Accept**: application/json

<a name="v2EndpointsEndpointNameResourcePathPut"></a>
# **v2EndpointsEndpointNameResourcePathPut**
> AsyncID v2EndpointsEndpointNameResourcePathPut(endpointName, resourcePath, resourceValue, opts)

Write to a resource

With this API, you can write new values to existing resources, or create new  resources on the device. The resource-path does not have to exist - it can be  created by the call.  All resource APIs are asynchronous. Note that these APIs respond only if the device is turned on and connected to mbed Cloud Connect. 

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.ResourcesApi();

var endpointName = "endpointName_example"; // String | A unique identifier for the endpoint. Note that the endpoint name must be an exact match. You cannot use wildcards here. 

var resourcePath = "resourcePath_example"; // String | Resource's url.

var resourceValue = "resourceValue_example"; // String | Value to be set to the resource. (Check accceptable content-types) 

var opts = { 
  'noResp': true // Boolean | **Non-confirmable requests**   All resource APIs have the parameter noResp. If you make a request with noResp=true, mbed Cloud Connect makes a CoAP non-confirmable request to the device.  Such requests are not guaranteed to arrive in the device,  and you do not get back an async-response-id.  If calls with this parameter enabled succeed, they return with the status code  204 No Content. If the underlying protocol does not support non-confirmable requests,  or if the endpoint is registered in queue mode, the response is status code 409 Conflict. 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v2EndpointsEndpointNameResourcePathPut(endpointName, resourcePath, resourceValue, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **endpointName** | **String**| A unique identifier for the endpoint. Note that the endpoint name must be an exact match. You cannot use wildcards here.  | 
 **resourcePath** | **String**| Resource&#39;s url. | 
 **resourceValue** | **String**| Value to be set to the resource. (Check accceptable content-types)  | 
 **noResp** | **Boolean**| **Non-confirmable requests**   All resource APIs have the parameter noResp. If you make a request with noResp&#x3D;true, mbed Cloud Connect makes a CoAP non-confirmable request to the device.  Such requests are not guaranteed to arrive in the device,  and you do not get back an async-response-id.  If calls with this parameter enabled succeed, they return with the status code  204 No Content. If the underlying protocol does not support non-confirmable requests,  or if the endpoint is registered in queue mode, the response is status code 409 Conflict.  | [optional] 

### Return type

[**AsyncID**](AsyncID.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: text/plain, application/xml, application/octet-stream, application/exi, application/json, application/link-format, application/senml+json, application/nanoservice-tlv, application/vnd.oma.lwm2m+text, application/vnd.oma.lwm2m+opaq, application/vnd.oma.lwm2m+tlv, application/vnd.oma.lwm2m+json
 - **Accept**: application/json

