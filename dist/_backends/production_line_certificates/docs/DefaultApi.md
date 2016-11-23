# ProvisioningEndpointsProductionLineCertificates.DefaultApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**v3ProductionLineCertificatesGet**](DefaultApi.md#v3ProductionLineCertificatesGet) | **GET** /v3/production-line-certificates | 
[**v3ProductionLineCertificatesMUUIDDelete**](DefaultApi.md#v3ProductionLineCertificatesMUUIDDelete) | **DELETE** /v3/production-line-certificates/{mUUID} | 
[**v3ProductionLineCertificatesMUUIDGet**](DefaultApi.md#v3ProductionLineCertificatesMUUIDGet) | **GET** /v3/production-line-certificates/{mUUID} | 
[**v3ProductionLineCertificatesMUUIDPut**](DefaultApi.md#v3ProductionLineCertificatesMUUIDPut) | **PUT** /v3/production-line-certificates/{mUUID} | 
[**v3ProductionLineCertificatesPost**](DefaultApi.md#v3ProductionLineCertificatesPost) | **POST** /v3/production-line-certificates | 


<a name="v3ProductionLineCertificatesGet"></a>
# **v3ProductionLineCertificatesGet**
> AListOfProductionLineCertificates_ v3ProductionLineCertificatesGet(authorization)



Gets the list of production line certificates associated with the account. 

### Example
```javascript
var ProvisioningEndpointsProductionLineCertificates = require('provisioning_endpoints___production_line_certificates');
var defaultClient = ProvisioningEndpointsProductionLineCertificates.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ProvisioningEndpointsProductionLineCertificates.DefaultApi();

var authorization = "authorization_example"; // String | \"Bearer\" followed by the reference token or API key.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v3ProductionLineCertificatesGet(authorization, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| \&quot;Bearer\&quot; followed by the reference token or API key. | 

### Return type

[**AListOfProductionLineCertificates_**](AListOfProductionLineCertificates_.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="v3ProductionLineCertificatesMUUIDDelete"></a>
# **v3ProductionLineCertificatesMUUIDDelete**
> ProductionLineCertificate v3ProductionLineCertificatesMUUIDDelete(authorization, mUUID)



Deactivates the production line certificate.  There is no way to reactivate it. 

### Example
```javascript
var ProvisioningEndpointsProductionLineCertificates = require('provisioning_endpoints___production_line_certificates');
var defaultClient = ProvisioningEndpointsProductionLineCertificates.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ProvisioningEndpointsProductionLineCertificates.DefaultApi();

var authorization = "authorization_example"; // String | \"Bearer\" followed by the reference token or API key.

var mUUID = "mUUID_example"; // String | Certificate mUUID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v3ProductionLineCertificatesMUUIDDelete(authorization, mUUID, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| \&quot;Bearer\&quot; followed by the reference token or API key. | 
 **mUUID** | **String**| Certificate mUUID | 

### Return type

[**ProductionLineCertificate**](ProductionLineCertificate.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="v3ProductionLineCertificatesMUUIDGet"></a>
# **v3ProductionLineCertificatesMUUIDGet**
> ProductionLineCertificate v3ProductionLineCertificatesMUUIDGet(authorization, mUUID)



Gets a single production line certificate by its mUUID. 

### Example
```javascript
var ProvisioningEndpointsProductionLineCertificates = require('provisioning_endpoints___production_line_certificates');
var defaultClient = ProvisioningEndpointsProductionLineCertificates.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ProvisioningEndpointsProductionLineCertificates.DefaultApi();

var authorization = "authorization_example"; // String | \"Bearer\" followed by the reference token or API key.

var mUUID = "mUUID_example"; // String | Certificate mUUID.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v3ProductionLineCertificatesMUUIDGet(authorization, mUUID, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| \&quot;Bearer\&quot; followed by the reference token or API key. | 
 **mUUID** | **String**| Certificate mUUID. | 

### Return type

[**ProductionLineCertificate**](ProductionLineCertificate.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="v3ProductionLineCertificatesMUUIDPut"></a>
# **v3ProductionLineCertificatesMUUIDPut**
> ProductionLineCertificate v3ProductionLineCertificatesMUUIDPut(authorization, mUUID, body)



Updates the comment on a production line certificate. 

### Example
```javascript
var ProvisioningEndpointsProductionLineCertificates = require('provisioning_endpoints___production_line_certificates');
var defaultClient = ProvisioningEndpointsProductionLineCertificates.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ProvisioningEndpointsProductionLineCertificates.DefaultApi();

var authorization = "authorization_example"; // String | \"Bearer\" followed by the reference token or API key.

var mUUID = "mUUID_example"; // String | Certificate mUUID

var body = new ProvisioningEndpointsProductionLineCertificates.Body1(); // Body1 | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v3ProductionLineCertificatesMUUIDPut(authorization, mUUID, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| \&quot;Bearer\&quot; followed by the reference token or API key. | 
 **mUUID** | **String**| Certificate mUUID | 
 **body** | [**Body1**](Body1.md)|  | 

### Return type

[**ProductionLineCertificate**](ProductionLineCertificate.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="v3ProductionLineCertificatesPost"></a>
# **v3ProductionLineCertificatesPost**
> ProductionLineCertificate v3ProductionLineCertificatesPost(authorization, body)



Adds a new production line certificate to the account. 

### Example
```javascript
var ProvisioningEndpointsProductionLineCertificates = require('provisioning_endpoints___production_line_certificates');
var defaultClient = ProvisioningEndpointsProductionLineCertificates.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ProvisioningEndpointsProductionLineCertificates.DefaultApi();

var authorization = "authorization_example"; // String | \"Bearer\" followed by the reference token or API key.

var body = new ProvisioningEndpointsProductionLineCertificates.Body(); // Body | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.v3ProductionLineCertificatesPost(authorization, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| \&quot;Bearer\&quot; followed by the reference token or API key. | 
 **body** | [**Body**](Body.md)|  | 

### Return type

[**ProductionLineCertificate**](ProductionLineCertificate.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

