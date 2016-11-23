# IamIdentitiesRestApi.AccountAdminApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUser**](AccountAdminApi.md#createUser) | **POST** /v3/users | Create a new user.
[**deleteUser**](AccountAdminApi.md#deleteUser) | **DELETE** /v3/users/{user-id} | Delete a user.
[**getAllUsers**](AccountAdminApi.md#getAllUsers) | **GET** /v3/users | Get the details of all users.
[**getUser**](AccountAdminApi.md#getUser) | **GET** /v3/users/{user-id} | Details of a user.
[**updateMyAccount**](AccountAdminApi.md#updateMyAccount) | **PUT** /v3/accounts/me | Updates attributes of the account.
[**updateUser**](AccountAdminApi.md#updateUser) | **PUT** /v3/users/{user-id} | Update user details.


<a name="createUser"></a>
# **createUser**
> UserInfoResp createUser(body)

Create a new user.

Endpoint for creating a new user.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.AccountAdminApi();

var body = new IamIdentitiesRestApi.UserInfoReq(); // UserInfoReq | A user object with attributes.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createUser(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**UserInfoReq**](UserInfoReq.md)| A user object with attributes. | 

### Return type

[**UserInfoResp**](UserInfoResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteUser"></a>
# **deleteUser**
> deleteUser(userId)

Delete a user.

Endpoint for deleting a user.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.AccountAdminApi();

var userId = "userId_example"; // String | The ID of the user to be deleted.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteUser(userId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| The ID of the user to be deleted. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getAllUsers"></a>
# **getAllUsers**
> UserInfoRespList getAllUsers()

Get the details of all users.

Endpoint for retrieving the details of all users.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.AccountAdminApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getAllUsers(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**UserInfoRespList**](UserInfoRespList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getUser"></a>
# **getUser**
> UserInfoResp getUser(userId)

Details of a user.

Endpoint for retrieving the details of a user.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.AccountAdminApi();

var userId = "userId_example"; // String | The ID or name of the user whose details are retrieved.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getUser(userId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| The ID or name of the user whose details are retrieved. | 

### Return type

[**UserInfoResp**](UserInfoResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateMyAccount"></a>
# **updateMyAccount**
> UpdatedResponse updateMyAccount(body)

Updates attributes of the account.

Endpoint for updating the account.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.AccountAdminApi();

var body = new IamIdentitiesRestApi.AccountUpdateReq(); // AccountUpdateReq | Details of the account to be updated.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateMyAccount(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**AccountUpdateReq**](AccountUpdateReq.md)| Details of the account to be updated. | 

### Return type

[**UpdatedResponse**](UpdatedResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateUser"></a>
# **updateUser**
> UserInfoResp updateUser(userId, body)

Update user details.

Endpoint for updating user details.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.AccountAdminApi();

var userId = "userId_example"; // String | The ID of the user whose details are updated.

var body = new IamIdentitiesRestApi.UserInfoReq(); // UserInfoReq | A user object with attributes.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateUser(userId, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| The ID of the user whose details are updated. | 
 **body** | [**UserInfoReq**](UserInfoReq.md)| A user object with attributes. | 

### Return type

[**UserInfoResp**](UserInfoResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

