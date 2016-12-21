# IamIdentitiesRestApi.AccountUpdateReq

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**addressLine2** | **String** | Postal address line 2. | [optional] 
**city** | **String** | The city part of the postal address. | [optional] 
**addressLine1** | **String** | Postal address line 1. | [optional] 
**displayName** | **String** | The display name for the account. | [optional] 
**country** | **String** | The country part of the postal address. | [optional] 
**company** | **String** | The name of the company. | [optional] 
**templateId** | **String** | Account template ID. Manageable by the root admin only. | [optional] 
**status** | **String** | The status of the account. Manageable by the root admin only. | [optional] 
**state** | **String** | The state part of the postal address. | [optional] 
**contact** | **String** | The name of the contact person for this account. | [optional] 
**postalCode** | **String** | The postal code part of the postal address. | [optional] 
**isProvisioningAllowed** | **Boolean** | Flag (true/false) indicating whether Factory Tool is allowed to download or not. Manageable by the root admin only. | [optional] [default to false]
**tier** | **String** | The tier level of the account; &#39;0&#39;: free tier, &#39;1&#39;: commercial account. Other values are reserved for the future. Manageable by the root admin only. | [optional] 
**phoneNumber** | **String** | The phone number of the company. | [optional] 
**email** | **String** | The company email address for this account. | [optional] 
**aliases** | **[String]** | An array of aliases. | [optional] 


