# DeviceQueryServiceApi.DefaultApi

All URIs are relative to *http://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deviceQueryCreate**](DefaultApi.md#deviceQueryCreate) | **POST** /v3/device-queries/ | 
[**deviceQueryDestroy**](DefaultApi.md#deviceQueryDestroy) | **DELETE** /v3/device-queries/{query_id}/ | 
[**deviceQueryList**](DefaultApi.md#deviceQueryList) | **GET** /v3/device-queries/ | 
[**deviceQueryPartialUpdate**](DefaultApi.md#deviceQueryPartialUpdate) | **PATCH** /v3/device-queries/{query_id}/ | 
[**deviceQueryRetrieve**](DefaultApi.md#deviceQueryRetrieve) | **GET** /v3/device-queries/{query_id}/ | 
[**deviceQueryUpdate**](DefaultApi.md#deviceQueryUpdate) | **PUT** /v3/device-queries/{query_id}/ | 


<a name="deviceQueryCreate"></a>
# **deviceQueryCreate**
> DeviceQueryDetail deviceQueryCreate(name, query, opts)



&lt;p&gt;The APIs for creating and manipulating device queries.  &lt;/p&gt; &lt;p&gt;Create device query&lt;/p&gt;

### Example
```javascript
var DeviceQueryServiceApi = require('device_query_service_api');
var defaultClient = DeviceQueryServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceQueryServiceApi.DefaultApi();

var name = "name_example"; // String | The name of the query

var query = "query_example"; // String | The device query

var opts = { 
  'description': "description_example", // String | The description of the object
  '_object': "_object_example", // String | The API resource entity
  'queryId': "queryId_example" // String | DEPRECATED: The ID of the query
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceQueryCreate(name, query, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| The name of the query | 
 **query** | **String**| The device query | 
 **description** | **String**| The description of the object | [optional] 
 **_object** | **String**| The API resource entity | [optional] 
 **queryId** | **String**| DEPRECATED: The ID of the query | [optional] 

### Return type

[**DeviceQueryDetail**](DeviceQueryDetail.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceQueryDestroy"></a>
# **deviceQueryDestroy**
> DeviceQueryDetail deviceQueryDestroy(queryId)



&lt;p&gt;The APIs for creating and manipulating device queries.  &lt;/p&gt; &lt;p&gt;Delete device query&lt;/p&gt;

### Example
```javascript
var DeviceQueryServiceApi = require('device_query_service_api');
var defaultClient = DeviceQueryServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceQueryServiceApi.DefaultApi();

var queryId = "queryId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceQueryDestroy(queryId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **queryId** | **String**|  | 

### Return type

[**DeviceQueryDetail**](DeviceQueryDetail.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceQueryList"></a>
# **deviceQueryList**
> DeviceQueryResp deviceQueryList(opts)



&lt;p&gt;The APIs for creating and manipulating device queries.  &lt;/p&gt; &lt;p&gt;List all device queries. The result will be paged into pages of 100.&lt;/p&gt;

### Example
```javascript
var DeviceQueryServiceApi = require('device_query_service_api');
var defaultClient = DeviceQueryServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceQueryServiceApi.DefaultApi();

var opts = { 
  'description': "description_example", // String | 
  'createdAt': "createdAt_example", // String | 
  'updatedAt': "updatedAt_example", // String | 
  'etag': "etag_example", // String | 
  'name': "name_example", // String | 
  '_object': "_object_example", // String | 
  'query': "query_example", // String | 
  'queryId': "queryId_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceQueryList(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **description** | **String**|  | [optional] 
 **createdAt** | **String**|  | [optional] 
 **updatedAt** | **String**|  | [optional] 
 **etag** | **String**|  | [optional] 
 **name** | **String**|  | [optional] 
 **_object** | **String**|  | [optional] 
 **query** | **String**|  | [optional] 
 **queryId** | **String**|  | [optional] 

### Return type

[**DeviceQueryResp**](DeviceQueryResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceQueryPartialUpdate"></a>
# **deviceQueryPartialUpdate**
> DeviceQueryDetail deviceQueryPartialUpdate(queryId, opts)



&lt;p&gt;The APIs for creating and manipulating device queries.  &lt;/p&gt; &lt;p&gt;Update device query fields&lt;/p&gt;

### Example
```javascript
var DeviceQueryServiceApi = require('device_query_service_api');
var defaultClient = DeviceQueryServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceQueryServiceApi.DefaultApi();

var queryId = "queryId_example"; // String | 

var opts = { 
  'description': "description_example", // String | The description of the object
  'name': "name_example", // String | The name of the query
  '_object': "_object_example", // String | The API resource entity
  'query': "query_example", // String | The device query
  'queryId2': "queryId_example" // String | DEPRECATED: The ID of the query
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceQueryPartialUpdate(queryId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **queryId** | **String**|  | 
 **description** | **String**| The description of the object | [optional] 
 **name** | **String**| The name of the query | [optional] 
 **_object** | **String**| The API resource entity | [optional] 
 **query** | **String**| The device query | [optional] 
 **queryId2** | **String**| DEPRECATED: The ID of the query | [optional] 

### Return type

[**DeviceQueryDetail**](DeviceQueryDetail.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceQueryRetrieve"></a>
# **deviceQueryRetrieve**
> DeviceQueryDetail deviceQueryRetrieve(queryId)



&lt;p&gt;The APIs for creating and manipulating device queries.  &lt;/p&gt; &lt;p&gt;Retrieve device query.&lt;/p&gt;

### Example
```javascript
var DeviceQueryServiceApi = require('device_query_service_api');
var defaultClient = DeviceQueryServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceQueryServiceApi.DefaultApi();

var queryId = "queryId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceQueryRetrieve(queryId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **queryId** | **String**|  | 

### Return type

[**DeviceQueryDetail**](DeviceQueryDetail.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceQueryUpdate"></a>
# **deviceQueryUpdate**
> DeviceQueryDetail deviceQueryUpdate(queryId, name, query, opts)



&lt;p&gt;The APIs for creating and manipulating device queries.  &lt;/p&gt; &lt;p&gt;Update device query.&lt;/p&gt;

### Example
```javascript
var DeviceQueryServiceApi = require('device_query_service_api');
var defaultClient = DeviceQueryServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceQueryServiceApi.DefaultApi();

var queryId = "queryId_example"; // String | 

var name = "name_example"; // String | The name of the query

var query = "query_example"; // String | The device query

var opts = { 
  'description': "description_example", // String | The description of the object
  '_object': "_object_example", // String | The API resource entity
  'queryId2': "queryId_example" // String | DEPRECATED: The ID of the query
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceQueryUpdate(queryId, name, query, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **queryId** | **String**|  | 
 **name** | **String**| The name of the query | 
 **query** | **String**| The device query | 
 **description** | **String**| The description of the object | [optional] 
 **_object** | **String**| The API resource entity | [optional] 
 **queryId2** | **String**| DEPRECATED: The ID of the query | [optional] 

### Return type

[**DeviceQueryDetail**](DeviceQueryDetail.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

