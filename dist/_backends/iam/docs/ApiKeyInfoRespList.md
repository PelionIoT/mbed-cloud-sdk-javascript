# IamIdentitiesRestApi.ApiKeyInfoRespList

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**after** | **String** | The entity ID to fetch after the given one. | [optional] 
**_object** | **String** | Entity name: always &#39;list&#39; | 
**totalCount** | **Integer** | The total number or records, if requested  | 
**limit** | **Integer** | The number of results to return, (range: 2-1000), or equals to &#x60;total_count&#x60; | 
**data** | [**[ApiKeyInfoResp]**](ApiKeyInfoResp.md) | A list of entities. | 
**order** | **String** | The order of the records to return. Available values: ASC, DESC; by default ASC. | [optional] 


<a name="ObjectEnum"></a>
## Enum: ObjectEnum


* `user` (value: `"user"`)

* `apikey` (value: `"apikey"`)

* `group` (value: `"group"`)

* `account` (value: `"account"`)

* `ca_cert` (value: `"ca_cert"`)

* `list` (value: `"list"`)

* `error` (value: `"error"`)




<a name="OrderEnum"></a>
## Enum: OrderEnum


* `ASC` (value: `"ASC"`)

* `DESC` (value: `"DESC"`)




