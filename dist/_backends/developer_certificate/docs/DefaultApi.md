# ProvisioningEndpointsDeveloperCertificates.DefaultApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**v3DeveloperCertificateDelete**](DefaultApi.md#v3DeveloperCertificateDelete) | **DELETE** /v3/developer-certificate | 
[**v3DeveloperCertificateGet**](DefaultApi.md#v3DeveloperCertificateGet) | **GET** /v3/developer-certificate | 
[**v3DeveloperCertificatePost**](DefaultApi.md#v3DeveloperCertificatePost) | **POST** /v3/developer-certificate | 


<a name="v3DeveloperCertificateDelete"></a>
# **v3DeveloperCertificateDelete**
> v3DeveloperCertificateDelete(authorization)



Deletes the account&#39;s developer certificate (only one per account allowed).

### Example
```javascript
var ProvisioningEndpointsDeveloperCertificates = require('provisioning_endpoints___developer_certificates');
var defaultClient = ProvisioningEndpointsDeveloperCertificates.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ProvisioningEndpointsDeveloperCertificates.DefaultApi();

var authorization = "authorization_example"; // String | \"Bearer\" followed by the reference token or API key.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.v3DeveloperCertificateDelete(authorization, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| \&quot;Bearer\&quot; followed by the reference token or API key. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="v3DeveloperCertificateGet"></a>
# **v3DeveloperCertificateGet**
> DeveloperCertificate v3DeveloperCertificateGet(authorization)



Gets the developer certificate of the account.

### Example
```javascript
var ProvisioningEndpointsDeveloperCertificates = require('provisioning_endpoints___developer_certificates');
var defaultClient = ProvisioningEndpointsDeveloperCertificates.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ProvisioningEndpointsDeveloperCertificates.DefaultApi();

var authorization = "authorization_example"; // String | \"Bearer\" followed by the reference token or API key.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v3DeveloperCertificateGet(authorization, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| \&quot;Bearer\&quot; followed by the reference token or API key. | 

### Return type

[**DeveloperCertificate**](DeveloperCertificate.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="v3DeveloperCertificatePost"></a>
# **v3DeveloperCertificatePost**
> DeveloperCertificate v3DeveloperCertificatePost(authorization, body)



Adds a developer certificate to the account (only one per account allowed).

### Example
```javascript
var ProvisioningEndpointsDeveloperCertificates = require('provisioning_endpoints___developer_certificates');
var defaultClient = ProvisioningEndpointsDeveloperCertificates.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ProvisioningEndpointsDeveloperCertificates.DefaultApi();

var authorization = "authorization_example"; // String | \"Bearer\" followed by the reference token or API key.

var body = new ProvisioningEndpointsDeveloperCertificates.Body(); // Body | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v3DeveloperCertificatePost(authorization, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| \&quot;Bearer\&quot; followed by the reference token or API key. | 
 **body** | [**Body**](Body.md)|  | 

### Return type

[**DeveloperCertificate**](DeveloperCertificate.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

