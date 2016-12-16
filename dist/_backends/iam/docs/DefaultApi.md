# IamIdentitiesRestApi.DefaultApi

All URIs are relative to *https://api.mbedcloud.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**activateUser**](DefaultApi.md#activateUser) | **PUT** /auth/invitations/{invitation-id} | Accept invitation.
[**applyPasswordRecovery**](DefaultApi.md#applyPasswordRecovery) | **PUT** /auth/recover | Apply password recovery.
[**getInvitedUser**](DefaultApi.md#getInvitedUser) | **GET** /auth/invitations/{invitation-id} | Get invited user.
[**getSelfEnrollingUser**](DefaultApi.md#getSelfEnrollingUser) | **GET** /auth/register/{signup-id} | Get registering user.
[**registerAccount**](DefaultApi.md#registerAccount) | **PUT** /auth/register/{signup-id} | Register a new account.
[**requestPasswordRecovery**](DefaultApi.md#requestPasswordRecovery) | **POST** /auth/recover | Request password recovery.
[**signup**](DefaultApi.md#signup) | **POST** /auth/register | Sign up for a new account.
[**verifySelfEnrollment**](DefaultApi.md#verifySelfEnrollment) | **POST** /auth/register/{signup-id} | Verify self-enrollment code and aliases.


<a name="activateUser"></a>
# **activateUser**
> UserInfoResp activateUser(invitationId, body)

Accept invitation.

Accepting pending invitation and providing missing details.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DefaultApi();

var invitationId = "invitationId_example"; // String | Invitation ID received in email.

var body = new IamIdentitiesRestApi.UserInfoReq(); // UserInfoReq | Details of the user accepting the invitation.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.activateUser(invitationId, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **invitationId** | **String**| Invitation ID received in email. | 
 **body** | [**UserInfoReq**](UserInfoReq.md)| Details of the user accepting the invitation. | 

### Return type

[**UserInfoResp**](UserInfoResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="applyPasswordRecovery"></a>
# **applyPasswordRecovery**
> applyPasswordRecovery(body, opts)

Apply password recovery.

Applying password recovery by providing a secret hash code.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DefaultApi();

var body = new IamIdentitiesRestApi.PasswordRecoveryReq(); // PasswordRecoveryReq | Hash received by email and new password.

var opts = { 
  'xForwardedFor': "xForwardedFor_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.applyPasswordRecovery(body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**PasswordRecoveryReq**](PasswordRecoveryReq.md)| Hash received by email and new password. | 
 **xForwardedFor** | **String**|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getInvitedUser"></a>
# **getInvitedUser**
> UserInfoResp getInvitedUser(invitationId)

Get invited user.

Returns information about the user being invited.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DefaultApi();

var invitationId = "invitationId_example"; // String | Invitation ID received in email.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getInvitedUser(invitationId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **invitationId** | **String**| Invitation ID received in email. | 

### Return type

[**UserInfoResp**](UserInfoResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getSelfEnrollingUser"></a>
# **getSelfEnrollingUser**
> AccountSignupResp getSelfEnrollingUser(signupId)

Get registering user.

Retrieving the details of a user to register.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DefaultApi();

var signupId = "signupId_example"; // String | ID received while signing up.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getSelfEnrollingUser(signupId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **signupId** | **String**| ID received while signing up. | 

### Return type

[**AccountSignupResp**](AccountSignupResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="registerAccount"></a>
# **registerAccount**
> AccountEnrollmentResp registerAccount(signupId, body)

Register a new account.

An endpoint for registering a new account.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DefaultApi();

var signupId = "signupId_example"; // String | ID received while signing up.

var body = new IamIdentitiesRestApi.AccountEnrollmentReq(); // AccountEnrollmentReq | Details of the account to be created.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.registerAccount(signupId, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **signupId** | **String**| ID received while signing up. | 
 **body** | [**AccountEnrollmentReq**](AccountEnrollmentReq.md)| Details of the account to be created. | 

### Return type

[**AccountEnrollmentResp**](AccountEnrollmentResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="requestPasswordRecovery"></a>
# **requestPasswordRecovery**
> requestPasswordRecovery(body, opts)

Request password recovery.

Requesting password recovery by email address.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DefaultApi();

var body = new IamIdentitiesRestApi.PasswordResetReq(); // PasswordResetReq | Email address of the user whose password needs to be recovered.

var opts = { 
  'xForwardedFor': "xForwardedFor_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.requestPasswordRecovery(body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**PasswordResetReq**](PasswordResetReq.md)| Email address of the user whose password needs to be recovered. | 
 **xForwardedFor** | **String**|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="signup"></a>
# **signup**
> AccountSignupResp signup(body)

Sign up for a new account.

Signing up for a new free tier account with email address.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DefaultApi();

var body = new IamIdentitiesRestApi.AccountSignupReq(); // AccountSignupReq | Email address of the user to be signed up.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.signup(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**AccountSignupReq**](AccountSignupReq.md)| Email address of the user to be signed up. | 

### Return type

[**AccountSignupResp**](AccountSignupResp.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="verifySelfEnrollment"></a>
# **verifySelfEnrollment**
> verifySelfEnrollment(signupId, opts)

Verify self-enrollment code and aliases.

Verifying whether the code received by email is valid. Optionally, it also verifies whether account with the given aliases exists.

### Example
```javascript
var IamIdentitiesRestApi = require('iam_identities_rest_api');
var defaultClient = IamIdentitiesRestApi.ApiClient.default;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new IamIdentitiesRestApi.DefaultApi();

var signupId = "signupId_example"; // String | ID received while signing up.

var opts = { 
  'body': new IamIdentitiesRestApi.AccountSignupVerify() // AccountSignupVerify | Verification code received by email and aliases to be checked.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.verifySelfEnrollment(signupId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **signupId** | **String**| ID received while signing up. | 
 **body** | [**AccountSignupVerify**](AccountSignupVerify.md)| Verification code received by email and aliases to be checked. | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

