# DeviceCatalogApi.DefaultApi

All URIs are relative to *http://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deviceCreate**](DefaultApi.md#deviceCreate) | **POST** /v3/devices/ | 
[**deviceDestroy**](DefaultApi.md#deviceDestroy) | **DELETE** /v3/devices/{device_id}/ | 
[**deviceList**](DefaultApi.md#deviceList) | **GET** /v3/devices/ | 
[**deviceLogList**](DefaultApi.md#deviceLogList) | **GET** /v3/devicelog/ | 
[**deviceLogRetrieve**](DefaultApi.md#deviceLogRetrieve) | **GET** /v3/devicelog/{device_log_id}/ | 
[**devicePartialUpdate**](DefaultApi.md#devicePartialUpdate) | **PATCH** /v3/devices/{device_id}/ | 
[**deviceRetrieve**](DefaultApi.md#deviceRetrieve) | **GET** /v3/devices/{device_id}/ | 
[**deviceUpdate**](DefaultApi.md#deviceUpdate) | **PUT** /v3/devices/{device_id}/ | 


<a name="deviceCreate"></a>
# **deviceCreate**
> DeviceSerializer deviceCreate()



&lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;Create device&lt;/p&gt;

### Example
```javascript
var DeviceCatalogApi = require('device_catalog_api');
var defaultClient = DeviceCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceCatalogApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceCreate(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**DeviceSerializer**](DeviceSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceDestroy"></a>
# **deviceDestroy**
> DeviceSerializer deviceDestroy(deviceId)



&lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;Delete device&lt;/p&gt;

### Example
```javascript
var DeviceCatalogApi = require('device_catalog_api');
var defaultClient = DeviceCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceCatalogApi.DefaultApi();

var deviceId = "deviceId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceDestroy(deviceId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deviceId** | **String**|  | 

### Return type

[**DeviceSerializer**](DeviceSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceList"></a>
# **deviceList**
> DeviceSerializer deviceList(opts)



&lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;List all update devices. The result is paged into pages of 100.&lt;/p&gt;

### Example
```javascript
var DeviceCatalogApi = require('device_catalog_api');
var defaultClient = DeviceCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceCatalogApi.DefaultApi();

var opts = { 
  '_object': "_object_example", // String | 
  'limit': 56, // Integer | 
  'hasMore': true, // Boolean | 
  'data': ["data_example"], // [String] | 
  'order': "order_example", // String | 
  'after': "after_example", // String | 
  'totalCount': 56 // Integer | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceList(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_object** | **String**|  | [optional] 
 **limit** | **Integer**|  | [optional] 
 **hasMore** | **Boolean**|  | [optional] 
 **data** | [**[String]**](String.md)|  | [optional] 
 **order** | **String**|  | [optional] 
 **after** | **String**|  | [optional] 
 **totalCount** | **Integer**|  | [optional] 

### Return type

[**DeviceSerializer**](DeviceSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceLogList"></a>
# **deviceLogList**
> DeviceLogSerializer deviceLogList(opts)



&lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;List all device logs.&lt;/p&gt;

### Example
```javascript
var DeviceCatalogApi = require('device_catalog_api');
var defaultClient = DeviceCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceCatalogApi.DefaultApi();

var opts = { 
  '_object': "_object_example", // String | 
  'limit': 56, // Integer | 
  'hasMore': true, // Boolean | 
  'data': ["data_example"], // [String] | 
  'order': "order_example", // String | 
  'after': "after_example", // String | 
  'totalCount': 56 // Integer | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceLogList(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_object** | **String**|  | [optional] 
 **limit** | **Integer**|  | [optional] 
 **hasMore** | **Boolean**|  | [optional] 
 **data** | [**[String]**](String.md)|  | [optional] 
 **order** | **String**|  | [optional] 
 **after** | **String**|  | [optional] 
 **totalCount** | **Integer**|  | [optional] 

### Return type

[**DeviceLogSerializer**](DeviceLogSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceLogRetrieve"></a>
# **deviceLogRetrieve**
> DeviceLogSerializer deviceLogRetrieve(deviceLogId)



&lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;Retrieve device log.&lt;/p&gt;

### Example
```javascript
var DeviceCatalogApi = require('device_catalog_api');
var defaultClient = DeviceCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceCatalogApi.DefaultApi();

var deviceLogId = "deviceLogId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceLogRetrieve(deviceLogId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deviceLogId** | **String**|  | 

### Return type

[**DeviceLogSerializer**](DeviceLogSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="devicePartialUpdate"></a>
# **devicePartialUpdate**
> DeviceSerializer devicePartialUpdate(deviceId)



&lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;Update device fields&lt;/p&gt;

### Example
```javascript
var DeviceCatalogApi = require('device_catalog_api');
var defaultClient = DeviceCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceCatalogApi.DefaultApi();

var deviceId = "deviceId_example"; // String | The ID of the device


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.devicePartialUpdate(deviceId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deviceId** | **String**| The ID of the device | 

### Return type

[**DeviceSerializer**](DeviceSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceRetrieve"></a>
# **deviceRetrieve**
> DeviceSerializer deviceRetrieve(deviceId)



&lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;Retrieve device.&lt;/p&gt;

### Example
```javascript
var DeviceCatalogApi = require('device_catalog_api');
var defaultClient = DeviceCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceCatalogApi.DefaultApi();

var deviceId = "deviceId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceRetrieve(deviceId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deviceId** | **String**|  | 

### Return type

[**DeviceSerializer**](DeviceSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceUpdate"></a>
# **deviceUpdate**
> DeviceSerializer deviceUpdate(deviceId)



&lt;p&gt;The APIs for creating and manipulating devices.  &lt;/p&gt; &lt;p&gt;Update device.&lt;/p&gt;

### Example
```javascript
var DeviceCatalogApi = require('device_catalog_api');
var defaultClient = DeviceCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeviceCatalogApi.DefaultApi();

var deviceId = "deviceId_example"; // String | The ID of the device


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceUpdate(deviceId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deviceId** | **String**| The ID of the device | 

### Return type

[**DeviceSerializer**](DeviceSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

