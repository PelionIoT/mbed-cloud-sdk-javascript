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
> DeviceListResp deviceCreate(mechanism, provisionKey, opts)



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

var mechanism = "mechanism_example"; // String | The ID of the channel used to communicate with the device

var provisionKey = "provisionKey_example"; // String | The key used to provision the device

var opts = { 
  'accountId': "accountId_example", // String | The owning IAM account ID
  'autoUpdate': true, // Boolean | Mark this device for auto firmware update
  'bootstrappedTimestamp': "bootstrappedTimestamp_example", // String | 
  'createdAt': new Date("2013-10-20T19:20:30+01:00"), // Date | 
  'customAttributes': "customAttributes_example", // String | Up to 5 custom JSON attributes
  'deployedState': "deployedState_example", // String | The state of the device's deployment
  'deployment': "deployment_example", // String | The last deployment used on the device
  'description': "description_example", // String | The description of the object
  'deviceClass': "deviceClass_example", // String | 
  'deviceId': "deviceId_example", // String | DEPRECATED: The ID of the device
  'etag': new Date("2013-10-20T19:20:30+01:00"), // Date | The entity instance signature
  'id': "id_example", // String | The ID of the device
  'manifest': "manifest_example", // String | URL for the current device manifest
  'mechanismUrl': "mechanismUrl_example", // String | The address of the connector to use
  'name': "name_example", // String | The name of the object
  '_object': "_object_example", // String | The API resource entity
  'serialNumber': "serialNumber_example", // String | The serial number of the device
  'state': "state_example", // String | The current state of the device
  'trustClass': 789, // Integer | The device trust class
  'trustLevel': 789, // Integer | The device trust level
  'updatedAt': new Date("2013-10-20T19:20:30+01:00"), // Date | The time the object was updated
  'vendorId': "vendorId_example" // String | The device vendor ID
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceCreate(mechanism, provisionKey, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **mechanism** | **String**| The ID of the channel used to communicate with the device | 
 **provisionKey** | **String**| The key used to provision the device | 
 **accountId** | **String**| The owning IAM account ID | [optional] 
 **autoUpdate** | **Boolean**| Mark this device for auto firmware update | [optional] 
 **bootstrappedTimestamp** | **String**|  | [optional] 
 **createdAt** | **Date**|  | [optional] 
 **customAttributes** | **String**| Up to 5 custom JSON attributes | [optional] 
 **deployedState** | **String**| The state of the device&#39;s deployment | [optional] 
 **deployment** | **String**| The last deployment used on the device | [optional] 
 **description** | **String**| The description of the object | [optional] 
 **deviceClass** | **String**|  | [optional] 
 **deviceId** | **String**| DEPRECATED: The ID of the device | [optional] 
 **etag** | **Date**| The entity instance signature | [optional] 
 **id** | **String**| The ID of the device | [optional] 
 **manifest** | **String**| URL for the current device manifest | [optional] 
 **mechanismUrl** | **String**| The address of the connector to use | [optional] 
 **name** | **String**| The name of the object | [optional] 
 **_object** | **String**| The API resource entity | [optional] 
 **serialNumber** | **String**| The serial number of the device | [optional] 
 **state** | **String**| The current state of the device | [optional] 
 **trustClass** | **Integer**| The device trust class | [optional] 
 **trustLevel** | **Integer**| The device trust level | [optional] 
 **updatedAt** | **Date**| The time the object was updated | [optional] 
 **vendorId** | **String**| The device vendor ID | [optional] 

### Return type

[**DeviceListResp**](DeviceListResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: Not defined

<a name="deviceDestroy"></a>
# **deviceDestroy**
> DeviceListResp deviceDestroy(deviceId)



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

[**DeviceListResp**](DeviceListResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceList"></a>
# **deviceList**
> DeviceListResp deviceList(opts)



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
  'limit': 56, // Integer | 
  'order': "order_example", // String | 
  'after': "after_example", // String | 
  'filter': "filter_example", // String | 
  'include': "include_example" // String | 
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
 **limit** | **Integer**|  | [optional] 
 **order** | **String**|  | [optional] 
 **after** | **String**|  | [optional] 
 **filter** | **String**|  | [optional] 
 **include** | **String**|  | [optional] 

### Return type

[**DeviceListResp**](DeviceListResp.md)

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
  'limit': 56, // Integer | 
  'order': "order_example", // String | 
  'after': "after_example", // String | 
  'filter': "filter_example", // String | 
  'include': "include_example" // String | 
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
 **limit** | **Integer**|  | [optional] 
 **order** | **String**|  | [optional] 
 **after** | **String**|  | [optional] 
 **filter** | **String**|  | [optional] 
 **include** | **String**|  | [optional] 

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
> DeviceListResp devicePartialUpdate(deviceId)



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

[**DeviceListResp**](DeviceListResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceRetrieve"></a>
# **deviceRetrieve**
> DeviceListResp deviceRetrieve(deviceId)



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

[**DeviceListResp**](DeviceListResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceUpdate"></a>
# **deviceUpdate**
> DeviceListResp deviceUpdate(deviceId)



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

[**DeviceListResp**](DeviceListResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

