# DeploymentServiceApi.CampaignDeviceMetadataSerializer

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**description** | **String** | The description of the object | 
**campaign** | **String** | The update campaign to which this device belongs | 
**createdAt** | **Date** | The time the object was created | 
**_object** | **String** | The API resource entity | 
**updatedAt** | **Date** | The time the object was updated | 
**mechanism** | **String** | The ID of the channel used to communicated with the device | 
**name** | **String** | The name of the object | 
**etag** | **Date** | The entity instance signature | 
**mechanismUrl** | **String** | The address of the Connector to use | 
**deploymentState** | **String** | The state of the deployment | 
**id** | **String** | The ID of the metadata concerning this device/campaign | 
**deviceId** | **String** | The ID of the device to deploy | 


<a name="DeploymentStateEnum"></a>
## Enum: DeploymentStateEnum


* `pending` (value: `"pending"`)

* `updated_device_catalog` (value: `"updated_device_catalog"`)

* `updated_connector_channel` (value: `"updated_connector_channel"`)

* `deployed` (value: `"deployed"`)

* `manifestremoved` (value: `"manifestremoved"`)




