# IamIdentitiesRestApi.CACertificateResp

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**accountId** | **String** | The UUID of the account. | 
**service** | **String** | Service name where the certificate is to be used. | 
**createdAt** | **String** | Creation UTC time RFC3339. | [optional] 
**_object** | **String** | entity name: &#39;user&#39;, &#39;apikey&#39;, &#39;group&#39;, &#39;account&#39; or error | 
**subject** | **String** | Subject of the certificate. | 
**validity** | **String** | Expiration time in UTC formatted as RFC3339. | 
**etag** | **String** | API resource entity version. | 
**creationTimeMillis** | **Integer** |  | [optional] 
**issuer** | **String** | Issuer of the certificate. | 
**certData** | **String** | X509.v3 CA certificate in PEM or base64 encoded DER format. | 
**id** | **String** | Entity ID. | 
**name** | **String** | Certificate name. | 


<a name="ServiceEnum"></a>
## Enum: ServiceEnum


* `lwm2m` (value: `"lwm2m"`)

* `bootstrap` (value: `"bootstrap"`)

* `provisioning` (value: `"provisioning"`)




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




