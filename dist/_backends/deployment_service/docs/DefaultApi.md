# DeploymentServiceApi.DefaultApi

All URIs are relative to *http://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deployInfoGET**](DefaultApi.md#deployInfoGET) | **GET** /v3/ds_deploy_info | 
[**updateCampaignCreate**](DefaultApi.md#updateCampaignCreate) | **POST** /v3/update-campaigns/ | 
[**updateCampaignDestroy**](DefaultApi.md#updateCampaignDestroy) | **DELETE** /v3/update-campaigns/{campaign_id}/ | 
[**updateCampaignList**](DefaultApi.md#updateCampaignList) | **GET** /v3/update-campaigns/ | 
[**updateCampaignPartialUpdate**](DefaultApi.md#updateCampaignPartialUpdate) | **PATCH** /v3/update-campaigns/{campaign_id}/ | 
[**updateCampaignRetrieve**](DefaultApi.md#updateCampaignRetrieve) | **GET** /v3/update-campaigns/{campaign_id}/ | 
[**updateCampaignStatus**](DefaultApi.md#updateCampaignStatus) | **GET** /v3/update-campaigns/{campaign_id}/status/ | 
[**updateCampaignUpdate**](DefaultApi.md#updateCampaignUpdate) | **PUT** /v3/update-campaigns/{campaign_id}/ | 


<a name="deployInfoGET"></a>
# **deployInfoGET**
> Object deployInfoGET()



&lt;p&gt;Reads the deploy_info.json file and returns the Build and Git ID to the caller.&lt;/p&gt; &lt;p&gt;Will return a 500 error if the file is missing, cannot be parsed or the keys are missing.&lt;/p&gt;

### Example
```javascript
var DeploymentServiceApi = require('deployment_service_api');
var defaultClient = DeploymentServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeploymentServiceApi.DefaultApi();

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

<a name="updateCampaignCreate"></a>
# **updateCampaignCreate**
> UpdateCampaignSerializer updateCampaignCreate(name, opts)



&lt;p&gt;The APIs for creating and manipulating update campaigns. Update campaigns are used to control firmware update to a list of devices specified by a filter.  &lt;/p&gt; &lt;p&gt;Create update campaign&lt;/p&gt;

### Example
```javascript
var DeploymentServiceApi = require('deployment_service_api');
var defaultClient = DeploymentServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeploymentServiceApi.DefaultApi();

var name = "name_example"; // String | A name for this campaign

var opts = { 
  'campaignId': "campaignId_example", // String | DEPRECATED: The ID of the campaign
  'description': "description_example", // String | An optional description of the campaign
  'deviceFilter': "deviceFilter_example", // String | The filter for the devices the campaign will target
  'finished': new Date("2013-10-20T19:20:30+01:00"), // Date | The timestamp when the update campaign finished
  '_object': "_object_example", // String | The API resource entity
  'rootManifestId': "rootManifestId_example", // String | 
  'state': "state_example", // String | The state of the campaign
  'when': new Date("2013-10-20T19:20:30+01:00") // Date | The timestamp at which update campaign scheduled to start
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateCampaignCreate(name, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| A name for this campaign | 
 **campaignId** | **String**| DEPRECATED: The ID of the campaign | [optional] 
 **description** | **String**| An optional description of the campaign | [optional] 
 **deviceFilter** | **String**| The filter for the devices the campaign will target | [optional] 
 **finished** | **Date**| The timestamp when the update campaign finished | [optional] 
 **_object** | **String**| The API resource entity | [optional] 
 **rootManifestId** | **String**|  | [optional] 
 **state** | **String**| The state of the campaign | [optional] 
 **when** | **Date**| The timestamp at which update campaign scheduled to start | [optional] 

### Return type

[**UpdateCampaignSerializer**](UpdateCampaignSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="updateCampaignDestroy"></a>
# **updateCampaignDestroy**
> UpdateCampaignSerializer updateCampaignDestroy(campaignId, opts)



&lt;p&gt;The APIs for creating and manipulating update campaigns. Update campaigns are used to control firmware update to a list of devices specified by a filter.  &lt;/p&gt; &lt;p&gt;Delete update campaign&lt;/p&gt;

### Example
```javascript
var DeploymentServiceApi = require('deployment_service_api');
var defaultClient = DeploymentServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeploymentServiceApi.DefaultApi();

var campaignId = "campaignId_example"; // String | The ID of the update campaign

var opts = { 
  'updatingRequestId': "updatingRequestId_example", // String | 
  'updatingIpAddress': "updatingIpAddress_example", // String | 
  'createdAt': "createdAt_example", // String | 
  'updatedAt': "updatedAt_example", // String | 
  'attempts': "attempts_example", // String | 
  'description': "description_example", // String | 
  'deviceFilter': "deviceFilter_example", // String | 
  'etag': "etag_example", // String | 
  'finished': "finished_example", // String | 
  'name': "name_example", // String | 
  '_object': "_object_example", // String | 
  'rootManifestId': "rootManifestId_example", // String | 
  'state': "state_example", // String | 
  'when': "when_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateCampaignDestroy(campaignId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **campaignId** | **String**| The ID of the update campaign | 
 **updatingRequestId** | **String**|  | [optional] 
 **updatingIpAddress** | **String**|  | [optional] 
 **createdAt** | **String**|  | [optional] 
 **updatedAt** | **String**|  | [optional] 
 **attempts** | **String**|  | [optional] 
 **description** | **String**|  | [optional] 
 **deviceFilter** | **String**|  | [optional] 
 **etag** | **String**|  | [optional] 
 **finished** | **String**|  | [optional] 
 **name** | **String**|  | [optional] 
 **_object** | **String**|  | [optional] 
 **rootManifestId** | **String**|  | [optional] 
 **state** | **String**|  | [optional] 
 **when** | **String**|  | [optional] 

### Return type

[**UpdateCampaignSerializer**](UpdateCampaignSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="updateCampaignList"></a>
# **updateCampaignList**
> [UpdateCampaignSerializer] updateCampaignList(opts)



&lt;p&gt;The APIs for creating and manipulating update campaigns. Update campaigns are used to control firmware update to a list of devices specified by a filter.  &lt;/p&gt; &lt;p&gt;List all update campaigns&lt;/p&gt;

### Example
```javascript
var DeploymentServiceApi = require('deployment_service_api');
var defaultClient = DeploymentServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeploymentServiceApi.DefaultApi();

var opts = { 
  'updatingRequestId': "updatingRequestId_example", // String | 
  'updatingIpAddress': "updatingIpAddress_example", // String | 
  'createdAt': "createdAt_example", // String | 
  'updatedAt': "updatedAt_example", // String | 
  'attempts': "attempts_example", // String | 
  'campaignId': "campaignId_example", // String | 
  'description': "description_example", // String | 
  'deviceFilter': "deviceFilter_example", // String | 
  'etag': "etag_example", // String | 
  'finished': "finished_example", // String | 
  'name': "name_example", // String | 
  '_object': "_object_example", // String | 
  'rootManifestId': "rootManifestId_example", // String | 
  'state': "state_example", // String | 
  'when': "when_example", // String | 
  'page': 56, // Integer | The page number to retrieve. If not given, then defaults to first page.
  'rootManifestUrl': "rootManifestUrl_example" // String | The firmware catalog URL for the manifest that will be sent to the device as part of the campaign
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateCampaignList(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updatingRequestId** | **String**|  | [optional] 
 **updatingIpAddress** | **String**|  | [optional] 
 **createdAt** | **String**|  | [optional] 
 **updatedAt** | **String**|  | [optional] 
 **attempts** | **String**|  | [optional] 
 **campaignId** | **String**|  | [optional] 
 **description** | **String**|  | [optional] 
 **deviceFilter** | **String**|  | [optional] 
 **etag** | **String**|  | [optional] 
 **finished** | **String**|  | [optional] 
 **name** | **String**|  | [optional] 
 **_object** | **String**|  | [optional] 
 **rootManifestId** | **String**|  | [optional] 
 **state** | **String**|  | [optional] 
 **when** | **String**|  | [optional] 
 **page** | **Integer**| The page number to retrieve. If not given, then defaults to first page. | [optional] 
 **rootManifestUrl** | **String**| The firmware catalog URL for the manifest that will be sent to the device as part of the campaign | [optional] 

### Return type

[**[UpdateCampaignSerializer]**](UpdateCampaignSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="updateCampaignPartialUpdate"></a>
# **updateCampaignPartialUpdate**
> UpdateCampaignSerializer updateCampaignPartialUpdate(opts)



&lt;p&gt;The APIs for creating and manipulating update campaigns. Update campaigns are used to control firmware update to a list of devices specified by a filter.  &lt;/p&gt; &lt;p&gt;Update campaign fields&lt;/p&gt;

### Example
```javascript
var DeploymentServiceApi = require('deployment_service_api');
var defaultClient = DeploymentServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeploymentServiceApi.DefaultApi();

var opts = { 
  'campaignId': "campaignId_example", // String | DEPRECATED: The ID of the campaign
  'description': "description_example", // String | An optional description of the campaign
  'deviceFilter': "deviceFilter_example", // String | The filter for the devices the campaign will target
  'finished': new Date("2013-10-20T19:20:30+01:00"), // Date | The timestamp when the update campaign finished
  'name': "name_example", // String | A name for this campaign
  '_object': "_object_example", // String | The API resource entity
  'rootManifestId': "rootManifestId_example", // String | 
  'state': "state_example", // String | The state of the campaign
  'when': new Date("2013-10-20T19:20:30+01:00") // Date | The timestamp at which update campaign scheduled to start
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateCampaignPartialUpdate(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **campaignId** | **String**| DEPRECATED: The ID of the campaign | [optional] 
 **description** | **String**| An optional description of the campaign | [optional] 
 **deviceFilter** | **String**| The filter for the devices the campaign will target | [optional] 
 **finished** | **Date**| The timestamp when the update campaign finished | [optional] 
 **name** | **String**| A name for this campaign | [optional] 
 **_object** | **String**| The API resource entity | [optional] 
 **rootManifestId** | **String**|  | [optional] 
 **state** | **String**| The state of the campaign | [optional] 
 **when** | **Date**| The timestamp at which update campaign scheduled to start | [optional] 

### Return type

[**UpdateCampaignSerializer**](UpdateCampaignSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="updateCampaignRetrieve"></a>
# **updateCampaignRetrieve**
> UpdateCampaignSerializer updateCampaignRetrieve(campaignId, opts)



&lt;p&gt;The APIs for creating and manipulating update campaigns. Update campaigns are used to control firmware update to a list of devices specified by a filter.  &lt;/p&gt; &lt;p&gt;Retrieve campaign&lt;/p&gt;

### Example
```javascript
var DeploymentServiceApi = require('deployment_service_api');
var defaultClient = DeploymentServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeploymentServiceApi.DefaultApi();

var campaignId = "campaignId_example"; // String | The ID of the campaign

var opts = { 
  'updatingRequestId': "updatingRequestId_example", // String | 
  'updatingIpAddress': "updatingIpAddress_example", // String | 
  'createdAt': "createdAt_example", // String | 
  'updatedAt': "updatedAt_example", // String | 
  'attempts': "attempts_example", // String | 
  'description': "description_example", // String | 
  'deviceFilter': "deviceFilter_example", // String | 
  'etag': "etag_example", // String | 
  'finished': "finished_example", // String | 
  'name': "name_example", // String | 
  '_object': "_object_example", // String | 
  'rootManifestId': "rootManifestId_example", // String | 
  'state': "state_example", // String | 
  'when': "when_example", // String | 
  'rootManifestUrl': "rootManifestUrl_example" // String | The firmware catalog URL for the manifest that will be sent to the device as part of the campaign
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateCampaignRetrieve(campaignId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **campaignId** | **String**| The ID of the campaign | 
 **updatingRequestId** | **String**|  | [optional] 
 **updatingIpAddress** | **String**|  | [optional] 
 **createdAt** | **String**|  | [optional] 
 **updatedAt** | **String**|  | [optional] 
 **attempts** | **String**|  | [optional] 
 **description** | **String**|  | [optional] 
 **deviceFilter** | **String**|  | [optional] 
 **etag** | **String**|  | [optional] 
 **finished** | **String**|  | [optional] 
 **name** | **String**|  | [optional] 
 **_object** | **String**|  | [optional] 
 **rootManifestId** | **String**|  | [optional] 
 **state** | **String**|  | [optional] 
 **when** | **String**|  | [optional] 
 **rootManifestUrl** | **String**| The firmware catalog URL for the manifest that will be sent to the device as part of the campaign | [optional] 

### Return type

[**UpdateCampaignSerializer**](UpdateCampaignSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="updateCampaignStatus"></a>
# **updateCampaignStatus**
> UpdateCampaignStatusSerializer updateCampaignStatus(campaignId, opts)



&lt;p&gt;The APIs for creating and manipulating update campaigns. Update campaigns are used to control firmware update to a list of devices specified by a filter.  &lt;/p&gt; &lt;p&gt;Show the status of an update campaign&lt;/p&gt;

### Example
```javascript
var DeploymentServiceApi = require('deployment_service_api');
var defaultClient = DeploymentServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeploymentServiceApi.DefaultApi();

var campaignId = "campaignId_example"; // String | The ID of the update campaign

var opts = { 
  'updatingRequestId': "updatingRequestId_example", // String | 
  'updatingIpAddress': "updatingIpAddress_example", // String | 
  'createdAt': "createdAt_example", // String | 
  'updatedAt': "updatedAt_example", // String | 
  'attempts': "attempts_example", // String | 
  'description': "description_example", // String | 
  'deviceFilter': "deviceFilter_example", // String | 
  'etag': "etag_example", // String | 
  'finished': "finished_example", // String | 
  'name': "name_example", // String | 
  '_object': "_object_example", // String | 
  'rootManifestId': "rootManifestId_example", // String | 
  'state': "state_example", // String | 
  'when': "when_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateCampaignStatus(campaignId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **campaignId** | **String**| The ID of the update campaign | 
 **updatingRequestId** | **String**|  | [optional] 
 **updatingIpAddress** | **String**|  | [optional] 
 **createdAt** | **String**|  | [optional] 
 **updatedAt** | **String**|  | [optional] 
 **attempts** | **String**|  | [optional] 
 **description** | **String**|  | [optional] 
 **deviceFilter** | **String**|  | [optional] 
 **etag** | **String**|  | [optional] 
 **finished** | **String**|  | [optional] 
 **name** | **String**|  | [optional] 
 **_object** | **String**|  | [optional] 
 **rootManifestId** | **String**|  | [optional] 
 **state** | **String**|  | [optional] 
 **when** | **String**|  | [optional] 

### Return type

[**UpdateCampaignStatusSerializer**](UpdateCampaignStatusSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="updateCampaignUpdate"></a>
# **updateCampaignUpdate**
> UpdateCampaignSerializer updateCampaignUpdate(name, opts)



&lt;p&gt;The APIs for creating and manipulating update campaigns. Update campaigns are used to control firmware update to a list of devices specified by a filter.  &lt;/p&gt; &lt;p&gt;Update campaign&lt;/p&gt;

### Example
```javascript
var DeploymentServiceApi = require('deployment_service_api');
var defaultClient = DeploymentServiceApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new DeploymentServiceApi.DefaultApi();

var name = "name_example"; // String | A name for this campaign

var opts = { 
  'campaignId': "campaignId_example", // String | DEPRECATED: The ID of the campaign
  'description': "description_example", // String | An optional description of the campaign
  'deviceFilter': "deviceFilter_example", // String | The filter for the devices the campaign will target
  'finished': new Date("2013-10-20T19:20:30+01:00"), // Date | The timestamp when the update campaign finished
  '_object': "_object_example", // String | The API resource entity
  'rootManifestId': "rootManifestId_example", // String | 
  'state': "state_example", // String | The state of the campaign
  'when': new Date("2013-10-20T19:20:30+01:00") // Date | The timestamp at which update campaign scheduled to start
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateCampaignUpdate(name, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| A name for this campaign | 
 **campaignId** | **String**| DEPRECATED: The ID of the campaign | [optional] 
 **description** | **String**| An optional description of the campaign | [optional] 
 **deviceFilter** | **String**| The filter for the devices the campaign will target | [optional] 
 **finished** | **Date**| The timestamp when the update campaign finished | [optional] 
 **_object** | **String**| The API resource entity | [optional] 
 **rootManifestId** | **String**|  | [optional] 
 **state** | **String**| The state of the campaign | [optional] 
 **when** | **Date**| The timestamp at which update campaign scheduled to start | [optional] 

### Return type

[**UpdateCampaignSerializer**](UpdateCampaignSerializer.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

