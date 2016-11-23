# IamIdentitiesRestApi.ErrorResponse

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**code** | **Integer** | response code | 
**fields** | [**[Field]**](Field.md) | failed input fields during request object validation | [optional] 
**_object** | **String** | entity name, always &#39;error&#39; | 
**requestId** | **String** | request id | 
**message** | **String** | a human readable message with detailed info | 
**type** | **String** | error type | 


<a name="ObjectEnum"></a>
## Enum: ObjectEnum


* `user` (value: `"user"`)

* `apikey` (value: `"apikey"`)

* `group` (value: `"group"`)

* `account` (value: `"account"`)

* `list` (value: `"list"`)

* `error` (value: `"error"`)




<a name="TypeEnum"></a>
## Enum: TypeEnum


* `success` (value: `"success"`)

* `created` (value: `"created"`)

* `accepted` (value: `"accepted"`)

* `permanently_deleted` (value: `"permanently_deleted"`)

* `validation_error` (value: `"validation_error"`)

* `invalid_token` (value: `"invalid_token"`)

* `access_denied` (value: `"access_denied"`)

* `account_limit_exceeded` (value: `"account_limit_exceeded"`)

* `not_found` (value: `"not_found"`)

* `method_not_supported` (value: `"method_not_supported"`)

* `duplicate` (value: `"duplicate"`)

* `precondition_failed` (value: `"precondition_failed"`)

* `unsupported_media_type` (value: `"unsupported_media_type"`)

* `rate_limit_exceeded` (value: `"rate_limit_exceeded"`)

* `internal_server_error` (value: `"internal_server_error"`)

* `system_unavailable` (value: `"system_unavailable"`)




