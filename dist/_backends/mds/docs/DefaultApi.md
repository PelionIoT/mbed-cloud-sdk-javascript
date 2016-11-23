# MbedCloudConnectRestApi.DefaultApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**v2NotificationCallbackDelete**](DefaultApi.md#v2NotificationCallbackDelete) | **DELETE** /v2/notification/callback | Delete callback URL
[**v2NotificationCallbackGet**](DefaultApi.md#v2NotificationCallbackGet) | **GET** /v2/notification/callback | Check callback URL


<a name="v2NotificationCallbackDelete"></a>
# **v2NotificationCallbackDelete**
> v2NotificationCallbackDelete()

Delete callback URL

Deletes the callback URL.

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.v2NotificationCallbackDelete(callback);
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

<a name="v2NotificationCallbackGet"></a>
# **v2NotificationCallbackGet**
> v2NotificationCallbackGet()

Check callback URL

Shows the current callback URL if exists.

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.v2NotificationCallbackGet(callback);
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

