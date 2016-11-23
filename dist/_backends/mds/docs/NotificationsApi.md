# MbedCloudConnectRestApi.NotificationsApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**v2NotificationCallbackPut**](NotificationsApi.md#v2NotificationCallbackPut) | **PUT** /v2/notification/callback | Register a callback URL
[**v2NotificationPullGet**](NotificationsApi.md#v2NotificationPullGet) | **GET** /v2/notification/pull | Get notifications using Long Poll


<a name="v2NotificationCallbackPut"></a>
# **v2NotificationCallbackPut**
> v2NotificationCallbackPut(webhook)

Register a callback URL

Register a URL to which the server should deliver notifications of the subscribed resource changes. To get notifications pushed you need to also place the subscriptions.  Notifications are delivered as PUT messages to the HTTP server defined by the client with a subscription server message.  The given URL should be accessible and respond to the PUT request with response code of 200 or 204. mbed Cloud Connect  tests the callback URL with empty payload when the URL is registered. For more information on callback notification, see  NotificationData.  **Note**: Only one callback URL per access-key can be active. If you register a new URL  when another one is already active, the old URL is replaced by the new. 

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.NotificationsApi();

var webhook = new MbedCloudConnectRestApi.Webhook(); // Webhook | A json object that contains the URL to which notifications need to  be sent, and the optional headers. 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.v2NotificationCallbackPut(webhook, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webhook** | [**Webhook**](Webhook.md)| A json object that contains the URL to which notifications need to  be sent, and the optional headers.  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="v2NotificationPullGet"></a>
# **v2NotificationPullGet**
> NotificationMessage v2NotificationPullGet()

Get notifications using Long Poll

In this case, notifications are delivered through HTTP long-poll requests. The HTTP request is kept open  until an event notification or a batch of event notifications are delivered to the client or the request times out  (response code 204). In both cases, the client should open a new polling connection after the previous one closes.  You must have a persistent connection (Connection keep-alive header in the request) to avoid excess  TLS handshakes.  **Note:** If it is not possible to have a public facing callback URL, for example when developing on your local machine,  you can use long polling to check for new messages. However, to reduce network traffic and to increase performance  we recommend that you use callback URLs (webhooks) whenever possible. 

### Example
```javascript
var MbedCloudConnectRestApi = require('mbed_cloud_connect_rest_api');
var defaultClient = MbedCloudConnectRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new MbedCloudConnectRestApi.NotificationsApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v2NotificationPullGet(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**NotificationMessage**](NotificationMessage.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

