# IamIdentitiesRestApi.RootAdminApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createAccountTemplate**](RootAdminApi.md#createAccountTemplate) | **POST** /admin/v3/account-templates | Create a new account template.
[**deleteAccountTemplate**](RootAdminApi.md#deleteAccountTemplate) | **DELETE** /admin/v3/account-templates/{template-id} | Delete account template by ID.
[**getAccountTemplate**](RootAdminApi.md#getAccountTemplate) | **GET** /admin/v3/account-templates/{template-id} | Get account template by ID.
[**getAllAccountTemplates**](RootAdminApi.md#getAllAccountTemplates) | **GET** /admin/v3/account-templates | Get all account templates.
[**updateAccountTemplate**](RootAdminApi.md#updateAccountTemplate) | **PUT** /admin/v3/account-templates/{template-id} | Update an existing account template.


<a name="createAccountTemplate"></a>
# **createAccountTemplate**
> AccountTemplateResp createAccountTemplate(body)

Create a new account template.

Endpoint for creating a new account template.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.RootAdminApi();

var body = new IamIdentitiesRestApi.AccountTemplateReq(); // AccountTemplateReq | Details of the account template to be created.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createAccountTemplate(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**AccountTemplateReq**](AccountTemplateReq.md)| Details of the account template to be created. | 

### Return type

[**AccountTemplateResp**](AccountTemplateResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteAccountTemplate"></a>
# **deleteAccountTemplate**
> deleteAccountTemplate(templateId)

Delete account template by ID.

Endpoint for deleting a account template by ID.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.RootAdminApi();

var templateId = "templateId_example"; // String | The ID of the account template to be deleted.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteAccountTemplate(templateId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **templateId** | **String**| The ID of the account template to be deleted. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getAccountTemplate"></a>
# **getAccountTemplate**
> AccountTemplateResp getAccountTemplate(templateId)

Get account template by ID.

Endpoint for retrieving a account template by ID.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.RootAdminApi();

var templateId = "templateId_example"; // String | The ID of the account template to be retrieved.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getAccountTemplate(templateId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **templateId** | **String**| The ID of the account template to be retrieved. | 

### Return type

[**AccountTemplateResp**](AccountTemplateResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getAllAccountTemplates"></a>
# **getAllAccountTemplates**
> AccountTemplateRespList getAllAccountTemplates(opts)

Get all account templates.

Endpoint for retrieving account templates in an array.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.RootAdminApi();

var opts = { 
  'limit': 50, // Integer | The number of results to return (2-1000), default is 50.
  'after': "after_example", // String | The entity id to fetch after it
  'order': "ASC", // String | The order of the records, ASC or DESC. Default value is ASC
  'include': "include_example" // String | Comma separate additional data to return. Currently supported: total_count
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getAllAccountTemplates(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Integer**| The number of results to return (2-1000), default is 50. | [optional] [default to 50]
 **after** | **String**| The entity id to fetch after it | [optional] 
 **order** | **String**| The order of the records, ASC or DESC. Default value is ASC | [optional] [default to ASC]
 **include** | **String**| Comma separate additional data to return. Currently supported: total_count | [optional] 

### Return type

[**AccountTemplateRespList**](AccountTemplateRespList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateAccountTemplate"></a>
# **updateAccountTemplate**
> AccountTemplateResp updateAccountTemplate(templateId, body)

Update an existing account template.

Endpoint for updating an existing account template.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.RootAdminApi();

var templateId = "templateId_example"; // String | The ID of the account template to be updated.

var body = new IamIdentitiesRestApi.AccountTemplateReq(); // AccountTemplateReq | Details of the account template to be updated.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateAccountTemplate(templateId, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **templateId** | **String**| The ID of the account template to be updated. | 
 **body** | [**AccountTemplateReq**](AccountTemplateReq.md)| Details of the account template to be updated. | 

### Return type

[**AccountTemplateResp**](AccountTemplateResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

