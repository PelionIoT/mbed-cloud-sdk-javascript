# MbedCloudConnectRestApi.EndpointsApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**v2EndpointsEndpointNameGet**](EndpointsApi.md#v2EndpointsEndpointNameGet) | **GET** /v2/endpoints/{endpointName} | List the resources on an endpoint
[**v2EndpointsGet**](EndpointsApi.md#v2EndpointsGet) | **GET** /v2/endpoints | List all endpoints


<a name="v2EndpointsEndpointNameGet"></a>
# **v2EndpointsEndpointNameGet**
> [Resource] v2EndpointsEndpointNameGet(endpointName)

List the resources on an endpoint

The list of resources is cached by mbed Cloud Connect, so this call does not create a message to the device. 

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.EndpointsApi();

var endpointName = "endpointName_example"; // String | A unique identifier for an endpoint. Note that the endpoint name needs to be an exact match. You cannot use wildcards here. 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v2EndpointsEndpointNameGet(endpointName, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **endpointName** | **String**| A unique identifier for an endpoint. Note that the endpoint name needs to be an exact match. You cannot use wildcards here.  | 

### Return type

[**[Resource]**](Resource.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/link-format

<a name="v2EndpointsGet"></a>
# **v2EndpointsGet**
> [Endpoint] v2EndpointsGet(opts)

List all endpoints

Endpoints are physical devices running mbed Cloud Client. 

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.EndpointsApi();

var opts = { 
  'type': "type_example" // String | Filter endpoints by endpoint-type.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v2EndpointsGet(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type** | **String**| Filter endpoints by endpoint-type. | [optional] 

### Return type

[**[Endpoint]**](Endpoint.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/link-format

