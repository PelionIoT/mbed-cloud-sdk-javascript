# ProvisioningEndpointsProvisioningCertificates.DefaultApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**v3ProvisioningCertificateGet**](DefaultApi.md#v3ProvisioningCertificateGet) | **GET** /v3/provisioning-certificate | 


<a name="v3ProvisioningCertificateGet"></a>
# **v3ProvisioningCertificateGet**
> ProvisioningCertificate v3ProvisioningCertificateGet(authorization)



Gets the account&#39;s provisioning certificate.

### Example
```javascript
var ProvisioningEndpointsProvisioningCertificates = require('provisioning_endpoints___provisioning_certificates');
var defaultClient = ProvisioningEndpointsProvisioningCertificates.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ProvisioningEndpointsProvisioningCertificates.DefaultApi();

var authorization = "authorization_example"; // String | \"Bearer\" followed by the reference token or API key.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v3ProvisioningCertificateGet(authorization, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| \&quot;Bearer\&quot; followed by the reference token or API key. | 

### Return type

[**ProvisioningCertificate**](ProvisioningCertificate.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

