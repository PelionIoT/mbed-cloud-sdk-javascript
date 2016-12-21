# FirmwareCatalogApi.DefaultApi

All URIs are relative to *http://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deployInfoGET**](DefaultApi.md#deployInfoGET) | **GET** /v3/fc_deploy_info | 
[**firmwareImageCreate**](DefaultApi.md#firmwareImageCreate) | **POST** /v3/firmware/images/ | 
[**firmwareImageDestroy**](DefaultApi.md#firmwareImageDestroy) | **DELETE** /v3/firmware/images/{image_id}/ | 
[**firmwareImageList**](DefaultApi.md#firmwareImageList) | **GET** /v3/firmware/images/ | 
[**firmwareImageRetrieve**](DefaultApi.md#firmwareImageRetrieve) | **GET** /v3/firmware/images/{image_id}/ | 
[**firmwareManifestCreate**](DefaultApi.md#firmwareManifestCreate) | **POST** /v3/firmware/manifests/ | 
[**firmwareManifestDestroy**](DefaultApi.md#firmwareManifestDestroy) | **DELETE** /v3/firmware/manifests/{manifest_id}/ | 
[**firmwareManifestList**](DefaultApi.md#firmwareManifestList) | **GET** /v3/firmware/manifests/ | 
[**firmwareManifestRetrieve**](DefaultApi.md#firmwareManifestRetrieve) | **GET** /v3/firmware/manifests/{manifest_id}/ | 


<a name="deployInfoGET"></a>
# **deployInfoGET**
> Object deployInfoGET()



&lt;p&gt;Reads the deploy_info.json file and returns the Build and Git ID to the caller.&lt;/p&gt; &lt;p&gt;Will return a 500 error if the file is missing, cannot be parsed or the keys are missing.&lt;/p&gt;

### Example
```javascript
var FirmwareCatalogApi = require('firmware_catalog_api');
var defaultClient = FirmwareCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new FirmwareCatalogApi.DefaultApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deployInfoGET(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

**Object**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="firmwareImageCreate"></a>
# **firmwareImageCreate**
> FirmwareImageSerializer firmwareImageCreate(datafile, name, opts)



&lt;p&gt;The APIs for creating and manipulating firmware images.  &lt;/p&gt; &lt;p&gt;Create firmware image&lt;/p&gt;&lt;pre&gt;YAMLError:  while scanning a simple key   in \&quot;&lt;unicode string&gt;\&quot;, line 16, column 9:             Cannot validate the data used to ...              ^ could not find expected &#39;:&#39;   in \&quot;&lt;unicode string&gt;\&quot;, line 17, column 5:         - code: 401         ^&lt;/pre&gt;

### Example
```javascript
var FirmwareCatalogApi = require('firmware_catalog_api');
var defaultClient = FirmwareCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new FirmwareCatalogApi.DefaultApi();

var datafile = "datafile_example"; // String | The binary file of firmware image

var name = "name_example"; // String | The name of the object

var opts = { 
  'description': "description_example", // String | The description of the object
  'updatingRequestId': "updatingRequestId_example", // String | 
  'updatingIpAddress': "updatingIpAddress_example", // String | 
  'name2': "name_example", // String | 
  'description2': "description_example", // String | 
  'createdAt': "createdAt_example", // String | 
  'updatedAt': "updatedAt_example", // String | 
  'datafileChecksum': "datafileChecksum_example", // String | 
  'etag': "etag_example", // String | 
  'imageId': "imageId_example", // String | 
  '_object': "_object_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.firmwareImageCreate(datafile, name, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **datafile** | **String**| The binary file of firmware image | 
 **name** | **String**| The name of the object | 
 **description** | **String**| The description of the object | [optional] 
 **updatingRequestId** | **String**|  | [optional] 
 **updatingIpAddress** | **String**|  | [optional] 
 **name2** | **String**|  | [optional] 
 **description2** | **String**|  | [optional] 
 **createdAt** | **String**|  | [optional] 
 **updatedAt** | **String**|  | [optional] 
 **datafileChecksum** | **String**|  | [optional] 
 **etag** | **String**|  | [optional] 
 **imageId** | **String**|  | [optional] 
 **_object** | **String**|  | [optional] 

### Return type

[**FirmwareImageSerializer**](FirmwareImageSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="firmwareImageDestroy"></a>
# **firmwareImageDestroy**
> FirmwareImageSerializer firmwareImageDestroy(imageId, opts)



&lt;p&gt;The APIs for creating and manipulating firmware images.  &lt;/p&gt; &lt;p&gt;Delete firmware image&lt;/p&gt;

### Example
```javascript
var FirmwareCatalogApi = require('firmware_catalog_api');
var defaultClient = FirmwareCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new FirmwareCatalogApi.DefaultApi();

var imageId = 56; // Integer | The ID of the firmware image

var opts = { 
  'updatingRequestId': "updatingRequestId_example", // String | 
  'updatingIpAddress': "updatingIpAddress_example", // String | 
  'name': "name_example", // String | 
  'description': "description_example", // String | 
  'createdAt': "createdAt_example", // String | 
  'updatedAt': "updatedAt_example", // String | 
  'datafileChecksum': "datafileChecksum_example", // String | 
  'etag': "etag_example", // String | 
  '_object': "_object_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.firmwareImageDestroy(imageId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **imageId** | **Integer**| The ID of the firmware image | 
 **updatingRequestId** | **String**|  | [optional] 
 **updatingIpAddress** | **String**|  | [optional] 
 **name** | **String**|  | [optional] 
 **description** | **String**|  | [optional] 
 **createdAt** | **String**|  | [optional] 
 **updatedAt** | **String**|  | [optional] 
 **datafileChecksum** | **String**|  | [optional] 
 **etag** | **String**|  | [optional] 
 **_object** | **String**|  | [optional] 

### Return type

[**FirmwareImageSerializer**](FirmwareImageSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="firmwareImageList"></a>
# **firmwareImageList**
> FirmwareImageSerializer firmwareImageList(opts)



&lt;p&gt;The APIs for creating and manipulating firmware images.  &lt;/p&gt; &lt;p&gt;List all firmware images. The result will be paged into pages of 100.&lt;/p&gt;

### Example
```javascript
var FirmwareCatalogApi = require('firmware_catalog_api');
var defaultClient = FirmwareCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new FirmwareCatalogApi.DefaultApi();

var opts = { 
  'limit': 56, // Integer | 
  'order': "order_example", // String | 
  'after': "after_example", // String | 
  'include': "include_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.firmwareImageList(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Integer**|  | [optional] 
 **order** | **String**|  | [optional] 
 **after** | **String**|  | [optional] 
 **include** | **String**|  | [optional] 

### Return type

[**FirmwareImageSerializer**](FirmwareImageSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="firmwareImageRetrieve"></a>
# **firmwareImageRetrieve**
> FirmwareImageSerializer firmwareImageRetrieve(imageId, opts)



&lt;p&gt;The APIs for creating and manipulating firmware images.  &lt;/p&gt; &lt;p&gt;Retrieve firmware image&lt;/p&gt;

### Example
```javascript
var FirmwareCatalogApi = require('firmware_catalog_api');
var defaultClient = FirmwareCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new FirmwareCatalogApi.DefaultApi();

var imageId = 56; // Integer | The ID of the firmware image

var opts = { 
  'updatingRequestId': "updatingRequestId_example", // String | 
  'updatingIpAddress': "updatingIpAddress_example", // String | 
  'name': "name_example", // String | 
  'description': "description_example", // String | 
  'createdAt': "createdAt_example", // String | 
  'updatedAt': "updatedAt_example", // String | 
  'datafileChecksum': "datafileChecksum_example", // String | 
  'etag': "etag_example", // String | 
  '_object': "_object_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.firmwareImageRetrieve(imageId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **imageId** | **Integer**| The ID of the firmware image | 
 **updatingRequestId** | **String**|  | [optional] 
 **updatingIpAddress** | **String**|  | [optional] 
 **name** | **String**|  | [optional] 
 **description** | **String**|  | [optional] 
 **createdAt** | **String**|  | [optional] 
 **updatedAt** | **String**|  | [optional] 
 **datafileChecksum** | **String**|  | [optional] 
 **etag** | **String**|  | [optional] 
 **_object** | **String**|  | [optional] 

### Return type

[**FirmwareImageSerializer**](FirmwareImageSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="firmwareManifestCreate"></a>
# **firmwareManifestCreate**
> ManifestSerializerData firmwareManifestCreate(datafile, name, opts)



&lt;p&gt;The APIs for creating and manipulating firmware manifests.  &lt;/p&gt; &lt;p&gt;Create firmware manifest&lt;/p&gt;

### Example
```javascript
var FirmwareCatalogApi = require('firmware_catalog_api');
var defaultClient = FirmwareCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new FirmwareCatalogApi.DefaultApi();

var datafile = "/path/to/file.txt"; // File | The manifest file to create

var name = "name_example"; // String | The name of the object

var opts = { 
  'description': "description_example" // String | The description of the object
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.firmwareManifestCreate(datafile, name, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **datafile** | **File**| The manifest file to create | 
 **name** | **String**| The name of the object | 
 **description** | **String**| The description of the object | [optional] 

### Return type

[**ManifestSerializerData**](ManifestSerializerData.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: Not defined

<a name="firmwareManifestDestroy"></a>
# **firmwareManifestDestroy**
> ManifestSerializerData firmwareManifestDestroy(manifestId)



&lt;p&gt;The APIs for creating and manipulating firmware manifests.  &lt;/p&gt; &lt;p&gt;Delete firmware manifest&lt;/p&gt;

### Example
```javascript
var FirmwareCatalogApi = require('firmware_catalog_api');
var defaultClient = FirmwareCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new FirmwareCatalogApi.DefaultApi();

var manifestId = 56; // Integer | The ID of the firmware manifest


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.firmwareManifestDestroy(manifestId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **manifestId** | **Integer**| The ID of the firmware manifest | 

### Return type

[**ManifestSerializerData**](ManifestSerializerData.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="firmwareManifestList"></a>
# **firmwareManifestList**
> ManifestSerializer firmwareManifestList(opts)



&lt;p&gt;The APIs for creating and manipulating firmware manifests.  &lt;/p&gt; &lt;p&gt;List all firmware manifests&lt;/p&gt;

### Example
```javascript
var FirmwareCatalogApi = require('firmware_catalog_api');
var defaultClient = FirmwareCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new FirmwareCatalogApi.DefaultApi();

var opts = { 
  'limit': 56, // Integer | 
  'order': "order_example", // String | 
  'after': "after_example", // String | 
  'include': "include_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.firmwareManifestList(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Integer**|  | [optional] 
 **order** | **String**|  | [optional] 
 **after** | **String**|  | [optional] 
 **include** | **String**|  | [optional] 

### Return type

[**ManifestSerializer**](ManifestSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="firmwareManifestRetrieve"></a>
# **firmwareManifestRetrieve**
> ManifestSerializerData firmwareManifestRetrieve(manifestId, opts)



&lt;p&gt;The APIs for creating and manipulating firmware manifests.  &lt;/p&gt; &lt;p&gt;Retrieve firmware manifest&lt;/p&gt;

### Example
```javascript
var FirmwareCatalogApi = require('firmware_catalog_api');
var defaultClient = FirmwareCatalogApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new FirmwareCatalogApi.DefaultApi();

var manifestId = 56; // Integer | The ID of the firmware manifest

var opts = { 
  'updatingRequestId': "updatingRequestId_example", // String | 
  'updatingIpAddress': "updatingIpAddress_example", // String | 
  'name': "name_example", // String | 
  'description': "description_example", // String | 
  'createdAt': "createdAt_example", // String | 
  'updatedAt': "updatedAt_example", // String | 
  'datafileChecksum': "datafileChecksum_example", // String | 
  'deviceClass': "deviceClass_example", // String | 
  'etag': "etag_example", // String | 
  '_object': "_object_example", // String | 
  'timestamp': "timestamp_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.firmwareManifestRetrieve(manifestId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **manifestId** | **Integer**| The ID of the firmware manifest | 
 **updatingRequestId** | **String**|  | [optional] 
 **updatingIpAddress** | **String**|  | [optional] 
 **name** | **String**|  | [optional] 
 **description** | **String**|  | [optional] 
 **createdAt** | **String**|  | [optional] 
 **updatedAt** | **String**|  | [optional] 
 **datafileChecksum** | **String**|  | [optional] 
 **deviceClass** | **String**|  | [optional] 
 **etag** | **String**|  | [optional] 
 **_object** | **String**|  | [optional] 
 **timestamp** | **String**|  | [optional] 

### Return type

[**ManifestSerializerData**](ManifestSerializerData.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

