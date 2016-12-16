# IamIdentitiesRestApi.CACertificateReq

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**certData** | **String** | X509.v3 CA certificate in PEM or base64 encoded DER format. | 
**name** | **String** | Certificate name. | 
**service** | **String** | Service name where the certificate must be used. | 
**signature** | **String** | Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256. | 


<a name="ServiceEnum"></a>
## Enum: ServiceEnum


* `lwm2m` (value: `"lwm2m"`)

* `bootstrap` (value: `"bootstrap"`)

* `provisioning` (value: `"provisioning"`)




