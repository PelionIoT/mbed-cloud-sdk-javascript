# IamIdentitiesRestApi.AccountEnrollmentResp

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **String** | The status of the user. INVITED means that the user has not accepted the invitation request. RESET means that the password must be changed immediately. | 
**username** | **String** | A username containing alphanumerical letters and -,._@+&#x3D; characters. | 
**emailVerified** | **Boolean** | A flag indicating whether the user&#39;s email address has been verified or not. | [optional] [default to false]
**accountId** | **String** | The UUID of the account. | 
**passwordChangedTime** | **Integer** | A timestamp of the latest change of the user password, in milliseconds. | [optional] 
**aliases** | **[String]** | An array of aliases. | 
**groups** | **[String]** | A list of IDs of the groups this user belongs to. | [optional] 
**createdAt** | **String** | Creation UTC time RFC3339. | [optional] 
**_object** | **String** | Entity name: always &#39;user&#39; | 
**isGtcAccepted** | **Boolean** | A flag indicating that the General Terms and Conditions has been accepted. | [optional] [default to false]
**email** | **String** | The email address. | 
**isMarketingAccepted** | **Boolean** | A flag indicating that receiving marketing information has been accepted. | [optional] [default to false]
**etag** | **String** | API resource entity version. | 
**fullName** | **String** | The full name of the user. | [optional] 
**address** | **String** | Address. | [optional] 
**creationTimeMillis** | **Integer** |  | [optional] 
**creationTime** | **Integer** | A timestamp of the user creation in the storage, in milliseconds. | [optional] 
**password** | **String** | The password when creating a new user. It will will generated when not present in the request. | [optional] 
**phoneNumber** | **String** | Phone number. | [optional] 
**id** | **String** | The UUID of the user. | 
**lastLoginTime** | **Integer** | A timestamp of the latest login of the user, in milliseconds. | [optional] 


<a name="StatusEnum"></a>
## Enum: StatusEnum


* `INVITED` (value: `"INVITED"`)

* `ACTIVE` (value: `"ACTIVE"`)

* `RESET` (value: `"RESET"`)

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




