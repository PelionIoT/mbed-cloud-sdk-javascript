# DeviceCatalogApi.DeviceSerializerData

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**bootstrappedTimestamp** | **String** |  | [optional] 
**updatedAt** | **Date** | The time the object was updated | [optional] 
**customAttributes** | **String** | Up to 5 custom JSON attributes | [optional] 
**deviceClass** | **String** | The device class | [optional] 
**id** | **String** | The ID of the device | [optional] 
**description** | **String** | The description of the object | [optional] 
**autoUpdate** | **Boolean** | Mark this device for auto firmware update | [optional] 
**mechanism** | **String** | The ID of the channel used to communicate with the device | 
**state** | **String** | The current state of the device | [optional] 
**etag** | **Date** | The entity instance signature | [optional] 
**provisionKey** | **String** | The key used to provision the device | 
**serialNumber** | **String** | The serial number of the device | [optional] 
**vendorId** | **String** | The device vendor ID | [optional] 
**accountId** | **String** | The owning IAM account ID | 
**deployedState** | **String** | The state of the device&#39;s deployment | [optional] 
**_object** | **String** | The API resource entity | [optional] 
**trustClass** | **Integer** | The device trust class | [optional] 
**deployment** | **String** | The last deployment used on the device | [optional] 
**mechanismUrl** | **String** | The address of the connector to use | [optional] 
**trustLevel** | **Integer** | The device trust level | [optional] 
**deviceId** | **String** | DEPRECATED: The ID of the device | [optional] 
**name** | **String** | The name of the object | [optional] 
**createdAt** | **Date** | The time the object was created | [optional] 
**manifest** | **String** | URL for the current device manifest | [optional] 


<a name="MechanismEnum"></a>
## Enum: MechanismEnum


* `connector` (value: `"connector"`)

* `direct` (value: `"direct"`)




<a name="StateEnum"></a>
## Enum: StateEnum


* `unenrolled` (value: `"unenrolled"`)

* `cloud_enrolling` (value: `"cloud_enrolling"`)

* `bootstrapped` (value: `"bootstrapped"`)

* `registered` (value: `"registered"`)




<a name="DeployedStateEnum"></a>
## Enum: DeployedStateEnum


* `development` (value: `"development"`)

* `production` (value: `"production"`)




