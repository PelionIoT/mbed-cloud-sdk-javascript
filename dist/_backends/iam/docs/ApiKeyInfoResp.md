# IamIdentitiesRestApi.ApiKeyInfoResp

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **String** | The status of the API key. | [optional] 
**apikey** | **String** | The API key. | 
**name** | **String** | The display name for the API key. | 
**createdAt** | **String** | Creation UTC time RFC3339. | [optional] 
**_object** | **String** | Entity name: always &#39;apikey&#39; | 
**creationTime** | **Integer** | The timestamp of the API key creation in the storage, in milliseconds. | [optional] 
**creationTimeMillis** | **Integer** |  | [optional] 
**etag** | **String** | API resource entity version. | 
**groups** | **[String]** | A list of group IDs this API key belongs to. | [optional] 
**owner** | **String** | The owner of this API key, who is the creator by default. | [optional] 
**secretKey** | **String** | API key secret, deprecated and always empty string. | [optional] 
**id** | **String** | The UUID of the API key. | 
**lastLoginTime** | **Integer** | The timestamp of the latest API key usage, in milliseconds. | [optional] 


<a name="StatusEnum"></a>
## Enum: StatusEnum


* `ACTIVE` (value: `"ACTIVE"`)

* `INACTIVE` (value: `"INACTIVE"`)




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




