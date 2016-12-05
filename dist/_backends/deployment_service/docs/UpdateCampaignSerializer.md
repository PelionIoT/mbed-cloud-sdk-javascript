# DeploymentServiceApi.UpdateCampaignSerializer

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**description** | **String** | An optional description of the campaign | 
**state** | **String** | The state of the campaign | 
**updatingUserId** | **String** | The updating IAM user ID | 
**createdAt** | **Date** | The time the object was created | 
**_object** | **String** | The API resource entity | 
**rootManifestId** | **String** |  | 
**campaignId** | **String** | DEPRECATED: The ID of the campaign | 
**updatingAccountId** | **String** | The updating account ID | 
**updatedAt** | **Date** | The time the object was updated | 
**when** | **Date** | The timestamp at which update campaign scheduled to start | 
**finished** | **Date** | The timestamp when the update campaign finished | 
**etag** | **Date** | The entity instance signature | 
**rootManifestUrl** | **String** |  | 
**updatingApiKey** | **String** | The gateway client API key | 
**id** | **String** | The ID of the campaign | 
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




