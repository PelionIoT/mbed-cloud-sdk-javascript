# ProvisioningEndpointsTheFactoryProvisioningPackage.DefaultApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**downloadsMbedFactoryProvisioningPackageInfoGet**](DefaultApi.md#downloadsMbedFactoryProvisioningPackageInfoGet) | **GET** /downloads/mbed_factory_provisioning_package/info | 
[**downloadsMbedFactoryProvisioningPackageososGet**](DefaultApi.md#downloadsMbedFactoryProvisioningPackageososGet) | **GET** /downloads/mbed_factory_provisioning_package?os&#x3D;{os} | 


<a name="downloadsMbedFactoryProvisioningPackageInfoGet"></a>
# **downloadsMbedFactoryProvisioningPackageInfoGet**
> AListOfDownloadableFactoryToolVersions_ downloadsMbedFactoryProvisioningPackageInfoGet(authorization)



Gets a list of downloadable Factory Tool versions. * mbed Cloud user role must be Administrator. * mbed Cloud account must have Factory Tool downloads enabled. 

### Example
```javascript
var ProvisioningEndpointsTheFactoryProvisioningPackage = require('provisioning_endpoints___the_factory_provisioning_package');
var defaultClient = ProvisioningEndpointsTheFactoryProvisioningPackage.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ProvisioningEndpointsTheFactoryProvisioningPackage.DefaultApi();

var authorization = "authorization_example"; // String | \"Bearer\" followed by a reference token (API key forbidden).


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.downloadsMbedFactoryProvisioningPackageInfoGet(authorization, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| \&quot;Bearer\&quot; followed by a reference token (API key forbidden). | 

### Return type

[**AListOfDownloadableFactoryToolVersions_**](AListOfDownloadableFactoryToolVersions_.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="downloadsMbedFactoryProvisioningPackageososGet"></a>
# **downloadsMbedFactoryProvisioningPackageososGet**
> downloadsMbedFactoryProvisioningPackageososGet(authorization, os)



Returns a specific Factory Tool package in a ZIP archive. * mbed Cloud user role must be Administrator. * mbed Cloud account must have Factory Tool downloads enabled. 

### Example
```javascript
var ProvisioningEndpointsTheFactoryProvisioningPackage = require('provisioning_endpoints___the_factory_provisioning_package');
var defaultClient = ProvisioningEndpointsTheFactoryProvisioningPackage.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ProvisioningEndpointsTheFactoryProvisioningPackage.DefaultApi();

var authorization = "authorization_example"; // String | \"Bearer\" followed by a reference token (API key forbidden).

var os = "os_example"; // String | Requires Factory Tool OS name (Windows or Linux).


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.downloadsMbedFactoryProvisioningPackageososGet(authorization, os, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**| \&quot;Bearer\&quot; followed by a reference token (API key forbidden). | 
 **os** | **String**| Requires Factory Tool OS name (Windows or Linux). | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

