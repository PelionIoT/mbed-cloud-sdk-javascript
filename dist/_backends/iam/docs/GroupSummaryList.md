# IamIdentitiesRestApi.GroupSummaryList

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**after** | **String** | The entity id to fetch after it. | [optional] 
**_object** | **String** | entity name: always &#39;list&#39; | 
**totalCount** | **Integer** | The total number or records, if requested  | 
**limit** | **Integer** | The number of results to return, (range: 2-1000), or equals to total_count | 
**data** | [**[GroupSummary]**](GroupSummary.md) | List of entities. | 
**order** | **String** | The order of the records to return. Available values: ASC, DESC. Default value is ASC | [optional] 


<a name="ObjectEnum"></a>
## Enum: ObjectEnum


* `user` (value: `"user"`)

* `apikey` (value: `"apikey"`)

* `group` (value: `"group"`)

* `account` (value: `"account"`)

* `list` (value: `"list"`)

* `error` (value: `"error"`)




<a name="OrderEnum"></a>
## Enum: OrderEnum


* `ASC` (value: `"ASC"`)

* `DESC` (value: `"DESC"`)




