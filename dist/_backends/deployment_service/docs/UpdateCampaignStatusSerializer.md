# DeploymentServiceApi.UpdateCampaignStatusSerializer

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**directDevices** | **String** |  | 
**connectorDevices** | **String** |  | 
**description** | **String** | An optional description of the campaign | 
**state** | **String** | The state of the campaign | 
**updatingUserId** | **String** | The updating IAM user ID | 
**createdAt** | **Date** | The time the object was created | 
**totalDevices** | **String** |  | 
**campaigndevicemetadataSet** | [**[CampaignDeviceMetadataSerializer]**](CampaignDeviceMetadataSerializer.md) |  | 
**campaignId** | **String** | DEPRECATED: The ID of the campaign | 
**deployedDevices** | **String** |  | 
**updatedAt** | **Date** | The time the object was updated | 
**when** | **Date** | The timestamp at which campaign is scheduled to start | 
**finished** | **Date** | The timestamp when the update campaign finished | 
**rootManifestUrl** | **String** |  | 
**updatingApiKey** | **String** | The gateway client API key | 
**updatingAccountId** | **String** | The updating account ID | 
**deviceFilter** | **String** | The filter for the devices the campaign will target | 
**name** | **String** | A name for this campaign | 


<a name="StateEnum"></a>
## Enum: StateEnum


* `draft` (value: `"draft"`)

* `scheduled` (value: `"scheduled"`)

* `devicefetch` (value: `"devicefetch"`)

* `devicecopy` (value: `"devicecopy"`)

* `devicecopycomplete` (value: `"devicecopycomplete"`)

* `publishing` (value: `"publishing"`)

* `deploying` (value: `"deploying"`)

* `deployed` (value: `"deployed"`)

* `manifestremoved` (value: `"manifestremoved"`)

* `expired` (value: `"expired"`)




