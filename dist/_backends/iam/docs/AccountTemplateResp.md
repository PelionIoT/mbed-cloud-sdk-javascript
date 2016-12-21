# IamIdentitiesRestApi.AccountTemplateResp

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**limits** | **{String: String}** | List of limits as name-value pairs | [optional] 
**name** | **String** | Account template name | 
**parent** | **String** | ID of the parent template, can be null. | [optional] 
**createdAt** | **String** | Creation UTC time RFC3339. | [optional] 
**_object** | **String** | entity name: &#39;user&#39;, &#39;apikey&#39;, &#39;group&#39;, &#39;account&#39; or error | 
**etag** | **String** | API resource entity version. | 
**creationTimeMillis** | **Integer** |  | [optional] 
**id** | **String** | Entity ID. | 
**resources** | [**[Policy]**](Policy.md) | List of resource-action-allow triplets, policies. | [optional] 
**description** | **String** | Account template description | [optional] 


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




