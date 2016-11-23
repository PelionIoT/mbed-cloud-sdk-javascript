# DeviceCatalogApi.DeviceSerializer

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**bootstrappedTimestamp** | **String** |  | 
**updatedAt** | **Date** | The time the object was updated | 
**customAttributes** | **String** | Up to 5 custom JSON attributes | 
**deviceClass** | **String** | The device class | 
**id** | **String** | The ID of the device | 
**description** | **String** | The description of the object | 
**autoUpdate** | **Boolean** | Mark this device for auto firmware update | 
**mechanism** | **String** | The ID of the channel used to communicate with the device | 
**state** | **String** | The current state of the device | 
**etag** | **Date** | The entity instance signature | 
**provisionKey** | **String** | The key used to provision the device | 
**serialNumber** | **String** | The serial number of the device | 
**vendorId** | **String** | The device vendor ID | 
**accountId** | **String** | The owning IAM account ID | 
**deployedState** | **String** | The state of the device&#39;s deployment | 
**_object** | **String** | The API resource entity | 
**trustClass** | **Integer** | The device trust class | 
**deployment** | **String** | The last deployment used on the device | 
**mechanismUrl** | **String** | The address of the connector to use | 
**trustLevel** | **Integer** | The device trust level | 
**deviceId** | **String** | DEPRECATED: The ID of the device | 
**name** | **String** | The name of the object | 
**createdAt** | **Date** | The time the object was created | 
**manifest** | **String** | URL for the current device manifest | 


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




