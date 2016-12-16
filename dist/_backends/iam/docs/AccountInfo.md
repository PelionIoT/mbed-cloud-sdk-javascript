# IamIdentitiesRestApi.AccountInfo

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**phoneNumber** | **String** | The phone number of the company. | [optional] 
**postalCode** | **String** | The postal code part of the postal address. | [optional] 
**id** | **String** | Account ID. | 
**aliases** | **[String]** | An array of aliases. | 
**addressLine2** | **String** | Postal address line 2. | [optional] 
**city** | **String** | The city part of the postal address. | [optional] 
**addressLine1** | **String** | Postal address line 1. | [optional] 
**displayName** | **String** | The display name for the account. | [optional] 
**state** | **String** | The state part of the postal address. | [optional] 
**etag** | **String** | API resource entity version. | 
**isProvisioningAllowed** | **Boolean** | Flag (true/false) indicating whether Factory Tool is allowed to download or not. | [default to false]
**creationTimeMillis** | **Integer** |  | [optional] 
**email** | **String** | The company email address for this account. | [optional] 
**status** | **String** | The status of the account. | 
**company** | **String** | The name of the company. | [optional] 
**_object** | **String** | Entity name: always &#39;account&#39; | 
**upgradedAt** | **String** | Time when upgraded to commercial account in UTC format RFC3339. | [optional] 
**tier** | **String** | The tier level of the account; &#39;0&#39;: free tier, &#39;1&#39;: commercial account. Other values are reserved for the future. | 
**limits** | **{String: String}** | List of limits as key-value pairs if requested. | [optional] 
**country** | **String** | The country part of the postal address. | [optional] 
**createdAt** | **String** | Creation UTC time RFC3339. | [optional] 
**contact** | **String** | The name of the contact person for this account. | [optional] 
**policies** | [**[Policy]**](Policy.md) | List of policies if requested. | [optional] 
**templateId** | **String** | Account template ID. | [optional] 


<a name="StatusEnum"></a>
## Enum: StatusEnum


* `ENROLLING` (value: `"ENROLLING"`)

* `ACTIVE` (value: `"ACTIVE"`)

* `SUSPENDED` (value: `"SUSPENDED"`)

* `DISABLED` (value: `"DISABLED"`)




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




