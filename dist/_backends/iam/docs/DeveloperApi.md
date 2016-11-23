# IamIdentitiesRestApi.DeveloperApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createApiKey**](DeveloperApi.md#createApiKey) | **POST** /v3/api-keys | Create a new API key.
[**deleteApiKey**](DeveloperApi.md#deleteApiKey) | **DELETE** /v3/api-keys/{apiKey} | Delete API key.
[**getAllApiKeys**](DeveloperApi.md#getAllApiKeys) | **GET** /v3/api-keys | Get all API keys
[**getAllGroups**](DeveloperApi.md#getAllGroups) | **GET** /v3/policy-groups | Get all group information.
[**getApiKey**](DeveloperApi.md#getApiKey) | **GET** /v3/api-keys/{apiKey} | Get API key details.
[**getMyAccountInfo**](DeveloperApi.md#getMyAccountInfo) | **GET** /v3/accounts/me | Get account info.
[**getMyUser**](DeveloperApi.md#getMyUser) | **GET** /v3/users/me | Details of the current user.
[**updateApiKey**](DeveloperApi.md#updateApiKey) | **PUT** /v3/api-keys/{apiKey} | Update API key details.
[**updateMyUser**](DeveloperApi.md#updateMyUser) | **PUT** /v3/users/me | Update user details.


<a name="createApiKey"></a>
# **createApiKey**
> ApiKeyInfoResp createApiKey(body)

Create a new API key.

Endpoint for creating the new API key.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DeveloperApi();

var body = new IamIdentitiesRestApi.ApiKeyInfoReq(); // ApiKeyInfoReq | The details of the API key to be created.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createApiKey(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ApiKeyInfoReq**](ApiKeyInfoReq.md)| The details of the API key to be created. | 

### Return type

[**ApiKeyInfoResp**](ApiKeyInfoResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteApiKey"></a>
# **deleteApiKey**
> deleteApiKey(apiKey)

Delete API key.

Endpoint for deleting the API key.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DeveloperApi();

var apiKey = "apiKey_example"; // String | The ID of the API key to be deleted.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteApiKey(apiKey, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **apiKey** | **String**| The ID of the API key to be deleted. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getAllApiKeys"></a>
# **getAllApiKeys**
> ApiKeyInfoRespList getAllApiKeys(opts)

Get all API keys

Endpoint for retrieving API keys in an array, optionally filtered by the owner.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DeveloperApi();

var opts = { 
  'owner': "owner_example" // String | Owner name filter.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getAllApiKeys(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **owner** | **String**| Owner name filter. | [optional] 

### Return type

[**ApiKeyInfoRespList**](ApiKeyInfoRespList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getAllGroups"></a>
# **getAllGroups**
> GroupSummaryList getAllGroups()

Get all group information.

Endpoint for retrieving all group information.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DeveloperApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getAllGroups(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**GroupSummaryList**](GroupSummaryList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getApiKey"></a>
# **getApiKey**
> ApiKeyInfoResp getApiKey(apiKey)

Get API key details.

Endpoint for retrieving API key details.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DeveloperApi();

var apiKey = "apiKey_example"; // String | The ID of the API key to be retrieved.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getApiKey(apiKey, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **apiKey** | **String**| The ID of the API key to be retrieved. | 

### Return type

[**ApiKeyInfoResp**](ApiKeyInfoResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getMyAccountInfo"></a>
# **getMyAccountInfo**
> AccountInfo getMyAccountInfo()

Get account info.

Returns detailed information about the account.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DeveloperApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getMyAccountInfo(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**AccountInfo**](AccountInfo.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getMyUser"></a>
# **getMyUser**
> UserInfoResp getMyUser()

Details of the current user.

Endpoint for retrieving the details of the logged in user.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DeveloperApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getMyUser(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**UserInfoResp**](UserInfoResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateApiKey"></a>
# **updateApiKey**
> ApiKeyInfoResp updateApiKey(apiKey, body)

Update API key details.

Endpoint for updating API key details.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DeveloperApi();

var apiKey = "apiKey_example"; // String | The ID of the API key to be updated.

var body = new IamIdentitiesRestApi.ApiKeyInfoReq(); // ApiKeyInfoReq | New API key attributes to be stored.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateApiKey(apiKey, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **apiKey** | **String**| The ID of the API key to be updated. | 
 **body** | [**ApiKeyInfoReq**](ApiKeyInfoReq.md)| New API key attributes to be stored. | 

### Return type

[**ApiKeyInfoResp**](ApiKeyInfoResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateMyUser"></a>
# **updateMyUser**
> UserInfoResp updateMyUser(body)

Update user details.

Endpoint for updating the details of the logged in user.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DeveloperApi();

var body = new IamIdentitiesRestApi.UserInfoReq(); // UserInfoReq | New attributes for the logged in user.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateMyUser(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**UserInfoReq**](UserInfoReq.md)| New attributes for the logged in user. | 

### Return type

[**UserInfoResp**](UserInfoResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

