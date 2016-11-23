# DeviceCatalogApi.WriteDeviceSerializer

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**vendorId** | **String** | The device vendor ID | [optional] 
**_object** | **String** | The API resource entity | [optional] 
**description** | **String** | The description of the object | [optional] 
**deployedState** | **String** | The state of the device&#39;s deployment | [optional] 
**autoUpdate** | **Boolean** | Mark this device for auto firmware update | [optional] 
**name** | **String** | The name of the object | [optional] 
**deviceClass** | **String** | The device class | [optional] 
**customAttributes** | **String** | Up to 5 custom JSON attributes | [optional] 
**manifest** | **String** | URL for the current device manifest | [optional] 
**trustClass** | **Integer** | The device trust class | [optional] 
**provisionKey** | **String** | The key used to provision the device | 
**state** | **String** | The current state of the device | [optional] 
**mechanism** | **String** | The ID of the channel used to communicate with the device | 
**deployment** | **String** | The last deployment used on the device | [optional] 
**mechanismUrl** | **String** | The address of the connector to use | [optional] 
**serialNumber** | **String** | The serial number of the device | [optional] 
**deviceId** | **String** | DEPRECATED: The ID of the device | [optional] 
**trustLevel** | **Integer** | The device trust level | [optional] 
**accountId** | **String** | The owning IAM account ID | 


<a name="DeployedStateEnum"></a>
## Enum: DeployedStateEnum


* `development` (value: `"development"`)

* `production` (value: `"production"`)




<a name="StateEnum"></a>
## Enum: StateEnum


* `unenrolled` (value: `"unenrolled"`)

* `cloud_enrolling` (value: `"cloud_enrolling"`)

* `bootstrapped` (value: `"bootstrapped"`)

* `registered` (value: `"registered"`)




<a name="MechanismEnum"></a>
## Enum: MechanismEnum


* `connector` (value: `"connector"`)

* `direct` (value: `"direct"`)




