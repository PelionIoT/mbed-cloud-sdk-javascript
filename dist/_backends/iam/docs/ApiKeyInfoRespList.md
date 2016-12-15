# IamIdentitiesRestApi.ApiKeyInfoRespList

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**hasMore** | **Boolean** | Whether there are more results to display | 
**totalCount** | **Integer** | The total number or records, if requested  | 
**_object** | **String** | Entity name: always &#39;list&#39; | [optional] 
**limit** | **Integer** | The number of results to return | 
**data** | [**[ApiKeyInfoResp]**](ApiKeyInfoResp.md) | A list of entities. | 
**order** | **String** | The order of the records to return. Available values: ASC, DESC; by default ASC. | 


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




