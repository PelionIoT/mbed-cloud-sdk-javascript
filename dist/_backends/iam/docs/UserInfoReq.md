# IamIdentitiesRestApi.UserInfoReq

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**username** | **String** | A username containing alphanumerical letters and -,._@+&#x3D; characters. | 
**phoneNumber** | **String** | Phone number. | [optional] 
**groups** | **[String]** | A list of IDs of the groups this user belongs to. | [optional] 
**isGtcAccepted** | **Boolean** | A flag indicating that the General Terms and Conditions has been accepted. | [optional] [default to false]
**isMarketingAccepted** | **Boolean** | A flag indicating that receiving marketing information has been accepted. | [optional] [default to false]
**fullName** | **String** | The full name of the user. | [optional] 
**address** | **String** | Address. | [optional] 
**password** | **String** | The password when creating a new user. It will will generated when not present in the request. | [optional] 
**email** | **String** | Email address. | 


