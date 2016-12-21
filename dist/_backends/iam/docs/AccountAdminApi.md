# IamIdentitiesRestApi.AccountAdminApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addCertificate**](AccountAdminApi.md#addCertificate) | **POST** /v3/ca-certificates | Upload a new CA certificate.
[**createUser**](AccountAdminApi.md#createUser) | **POST** /v3/users | Create a new user.
[**deleteCertificate**](AccountAdminApi.md#deleteCertificate) | **DELETE** /v3/ca-certificates/{ca-cert-id} | Delete a CA certificate by ID.
[**deleteUser**](AccountAdminApi.md#deleteUser) | **DELETE** /v3/users/{user-id} | Delete a user.
[**getAllCertificates**](AccountAdminApi.md#getAllCertificates) | **GET** /v3/ca-certificates | Get all CA certificates.
[**getAllUsers**](AccountAdminApi.md#getAllUsers) | **GET** /v3/users | Get the details of all users.
[**getCertificate**](AccountAdminApi.md#getCertificate) | **GET** /v3/ca-certificates/{ca-cert-id} | Get CA certificate by ID.
[**getUser**](AccountAdminApi.md#getUser) | **GET** /v3/users/{user-id} | Details of a user.
[**updateCertificate**](AccountAdminApi.md#updateCertificate) | **PUT** /v3/ca-certificates/{ca-cert-id} | Update CA certificate.
[**updateMyAccount**](AccountAdminApi.md#updateMyAccount) | **PUT** /v3/accounts/me | Updates attributes of the account.
[**updateUser**](AccountAdminApi.md#updateUser) | **PUT** /v3/users/{user-id} | Update user details.


<a name="addCertificate"></a>
# **addCertificate**
> CACertificateResp addCertificate(body)

Upload a new CA certificate.

An endpoint for uploading new CA certificates.

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

var body = new IamIdentitiesRestApi.CACertificateReq(); // CACertificateReq | A CA certificate object with attributes.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.addCertificate(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**CACertificateReq**](CACertificateReq.md)| A CA certificate object with attributes. | 

### Return type

[**CACertificateResp**](CACertificateResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createUser"></a>
# **createUser**
> UserInfoResp createUser(body, opts)

Create a new user.

An endpoint for creating a new user.

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

var opts = { 
  'action': "create" // String | Action, either 'create' or 'invite'.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createUser(body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**UserInfoReq**](UserInfoReq.md)| A user object with attributes. | 
 **action** | **String**| Action, either &#39;create&#39; or &#39;invite&#39;. | [optional] [default to create]

### Return type

[**UserInfoResp**](UserInfoResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteCertificate"></a>
# **deleteCertificate**
> deleteCertificate(caCertId)

Delete a CA certificate by ID.

An endpoint for deleting a CA certificate.

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

var caCertId = "caCertId_example"; // String | The ID of the CA certificate to be deleted.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteCertificate(caCertId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **caCertId** | **String**| The ID of the CA certificate to be deleted. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteUser"></a>
# **deleteUser**
> deleteUser(userId, opts)

Delete a user.

An endpoint for deleting a user.

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

var opts = { 
  'force': "force_example" // String | Flag indicating that user is forced to be deleted.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteUser(userId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| The ID of the user to be deleted. | 
 **force** | **String**| Flag indicating that user is forced to be deleted. | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getAllCertificates"></a>
# **getAllCertificates**
> CACertificateRespList getAllCertificates(opts)

Get all CA certificates.

An endpoint for retrieving CA certificates in an array.

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

var opts = { 
  'limit': 50, // Integer | The number of results to return (2-1000), default is 50.
  'after': "after_example", // String | The entity ID to fetch after the given one.
  'order': "ASC", // String | The order of the records, ASC or DESC; by default ASC
  'include': "include_example", // String | Comma separated additional data to return. Currently supported: total_count
  'filter': "filter_example" // String | The filter for the query, for example filter=service%3Dlwm2m
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getAllCertificates(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Integer**| The number of results to return (2-1000), default is 50. | [optional] [default to 50]
 **after** | **String**| The entity ID to fetch after the given one. | [optional] 
 **order** | **String**| The order of the records, ASC or DESC; by default ASC | [optional] [default to ASC]
 **include** | **String**| Comma separated additional data to return. Currently supported: total_count | [optional] 
 **filter** | **String**| The filter for the query, for example filter&#x3D;service%3Dlwm2m | [optional] 

### Return type

[**CACertificateRespList**](CACertificateRespList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getAllUsers"></a>
# **getAllUsers**
> UserInfoRespList getAllUsers(opts)

Get the details of all users.

An endpoint for retrieving the details of all users.

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

var opts = { 
  'limit': 50, // Integer | The number of results to return (2-1000), default is 50.
  'after': "after_example", // String | The entity ID to fetch after the given one.
  'order': "ASC", // String | The order of the records, ASC or DESC; by default ASC
  'include': "include_example", // String | Comma separated additional data to return. Currently supported: total_count
  'filter': "filter_example" // String | Filter for the query, for example filter=status%3Dactive,status%3Dreset.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getAllUsers(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Integer**| The number of results to return (2-1000), default is 50. | [optional] [default to 50]
 **after** | **String**| The entity ID to fetch after the given one. | [optional] 
 **order** | **String**| The order of the records, ASC or DESC; by default ASC | [optional] [default to ASC]
 **include** | **String**| Comma separated additional data to return. Currently supported: total_count | [optional] 
 **filter** | **String**| Filter for the query, for example filter&#x3D;status%3Dactive,status%3Dreset. | [optional] 

### Return type

[**UserInfoRespList**](UserInfoRespList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getCertificate"></a>
# **getCertificate**
> CACertificateResp getCertificate(caCertId)

Get CA certificate by ID.

An endpoint for retrieving a CA certificate by ID.

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

var caCertId = "caCertId_example"; // String | The ID or name of the CA certificate to be retrieved.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getCertificate(caCertId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **caCertId** | **String**| The ID or name of the CA certificate to be retrieved. | 

### Return type

[**CACertificateResp**](CACertificateResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getUser"></a>
# **getUser**
> UserInfoResp getUser(userId)

Details of a user.

An endpoint for retrieving the details of a user.

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

<a name="updateCertificate"></a>
# **updateCertificate**
> CACertificateResp updateCertificate(caCertId, body)

Update CA certificate.

An endpoint for updating existing CA certificates.

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

var caCertId = "caCertId_example"; // String | The ID of the CA certificate to be updated.

var body = new IamIdentitiesRestApi.CACertificateReq(); // CACertificateReq | A CA certificate object with attributes.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateCertificate(caCertId, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **caCertId** | **String**| The ID of the CA certificate to be updated. | 
 **body** | [**CACertificateReq**](CACertificateReq.md)| A CA certificate object with attributes. | 

### Return type

[**CACertificateResp**](CACertificateResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateMyAccount"></a>
# **updateMyAccount**
> AccountInfo updateMyAccount(body)

Updates attributes of the account.

An endpoint for updating the account.

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

[**AccountInfo**](AccountInfo.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateUser"></a>
# **updateUser**
> UserInfoResp updateUser(userId, body)

Update user details.

An endpoint for updating user details.

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

