# DeploymentServiceApi.WriteCampaignDeviceMetadataSerializer

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**description** | **String** | The description of the object | [optional] 
**campaign** | **String** | The update campaign to which this device belongs | 
**_object** | **String** | The API resource entity | [optional] 
**mechanism** | **String** | The ID of the channel used to communicated with the device | 
**name** | **String** | The name of the object | 
**mechanismUrl** | **String** | The address of the Connector to use | [optional] 
**deploymentState** | **String** | The state of the deployment | [optional] 
**deviceId** | **String** | The ID of the device to deploy | 


<a name="DeploymentStateEnum"></a>
## Enum: DeploymentStateEnum


* `pending` (value: `"pending"`)

* `updated_device_catalog` (value: `"updated_device_catalog"`)

* `updated_connector_channel` (value: `"updated_connector_channel"`)

* `deployed` (value: `"deployed"`)

* `manifestremoved` (value: `"manifestremoved"`)




