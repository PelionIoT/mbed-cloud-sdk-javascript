# DeviceCatalogApi.DefaultApi

All URIs are relative to *http://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deviceCreate**](DefaultApi.md#deviceCreate) | **POST** /v3/devices/ | Create device
[**deviceDestroy**](DefaultApi.md#deviceDestroy) | **DELETE** /v3/devices/{device_id}/ | Delete device
[**deviceList**](DefaultApi.md#deviceList) | **GET** /v3/devices/ | List all update devices
[**deviceLogCreate**](DefaultApi.md#deviceLogCreate) | **POST** /v3/devicelog/ | The APIs for creating and manipulating devices
[**deviceLogDestroy**](DefaultApi.md#deviceLogDestroy) | **DELETE** /v3/devicelog/{device_log_id}/ | The APIs for creating and manipulating devices
[**deviceLogList**](DefaultApi.md#deviceLogList) | **GET** /v3/devicelog/ | List all device logs
[**deviceLogPartialUpdate**](DefaultApi.md#deviceLogPartialUpdate) | **PATCH** /v3/devicelog/{device_log_id}/ | The APIs for creating and manipulating devices
[**deviceLogRetrieve**](DefaultApi.md#deviceLogRetrieve) | **GET** /v3/devicelog/{device_log_id}/ | Retrieve device log
[**deviceLogUpdate**](DefaultApi.md#deviceLogUpdate) | **PUT** /v3/devicelog/{device_log_id}/ | The APIs for creating and manipulating devices
[**devicePartialUpdate**](DefaultApi.md#devicePartialUpdate) | **PATCH** /v3/devices/{device_id}/ | Update device fields
[**deviceRetrieve**](DefaultApi.md#deviceRetrieve) | **GET** /v3/devices/{device_id}/ | Retrieve device
[**deviceUpdate**](DefaultApi.md#deviceUpdate) | **PUT** /v3/devices/{device_id}/ | Update device


<a name="deviceCreate"></a>
# **deviceCreate**
> DeviceSerializer deviceCreate()

Create device

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

Delete device

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
> [DeviceSerializer] deviceList(opts)

List all update devices

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
  'createdAt': "createdAt_example", // String | 
  'updatedAt': "updatedAt_example", // String | 
  'autoUpdate': "autoUpdate_example", // String | 
  'bootstrappedTimestamp': "bootstrappedTimestamp_example", // String | 
  'deployedState': "deployedState_example", // String | 
  'deployment': "deployment_example", // String | 
  'description': "description_example", // String | 
  'deviceClass': "deviceClass_example", // String | 
  'deviceId': "deviceId_example", // String | 
  'etag': "etag_example", // String | 
  'manifest': "manifest_example", // String | 
  'mechanism': "mechanism_example", // String | 
  'mechanismUrl': "mechanismUrl_example", // String | 
  'name': "name_example", // String | 
  '_object': "_object_example", // String | 
  'provisionKey': "provisionKey_example", // String | 
  'serialNumber': "serialNumber_example", // String | 
  'state': "state_example", // String | 
  'trustClass': "trustClass_example", // String | 
  'trustLevel': "trustLevel_example", // String | 
  'vendorId': "vendorId_example" // String | 
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
 **createdAt** | **String**|  | [optional] 
 **updatedAt** | **String**|  | [optional] 
 **autoUpdate** | **String**|  | [optional] 
 **bootstrappedTimestamp** | **String**|  | [optional] 
 **deployedState** | **String**|  | [optional] 
 **deployment** | **String**|  | [optional] 
 **description** | **String**|  | [optional] 
 **deviceClass** | **String**|  | [optional] 
 **deviceId** | **String**|  | [optional] 
 **etag** | **String**|  | [optional] 
 **manifest** | **String**|  | [optional] 
 **mechanism** | **String**|  | [optional] 
 **mechanismUrl** | **String**|  | [optional] 
 **name** | **String**|  | [optional] 
 **_object** | **String**|  | [optional] 
 **provisionKey** | **String**|  | [optional] 
 **serialNumber** | **String**|  | [optional] 
 **state** | **String**|  | [optional] 
 **trustClass** | **String**|  | [optional] 
 **trustLevel** | **String**|  | [optional] 
 **vendorId** | **String**|  | [optional] 

### Return type

[**[DeviceSerializer]**](DeviceSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceLogCreate"></a>
# **deviceLogCreate**
> DeviceLogSerializer deviceLogCreate(dateTime, opts)

The APIs for creating and manipulating devices

&lt;p&gt;The APIs for creating and manipulating devices.&lt;/p&gt;

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

var dateTime = new Date("2013-10-20T19:20:30+01:00"); // Date | 

var opts = { 
  'deviceLogId': "deviceLogId_example", // String | 
  'eventType': "eventType_example", // String | 
  'stateChange': true, // Boolean | 
  'dateTime2': "dateTime_example", // String | 
  'deviceId': "deviceId_example", // String | 
  'deviceLogId2': "deviceLogId_example", // String | 
  'eventType2': "eventType_example", // String | 
  'stateChange2': "stateChange_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceLogCreate(dateTime, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dateTime** | **Date**|  | 
 **deviceLogId** | **String**|  | [optional] 
 **eventType** | **String**|  | [optional] 
 **stateChange** | **Boolean**|  | [optional] 
 **dateTime2** | **String**|  | [optional] 
 **deviceId** | **String**|  | [optional] 
 **deviceLogId2** | **String**|  | [optional] 
 **eventType2** | **String**|  | [optional] 
 **stateChange2** | **String**|  | [optional] 

### Return type

[**DeviceLogSerializer**](DeviceLogSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceLogDestroy"></a>
# **deviceLogDestroy**
> DeviceLogSerializer deviceLogDestroy(deviceLogId, opts)

The APIs for creating and manipulating devices

&lt;p&gt;The APIs for creating and manipulating devices.&lt;/p&gt;

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

var opts = { 
  'dateTime': "dateTime_example", // String | 
  'deviceId': "deviceId_example", // String | 
  'deviceLogId2': "deviceLogId_example", // String | 
  'eventType': "eventType_example", // String | 
  'stateChange': "stateChange_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceLogDestroy(deviceLogId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deviceLogId** | **String**|  | 
 **dateTime** | **String**|  | [optional] 
 **deviceId** | **String**|  | [optional] 
 **deviceLogId2** | **String**|  | [optional] 
 **eventType** | **String**|  | [optional] 
 **stateChange** | **String**|  | [optional] 

### Return type

[**DeviceLogSerializer**](DeviceLogSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceLogList"></a>
# **deviceLogList**
> [DeviceLogSerializer] deviceLogList(opts)

List all device logs

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
  'dateTime': "dateTime_example", // String | 
  'deviceId': "deviceId_example", // String | 
  'deviceLogId': "deviceLogId_example", // String | 
  'eventType': "eventType_example", // String | 
  'stateChange': "stateChange_example" // String | 
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
 **dateTime** | **String**|  | [optional] 
 **deviceId** | **String**|  | [optional] 
 **deviceLogId** | **String**|  | [optional] 
 **eventType** | **String**|  | [optional] 
 **stateChange** | **String**|  | [optional] 

### Return type

[**[DeviceLogSerializer]**](DeviceLogSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="deviceLogPartialUpdate"></a>
# **deviceLogPartialUpdate**
> DeviceLogSerializer deviceLogPartialUpdate(deviceLogId, opts)

The APIs for creating and manipulating devices

&lt;p&gt;The APIs for creating and manipulating devices.&lt;/p&gt;

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

var opts = { 
  'dateTime': new Date("2013-10-20T19:20:30+01:00"), // Date | 
  'deviceLogId2': "deviceLogId_example", // String | 
  'eventType': "eventType_example", // String | 
  'stateChange': true, // Boolean | 
  'dateTime2': "dateTime_example", // String | 
  'deviceId': "deviceId_example", // String | 
  'deviceLogId3': "deviceLogId_example", // String | 
  'eventType2': "eventType_example", // String | 
  'stateChange2': "stateChange_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceLogPartialUpdate(deviceLogId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deviceLogId** | **String**|  | 
 **dateTime** | **Date**|  | [optional] 
 **deviceLogId2** | **String**|  | [optional] 
 **eventType** | **String**|  | [optional] 
 **stateChange** | **Boolean**|  | [optional] 
 **dateTime2** | **String**|  | [optional] 
 **deviceId** | **String**|  | [optional] 
 **deviceLogId3** | **String**|  | [optional] 
 **eventType2** | **String**|  | [optional] 
 **stateChange2** | **String**|  | [optional] 

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

Retrieve device log

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

<a name="deviceLogUpdate"></a>
# **deviceLogUpdate**
> DeviceLogSerializer deviceLogUpdate(deviceLogId, dateTime, opts)

The APIs for creating and manipulating devices

&lt;p&gt;The APIs for creating and manipulating devices.&lt;/p&gt;

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

var dateTime = new Date("2013-10-20T19:20:30+01:00"); // Date | 

var opts = { 
  'deviceLogId2': "deviceLogId_example", // String | 
  'eventType': "eventType_example", // String | 
  'stateChange': true, // Boolean | 
  'dateTime2': "dateTime_example", // String | 
  'deviceId': "deviceId_example", // String | 
  'deviceLogId3': "deviceLogId_example", // String | 
  'eventType2': "eventType_example", // String | 
  'stateChange2': "stateChange_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deviceLogUpdate(deviceLogId, dateTime, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deviceLogId** | **String**|  | 
 **dateTime** | **Date**|  | 
 **deviceLogId2** | **String**|  | [optional] 
 **eventType** | **String**|  | [optional] 
 **stateChange** | **Boolean**|  | [optional] 
 **dateTime2** | **String**|  | [optional] 
 **deviceId** | **String**|  | [optional] 
 **deviceLogId3** | **String**|  | [optional] 
 **eventType2** | **String**|  | [optional] 
 **stateChange2** | **String**|  | [optional] 

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

Update device fields

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

Retrieve device

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

Update device

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

