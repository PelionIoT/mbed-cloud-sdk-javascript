# IamIdentitiesRestApi.AccountInfo

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**addressLine2** | **String** | Postal address line 2. | [optional] 
**city** | **String** | The city part of the postal address. | [optional] 
**addressLine1** | **String** | Postal address line 1. | [optional] 
**displayName** | **String** | The display name for the account. | [optional] 
**country** | **String** | The country part of the postal address. | [optional] 
**company** | **String** | The name of the company. | [optional] 
**_object** | **String** | entity name: always &#39;account&#39; | 
**status** | **String** | The status of the account. | 
**id** | **String** | Account ID. | 
**email** | **String** | The company email address for this account. | [optional] 
**state** | **String** | The state part of the postal address. | [optional] 
**etag** | **String** | API resource entity version. | 
**postalCode** | **String** | The postal code part of the postal address. | [optional] 
**contact** | **String** | The name of the contact person for this account. | [optional] 
**isProvisioningAllowed** | **Boolean** | Flag (true/false) indicating whether Factory Tool is allowed to download or not.. | [default to false]
**tier** | **String** | The tier level of the account; &#39;0&#39;: free tier, &#39;1&#39;: commercial account. Other values are reserved for the future. | 
**phoneNumber** | **String** | The phone number of the company. | [optional] 
**createdAt** | **String** | Creation UTC time RFC3339. | [optional] 
**aliases** | **[String]** | An array of aliases. | 


<a name="ObjectEnum"></a>
## Enum: ObjectEnum


* `user` (value: `"user"`)

* `apikey` (value: `"apikey"`)

* `group` (value: `"group"`)

* `account` (value: `"account"`)

* `list` (value: `"list"`)

* `error` (value: `"error"`)




<a name="StatusEnum"></a>
## Enum: StatusEnum


* `ACTIVE` (value: `"ACTIVE"`)

* `SUSPENDED` (value: `"SUSPENDED"`)

* `DISABLED` (value: `"DISABLED"`)




