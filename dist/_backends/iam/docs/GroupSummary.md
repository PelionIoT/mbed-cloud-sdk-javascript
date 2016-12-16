# IamIdentitiesRestApi.GroupSummary

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | The name of the group. | 
**lastUpdateTime** | **Integer** | A timestamp of the latest group update, in milliseconds. | [optional] 
**apiKeyCount** | **Integer** | The number of API keys in this group. | 
**createdAt** | **String** | Creation UTC time RFC3339. | [optional] 
**_object** | **String** | Entity name: always &#39;group&#39; | 
**creationTime** | **Integer** | A timestamp of the group creation in the storage, in milliseconds. | [optional] 
**etag** | **String** | API resource entity version. | 
**creationTimeMillis** | **Integer** |  | [optional] 
**id** | **String** | The UUID of the group. | 
**userCount** | **Integer** | The number of users in this group. | 


<a name="ObjectEnum"></a>
## Enum: ObjectEnum


* `user` (value: `"user"`)

* `apikey` (value: `"apikey"`)

* `group` (value: `"group"`)

* `account` (value: `"account"`)

* `account_template` (value: `"account_template"`)

* `ca_cert` (value: `"ca_cert"`)

* `list` (value: `"list"`)

* `error` (value: `"error"`)




