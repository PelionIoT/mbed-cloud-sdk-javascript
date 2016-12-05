# ProvisioningEndpointsTheFactoryProvisioningPackage.DefaultApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**downloadsMbedFactoryProvisioningPackageGet**](DefaultApi.md#downloadsMbedFactoryProvisioningPackageGet) | **GET** /downloads/mbed_factory_provisioning_package | 
[**downloadsMbedFactoryProvisioningPackageInfoGet**](DefaultApi.md#downloadsMbedFactoryProvisioningPackageInfoGet) | **GET** /downloads/mbed_factory_provisioning_package/info | 


<a name="downloadsMbedFactoryProvisioningPackageGet"></a>
# **downloadsMbedFactoryProvisioningPackageGet**
> &#39;String&#39; downloadsMbedFactoryProvisioningPackageGet(os)



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

var os = "os_example"; // String | Requires Factory Tool OS name (Windows or Linux).


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.downloadsMbedFactoryProvisioningPackageGet(os, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **os** | **String**| Requires Factory Tool OS name (Windows or Linux). | 

### Return type

**&#39;String&#39;**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="downloadsMbedFactoryProvisioningPackageInfoGet"></a>
# **downloadsMbedFactoryProvisioningPackageInfoGet**
> AListOfDownloadableFactoryToolVersions_ downloadsMbedFactoryProvisioningPackageInfoGet()



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

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.downloadsMbedFactoryProvisioningPackageInfoGet(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**AListOfDownloadableFactoryToolVersions_**](AListOfDownloadableFactoryToolVersions_.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

