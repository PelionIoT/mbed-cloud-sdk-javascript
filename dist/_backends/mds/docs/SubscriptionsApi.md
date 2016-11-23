# MbedCloudConnectRestApi.SubscriptionsApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**v2SubscriptionsDelete**](SubscriptionsApi.md#v2SubscriptionsDelete) | **DELETE** /v2/subscriptions | Remove all subscriptions
[**v2SubscriptionsEndpointNameDelete**](SubscriptionsApi.md#v2SubscriptionsEndpointNameDelete) | **DELETE** /v2/subscriptions/{endpointName} | Delete subscriptions from an endpoint
[**v2SubscriptionsEndpointNameGet**](SubscriptionsApi.md#v2SubscriptionsEndpointNameGet) | **GET** /v2/subscriptions/{endpointName} | Read endpoints subscriptions
[**v2SubscriptionsEndpointNameResourcePathDelete**](SubscriptionsApi.md#v2SubscriptionsEndpointNameResourcePathDelete) | **DELETE** /v2/subscriptions/{endpointName}/{resourcePath} | Remove a subscription
[**v2SubscriptionsEndpointNameResourcePathGet**](SubscriptionsApi.md#v2SubscriptionsEndpointNameResourcePathGet) | **GET** /v2/subscriptions/{endpointName}/{resourcePath} | Read subscription status
[**v2SubscriptionsEndpointNameResourcePathPut**](SubscriptionsApi.md#v2SubscriptionsEndpointNameResourcePathPut) | **PUT** /v2/subscriptions/{endpointName}/{resourcePath} | Subscribe to a resource path
[**v2SubscriptionsGet**](SubscriptionsApi.md#v2SubscriptionsGet) | **GET** /v2/subscriptions | Get pre-subscriptions
[**v2SubscriptionsPut**](SubscriptionsApi.md#v2SubscriptionsPut) | **PUT** /v2/subscriptions | Set pre-subscriptions


<a name="v2SubscriptionsDelete"></a>
# **v2SubscriptionsDelete**
> v2SubscriptionsDelete()

Remove all subscriptions

Removes subscriptions from every endpoint and resource. Note that this does not remove pre-subscriptions.

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.SubscriptionsApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.v2SubscriptionsDelete(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="v2SubscriptionsEndpointNameDelete"></a>
# **v2SubscriptionsEndpointNameDelete**
> v2SubscriptionsEndpointNameDelete(endpointName)

Delete subscriptions from an endpoint

Deletes all resource subscriptions in a single endpoint.

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.SubscriptionsApi();

var endpointName = "endpointName_example"; // String | A unique identifier for the endpoint. Note that the endpoint name must be an exact match.  You cannot use wildcards here. 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.v2SubscriptionsEndpointNameDelete(endpointName, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **endpointName** | **String**| A unique identifier for the endpoint. Note that the endpoint name must be an exact match.  You cannot use wildcards here.  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="v2SubscriptionsEndpointNameGet"></a>
# **v2SubscriptionsEndpointNameGet**
> v2SubscriptionsEndpointNameGet(endpointName)

Read endpoints subscriptions

Lists all subscribed resources from a single endpoint.

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.SubscriptionsApi();

var endpointName = "endpointName_example"; // String | A unique identifier for the endpoint. Note that endpoint name must be an exact match. You cannot use wildcards here. 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.v2SubscriptionsEndpointNameGet(endpointName, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **endpointName** | **String**| A unique identifier for the endpoint. Note that endpoint name must be an exact match. You cannot use wildcards here.  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/uri-list

<a name="v2SubscriptionsEndpointNameResourcePathDelete"></a>
# **v2SubscriptionsEndpointNameResourcePathDelete**
> v2SubscriptionsEndpointNameResourcePathDelete(endpointName, resourcePath)

Remove a subscription

To remove an existing subscription from a resource path. 

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.SubscriptionsApi();

var endpointName = "endpointName_example"; // String | A unique identifier for the endpoint. Note that the endpoint name must be an exact match. You cannot use wildcards here. 

var resourcePath = "resourcePath_example"; // String | Resource's url. 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.v2SubscriptionsEndpointNameResourcePathDelete(endpointName, resourcePath, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **endpointName** | **String**| A unique identifier for the endpoint. Note that the endpoint name must be an exact match. You cannot use wildcards here.  | 
 **resourcePath** | **String**| Resource&#39;s url.  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="v2SubscriptionsEndpointNameResourcePathGet"></a>
# **v2SubscriptionsEndpointNameResourcePathGet**
> v2SubscriptionsEndpointNameResourcePathGet(endpointName, resourcePath)

Read subscription status

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.SubscriptionsApi();

var endpointName = "endpointName_example"; // String | A unique identifier for the endpoint. Note that the endpoint name must be an exact match. You cannot use wildcards here. 

var resourcePath = "resourcePath_example"; // String | Resource's url. 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.v2SubscriptionsEndpointNameResourcePathGet(endpointName, resourcePath, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **endpointName** | **String**| A unique identifier for the endpoint. Note that the endpoint name must be an exact match. You cannot use wildcards here.  | 
 **resourcePath** | **String**| Resource&#39;s url.  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="v2SubscriptionsEndpointNameResourcePathPut"></a>
# **v2SubscriptionsEndpointNameResourcePathPut**
> v2SubscriptionsEndpointNameResourcePathPut(endpointName, resourcePath)

Subscribe to a resource path

The mbed Cloud Connect eventing model consists of observable resources.  This means that endpoints can deliver updated resource content, periodically or with a more sophisticated  solution-dependent logic. The OMA LWM2M resource model including objects, object instances,  resources and resource instances is also supported.  Applications can subscribe to objects, object instances or individual resources to make the device  to provide value change notifications to mbed Cloud Connect service. An application needs to call a /notification/callback method to get mbed Cloud Connect to push a notification of the resource changes.  You can also use /subscriptions to set a pre-subscription. 

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.SubscriptionsApi();

var endpointName = "endpointName_example"; // String | A unique identifier for the endpoint. Note that the endpoint name must be an exact match. You cannot use wildcards here. 

var resourcePath = "resourcePath_example"; // String | Resource's URL. 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.v2SubscriptionsEndpointNameResourcePathPut(endpointName, resourcePath, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **endpointName** | **String**| A unique identifier for the endpoint. Note that the endpoint name must be an exact match. You cannot use wildcards here.  | 
 **resourcePath** | **String**| Resource&#39;s URL.  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="v2SubscriptionsGet"></a>
# **v2SubscriptionsGet**
> v2SubscriptionsGet()

Get pre-subscriptions

You can retrieve the pre-subscription data by using a GET operation. The server returns with the same JSON structure  as described above. If there are no pre-subscribed resources, it returns with an empty array. 

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.SubscriptionsApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.v2SubscriptionsGet(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="v2SubscriptionsPut"></a>
# **v2SubscriptionsPut**
> v2SubscriptionsPut(presubsription)

Set pre-subscriptions

Pre-subscription is a set of rules and patterns put by the application. When an endpoint registers  and its name, type and registered resources match the pre-subscription data, mbed Cloud Connect sends  subscription requests to the device automatically. The pattern may include the endpoint name  (optionally having an \\* character at the end), endpoint type, a list of resources or expressions  with an \\* character at the end. The pre-subscription concerns all the endpoints that are already  registered and the server sends subscription requests to the devices immediately when the patterns are set.  There is only one pre-subscribe array, so changing the pre-subscription data removes all the previous subscriptions.  To remove the pre-subscription data, put an empty array as a rule. 

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.SubscriptionsApi();

var presubsription = new MbedCloudConnectRestApi.PresubscriptionArray(); // PresubscriptionArray | Array of pre-subscriptions.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.v2SubscriptionsPut(presubsription, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **presubsription** | [**PresubscriptionArray**](PresubscriptionArray.md)| Array of pre-subscriptions. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: text/plain

