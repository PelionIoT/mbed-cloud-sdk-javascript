# DeploymentServiceApi.WriteUpdateCampaignSerializer

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | A name for this campaign | 
**state** | **String** | The state of the campaign | [optional] 
**updatingUserId** | **String** | The updating IAM user ID | [optional] 
**_object** | **String** | The API resource entity | [optional] 
**rootManifestId** | **String** |  | [optional] 
**campaignId** | **String** | DEPRECATED: The ID of the campaign | [optional] 
**updatingApiKey** | **String** | The gateway client API key | [optional] 
**when** | **Date** | The timestamp at which update campaign scheduled to start | [optional] 
**finished** | **Date** | The timestamp when the update campaign finished | [optional] 
**updatingAccountId** | **String** | The updating account ID | [optional] 
**deviceFilter** | **String** | The filter for the devices the campaign will target | [optional] 
**description** | **String** | An optional description of the campaign | [optional] 


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




